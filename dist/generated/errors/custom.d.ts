export type CustomError = ExpiryTooSoon | ExpiryTooFar | StrikeZero | PayoffZero | InvalidState | CollateralMismatch | InvalidSettlementMint | UnsupportedOptionType | PremiumZero | PythFeedInvalid | PythPriceStale | PythConfidence | InvalidPayoffAddress | RfqNotOpen | RfqSpecMismatch | RangeUpperBoundInvalid | CloseNotYetEligible | PremiumExceedsMax | InvalidHolderAta | HolderMismatch | NotCurrentHolder | GracePeriodNotElapsed | SettleWindowExpired | OptionNotCancellable | SettleNormalWindowExpired | SettleWindowStillOpen | Unauthorized | NotPrimeAccount | MaxPositionsExceeded | OptionIsITM | PayoffExceedsLimit | InvalidSigmaIv | InsufficientMargin | InvalidPositionAccount | InsolvencyCascade | ThresholdNotMet | SignatureTooOld | TimelockNotElapsed | WithdrawalTooFast | WithdrawalCeilingExceeded | NotionalOutOfBand | MoneynessOutOfBand | SigmaOutOfBand | GammaFreezeActive | CMNotRegistered | IFTierExhausted | ConcentrationCapExceeded | UnsupportedAsset | CmInsufficientCollateral | CmUnderLiquidation | InvalidDirection | InvalidExtraParam | BoundaryImViolation | ProtocolSitgDrained | WaterfallTierInvalid | A1Reserved1 | A1Reserved2 | A1Reserved3 | A1Reserved4 | A1Reserved5 | OracleDivergence | StaleOracle | ConfidenceTooHigh | CushionInterp | DutchAuctionNotStarted | PartialCloseFactorExceeded | SustainedBreachPending | TwapWindowEmpty | UnauthorizedRelayPayload | AuctionNotOpen | AuctionInvalidPrice | SelfLiquidationForbidden | RatioNotRestored | PythNotStaleEnough | MultiVenueFallbackForbidden | AdlClawbackCapExceeded | ProtocolFallbackTooEarly | SsviButterflyViolation | A2Reserved11 | A2Reserved12 | TierMustIncrease | TierMustDecrease | InsufficientLockupCollateral | TierLockupNotExpired | TierChangeForbiddenInLiquidation | UnsupportedTier | BuilderVolumeInsufficient | MakerRebateInactive | VolumeTrackerAuthorityMismatch | BuilderLabelInvalid | BuilderFeesUnderflow | MakerRebatePhaseOutOfRange | HamiltonStateMissing | OracleConfidenceTooWide | ConditionalOrderNotActive | ConditionalTriggerNotMet | ConditionalGraceNotElapsed | ConditionalOrderExpired | ConditionalSlippageRejected | OcoLinkMismatch | RfqAuctionNotOpen | RfqAuctionClosed | RfqQuoteNotBetter | RfqQuoteValidityShort | RfqMakerNotRegistered | RfqMakerDepositInsufficient | RfqQuoteSignatureInvalid | ComboLegIndexOutOfRange | ComboLegCountInvalid | ComboLegAlreadyFilled | ComboIntentV2Expired | ReplenishCapExceeded | LtvCapExceeded | EmergencyAlreadyActive | EmergencyNotActive | EmergencyNotExpired | RfqMakerAlreadySlashed | BonusBelowExpected | IncompletePositionAccounts | ProposalAlreadyExecuted | ProposalAlreadyApproved | InvalidStrike | NotionalTooSmall | CollateralMintAlreadyRegistered | CollateralKindInvalid | CollateralMintNotAllowed | PositionAlreadyTracked | PositionNotTracked | PositionRegistryFull | BuilderFeesOutstanding | MakerQuoteOff | MmpWindowExceeded | InvalidMakerRiskMode | InvalidTenorBucket | PmCacheDirty | PmCacheStale | PmCacheRegistryMismatch | PmCacheAuthorityMismatch | PmCacheModelMismatch | TakeQuoteUnauthorized | TakeQuoteNoMatchingQuote | TakeQuoteQuoteExpired | TakeQuotePriceMoved | RefreshQuoteNotOwnQuote | AxeInvalidBand | AxeInvalidValidUntil | AxeReservedBitsSet | AxeRevoked | BuyerNotWhitelisted | BlockTradeNotionalTooSmall | PositionLimitExceeded | PositionLimitAssetInvalid | CmAccountSizeUnexpected | MakerRateLimitExceeded | AuctionInsufficientMakers | CompressionInvariantBroken | RecoveryThresholdNotMet | RecoveryCommitteeQuorumMissing | RecoveryNotActive | RecoverySnapshotAlreadyPublished | RecoverySnapshotDeadlineExceeded | RecoveryPauseNotActive | RecoverySnapshotMissing | RecoveryVmghCapExceeded | RecoveryTearUpCapExceeded | RecoveryProtocolFeeMismatch | RecoveryTearUpCycleLimitReached | DigestReplayed | RecoveryDeterminationMissing | RecoveryDeterminationStale | RecoveryDeterminationKindMismatch | RecoveryDrainedVaultMismatch | RecoveryVmghMintMismatch | RecoveryTearUpCmMismatch | RecoveryTearUpEmptyScope;
export declare class ExpiryTooSoon extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6000;
    readonly code = 6000;
    readonly name = "ExpiryTooSoon";
    readonly msg = "Expiry must be at least 300s in the future";
    constructor(logs?: string[] | undefined);
}
export declare class ExpiryTooFar extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6001;
    readonly code = 6001;
    readonly name = "ExpiryTooFar";
    readonly msg = "Expiry exceeds maximum horizon of 1 year";
    constructor(logs?: string[] | undefined);
}
export declare class StrikeZero extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6002;
    readonly code = 6002;
    readonly name = "StrikeZero";
    readonly msg = "Strike must be non-zero";
    constructor(logs?: string[] | undefined);
}
export declare class PayoffZero extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6003;
    readonly code = 6003;
    readonly name = "PayoffZero";
    readonly msg = "Payoff amount must be non-zero";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidState extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6004;
    readonly code = 6004;
    readonly name = "InvalidState";
    readonly msg = "Option is not in the expected state for this instruction";
    constructor(logs?: string[] | undefined);
}
export declare class CollateralMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6005;
    readonly code = 6005;
    readonly name = "CollateralMismatch";
    readonly msg = "Collateral deposit amount does not match required collateral";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidSettlementMint extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6006;
    readonly code = 6006;
    readonly name = "InvalidSettlementMint";
    readonly msg = "Settlement mint must be a valid SPL Token mint";
    constructor(logs?: string[] | undefined);
}
export declare class UnsupportedOptionType extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6007;
    readonly code = 6007;
    readonly name = "UnsupportedOptionType";
    readonly msg = "Option type not supported in current program version";
    constructor(logs?: string[] | undefined);
}
export declare class PremiumZero extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6008;
    readonly code = 6008;
    readonly name = "PremiumZero";
    readonly msg = "Premium must be non-zero";
    constructor(logs?: string[] | undefined);
}
export declare class PythFeedInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6009;
    readonly code = 6009;
    readonly name = "PythFeedInvalid";
    readonly msg = "Pyth price account does not match the option's underlying feed";
    constructor(logs?: string[] | undefined);
}
export declare class PythPriceStale extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6010;
    readonly code = 6010;
    readonly name = "PythPriceStale";
    readonly msg = "Pyth price is stale (publish_time older than 300s)";
    constructor(logs?: string[] | undefined);
}
export declare class PythConfidence extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6011;
    readonly code = 6011;
    readonly name = "PythConfidence";
    readonly msg = "Pyth confidence interval too wide (conf/price >= 10%)";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidPayoffAddress extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6012;
    readonly code = 6012;
    readonly name = "InvalidPayoffAddress";
    readonly msg = "Payoff token account owner does not match expected recipient";
    constructor(logs?: string[] | undefined);
}
export declare class RfqNotOpen extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6013;
    readonly code = 6013;
    readonly name = "RfqNotOpen";
    readonly msg = "RFQ is not in Open state";
    constructor(logs?: string[] | undefined);
}
export declare class RfqSpecMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6014;
    readonly code = 6014;
    readonly name = "RfqSpecMismatch";
    readonly msg = "Option spec does not match RFQ parameters";
    constructor(logs?: string[] | undefined);
}
export declare class RangeUpperBoundInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6015;
    readonly code = 6015;
    readonly name = "RangeUpperBoundInvalid";
    readonly msg = "upper_bound must be strictly greater than strike for range-type options";
    constructor(logs?: string[] | undefined);
}
export declare class CloseNotYetEligible extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6016;
    readonly code = 6016;
    readonly name = "CloseNotYetEligible";
    readonly msg = "Option expiry + 1 day has not yet passed; close not eligible";
    constructor(logs?: string[] | undefined);
}
export declare class PremiumExceedsMax extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6017;
    readonly code = 6017;
    readonly name = "PremiumExceedsMax";
    readonly msg = "Premium offered by underwriter exceeds buyer's max_premium";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidHolderAta extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6018;
    readonly code = 6018;
    readonly name = "InvalidHolderAta";
    readonly msg = "current_holder_option_ata mint does not match option_token_mint";
    constructor(logs?: string[] | undefined);
}
export declare class HolderMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6019;
    readonly code = 6019;
    readonly name = "HolderMismatch";
    readonly msg = "current_holder_option_ata owner does not match payoff_token_account owner";
    constructor(logs?: string[] | undefined);
}
export declare class NotCurrentHolder extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6020;
    readonly code = 6020;
    readonly name = "NotCurrentHolder";
    readonly msg = "current_holder_option_ata does not hold exactly 1 option token";
    constructor(logs?: string[] | undefined);
}
export declare class GracePeriodNotElapsed extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6021;
    readonly code = 6021;
    readonly name = "GracePeriodNotElapsed";
    readonly msg = "Grace period (72h) has not elapsed; call expire_abandoned after expiry + 72h";
    constructor(logs?: string[] | undefined);
}
export declare class SettleWindowExpired extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6022;
    readonly code = 6022;
    readonly name = "SettleWindowExpired";
    readonly msg = "Settle window (72h past expiry) has closed; use expire_abandoned instead";
    constructor(logs?: string[] | undefined);
}
export declare class OptionNotCancellable extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6023;
    readonly code = 6023;
    readonly name = "OptionNotCancellable";
    readonly msg = "Option can only be cancelled in Created or Funded state";
    constructor(logs?: string[] | undefined);
}
export declare class SettleNormalWindowExpired extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6024;
    readonly code = 6024;
    readonly name = "SettleNormalWindowExpired";
    readonly msg = "Settle 30-min normal window has passed; call mark_disputed instead";
    constructor(logs?: string[] | undefined);
}
export declare class SettleWindowStillOpen extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6025;
    readonly code = 6025;
    readonly name = "SettleWindowStillOpen";
    readonly msg = "Option is not yet past the 30-min normal settle window";
    constructor(logs?: string[] | undefined);
}
export declare class Unauthorized extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6026;
    readonly code = 6026;
    readonly name = "Unauthorized";
    readonly msg = "Caller is not the SKEW_AUTHORITY";
    constructor(logs?: string[] | undefined);
}
export declare class NotPrimeAccount extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6027;
    readonly code = 6027;
    readonly name = "NotPrimeAccount";
    readonly msg = "Caller does not have an approved Prime Account (deprecated \u2014 see CMNotRegistered)";
    constructor(logs?: string[] | undefined);
}
export declare class MaxPositionsExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6028;
    readonly code = 6028;
    readonly name = "MaxPositionsExceeded";
    readonly msg = "Prime Account position limit reached (deprecated)";
    constructor(logs?: string[] | undefined);
}
export declare class OptionIsITM extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6029;
    readonly code = 6029;
    readonly name = "OptionIsITM";
    readonly msg = "Option is in-the-money; call settle first before rolling over";
    constructor(logs?: string[] | undefined);
}
export declare class PayoffExceedsLimit extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6030;
    readonly code = 6030;
    readonly name = "PayoffExceedsLimit";
    readonly msg = "payoff_amount exceeds per-maturity limit (Tier 1: 10,000 USDC)";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidSigmaIv extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6031;
    readonly code = 6031;
    readonly name = "InvalidSigmaIv";
    readonly msg = "sigma_iv value out of valid range (must be 0.01 < \u03C3_IV < 5.0)";
    constructor(logs?: string[] | undefined);
}
export declare class InsufficientMargin extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6032;
    readonly code = 6032;
    readonly name = "InsufficientMargin";
    readonly msg = "Portfolio margin ratio below minimum (margin_ratio < 1.10); add collateral";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidPositionAccount extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6033;
    readonly code = 6033;
    readonly name = "InvalidPositionAccount";
    readonly msg = "PositionAccount parameters invalid (deprecated in v4)";
    constructor(logs?: string[] | undefined);
}
export declare class InsolvencyCascade extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6034;
    readonly code = 6034;
    readonly name = "InsolvencyCascade";
    readonly msg = "Liquidation would drive CM equity below zero (Bug #17 insolvency cascade guard)";
    constructor(logs?: string[] | undefined);
}
export declare class ThresholdNotMet extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6035;
    readonly code = 6035;
    readonly name = "ThresholdNotMet";
    readonly msg = "Governance signatures below GOVERNANCE_MULTISIG_THRESHOLD (3 of 5)";
    constructor(logs?: string[] | undefined);
}
export declare class SignatureTooOld extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6036;
    readonly code = 6036;
    readonly name = "SignatureTooOld";
    readonly msg = "Admin signature older than SIG_MAX_AGE_SECS (1h) Drift-style replay defense";
    constructor(logs?: string[] | undefined);
}
export declare class TimelockNotElapsed extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6037;
    readonly code = 6037;
    readonly name = "TimelockNotElapsed";
    readonly msg = "Admin action timelock has not elapsed (TIMELOCK_24H_SLOTS)";
    constructor(logs?: string[] | undefined);
}
export declare class WithdrawalTooFast extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6038;
    readonly code = 6038;
    readonly name = "WithdrawalTooFast";
    readonly msg = "Withdrawal exceeds 10\u00D7 normal-flow rate-limit";
    constructor(logs?: string[] | undefined);
}
export declare class WithdrawalCeilingExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6039;
    readonly code = 6039;
    readonly name = "WithdrawalCeilingExceeded";
    readonly msg = "Withdrawal exceeds hard ceiling = WITHDRAWAL_TVL_CEILING_BPS of TVL";
    constructor(logs?: string[] | undefined);
}
export declare class NotionalOutOfBand extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6040;
    readonly code = 6040;
    readonly name = "NotionalOutOfBand";
    readonly msg = "Notional outside [$10, $10M] band (NOTIONAL_MIN/MAX_USDC_MICRO)";
    constructor(logs?: string[] | undefined);
}
export declare class MoneynessOutOfBand extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6041;
    readonly code = 6041;
    readonly name = "MoneynessOutOfBand";
    readonly msg = "Moneyness K/S outside [0.5, 2.0] band (MONEYNESS_MIN/MAX_BPS)";
    constructor(logs?: string[] | undefined);
}
export declare class SigmaOutOfBand extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6042;
    readonly code = 6042;
    readonly name = "SigmaOutOfBand";
    readonly msg = "Volatility \u03C3 outside [0.10, 3.00] band (SIGMA_MIN/MAX)";
    constructor(logs?: string[] | undefined);
}
export declare class GammaFreezeActive extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6043;
    readonly code = 6043;
    readonly name = "GammaFreezeActive";
    readonly msg = "Gamma freeze active \u2014 expiry must be at least 60 min in the future";
    constructor(logs?: string[] | undefined);
}
export declare class CMNotRegistered extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6044;
    readonly code = 6044;
    readonly name = "CMNotRegistered";
    readonly msg = "Caller is not a registered Clearing Member (register_clearing_member first)";
    constructor(logs?: string[] | undefined);
}
export declare class IFTierExhausted extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6045;
    readonly code = 6045;
    readonly name = "IFTierExhausted";
    readonly msg = "Insurance Fund tier exhausted; waterfall cascades to next tier";
    constructor(logs?: string[] | undefined);
}
export declare class ConcentrationCapExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6046;
    readonly code = 6046;
    readonly name = "ConcentrationCapExceeded";
    readonly msg = "CM notional exceeds MAX_CONCENTRATION_PER_CM_BPS (3% of protocol OI)";
    constructor(logs?: string[] | undefined);
}
export declare class UnsupportedAsset extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6047;
    readonly code = 6047;
    readonly name = "UnsupportedAsset";
    readonly msg = "Asset not in launch panel allowlist (V3: BTC/ETH/SOL/XRP/HYPE; V2: BTC/ETH/SOL/JUP/BONK/WIF)";
    constructor(logs?: string[] | undefined);
}
export declare class CmInsufficientCollateral extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6048;
    readonly code = 6048;
    readonly name = "CmInsufficientCollateral";
    readonly msg = "CM free collateral below requested withdrawal";
    constructor(logs?: string[] | undefined);
}
export declare class CmUnderLiquidation extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6049;
    readonly code = 6049;
    readonly name = "CmUnderLiquidation";
    readonly msg = "CM is flagged under_liquidation; new position opens are locked";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidDirection extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6050;
    readonly code = 6050;
    readonly name = "InvalidDirection";
    readonly msg = "OptionAccount direction field invalid for this OptionType";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidExtraParam extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6051;
    readonly code = 6051;
    readonly name = "InvalidExtraParam";
    readonly msg = "OptionAccount extra_param invalid for this OptionType";
    constructor(logs?: string[] | undefined);
}
export declare class BoundaryImViolation extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6052;
    readonly code = 6052;
    readonly name = "BoundaryImViolation";
    readonly msg = "Boundary-Aware IM violation \u2014 max(IM_scenario, M \u2212 V_0) not satisfied";
    constructor(logs?: string[] | undefined);
}
export declare class ProtocolSitgDrained extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6053;
    readonly code = 6053;
    readonly name = "ProtocolSitgDrained";
    readonly msg = "Insurance Fund tier-3 (Protocol SITG) drained;required";
    constructor(logs?: string[] | undefined);
}
export declare class WaterfallTierInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6054;
    readonly code = 6054;
    readonly name = "WaterfallTierInvalid";
    readonly msg = "Waterfall tier index out of range (valid 1..=5)";
    constructor(logs?: string[] | undefined);
}
export declare class A1Reserved1 extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6055;
    readonly code = 6055;
    readonly name = "A1Reserved1";
    readonly msg = "Signature too old (governance \u00A715.5 drift defense, 1h max)";
    constructor(logs?: string[] | undefined);
}
export declare class A1Reserved2 extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6056;
    readonly code = 6056;
    readonly name = "A1Reserved2";
    readonly msg = "Protocol paused; only PauseProtocol / UnpauseProtocol may be queued";
    constructor(logs?: string[] | undefined);
}
export declare class A1Reserved3 extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6057;
    readonly code = 6057;
    readonly name = "A1Reserved3";
    readonly msg = "Timelock not yet elapsed (governance \u00A715.4 24h)";
    constructor(logs?: string[] | undefined);
}
export declare class A1Reserved4 extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6058;
    readonly code = 6058;
    readonly name = "A1Reserved4";
    readonly msg = "Multisig threshold not met (3-of-5 default)";
    constructor(logs?: string[] | undefined);
}
export declare class A1Reserved5 extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6059;
    readonly code = 6059;
    readonly name = "A1Reserved5";
    readonly msg = "Proposal already executed; once-only semantics (governance \u00A715.3)";
    constructor(logs?: string[] | undefined);
}
export declare class OracleDivergence extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6060;
    readonly code = 6060;
    readonly name = "OracleDivergence";
    readonly msg = "Pyth vs Switchboard oracle divergence exceeds 5% (OracleDivergence)";
    constructor(logs?: string[] | undefined);
}
export declare class StaleOracle extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6061;
    readonly code = 6061;
    readonly name = "StaleOracle";
    readonly msg = "Oracle price sample older than ORACLE_STALENESS_SECS (60s mainnet)";
    constructor(logs?: string[] | undefined);
}
export declare class ConfidenceTooHigh extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6062;
    readonly code = 6062;
    readonly name = "ConfidenceTooHigh";
    readonly msg = "Pyth confidence/price ratio exceeds ORACLE_CONFIDENCE_BPS (5%)";
    constructor(logs?: string[] | undefined);
}
export declare class CushionInterp extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6063;
    readonly code = 6063;
    readonly name = "CushionInterp";
    readonly msg = "Cushion-zone interpolation bounds invalid (internal; K-zone > K or zone > K)";
    constructor(logs?: string[] | undefined);
}
export declare class DutchAuctionNotStarted extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6064;
    readonly code = 6064;
    readonly name = "DutchAuctionNotStarted";
    readonly msg = "Dutch auction has not started yet (liq_start_ts > now)";
    constructor(logs?: string[] | undefined);
}
export declare class PartialCloseFactorExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6065;
    readonly code = 6065;
    readonly name = "PartialCloseFactorExceeded";
    readonly msg = "Partial close factor exceeds PARTIAL_CLOSE_MAX_BPS (50%)";
    constructor(logs?: string[] | undefined);
}
export declare class SustainedBreachPending extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6066;
    readonly code = 6066;
    readonly name = "SustainedBreachPending";
    readonly msg = "[deprecated] OneTouch sustained-breach \u2014 OneTouch dropped in the V3 amendment (2026-04-24)";
    constructor(logs?: string[] | undefined);
}
export declare class TwapWindowEmpty extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6067;
    readonly code = 6067;
    readonly name = "TwapWindowEmpty";
    readonly msg = "TWAP window has no valid samples; settlement cannot proceed";
    constructor(logs?: string[] | undefined);
}
export declare class UnauthorizedRelayPayload extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6068;
    readonly code = 6068;
    readonly name = "UnauthorizedRelayPayload";
    readonly msg = "Relay payload Ed25519 signature verification failed (buyer/CM/digest mismatch)";
    constructor(logs?: string[] | undefined);
}
export declare class AuctionNotOpen extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6069;
    readonly code = 6069;
    readonly name = "AuctionNotOpen";
    readonly msg = "Dutch auction not in Open state (already filled/cancelled)";
    constructor(logs?: string[] | undefined);
}
export declare class AuctionInvalidPrice extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6070;
    readonly code = 6070;
    readonly name = "AuctionInvalidPrice";
    readonly msg = "Auction price parameters invalid (start < floor, zero duration, or price=0)";
    constructor(logs?: string[] | undefined);
}
export declare class SelfLiquidationForbidden extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6071;
    readonly code = 6071;
    readonly name = "SelfLiquidationForbidden";
    readonly msg = "Self-liquidation forbidden () \u2014 liquidator cannot equal owner";
    constructor(logs?: string[] | undefined);
}
export declare class RatioNotRestored extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6072;
    readonly code = 6072;
    readonly name = "RatioNotRestored";
    readonly msg = "Post-liquidation ratio not restored equity/IM < 1.10 after partial";
    constructor(logs?: string[] | undefined);
}
export declare class PythNotStaleEnough extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6073;
    readonly code = 6073;
    readonly name = "PythNotStaleEnough";
    readonly msg = "Pyth not stale enough for DEX fallback staleness \u2264 threshold";
    constructor(logs?: string[] | undefined);
}
export declare class MultiVenueFallbackForbidden extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6074;
    readonly code = 6074;
    readonly name = "MultiVenueFallbackForbidden";
    readonly msg = "Multi-venue median fallback forbidden single DEX venue only";
    constructor(logs?: string[] | undefined);
}
export declare class AdlClawbackCapExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6075;
    readonly code = 6075;
    readonly name = "AdlClawbackCapExceeded";
    readonly msg = "ADL clawback exceeds 50% of winner profit";
    constructor(logs?: string[] | undefined);
}
export declare class ProtocolFallbackTooEarly extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6076;
    readonly code = 6076;
    readonly name = "ProtocolFallbackTooEarly";
    readonly msg = "Protocol fallback called before slot=45";
    constructor(logs?: string[] | undefined);
}
export declare class SsviButterflyViolation extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6077;
    readonly code = 6077;
    readonly name = "SsviButterflyViolation";
    readonly msg = "SSVI butterfly arbitrage bound violated: \u03B8\u00B7\u03C6\u00B2\u00B7(1+|\u03C1|) > 4.0";
    constructor(logs?: string[] | undefined);
}
export declare class A2Reserved11 extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6078;
    readonly code = 6078;
    readonly name = "A2Reserved11";
    readonly msg = "Placeholder 6078 (reserved)";
    constructor(logs?: string[] | undefined);
}
export declare class A2Reserved12 extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6079;
    readonly code = 6079;
    readonly name = "A2Reserved12";
    readonly msg = "not yet implemented (P-004 variation_margin et al.)";
    constructor(logs?: string[] | undefined);
}
export declare class TierMustIncrease extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6080;
    readonly code = 6080;
    readonly name = "TierMustIncrease";
    readonly msg = "Tier change must increase tier rank (Standard < Silver < Gold < Platinum)";
    constructor(logs?: string[] | undefined);
}
export declare class TierMustDecrease extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6081;
    readonly code = 6081;
    readonly name = "TierMustDecrease";
    readonly msg = "Tier change must decrease tier rank";
    constructor(logs?: string[] | undefined);
}
export declare class InsufficientLockupCollateral extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6082;
    readonly code = 6082;
    readonly name = "InsufficientLockupCollateral";
    readonly msg = "Insufficient free collateral to satisfy the requested tier's lockup floor";
    constructor(logs?: string[] | undefined);
}
export declare class TierLockupNotExpired extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6083;
    readonly code = 6083;
    readonly name = "TierLockupNotExpired";
    readonly msg = "Tier lockup minimum-hold (30 days) has not yet elapsed; downgrade rejected";
    constructor(logs?: string[] | undefined);
}
export declare class TierChangeForbiddenInLiquidation extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6084;
    readonly code = 6084;
    readonly name = "TierChangeForbiddenInLiquidation";
    readonly msg = "Tier change forbidden while CM is under_liquidation";
    constructor(logs?: string[] | undefined);
}
export declare class UnsupportedTier extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6085;
    readonly code = 6085;
    readonly name = "UnsupportedTier";
    readonly msg = "Unsupported VerifiedTier discriminant; valid range is 0..=3 (Standard/Silver/Gold/Platinum)";
    constructor(logs?: string[] | undefined);
}
export declare class BuilderVolumeInsufficient extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6086;
    readonly code = 6086;
    readonly name = "BuilderVolumeInsufficient";
    readonly msg = "Builder code 30-day routed volume below floor; deposit refund not permitted";
    constructor(logs?: string[] | undefined);
}
export declare class MakerRebateInactive extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6087;
    readonly code = 6087;
    readonly name = "MakerRebateInactive";
    readonly msg = "Maker rebate phase is not active under current governance toggle";
    constructor(logs?: string[] | undefined);
}
export declare class VolumeTrackerAuthorityMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6088;
    readonly code = 6088;
    readonly name = "VolumeTrackerAuthorityMismatch";
    readonly msg = "Volume tracker authority does not match the fee-paying signer / CM authority";
    constructor(logs?: string[] | undefined);
}
export declare class BuilderLabelInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6089;
    readonly code = 6089;
    readonly name = "BuilderLabelInvalid";
    readonly msg = "Builder code label exceeds 32 bytes or contains an interior NUL byte";
    constructor(logs?: string[] | undefined);
}
export declare class BuilderFeesUnderflow extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6090;
    readonly code = 6090;
    readonly name = "BuilderFeesUnderflow";
    readonly msg = "Builder fees-accrued underflow on withdraw";
    constructor(logs?: string[] | undefined);
}
export declare class MakerRebatePhaseOutOfRange extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6091;
    readonly code = 6091;
    readonly name = "MakerRebatePhaseOutOfRange";
    readonly msg = "Maker rebate phase value out of range; valid 0..=10_000 bps";
    constructor(logs?: string[] | undefined);
}
export declare class HamiltonStateMissing extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6092;
    readonly code = 6092;
    readonly name = "HamiltonStateMissing";
    readonly msg = "HamiltonState PDA not provided for asset with open positions (anti-stress-bypass)";
    constructor(logs?: string[] | undefined);
}
export declare class OracleConfidenceTooWide extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6093;
    readonly code = 6093;
    readonly name = "OracleConfidenceTooWide";
    readonly msg = "Pyth confidence interval too wide (> 1% of price); oracle data not trustworthy";
    constructor(logs?: string[] | undefined);
}
export declare class ConditionalOrderNotActive extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6094;
    readonly code = 6094;
    readonly name = "ConditionalOrderNotActive";
    readonly msg = "Conditional order not in Active state (already triggered/cancelled/expired)";
    constructor(logs?: string[] | undefined);
}
export declare class ConditionalTriggerNotMet extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6095;
    readonly code = 6095;
    readonly name = "ConditionalTriggerNotMet";
    readonly msg = "Conditional order trigger condition not met by current oracle price";
    constructor(logs?: string[] | undefined);
}
export declare class ConditionalGraceNotElapsed extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6096;
    readonly code = 6096;
    readonly name = "ConditionalGraceNotElapsed";
    readonly msg = "Conditional order grace period has not elapsed (anti-flicker)";
    constructor(logs?: string[] | undefined);
}
export declare class ConditionalOrderExpired extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6097;
    readonly code = 6097;
    readonly name = "ConditionalOrderExpired";
    readonly msg = "Conditional order valid_until_ts has already elapsed";
    constructor(logs?: string[] | undefined);
}
export declare class ConditionalSlippageRejected extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6098;
    readonly code = 6098;
    readonly name = "ConditionalSlippageRejected";
    readonly msg = "Conditional order action min/max premium violated (slippage protection)";
    constructor(logs?: string[] | undefined);
}
export declare class OcoLinkMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6099;
    readonly code = 6099;
    readonly name = "OcoLinkMismatch";
    readonly msg = "OCO pair link mismatch (linked_order pubkey does not match)";
    constructor(logs?: string[] | undefined);
}
export declare class RfqAuctionNotOpen extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6100;
    readonly code = 6100;
    readonly name = "RfqAuctionNotOpen";
    readonly msg = "RFQ auction not in Open state";
    constructor(logs?: string[] | undefined);
}
export declare class RfqAuctionClosed extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6101;
    readonly code = 6101;
    readonly name = "RfqAuctionClosed";
    readonly msg = "RFQ auction close slot already reached (no new quotes accepted)";
    constructor(logs?: string[] | undefined);
}
export declare class RfqQuoteNotBetter extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6102;
    readonly code = 6102;
    readonly name = "RfqQuoteNotBetter";
    readonly msg = "RFQ quote not better than current best (must strictly undercut)";
    constructor(logs?: string[] | undefined);
}
export declare class RfqQuoteValidityShort extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6103;
    readonly code = 6103;
    readonly name = "RfqQuoteValidityShort";
    readonly msg = "RFQ quote validity window does not span the auction close slot";
    constructor(logs?: string[] | undefined);
}
export declare class RfqMakerNotRegistered extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6104;
    readonly code = 6104;
    readonly name = "RfqMakerNotRegistered";
    readonly msg = "RFQ MM not registered (must register_rfq_maker with deposit first)";
    constructor(logs?: string[] | undefined);
}
export declare class RfqMakerDepositInsufficient extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6105;
    readonly code = 6105;
    readonly name = "RfqMakerDepositInsufficient";
    readonly msg = "RFQ MM deposit below minimum (anti-spam slashable bond)";
    constructor(logs?: string[] | undefined);
}
export declare class RfqQuoteSignatureInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6106;
    readonly code = 6106;
    readonly name = "RfqQuoteSignatureInvalid";
    readonly msg = "RFQ ed25519 quote signature did not verify against expected payload";
    constructor(logs?: string[] | undefined);
}
export declare class ComboLegIndexOutOfRange extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6107;
    readonly code = 6107;
    readonly name = "ComboLegIndexOutOfRange";
    readonly msg = "Combo intent v2 leg index out of range (0..leg_count)";
    constructor(logs?: string[] | undefined);
}
export declare class ComboLegCountInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6108;
    readonly code = 6108;
    readonly name = "ComboLegCountInvalid";
    readonly msg = "Combo intent v2 leg count must be in 1..=32";
    constructor(logs?: string[] | undefined);
}
export declare class ComboLegAlreadyFilled extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6109;
    readonly code = 6109;
    readonly name = "ComboLegAlreadyFilled";
    readonly msg = "Combo intent v2 leg already filled";
    constructor(logs?: string[] | undefined);
}
export declare class ComboIntentV2Expired extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6110;
    readonly code = 6110;
    readonly name = "ComboIntentV2Expired";
    readonly msg = "Combo intent v2 expires_ts has elapsed (cleanup required)";
    constructor(logs?: string[] | undefined);
}
export declare class ReplenishCapExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6111;
    readonly code = 6111;
    readonly name = "ReplenishCapExceeded";
    readonly msg = "replenish_if_from_fees amount exceeds 10% of fee_accumulator balance (Rule 3 cap)";
    constructor(logs?: string[] | undefined);
}
export declare class LtvCapExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6112;
    readonly code = 6112;
    readonly name = "LtvCapExceeded";
    readonly msg = "Dynamic LTV cap exceeded \u2014 depeg severity reduced max-lockable, cm.total_pm_locked + im > cap";
    constructor(logs?: string[] | undefined);
}
export declare class EmergencyAlreadyActive extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6113;
    readonly code = 6113;
    readonly name = "EmergencyAlreadyActive";
    readonly msg = "emergency_pause: already active \u2014 re-pause not permitted (use emergency_resume first)";
    constructor(logs?: string[] | undefined);
}
export declare class EmergencyNotActive extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6114;
    readonly code = 6114;
    readonly name = "EmergencyNotActive";
    readonly msg = "emergency_resume / cleanup_expired_emergency: emergency not active \u2014 nothing to clear";
    constructor(logs?: string[] | undefined);
}
export declare class EmergencyNotExpired extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6115;
    readonly code = 6115;
    readonly name = "EmergencyNotExpired";
    readonly msg = "cleanup_expired_emergency: 24h timelock window not yet elapsed \u2014 only emergency_resume by SKEW_AUTHORITY may clear early";
    constructor(logs?: string[] | undefined);
}
export declare class RfqMakerAlreadySlashed extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6116;
    readonly code = 6116;
    readonly name = "RfqMakerAlreadySlashed";
    readonly msg = "slash_rfq_maker: registry already slashable=true \u2014 duplicate slash not permitted";
    constructor(logs?: string[] | undefined);
}
export declare class BonusBelowExpected extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6117;
    readonly code = 6117;
    readonly name = "BonusBelowExpected";
    readonly msg = "liquidate: actual effective Dutch bonus bps fell below liquidator's min_expected_bonus_bps floor (race-condition front-run defense)";
    constructor(logs?: string[] | undefined);
}
export declare class IncompletePositionAccounts extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6118;
    readonly code = 6118;
    readonly name = "IncompletePositionAccounts";
    readonly msg = "PM compute: walked OptionAccount count != cm.positions_count \u2014 caller must pass every CM-owned option PDA in remaining_accounts (silent IM under-count defense)";
    constructor(logs?: string[] | undefined);
}
export declare class ProposalAlreadyExecuted extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6119;
    readonly code = 6119;
    readonly name = "ProposalAlreadyExecuted";
    readonly msg = "governance_approve: proposal already executed \u2014 no further approvals accepted";
    constructor(logs?: string[] | undefined);
}
export declare class ProposalAlreadyApproved extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6120;
    readonly code = 6120;
    readonly name = "ProposalAlreadyApproved";
    readonly msg = "governance_approve: this member already recorded an approval on this proposal (duplicate-approval defense)";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidStrike extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6121;
    readonly code = 6121;
    readonly name = "InvalidStrike";
    readonly msg = "create_option: strike not aligned to per-asset k_round_micro grid step";
    constructor(logs?: string[] | undefined);
}
export declare class NotionalTooSmall extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6122;
    readonly code = 6122;
    readonly name = "NotionalTooSmall";
    readonly msg = "create_option: payoff \u00D7 spot below per-asset min_position_usd_micro floor (dust position)";
    constructor(logs?: string[] | undefined);
}
export declare class CollateralMintAlreadyRegistered extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6123;
    readonly code = 6123;
    readonly name = "CollateralMintAlreadyRegistered";
    readonly msg = "collateral policy: mint already registered (duplicate)";
    constructor(logs?: string[] | undefined);
}
export declare class CollateralKindInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6124;
    readonly code = 6124;
    readonly name = "CollateralKindInvalid";
    readonly msg = "collateral policy: invalid kind discriminator (0=Stable, 1=Native, 2=LST)";
    constructor(logs?: string[] | undefined);
}
export declare class CollateralMintNotAllowed extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6125;
    readonly code = 6125;
    readonly name = "CollateralMintNotAllowed";
    readonly msg = "collateral policy: settlement_mint not in allowlist (atomic_fill / buy_option / fill_rfq)";
    constructor(logs?: string[] | undefined);
}
export declare class PositionAlreadyTracked extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6126;
    readonly code = 6126;
    readonly name = "PositionAlreadyTracked";
    readonly msg = "position registry: already tracking this option";
    constructor(logs?: string[] | undefined);
}
export declare class PositionNotTracked extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6127;
    readonly code = 6127;
    readonly name = "PositionNotTracked";
    readonly msg = "position registry: option is not tracked by this CM";
    constructor(logs?: string[] | undefined);
}
export declare class PositionRegistryFull extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6128;
    readonly code = 6128;
    readonly name = "PositionRegistryFull";
    readonly msg = "position registry: maximum PM-tracked positions reached";
    constructor(logs?: string[] | undefined);
}
export declare class BuilderFeesOutstanding extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6129;
    readonly code = 6129;
    readonly name = "BuilderFeesOutstanding";
    readonly msg = "builder code close: withdraw accrued builder fees before closing the builder PDA";
    constructor(logs?: string[] | undefined);
}
export declare class MakerQuoteOff extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6130;
    readonly code = 6130;
    readonly name = "MakerQuoteOff";
    readonly msg = "RFQ maker quote-off switch is active";
    constructor(logs?: string[] | undefined);
}
export declare class MmpWindowExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6131;
    readonly code = 6131;
    readonly name = "MmpWindowExceeded";
    readonly msg = "RFQ maker MMP rolling-window limit exceeded";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidMakerRiskMode extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6132;
    readonly code = 6132;
    readonly name = "InvalidMakerRiskMode";
    readonly msg = "RFQ maker risk config mode out of range";
    constructor(logs?: string[] | undefined);
}
export declare class InvalidTenorBucket extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6133;
    readonly code = 6133;
    readonly name = "InvalidTenorBucket";
    readonly msg = "expiry must match an allowlisted asset tenor bucket (1d / 7d / 14d / 28d / 90d)";
    constructor(logs?: string[] | undefined);
}
export declare class PmCacheDirty extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6134;
    readonly code = 6134;
    readonly name = "PmCacheDirty";
    readonly msg = "PM cache is dirty; run refresh_cm_risk_cache_full before using cached path";
    constructor(logs?: string[] | undefined);
}
export declare class PmCacheStale extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6135;
    readonly code = 6135;
    readonly name = "PmCacheStale";
    readonly msg = "PM cache is stale; run refresh_cm_risk_cache_full before using cached path";
    constructor(logs?: string[] | undefined);
}
export declare class PmCacheRegistryMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6136;
    readonly code = 6136;
    readonly name = "PmCacheRegistryMismatch";
    readonly msg = "PM cache registry hash/count does not match the canonical position registry";
    constructor(logs?: string[] | undefined);
}
export declare class PmCacheAuthorityMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6137;
    readonly code = 6137;
    readonly name = "PmCacheAuthorityMismatch";
    readonly msg = "PM cache CM/authority mismatch";
    constructor(logs?: string[] | undefined);
}
export declare class PmCacheModelMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6138;
    readonly code = 6138;
    readonly name = "PmCacheModelMismatch";
    readonly msg = "PM cache model version mismatch";
    constructor(logs?: string[] | undefined);
}
export declare class TakeQuoteUnauthorized extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6139;
    readonly code = 6139;
    readonly name = "TakeQuoteUnauthorized";
    readonly msg = "take_best_quote signer is not the auction.buyer (only the auction registrant can take)";
    constructor(logs?: string[] | undefined);
}
export declare class TakeQuoteNoMatchingQuote extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6140;
    readonly code = 6140;
    readonly name = "TakeQuoteNoMatchingQuote";
    readonly msg = "take_best_quote called on auction with no submitted quote (best_quote.mm == default)";
    constructor(logs?: string[] | undefined);
}
export declare class TakeQuoteQuoteExpired extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6141;
    readonly code = 6141;
    readonly name = "TakeQuoteQuoteExpired";
    readonly msg = "take_best_quote best_quote.valid_until_slot has elapsed (re-submit / refresh required)";
    constructor(logs?: string[] | undefined);
}
export declare class TakeQuotePriceMoved extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6142;
    readonly code = 6142;
    readonly name = "TakeQuotePriceMoved";
    readonly msg = "take_best_quote args.expected_premium_micro != current best_quote.premium (price moved during front-run window)";
    constructor(logs?: string[] | undefined);
}
export declare class RefreshQuoteNotOwnQuote extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6143;
    readonly code = 6143;
    readonly name = "RefreshQuoteNotOwnQuote";
    readonly msg = "refresh_quote: caller mm key != current auction.best_quote.mm (only own quote can be refreshed)";
    constructor(logs?: string[] | undefined);
}
export declare class AxeInvalidBand extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6144;
    readonly code = 6144;
    readonly name = "AxeInvalidBand";
    readonly msg = "publish_axe / update_axe args band/asset/side/size validation failed: lo>hi, asset>4, side not in -1/0/+1, size==0, etc.";
    constructor(logs?: string[] | undefined);
}
export declare class AxeInvalidValidUntil extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6145;
    readonly code = 6145;
    readonly name = "AxeInvalidValidUntil";
    readonly msg = "publish_axe / update_axe valid_until / expiry_band_lo must exceed current unix_timestamp";
    constructor(logs?: string[] | undefined);
}
export declare class AxeReservedBitsSet extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6146;
    readonly code = 6146;
    readonly name = "AxeReservedBitsSet";
    readonly msg = "publish_axe / update_axe option_type_mask reserved bits 10..=15 must be zero";
    constructor(logs?: string[] | undefined);
}
export declare class AxeRevoked extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6147;
    readonly code = 6147;
    readonly name = "AxeRevoked";
    readonly msg = "update_axe: axe.revoked == true \u2014 re-publish required (close the PDA via revoke_axe first then publish_axe again)";
    constructor(logs?: string[] | undefined);
}
export declare class BuyerNotWhitelisted extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6148;
    readonly code = 6148;
    readonly name = "BuyerNotWhitelisted";
    readonly msg = "atomic_fill_from_relay: payload.buyer not in seller_cm whitelist (counterparty restriction active)";
    constructor(logs?: string[] | undefined);
}
export declare class BlockTradeNotionalTooSmall extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6149;
    readonly code = 6149;
    readonly name = "BlockTradeNotionalTooSmall";
    readonly msg = "finalize_rfq_auction / register_rfq_auction: block-trade flag set but notional below per-asset Rule 6.07 threshold";
    constructor(logs?: string[] | undefined);
}
export declare class PositionLimitExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6150;
    readonly code = 6150;
    readonly name = "PositionLimitExceeded";
    readonly msg = "calculate_margin / atomic_fill_from_relay: per-asset short-position USD limit exceeded (Rule 12.01)";
    constructor(logs?: string[] | undefined);
}
export declare class PositionLimitAssetInvalid extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6151;
    readonly code = 6151;
    readonly name = "PositionLimitAssetInvalid";
    readonly msg = "governance_set_position_limit: asset_idx out of range (valid 0..=4 BTC/ETH/SOL/XRP/HYPE)";
    constructor(logs?: string[] | undefined);
}
export declare class CmAccountSizeUnexpected extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6152;
    readonly code = 6152;
    readonly name = "CmAccountSizeUnexpected";
    readonly msg = "cm_realloc_v2: existing account data length is neither the pre-W2 144 B layout nor the post-W2 1176 B layout \u2014 refusing to migrate (corrupted account or wrong account passed)";
    constructor(logs?: string[] | undefined);
}
export declare class MakerRateLimitExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6153;
    readonly code = 6153;
    readonly name = "MakerRateLimitExceeded";
    readonly msg = "submit_rfq_quote: Maker exceeded MAKER_RATE_LIMIT_MSG_PER_SLOT (100) quote-update messages within the current Solana slot (Rule 5.12 / MiFID II RTS 6 throttle)";
    constructor(logs?: string[] | undefined);
}
export declare class AuctionInsufficientMakers extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6154;
    readonly code = 6154;
    readonly name = "AuctionInsufficientMakers";
    readonly msg = "register_rfq_auction: block-trade / auction-lane RFQ broadcast must reach >= AUCTION_MIN_MAKERS (3) eligible Makers under separate beneficial ownership (Rule 5.21 / CFTC SEF Part 37 RFQ-3)";
    constructor(logs?: string[] | undefined);
}
export declare class CompressionInvariantBroken extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6155;
    readonly code = 6155;
    readonly name = "CompressionInvariantBroken";
    readonly msg = "compress_positions: Net-P/L invariant broken (sum of v0 \u00D7 signed_qty before != after). Caller passed unmatched series, miscounted qty, or zero-qty leg (Rule 6.08 / HKEX OTC Clear compression cycle)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryThresholdNotMet extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6156;
    readonly code = 6156;
    readonly name = "RecoveryThresholdNotMet";
    readonly msg = "recovery_declare_trigger: VaultDrain arm \u2014 aggregate IF + protocol-fee balance not below RECOVERY_TRIGGER_USDC_MICRO (Rule 11A.01(i) T\u1D49 = USDC 5,000,000)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryCommitteeQuorumMissing extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6157;
    readonly code = 6157;
    readonly name = "RecoveryCommitteeQuorumMissing";
    readonly msg = "recovery_declare_trigger: CommitteeDetermination arm \u2014 Methodology Committee quorum invariant not satisfied (Rule 10.13 floor: \u22653 members, \u22651 independent)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryNotActive extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6158;
    readonly code = 6158;
    readonly name = "RecoveryNotActive";
    readonly msg = "recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: no active recovery cycle (call recovery_declare_trigger first)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoverySnapshotAlreadyPublished extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6159;
    readonly code = 6159;
    readonly name = "RecoverySnapshotAlreadyPublished";
    readonly msg = "recovery_publish_snapshot: snapshot already published for the active recovery cycle (Rule 11A.02 once-per-cycle)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoverySnapshotDeadlineExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6160;
    readonly code = 6160;
    readonly name = "RecoverySnapshotDeadlineExceeded";
    readonly msg = "recovery_publish_snapshot: more than one (1) Solana epoch elapsed since recovery_declare_trigger (Rule 11A.02 publication deadline)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryPauseNotActive extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6161;
    readonly code = 6161;
    readonly name = "RecoveryPauseNotActive";
    readonly msg = "recovery_publish_snapshot: emergency_pause is not active (Rule 11A.02 requires emergency_pause to be invoked alongside the snapshot)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoverySnapshotMissing extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6162;
    readonly code = 6162;
    readonly name = "RecoverySnapshotMissing";
    readonly msg = "recovery_apply_vmgh / recovery_partial_tear_up: snapshot not yet published (Rule 11A.02 ordering \u2014 snapshot must precede recovery tools)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryVmghCapExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6163;
    readonly code = 6163;
    readonly name = "RecoveryVmghCapExceeded";
    readonly msg = "recovery_apply_vmgh: haircut_bps must be in (0, VMGH_HAIRCUT_CAP_BPS = 5_000] (Rule 11A.03(i) 50% cap)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryTearUpCapExceeded extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6164;
    readonly code = 6164;
    readonly name = "RecoveryTearUpCapExceeded";
    readonly msg = "recovery_partial_tear_up: tear_up_bps must be in (0, TEAR_UP_PER_CYCLE_CAP_BPS = 2_500] (Rule 11A.03(ii) 25% per-cycle cap)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryProtocolFeeMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6165;
    readonly code = 6165;
    readonly name = "RecoveryProtocolFeeMismatch";
    readonly msg = "recovery_declare_trigger: caller-supplied protocol_fee_balance_micro does not match on-chain sum of fee_accumulator PDAs threaded as remaining_accounts (IOSCO RRP 2017 \u00A73.4 \u2014 trigger inputs must be verifiable, objective)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryTearUpCycleLimitReached extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6166;
    readonly code = 6166;
    readonly name = "RecoveryTearUpCycleLimitReached";
    readonly msg = "recovery_partial_tear_up: cycle already used its tear-up. PROTOCOL.md \u00A711A.03(ii) caps tear-up at 25% in a SINGLE tear-up cycle (singular). If the first tear-up is insufficient to restore solvency, escalate to \u00A711A.04 resolution boundary (full wind-down) \u2014 do not iterate 'partial' calls. MAX_TEAR_UPS_PER_CYCLE = 1.";
    constructor(logs?: string[] | undefined);
}
export declare class DigestReplayed extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6167;
    readonly code = 6167;
    readonly name = "DigestReplayed";
    readonly msg = "recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: incoming digest equals the last accepted digest in this active cycle \u2014 replay rejected (F-RECOV-2). Submit a fresh off-chain snapshot or escalate to a new cycle.";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryDeterminationMissing extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6168;
    readonly code = 6168;
    readonly name = "RecoveryDeterminationMissing";
    readonly msg = "recovery_declare_trigger: CommitteeDetermination arm \u2014 RecoveryDeterminationPda missing or not in Executed status (F-RECOV-3 / IOSCO RRP 2017 \u00A73.4 verifiable input). Propose + queue + execute via propose_recovery_determination \u2192 execute_recovery_determination first.";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryDeterminationStale extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6169;
    readonly code = 6169;
    readonly name = "RecoveryDeterminationStale";
    readonly msg = "recovery_declare_trigger: CommitteeDetermination arm \u2014 RecoveryDeterminationPda was executed more than RECOVERY_DETERMINATION_VALID_WINDOW_SLOTS (\u224824h) ago. Stale determinations are rejected \u2014 re-propose to refresh the on-chain governance attestation (F-RECOV-3).";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryDeterminationKindMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6170;
    readonly code = 6170;
    readonly name = "RecoveryDeterminationKindMismatch";
    readonly msg = "recovery_declare_trigger: CommitteeDetermination arm \u2014 RecoveryDeterminationPda.trigger_kind does not match the trigger_kind argument passed to recovery_declare_trigger (F-RECOV-3 cross-binding).";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryDrainedVaultMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6171;
    readonly code = 6171;
    readonly name = "RecoveryDrainedVaultMismatch";
    readonly msg = "recovery_apply_vmgh: drained_vault token account is not owned by the SPL Token program, has the wrong mint, or its address does not derive from [RECOVERY_DRAINED_VAULT_SEED, mint] under this program (F-RECOV-4 SPL mutation invariant)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryVmghMintMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6172;
    readonly code = 6172;
    readonly name = "RecoveryVmghMintMismatch";
    readonly msg = "recovery_apply_vmgh: fee_accumulator + drained_vault mints differ \u2014 VMGH drain must move USDC into a same-mint treasury PDA (F-RECOV-4)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryTearUpCmMismatch extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6173;
    readonly code = 6173;
    readonly name = "RecoveryTearUpCmMismatch";
    readonly msg = "recovery_partial_tear_up: ClearingMemberAccount threaded through remaining_accounts is not owned by skew-master program, has the wrong discriminator, or its PDA address does not derive from [CM_SEED, authority] (F-RECOV-4 option-balance mutation invariant)";
    constructor(logs?: string[] | undefined);
}
export declare class RecoveryTearUpEmptyScope extends Error {
    readonly logs?: string[] | undefined;
    static readonly code = 6174;
    readonly code = 6174;
    readonly name = "RecoveryTearUpEmptyScope";
    readonly msg = "recovery_partial_tear_up: at least one ClearingMemberAccount must be threaded through remaining_accounts \u2014 caller passed an empty scope. The \u00A711A.03(ii) tear-up is a deterministic on-chain instruction; an empty scope would be a no-op masquerading as a tear-up.";
    constructor(logs?: string[] | undefined);
}
export declare function fromCode(code: number, logs?: string[]): CustomError | null;
//# sourceMappingURL=custom.d.ts.map