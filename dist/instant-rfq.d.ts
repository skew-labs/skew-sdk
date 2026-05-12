import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
type SignableTransaction = Transaction | VersionedTransaction;
import type { ClearingState, RejectionReason, TradeState } from "./types";
export declare const INSTANT_RFQ_DEFAULT_RELAY_URL = "wss://skew-relay-devnet.fly.dev/subscribe";
export declare const INSTANT_RFQ_DEFAULT_QUOTE_EXPIRY_SECONDS = 600;
export declare const INSTANT_RFQ_DEFAULT_COLLECT_TIMEOUT_MS = 60000;
export declare const INSTANT_RFQ_DEFAULT_HIT_TIMEOUT_MS = 120000;
export declare const RELAY_PAYLOAD_LEN: 132;
export declare class RfqWalletMessageSigningUnsupported extends Error {
    readonly code = "RFQ_WALLET_MESSAGE_SIGNING_UNSUPPORTED";
    constructor(cause?: unknown);
}
export declare class InstantRfqError extends Error {
    readonly tradeState: TradeState;
    readonly clearingState: ClearingState;
    readonly rejectionReason: RejectionReason;
    readonly raw?: Record<string, unknown>;
    constructor(message: string, opts?: {
        rejectionReason?: RejectionReason;
        raw?: Record<string, unknown>;
    });
}
export interface RelayPayload {
    relayNonce: bigint;
    quoteExpiryTs: bigint;
    optionType: number;
    asset: number;
    direction: number;
    strike: bigint;
    expiryTs: bigint;
    payoffAmount: bigint;
    settlementDecimals: number;
    upperBound: bigint;
    extraParam: number;
    premium: bigint;
    settlementMint: Uint8Array;
    /** Phase 7-H · F3.1 (2026-05-09) — v2 buyer-binding (32 B at offsets
     *  100..132). The on-chain handler asserts
     *  `payload.buyer == ctx.accounts.buyer.key()` so a relay-compromised
     *  cm_sig cannot be replayed against a different buyer Signer. */
    buyer: Uint8Array;
}
export interface InstantRfqOptionSpec {
    asset: number;
    strike: bigint;
    expiryTs: bigint;
    payoffAmountMicro: bigint;
    optionType: number;
    direction: number;
    upperBound: bigint;
    extraParam?: number;
}
export interface InstantRfqQuote {
    relayNonce: bigint;
    cmPubkey: PublicKey;
    premiumMicro: bigint;
    ttlSeconds: number | null;
    receivedAt: number | null;
    tradeState?: Extract<TradeState, "QUOTE_RECEIVED">;
    relayEventId?: string;
    relaySequence?: number;
    serverTimeMs?: number;
    raw: Record<string, unknown>;
}
export interface InstantRfqHitResult {
    relayNonce: bigint;
    txSignature: string;
    optionPda: string;
    tradeState?: TradeState;
    clearingState?: ClearingState;
    pmBacked?: boolean;
    pmGuarantee?: "guaranteed";
    registryUpdated?: boolean;
    rejectionReason?: RejectionReason;
    relayEventId?: string;
    relaySequence?: number;
    serverTimeMs?: number;
    simulatedUnits?: number;
    premiumDestination?: string;
    autoPreparedAccounts?: string[];
    riskPreflight?: {
        status?: string;
        preImMicro?: bigint;
        preImUsd?: number;
        postImMicro?: bigint;
        postImUsd?: number;
        requiredDeltaMicro?: bigint;
        requiredDeltaUsd?: number;
        freeCollateralMicro?: bigint;
        freeCollateralUsd?: number;
        afterFillFreeMicro?: bigint;
        afterFillFreeUsd?: number;
        healthBeforeBps?: bigint;
        healthAfterBps?: bigint;
        marginalImLockedMicro?: bigint;
        marginalImLockedUsd?: number;
        marginalImLockedPctOfNotional?: number;
        feeMicro?: bigint;
        feeUsd?: number;
        premiumMicro?: bigint;
        premiumUsd?: number;
        mmp?: string;
        positionAccounts?: number;
    };
}
export declare function validateInstantRfqLane(payload: RelayPayload): void;
export declare function buildRelayPayload(args: {
    relayNonce: bigint;
    optionSpec: InstantRfqOptionSpec;
    premiumMicro: bigint;
    settlementMint: PublicKey | Uint8Array;
    settlementDecimals?: number;
    quoteExpiryTs?: bigint;
    /** Phase 7-H · F3.1 (2026-05-09) — v2 buyer-binding. Required: the buyer
     *  wallet that will sign the atomic_fill_from_relay transaction. Bound
     *  into the digest so a stolen cm_sig cannot replay against a different
     *  buyer Signer. */
    buyer: PublicKey | Uint8Array;
}): RelayPayload;
export declare function encodeRelayPayload(payload: RelayPayload): Uint8Array;
export declare function relayPayloadDigest(payloadOrBytes: RelayPayload | Uint8Array): Uint8Array;
export declare function relayPayloadToJson(payload: RelayPayload): Record<string, unknown>;
export declare function collectInstantRfqQuotes(args: {
    buyer: PublicKey;
    request: Record<string, unknown>;
    relayUrl?: string;
    timeoutMs?: number;
    maxQuotes?: number;
}): Promise<{
    relayNonce: bigint;
    quotes: InstantRfqQuote[];
}>;
type InstantRfqHitBaseArgs = {
    buyer: PublicKey;
    cmPubkey: PublicKey;
    payload: RelayPayload;
    signTransaction: <T extends SignableTransaction>(transaction: T) => Promise<T>;
    relayUrl?: string;
    timeoutMs?: number;
};
/**
 * Browser-safe Instant RFQ hit path.
 *
 * The buyer does not sign an arbitrary digest. Instead, the relay prepares the
 * exact atomic_fill_from_relay transaction after the selected CM signs the
 * payload digest, then the browser wallet signs that transaction normally.
 */
export declare function hitInstantRfqQuoteTxSigned(args: InstantRfqHitBaseArgs): Promise<InstantRfqHitResult>;
/**
 * Legacy bot/HSM Instant RFQ hit path. Kept for server wallets that can sign a
 * detached Ed25519 digest. Browser wallets should use
 * hitInstantRfqQuoteTxSigned to avoid Phantom/Solflare signMessage failures.
 */
export declare function hitInstantRfqQuote(args: InstantRfqHitBaseArgs & {
    signMessage: (message: Uint8Array) => Promise<Uint8Array>;
}): Promise<InstantRfqHitResult>;
export {};
//# sourceMappingURL=instant-rfq.d.ts.map