/**
 * W39-C — SOL inverse + vanilla MM-style trader on devnet.
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
} from "@solana/spl-token";
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  SkewClient,
  NATIVE_SOL_MINT,
} from "@skew-labs/sdk";
import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };

// W39-C oracle-feed override.
// Patch the SDK's pda module via CommonJS require so we mutate the loaded
// module before SkewClient.create() reads `resolvePythFeed`. The deployed
// devnet binary uses the non-frozen feed bytes (decodes to H6ARHf...).
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
const AGENT = "W39-C";
const ROLE = "MM-SOL-inverse-and-vanilla";

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
  // round to nearest $5
  return Math.round(spot / 5) * 5;
}

async function main(): Promise<void> {
  const RPC = process.env.HELIUS_RPC || process.env.SOLANA_RPC_URL;
  if (!RPC) {
    throw new Error("HELIUS_RPC or SOLANA_RPC_URL env var required (Helius devnet only — no public RPC)");
  }
  const conn = new Connection(RPC, "confirmed");

  // Load funder
  const funderPath = path.join(os.homedir(), "Downloads", "devnet.json");
  const funder = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(funderPath, "utf-8"))),
  );

  // Generate ephemeral keypair
  const ephemeral = Keypair.generate();
  console.log(`[w39c] ephemeral pubkey: ${ephemeral.publicKey.toBase58()}`);
  console.log(`[w39c] funder: ${funder.publicKey.toBase58()}`);
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

  // Fund 0.15 SOL
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
    console.log(`[w39c] funded 0.15 SOL: ${sig}`);
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

  // Mint devnet USDC to ephemeral wallet (funder = mint authority).
  const USDC_MINT = new PublicKey(
    process.env.SKEW_DEVNET_USDC_MINT || "4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8",
  );
  const USDC_AMOUNT = 5_000_000_000n; // 5,000 USDC (6 decimals)
  try {
    const ephAta = getAssociatedTokenAddressSync(USDC_MINT, ephemeral.publicKey);
    const tx = new Transaction().add(
      createAssociatedTokenAccountIdempotentInstruction(
        funder.publicKey,
        ephAta,
        ephemeral.publicKey,
        USDC_MINT,
      ),
      createMintToInstruction(USDC_MINT, ephAta, funder.publicKey, USDC_AMOUNT),
    );
    const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash();
    tx.recentBlockhash = blockhash;
    tx.feePayer = funder.publicKey;
    tx.sign(funder);
    const sig = await conn.sendRawTransaction(tx.serialize(), { skipPreflight: false });
    await conn.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");
    console.log(`[w39c] minted 5000 USDC: ${sig}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "mint_usdc",
      status: "ok",
      tx: sig,
      meta: { amount_usdc: 5000, ata: ephAta.toBase58() },
    });
  } catch (e) {
    const reason = (e as Error).message ?? String(e);
    console.log(`[w39c] mint USDC failed: ${reason}`);
    appendLog({
      ts: nowIso(),
      agent: AGENT,
      role: ROLE,
      product: "init",
      action: "mint_usdc",
      status: "blocked",
      reason: reason.slice(0, 500),
    });
  }

  // Build SDK client with ephemeral wallet
  const wallet = new Wallet(ephemeral);
  const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
  const program = new Program(idl as never, provider);
  const skew = SkewClient.fromProgram(conn, wallet, program);

  // CM register requires the USDC ATA to be initialised + funded.
  let cmRegistered = false;
  try {
    const r = await skew.registerClearingMember({ initialCollateralUsdc: 100 });
    cmRegistered = true;
    console.log(`[w39c] CM registered: ${r.cmPda.toBase58()}`);
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
    console.log(`[w39c] CM register BLOCKED: ${reason}`);
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

  // Spot for ATM strikes
  let spot = 150;
  try {
    spot = await fetchSolSpot();
    console.log(`[w39c] SOL spot=$${spot.toFixed(2)}`);
  } catch (e) {
    console.log(`[w39c] hermes spot failed, using $150 default: ${(e as Error).message}`);
  }
  const atm = roundStrike(spot);

  // Optional: try to set up wSOL collateral rail for inverse — fund native SOL vault.
  // We're tight on SOL (0.15), so attempt a tiny wrap (0.02 SOL) only if budget allows.
  let wsolRailOk = false;
  try {
    const balPre = await conn.getBalance(ephemeral.publicKey);
    const wrapAmt = Math.floor(0.02 * LAMPORTS_PER_SOL);
    if (balPre > wrapAmt + 0.05 * LAMPORTS_PER_SOL) {
      const r = await skew.wrapAndDeposit(BigInt(wrapAmt));
      wsolRailOk = true;
      console.log(`[w39c] wSOL rail set up: wrap=${r.wrapTx} deposit=${r.depositTx}`);
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
    console.log(`[w39c] wSOL rail BLOCKED: ${reason}`);
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

  // 5-iteration loop
  type ProductSpec = {
    key: string;
    payoff:
      | "vanilla_inverse_call"
      | "vanilla_inverse_put"
      | "vanilla_call"
      | "vanilla_put"
      | "digital_call";
    days: number;
    settlementMint: PublicKey | undefined; // wSOL for inverse, USDC default for vanilla/digital
    notional: number;
    inverse: boolean;
  };

  const products: ProductSpec[] = [
    {
      key: "inverse_vanilla_short_call_7d",
      payoff: "vanilla_inverse_call",
      days: 7,
      settlementMint: NATIVE_SOL_MINT,
      notional: 0.001, // 0.001 SOL inverse notional
      inverse: true,
    },
    {
      key: "inverse_vanilla_short_put_7d",
      payoff: "vanilla_inverse_put",
      days: 7,
      settlementMint: NATIVE_SOL_MINT,
      notional: 0.001,
      inverse: true,
    },
    {
      key: "sol_vanilla_short_call_7d",
      payoff: "vanilla_call",
      days: 7,
      settlementMint: undefined,
      notional: 150, // $150 — above SOL min_position_usd_micro = $100
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
    console.log(`\n[w39c] === iter ${iter}/5 ===`);
    for (const p of products) {
      // Skip inverse if rail not ready
      if (p.inverse && !wsolRailOk) {
        if (!blockers[p.key]) {
          blockers[p.key] = "wSOL collateral rail not set up (insufficient SOL or init failed)";
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
          direction: "sell", // short = writer, but creator is writer regardless; explicit
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

  // Final balance & summary
  const endBal = await conn.getBalance(ephemeral.publicKey);
  const spent = (FUND_LAMPORTS - endBal) / LAMPORTS_PER_SOL;
  console.log(`\n[w39c] DONE`);
  console.log(`  ephemeral: ${ephemeral.publicKey.toBase58()}`);
  console.log(`  end balance: ${endBal / LAMPORTS_PER_SOL} SOL`);
  console.log(`  spent (incl. fund tx fee): ${spent.toFixed(6)} SOL`);
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
    },
  });
}

main().catch((e) => {
  console.error("[w39c] FATAL:", e);
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
