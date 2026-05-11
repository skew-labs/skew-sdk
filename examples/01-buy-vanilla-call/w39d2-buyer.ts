/**
 * W39-D2 — BTC buyer/taker on devnet (parallel to W39-D, but on-chain-scan path).
 *
 * Differences vs W39-D:
 *   - Funds 0.15 SOL via system_program::transfer from ~/Downloads/devnet.json
 *     (NOT requestAirdrop) — matches w39c-trader pattern + carve-out spec.
 *   - Discovers BTC quotes by scanning OptionAccount PDAs on-chain via
 *     skew.listOptions({ underlying:"BTC" }) — the indexer-style path —
 *     instead of WebSocket relay quote_request.
 *   - Hits via skew.buy(optionPda, premiumUsd) — the buy_option program path
 *     (current SDK alias for take_quote/atomic_fill_relay against a single
 *     posted option).
 *   - Loops 3 times. SOL budget 0.20 max.
 *   - Fallback if no active BTC quotes after 90s polling: try skew.create()
 *     direct then immediately skew.buy() (will hit "creator==buyer" blocker
 *     but logs honest reason).
 *
 * Constraints (carve-out 2026-05-09):
 *   - Devnet program 3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK only
 *   - Helius RPC only (no api.devnet.solana.com)
 *   - Ephemeral keypair, never persist
 *
 * Run: HELIUS_RPC=$SOLANA_RPC_URL tsx w39d2-buyer.ts
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
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  SkewClient,
  findClearingMemberPda,
  findPositionRegistryPda,
  expiryFromTenorDays,
} from "@skew-labs/sdk";
import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };

const LOG_PATH = "/tmp/skew-w39-trading-log.jsonl";
const AGENT = "W39-D2";
const ROLE = "BTC-buyer";
const POLL_BUDGET_MS = 90_000;
const POLL_INTERVAL_MS = 6_000;
const TARGET_HITS = 3;
const SOL_BUDGET_MAX = 0.20;
const FUND_SOL = 0.15;

interface LogRow {
  ts: string;
  agent: string;
  role: string;
  iter?: number;
  event: string;
  ok: boolean;
  sig?: string | null;
  reason?: string;
  pubkey?: string;
  optionPda?: string | null;
  detail?: Record<string, unknown>;
}

function logRow(row: Omit<LogRow, "ts" | "agent" | "role">): void {
  const entry: LogRow = {
    ts: new Date().toISOString(),
    agent: AGENT,
    role: ROLE,
    ...row,
  };
  fs.appendFileSync(LOG_PATH, JSON.stringify(entry) + "\n");
  const tag = entry.ok ? "OK   " : "BLOCK";
  const sigShort = entry.sig ? ` sig=${entry.sig.slice(0, 12)}…` : "";
  const reason = entry.reason ? ` — ${entry.reason}` : "";
  console.log(`[${tag}] ${entry.event}${reason}${sigShort}`);
}

async function fetchBtcSpotUsd(): Promise<number> {
  const id = "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";
  const r = await fetch(
    `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${id}`,
  ).then((r) => r.json()) as { parsed: Array<{ price: { price: string; expo: number } }> };
  const p = r.parsed[0]!.price;
  return Number(p.price) * Math.pow(10, p.expo);
}

async function main(): Promise<void> {
  const RPC = process.env.HELIUS_RPC ?? process.env.SOLANA_RPC_URL;
  if (!RPC) {
    throw new Error("HELIUS_RPC or SOLANA_RPC_URL env var required");
  }
  if (RPC.includes("api.devnet.solana.com")) {
    throw new Error("api.devnet.solana.com forbidden by absolute law");
  }
  const conn = new Connection(RPC, "confirmed");

  // 1. Load funder
  const funderPath = path.join(os.homedir(), "Downloads", "devnet.json");
  const funder = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(funderPath, "utf-8"))),
  );

  // 2. Generate ephemeral keypair
  const ephemeral = Keypair.generate();
  const pubkey = ephemeral.publicKey.toBase58();
  console.log(`[w39d2] ephemeral pubkey: ${pubkey}`);
  console.log(`[w39d2] funder: ${funder.publicKey.toBase58()}`);
  logRow({
    event: "ephemeral_keypair",
    ok: true,
    pubkey,
    detail: { funder: funder.publicKey.toBase58() },
  });

  // 3. Fund 0.15 SOL via system_program::transfer
  const FUND_LAMPORTS = Math.floor(FUND_SOL * LAMPORTS_PER_SOL);
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
    try {
      const sig = await conn.sendRawTransaction(tx.serialize(), { skipPreflight: false });
      await conn.confirmTransaction(
        { signature: sig, blockhash, lastValidBlockHeight },
        "confirmed",
      );
      logRow({
        event: "fund_sol",
        ok: true,
        sig,
        pubkey,
        detail: { lamports: FUND_LAMPORTS - startBal },
      });
    } catch (e) {
      const reason = (e as Error).message ?? String(e);
      logRow({ event: "fund_sol", ok: false, pubkey, reason: reason.slice(0, 300) });
      console.error(`[w39d2] fund failed: ${reason}`);
      process.exit(1);
    }
  } else {
    logRow({ event: "fund_sol", ok: true, pubkey, reason: "already_funded" });
  }

  // 4. Build SDK client with ephemeral wallet
  const wallet = new Wallet(ephemeral);
  const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
  const program = new Program(idl as never, provider);
  const skew = SkewClient.fromProgram(conn, wallet, program);

  // CM PDA — for final position-size report (taker doesn't need to register
  // on-chain CM for buy_option; PositionRegistry is the relevant proxy).
  const [cmPda] = findClearingMemberPda(ephemeral.publicKey);
  const [posRegPda] = findPositionRegistryPda(ephemeral.publicKey);
  const cmAcctBefore = await conn.getAccountInfo(cmPda);
  const posRegBefore = await conn.getAccountInfo(posRegPda);
  logRow({
    event: "cm_state_pre",
    ok: true,
    detail: {
      cmPda: cmPda.toBase58(),
      cm_exists_before: !!cmAcctBefore,
      posRegPda: posRegPda.toBase58(),
      posReg_exists_before: !!posRegBefore,
    },
  });

  const FUND_TX_FEE_LAMPORTS = 5000; // single fund tx fee absorbed by funder, but our budget tracks net out.
  const startBalanceLamports = await conn.getBalance(ephemeral.publicKey);
  console.log(`[w39d2] starting balance: ${startBalanceLamports / LAMPORTS_PER_SOL} SOL`);
  void FUND_TX_FEE_LAMPORTS;

  let hits = 0;
  let blocked = 0;
  const txSigs: string[] = [];
  const blockReasons: string[] = [];
  const hitOptionPdas: string[] = [];

  // 5. Polling loop — scan on-chain for active BTC quotes (writer-posted options
  // in Created/Funded state, NOT yet bought).
  const startTs = Date.now();
  const seenPdas = new Set<string>();
  let candidatePool: Array<{ pda: PublicKey; creator: PublicKey; optionType: string; state: string; payoffUsd: number; strikeUsd: number }> = [];

  const refreshPool = async (): Promise<void> => {
    try {
      const summaries = await skew.listOptions({
        underlying: "BTC",
        limit: 200,
      });
      candidatePool = summaries
        .filter((s) =>
          // Want quotes that are buyable: writer has deposited, no buyer yet,
          // creator != us. The "Created" / "Funded" / "Active" states all may
          // be buyable depending on writer's collateral state.
          (s.state === "Funded" || s.state === "Active" || s.state === "Created") &&
          s.creator !== pubkey &&
          // Vanilla call preferred per task spec ("vanilla short call quote").
          (s.optionType === "Vanilla" || s.optionType === "VanillaInverse") &&
          s.expiryTs > Math.floor(Date.now() / 1000),
        )
        .map((s) => ({
          pda: new PublicKey(s.pda),
          creator: new PublicKey(s.creator),
          optionType: s.optionType,
          state: s.state,
          payoffUsd: s.payoffUsd,
          strikeUsd: s.strikeUsd,
        }));
    } catch (e) {
      const reason = (e as Error).message ?? String(e);
      logRow({
        event: "list_options_failed",
        ok: false,
        reason: reason.slice(0, 300),
      });
      candidatePool = [];
    }
  };

  await refreshPool();
  logRow({
    event: "initial_scan",
    ok: true,
    detail: {
      btc_active_options: candidatePool.length,
      sample: candidatePool.slice(0, 3).map((c) => ({
        pda: c.pda.toBase58(),
        state: c.state,
        type: c.optionType,
        strike: c.strikeUsd,
        payoff: c.payoffUsd,
      })),
    },
  });

  // Wait/poll until we either accumulate quotes or budget elapses
  while (
    candidatePool.length === 0 &&
    Date.now() - startTs < POLL_BUDGET_MS
  ) {
    const remaining = POLL_BUDGET_MS - (Date.now() - startTs);
    logRow({
      event: "no_btc_quotes_active",
      ok: false,
      reason: "active_btc_options=0",
      detail: { remaining_ms: remaining },
    });
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    await refreshPool();
  }

  if (candidatePool.length > 0) {
    logRow({
      event: "quotes_found",
      ok: true,
      detail: { count: candidatePool.length },
    });
  }

  // 6. Hit-loop: hit up to TARGET_HITS quotes
  for (let iter = 1; iter <= TARGET_HITS; iter++) {
    const balLamports = await conn.getBalance(ephemeral.publicKey);
    const spent = (FUND_LAMPORTS - balLamports) / LAMPORTS_PER_SOL;
    if (spent >= SOL_BUDGET_MAX) {
      logRow({
        event: "sol_budget_exhausted",
        ok: false,
        iter,
        reason: `spent=${spent.toFixed(4)}>=${SOL_BUDGET_MAX}`,
      });
      blocked++;
      blockReasons.push("sol_budget_exhausted");
      break;
    }

    // Refresh pool — quotes may have been posted after initial poll
    await refreshPool();
    const remaining = candidatePool.filter((c) => !seenPdas.has(c.pda.toBase58()));
    if (remaining.length === 0) {
      logRow({
        event: "no_unhit_quotes",
        ok: false,
        iter,
        reason: "all_quotes_consumed_or_none_active",
      });
      blocked++;
      blockReasons.push("no_unhit_quotes");
      // Don't continue looping — break to fallback
      break;
    }

    const target = remaining[0]!;
    seenPdas.add(target.pda.toBase58());
    const premiumUsd = Math.max(0.01, target.payoffUsd * 0.02); // $small premium guess

    logRow({
      event: "hit_attempt",
      ok: true,
      iter,
      optionPda: target.pda.toBase58(),
      detail: {
        creator: target.creator.toBase58(),
        type: target.optionType,
        state: target.state,
        strike: target.strikeUsd,
        payoff: target.payoffUsd,
        premium_usd: premiumUsd,
      },
    });

    try {
      const result = await skew.buy(target.pda, premiumUsd);
      hits++;
      txSigs.push(result.txSignature);
      hitOptionPdas.push(target.pda.toBase58());
      logRow({
        event: "rfq_hit",
        ok: true,
        iter,
        sig: result.txSignature,
        optionPda: target.pda.toBase58(),
        detail: { premium_usd: premiumUsd },
      });
    } catch (e) {
      const reason = (e as Error).message ?? String(e);
      blocked++;
      blockReasons.push(reason.slice(0, 80));
      logRow({
        event: "hit_failed",
        ok: false,
        iter,
        optionPda: target.pda.toBase58(),
        reason: reason.slice(0, 400),
      });
    }
  }

  // 7. Fallback: if no quotes were ever found, try create+self-buy flow
  // (will hit creator==buyer blocker, but documents the path honestly).
  if (hits === 0 && hitOptionPdas.length === 0 && candidatePool.length === 0) {
    logRow({
      event: "fallback_create_then_buy",
      ok: true,
      reason: "no_quotes_in_90s_attempting_self_create_then_buy",
    });
    try {
      const spot = await fetchBtcSpotUsd();
      const strikeUsd = Math.round(spot / 1000) * 1000;
      const expiry = expiryFromTenorDays(7);
      logRow({
        event: "self_create_attempt",
        ok: true,
        detail: { strike: strikeUsd, expiry, payoff_usd: 100 },
      });
      const opt = await skew.create({
        underlying: "BTC",
        payoff: "vanilla_call",
        strike: strikeUsd,
        expiry,
        notional: 100,
      });
      logRow({
        event: "self_create_ok",
        ok: true,
        sig: opt.createTx,
        optionPda: opt.address.toBase58(),
        detail: { depositTx: opt.depositTx },
      });
      // Now attempt buy — expected to fail with creator==buyer
      try {
        const r = await skew.buy(opt.address, 1);
        hits++;
        txSigs.push(r.txSignature);
        hitOptionPdas.push(opt.address.toBase58());
        logRow({
          event: "self_buy_unexpected_success",
          ok: true,
          sig: r.txSignature,
          optionPda: opt.address.toBase58(),
        });
      } catch (e) {
        const reason = (e as Error).message ?? String(e);
        blocked++;
        blockReasons.push("self_buy_creator_eq_buyer");
        logRow({
          event: "self_buy_blocked",
          ok: false,
          reason: reason.slice(0, 400),
        });
      }
    } catch (e) {
      const reason = (e as Error).message ?? String(e);
      blocked++;
      blockReasons.push("self_create_failed");
      logRow({
        event: "self_create_blocked",
        ok: false,
        reason: reason.slice(0, 400),
      });
    }
  }

  // 8. Final state — read CM PDA size + position registry size
  const endBal = await conn.getBalance(ephemeral.publicKey);
  const solSpent = (FUND_LAMPORTS - endBal) / LAMPORTS_PER_SOL;
  const cmAcctAfter = await conn.getAccountInfo(cmPda);
  const posRegAfter = await conn.getAccountInfo(posRegPda);
  const cmSizeAfter = cmAcctAfter ? cmAcctAfter.data.length : 0;
  const posRegSizeAfter = posRegAfter ? posRegAfter.data.length : 0;

  console.log(`\n=== W39-D2 summary ===`);
  console.log(`pubkey:          ${pubkey}`);
  console.log(`quotes hit:      ${hits}`);
  console.log(`blocked:         ${blocked}`);
  console.log(`block reasons:   ${blockReasons.join(", ") || "none"}`);
  console.log(`SOL spent:       ${solSpent.toFixed(6)}`);
  console.log(`SOL remaining:   ${endBal / LAMPORTS_PER_SOL}`);
  console.log(`CM acct after:   exists=${!!cmAcctAfter} bytes=${cmSizeAfter}`);
  console.log(`PosReg after:    exists=${!!posRegAfter} bytes=${posRegSizeAfter}`);
  if (txSigs.length) {
    console.log(`tx sigs:`);
    for (const s of txSigs) console.log(`  ${s}`);
  }
  if (hitOptionPdas.length) {
    console.log(`hit option PDAs:`);
    for (const p of hitOptionPdas) console.log(`  ${p}`);
  }

  logRow({
    event: "summary",
    ok: hits > 0,
    pubkey,
    detail: {
      hits,
      blocked,
      block_reasons: blockReasons,
      tx_sigs: txSigs,
      hit_option_pdas: hitOptionPdas,
      sol_spent: solSpent,
      sol_remaining: endBal / LAMPORTS_PER_SOL,
      cm_exists_after: !!cmAcctAfter,
      cm_bytes_after: cmSizeAfter,
      posReg_exists_after: !!posRegAfter,
      posReg_bytes_after: posRegSizeAfter,
    },
  });
}

main().catch((e) => {
  const reason = (e as Error).message ?? String(e);
  console.error(`[w39d2] FATAL: ${reason}`);
  logRow({
    event: "fatal",
    ok: false,
    reason: reason.slice(0, 800),
  });
  process.exit(1);
});
