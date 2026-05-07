import type { OptionType, PayoffType, Underlying } from "./types";

export type SkewCollateralSymbol = "USDC" | "wSOL" | "jitoSOL";

export type SkewTradeLaneId =
  | "instant_rfq"
  | "auction_rfq"
  | "prefunded_listing"
  | "combo_v1"
  | "combo_v2"
  | "conditional_oco"
  | "builder_routing"
  | "series_listing"
  | "cm_collateral";

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

export const SKEW_CAPABILITIES_VERSION = "2026-05-06" as const;

export const SKEW_UNDERLYINGS = [
  "BTC",
  "ETH",
  "SOL",
  "XRP",
  "HYPE",
] as const satisfies readonly Underlying[];

export const SKEW_ANCHOR_OPTION_TYPES = [
  "Vanilla",
  "Digital",
  "CappedVanilla",
  "RangeAccrual",
  "VanillaInverse",
  "DigitalInverse",
] as const satisfies readonly OptionType[];

export const SKEW_PAYOFF_TYPES = [
  "digital_call",
  "digital_put",
  "vanilla_call",
  "vanilla_put",
  "capped_call",
  "capped_put",
  "range_accrual",
  "vanilla_inverse_call",
  "vanilla_inverse_put",
  "digital_inverse_call",
  "digital_inverse_put",
] as const satisfies readonly PayoffType[];

export const SKEW_ASSET_PAYOFFS = {
  BTC: [
    "digital_call",
    "digital_put",
    "vanilla_call",
    "vanilla_put",
    "capped_call",
    "capped_put",
    "range_accrual",
  ],
  ETH: [
    "digital_call",
    "digital_put",
    "vanilla_call",
    "vanilla_put",
    "capped_call",
    "capped_put",
    "range_accrual",
  ],
  SOL: SKEW_PAYOFF_TYPES,
  XRP: [
    "digital_call",
    "digital_put",
    "vanilla_call",
    "vanilla_put",
    "capped_call",
    "capped_put",
  ],
  HYPE: ["digital_call", "digital_put", "vanilla_call", "vanilla_put"],
} as const satisfies Record<Underlying, readonly PayoffType[]>;

export const SKEW_COLLATERAL_RAILS = [
  {
    symbol: "USDC",
    decimals: 6,
    custody: "spl-token",
    role: ["premium", "payoff", "clearing-member collateral", "RFQ v1 escrow"],
    liveLanes: [
      "instant_rfq",
      "auction_rfq",
      "prefunded_listing",
      "combo_v1",
      "combo_v2",
      "conditional_oco",
      "builder_routing",
      "series_listing",
      "cm_collateral",
    ],
    note: "Canonical stable settlement rail for the pre-funded listing, Auction RFQ, and PM/CM atomic fill lanes.",
  },
  {
    symbol: "wSOL",
    decimals: 9,
    custody: "native-sol-vault",
    role: ["native SOL collateral", "SOL inverse settlement"],
    liveLanes: ["instant_rfq", "cm_collateral"],
    note: "Policy-gated native SOL rail for SOL inverse physical settlement. Not a generic cross-asset PM capacity source.",
  },
  {
    symbol: "jitoSOL",
    decimals: 9,
    custody: "spl-token",
    role: ["LST collateral", "SOL inverse settlement", "verified-tier lockup"],
    liveLanes: ["instant_rfq", "cm_collateral"],
    note: "Policy-gated LST rail for SOL inverse physical settlement plus Verified-tier lockup. Builders must pass the allowlisted mint and stake-pool path.",
  },
] as const satisfies readonly SkewCollateralRail[];

