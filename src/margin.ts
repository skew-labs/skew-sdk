// Off-chain Verified-tier margin breakdown — calls the skew-pricing
// `/margin_breakdown` REST endpoint and returns the layered IM
// computation (2-dim, 5-dim, 25-dim, calendar, regime).
//
// Phase 1633.B unified PM (2026-04-30): the on-chain `calculate_margin`
// handler now runs the same closed-form ConvexHullIM 2-dim Taylor
// envelope as this off-chain endpoint, with calendar netting bps
// dispatched per tier (Standard 0% / Silver 50% / Gold + Platinum 85%).
// On-chain ↔ off-chain agreement is gated to ≤ 1 bps via
// `tier_cross_validation.rs`. Every response carries an `advisory_note`.

import type { Underlying } from "./types";

/** Vanilla call/put leg in a Verified-tier portfolio. */
export interface MarginBreakdownLeg {
  asset: Underlying;
  /** The 2-dim ConvexHullIM model is closed-form for vanillas only. */
  kind: "VanillaCall" | "VanillaPut";
  strike: number;
  spot: number;
  /** Time to expiry in years. */
  t_years: number;
  /** Annualised IV used to compute the leg's BS Greeks. */
  iv: number;
  /** Risk-free rate (default 0). */
  r?: number;
  side: "Long" | "Short";
  /** Absolute contract count (always non-negative; sign comes from `side`). */
  qty: number;
}

/**
 * Verified-Tier capital ladder. Mirrors the on-chain `VerifiedTier`
 * enum exactly (`Standard=0, Silver=1, Gold=2, Platinum=3`).
 *
 * Lockup schedule per `docs/verified-tier-thresholds.md`:
 * - Standard:   $0       — permissionless, ConvexHullIM 2-dim (cal=0%)
 * - Silver:     $500K    — + 50% same-asset calendar netting + Hamilton stress L_a
 * - Gold:       $2M      — + 5-dim SSVI smile (ρ, η, γ) + 85% calendar netting
 * - Platinum:   $10M     — + 25-dim sign-aware cross-asset ICC adjustment
 */
export type VerifiedTier = "standard" | "silver" | "gold" | "platinum";

/** Full IM-stack breakdown returned by `/margin_breakdown`.
 *
 * Fields below the requested tier are gated to `null` (e.g. Silver
 * does not return 5-dim or 25-dim numbers since it does not unlock
 * those layers). The `tier_ladder_im_usd` array always returns IM
 * under all 4 tiers regardless of `tier_used` so a CM can decide
 * whether upgrading is worth the lockup cost.
 */
export interface MarginBreakdownResponse {
  /** Per-asset 2-dim ConvexHullIM, indexed BTC..HYPE (5 entries). */
  im_2d_per_asset_usd: number[];
  im_2d_sum_usd: number;
  /** Present only for Gold / Platinum tiers. */
  im_5d_per_asset_usd?: number[];
  /** Present only for Gold / Platinum tiers. */
  im_5d_sum_usd?: number;
  /** Present only for Platinum (the only tier that unlocks ICC). */
  im_25d_total_usd?: number;
  /**
   * Tier-effective IM with calendar netting applied — always present.
   * This is the number used by the on-chain `calculate_margin` handler
   * for the requested tier.
   */
  im_with_calendar_usd: number;
  /** Present only for Platinum (the only tier that unlocks Hamilton). */
  im_calm_regime_usd?: number;
  /** Present only for Platinum (the only tier that unlocks Hamilton). */
  im_stress_regime_usd?: number;
  calendar_pairs_detected: number;
  /** Always 0 below Platinum. */
  icc_credit_total_usd: number;
  /** Always 0 below Gold. */
  smile_premium_usd: number;
  p_max_table: number[];
  asset_index_map: string[];
  regime_used: string;
  /** Verified tier resolved from the request. */
  tier_used: VerifiedTier;
  /** Lockup the tier requires in USDC whole units. */
  tier_required_lockup_usd: number;
  /**
   * IM under each of the 4 tiers `[Standard, Silver, Gold, Platinum]`
   * for the same portfolio. Always satisfies
   * `Standard ≥ Silver ≥ Gold ≥ Platinum`.
   */
  tier_ladder_im_usd: [number, number, number, number];
  n_legs_parsed: number;
  /** Advisory note — read it. */
  advisory_note: string;
  error: string | null;
}

export interface GetMarginBreakdownOptions {
  /** Pricing-server base URL. Defaults to `https://skew-pricing.fly.dev`. */
  pricingUrl?: string;
  /** Regime — `"Calm"` (default) or `"Stress"`. */
  regime?: "Calm" | "Stress";
  /**
   * Verified tier to compute IM under. Defaults to `"platinum"`
   * (full closed-form). Higher tiers always return lower or equal IM
   * on the same portfolio. See `VerifiedTier` for the lockup schedule.
   */
  tier?: VerifiedTier;
  /** Optional fetch implementation; useful in browser/test environments. */
  fetchImpl?: typeof fetch;
}

/**
 * Compute the off-chain Verified-tier margin breakdown for a candidate
 * portfolio. Does not require an Anchor connection or wallet; it's a
 * pure HTTP call against the skew-pricing service.
 *
 * @example
 *   import { getMarginBreakdown } from "@skew-labs/sdk";
 *   const breakdown = await getMarginBreakdown(
 *     [
 *       { asset: "BTC", kind: "VanillaCall", strike: 80_000, spot: 80_000,
 *         t_years: 14 / 365, iv: 0.5, side: "Short", qty: 1 },
 *     ],
 *     { regime: "Calm" }
 *   );
 *   console.log(`Verified-tier 25-dim IM: $${breakdown.im_25d_total_usd}`);
 */
export async function getMarginBreakdown(
  legs: MarginBreakdownLeg[],
  opts: GetMarginBreakdownOptions = {},
): Promise<MarginBreakdownResponse> {
  const url =
    (opts.pricingUrl ?? "https://skew-pricing.fly.dev").replace(/\/$/, "") +
    "/margin_breakdown";
  const body = JSON.stringify({
    legs: legs.map((l) => ({
      asset: l.asset,
      kind: l.kind,
      strike: l.strike,
      spot: l.spot,
      t_years: l.t_years,
      iv: l.iv,
      r: l.r ?? 0,
      side: l.side,
      qty: l.qty,
    })),
    regime: opts.regime ?? "Calm",
    tier: opts.tier ?? "platinum",
  });
  const fetchFn = opts.fetchImpl ?? fetch;
  const resp = await fetchFn(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!resp.ok) {
    throw new Error(
      `getMarginBreakdown: ${url} returned HTTP ${resp.status} ${resp.statusText}`,
    );
  }
  return (await resp.json()) as MarginBreakdownResponse;
}
