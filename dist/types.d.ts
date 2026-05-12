import type { PublicKey } from "@solana/web3.js";
/**
 * Launch panel symbol.
 * Mirrors anchor `state::asset::Asset` enum (BTC=0, ETH=1, SOL=2, XRP=3, HYPE=4).
 * Other symbols are rejected at the anchor instruction layer.
 */
export type Underlying = "BTC" | "ETH" | "SOL" | "XRP" | "HYPE";
/**
 * Anchor IDL `OptionType` variants. The on-chain storage uses these six;
 * the user-facing `PayoffType` is mapped onto a triple
 * (option_type + direction + extra_param) by `mapPayoffToAnchor` in `pda.ts`.
 *
 * Phase 2 (2026-05-04): Inverse family appended (`VanillaInverse`,
 * `DigitalInverse`) — premium + collateral + payoff in BASE asset
 * (e.g. SOL/jitoSOL settlement_mint). Spec: V2_SOL_NATIVE_OPTIONS_PLAN
 * 2026-05-04 §7.
 */
export type OptionType = "Vanilla" | "Digital" | "CappedVanilla" | "RangeAccrual" | "VanillaInverse" | "DigitalInverse";
/**
 * Anchor IDL `OptionState` variants. Lifecycle ordering for a written option:
 * `Created` → `Funded` (collateral deposited) → `Active` (premium paid by buyer)
 *           → `Expired` → `Settled` (payoff released) | `ExpiredAbandoned`.
 * `Disputed` is reachable from `Expired` when the Pyth confidence band is wide.
 */
export type OptionState = "Created" | "Funded" | "Active" | "Expired" | "Settled" | "Disputed" | "ExpiredAbandoned";
/**
 * Anchor IDL has 6 OptionType variants after Phase 2 (2026-05-04):
 * Vanilla / Digital / CappedVanilla / RangeAccrual / VanillaInverse / DigitalInverse.
 * The SDK exposes 11 user-friendly payoff names that map onto
 * (option_type, direction, extra_param) triples. See `mapPayoffToAnchor`
 * in `pda.ts` for the mapping table.
 *
 * @example
 *   "vanilla_call"          → option_type=Vanilla,         direction=+1
 *   "vanilla_put"           → option_type=Vanilla,         direction=-1
 *   "digital_call"          → option_type=Digital,         direction=+1
 *   "capped_call"           → option_type=CappedVanilla,   direction=+1, extra_param=K_cap
 *   "range_accrual"         → option_type=RangeAccrual,    direction=0,  extra_param=upper_bound
 *   "vanilla_inverse_call"  → option_type=VanillaInverse,  direction=+1
 *   "digital_inverse_put"   → option_type=DigitalInverse,  direction=-1
 */
export type PayoffType = "digital_call" | "digital_put" | "vanilla_call" | "vanilla_put" | "capped_call" | "capped_put" | "range_accrual" | "vanilla_inverse_call" | "vanilla_inverse_put" | "digital_inverse_call" | "digital_inverse_put";
/**
 * Buy / sell direction. Encoded on-chain as i8 (+1 for buy, -1 for sell).
 * If omitted in CreateParams, the SDK derives it from the PayoffType
 * (e.g. "digital_put" implies "sell").
 */
export type Direction = "buy" | "sell";
export type TradeState = "RFQ_REQUESTED" | "QUOTE_RECEIVED" | "ACCEPT_REQUESTED" | "PENDING_CLEARING" | "FILLED" | "REJECTED" | "EXPIRED" | "CANCELLED" | "TRANSFER_PENDING" | "TRANSFER_DELIVERED";
export type ClearingState = "NOT_APPLICABLE" | "PENDING_CLEARING" | "FILLED" | "REJECTED";
export type ExecutionLane = "instant_rfq_atomic_fill" | "auction_discovery" | "auction_terms_to_instant_rfq_atomic_fill" | "auction_to_instant_rfq_atomic_fill" | "prefunded_create_buy" | "secondary_transfer";
export type PmGuarantee = "guaranteed" | "not_applicable" | "not_guaranteed" | "conditional_registry_tracking";
export type RejectionReason = "INSUFFICIENT_COLLATERAL" | "MARGIN_CHECK_FAILED" | "MAKER_QUOTE_OFF" | "MMP_TRIGGERED" | "QUOTE_EXPIRED" | "ORACLE_STALE" | "ORACLE_CONFIDENCE_TOO_WIDE" | "PAYLOAD_SIGNATURE_INVALID" | "TX_TOO_LARGE" | "RPC_TIMEOUT" | "READBACK_FAILED" | "UNKNOWN";
export interface TradeReadbackStatus {
    tradeState: TradeState;
    clearingState: ClearingState;
    executionLane: ExecutionLane;
    pmBacked: boolean;
    pmGuarantee: PmGuarantee;
    registryUpdated?: boolean;
    rejectionReason?: RejectionReason;
    relayEventId?: string;
    relaySequence?: number;
    serverTimeMs?: number;
}
export interface TxSimulationResult {
    /** True when the transaction simulation completed without an on-chain error. */
    ok: boolean;
    /** Raw Solana simulation error, stringified for JSON/MCP friendliness. */
    err: string | null;
    /** Compute units reported by the RPC simulator, when available. */
    unitsConsumed?: number;
    /** Program logs returned by simulation. */
    logs: string[];
}
/**
 * Human-readable params for `SkewClient.create()`.
 * Price fields are USD / ISO dates. The payoff notional unit depends on the
 * settlement mint:
 *   - USDC settlement: `notional` is USD/USDC, converted with 6 decimals.
 *   - wSOL/jitoSOL settlement: `notional` is base asset units, converted with
 *     the mint decimals. Example: `notional: 0.5` means 0.5 SOL/jitoSOL, not
 *     $0.50.
 *
 * Anchor `create_option` v2.1 takes 12 args. The SDK derives the wire-level
 * args from these high-level fields:
 *   - `underlying`        → asset: u8 (5-asset enum index)
 *   - `payoff`            → option_type + (default) direction
 *   - `strike`            → strike: u64 (USD × 10^8 per Pyth expo)
 *   - `expiry`            → expiry_ts: i64 (unix seconds)
 *   - `notional`          → payoff_amount: u64 (settlement mint units)
 *   - `extraParam`        → extra_param: f64 (Range Accrual upper, capped K_cap, etc.)
 *   - `direction`         → direction: i8 (override of default)
 *   - `spotAtCreation`    → spot_at_creation: i64 (V0 stamp; auto-fetched from Pyth)
 *   - `sigmaAtCreation`   → sigma_at_creation: f64 (V0 stamp; defaults from table)
 */
