import type { VerifiedTier } from "./margin";
/** Trade side — taker pays, maker pays a smaller (or equal) symmetric fee. */
export type FeeSide = "taker" | "maker";
/** v5.1 fee breakdown returned by `/estimate_fee`. */
export interface FeeBreakdown {
    /** Resolved VIP tier (0..6) from 30d volume + equity. */
    vip_tier: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /** Verified tier echo. */
    verified_tier: VerifiedTier;
    /** Side echo (`"taker"` or `"maker"`). */
    side: FeeSide;
    /** Effective fee in bps after VIP × Verified discounts. */
    effective_bps: number;
    /** Effective fee in USD on the supplied premium. */
    fee_usd: number;
    /** Was the 12.5%-of-premium fee cap applied? */
    cap_applied: boolean;
    /** Protocol's portion of the taker fee (USD). */
    protocol_fee_usd: number;
    /** Builder's portion of the taker fee (USD). Zero when not routed via builder. */
    builder_fee_usd: number;
    /** Base fee in bps (3.0 for Skew v5.1, matching Deribit). */
    base_bps: number;
    /** VIP discount percentage applied (0..66.66). */
    vip_discount_pct: number;
    /** Verified-tier discount percentage applied (0/10/20/30). */
    verified_discount_pct: number;
    /** Builder share in bps (effective_bps × 25% when routed). */
    builder_share_bps: number;
    /** Premium echo. */
    premium_usd: number;
    /** Advisory disclaimer. Read it. */
    advisory_note: string;
}
export interface EstimateFeeOptions {
    /** Pricing-server base URL. Defaults to `https://skew-pricing.fly.dev`. */
    pricingUrl?: string;
    /** Optional fetch implementation; useful in browser/test environments. */
    fetchImpl?: typeof fetch;
}
export interface EstimateFeeParams {
    /** 30-day rolling options notional in USD whole units. Drives VIP tier. */
    volume30dUsd: number;
    /** Equity in USD whole units. VIP1 equity-based entry path (≥ $25K). */
    equityUsd?: number;
    /** Defaults to `"standard"`. */
    verifiedTier?: VerifiedTier;
    /** Defaults to `"taker"`. */
    side?: FeeSide;
    /** Premium of the candidate trade in USD. Defaults to $100. */
    premiumUsd?: number;
    /** True if this trade is routed through a registered builder code. */
    hasBuilder?: boolean;
}
/**
 * Estimate the v5.1 effective fee for a candidate trade.
 *
 * @example
 *   import { estimateFee } from "@skew-labs/sdk";
 *   const fee = await estimateFee({
 *     volume30dUsd: 5_000_000,
 *     verifiedTier: "silver",
 *     side: "taker",
 *     premiumUsd: 100,
 *     hasBuilder: true,
 *   });
 *   console.log(`Effective taker: ${fee.effective_bps} bps`);
 *   console.log(`Builder gets: $${fee.builder_fee_usd}`);
 */
export declare function estimateFee(params: EstimateFeeParams, opts?: EstimateFeeOptions): Promise<FeeBreakdown>;
//# sourceMappingURL=fee.d.ts.map