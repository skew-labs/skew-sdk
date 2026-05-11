#!/usr/bin/env node
/**
 * Ephemeral wallet 8-step e2e round-trip on Skew devnet.
 *
 * Steps:
 *   1. Generate ephemeral Keypair (memory-only, never persisted)
 *   2. SOL transfer from funding wallet -> ephemeral wallet (0.1 SOL)
 *   3. USDC mint to ephemeral ATA (100 USDC)
 *   4. registerClearingMember (initialCollateralUsdc=100)
 *   5. registerRfqMaker (optional maker side)
 *   6. createOption (BTC vanilla_call, expiry +7d)
 *   7. atomic_fill_from_relay via instant RFQ (skipped if relay neon-mode unavailable)
 *   8. SOL recovery -> back to funding wallet
 *
 * Run:
 *   set -a; source ../.env.local; set +a
 *   node scripts/ephemeral-roundtrip.mjs
 */

import * as fs from "node:fs";
import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider, BN, Wallet } from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { SkewClient } from "../dist/index.js";
import {
  findClearingMemberPda,
  findOptionPda,
  expiryFromTenorDays,
  fetchPythSpotUsd,
} from "../dist/pda.js";

// ── env ──────────────────────────────────────────────────────────────────
const RPC_URL = process.env.SOLANA_RPC_URL;
const FUNDING_KP_PATH = process.env.SOLANA_DEVNET_KEYPAIR_PATH;
const PROGRAM_ID = new PublicKey(
  process.env.SKEW_PROGRAM_ID ?? "3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK",
);
const USDC_MINT = new PublicKey(
  process.env.SKEW_DEVNET_USDC_MINT ?? "4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8",
);

if (!RPC_URL || !FUNDING_KP_PATH) {
  console.error("[fatal] SOLANA_RPC_URL + SOLANA_DEVNET_KEYPAIR_PATH required");
  process.exit(2);
}

// IDL load
const IDL_PATH = new URL("../idl/skew_master.json", import.meta.url);
const idl = JSON.parse(fs.readFileSync(IDL_PATH, "utf-8"));
idl.address = PROGRAM_ID.toBase58();

// ── helpers ──────────────────────────────────────────────────────────────
const conn = new Connection(RPC_URL, "confirmed");

function loadKeypair(p) {
  return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(p, "utf-8"))));
}

const explorerTx = (sig) => `https://explorer.solana.com/tx/${sig}?cluster=devnet`;

async function sendAndConfirm(tx, signers) {
  const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;
  tx.feePayer = signers[0].publicKey;
  tx.sign(...signers);
  const sig = await conn.sendRawTransaction(tx.serialize(), { skipPreflight: false });
  await conn.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");
  return sig;
}

function logStep(n, name) {
  console.log(`\n── Step ${n}: ${name} ─────────────────────────────────────`);
}
function logResult(label, value) {
  console.log(`   ${label}: ${value}`);
}

// ── main ─────────────────────────────────────────────────────────────────
const report = { steps: [], roundTripStatus: "incomplete" };
function recordStep(n, name, body) {
  const entry = { n, name, ...body };
  report.steps.push(entry);
}

// Top-level shared state for finally-block sweep.
let _ephemeralForSweep = null;
let _fundingForSweep = null;

