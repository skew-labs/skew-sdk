// Phase 5 (2026-05-04) — Client-side best-ex preview.
//
// Anchor agent rejected on-chain `route_to_best_quote` (best-only model →
// per-auction best is already the optimum; client RPC fold is zero-CU).
// This module is the off-chain fold.
//
// Strategy: given N auction PDAs, fetch each `auction.best_quote`, sort by
// premium ascending, and return a launch-safe route preview. Skew has two RFQ lanes:
//   1. Instant RFQ HIT: relay websocket quote_request →
//      buyer_accept_tx_signed → cm_sign → buyer_tx_signed →
//      atomic_fill_from_relay. Bot/HSM callers may still use legacy
//      buyer_accept with a detached digest signature.
//   2. Auction RFQ: register_rfq_auction → submit_rfq_quote/direct →
//      finalize_rfq_auction as firm quote tape / price discovery.
//
// The current program's take_best_quote path is not exposed by the launch SDK:
// it does not mint/novate a cleared option and can leave premium escrow behind.
// Keep aggregation as deterministic routing intelligence until the on-chain
// execution semantics are completed.

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
  /** Deprecated no-op; relay-signed auction takes remain disabled. */
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
 * Route across already-fetched Auction RFQ candidates.
 *
 * Caller is responsible for `RouterCandidate[]` construction — typically
 * fetched via `client.fetchRfqAuction(...)` per auction PDA, or from the
 * cached `/api/rfq-auctions` indexer feed.
 *
 * Launch behavior is fail-closed: Auction RFQ can publish/finalize a firm
 * quote tape, but cleared execution routes through Instant RFQ.
 */
export async function routeToBestQuote(
  client: SkewClient,
  candidates: RouterCandidate[],
  opts: RouteOptions = {},
): Promise<RouteResult> {
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
    void client;
    void opts.viaRelay;
    skipped.push(c);
    failures.push({
      auction: c.auction.toBase58(),
      premiumMicro: c.bestPremiumMicro,
      error:
        "Auction RFQ HIT is disabled in the launch program. Use finalize_rfq_auction for tape, then Instant RFQ atomic_fill_from_relay for cleared execution.",
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
