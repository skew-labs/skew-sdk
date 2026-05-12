import { PublicKey } from "@solana/web3.js";
import type { SkewClient } from "./client";
import { type InstantRfqHitResult, type InstantRfqOptionSpec } from "./instant-rfq";
import { type StandardTenorDays } from "./pda";
import type { ClearingMemberSnapshot, ClearingState, Direction, OptionSummary, PayoffType, PmGuarantee, PortfolioSnapshot, RejectionReason, RfqAuctionSnapshot, TradeState, Underlying } from "./types";
export type SkewRfqExpiryInput = `${number}d` | StandardTenorDays | string | Date;
export type SkewRfqStatus = "open" | "filled" | "cancelled" | "expired" | "failed";
export interface SkewRfqRequestArgs {
    asset?: Underlying;
    underlying?: Underlying;
    payoff: PayoffType;
    strike: number;
    notional: number;
    expiry: SkewRfqExpiryInput;
    maxPremiumUsd?: number;
    maxPremium?: number;
    settlementMint?: PublicKey | string;
    upperBoundUsd?: number;
    upperBound?: number;
    extraParam?: number;
    direction?: Direction;
    relayUrl?: string;
    quoteTimeoutMs?: number;
    quoteExpirySeconds?: number;
    skipMoneynessPreflight?: boolean;
}
export interface SkewRfqBuiltRequest {
    asset: Underlying;
    payoff: PayoffType;
    strike: number;
    notional: number;
    expiryTs: bigint;
    expiryIso: string;
    settlementMint: PublicKey;
    settlementDecimals: 6 | 9;
    optionSpec: InstantRfqOptionSpec;
    relayRequest: Record<string, unknown>;
    maxPremiumUnits?: bigint;
    oraclePreflight?: SkewRfqOraclePreflight;
}
export interface SkewRfqAuctionRegisteredContext {
    auctionId: bigint;
    auction: PublicKey;
    escrow: PublicKey;
    registerTxSignature: string;
    request: SkewRfqBuiltRequest;
    snapshot: RfqAuctionSnapshot | null;
}
export interface SkewRfqAuctionAndFillArgs extends SkewRfqRequestArgs {
    auctionId?: bigint;
    auctionDurationSlots?: number | bigint;
    auctionWaitMs?: number;
    auctionPollMs?: number;
    minAuctionQuotes?: number;
    finalizeAuction?: boolean;
    instantQuoteTimeoutMs?: number;
    instantSettleMs?: number;
    instantHitTimeoutMs?: number;
    requireAuctionQuote?: boolean;
    requireInstantMakerMatchesAuction?: boolean;
    eligibleMakerCount?: number;
    isBlockTrade?: boolean;
    minimumSizeMicro?: bigint;
    onAuctionRegistered?: (ctx: SkewRfqAuctionRegisteredContext) => Promise<void> | void;
}
export interface SkewRfqAuctionAndFillResult {
    success: true;
    executionLane: "auction_to_instant_pm_fill";
    pmBacked: true;
    pmGuarantee: "guaranteed";
    auction: {
        auctionId: bigint;
        pda: string;
        escrow: string;
        registerTxSignature: string;
        finalizeTxSignature: string | null;
        stateBeforeFill: RfqAuctionSnapshot["state"] | null;
        stateAfterFinalize: RfqAuctionSnapshot["state"] | null;
        bestQuoteMm: string | null;
        bestQuotePremiumMicro: bigint | null;
        bestQuotePremiumUsd: number | null;
        usedAsInstantMakerFilter: boolean;
    };
    fill: SkewRfqFillResult;
    readbackOk: boolean;
    readbackErrors: string[];
}
export interface SkewRfqOraclePreflight {
    source: "devnet-pyth" | "hermes";
    spotUsd: number;
    strikeMinUsd: number;
    strikeMaxUsd: number;
    strikeBps: number;
}
export interface SkewRfqQuote {
    id: string;
    tradeState?: Extract<TradeState, "QUOTE_RECEIVED">;
    relayNonce: bigint;
    maker: PublicKey;
    makerBase58: string;
    premiumUnits: bigint;
    premium: number;
    premiumUsd?: number;
    ttlSeconds: number | null;
    receivedAt: number;
    relayEventId?: string;
    relaySequence?: number;
    serverTimeMs?: number;
    raw: Record<string, unknown>;
}
export interface SkewRfqAcceptOptions {
    maxPremiumUsd?: number;
    maxPremium?: number;
    quoteExpirySeconds?: number;
    timeoutMs?: number;
}
export interface SkewRfqFillMarginReadback {
    notional: number;
    notionalUnits: bigint;
    preTotalPmLockedUsd: number | null;
    postTotalPmLockedUsd: number | null;
    pmLockedDeltaUsd: number | null;
    pmLockedDeltaPctOfNotional: number | null;
    postLastImUsd: number | null;
    postLastImPctOfNotional: number | null;
    freeCollateralUsd: number | null;
    prePositionsCount: number | null;
    postPositionsCount: number | null;
    riskPreflight?: InstantRfqHitResult["riskPreflight"];
}
export interface SkewRfqFillPortfolioReadback {
    buyerBefore?: PortfolioSnapshot;
    buyerAfter?: PortfolioSnapshot;
    makerAfter?: PortfolioSnapshot;
    buyerHasLong: boolean;
    makerHasShort: boolean;
}
export interface SkewRfqFillResult {
    success: true;
    executionLane: "instant_rfq_atomic_fill";
    tradeState: TradeState;
    clearingState: ClearingState;
    pmBacked: boolean;
    pmGuarantee: PmGuarantee;
    registryUpdated: boolean;
    rejectionReason?: RejectionReason;
    relayEventId?: string;
    relaySequence?: number;
    serverTimeMs?: number;
    txSignature: string;
    explorer: string;
    optionPda: string;
    quote: SkewRfqQuote;
    request: SkewRfqBuiltRequest;
    option: OptionSummary | null;
    margin: SkewRfqFillMarginReadback;
    portfolio: SkewRfqFillPortfolioReadback;
    readbackOk: boolean;
    readbackErrors: string[];
    seriesPrerequisite: Record<string, unknown>;
}
export interface SkewRfqWaitOptions {
    timeoutMs?: number;
    settleMs?: number;
}
export interface SkewRfqMakerServeArgs {
    premiumUsd?: number;
    premium?: number;
    quoteTtlSeconds?: number;
    relayUrl?: string;
    timeoutMs?: number;
    autoPrepare?: boolean;
    refreshPmCacheBeforeQuote?: boolean;
    initialCollateralUsdc?: number;
    filters?: {
        assets?: Underlying[];
        payoffs?: PayoffType[];
    };
    quote?: (request: SkewRfqMakerRequest) => Promise<SkewRfqMakerQuote | null> | SkewRfqMakerQuote | null;
    signDigest: (digest: Uint8Array, request: SkewRfqMakerRequest) => Promise<Uint8Array> | Uint8Array;
}
export interface SkewRfqMakerRequest {
    relayNonce: bigint;
    asset: Underlying;
    payoff: PayoffType;
    strike: number;
    expiryTs: bigint;
    notional: number;
    raw: Record<string, unknown>;
}
export interface SkewRfqMakerQuote {
    premiumUsd?: number;
    premium?: number;
    premiumUnits?: bigint;
    ttlSeconds?: number;
}
export interface SkewRfqMakerServeResult {
    filled: boolean;
    maker: string;
    quoteRequest: SkewRfqMakerRequest;
    quoteAck: Record<string, unknown>;
    marginPreview: Record<string, unknown> | null;
    fillExecuted: Record<string, unknown> | null;
    clearingMemberAfter: ClearingMemberSnapshot | null;
}
export declare class SkewRfqClient {
    private readonly skew;
    constructor(skew: SkewClient);
    buildRequest(args: SkewRfqRequestArgs): Promise<SkewRfqBuiltRequest>;
    request(args: SkewRfqRequestArgs): Promise<SkewRfqSession>;
    stream(args: SkewRfqRequestArgs): Promise<AsyncIterable<SkewRfqQuote>>;
    /**
     * Official Auction RFQ execution wrapper.
     *
     * Auction RFQ is price discovery only: register, collect firm on-chain quotes,
     * and finalize/refund escrow. The actual PM-backed option issuance is then
     * forced through the Instant RFQ relay's `atomic_fill_from_relay` lane.
     * This method intentionally refuses to fall back to the legacy pre-funded
     * bridge when the auction or matching instant quote is missing.
     */
    auctionAndFill(args: SkewRfqAuctionAndFillArgs): Promise<SkewRfqAuctionAndFillResult>;
    validateMoneyness(asset: Underlying, strike: number): Promise<SkewRfqOraclePreflight>;
    readonly maker: {
        serve: (args: SkewRfqMakerServeArgs) => Promise<SkewRfqMakerServeResult>;
    };
}
export declare class SkewRfqSession {
    private readonly skew;
    readonly request: SkewRfqBuiltRequest;
    private readonly options;
    private ws;
    private opened;
    private closed;
    private failure;
    private relayNonceValue;
    private readonly quoteQueue;
    private readonly waiters;
    private endTimer;
    status: SkewRfqStatus;
    tradeState: TradeState;
    clearingState: ClearingState;
    constructor(skew: SkewClient, request: SkewRfqBuiltRequest, options?: {
        relayUrl?: string;
        quoteTimeoutMs?: number;
        quoteExpirySeconds?: number;
    });
    get relayNonce(): bigint | null;
    get quotesSeen(): readonly SkewRfqQuote[];
    get bestQuote(): SkewRfqQuote | null;
    open(): Promise<void>;
    quotes(): AsyncIterable<SkewRfqQuote>;
    waitForQuotes(options?: {
        minQuotes?: number;
        timeoutMs?: number;
    }): Promise<SkewRfqQuote[]>;
    waitForBestQuote(options?: SkewRfqWaitOptions): Promise<SkewRfqQuote>;
    accept(quote?: SkewRfqQuote | null, options?: SkewRfqAcceptOptions): Promise<SkewRfqFillResult>;
    close(): void;
    private parseQuote;
    private pushQuote;
    private waitForChange;
    private notify;
    private fail;
    private finish;
}
//# sourceMappingURL=rfq.d.ts.map