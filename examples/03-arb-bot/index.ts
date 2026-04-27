// Module marker — enables top-level await in tsc isolatedModules mode.
export {};

/**
 * 03-arb-bot — Skew vs Deribit ATM premium arbitrage scanner.
 *
 * Round 25 rewrite — uses LIVE Skew /price endpoint (real BSM impl) + Pyth
 * Hermes spot, eliminating Round 23 dependency on phantom /iv. Compares Skew
 * suggested ATM premium vs Deribit DVOL-implied premium for the same option.
 * If discrepancy > 100bps relative, prints arb opportunity (paper trade only —
 * cross-venue execution requires Deribit API auth, out of scope here).
 *
 * Run:  pnpm tsx index.ts
 */

const TICK_MS = 60_000;
const DIFF_THRESHOLD_BPS = 100;
const ASSETS = ["BTC", "ETH"] as const;
type Asset = (typeof ASSETS)[number];

const SKEW_API = process.env.SKEW_API ?? "https://skew-pricing.fly.dev";

const HERMES_FEEDS: Record<Asset, string> = {
  BTC: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
};

interface PythHermesResp {
  parsed: Array<{ price: { price: string; expo: number } }>;
}

interface SkewPriceResp {
  suggested: number;
  confidence: string;
  method: string;
}

interface DeribitVolResp {
  result?: { data?: Array<[number, number, number, number, number]> };
}

async function pythSpot(asset: Asset): Promise<number> {
  const id = HERMES_FEEDS[asset];
  const r = (await fetch(
    `https://hermes.pyth.network/v2/updates/price/latest?ids%5B%5D=${id}`,
  ).then((r) => r.json())) as PythHermesResp;
  const p = r.parsed[0]!.price;
  return Number(p.price) * Math.pow(10, p.expo);
}

async function skewPriceAtm(asset: Asset, spot: number, T_years: number): Promise<number> {
  const r = (await fetch(`${SKEW_API}/price`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      option_type: "vanilla_call",
      strike: spot,        // ATM = spot
      spot,
      vol: 0.45,           // default — Skew /price recomputes via fitter
      t_years: T_years,
    }),
  }).then((r) => r.json())) as SkewPriceResp;
  return r.suggested;
}

async function deribitDvol(asset: Asset): Promise<number> {
  const url = `https://www.deribit.com/api/v2/public/get_volatility_index_data?currency=${asset}&start_timestamp=${Date.now() - 5 * 60_000}&end_timestamp=${Date.now()}&resolution=60`;
  const r = (await fetch(url).then((r) => r.json())) as DeribitVolResp;
  const last = r.result?.data?.at(-1);
  if (!last) throw new Error(`Deribit returned no DVOL for ${asset}`);
  return last[4] / 100; // close, percent → fraction
}

// Quick BSM closed-form for the Deribit comparison (DVOL is annualized vol → premium via BSM)
function bsCallAtm(spot: number, sigma: number, T: number): number {
  const d1 = 0.5 * sigma * Math.sqrt(T);
  const d2 = -d1;
  function ncdf(x: number): number {
    const a = [0.254829592, -0.284496736, 1.421413741, -1.453152027, 1.061405429];
    const sign = x < 0 ? -1 : 1;
    const ax = Math.abs(x) / Math.sqrt(2);
    const t = 1 / (1 + 0.3275911 * ax);
    const y = 1 - (((((a[4]! * t + a[3]!) * t) + a[2]!) * t + a[1]!) * t + a[0]!) * t * Math.exp(-ax * ax);
    return 0.5 * (1 + sign * y);
  }
  return spot * ncdf(d1) - spot * ncdf(d2);
}

async function tick(): Promise<void> {
  const now = new Date().toISOString();
  console.log(`[${now}] scanning ATM 28d for ${ASSETS.join(", ")}...`);
  const T_years = 28 / 365;
  for (const asset of ASSETS) {
    try {
      const spot = await pythSpot(asset);
      const [skewPrem, deribitVol] = await Promise.all([
        skewPriceAtm(asset, spot, T_years),
        deribitDvol(asset),
      ]);
      const deribitPrem = bsCallAtm(spot, deribitVol, T_years);
      const diffPct = Math.abs(skewPrem - deribitPrem) / Math.max(skewPrem, deribitPrem);
      const diffBps = Math.round(diffPct * 10_000);
      const dir = skewPrem < deribitPrem ? "Skew cheap" : "Skew rich";
      console.log(
        `  ${asset}: spot=$${spot.toFixed(2)} skew=$${skewPrem.toFixed(2)} deribit=$${deribitPrem.toFixed(2)} (DVOL ${(deribitVol * 100).toFixed(1)}%) diff=${diffBps}bps (${dir})`,
      );
      if (diffBps > DIFF_THRESHOLD_BPS) {
        const side = skewPrem < deribitPrem ? "buy" : "sell";
        console.log(`  ARB ${asset}: ${side} on Skew + opposite on Deribit (cross-venue hedge: needs Deribit API auth)`);
      }
    } catch (e) {
      console.error(`  ${asset}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

console.log(`arb scanner — every ${TICK_MS / 1000}s, threshold ${DIFF_THRESHOLD_BPS}bps`);
console.log(`Skew API:    ${SKEW_API}`);
console.log(`Pyth:        Hermes (BTC/ETH spot)`);
console.log(`Deribit:     /public/get_volatility_index_data\n`);
await tick();
setInterval(() => tick().catch(console.error), TICK_MS);
