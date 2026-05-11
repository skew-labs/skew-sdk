"use strict";
// Off-chain clearing-class margin breakdown — calls the skew-pricing
// `/margin_breakdown` REST endpoint and returns the layered IM
// computation (2-dim, 5-dim, 25-dim, calendar, regime).
//
// Launch PM policy (2026-05-08): on-chain `calculate_margin` and this
// off-chain endpoint use the same conservative ConvexHullIM/floor stack.
// Calendar credit is disabled at launch, non-vanilla Greek credit is
// audit-gated, and ICC credit is applied once under a capped policy.
// Every response carries an `advisory_note`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarginBreakdown = getMarginBreakdown;
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