import { PublicKey, Transaction } from "@solana/web3.js";
export declare const INSTANT_RFQ_DEFAULT_RELAY_URL = "wss://skew-relay-devnet.fly.dev/subscribe";
export declare const RELAY_PAYLOAD_LEN: 100;
export declare class RfqWalletMessageSigningUnsupported extends Error {
    readonly code = "RFQ_WALLET_MESSAGE_SIGNING_UNSUPPORTED";
    constructor(cause?: unknown);
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
    raw: Record<string, unknown>;
}
export interface InstantRfqHitResult {
    relayNonce: bigint;
    txSignature: string;
    optionPda: string;
    simulatedUnits?: number;
    premiumDestination?: string;
    autoPreparedAccounts?: string[];
    riskPreflight?: {
        status?: string;
        preImMicro?: bigint;
        postImMicro?: bigint;
        requiredDeltaMicro?: bigint;
        freeCollateralMicro?: bigint;
        afterFillFreeMicro?: bigint;
        healthBeforeBps?: bigint;
        healthAfterBps?: bigint;
        marginalImLockedMicro?: bigint;
        feeMicro?: bigint;
        premiumMicro?: bigint;
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
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
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