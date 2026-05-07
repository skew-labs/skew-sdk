"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarginBreakdown = getMarginBreakdown;
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
async function getMarginBreakdown(legs, opts = {}) {
    const url = (opts.pricingUrl ?? "https://skew-pricing.fly.dev").replace(/\/$/, "") +
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
        throw new Error(`getMarginBreakdown: ${url} returned HTTP ${resp.status} ${resp.statusText}`);
    }
    return (await resp.json());
}
//# sourceMappingURL=margin.js.map