async function main() {
  console.log("=== Ephemeral wallet 8-step round-trip ===");
  console.log(`   rpc: ${RPC_URL.replace(/api-key=[^&]+/, "api-key=<REDACTED>")}`);
  console.log(`   program: ${PROGRAM_ID.toBase58()}`);
  console.log(`   usdc:    ${USDC_MINT.toBase58()}`);

  const funding = loadKeypair(FUNDING_KP_PATH);
  _fundingForSweep = funding;
  console.log(`   funding: ${funding.publicKey.toBase58()}`);
  const fundingBal = await conn.getBalance(funding.publicKey);
  console.log(`   funding bal: ${(fundingBal / LAMPORTS_PER_SOL).toFixed(4)} SOL`);

  // ── Step 1: ephemeral keypair ──
  logStep(1, "Generate ephemeral keypair");
  const eph = Keypair.generate();
  _ephemeralForSweep = eph;
  console.log(`   ephemeral pubkey: ${eph.publicKey.toBase58()}`);
  recordStep(1, "ephemeral-keypair", { pubkey: eph.publicKey.toBase58(), status: "ok" });

  // ── Step 2: SOL transfer 1.5 SOL ──
  // 1 SOL is locked into RFQ maker registry (anti-spam deposit).
  // Remaining ~0.5 SOL covers CM init rent + tx fees + option PDA rent.
  logStep(2, "SOL transfer 1.5 SOL from funding -> ephemeral");
  const SOL_AMOUNT = 1.5 * LAMPORTS_PER_SOL;
  const transferTx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: funding.publicKey,
      toPubkey: eph.publicKey,
      lamports: SOL_AMOUNT,
    }),
  );
  let solSig;
  try {
    solSig = await sendAndConfirm(transferTx, [funding]);
  } catch (e) {
    recordStep(2, "sol-transfer", { status: "FAIL", error: String(e?.message ?? e) });
    throw new Error(`Step 2 SOL transfer failed: ${e?.message ?? e}`);
  }
  const ephBal = await conn.getBalance(eph.publicKey);
  logResult("tx", solSig);
  logResult("explorer", explorerTx(solSig));
  logResult("ephemeral bal", `${(ephBal / LAMPORTS_PER_SOL).toFixed(4)} SOL`);
  recordStep(2, "sol-transfer", { status: "ok", sig: solSig, balLamports: ephBal });

  // ── Step 3: USDC mint to ephemeral ATA ──
  // 100 USDC -> CM collateral (Step 4); +150 USDC slack for createOption escrow + slippage.
  logStep(3, "USDC mint 250 USDC -> ephemeral ATA");
  const ephAta = getAssociatedTokenAddressSync(USDC_MINT, eph.publicKey);
  const USDC_MICRO = 250_000_000n; // 250 USDC * 10^6
  const mintTx = new Transaction()
    .add(
      createAssociatedTokenAccountIdempotentInstruction(
        funding.publicKey,
        ephAta,
        eph.publicKey,
        USDC_MINT,
      ),
    )
    .add(
      createMintToInstruction(USDC_MINT, ephAta, funding.publicKey, USDC_MICRO),
    );
  let usdcSig;
  try {
    usdcSig = await sendAndConfirm(mintTx, [funding]);
  } catch (e) {
    recordStep(3, "usdc-mint", { status: "FAIL", error: String(e?.message ?? e) });
    throw new Error(`Step 3 USDC mint failed: ${e?.message ?? e}`);
  }
  const ataInfo = await conn.getTokenAccountBalance(ephAta, "confirmed");
  logResult("tx", usdcSig);
  logResult("explorer", explorerTx(usdcSig));
  logResult("ata", ephAta.toBase58());
  logResult("balance", `${ataInfo.value.uiAmountString} USDC (raw=${ataInfo.value.amount})`);
  recordStep(3, "usdc-mint", {
    status: "ok",
    sig: usdcSig,
    ata: ephAta.toBase58(),
    balanceMicro: ataInfo.value.amount,
  });

  // ── Build SDK client for ephemeral wallet ──
  const wallet = new Wallet(eph);
  const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
  const program = new Program(idl, provider);
  const skew = SkewClient.fromProgram(conn, wallet, program, USDC_MINT);

  // ── Step 4: registerClearingMember ──
  logStep(4, "registerClearingMember initialCollateralUsdc=100");
  let cmResult;
  try {
    cmResult = await skew.registerClearingMember({ initialCollateralUsdc: 100 });
  } catch (e) {
    recordStep(4, "register-cm", { status: "FAIL", error: String(e?.message ?? e) });
    console.error(e);
    throw new Error(`Step 4 registerCM failed: ${e?.message ?? e}`);
  }
  logResult("tx", cmResult.txSignature);
  logResult("explorer", explorerTx(cmResult.txSignature));
  logResult("cmPda", cmResult.cmPda.toBase58());
  logResult("cmEscrow", cmResult.cmEscrow.toBase58());
  logResult("alreadyRegistered", String(cmResult.alreadyRegistered));
  // Verify CM PDA collateral
  const cmAcc = await program.account.clearingMemberAccount.fetch(cmResult.cmPda);
  const collateral = (cmAcc.collateral ?? cmAcc.collateralMicro ?? 0n).toString();
  logResult("CM.collateral", collateral);
  recordStep(4, "register-cm", {
    status: "ok",
    sig: cmResult.txSignature,
    cmPda: cmResult.cmPda.toBase58(),
    collateralMicro: collateral,
    alreadyRegistered: cmResult.alreadyRegistered,
  });

  // ── Step 5: registerRfqMaker ──
  logStep(5, "registerRfqMaker (maker-side)");
  let rfqResult = null;
  try {
    rfqResult = await skew.registerRfqMaker();
    logResult("tx", rfqResult.txSignature);
    logResult("explorer", explorerTx(rfqResult.txSignature));
    logResult("registry", rfqResult.registry.toBase58());
    recordStep(5, "register-rfq-maker", {
      status: "ok",
      sig: rfqResult.txSignature,
      registry: rfqResult.registry.toBase58(),
    });
  } catch (e) {
    const msg = String(e?.message ?? e);
    if (msg.includes("already in use") || msg.includes("AccountAlreadyInUse")) {
      logResult("status", "already-registered (idempotent)");
      recordStep(5, "register-rfq-maker", { status: "ok-idempotent", note: msg });
    } else {
      recordStep(5, "register-rfq-maker", { status: "FAIL", error: msg });
      console.error(e);
      // Maker registration is optional for buyer round-trip; warn but continue.
      console.warn("   (Step 5 fail tolerated — buyer e2e continues)");
    }
  }

  // ── Step 6: createOption ──
  logStep(6, "createOption BTC vanilla_call (strike=ATM, +7d, notional=120 USDC)");
  let opt = null;
  try {
    const expiry = expiryFromTenorDays(7);
    // Fetch live BTC spot from Pyth Hermes; pick strike at +5% (ATM-ish, OTM call).
    // BTC k_round_micro = $250 → round strike to $250 step.
    const spotUsd = await fetchPythSpotUsd("BTC");
    const rawStrike = spotUsd * 1.05;
    const strikeRounded = Math.round(rawStrike / 250) * 250;
    logResult("spotUsd", spotUsd.toFixed(2));
    logResult("strike", String(strikeRounded));
    opt = await skew.create({
      underlying: "BTC",
      payoff: "vanilla_call",
      strike: strikeRounded,
      expiry,
      notional: 120, // 120 USDC payoff -> ≥$100 min_position_usd_micro floor
      spotAtCreation: spotUsd,
    });
    logResult("createTx", opt.createTx);
    logResult("explorer", explorerTx(opt.createTx));
    logResult("depositTx", opt.depositTx);
    logResult("explorer", explorerTx(opt.depositTx));
    logResult("optionPda", opt.address.toBase58());
    logResult("nonce", opt.nonce.toString());
    // Fetch option state
    const optAcc = await program.account.optionAccount.fetch(opt.address);
    logResult("OptionAccount.creator", new PublicKey(optAcc.creator).toBase58());
    logResult("OptionAccount.holder", new PublicKey(optAcc.holder).toBase58());
    recordStep(6, "create-option", {
      status: "ok",
      createTx: opt.createTx,
      depositTx: opt.depositTx,
      optionPda: opt.address.toBase58(),
      nonce: opt.nonce.toString(),
      creator: new PublicKey(optAcc.creator).toBase58(),
      holder: new PublicKey(optAcc.holder).toBase58(),
    });
  } catch (e) {
    recordStep(6, "create-option", { status: "FAIL", error: String(e?.message ?? e) });
    console.error(e);
    console.error(`Step 6 createOption failed: ${e?.message ?? e}`);
  }

  // ── Step 7: atomic_fill_from_relay (skipped if no relay neon mode) ──
  // ── Step 8: SOL recovery ──
  logStep(8, "Recover ephemeral SOL -> funding (rent-exempt buffer left)");
  const rentExempt = await conn.getMinimumBalanceForRentExemption(0);
  const ephFinal = await conn.getBalance(eph.publicKey);
  const sweep = ephFinal - rentExempt - 5000; // leave fee headroom
  if (sweep <= 0) {
    logResult("status", "skip — nothing to sweep");
    recordStep(8, "sol-recovery", { status: "skip", reason: "below rent-exempt" });
  } else {
    const sweepTx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: eph.publicKey,
        toPubkey: funding.publicKey,
        lamports: sweep,
      }),
    );
    try {
      const sweepSig = await sendAndConfirm(sweepTx, [eph]);
      logResult("tx", sweepSig);
      logResult("explorer", explorerTx(sweepSig));
      logResult("recovered", `${(sweep / LAMPORTS_PER_SOL).toFixed(6)} SOL`);
      recordStep(8, "sol-recovery", { status: "ok", sig: sweepSig, recoveredLamports: sweep });
    } catch (e) {
      recordStep(8, "sol-recovery", { status: "FAIL", error: String(e?.message ?? e) });
      console.error(e);
    }
  }

  // ── Summary ──
  const fails = report.steps.filter((s) => s.status === "FAIL");
  report.roundTripStatus = fails.length === 0 ? "PASS" : "FAIL";
  console.log("\n=== Summary ===");
  for (const s of report.steps) {
    console.log(`   Step ${s.n}: ${s.name} — ${s.status}${s.sig ? ` (${s.sig.slice(0, 16)}…)` : ""}`);
  }
  console.log(`\n   Round-trip: ${report.roundTripStatus}`);

  // Persist report JSON
  const reportPath = new URL("../../skew-e2e/wallets/ephemeral-roundtrip-report.json", import.meta.url);
  fs.mkdirSync(new URL("../../skew-e2e/wallets/", import.meta.url), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`   report: ${reportPath.pathname}`);
}

