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
export declare function routeToBestQuote(client: SkewClient, candidates: RouterCandidate[], opts?: RouteOptions): Promise<RouteResult>;
//# sourceMappingURL=router.d.ts.map