export interface CreateParams {
    /** 5-asset launch panel symbol. */
    underlying: Underlying;
    /** Payoff type (maps to anchor OptionType + direction + extra_param triple). */
    payoff: PayoffType;
    /** USD strike (e.g. 100_000 for $100k). For RangeAccrual this is the lower bound. */
    strike: number;
    /** ISO 8601 UTC expiry, e.g. "2026-04-25T16:00:00Z". */
    expiry: string;
    /**
     * Max payoff in settlement units.
     * USDC settlement: USD/USDC amount, e.g. 1000 means $1,000.
     * wSOL/jitoSOL settlement: base token amount, e.g. 0.5 means 0.5 SOL-family
     * token. Use `settlementMint` to make this unit unambiguous.
     */
    notional: number;
    /**
     * Extra parameter for option types that need one:
     *   - RangeAccrual: upper bound (USD). Required.
     *   - Capped vanilla: cap strike (USD). Required.
     *   - Vanilla / Digital: ignored (defaults supplied by SDK).
     */
    extraParam?: number;
    /**
     * Direction override. If omitted, derived from `payoff`:
     *   *_call payoffs → "buy"; *_put payoffs → "sell".
     *   Override is rare — useful for symmetric payoffs (range_accrual sell).
     */
    direction?: Direction;
    /**
     * Spot price at creation (V0 stamp for Boundary-Aware IM `max(IM_scenario, M − V_0)`).
     * If omitted, the SDK fetches the current Pyth price from Hermes REST.
     */
    spotAtCreation?: number;
    /**
     * Volatility σ (annualized, e.g. 0.45 for 45%) at creation. V0 stamp.
     * If omitted, the SDK falls back to `ASSET_DEFAULT_SIGMA[underlying]`.
     */
    sigmaAtCreation?: number;
    /**
     * Legacy alias for `extraParam` when the payoff is `range_accrual`. If both
     * `upperBound` and `extraParam` are provided, `upperBound` wins. Kept for
     * SDK 0.1.0 backwards compatibility — prefer `extraParam` in new code.
     */
    upperBound?: number;
    /**
     * Phase 2 (2026-05-04) — settlement currency.
     *
     * Defaults to USDC (`SkewClient.usdcMint`). Pass a SOL-family mint
     * (jitoSOL `J1toso1uCk3R...` or wSOL `So111...112`) for inverse +
     * same-asset collateral options. The mint flows to:
     *   - `option.settlement_mint` (premium + payoff currency)
     *   - the escrow ATA (per-option collateral lock)
     *   - the writer's collateral ATA (deposit_collateral source)
     *
     * Inverse options should be created with a base-asset mint matching the
     * option underlying for the structurally right-way invariant W-WW5 to hold.
     */
    settlementMint?: PublicKey;
    /**
     * Simulation-only mode. Builds the same create+deposit instruction sequence,
     * runs RPC simulation, and returns logs/CU without sending or consuming fees.
     * `dryRun` and `simulate` are accepted as aliases for agent/tooling ergonomics.
     */
    simulateOnly?: boolean;
    dryRun?: boolean;
    simulate?: boolean;
}
export interface CreateResult {
    /** Option PDA address. Pass to buy() or settle(). */
    address: PublicKey;
    /** Nonce used in PDA derivation — keep for records. */
    nonce: bigint;
    /** create_option transaction signature */
    createTx: string;
    /** deposit_collateral transaction signature */
    depositTx: string;
    /** True when no transaction was sent because `simulateOnly`/`dryRun`/`simulate` was set. */
    simulated?: boolean;
    /** Combined create+deposit simulation result, present for simulation-only calls. */
    simulation?: TxSimulationResult;
}
export interface BuyParams {
    /** Option PDA address string or PublicKey. */
    option: string | PublicKey;
    /** Premium the buyer is willing to pay in USD. Must be ≥ option's listed premium. */
    premiumUsd: number;
}
export interface BuyResult {
    txSignature: string;
    option?: OptionSummary;
    optionAddress?: string;
    optionTokenMint?: string;
    buyerOptionAta?: string;
    buyerOptionAmount?: string;
    buyer?: string;
    creator?: string;
    holder?: string;
}
export interface BuyFromRfqAuctionResult extends BuyResult {
    auction: string;
    buyer: string;
    maker: string;
    quoteMm: string;
    premiumMicro: bigint;
    premiumUsd: number;
    verifiedTerms: boolean;
}
export interface SettleResult {
    txSignature: string;
    /** ITM payoff paid to holder, in USD (0 if OTM). */
    payoffUsd: number;
}
/**
 * Params for `SkewClient.registerClearingMember()`. permissionless —
 * no KYC signer required (anchor instruction `register_clearing_member`).
 *
 * Devnet learning floor: $100 (cm-onboard.sh `MIN_RECOMMENDED_USDC`).
 * Production target: ≥ $50,000 (~0.6 BTC). Off-chain governance enforces
 * `MAX_CONCENTRATION_PER_CM_BPS=300` (3% per-CM concentration cap).
 */