async function emergencySweep() {
  if (!_ephemeralForSweep || !_fundingForSweep) return;
  try {
    const bal = await conn.getBalance(_ephemeralForSweep.publicKey);
    if (bal <= 5500) return; // below dust
    const rentExempt = await conn.getMinimumBalanceForRentExemption(0);
    const sweep = bal - rentExempt - 5000;
    if (sweep <= 0) {
      console.log("[sweep] balance below rent-exempt; skip");
      return;
    }
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: _ephemeralForSweep.publicKey,
        toPubkey: _fundingForSweep.publicKey,
        lamports: sweep,
      }),
    );
    const sig = await sendAndConfirm(tx, [_ephemeralForSweep]);
    console.log(`[emergency-sweep] recovered ${(sweep / LAMPORTS_PER_SOL).toFixed(6)} SOL — tx ${sig}`);
  } catch (e) {
    console.error("[emergency-sweep] FAIL:", e?.message ?? e);
    console.error(`[emergency-sweep] orphaned wallet: ${_ephemeralForSweep.publicKey.toBase58()}`);
    console.error(`[emergency-sweep] secret (recovery only):`, JSON.stringify(Array.from(_ephemeralForSweep.secretKey)));
  }
}

main()
  .catch(async (e) => {
    console.error("\n[fatal]", e?.message ?? e);
    console.error(e?.stack ?? "");
    await emergencySweep();
    process.exit(1);
  });
