/**
 * W39-C2 — SOL inverse + vanilla MM-style trader on devnet (retry of W39-C with fixes).
 *
 * Fixes vs W39-C:
 *   1. Mint USDC to ephemeral wallet (funder is devnet USDC mint authority) so:
 *      - CM register no longer fails with AccountNotInitialized
 *      - Vanilla/digital deposit_collateral has USDC to spend
 *   2. Bump notional to clear validation.rs:58 NotionalOutOfBand floor ($10).
 *
 * Acts as the WRITER (creator/seller) of:
 *   - inverse vanilla short call ATM 7d  (wSOL settle)
 *   - inverse vanilla short put 7d        (wSOL settle)
 *   - SOL vanilla short call 7d           (USDC settle)
 *   - SOL vanilla short put 14d           (USDC settle)
 *   - SOL digital short call 28d          (USDC settle)
 *
 * Loop 5 times. Append each tx attempt to /tmp/skew-w39-trading-log.jsonl.
 *
 * Constraints: ephemeral keypair, fund 0.15 SOL from ~/Downloads/devnet.json.
 * Helius RPC required (no public devnet RPC).
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  SkewClient,
  NATIVE_SOL_MINT,
} from "@skew-labs/sdk";
import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };

// W39-C2 oracle-feed override.
// SDK's resolvePythFeed returns "J83w..." (devnet-frozen build); deployed
// binary was compiled WITHOUT `devnet-frozen-pyth`, so it expects raw-bytes
// feed which decodes to "H6ARHf...". Patch via CJS require before SDK reads.
import { createRequire } from "node:module";
const cjsRequire = createRequire(import.meta.url);
const sdkPdaPath = cjsRequire.resolve("@skew-labs/sdk").replace(/index\.js$/, "pda.js");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sdkPda: any = cjsRequire(sdkPdaPath);
const SOL_FEED_OVERRIDE = process.env.SKEW_SOL_PYTH_FEED || "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG";
const ORIG_RESOLVE_FEED = sdkPda.resolvePythFeed;
if (sdkPda.PYTH_DEVNET_FEEDS) sdkPda.PYTH_DEVNET_FEEDS.SOL = SOL_FEED_OVERRIDE;
sdkPda.resolvePythFeed = (underlying: string) => {
  if (underlying === "SOL") return new PublicKey(SOL_FEED_OVERRIDE);
  return ORIG_RESOLVE_FEED(underlying);
};

const LOG_PATH = "/tmp/skew-w39-trading-log.jsonl";
const AGENT = "W39-C2";
const ROLE = "MM-SOL-inverse-and-vanilla";

const DEVNET_USDC_MINT = new PublicKey(
  "4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8",
);

type LogEntry = {
  ts: string;
  agent: string;
  role: string;
  iter?: number;
  product: string;
  action: string;
  status: "ok" | "blocked" | "error";
  tx?: string | null;
  optionPda?: string | null;
  reason?: string | null;
  meta?: Record<string, unknown>;
};

function appendLog(entry: LogEntry): void {
  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + "\n");
}

function nowIso(): string {
  return new Date().toISOString();
}

async function fetchSolSpot(): Promise<number> {
  const id = "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d";
  const r = await fetch(
    `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${id}`,
  ).then((r) => r.json()) as { parsed: Array<{ price: { price: string; expo: number } }> };
  const p = r.parsed[0]!.price;
  return Number(p.price) * Math.pow(10, p.expo);
}

function expiryIsoDays(d: number): string {
  return new Date(Date.now() + d * 24 * 3600 * 1000).toISOString();
}

function roundStrike(spot: number): number {
  return Math.round(spot / 5) * 5;
}

async function main(): Promise<void> {
  const RPC = process.env.HELIUS_RPC || process.env.SOLANA_RPC_URL;
  if (!RPC) {
    throw new Error("HELIUS_RPC or SOLANA_RPC_URL env var required (Helius devnet only — no public RPC)");
  }
  const conn = new Connection(RPC, "confirmed");

  const funderPath = path.join(os.homedir(), "Downloads", "devnet.json");
  const funder = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(funderPath, "utf-8"))),
  );

  const ephemeral = Keypair.generate();
  console.log(`[w39c2] ephemeral pubkey: ${ephemeral.publicKey.toBase58()}`);
  console.log(`[w39c2] funder: ${funder.publicKey.toBase58()}`);
  appendLog({
    ts: nowIso(),
    agent: AGENT,
    role: ROLE,
    product: "init",
    action: "ephemeral_keypair",
    status: "ok",
    meta: {
      ephemeral_pubkey: ephemeral.publicKey.toBase58(),
      funder_pubkey: funder.publicKey.toBase58(),
    },
  });

  // 1) Fund 0.15 SOL
  const FUND_LAMPORTS = Math.floor(0.15 * LAMPORTS_PER_SOL);
  const startBal = await conn.getBalance(ephemeral.publicKey);
  if (startBal < FUND_LAMPORTS) {
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: funder.publicKey,
        toPubkey: ephemeral.publicKey,
        lamports: FUND_LAMPORTS - startBal,
      }),
    );
    const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = funder.publicKey;
    tx.sign(funder);
    const sig = await conn.sendRawTransaction(tx.serialize(), { skipPreflight: false });
    await conn.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");
    console.log(`[w39c2] funded 0.15 SOL: ${sig}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "fund_sol",
      status: "ok",
      tx: sig,
      meta: { lamports: FUND_LAMPORTS - startBal },
    });
  }

  // 2) Mint USDC to ephemeral wallet (funder is devnet USDC mint authority).
  // 1000 USDC is plenty for $100 CM register + multiple $25 vanilla deposits.
  let usdcMintTxOk = false;
  try {
    const userUsdcAta = getAssociatedTokenAddressSync(DEVNET_USDC_MINT, ephemeral.publicKey);
    const ataIx = createAssociatedTokenAccountIdempotentInstruction(
      funder.publicKey, // payer
      userUsdcAta,
      ephemeral.publicKey,
      DEVNET_USDC_MINT,
    );
    // 5 iter × 3 USDC products × $150 = $2250, plus $100 CM register, plus
    // headroom for IM/PM rebalances → mint $5000 to be safe.
    const USDC_AMOUNT_MICRO = 5000n * 1_000_000n;
    const mintIx = createMintToInstruction(
      DEVNET_USDC_MINT,
      userUsdcAta,
      funder.publicKey, // mint authority
      USDC_AMOUNT_MICRO,
      [],
      TOKEN_PROGRAM_ID,
    );
    const tx = new Transaction().add(ataIx, mintIx);
    const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = funder.publicKey;
    tx.sign(funder);
    const sig = await conn.sendRawTransaction(tx.serialize(), { skipPreflight: false });
    await conn.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");
    usdcMintTxOk = true;
    console.log(`[w39c2] minted 1000 USDC to ephemeral: ${sig}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "mint_usdc",
      status: "ok",
      tx: sig,
      meta: { amount_usdc: 5000, ata: userUsdcAta.toBase58() },
    });
  } catch (e) {
    const reason = (e as Error).message ?? String(e);
    console.log(`[w39c2] mint USDC FAILED: ${reason.slice(0, 200)}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "mint_usdc",
      status: "error",
      reason: reason.slice(0, 500),
    });
  }

  // 3) Build SDK client with ephemeral wallet
  const wallet = new Wallet(ephemeral);
  const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
  const program = new Program(idl as never, provider);
  const skew = SkewClient.fromProgram(conn, wallet, program);

  // 4) CM register — now the wallet has USDC, so should succeed.
  let cmRegistered = false;
  try {
    const r = await skew.registerClearingMember({ initialCollateralUsdc: 100 });
    cmRegistered = true;
    console.log(`[w39c2] CM registered: ${r.cmPda.toBase58()}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "register_cm",
      status: "ok",
      tx: r.txSignature,
      meta: { cmPda: r.cmPda.toBase58() },
    });
  } catch (e) {
    const reason = (e as Error).message ?? String(e);
    console.log(`[w39c2] CM register BLOCKED: ${reason.slice(0, 200)}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "register_cm",
      status: "blocked",
      reason: reason.slice(0, 500),
    });
  }

  // 5) Spot for ATM strikes
  let spot = 150;
  try {
    spot = await fetchSolSpot();
    console.log(`[w39c2] SOL spot=$${spot.toFixed(2)}`);
  } catch (e) {
    console.log(`[w39c2] hermes spot failed, using $150 default: ${(e as Error).message}`);
  }
  const atm = roundStrike(spot);

  // 6) wSOL collateral rail (for inverse). Try wrapping 0.02 SOL.
  let wsolRailOk = false;
  try {
    const balPre = await conn.getBalance(ephemeral.publicKey);
    const wrapAmt = Math.floor(0.02 * LAMPORTS_PER_SOL);
    if (balPre > wrapAmt + 0.05 * LAMPORTS_PER_SOL) {
      const r = await skew.wrapAndDeposit(BigInt(wrapAmt));
      wsolRailOk = true;
      console.log(`[w39c2] wSOL rail set up: wrap=${r.wrapTx} deposit=${r.depositTx}`);
      appendLog({
        ts: nowIso(),
        agent: AGENT,
        role: ROLE,
        product: "init",
        action: "wrap_and_deposit_wsol",
        status: "ok",
        tx: r.depositTx,
        meta: { wrapTx: r.wrapTx, lamports: wrapAmt },
      });
    } else {
      throw new Error(`insufficient SOL for wSOL rail: bal=${balPre} need=${wrapAmt + 0.05 * LAMPORTS_PER_SOL}`);
    }
  } catch (e) {
    const reason = (e as Error).message ?? String(e);
    console.log(`[w39c2] wSOL rail BLOCKED: ${reason.slice(0, 200)}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "wrap_and_deposit_wsol",
      status: "blocked",
      reason: reason.slice(0, 500),
    });
  }

  // 7) 5-iteration loop
  type ProductSpec = {
    key: string;
    payoff:
      | "vanilla_inverse_call"
      | "vanilla_inverse_put"
      | "vanilla_call"
      | "vanilla_put"
      | "digital_call";
    days: number;
    settlementMint: PublicKey | undefined;
    notional: number;
    inverse: boolean;
  };

  // Notional fix v2 (vs W39-C run):
  //   - SOL min_position_usd_micro = $100 (per asset_params SOL).
  //   - USDC vanilla / digital: notional units = USDC. Use $150 to clear $100 floor.
  //   - wSOL inverse: notional units = SOL. Need ≥ $100/spot ≈ 1.07 SOL.
  //     With 0.15 SOL fund budget we cannot deposit 1.07 SOL collateral — inverse
  //     blocked by SOL budget. Set notional = 1.1 SOL so the failure mode is
  //     clearly "insufficient wSOL deposit" rather than "NotionalTooSmall", and
  //     skip if wSOL escrow cannot cover.
  const inverseNotionalSol = 1.1; // $103 at spot ~$93.92 — clears $100 floor
  const inverseDepositLamports = Math.floor(inverseNotionalSol * LAMPORTS_PER_SOL);
  const inverseFundable = wsolRailOk; // we wrapped 0.02 SOL — way below 1.1 SOL needed

  const products: ProductSpec[] = [
    {
      key: "inverse_vanilla_short_call_7d",
      payoff: "vanilla_inverse_call",
      days: 7,
      settlementMint: NATIVE_SOL_MINT,
      notional: inverseNotionalSol,
      inverse: true,
    },
    {
      key: "inverse_vanilla_short_put_7d",
      payoff: "vanilla_inverse_put",
      days: 7,
      settlementMint: NATIVE_SOL_MINT,
      notional: inverseNotionalSol,
      inverse: true,
    },
    {
      key: "sol_vanilla_short_call_7d",
      payoff: "vanilla_call",
      days: 7,
      settlementMint: undefined,
      notional: 150,
      inverse: false,
    },
    {
      key: "sol_vanilla_short_put_14d",
      payoff: "vanilla_put",
      days: 14,
      settlementMint: undefined,
      notional: 150,
      inverse: false,
    },
    {
      key: "sol_digital_short_call_28d",
      payoff: "digital_call",
      days: 28,
      settlementMint: undefined,
      notional: 150,
      inverse: false,
    },
  ];

  const txCounts: Record<string, number> = {};
  const blockers: Record<string, string> = {};

  for (let iter = 1; iter <= 5; iter++) {
    console.log(`\n[w39c2] === iter ${iter}/5 ===`);
    for (const p of products) {
      if (p.inverse && !wsolRailOk) {
        if (!blockers[p.key]) {
          blockers[p.key] = "wSOL collateral rail not set up";
        }
        appendLog({
          ts: nowIso(),
          agent: AGENT,
          role: ROLE,
          iter,
          product: p.key,
          action: "create_short",
          status: "blocked",
          reason: blockers[p.key],
        });
        continue;
      }

      try {
        const result = await skew.create({
          underlying: "SOL",
          payoff: p.payoff,
          strike: atm,
          expiry: expiryIsoDays(p.days),
          notional: p.notional,
          direction: "sell",
          settlementMint: p.settlementMint,
        });
        txCounts[p.key] = (txCounts[p.key] || 0) + 1;
        console.log(
          `  [${p.key}] ok pda=${result.address.toBase58()} create=${result.createTx.slice(0, 12)}…`,
        );
        appendLog({
          ts: nowIso(),
          agent: AGENT,
          role: ROLE,
          iter,
          product: p.key,
          action: "create_short",
          status: "ok",
          tx: result.createTx,
          optionPda: result.address.toBase58(),
          meta: {
            depositTx: result.depositTx,
            strike: atm,
            days: p.days,
            notional: p.notional,
            inverse: p.inverse,
          },
        });
      } catch (e) {
        const reason = (e as Error).message ?? String(e);
        console.log(`  [${p.key}] FAIL: ${reason.slice(0, 200)}`);
        if (!blockers[p.key]) blockers[p.key] = reason.slice(0, 200);
        appendLog({
          ts: nowIso(),
          agent: AGENT,
          role: ROLE,
          iter,
          product: p.key,
          action: "create_short",
          status: "error",
          reason: reason.slice(0, 500),
        });
      }
    }
  }

  // 8) Final balance & summary
  const endBal = await conn.getBalance(ephemeral.publicKey);
  const spent = (FUND_LAMPORTS - endBal) / LAMPORTS_PER_SOL;
  console.log(`\n[w39c2] DONE`);
  console.log(`  ephemeral: ${ephemeral.publicKey.toBase58()}`);
  console.log(`  end balance: ${endBal / LAMPORTS_PER_SOL} SOL`);
  console.log(`  spent (fund - end): ${spent.toFixed(6)} SOL`);
  console.log(`  tx by product:`, txCounts);
  console.log(`  blockers:`, blockers);

  appendLog({
    ts: nowIso(),
    agent: AGENT,
    role: ROLE,
    product: "summary",
    action: "summary",
    status: "ok",
    meta: {
      ephemeral_pubkey: ephemeral.publicKey.toBase58(),
      end_balance_sol: endBal / LAMPORTS_PER_SOL,
      sol_spent: spent,
      tx_counts: txCounts,
      blockers,
      cm_registered: cmRegistered,
      wsol_rail_ok: wsolRailOk,
      usdc_mint_ok: usdcMintTxOk,
    },
  });
}

main().catch((e) => {
  console.error("[w39c2] FATAL:", e);
  appendLog({
    ts: nowIso(),
    agent: AGENT,
    role: ROLE,
    product: "fatal",
    action: "fatal_error",
    status: "error",
    reason: ((e as Error).message ?? String(e)).slice(0, 800),
  });
  process.exit(1);
});