export interface RegisterCmParams {
    /** USDC collateral to deposit at registration, in USD (e.g. 50_000 for $50k). */
    initialCollateralUsdc: number;
}
export interface RegisterCmResult {
    /** Clearing Member PDA — pass to subsequent `cm_*` instructions. */
    cmPda: PublicKey;
    /** Per-CM SPL token escrow PDA (USDC custody). */
    cmEscrow: PublicKey;
    /** Per-CM PositionRegistry PDA initialized in the same onboarding tx. */
    positionRegistry: PublicKey;
    /**
     * register_clearing_member + init_position_registry transaction signature.
     *
     * Phase 7-B (F1.4 idempotent fix): when the CM PDA was already registered
     * before this call (double-click, page refresh, two-tab race) the SDK
     * short-circuits the on-chain submit and returns the literal sentinel
     * `"idempotent_already_registered"` here together with `alreadyRegistered:
     * true`. Callers that key off the signature for an explorer link should
     * branch on `alreadyRegistered` instead of pattern-matching this string.
     */
    txSignature: string;
    /**
     * Phase 7-B (F1.4): `true` when the function detected an already-registered
     * CM (either via pre-fetch or by recovering from an `AccountAlreadyInUse`
     * race) and returned without submitting a duplicate transaction.
     */
    alreadyRegistered: boolean;
    /**
     * Phase 7-B (F1.1): the user-side ATAs that the SDK created on the caller's
     * behalf inside this onboarding transaction. Currently the only candidate
     * is the authority's USDC ATA; the array is empty when every required ATA
     * already existed before the call.
     */
    atasCreated: PublicKey[];
}
/** Result of any single-tx mutation (transfer, cancel, close, collateral). */
export interface TxResult {
    txSignature: string;
    simulated?: boolean;
    simulation?: TxSimulationResult;
}
export type CollateralPolicyKind = "stable" | "native" | "lst" | "unknown";
export interface CollateralPolicyEntrySnapshot {
    mint: PublicKey;
    decimals: number;
    kindCode: number;
    kind: CollateralPolicyKind;
    oracleFeed: PublicKey;
    maxDepegBps: number;
}
export interface CollateralPolicySnapshot {
    pda: PublicKey;
    initialized: boolean;
    bump: number | null;
    entryCount: number;
    entries: CollateralPolicyEntrySnapshot[];
}
/**
 * Filter / sort options for `SkewClient.listOptions()`.
 *
 * Filters are applied client-side after `program.account.optionAccount.all()`
 * returns the discriminator-filtered set. Anchor 0.31's `.all()` adds the
 * 8-byte `OptionAccount` discriminator memcmp automatically, so unrelated
 * PDAs (RFQ / CM / PoVS / governance) are never returned.
 */
export interface ListOptionsOpts {
    /** Fetch one option PDA directly instead of scanning the inventory. */
    pda?: string | PublicKey;
    /** Filter by launch-panel underlying. */
    underlying?: Underlying;
    /** Filter by anchor `OptionType` storage variant. */
    optionType?: OptionType;
    /** Filter by anchor `OptionState`. Default: no filter (all states). */
    state?: OptionState;
    /** Filter by current option holder. Accepts a base58 pubkey or PublicKey. */
    holder?: string | PublicKey;
    /** Filter by option creator / writer. Accepts a base58 pubkey or PublicKey. */
    creator?: string | PublicKey;
    /** Max items returned. Default 100. Hard cap 500 to keep JSON payloads bounded. */
    limit?: number;
    /**
     * Sort order. `createdAt` (default) returns newest first — matches the
     * UI marketplace tile order. `expiry` returns latest-expiry first —
     * useful for ladder views.
     */
    sortBy?: "createdAt" | "expiry";
}
/**
 * Decoded summary of one `OptionAccount` PDA. All scaled fields appear
 * twice — once at on-chain precision (bigint) and once converted to USD
 * (number) for display. Conversion factors:
 *   - strike, upperBound: × 10^8 (Pyth expo)
 *   - payoffAmount, collateralLocked, v0UsdcMicro: × 10^6 (USDC decimals)
 */
