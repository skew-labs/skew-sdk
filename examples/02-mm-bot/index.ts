/**
 * 02-mm-bot — Self-onboarding Market Maker bot.
 *
 * - Idempotent CM register on first run ($50K USDC collateral)
 * - WebSocket subscribe to skew-relay
 * - On quote_request: Black-Scholes price + 1.5× spread → quote_ack
 *
 * Run: HELIUS_RPC=... KEYPAIR=~/cm.json RELAY_URL=... pnpm tsx index.ts
 *
 * The Black-Scholes helper is intentionally minimal (~30 lines) — production
 * MM bots should use a robust library (mathjs, gauss-cdf, etc).
 */

import * as fs from "node:fs";
import { Connection, Keypair } from "@solana/web3.js";
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import { SkewClient, findClearingMemberPda } from "@skew/sdk";
import idl from "@skew/sdk/idl/skew_master.json" assert { type: "json" };
import WebSocket from "ws";

// ---------- Black-Scholes (no deps) ----------
function normCdf(x: number): number {
  const a1 =  0.254829592, a2 = -0.284496736, a3 =  1.421413741;
  const a4 = -1.453152027, a5 =  1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x) / Math.sqrt(2);
  const t = 1 / (1 + p * ax);
  const y = 1 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t * Math.exp(-ax*ax);
  return 0.5 * (1 + sign * y);
}
function bsPrice(spot: number, strike: number, T: number, sigma: number, isCall: boolean): number {
  if (T <= 0) return Math.max(0, isCall ? spot - strike : strike - spot);
  const d1 = (Math.log(spot/strike) + 0.5*sigma*sigma*T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return isCall
    ? spot * normCdf(d1) - strike * normCdf(d2)
    : strike * normCdf(-d2) - spot * normCdf(-d1);
}

// ---------- Hermes spot fetch ----------
const HERMES_FEEDS: Record<string, string> = {
  BTC:  "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH:  "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  SOL:  "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
  XRP:  "ec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8",
};
async function spotFor(asset: string): Promise<number> {
  const id = HERMES_FEEDS[asset];
  if (!id) throw new Error(`no Pyth feed for ${asset}`);
  const r = await fetch(
    `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${id}`,
  ).then((r) => r.json()) as { parsed: Array<{ price: { price: string; expo: number } }> };
  const p = r.parsed[0]!.price;
  return Number(p.price) * Math.pow(10, p.expo);
}

const ASSET_DEFAULT_SIGMA: Record<string, number> = {
  BTC: 0.45, ETH: 0.65, SOL: 0.80, XRP: 0.75, HYPE: 0.85,
};
const SPREAD_MULT = 0.015; // master paper §30.2 OPT 1: 1.5% (1.015× fair value floor)

async function main(): Promise<void> {
  const conn = new Connection(process.env.HELIUS_RPC!, "confirmed");
  const kp = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(process.env.KEYPAIR!, "utf-8"))),
  );
  const wallet = new Wallet(kp);
  const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
  const program = new Program(idl as never, provider);
  const skew = SkewClient.fromProgram(conn, wallet, program);
  const CM_AUTHORITY = kp.publicKey.toBase58();
  console.log(`MM wallet: ${CM_AUTHORITY}`);

  // Idempotent CM register
  const [cmPda] = findClearingMemberPda(kp.publicKey);
  if (!(await conn.getAccountInfo(cmPda))) {
    console.log("registering as CM with $50K collateral...");
    const r = await skew.registerClearingMember({ initialCollateralUsdc: 50_000 });
    console.log(`  CM PDA: ${r.cmPda.toBase58()}`);
  } else {
    console.log(`existing CM PDA: ${cmPda.toBase58()}`);
  }

  // Subscribe to relay
  const ws = new WebSocket(process.env.RELAY_URL ?? "wss://skew-relay-devnet.fly.dev/subscribe");
  ws.on("message", async (raw) => {
    const msg = JSON.parse(raw.toString());
    switch (msg.kind) {
      case "hello":
        ws.send(JSON.stringify({ kind: "identify", role: "cm", authority: CM_AUTHORITY }));
        return;
      case "identified":
        console.log("MM bot online — awaiting RFQs");
        return;
      case "quote_request": {
        try {
          const isCall = msg.option_type?.toLowerCase().includes("call");
          const spot = await spotFor(msg.asset);
          const T = (msg.expiry_ts - Date.now() / 1000) / (365 * 86400);
          const sigma = ASSET_DEFAULT_SIGMA[msg.asset] ?? 0.5;
          const fair = bsPrice(spot, msg.strike, T, sigma, isCall);
          const ask = fair * (1 + SPREAD_MULT);
          ws.send(JSON.stringify({
            kind: "quote_ack",
            request_id: msg.request_id,
            cm_authority: CM_AUTHORITY,
            premium: ask,
            ttl_seconds: 30,
          }));
          console.log(`quoted ${msg.asset} ${msg.option_type} K=${msg.strike} for $${ask.toFixed(2)} (fair $${fair.toFixed(2)})`);
        } catch (e) {
          console.error("quote failed:", e instanceof Error ? e.message : String(e));
        }
        return;
      }
      case "error":
        console.error("relay:", msg.reason);
        return;
    }
  });
  ws.on("close", () => { console.log("relay closed, exiting"); process.exit(0); });
}

main().catch((e) => { console.error(e); process.exit(1); });