export const SKEW_TRADE_LANES = [
  {
    id: "instant_rfq",
    label: "Instant RFQ HIT",
    status: "live",
    primary: true,
    entrypoints: [
      "collectInstantRfqQuotes",
      "buildRelayPayload",
      "relayPayloadDigest",
      "hitInstantRfqQuote",
    ],
    protocol: [
      "quote_request",
      "quote_ack",
      "buyer_accept",
      "fill_consent",
      "cm_sign",
      "buyer_tx_request",
      "buyer_tx_signed",
      "atomic_fill_from_relay",
    ],
    settlement: ["USDC", "wSOL", "jitoSOL"],
    summary:
      "Buyer hits a live CM quote; buyer and CM sign the same RelayPayload digest; relay submits atomic_fill_from_relay.",
    note:
      "USDC is the linear PM lane. wSOL/jitoSOL are SOL-only inverse physical lanes backed by OptionCollateralLockPda. Builder shares accrue to escrow on USDC and pay directly to the builder settlement ATA on physical fills. Do not emulate take_best_quote; it is not in the current IDL.",
  },
  {
    id: "auction_rfq",
    label: "Auction RFQ",
    status: "keeper-assisted",
    primary: true,
    entrypoints: [
      "registerRfqMaker",
      "registerRfqAuction",
      "submitRfqQuote",
      "finalizeRfqAuction",
      "cancelRfqAuction",
    ],
    protocol: [
      "register_rfq_auction",
      "submit_rfq_quote",
      "finalize_rfq_auction",
      "cancel_rfq_auction",
    ],
    settlement: ["USDC"],
    summary:
      "Buyer escrows a max premium, multiple MMs compete with ed25519-signed quotes, and finalization records the winning quote/refund state.",
    note:
      "Auction RFQ is price discovery and finalization. Immediate execution should route through Instant RFQ atomic fill.",
  },
  {
    id: "prefunded_listing",
    label: "Pre-funded Listing",
    status: "live",
    primary: false,
    entrypoints: ["create", "buy", "settle", "transferOption", "cancelOption"],
    protocol: ["create_option", "deposit_collateral", "buy_option", "settle"],
    settlement: ["USDC"],
    summary:
      "Writer pre-funds a standalone option PDA; buyer later pays premium and receives the option token.",
    note:
      "Keep this lane for builder primitives and simple dApps. It is not the canonical PM/CM quote-hit lane.",
  },
  {
    id: "combo_v1",
    label: "Combo Intent V1",
    status: "keeper-assisted",
    primary: false,
    entrypoints: ["registerComboIntent", "finalizeComboIntent", "cancelComboIntent"],
    protocol: ["register_combo_intent", "finalize_combo_intent", "cancel_combo_intent"],
    settlement: ["USDC"],
    summary:
      "Buyer registers a small multi-leg intent with upfront max-premium escrow; legs are filled through the atomic fill path.",
    note: "Use for compact structured products where the upfront escrow UX is desired.",
  },
  {
    id: "combo_v2",
    label: "Combo Intent V2",
    status: "state-only",
    primary: false,
    entrypoints: [
      "registerComboIntentV2",
      "finalizeComboLegV2",
      "cancelComboIntentV2",
      "cleanupExpiredComboV2",
    ],
    protocol: [
      "register_combo_intent_v2",
      "finalize_combo_leg_v2",
      "cancel_combo_intent_v2",
      "cleanup_expired_combo_v2",
    ],
    settlement: ["USDC"],
    summary:
      "1..32-leg state surface for strategy grouping and fill recording across devices/indexers.",
    note:
      "Treat leg finalization as a recorder signal unless your app cross-checks the underlying atomic fills.",
  },
  {
    id: "conditional_oco",
    label: "Conditional / OCO",
    status: "keeper-assisted",
    primary: false,
    entrypoints: [
      "registerConditionalOrder",
      "registerOcoPair",
      "executeConditionalOrder",
      "applyCloseIsolatedAction",
      "cleanupExpiredConditionalOrder",
    ],
    protocol: [
      "register_conditional_order",
      "register_oco_pair",
      "execute_conditional_order",
      "apply_close_isolated_action",
    ],
    settlement: ["USDC"],
    summary:
      "Pyth-triggered SL/TP/OCO automation with keeper cranks and isolated-close action support.",
    note:
      "RFQ-style conditional actions are surfaced as intent/state until a fill path is explicitly attached.",
  },
  {
    id: "builder_routing",
    label: "Builder Routing",
    status: "live",
    primary: false,
    entrypoints: ["registerBuilder", "withdrawBuilderFees", "closeBuilderCode"],
    protocol: ["register_builder", "withdraw_builder_fees", "close_builder_code"],
    settlement: ["USDC"],
    summary:
      "Registered builder codes let external apps route flow and accrue their configured fee share.",
    note:
      "Dapps should pass the registered builder pubkey into the relay/atomic fill path so attribution is on-chain.",
  },
  {
    id: "series_listing",
    label: "Series Listing",
    status: "keeper-assisted",
    primary: false,
    entrypoints: ["listSeries", "delistSeries", "fetchSeriesListing"],
    protocol: ["register_series", "delist_series"],
    settlement: ["USDC"],
    summary:
      "Deterministic per-series metadata and OI cap surface for market makers, terminals, and indexers.",
    note: "Keepers should register the grid cells they expect to quote before routing production fills.",
  },
  {
    id: "cm_collateral",
    label: "Clearing Member Collateral",
    status: "live",
    primary: true,
    entrypoints: [
      "registerClearingMember",
      "cmAddCollateral",
      "cmWithdrawCollateral",
      "depositLstCollateral",
      "depositNativeSolCollateral",
      "calculateMargin",
    ],
    protocol: [
      "register_clearing_member",
      "cm_deposit_collateral",
      "cm_withdraw_collateral",
      "lst_deposit",
      "native_sol_deposit",
      "calculate_margin",
    ],
    settlement: ["USDC", "wSOL", "jitoSOL"],
    summary:
      "CM onboarding, USDC PM collateral, SOL-family vault deposits, margin refresh, and withdrawal safety checks.",
    note:
      "Bots should initialize CM, volume tracker, position registry, and required vaults before quoting. wSOL/jitoSOL vault balances quote SOL inverse physical fills only.",
  },
] as const satisfies readonly SkewTradeLaneCapability[];

export function getSkewCapabilities(): {
  version: typeof SKEW_CAPABILITIES_VERSION;
  underlyings: typeof SKEW_UNDERLYINGS;
  anchorOptionTypes: typeof SKEW_ANCHOR_OPTION_TYPES;
  payoffTypes: typeof SKEW_PAYOFF_TYPES;
  assetPayoffs: typeof SKEW_ASSET_PAYOFFS;
  collateralRails: typeof SKEW_COLLATERAL_RAILS;
  tradeLanes: typeof SKEW_TRADE_LANES;
  routing: {
    clickToFill: "instant_rfq";
    priceDiscovery: "auction_rfq";
    prefundedBuilderPrimitive: "prefunded_listing";
    deprecatedInstruction: "take_best_quote";
  };
} {
  return {
    version: SKEW_CAPABILITIES_VERSION,
    underlyings: SKEW_UNDERLYINGS,
    anchorOptionTypes: SKEW_ANCHOR_OPTION_TYPES,
    payoffTypes: SKEW_PAYOFF_TYPES,
    assetPayoffs: SKEW_ASSET_PAYOFFS,
    collateralRails: SKEW_COLLATERAL_RAILS,
    tradeLanes: SKEW_TRADE_LANES,
    routing: {
      clickToFill: "instant_rfq",
      priceDiscovery: "auction_rfq",
      prefundedBuilderPrimitive: "prefunded_listing",
      deprecatedInstruction: "take_best_quote",
    },
  };
}