export interface OptionSummary {
    /** Option PDA address (base58). */
    pda: string;
    /** SPL token mint PDA representing holder ownership of this option. */
    optionTokenMint: string;
    /** Writer (CM authority) that sized + collateralised the option. */
    creator: string;
    /** Current holder of the option token. Equals `creator` until first buy. */
    holder: string;
    /** Anchor `OptionType` enum decoded to its variant name. */
    optionType: OptionType;
    /** Anchor `OptionState` enum decoded to its variant name. */
    state: OptionState;
    /** Launch-panel symbol decoded from on-chain `asset: u8`. */
    underlying: Underlying;
    /** Raw on-chain `asset: u8` index (BTC=0, ETH=1, SOL=2, XRP=3, HYPE=4). */
    underlyingIndex: number;
    /** Direction encoded by writer at creation: `"buy"` (i8=+1) or `"sell"` (i8=-1). */
    direction: Direction;
    /** Strike in USD (after dividing the on-chain `u64` by 10^8). */
    strikeUsd: number;
    /** Strike at on-chain Pyth-scaled precision (USD × 10^8). */
    strikeOnChain: bigint;
    /** Range-Accrual upper bound in USD (0 if option is not RangeAccrual). */
    upperBoundUsd: number;
    /** Upper bound at on-chain precision (USD × 10^8). */
    upperBoundOnChain: bigint;
    /** Raw on-chain extra_param field. CappedVanilla stores cap strike here. */
    extraParam: number;
    /** CappedVanilla cap strike in USD, otherwise 0. */
    extraParamUsd: number;
    /** Expiry as unix seconds. */
    expiryTs: number;
    /** Max payoff (notional) in USD. */
    payoffUsd: number;
    /** Max payoff at on-chain precision (USDC × 10^6). */
    payoffAmount: bigint;
    /** Locked collateral in USD. */
    collateralLockedUsd: number;
    /** Locked collateral at on-chain precision (USDC × 10^6). */
    collateralLocked: bigint;
    /** V0 stamp (Boundary-Aware IM) in USD. */
    v0Usd: number;
    /** V0 stamp at on-chain precision (USDC × 10^6). */
    v0UsdcMicro: bigint;
    /** σ stamp at creation (annualised, e.g. 0.45 = 45%). */
    sigmaAtCreation: number;
    /** Spot at creation in USD. */
    spotAtCreationUsd: number;
    /** Whether the option has been settled (`true` after payoff release). */
    settled: boolean;
    /** Creation timestamp as unix seconds. */
    createdAt: number;
    /** Pyth feed pubkey (base58) used for settlement. */
    underlyingFeedId: string;
    /** Settlement SPL mint (base58) — typically devnet USDC. */
    settlementMint: string;
    /** Settlement mint decimals stored on the option account. */
    settlementDecimals: number;
    /** Metaplex metadata PDA stored by `register_option_metadata`, or default pubkey if pending. */
    metadata: string;
    /** Metadata readback status. `pending` means option/token exists but lazy metadata registration has not landed yet. */
    metadataStatus: "pending" | "registered";
    /** Final settlement price raw value (Pyth price scale × 10^8), 0 before settlement. */
    settledPriceRaw: bigint;
    /** Final settlement price in USD, null before settlement. */
    settledPriceUsd: number | null;
    /** Settlement unix timestamp, null before settlement. */
    settledAt: number | null;
}
export interface ListRfqAuctionsOpts {
    /** API base URL. Defaults to SKEW_WEB_URL or https://skew-web.vercel.app. */
    webUrl?: string;
    /** Buyer pubkey filter. */
    buyer?: string | PublicKey;
    /** Asset symbol filter. */
    asset?: Underlying;
    /** Only return auctions with a live best quote. */
    withQuote?: boolean;
    /** Max rows returned. Default 50, hard capped by the API. */
    limit?: number;
    /** Data source override. Default API behavior is indexer plus bounded fallback. */
    source?: "indexer" | "onchain";
}
export interface RfqAuctionIndexQuote {
    auction: string;
    mm: string;
    premium_micro: number | string;
    valid_until_slot: number | string;
    posted_slot: number | string;
}
export interface RfqAuctionIndexRow {
    auction: string;
    auction_id: number | string;
    buyer: string;
    asset: number;
    strike_micro: number | string;
    expiry_ts: number | string;
    option_type: number;
    direction?: number | null;
    upper_bound?: number | string | null;
    payoff_amount_micro: number | string;
    max_premium_micro: number | string;
    auction_open_slot: number | string;
    auction_close_slot: number | string;
    registered_at: number | string;
    settlement_mint: string | null;
    strategy_id?: string | null;
    strategy_template?: string | null;
    state?: number | string | null;
    best_quote?: RfqAuctionIndexQuote | null;
}
export interface RfqAuctionIndexResponse {
    auctions: RfqAuctionIndexRow[];
    degraded: boolean;
    source: string;
    currentSlot: number | null;
    detail?: string;
}
export interface RfqQuoteTapeRow {
    mm: string;
    premium_usdc: number;
    valid_until_slot: number;
    posted_slot: number;
    tier: "firm" | "indicative";
    tx_sig?: string | null;
    observed_at?: string | null;
    valid_until_unix?: number;
    posted_at_unix?: number;
    source?: "indexer" | "onchain_snapshot";
}
export interface RfqQuoteTapeResponse {
    auction: string;
    count: number;
    firm_count: number;
    indicative_count: number;
    best_premium_usdc: number | null;
    worst_premium_usdc: number | null;
    spread_usdc: number;
    unique_mms: number;
    quotes: RfqQuoteTapeRow[];
    currentSlot: number | null;
    degraded: boolean;
    source: string;
    detail?: string;
}
export interface CreateFromRfqAuctionResult {
    auction: string;
    buyer: string;
    maker: string;
    quoteMm: string;
    premiumMicro: bigint;
    premiumUsd: number;
    option: string;
    optionTokenMint?: string;
    createTx: string;
    depositTx: string;
    simulated?: boolean;
    simulation?: TxSimulationResult;
    createParams: CreateParams;
}
export interface PortfolioSnapshot {
    owner: string;
    longOptions: OptionSummary[];
    shortOptions: OptionSummary[];
    options: OptionSummary[];
    clearingMember: ClearingMemberSnapshot | null;
}
export interface ListSecondaryListingsOpts {
    /** API base URL. Defaults to SKEW_WEB_URL or https://skew-web.vercel.app. */
    webUrl?: string;
    asset?: Underlying;
    active?: boolean;
    pending?: boolean;
    seller?: string | PublicKey;
    optionPda?: string | PublicKey;
    minQty?: number;
    maxAsk?: number;
    excludeMe?: string | PublicKey;
    limit?: number;
}
export interface SecondaryListingOptionSummary {
    asset?: string | null;
    strike_usd?: number | string | null;
    expiry_ts?: number | string | null;
    option_type?: string | number | null;
    direction?: number | string | null;
    status?: string | null;
}
export interface SecondaryListingIndexRow {
    id: string;
    option_pda: string;
    option_token_mint: string;
    seller: string;
    seller_handle?: string | null;
    ask_price_usdc: number | string;
    token_amount: number | string;
    status: string;
    listing_expires_at: string;
    created_at: string;
    tx_sig?: string | null;
    option?: SecondaryListingOptionSummary | null;
}
export interface SecondaryListingIndexResponse {
    listings: SecondaryListingIndexRow[];
    count: number;
    source?: string;
    provisioned?: boolean;
    detail?: string;
}
export interface CreateSecondaryListingArgs {
    /** API base URL. Defaults to SKEW_WEB_URL or https://skew-web.vercel.app. */
    webUrl?: string;
    /** Option PDA being offered on the discovery tape. */
    optionPda: string | PublicKey;
    /** Option SPL mint. If omitted, the SDK derives it from optionPda. */
    optionTokenMint?: string | PublicKey;
    /** Total ask in USDC for tokenAmount option tokens. */
    askPriceUsdc: number;
    /** Option token amount offered. Current option mints are usually supply=1. */
    tokenAmount?: number;
    /** Listing TTL. Default 24 hours, max 720 hours. */
    durationHours?: number;
    /** Optional public label displayed by discovery surfaces. */
    sellerHandle?: string | null;
}
export interface CreateSecondaryListingResult {
    success: boolean;
    listing: {
        id: string;
        created_at: string;
        listing_expires_at: string;
    };
    option_pda: string;
    option_token_mint: string;
    seller: string;
    ask_price_usdc: number;
    token_amount: number;
    holder_verified?: boolean;
    option_readback?: OptionSummary | null;
}
export interface BuySecondaryListingArgs {
    /** API base URL. Defaults to SKEW_WEB_URL or https://skew-web.vercel.app. */
    webUrl?: string;
    /** Secondary listing row id. */
    listingId: string;
    /** Optional seller wallet guard. If supplied, it must match the live listing row. */
    seller?: string | PublicKey;
    /** Optional total ask guard. If supplied, it must match the live listing row. */
    askPriceUsdc?: number;
    /** Optional option PDA guard. If supplied, it must match the live listing row. */
    optionPda?: string | PublicKey;
}
export interface BuySecondaryListingResult {
    success: boolean;
    listing_id: string;
    option_pda: string;
    seller: string;
    buyer: string;
    payment_tx_sig: string;
    next_step: string;
    listing_readback?: SecondaryListingIndexRow;
}
/**
 * Read-only result of `calculate_margin`. Mirrors anchor `MarginCalcResult`
 * ( PM v1.4 IM formula breakdown).
 *
 * NOTE: `calculate_margin` instruction returns void on-chain; result must be
 * retrieved by reading the CM PDA after the (read-only) tx confirms. SDK
 * exposes a convenience method that does both for callers who just want
 * the numbers.
 */
