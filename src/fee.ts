// Off-chain fee estimator — calls the skew-pricing `/estimate_fee` REST
// endpoint and returns the v5.1 effective fee breakdown for a candidate
// trade (VIP x clearing-class x Builder).
//
// The on-chain `compute_effective_fee_bps` is bit-identical with this
// preview when the inputs match; integrators should still rely on the
// final on-chain value at settlement time. Spec: `docs/fee-schedule-v5.1.md`.

import type { VerifiedTier } from "./margin";

/** Trade side — taker pays, maker pays a smaller (or equal) symmetric fee. */
export type FeeSide = "taker" | "maker";

/** v5.1 fee breakdown returned by `/estimate_fee`. */
export interface FeeBreakdown {
  /** Resolved VIP tier (0..6) from 30d volume + equity. */
  vip_tier: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Clearing-class compatibility echo. */
  verified_tier: VerifiedTier;
  /** Side echo (`"taker"` or `"maker"`). */
  side: FeeSide;
  /** Effective fee in bps after VIP and clearing-class discounts. */
  effective_bps: number;
  /** Effective fee in USD on the supplied premium. */
  fee_usd: number;
  /** Was the 12.5%-of-premium fee cap applied? */
  cap_applied: boolean;
  /** Protocol's portion of the taker fee (USD). */
  protocol_fee_usd: number;
  /** Builder's portion of the taker fee (USD). Zero when not routed via builder. */
  builder_fee_usd: number;
  /** Base fee in bps. */
  base_bps: number;
  /** VIP discount percentage applied (0..66.66). */
  vip_discount_pct: number;
  /** Clearing-class discount percentage applied (0/10/20/30). */
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
export async function estimateFee(
  params: EstimateFeeParams,
  opts: EstimateFeeOptions = {},
): Promise<FeeBreakdown> {
  const url =
    (opts.pricingUrl ?? "https://skew-pricing.fly.dev").replace(/\/$/, "") +
    "/estimate_fee";
  const body = JSON.stringify({
    volume_30d_usd: params.volume30dUsd,
    equity_usd: params.equityUsd ?? 0,
    verified_tier: params.verifiedTier ?? "standard",
    side: params.side ?? "taker",
    premium_usd: params.premiumUsd ?? 100,
    has_builder: params.hasBuilder ?? false,
  });
  const fetchFn = opts.fetchImpl ?? fetch;
  const resp = await fetchFn(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!resp.ok) {
    throw new Error(
      `estimateFee: ${url} returned HTTP ${resp.status} ${resp.statusText}`,
    );
  }
  return (await resp.json()) as FeeBreakdown;
}
