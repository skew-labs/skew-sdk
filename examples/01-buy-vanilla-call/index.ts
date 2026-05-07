/**
 * 01-buy-vanilla-call — Create/fund a BTC vanilla call in 2 SDK txs.
 *
 * Run: HELIUS_RPC=... KEYPAIR=~/skew-bot.json pnpm tsx index.ts
 *
 * Prerequisites:
 *   - Devnet SOL ≥ 0.1 (rent + tx fees)
 *   - Devnet USDC ≥ $1,000 (collateral for the option you create)
 *   - HELIUS_RPC + KEYPAIR env vars
 */

import * as fs from "node:fs";
import { Connection, Keypair } from "@solana/web3.js";
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import { SkewClient } from "@skew-labs/sdk";
import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };

async function main(): Promise<void> {
  const conn = new Connection(process.env.HELIUS_RPC!, "confirmed");
  const kp = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(process.env.KEYPAIR!, "utf-8"))),
  );
  const wallet = new Wallet(kp);
  const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
  const program = new Program(idl as never, provider);
  const skew = SkewClient.fromProgram(conn, wallet, program);

  console.log(`wallet:  ${kp.publicKey.toBase58()}`);

  // 1. Create — vanilla call, $80k strike, 14d, $1,000 max payoff
  const expiry = new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString();
  console.log(`creating BTC vanilla_call $80k expiry ${expiry}`);
  const opt = await skew.create({
    underlying: "BTC",
    payoff: "vanilla_call",
    strike: 80_000,
    expiry,
    notional: 1_000,
  });
  console.log(`  option PDA: ${opt.address.toBase58()}`);
  console.log(`  create tx:  ${opt.createTx}`);
  console.log(`  deposit tx: ${opt.depositTx}`);

  console.log(`\nW4 note: same-wallet buy is blocked on-chain (creator == buyer).`);
  console.log(`Use a separate buyer wallet or the RFQ/relay path to activate this option.`);

  console.log(`\n✓ done. View on Solana Explorer:`);
  console.log(`  https://explorer.solana.com/address/${opt.address.toBase58()}?cluster=devnet`);
}

main().catch((e) => { console.error(e); process.exit(1); });