export interface MarginCalcResult {
    txSignature: string;
    /** CM's posted collateral, in USDC × 10^6 (read after tx). */
    collateralUsdcMicro: bigint;
    /** Fresh PM requirement snapshot (`cm.last_im_micro`), USDC × 10^6. */
    imLockedUsdcMicro: bigint;
    /** Withdrawable free collateral = collateral - tier_lockup - total_pm_locked, USDC × 10^6. */
    freeCollateralUsdcMicro: bigint;
}
export type PmCacheMode = "CACHE" | "FULL" | "BLOCKED";
export interface PmCacheSnapshot {
    pda: PublicKey;
    initialized: boolean;
    cm: PublicKey | null;
    authority: PublicKey;
    registryHash: string | null;
    registryCount: number;
    dirty: boolean;
    dirtyReason: number;
    modelVersion: number;
    snapshotSlot: bigint;
    snapshotTs: bigint;
    cachedImMicro: bigint;
    cachedMmMicro: bigint;
    freeCollateralMicro: bigint;
    baseImMicro: bigint;
    scanRiskMicro: bigint;
    boundaryMicro: bigint;
    tailAddonMicro: bigint;
    iccCreditMicro: bigint;
    wrongWayAddonMicro: bigint;
    yieldRhoAddonMicro: bigint;
    cacheAgeSlots: bigint | null;
}
export interface IncrementalMarginPreview {
    mode: PmCacheMode;
    preImMicro: bigint;
    postImMicro: bigint;
    deltaImMicro: bigint;
    freeCollateralMicro: bigint;
    afterFillFreeMicro: bigint;
    cacheAgeSlots: bigint | null;
    reason?: string;
}
export type RentReclaimKind = "legacy_rfq" | "rfq_auction" | "rfq_maker_registry" | "combo_v2" | "option_collateral_lock";
export interface RentReclaimableItem {
    kind: RentReclaimKind;
    pda: PublicKey;
    refundTarget: PublicKey;
    reason: string;
    blockers: string[];
}
/**
 * Decoded snapshot of an `IsolatedVault` PDA. Per (user, option). All
 * USDC-denominated fields are in micro-units (× 10⁶).
 */
export interface IsolatedVaultSnapshot {
    /** Total USDC held in the vault escrow. */
    usdcMicro: bigint;
    /** USDC pledged against the bound option's open exposure. */
    lockedMicro: bigint;
    /** Withdrawable balance = `usdcMicro − lockedMicro`. */
    freeMicro: bigint;
    /** Realised PnL accumulator across the bound option's lifetime.
     *  Negative = vault absorbed loss; positive = vault profited. */
    realizedPnlMicro: bigint;
}
/**
 * Decoded snapshot of a `DvolPda`. Annualised variance-swap fair-strike
 * volatility per asset, mirrors Deribit's DVOL methodology.
 */
export interface DvolSnapshot {
    /** 28-day annualised fair-strike vol in percent (e.g. 65.5). */
    dvol28dPct: number;
    /** 90-day annualised fair-strike vol in percent. */
    dvol90dPct: number;
    /** Cumulative realised variance accumulator (28d window) in percent. */
    realizedVar28dPct: number;
    /** Solana slot of the most recent crank push. */
    lastUpdateSlot: bigint;
    /** True when current slot − last_update < `DVOL_STALENESS_SLOTS` (9_000 ≈ 1 h). */
    isFresh: boolean;
}
/**
 * Single leg specification in a multi-leg combo. The `option` PDA must be
 * deterministic — for relay-issued legs, predict via
 * `findOptionPda(cm_authority, relay_nonce)` BEFORE registering the combo.
 */
