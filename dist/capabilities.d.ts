import type { Underlying } from "./types";
export type SkewCollateralSymbol = "USDC" | "wSOL" | "jitoSOL";
export type SkewTradeLaneId = "instant_rfq" | "auction_rfq" | "maker_axe" | "prefunded_listing" | "combo_v1" | "combo_v2" | "conditional_oco" | "builder_routing" | "series_listing" | "cm_collateral";
export interface SkewCollateralRail {
    symbol: SkewCollateralSymbol;
    decimals: number;
    custody: "spl-token" | "native-sol-vault";
    role: readonly string[];
    liveLanes: readonly SkewTradeLaneId[];
    note: string;
}
export interface SkewTradeLaneCapability {
    id: SkewTradeLaneId;
    label: string;
    status: "live" | "keeper-assisted" | "state-only";
    primary: boolean;
    entrypoints: readonly string[];
    protocol: readonly string[];
    settlement: readonly SkewCollateralSymbol[];
    summary: string;
    note: string;
}
export interface SkewTenorPolicy {
    onChainBucketsDays: readonly number[];
    allowedTenorsByUnderlying: Record<Underlying, readonly number[]>;
    toleranceSeconds: number;
    minimumBucketDays: number;
    note: string;
}
export declare const SKEW_CAPABILITIES_VERSION: "2026-05-07";
export declare const SKEW_UNDERLYINGS: readonly ["BTC", "ETH", "SOL", "XRP", "HYPE"];
export declare const SKEW_ANCHOR_OPTION_TYPES: readonly ["Vanilla", "Digital", "CappedVanilla", "RangeAccrual", "VanillaInverse", "DigitalInverse"];
export declare const SKEW_PAYOFF_TYPES: readonly ["digital_call", "digital_put", "vanilla_call", "vanilla_put", "capped_call", "capped_put", "range_accrual", "vanilla_inverse_call", "vanilla_inverse_put", "digital_inverse_call", "digital_inverse_put"];
export declare const SKEW_ASSET_PAYOFFS: {
    readonly BTC: readonly ["digital_call", "digital_put", "vanilla_call", "vanilla_put", "capped_call", "capped_put", "range_accrual"];
    readonly ETH: readonly ["digital_call", "digital_put", "vanilla_call", "vanilla_put", "capped_call", "capped_put", "range_accrual"];
    readonly SOL: readonly ["digital_call", "digital_put", "vanilla_call", "vanilla_put", "capped_call", "capped_put", "range_accrual", "vanilla_inverse_call", "vanilla_inverse_put", "digital_inverse_call", "digital_inverse_put"];
    readonly XRP: readonly ["digital_call", "digital_put", "vanilla_call", "vanilla_put", "capped_call", "capped_put"];
    readonly HYPE: readonly ["digital_call", "digital_put", "vanilla_call", "vanilla_put"];
};
export declare const SKEW_TENOR_POLICY: {
    readonly onChainBucketsDays: readonly [1, 7, 14, 28, 90];
    readonly allowedTenorsByUnderlying: {
        readonly BTC: readonly [1, 7, 14, 28, 90];
        readonly ETH: readonly [1, 7, 14, 28, 90];
        readonly SOL: readonly [1, 7, 14, 28, 90];
        readonly XRP: readonly [7, 14, 28];
        readonly HYPE: readonly [1, 7, 14, 28];
    };
    readonly toleranceSeconds: 3600;
    readonly minimumBucketDays: 1;
    readonly note: "Live on-chain create/fill paths require expiry to land inside the asset's allowed tenor buckets, with +/-1h tolerance. BTC/ETH/SOL accept 1d/7d/14d/28d/90d; XRP accepts 7d/14d/28d; HYPE accepts 1d/7d/14d/28d. Sub-1d binaries are intentionally not enabled in the current deployment.";
};
export declare const SKEW_COLLATERAL_RAILS: readonly [{
    readonly symbol: "USDC";
    readonly decimals: 6;
    readonly custody: "spl-token";
    readonly role: readonly ["premium", "payoff", "clearing-member collateral", "RFQ v1 escrow"];
    readonly liveLanes: readonly ["instant_rfq", "auction_rfq", "prefunded_listing", "combo_v1", "combo_v2", "conditional_oco", "builder_routing", "series_listing", "cm_collateral"];
    readonly note: "Canonical stable settlement rail for the pre-funded listing, Auction RFQ, and PM/CM atomic fill lanes.";
}, {
    readonly symbol: "wSOL";
    readonly decimals: 9;
    readonly custody: "native-sol-vault";
    readonly role: readonly ["native SOL collateral", "SOL inverse settlement"];
    readonly liveLanes: readonly ["instant_rfq", "cm_collateral"];
    readonly note: "Policy-gated native SOL rail for SOL inverse physical settlement. Not a generic cross-asset PM capacity source.";
}, {
    readonly symbol: "jitoSOL";
    readonly decimals: 9;
    readonly custody: "spl-token";
    readonly role: readonly ["LST collateral", "SOL inverse settlement", "clearing-class lockup"];
    readonly liveLanes: readonly ["instant_rfq", "cm_collateral"];
    readonly note: "Policy-gated LST rail for SOL inverse physical settlement plus clearing-class lockup. Builders must pass the allowlisted mint and stake-pool path.";
}];
export declare const SKEW_TRADE_LANES: readonly [{
    readonly id: "instant_rfq";
    readonly label: "Instant RFQ HIT";
    readonly status: "live";
    readonly primary: true;
    readonly entrypoints: readonly ["collectInstantRfqQuotes", "buildRelayPayload", "relayPayloadDigest", "hitInstantRfqQuoteTxSigned", "hitInstantRfqQuote"];
    readonly protocol: readonly ["quote_request", "quote_ack", "buyer_accept_tx_signed", "buyer_accept", "fill_consent", "cm_sign", "buyer_tx_request", "buyer_tx_signed", "atomic_fill_from_relay"];
    readonly settlement: readonly ["USDC", "wSOL", "jitoSOL"];
    readonly summary: "Buyer hits a live CM quote; browser buyers sign the final fill transaction, while bot/HSM buyers may additionally sign the RelayPayload digest. CM quotes remain digest-signed.";
    readonly note: "USDC is the linear PM lane. wSOL/jitoSOL are SOL-only inverse physical lanes backed by OptionCollateralLockPda. Builder shares accrue to escrow on USDC and pay directly to the builder settlement ATA on physical fills.";
}, {
    readonly id: "auction_rfq";
    readonly label: "Auction RFQ";
    readonly status: "live";
    readonly primary: true;
    readonly entrypoints: readonly ["registerRfqMaker", "registerRfqAuction", "submitRfqQuoteDirect", "submitRfqQuote", "submitRfqQuoteSigned", "refreshQuote", "finalizeRfqAuction", "cancelRfqAuction"];
    readonly protocol: readonly ["register_rfq_auction", "submit_rfq_quote_tx_signed", "submit_rfq_quote", "refresh_quote", "finalize_rfq_auction", "cancel_rfq_auction"];
    readonly settlement: readonly ["USDC"];
    readonly summary: "Buyer escrows a max premium, multiple MMs compete, and browser tx-signed or bot/HSM ed25519 quotes can be finalized/refunded after close as firm quote tape.";
    readonly note: "Auction RFQ is price discovery and firm tape at launch. The historical take_best_quote entrypoint is intentionally not exposed until it has complete option mint/close semantics. Cleared PM/CM option minting routes through Instant RFQ atomic fill.";
}, {
    readonly id: "maker_axe";
    readonly label: "Maker Axe Board";
    readonly status: "live";
    readonly primary: true;
    readonly entrypoints: readonly ["publishAxe", "updateAxe", "revokeAxe"];
    readonly protocol: readonly ["publish_axe", "update_axe", "revoke_axe"];
    readonly settlement: readonly [];
    readonly summary: "MMs publish, update, and revoke on-chain inventory-intent axes so traders can discover likely RFQ counterparties.";
    readonly note: "MakerAxe is a discovery primitive, not settlement. It complements Auction RFQ and Instant RFQ rather than replacing either fill lane.";
}, {
    readonly id: "prefunded_listing";
    readonly label: "Pre-funded Listing";
    readonly status: "live";
    readonly primary: false;
    readonly entrypoints: readonly ["create", "buy", "settle", "transferOption", "cancelOption"];
    readonly protocol: readonly ["create_option", "deposit_collateral", "buy_option", "settle"];
    readonly settlement: readonly ["USDC"];
    readonly summary: "Writer pre-funds a standalone option PDA; buyer later pays premium and receives the option token.";
    readonly note: "Keep this lane for builder primitives and simple dApps. It is not the canonical PM/CM quote-hit lane.";
}, {
    readonly id: "combo_v1";
    readonly label: "Combo Intent V1";
    readonly status: "keeper-assisted";
    readonly primary: false;
    readonly entrypoints: readonly ["registerComboIntent", "finalizeComboIntent", "cancelComboIntent"];
    readonly protocol: readonly ["register_combo_intent", "finalize_combo_intent", "cancel_combo_intent"];
    readonly settlement: readonly ["USDC"];
    readonly summary: "Buyer registers a small multi-leg intent with upfront max-premium escrow; legs are filled through the atomic fill path.";
    readonly note: "Use for compact structured products where the upfront escrow UX is desired.";
}, {
    readonly id: "combo_v2";
    readonly label: "Combo Intent V2";
    readonly status: "state-only";
    readonly primary: false;
    readonly entrypoints: readonly ["registerComboIntentV2", "finalizeComboLegV2", "cancelComboIntentV2", "cleanupExpiredComboV2"];
    readonly protocol: readonly ["register_combo_intent_v2", "finalize_combo_leg_v2", "cancel_combo_intent_v2", "cleanup_expired_combo_v2"];
    readonly settlement: readonly ["USDC"];
    readonly summary: "1..32-leg state surface for strategy grouping and fill recording across devices/indexers.";
    readonly note: "Treat leg finalization as a recorder signal unless your app cross-checks the underlying atomic fills.";
}, {
    readonly id: "conditional_oco";
    readonly label: "Conditional / OCO";
    readonly status: "keeper-assisted";
    readonly primary: false;
    readonly entrypoints: readonly ["registerConditionalOrder", "registerOcoPair", "executeConditionalOrder", "applyCloseIsolatedAction", "cleanupExpiredConditionalOrder"];
    readonly protocol: readonly ["register_conditional_order", "register_oco_pair", "execute_conditional_order", "apply_close_isolated_action"];
    readonly settlement: readonly ["USDC"];
    readonly summary: "Pyth-triggered SL/TP/OCO automation with keeper cranks and isolated-close action support.";
    readonly note: "RFQ-style conditional actions are surfaced as intent/state until a fill path is explicitly attached.";
}, {
    readonly id: "builder_routing";
    readonly label: "Builder Routing";
    readonly status: "live";
    readonly primary: false;
    readonly entrypoints: readonly ["registerBuilder", "withdrawBuilderFees", "closeBuilderCode"];
    readonly protocol: readonly ["register_builder", "withdraw_builder_fees", "close_builder_code"];
    readonly settlement: readonly ["USDC"];
    readonly summary: "Registered builder codes let external apps route flow and accrue their configured fee share.";
    readonly note: "Dapps should pass the registered builder pubkey into the relay/atomic fill path so attribution is on-chain.";
}, {
    readonly id: "series_listing";
    readonly label: "Series Listing";
    readonly status: "keeper-assisted";
    readonly primary: false;
    readonly entrypoints: readonly ["listSeries", "delistSeries", "fetchSeriesListing"];
    readonly protocol: readonly ["register_series", "delist_series"];
    readonly settlement: readonly ["USDC"];
    readonly summary: "Deterministic per-series metadata and OI cap surface for market makers, terminals, and indexers.";
    readonly note: "Keepers should register the grid cells they expect to quote before routing production fills.";
}, {
    readonly id: "cm_collateral";
    readonly label: "Clearing Member Collateral";
    readonly status: "live";
    readonly primary: true;
    readonly entrypoints: readonly ["registerClearingMember", "cmAddCollateral", "cmWithdrawCollateral", "depositLstCollateral", "depositNativeSolCollateral", "calculateMargin"];
    readonly protocol: readonly ["register_clearing_member", "cm_deposit_collateral", "cm_withdraw_collateral", "lst_deposit", "native_sol_deposit", "calculate_margin"];
    readonly settlement: readonly ["USDC", "wSOL", "jitoSOL"];
    readonly summary: "CM onboarding, USDC PM collateral, SOL-family vault deposits, margin refresh, and withdrawal safety checks.";
    readonly note: "Bots should initialize CM, volume tracker, position registry, and required vaults before quoting. wSOL/jitoSOL vault balances quote SOL inverse physical fills only.";
}];
export declare function getSkewCapabilities(): {
    version: typeof SKEW_CAPABILITIES_VERSION;
    underlyings: typeof SKEW_UNDERLYINGS;
    anchorOptionTypes: typeof SKEW_ANCHOR_OPTION_TYPES;
    payoffTypes: typeof SKEW_PAYOFF_TYPES;
    assetPayoffs: typeof SKEW_ASSET_PAYOFFS;
    tenorPolicy: typeof SKEW_TENOR_POLICY;
    collateralRails: typeof SKEW_COLLATERAL_RAILS;
    tradeLanes: typeof SKEW_TRADE_LANES;
    routing: {
        clickToFill: "instant_rfq";
        priceDiscovery: "auction_rfq";
        auctionHit: "auction_rfq";
        makerDiscovery: "maker_axe";
        prefundedBuilderPrimitive: "prefunded_listing";
    };
};
//# sourceMappingURL=capabilities.d.ts.map