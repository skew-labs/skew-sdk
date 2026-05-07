// Phase 5 (2026-05-04) — Client-side best-ex preview.
//
// Anchor agent rejected on-chain `route_to_best_quote` (best-only model →
// per-auction best is already the optimum; client RPC fold is zero-CU).
// This module is the off-chain fold.
//
// Strategy: given N auction PDAs, fetch each `auction.best_quote`, sort by
// premium ascending, and return the preview shape. The current Anchor IDL no
// longer exposes `take_best_quote`, so this module deliberately refuses to
// execute auction quotes as fills. Skew now has two RFQ lanes:
//   1. Instant RFQ HIT: relay websocket quote_request → buyer_accept → cm_sign
//      → buyer_tx_signed → atomic_fill_from_relay.
//   2. Auction RFQ: register_rfq_auction → submit_rfq_quote →
//      finalize_rfq_auction. This is price discovery / event finalization.
//
// The "aggregator" is purely informational at first glance — multi-auction
// browsing — but the value is the unified 1-button "fill all" execution.

import type { PublicKey } from "@solana/web3.js";
import { SkewClient } from "./client";

export interface RouterCandidate {
  auction: PublicKey;
  /** Best quote premium in micro USDC (1e6 = 1 USDC). */
  bestPremiumMicro: bigint;
  /** Auction's payoff size in micro USDC. */
  payoffMicro: bigint;
  /** Best-quoting MM, base58. */
  mm: string;
  /** Slot at which the best quote was posted. */
  postedSlot: number;
  /** Slot until which the quote is valid. */
  validUntilSlot: number;
}

export interface RouteOptions {
  /**
   * Aggressive (default): preview every candidate in ascending-premium order
   * until depleted or notional cap hit. Conservative: only the cheapest N
   * candidates (configured via topN).
   */
  mode?: "aggressive" | "conservative";
  /** When mode = "conservative", limit to top N cheapest candidates. */
  topN?: number;
  /** Stop after total payoffMicro accumulates to this cap. */
  notionalCapMicro?: bigint;
  /** Deprecated no-op; auction quote execution is disabled in current RFQ v1. */
  viaRelay?: boolean;
}

export interface RouteHit {
  auction: string;
  mm: string;
  premiumMicro: bigint;
  txSig: string;
}
export interface RouteFailure {
  auction: string;
  premiumMicro: bigint;
  error: string;
}
export interface RouteResult {
  /** Successfully filled. */
  hits: RouteHit[];
  /** Tried but rejected (e.g., TakeQuotePriceMoved, expired quote). */
  failures: RouteFailure[];
  /** Skipped due to notional cap or topN limit. */
  skipped: RouterCandidate[];
  totalPremiumMicroSpent: bigint;
  totalPayoffMicroAcquired: bigint;
}

/**
 * Deprecated execution helper. Kept for API compatibility so old callers fail
 * loudly instead of trying to build an instruction that is not in the IDL.
 *
 * Caller is responsible for `RouterCandidate[]` construction — typically
 * fetched via `client.fetchRfqAuction(...)` per auction PDA, or from the
 * cached `/api/rfq-auctions` indexer feed.
 */
export async function routeToBestQuote(
  client: SkewClient,
  candidates: RouterCandidate[],
  opts: RouteOptions = {},
): Promise<RouteResult> {
  void client;
  void opts;
  const mode = opts.mode ?? "aggressive";
  const topN = opts.topN ?? Infinity;

  // Sort ascending — cheapest first.
  const sorted = candidates.slice().sort((a, b) => {
    if (a.bestPremiumMicro < b.bestPremiumMicro) return -1;
    if (a.bestPremiumMicro > b.bestPremiumMicro) return 1;
    return a.postedSlot - b.postedSlot;
  });

  const targets = mode === "conservative" ? sorted.slice(0, topN) : sorted;
  const hits: RouteHit[] = [];
  const failures: RouteFailure[] = [];
  const skipped: RouterCandidate[] = [];

  let totalPremium = 0n;
  let totalPayoff = 0n;
  const cap = opts.notionalCapMicro;

  for (const c of targets) {
    if (cap !== undefined && totalPayoff + c.payoffMicro > cap) {
      skipped.push(c);
      continue;
    }
    failures.push({
      auction: c.auction.toBase58(),
      premiumMicro: c.bestPremiumMicro,
      error:
        "take_best_quote is not in the current skew_master IDL. Use Instant RFQ relay HIT (buyer_accept + cm_sign + buyer_tx_signed) for click-to-fill, or finalize the auction lane after close_slot.",
    });
  }
  // mode=aggressive remainder beyond topN doesn't apply; if topN ≤ sorted.length
  // and mode=conservative, everything past topN is "skipped" (not attempted).
  if (mode === "conservative" && topN < sorted.length) {
    for (const c of sorted.slice(topN)) {
      if (!skipped.some((s) => s.auction.equals(c.auction))) {
        skipped.push(c);
      }
    }
  }

  return {
    hits,
    failures,
    skipped,
    totalPremiumMicroSpent: totalPremium,
    totalPayoffMicroAcquired: totalPayoff,
  };
}