export interface ComboLeg {
    /** Target OptionAccount PDA. Set when buyer pre-knows the leg's PDA. */
    option: PublicKey;
    /** Buyer's intended side: `+1` = long (pay premium), `-1` = short (receive). */
    side: 1 | -1;
    /** Per-leg max premium in USD (e.g. 250 for a $250 ceiling). */
    maxPremiumUsdc: number;
}
/**
 * On-chain combo lifecycle status. Mirrors anchor `ComboStatus` enum.
 */
export type ComboStatus = "Open" | "Active" | "Cancelled" | "Settled";
/**
 * Decoded snapshot of a `ComboIntentPda`. Per (buyer, comboId).
 */
export interface ComboIntentSnapshot {
    /** Number of active legs (2..=4). */
    nLegs: number;
    /**
     * Bitmask of legs that have been filled via `atomic_fill_relay`. Bit i
     * set ⇔ leg index i has been atomically settled in the relay path.
     * `legsFilledMask & ((1<<nLegs)−1) === ((1<<nLegs)−1)` ⇔ fully filled.
     */
    legsFilledMask: number;
    /** Combo lifecycle status. */
    status: ComboStatus;
    /** Total upfront escrow cap (USDC × 10⁶). */
    totalMaxPremiumMicro: bigint;
    /** Cumulative premium drained to leg fills so far (USDC × 10⁶). */
    totalPremiumPaidMicro: bigint;
    /** Combo expiry — cancel/finalize only permitted before this ts. */
    expiryTs: bigint;
    /** Convenience derived from the full bitmask check. */
    isFullyFilled: boolean;
}
/**
 * Single (winner_cm, winner_cm_escrow_ata) pair the keeper supplies for
 * ADL or Clawback. Off-chain priority sort decides the order; on-chain
 * enforces only per-CM caps + dedup.
 */
export interface RecoveryWinnerCm {
    /** Winner CM PDA — `findClearingMemberPda(authority)`. */
    cm: PublicKey;
    /** Per-CM SPL escrow ATA — `findCmEscrowPda(cm)`. */
    cmEscrow: PublicKey;
}
/**
 * Result of one `adl_step` or `clawback_step` invocation. The instruction
 * returns `u64` total drained — exposed here as `bigint`.
 */
export interface RecoveryStepResult extends TxResult {
    /** Total USDC drained from the supplied winner list (× 10⁶). */
    totalDrainedMicro: bigint;
}
/**
 * `register_conditional_order::kind` — order template.
 * Const-shaped object (not enum) so the SDK doesn't pull in tsc enum runtime.
 */
export declare const ConditionalKind: {
    readonly StopLoss: 0;
    readonly TakeProfit: 1;
};
export type ConditionalKindCode = (typeof ConditionalKind)[keyof typeof ConditionalKind];
/** `register_conditional_order::trigger_mode` — Spot vs Pyth EMA. */
export declare const ConditionalTriggerMode: {
    readonly Spot: 0;
    readonly Ema: 1;
};
export type ConditionalTriggerModeCode = (typeof ConditionalTriggerMode)[keyof typeof ConditionalTriggerMode];
/** `register_conditional_order::trigger_direction` — which side of the trigger. */
export declare const ConditionalTriggerDirection: {
    readonly Below: 0;
    readonly Above: 1;
};
export type ConditionalTriggerDirectionCode = (typeof ConditionalTriggerDirection)[keyof typeof ConditionalTriggerDirection];
/**
 * `register_conditional_order::action` — what `apply_*_action` call to
 * dispatch when the trigger condition has held for `triggerGraceSlots`.
 */
export declare const ConditionalAction: {
    readonly SellViaRfq: 0;
    readonly EarlyExercise: 1;
    readonly CloseIsolated: 2;
    readonly BuybackViaRfq: 3;
};
export type ConditionalActionCode = (typeof ConditionalAction)[keyof typeof ConditionalAction];
/**
 * Read-state snapshot of a `ConditionalOrderPda`. Account schema not yet
 * hand-patched into the v54 IDL — read with `connection.getAccountInfo` +
 * Borsh decode until it lands. SDK methods accept values as explicit args
 * (e.g. `applyCloseIsolatedAction(orderId, actionTarget)`) meanwhile.
 */
export interface ConditionalOrderSnapshot {
    pda: PublicKey;
    authority: PublicKey;
    orderId: bigint;
    kind: ConditionalKindCode;
    triggerMode: ConditionalTriggerModeCode;
    triggerDirection: ConditionalTriggerDirectionCode;
    triggerPrice1e8: bigint;
    triggerOracle: PublicKey;
    triggerGraceSlots: number;
    state: "Active" | "Triggered" | "Cancelled" | "Expired";
    action: ConditionalActionCode;
    actionTarget: PublicKey;
    actionMinPremiumMicro: bigint;
    actionMaxPremiumMicro: bigint;
    actionMaxSlippageBps: number;
    validUntilTs: bigint;
    registeredAt: bigint;
}
/** Read-state snapshot of an `RfqAuctionPda`. Same IDL caveat as above. */
export interface RfqAuctionSnapshot {
    pda: PublicKey;
    buyer: PublicKey;
    auctionId: bigint;
    optionSpec: {
        asset: number;
        strike: bigint;
        expiryTs: bigint;
        payoffAmountMicro: bigint;
        optionType: number;
        direction: number;
        upperBound: bigint;
    };
    maxPremiumMicro: bigint;
    auctionOpenSlot: bigint;
    auctionCloseSlot: bigint;
    state: "Open" | "Closed" | "Settled" | "Cancelled";
    bestQuotePremiumMicro: bigint | null;
    bestQuoteMm: PublicKey | null;
    bestQuoteValidUntilSlot: bigint | null;
    registeredAt: bigint;
}
/** Read-state snapshot of an `RfqMakerRegistry` PDA. */
export interface RfqMakerSnapshot {
    pda: PublicKey;
    mm: PublicKey;
    /** Lamports staked in the anti-spam maker registry deposit. */
    depositLamports: bigint;
    /** Back-compat alias for earlier SDK consumers; this is lamports, not USDC micro. */
    depositMicro: bigint;
    successCount: number;
    failCount: number;
    slashable: boolean;
    registeredAt: bigint;
    quoteOff: boolean;
    /** 0=anonymous, 1=disclosed. */
    identityMode: number;
    /** 0=portfolio, 1=single-asset, 2=cross-portfolio. */
    marginMode: number;
    /** 255=cross-asset, or 0..4 for launch-panel assets. */
    riskScopeAsset: number;
    /** 0=cross, 1=segregated. */
    collateralScope: number;
    mmpWindowStartTs: bigint;
    mmpWindowFillCount: number;
    mmpWindowPremiumMicro: bigint;
    mmpWindowNotionalMicro: bigint;
}
/**
 * Decoded snapshot of a `PoVSState` PDA. The full path-of-volatility-surface
 * state vector — fast-window σ + long-window σ + Heston-style integrated
 * variance + variance-risk-premium + tail-index pair + regime indicator.
 */
