import type { Underlying } from "./types";
/** Vanilla call/put leg in a clearing-class portfolio. */
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
 * Clearing-class compatibility ladder. Mirrors the on-chain `VerifiedTier`
 * enum exactly, while public surfaces render M-class labels.
 *
 * Lockup schedule per `docs/verified-tier-thresholds.md`:
 * - standard: $0     — M0 Segregated
 * - silver:   $500K  — M1 Portfolio
 * - gold:     $2M    — M2 Cross-Asset
 * - platinum: $10M   — M3 Clearing Prime
 */
export type VerifiedTier = "standard" | "silver" | "gold" | "platinum";
/** Full IM-stack breakdown returned by `/margin_breakdown`.
 *
 * Fields below the requested class are gated to `null` (e.g. M1
 * does not return 5-dim or 25-dim numbers since it does not unlock
 * those layers). The `tier_ladder_im_usd` array always returns IM
 * under all 4 tiers regardless of `tier_used` so a CM can decide
 * whether upgrading is worth the lockup cost.
 */
export interface MarginBreakdownResponse {
    /** Per-asset 2-dim ConvexHullIM, indexed BTC..HYPE (5 entries). */
    im_2d_per_asset_usd: number[];
    im_2d_sum_usd: number;
    /** Present only for M2 / M3 classes. */
    im_5d_per_asset_usd?: number[];
    /** Present only for M2 / M3 classes. */
    im_5d_sum_usd?: number;
    /** Present only for M3 in the compatibility response. */
    im_25d_total_usd?: number;
    /**
     * Class-effective IM with launch calendar policy applied — always present.
     * This is the number used by the on-chain `calculate_margin` handler
     * for the requested class.
     */
    im_with_calendar_usd: number;
    /** Present only for M3 in the compatibility response. */
    im_calm_regime_usd?: number;
    /** Present only for M3 in the compatibility response. */
    im_stress_regime_usd?: number;
    calendar_pairs_detected: number;
    /** Always 0 below M3. */
    icc_credit_total_usd: number;
    /** Always 0 below M2. */
    smile_premium_usd: number;
    p_max_table: number[];
    asset_index_map: string[];
    regime_used: string;
    /** Compatibility class resolved from the request. */
    tier_used: VerifiedTier;
    /** Lockup the tier requires in USDC whole units. */
    tier_required_lockup_usd: number;
    /**
     * IM under each of the 4 classes `[M0, M1, M2, M3]`
     * for the same portfolio. Always satisfies
     * `IM_M0 >= IM_M1 >= IM_M2 >= IM_M3`.
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
     * Clearing class to compute IM under. Defaults to `"platinum"` (M3
     * compatibility label). Higher classes always return lower or equal IM on
     * the same portfolio. See `VerifiedTier` for the compatibility values.
     */
    tier?: VerifiedTier;
    /** Optional fetch implementation; useful in browser/test environments. */
    fetchImpl?: typeof fetch;
}
/**
 * Compute the off-chain clearing-class margin breakdown for a candidate
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
 *   console.log(`M3 clearing IM: $${breakdown.im_25d_total_usd}`);
 */
export declare function getMarginBreakdown(legs: MarginBreakdownLeg[], opts?: GetMarginBreakdownOptions): Promise<MarginBreakdownResponse>;
//# sourceMappingURL=margin.d.ts.map