/**
 * 05-delta-hedge-bot — keep portfolio Δ-neutral by Jupiter spot rebalance.
 *
 * Every 30s: aggregate Δ across active positions, compute hedge gap, rebalance
 * via Jupiter swap if |gap| > REBALANCE_THRESHOLD * portfolio Δ.
 *
 * Run: HELIUS_RPC=... KEYPAIR=~/skew-bot.json SKEW_API=... pnpm tsx index.ts
 *
 * Caveat — Jupiter CPI integration is stubbed. Production version should
 * wire @jup-ag/api to actually swap; this example logs the swap and updates
 * a local hedge state.
 */

import * as fs from "node:fs";
import { Keypair } from "@solana/web3.js";

interface Position {
  position_pda: string;
  asset: string;
  option_type: string;
  side: "Buy" | "Sell";
  strike: number;
  expiry_ts: number;
  notional_usd_micro: number;
}

interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

const TICK_MS = 30_000;
const REBALANCE_THRESHOLD = 0.05; // 5% relative threshold

let spotHedgeNotional: Record<string, number> = {}; // per-asset, USD signed (+long, -short)

async function fetchPositions(authority: string): Promise<Position[]> {
  const r = await fetch(`${process.env.SKEW_API}/v1/positions?authority=${authority}&state=Active`);
  if (!r.ok) throw new Error(`positions API: ${r.status}`);
  return await r.json() as Position[];
}

async function fetchGreeks(asset: string, K: number, T_days: number, cp: "C" | "P"): Promise<Greeks> {
  const url = `${process.env.SKEW_API}/v1/options/greeks?asset=${asset}&K=${K}&T_days=${T_days}&cp=${cp}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`greeks API: ${r.status}`);
  return await r.json() as Greeks;
}

async function tick(authority: string): Promise<void> {
  const now = new Date().toISOString();
  let positions: Position[];
  try {
    positions = await fetchPositions(authority);
  } catch (e) {
    console.error(`[${now}] positions fetch failed:`, e instanceof Error ? e.message : String(e));
    return;
  }

  // Aggregate Δ per asset
  const portfolioDelta: Record<string, number> = {};
  for (const p of positions) {
    const T = (p.expiry_ts - Date.now() / 1000) / 86400;
    if (T <= 0) continue;
    const cp: "C" | "P" = p.option_type.includes("Call") ? "C" : "P";
    try {
      const g = await fetchGreeks(p.asset, p.strike, Math.ceil(T), cp);
      const sign = p.side === "Buy" ? 1 : -1;
      const dollarDelta = sign * g.delta * (p.notional_usd_micro / 1e6);
      portfolioDelta[p.asset] = (portfolioDelta[p.asset] ?? 0) + dollarDelta;
    } catch (e) {
      console.error(`  greeks ${p.asset}/${p.strike}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  console.log(`[${now}] ${positions.length} active positions`);
  for (const [asset, d] of Object.entries(portfolioDelta)) {
    const hedge = spotHedgeNotional[asset] ?? 0;
    const net = d + hedge;
    const rebalanceTarget = -d;
    const adjustment = rebalanceTarget - hedge;
    const relative = Math.abs(d) > 0.01 ? Math.abs(net / d) : 0;
    console.log(`  ${asset}: portfolio Δ=${d.toFixed(2)} hedge=${hedge.toFixed(2)} net=${net.toFixed(2)} rel=${(relative*100).toFixed(1)}%`);
    if (relative > REBALANCE_THRESHOLD && Math.abs(adjustment) > 100) {
      console.log(`  ${asset}: REBALANCE — swap ${adjustment.toFixed(2)} via Jupiter (TODO: wire @jup-ag/api)`);
      spotHedgeNotional[asset] = rebalanceTarget;
    }
  }
}

async function main(): Promise<void> {
  const kp = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(process.env.KEYPAIR!, "utf-8"))),
  );
  const authority = kp.publicKey.toBase58();
  console.log(`hedge bot for ${authority} — every ${TICK_MS / 1000}s, threshold ${REBALANCE_THRESHOLD * 100}%`);
  await tick(authority);
  setInterval(() => tick(authority).catch(console.error), TICK_MS);
}

main().catch((e) => { console.error(e); process.exit(1); });