export interface PoVSStateSnapshot {
    /** Fast-window σ_t (instantaneous σ proxy), annualised decimal (e.g. 0.51). */
    sigmaT: number;
    /** Long-window σ_∞ (long-run σ proxy), annualised decimal. */
    sigmaInf: number;
    /** Closed-form θ_d at T=28 d (annualised total variance × T_frac). */
    thetaDt28: number;
    /** Variance-risk-premium 1-step forecast (signed decimal, clipped to [-0.20, +0.30]). */
    vrpRel: number;
    /** PoVS forecast IV @ ATM 28d (decimal). 0 ⇒ cold-start, treat as null. */
    ivAtm28d: number;
    /** 2-state regime indicator r_t ∈ [0, 1]. 0 = calm, 1 = stress. */
    regimeRt: number;
    /** Tail index ξ. ξ > 0.20 triggers the on-chain TailAddOn. */
    xi: number;
    /** Tail scale β. */
    beta: number;
    /** VaR_99 (decimal — fraction of notional). */
    var99: number;
    /** ES_99.9 (decimal — Expected Shortfall in 0.1% tail). */
    es999: number;
    /** Solana slot of most recent `update_povs_state` crank. */
    lastUpdateSlot: bigint;
}
/** Decoded snapshot of a `HamiltonState` PDA — 2-state regime filter. */
export interface HamiltonSnapshot {
    asset: number;
    /** Posterior P(calm | observation) ∈ [0, 1]. */
    piCalm: number;
    /** Posterior P(stress | observation) ∈ [0, 1]. piCalm + piStress ≤ 1. */
    piStress: number;
    /** Calm-regime drift × 1e6 (signed decimal). */
    muCalm: number;
    /** Stress-regime drift × 1e6 (signed decimal). */
    muStress: number;
    /** Calm-regime σ (decimal). */
    sigmaCalm: number;
    /** Stress-regime σ (decimal). */
    sigmaStress: number;
    /** Markov P(stress | prev_calm). */
    p01: number;
    /** Markov P(calm | prev_stress). */
    p10: number;
    consecutiveStressDays: number;
    consecutiveCalmDays: number;
    lastUpdateSlot: bigint;
}
/** Decoded snapshot of a `SkewMetricsPda`. RR/BF/term structure. */
export interface SkewMetricsSnapshot {
    asset: number;
    /** ATM IV @ 28d (decimal). */
    atmIv28d: number;
    /** 25-delta risk reversal — signed decimal. Negative = put-skew (typical). */
    rr25: number;
    /** 25-delta butterfly — convexity proxy. */
    bf25: number;
    /** 10-delta risk reversal (deeper-OTM put-skew measure). */
    rr10: number;
    /** ATM term-structure slope (decimal). */
    atmSlope: number;
    /** ATM IV per tenor (decimal). 8 entries: 7d / 14d / 21d / 28d / 60d / 90d / 180d / 365d. */
    ivPerTenor: number[];
    lastUpdateSlot: bigint;
}
/** Decoded snapshot of the singleton `InsuranceFund` PDA used by the 6-tier default cascade. */
export interface InsuranceFundSnapshot {
    /** Tier-3 Protocol Skin-In-The-Game balance (USDC micro). */
    tier3ProtocolSitgMicro: bigint;
    /** Tier-4 mutualized — BTC/ETH/SOL pool. */
    tier1MutualizedPoolMicro: bigint;
    /** Tier-4 mutualized — XRP/HYPE pool. */
    tier2MutualizedPoolMicro: bigint;
    /** Tier-4 mutualized — cross-asset spillover reserve. */
    crossMutualizedPoolMicro: bigint;
    /** Cumulative CM Tier-2 contributions tally. */
    totalCmContributionsMicro: bigint;
    /** Lifetime sum of tiers 3+4 drained on default events. */
    totalDrainedMicro: bigint;
    /** Count of `DefaultAbsorbed` events. */
    defaultEventCount: number;
}
/** Decoded snapshot of a per-CM `ClearingMemberAccount` PDA. */
export interface ClearingMemberSnapshot {
    authority: PublicKey;
    /** Total USDC posted to CM escrow. */
    collateralMicro: bigint;
    /** Earmarked for IF Tier-2 CM contribution. */
    ifContributionMicro: bigint;
    /** Tier-locked USDC (subtracted from free_collateral). */
    tierLockupCollateralMicro: bigint;
    /** Sum of `option.collateral_locked` across CM's open writer positions. */
    totalPmLockedMicro: bigint;
    /** `free_collateral()` = collateral − tier_lockup − total_pm_locked. */
    freeCollateralMicro: bigint;
    /** `tradable_collateral()` = collateral − total_pm_locked; tier lockup is IM-eligible. */
    tradableCollateralMicro: bigint;
    /** Net long notional across all positions (USDC micro). */
    netNotionalLongMicro: bigint;
    netNotionalShortMicro: bigint;
    positionsCount: number;
    /** Most recent calculate_margin / atomic_fill snapshot of portfolio IM. */
    lastImMicro: bigint;
    /** Active clearing-class compatibility rank (0=M0, 1=M1, 2=M2, 3=M3). */
    tier: 0 | 1 | 2 | 3;
    /** Earliest unix ts at which a downgrade is permitted. */
    tierLockedUntil: bigint;
    /** Set when `liquidate.rs` flagged the CM insolvent. */
    underLiquidation: boolean;
    /** Last `calculate_margin` write timestamp. */
    lastMarginCheck: bigint;
}
/**
 * Decoded snapshot of a per-(user, mint) `LstVault` PDA. Fields parsed from
 * raw account bytes — the IDL doesn't publish this account.
 */
