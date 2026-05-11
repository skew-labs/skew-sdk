"use strict";
// Off-chain fee estimator — calls the skew-pricing `/estimate_fee` REST
// endpoint and returns the v5.1 effective fee breakdown for a candidate
// trade (VIP x clearing-class x Builder).
//
// The on-chain `compute_effective_fee_bps` is bit-identical with this
// preview when the inputs match; integrators should still rely on the
// final on-chain value at settlement time. Spec: `docs/fee-schedule-v5.1.md`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateFee = estimateFee;
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
async function estimateFee(params, opts = {}) {
    const url = (opts.pricingUrl ?? "https://skew-pricing.fly.dev").replace(/\/$/, "") +
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
        throw new Error(`estimateFee: ${url} returned HTTP ${resp.status} ${resp.statusText}`);
    }
    return (await resp.json());
}
//# sourceMappingURL=fee.js.map