export interface LstVaultSnapshot {
    user: PublicKey;
    lstMint: PublicKey;
    /** Total LST quantity held in the vault SPL token account (lamports). */
    lstQty: bigint;
    /** LST quantity pledged against open option fills (lamports). */
    lockedQty: bigint;
    /** LST quantity pledged as clearing-class lockup floor (lamports). */
    tierLockedQty: bigint;
    /** Solana slot of the most recent stake-pool ER refresh. */
    lastErUpdateSlot: bigint;
    /** Free quantity = lstQty − lockedQty − tierLockedQty (in lamports). */
    freeQty: bigint;
}
/**
 * Decoded snapshot of a per-user `NativeSolVault` PDA (Phase 1A.2 2026-05-04).
 * No mint dimension (single wSOL mint per protocol). No class-lockup slot:
 * class lockup is jitoSOL-only by design because yield-bearing collateral is
 * the value proposition for that lock.
 *
 * Layout: 65 B (8 disc + 32 user + 8 sol_qty + 8 locked_qty + 8 last_update_slot + 1 bump).
 */
export interface NativeSolVaultSnapshot {
    user: PublicKey;
    /** Total wSOL held in the vault escrow ATA (lamports). */
    solQty: bigint;
    /** wSOL pledged against open option fills (lamports). */
    lockedQty: bigint;
    /** Solana slot of the most recent vault-touching ix. */
    lastUpdateSlot: bigint;
    /** Free quantity = solQty − lockedQty (in lamports). */
    freeQty: bigint;
}
/**
 * Decoded snapshot of a `SeriesListingPda` (σ·√T grid metadata cell).
 */
export interface SeriesListingSnapshot {
    asset: number;
    optionType: number;
    direction: number;
    status: number;
    strike: bigint;
    expiryTs: bigint;
    lastFillPriceMicro: bigint;
    lastFillAt: bigint;
    totalOiCount: number;
    cumulativeFillCount: number;
    maxOiCount: number;
    listedAt: bigint;
}
/**
 * Decoded snapshot of the singleton `CrossAssetMatrix` — 10 pairwise
 * correlations across BTC/ETH/SOL/XRP/HYPE in two regimes (calm and
 * stress). Pair ordering: (BTC,ETH), (BTC,SOL), (BTC,XRP), (BTC,HYPE),
 * (ETH,SOL), (ETH,XRP), (ETH,HYPE), (SOL,XRP), (SOL,HYPE), (XRP,HYPE).
 */
export interface CrossAssetSnapshot {
    /** 10-entry P5 rolling 180d ρ (decimal — 0..1). */
    iccRhoP5: number[];
    /** 10-entry stress regime ρ (decimal — 0..1). */
    stressRho: number[];
    /** Slot of the most recent successful update (any kind). */
    lastFitSlot: bigint;
    /** Slot of the last weekly Pearson refresh. */
    lastPearsonSlot: bigint;
    /** Slot of the last daily stress-ρ refresh. */
    lastStressSlot: bigint;
}
/**
 * Decoded snapshot of `MicrostructurePDA` for a single asset.
 */
export interface MicrostructureSnapshot {
    asset: number;
    lastUpdateSlot: bigint;
    /** Last-trade spot (USD). */
    spot: number;
    /** Best bid/ask spread (bps of mid). */
    bidAskSpreadBps: number;
    /** Depth $ within ±$100k of mid (USD). */
    depth100kUsd: number;
    /** 24-hour rolling notional (USD). */
    volume24hUsd: number;
    /** ATM 28d IV — bid side (decimal). */
    ivBid28d: number;
    /** ATM 28d IV — ask side (decimal). */
    ivAsk28d: number;
}
/**
 * Decoded snapshot of a `BuilderCodePda` (fee-rebate registry).
 */
export interface BuilderCodeSnapshot {
    builder: PublicKey;
    registeredAt: bigint;
    /** $1K USDC anti-spam deposit (USDC micro). */
    depositLockedMicro: bigint;
    /** Decayed 30-day routed premium (USDC micro). */
    volume30dRoutedMicro: bigint;
    /** Last decay-update timestamp (unix seconds). */
    lastVolumeUpdateTs: bigint;
    /** Builder share of accrued taker fees (USDC micro). */
    feesAccruedMicro: bigint;
    /** UTF-8 label, trailing zero bytes trimmed. */
    label: string;
}
/**
 * Decoded snapshot of a `ComboIntentPdaV2` (≤32-leg combo intent).
 * Only the first `legCount` legs are decoded — unused slots are skipped.
 */
export interface ComboIntentV2Snapshot {
    buyer: PublicKey;
    comboId: bigint;
    /** 0=Open, 1=Active, 2=Cancelled, 3=Settled, 4=Expired. */
    status: number;
    legCount: number;
    legsFilled: number;
    totalMaxPremiumMicro: bigint;
    totalRealisedPremiumMicro: bigint;
    expiresTs: bigint;
    createdAt: bigint;
    legs: Array<{
        option: PublicKey;
        side: number;
        filled: boolean;
        maxPremiumMicro: bigint;
        fillPremiumMicro: bigint;
    }>;
}
//# sourceMappingURL=types.d.ts.map