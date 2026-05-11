"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmUnderLiquidation = exports.CmInsufficientCollateral = exports.UnsupportedAsset = exports.ConcentrationCapExceeded = exports.IFTierExhausted = exports.CMNotRegistered = exports.GammaFreezeActive = exports.SigmaOutOfBand = exports.MoneynessOutOfBand = exports.NotionalOutOfBand = exports.WithdrawalCeilingExceeded = exports.WithdrawalTooFast = exports.TimelockNotElapsed = exports.SignatureTooOld = exports.ThresholdNotMet = exports.InsolvencyCascade = exports.InvalidPositionAccount = exports.InsufficientMargin = exports.InvalidSigmaIv = exports.PayoffExceedsLimit = exports.OptionIsITM = exports.MaxPositionsExceeded = exports.NotPrimeAccount = exports.Unauthorized = exports.SettleWindowStillOpen = exports.SettleNormalWindowExpired = exports.OptionNotCancellable = exports.SettleWindowExpired = exports.GracePeriodNotElapsed = exports.NotCurrentHolder = exports.HolderMismatch = exports.InvalidHolderAta = exports.PremiumExceedsMax = exports.CloseNotYetEligible = exports.RangeUpperBoundInvalid = exports.RfqSpecMismatch = exports.RfqNotOpen = exports.InvalidPayoffAddress = exports.PythConfidence = exports.PythPriceStale = exports.PythFeedInvalid = exports.PremiumZero = exports.UnsupportedOptionType = exports.InvalidSettlementMint = exports.CollateralMismatch = exports.InvalidState = exports.PayoffZero = exports.StrikeZero = exports.ExpiryTooFar = exports.ExpiryTooSoon = void 0;
exports.OcoLinkMismatch = exports.ConditionalSlippageRejected = exports.ConditionalOrderExpired = exports.ConditionalGraceNotElapsed = exports.ConditionalTriggerNotMet = exports.ConditionalOrderNotActive = exports.OracleConfidenceTooWide = exports.HamiltonStateMissing = exports.MakerRebatePhaseOutOfRange = exports.BuilderFeesUnderflow = exports.BuilderLabelInvalid = exports.VolumeTrackerAuthorityMismatch = exports.MakerRebateInactive = exports.BuilderVolumeInsufficient = exports.UnsupportedTier = exports.TierChangeForbiddenInLiquidation = exports.TierLockupNotExpired = exports.InsufficientLockupCollateral = exports.TierMustDecrease = exports.TierMustIncrease = exports.A2Reserved12 = exports.A2Reserved11 = exports.SsviButterflyViolation = exports.ProtocolFallbackTooEarly = exports.AdlClawbackCapExceeded = exports.MultiVenueFallbackForbidden = exports.PythNotStaleEnough = exports.RatioNotRestored = exports.SelfLiquidationForbidden = exports.AuctionInvalidPrice = exports.AuctionNotOpen = exports.UnauthorizedRelayPayload = exports.TwapWindowEmpty = exports.SustainedBreachPending = exports.PartialCloseFactorExceeded = exports.DutchAuctionNotStarted = exports.CushionInterp = exports.ConfidenceTooHigh = exports.StaleOracle = exports.OracleDivergence = exports.A1Reserved5 = exports.A1Reserved4 = exports.A1Reserved3 = exports.A1Reserved2 = exports.A1Reserved1 = exports.WaterfallTierInvalid = exports.ProtocolSitgDrained = exports.BoundaryImViolation = exports.InvalidExtraParam = exports.InvalidDirection = void 0;
exports.BlockTradeNotionalTooSmall = exports.BuyerNotWhitelisted = exports.AxeRevoked = exports.AxeReservedBitsSet = exports.AxeInvalidValidUntil = exports.AxeInvalidBand = exports.RefreshQuoteNotOwnQuote = exports.TakeQuotePriceMoved = exports.TakeQuoteQuoteExpired = exports.TakeQuoteNoMatchingQuote = exports.TakeQuoteUnauthorized = exports.PmCacheModelMismatch = exports.PmCacheAuthorityMismatch = exports.PmCacheRegistryMismatch = exports.PmCacheStale = exports.PmCacheDirty = exports.InvalidTenorBucket = exports.InvalidMakerRiskMode = exports.MmpWindowExceeded = exports.MakerQuoteOff = exports.BuilderFeesOutstanding = exports.PositionRegistryFull = exports.PositionNotTracked = exports.PositionAlreadyTracked = exports.CollateralMintNotAllowed = exports.CollateralKindInvalid = exports.CollateralMintAlreadyRegistered = exports.NotionalTooSmall = exports.InvalidStrike = exports.ProposalAlreadyApproved = exports.ProposalAlreadyExecuted = exports.IncompletePositionAccounts = exports.BonusBelowExpected = exports.RfqMakerAlreadySlashed = exports.EmergencyNotExpired = exports.EmergencyNotActive = exports.EmergencyAlreadyActive = exports.LtvCapExceeded = exports.ReplenishCapExceeded = exports.ComboIntentV2Expired = exports.ComboLegAlreadyFilled = exports.ComboLegCountInvalid = exports.ComboLegIndexOutOfRange = exports.RfqQuoteSignatureInvalid = exports.RfqMakerDepositInsufficient = exports.RfqMakerNotRegistered = exports.RfqQuoteValidityShort = exports.RfqQuoteNotBetter = exports.RfqAuctionClosed = exports.RfqAuctionNotOpen = void 0;
exports.RecoveryTearUpEmptyScope = exports.RecoveryTearUpCmMismatch = exports.RecoveryVmghMintMismatch = exports.RecoveryDrainedVaultMismatch = exports.RecoveryDeterminationKindMismatch = exports.RecoveryDeterminationStale = exports.RecoveryDeterminationMissing = exports.DigestReplayed = exports.RecoveryTearUpCycleLimitReached = exports.RecoveryProtocolFeeMismatch = exports.RecoveryTearUpCapExceeded = exports.RecoveryVmghCapExceeded = exports.RecoverySnapshotMissing = exports.RecoveryPauseNotActive = exports.RecoverySnapshotDeadlineExceeded = exports.RecoverySnapshotAlreadyPublished = exports.RecoveryNotActive = exports.RecoveryCommitteeQuorumMissing = exports.RecoveryThresholdNotMet = exports.CompressionInvariantBroken = exports.AuctionInsufficientMakers = exports.MakerRateLimitExceeded = exports.CmAccountSizeUnexpected = exports.PositionLimitAssetInvalid = exports.PositionLimitExceeded = void 0;
exports.fromCode = fromCode;
class ExpiryTooSoon extends Error {
    constructor(logs) {
        super("6000: Expiry must be at least 300s in the future");
        this.logs = logs;
        this.code = 6000;
        this.name = "ExpiryTooSoon";
        this.msg = "Expiry must be at least 300s in the future";
    }
}
exports.ExpiryTooSoon = ExpiryTooSoon;
ExpiryTooSoon.code = 6000;
class ExpiryTooFar extends Error {
    constructor(logs) {
        super("6001: Expiry exceeds maximum horizon of 1 year");
        this.logs = logs;
        this.code = 6001;
        this.name = "ExpiryTooFar";
        this.msg = "Expiry exceeds maximum horizon of 1 year";
    }
}
exports.ExpiryTooFar = ExpiryTooFar;
ExpiryTooFar.code = 6001;
class StrikeZero extends Error {
    constructor(logs) {
        super("6002: Strike must be non-zero");
        this.logs = logs;
        this.code = 6002;
        this.name = "StrikeZero";
        this.msg = "Strike must be non-zero";
    }
}
exports.StrikeZero = StrikeZero;
StrikeZero.code = 6002;
class PayoffZero extends Error {
    constructor(logs) {
        super("6003: Payoff amount must be non-zero");
        this.logs = logs;
        this.code = 6003;
        this.name = "PayoffZero";
        this.msg = "Payoff amount must be non-zero";
    }
}
exports.PayoffZero = PayoffZero;
PayoffZero.code = 6003;
class InvalidState extends Error {
    constructor(logs) {
        super("6004: Option is not in the expected state for this instruction");
        this.logs = logs;
        this.code = 6004;
        this.name = "InvalidState";
        this.msg = "Option is not in the expected state for this instruction";
    }
}
exports.InvalidState = InvalidState;
InvalidState.code = 6004;
class CollateralMismatch extends Error {
    constructor(logs) {
        super("6005: Collateral deposit amount does not match required collateral");
        this.logs = logs;
        this.code = 6005;
        this.name = "CollateralMismatch";
        this.msg = "Collateral deposit amount does not match required collateral";
    }
}
exports.CollateralMismatch = CollateralMismatch;
CollateralMismatch.code = 6005;
class InvalidSettlementMint extends Error {
    constructor(logs) {
        super("6006: Settlement mint must be a valid SPL Token mint");
        this.logs = logs;
        this.code = 6006;
        this.name = "InvalidSettlementMint";
        this.msg = "Settlement mint must be a valid SPL Token mint";
    }
}
exports.InvalidSettlementMint = InvalidSettlementMint;
InvalidSettlementMint.code = 6006;
class UnsupportedOptionType extends Error {
    constructor(logs) {
        super("6007: Option type not supported in current program version");
        this.logs = logs;
        this.code = 6007;
        this.name = "UnsupportedOptionType";
        this.msg = "Option type not supported in current program version";
    }
}
exports.UnsupportedOptionType = UnsupportedOptionType;
UnsupportedOptionType.code = 6007;
class PremiumZero extends Error {
    constructor(logs) {
        super("6008: Premium must be non-zero");
        this.logs = logs;
        this.code = 6008;
        this.name = "PremiumZero";
        this.msg = "Premium must be non-zero";
    }
}
exports.PremiumZero = PremiumZero;
PremiumZero.code = 6008;
class PythFeedInvalid extends Error {
    constructor(logs) {
        super("6009: Pyth price account does not match the option's underlying feed");
        this.logs = logs;
        this.code = 6009;
        this.name = "PythFeedInvalid";
        this.msg = "Pyth price account does not match the option's underlying feed";
    }
}
exports.PythFeedInvalid = PythFeedInvalid;
PythFeedInvalid.code = 6009;
class PythPriceStale extends Error {
    constructor(logs) {
        super("6010: Pyth price is stale (publish_time older than 300s)");
        this.logs = logs;
        this.code = 6010;
        this.name = "PythPriceStale";
        this.msg = "Pyth price is stale (publish_time older than 300s)";
    }
}
exports.PythPriceStale = PythPriceStale;
PythPriceStale.code = 6010;
class PythConfidence extends Error {
    constructor(logs) {
        super("6011: Pyth confidence interval too wide (conf/price >= 10%)");
        this.logs = logs;
        this.code = 6011;
        this.name = "PythConfidence";
        this.msg = "Pyth confidence interval too wide (conf/price >= 10%)";
    }
}
exports.PythConfidence = PythConfidence;
PythConfidence.code = 6011;
class InvalidPayoffAddress extends Error {
    constructor(logs) {
        super("6012: Payoff token account owner does not match expected recipient");
        this.logs = logs;
        this.code = 6012;
        this.name = "InvalidPayoffAddress";
        this.msg = "Payoff token account owner does not match expected recipient";
    }
}
exports.InvalidPayoffAddress = InvalidPayoffAddress;
InvalidPayoffAddress.code = 6012;
class RfqNotOpen extends Error {
    constructor(logs) {
        super("6013: RFQ is not in Open state");
        this.logs = logs;
        this.code = 6013;
        this.name = "RfqNotOpen";
        this.msg = "RFQ is not in Open state";
    }
}
exports.RfqNotOpen = RfqNotOpen;
RfqNotOpen.code = 6013;
class RfqSpecMismatch extends Error {
    constructor(logs) {
        super("6014: Option spec does not match RFQ parameters");
        this.logs = logs;
        this.code = 6014;
        this.name = "RfqSpecMismatch";
        this.msg = "Option spec does not match RFQ parameters";
    }
}
exports.RfqSpecMismatch = RfqSpecMismatch;
RfqSpecMismatch.code = 6014;
class RangeUpperBoundInvalid extends Error {
    constructor(logs) {
        super("6015: upper_bound must be strictly greater than strike for range-type options");
        this.logs = logs;
        this.code = 6015;
        this.name = "RangeUpperBoundInvalid";
        this.msg = "upper_bound must be strictly greater than strike for range-type options";
    }
}
exports.RangeUpperBoundInvalid = RangeUpperBoundInvalid;
RangeUpperBoundInvalid.code = 6015;
class CloseNotYetEligible extends Error {
    constructor(logs) {
        super("6016: Option expiry + 1 day has not yet passed; close not eligible");
        this.logs = logs;
        this.code = 6016;
        this.name = "CloseNotYetEligible";
        this.msg = "Option expiry + 1 day has not yet passed; close not eligible";
    }
}
exports.CloseNotYetEligible = CloseNotYetEligible;
CloseNotYetEligible.code = 6016;
class PremiumExceedsMax extends Error {
    constructor(logs) {
        super("6017: Premium offered by underwriter exceeds buyer's max_premium");
        this.logs = logs;
        this.code = 6017;
        this.name = "PremiumExceedsMax";
        this.msg = "Premium offered by underwriter exceeds buyer's max_premium";
    }
}
exports.PremiumExceedsMax = PremiumExceedsMax;
PremiumExceedsMax.code = 6017;
class InvalidHolderAta extends Error {
    constructor(logs) {
        super("6018: current_holder_option_ata mint does not match option_token_mint");
        this.logs = logs;
        this.code = 6018;
        this.name = "InvalidHolderAta";
        this.msg = "current_holder_option_ata mint does not match option_token_mint";
    }
}
exports.InvalidHolderAta = InvalidHolderAta;
InvalidHolderAta.code = 6018;
class HolderMismatch extends Error {
    constructor(logs) {
        super("6019: current_holder_option_ata owner does not match payoff_token_account owner");
        this.logs = logs;
        this.code = 6019;
        this.name = "HolderMismatch";
        this.msg = "current_holder_option_ata owner does not match payoff_token_account owner";
    }
}
exports.HolderMismatch = HolderMismatch;
HolderMismatch.code = 6019;
class NotCurrentHolder extends Error {
    constructor(logs) {
        super("6020: current_holder_option_ata does not hold exactly 1 option token");
        this.logs = logs;
        this.code = 6020;
        this.name = "NotCurrentHolder";
        this.msg = "current_holder_option_ata does not hold exactly 1 option token";
    }
}
exports.NotCurrentHolder = NotCurrentHolder;
NotCurrentHolder.code = 6020;
class GracePeriodNotElapsed extends Error {
    constructor(logs) {
        super("6021: Grace period (72h) has not elapsed; call expire_abandoned after expiry + 72h");
        this.logs = logs;
        this.code = 6021;
        this.name = "GracePeriodNotElapsed";
        this.msg = "Grace period (72h) has not elapsed; call expire_abandoned after expiry + 72h";
    }
}
exports.GracePeriodNotElapsed = GracePeriodNotElapsed;
GracePeriodNotElapsed.code = 6021;
class SettleWindowExpired extends Error {
    constructor(logs) {
        super("6022: Settle window (72h past expiry) has closed; use expire_abandoned instead");
        this.logs = logs;
        this.code = 6022;
        this.name = "SettleWindowExpired";
        this.msg = "Settle window (72h past expiry) has closed; use expire_abandoned instead";
    }
}
exports.SettleWindowExpired = SettleWindowExpired;
SettleWindowExpired.code = 6022;
class OptionNotCancellable extends Error {
    constructor(logs) {
        super("6023: Option can only be cancelled in Created or Funded state");
        this.logs = logs;
        this.code = 6023;
        this.name = "OptionNotCancellable";
        this.msg = "Option can only be cancelled in Created or Funded state";
    }
}
exports.OptionNotCancellable = OptionNotCancellable;
OptionNotCancellable.code = 6023;
class SettleNormalWindowExpired extends Error {
    constructor(logs) {
        super("6024: Settle 30-min normal window has passed; call mark_disputed instead");
        this.logs = logs;
        this.code = 6024;
        this.name = "SettleNormalWindowExpired";
        this.msg = "Settle 30-min normal window has passed; call mark_disputed instead";
    }
}
exports.SettleNormalWindowExpired = SettleNormalWindowExpired;
SettleNormalWindowExpired.code = 6024;
class SettleWindowStillOpen extends Error {
    constructor(logs) {
        super("6025: Option is not yet past the 30-min normal settle window");
        this.logs = logs;
        this.code = 6025;
        this.name = "SettleWindowStillOpen";
        this.msg = "Option is not yet past the 30-min normal settle window";
    }
}
exports.SettleWindowStillOpen = SettleWindowStillOpen;
SettleWindowStillOpen.code = 6025;
class Unauthorized extends Error {
    constructor(logs) {
        super("6026: Caller is not the SKEW_AUTHORITY");
        this.logs = logs;
        this.code = 6026;
        this.name = "Unauthorized";
        this.msg = "Caller is not the SKEW_AUTHORITY";
    }
}
exports.Unauthorized = Unauthorized;
Unauthorized.code = 6026;
class NotPrimeAccount extends Error {
    constructor(logs) {
        super("6027: Caller does not have an approved Prime Account (deprecated — see CMNotRegistered)");
        this.logs = logs;
        this.code = 6027;
        this.name = "NotPrimeAccount";
        this.msg = "Caller does not have an approved Prime Account (deprecated — see CMNotRegistered)";
    }
}
exports.NotPrimeAccount = NotPrimeAccount;
NotPrimeAccount.code = 6027;
class MaxPositionsExceeded extends Error {
    constructor(logs) {
        super("6028: Prime Account position limit reached (deprecated)");
        this.logs = logs;
        this.code = 6028;
        this.name = "MaxPositionsExceeded";
        this.msg = "Prime Account position limit reached (deprecated)";
    }
}
exports.MaxPositionsExceeded = MaxPositionsExceeded;
MaxPositionsExceeded.code = 6028;
class OptionIsITM extends Error {
    constructor(logs) {
        super("6029: Option is in-the-money; call settle first before rolling over");
        this.logs = logs;
        this.code = 6029;
        this.name = "OptionIsITM";
        this.msg = "Option is in-the-money; call settle first before rolling over";
    }
}
exports.OptionIsITM = OptionIsITM;
OptionIsITM.code = 6029;
class PayoffExceedsLimit extends Error {
    constructor(logs) {
        super("6030: payoff_amount exceeds per-maturity limit (Tier 1: 10,000 USDC)");
        this.logs = logs;
        this.code = 6030;
        this.name = "PayoffExceedsLimit";
        this.msg = "payoff_amount exceeds per-maturity limit (Tier 1: 10,000 USDC)";
    }
}
exports.PayoffExceedsLimit = PayoffExceedsLimit;
PayoffExceedsLimit.code = 6030;
class InvalidSigmaIv extends Error {
    constructor(logs) {
        super("6031: sigma_iv value out of valid range (must be 0.01 < σ_IV < 5.0)");
        this.logs = logs;
        this.code = 6031;
        this.name = "InvalidSigmaIv";
        this.msg = "sigma_iv value out of valid range (must be 0.01 < σ_IV < 5.0)";
    }
}
exports.InvalidSigmaIv = InvalidSigmaIv;
InvalidSigmaIv.code = 6031;
class InsufficientMargin extends Error {
    constructor(logs) {
        super("6032: Portfolio margin ratio below minimum (margin_ratio < 1.10); add collateral");
        this.logs = logs;
        this.code = 6032;
        this.name = "InsufficientMargin";
        this.msg = "Portfolio margin ratio below minimum (margin_ratio < 1.10); add collateral";
    }
}
exports.InsufficientMargin = InsufficientMargin;
InsufficientMargin.code = 6032;
class InvalidPositionAccount extends Error {
    constructor(logs) {
        super("6033: PositionAccount parameters invalid (deprecated in v4)");
        this.logs = logs;
        this.code = 6033;
        this.name = "InvalidPositionAccount";
        this.msg = "PositionAccount parameters invalid (deprecated in v4)";
    }
}
exports.InvalidPositionAccount = InvalidPositionAccount;
InvalidPositionAccount.code = 6033;
class InsolvencyCascade extends Error {
    constructor(logs) {
        super("6034: Liquidation would drive CM equity below zero (Bug #17 insolvency cascade guard)");
        this.logs = logs;
        this.code = 6034;
        this.name = "InsolvencyCascade";
        this.msg = "Liquidation would drive CM equity below zero (Bug #17 insolvency cascade guard)";
    }
}
exports.InsolvencyCascade = InsolvencyCascade;
InsolvencyCascade.code = 6034;
class ThresholdNotMet extends Error {
    constructor(logs) {
        super("6035: Governance signatures below GOVERNANCE_MULTISIG_THRESHOLD (3 of 5)");
        this.logs = logs;
        this.code = 6035;
        this.name = "ThresholdNotMet";
        this.msg = "Governance signatures below GOVERNANCE_MULTISIG_THRESHOLD (3 of 5)";
    }
}
exports.ThresholdNotMet = ThresholdNotMet;
ThresholdNotMet.code = 6035;
class SignatureTooOld extends Error {
    constructor(logs) {
        super("6036: Admin signature older than SIG_MAX_AGE_SECS (1h) Drift-style replay defense");
        this.logs = logs;
        this.code = 6036;
        this.name = "SignatureTooOld";
        this.msg = "Admin signature older than SIG_MAX_AGE_SECS (1h) Drift-style replay defense";
    }
}
exports.SignatureTooOld = SignatureTooOld;
SignatureTooOld.code = 6036;
class TimelockNotElapsed extends Error {
    constructor(logs) {
        super("6037: Admin action timelock has not elapsed (TIMELOCK_24H_SLOTS)");
        this.logs = logs;
        this.code = 6037;
        this.name = "TimelockNotElapsed";
        this.msg = "Admin action timelock has not elapsed (TIMELOCK_24H_SLOTS)";
    }
}
exports.TimelockNotElapsed = TimelockNotElapsed;
TimelockNotElapsed.code = 6037;
class WithdrawalTooFast extends Error {
    constructor(logs) {
        super("6038: Withdrawal exceeds 10× normal-flow rate-limit");
        this.logs = logs;
        this.code = 6038;
        this.name = "WithdrawalTooFast";
        this.msg = "Withdrawal exceeds 10× normal-flow rate-limit";
    }
}
exports.WithdrawalTooFast = WithdrawalTooFast;
WithdrawalTooFast.code = 6038;
class WithdrawalCeilingExceeded extends Error {
    constructor(logs) {
        super("6039: Withdrawal exceeds hard ceiling = WITHDRAWAL_TVL_CEILING_BPS of TVL");
        this.logs = logs;
        this.code = 6039;
        this.name = "WithdrawalCeilingExceeded";
        this.msg = "Withdrawal exceeds hard ceiling = WITHDRAWAL_TVL_CEILING_BPS of TVL";
    }
}
exports.WithdrawalCeilingExceeded = WithdrawalCeilingExceeded;
WithdrawalCeilingExceeded.code = 6039;
class NotionalOutOfBand extends Error {
    constructor(logs) {
        super("6040: Notional outside [$10, $10M] band (NOTIONAL_MIN/MAX_USDC_MICRO)");
        this.logs = logs;
        this.code = 6040;
        this.name = "NotionalOutOfBand";
        this.msg = "Notional outside [$10, $10M] band (NOTIONAL_MIN/MAX_USDC_MICRO)";
    }
}
exports.NotionalOutOfBand = NotionalOutOfBand;
NotionalOutOfBand.code = 6040;
class MoneynessOutOfBand extends Error {
    constructor(logs) {
        super("6041: Moneyness K/S outside [0.5, 2.0] band (MONEYNESS_MIN/MAX_BPS)");
        this.logs = logs;
        this.code = 6041;
        this.name = "MoneynessOutOfBand";
        this.msg = "Moneyness K/S outside [0.5, 2.0] band (MONEYNESS_MIN/MAX_BPS)";
    }
}
exports.MoneynessOutOfBand = MoneynessOutOfBand;
MoneynessOutOfBand.code = 6041;
class SigmaOutOfBand extends Error {
    constructor(logs) {
        super("6042: Volatility σ outside [0.10, 3.00] band (SIGMA_MIN/MAX)");
        this.logs = logs;
        this.code = 6042;
        this.name = "SigmaOutOfBand";
        this.msg = "Volatility σ outside [0.10, 3.00] band (SIGMA_MIN/MAX)";
    }
}
exports.SigmaOutOfBand = SigmaOutOfBand;
SigmaOutOfBand.code = 6042;
class GammaFreezeActive extends Error {
    constructor(logs) {
        super("6043: Gamma freeze active — expiry must be at least 60 min in the future");
        this.logs = logs;
        this.code = 6043;
        this.name = "GammaFreezeActive";
        this.msg = "Gamma freeze active — expiry must be at least 60 min in the future";
    }
}
exports.GammaFreezeActive = GammaFreezeActive;
GammaFreezeActive.code = 6043;
class CMNotRegistered extends Error {
    constructor(logs) {
        super("6044: Caller is not a registered Clearing Member (register_clearing_member first)");
        this.logs = logs;
        this.code = 6044;
        this.name = "CMNotRegistered";
        this.msg = "Caller is not a registered Clearing Member (register_clearing_member first)";
    }
}
exports.CMNotRegistered = CMNotRegistered;
CMNotRegistered.code = 6044;
class IFTierExhausted extends Error {
    constructor(logs) {
        super("6045: Insurance Fund tier exhausted; waterfall cascades to next tier");
        this.logs = logs;
        this.code = 6045;
        this.name = "IFTierExhausted";
        this.msg = "Insurance Fund tier exhausted; waterfall cascades to next tier";
    }
}
exports.IFTierExhausted = IFTierExhausted;
IFTierExhausted.code = 6045;
class ConcentrationCapExceeded extends Error {
    constructor(logs) {
        super("6046: CM notional exceeds MAX_CONCENTRATION_PER_CM_BPS (3% of protocol OI)");
        this.logs = logs;
        this.code = 6046;
        this.name = "ConcentrationCapExceeded";
        this.msg = "CM notional exceeds MAX_CONCENTRATION_PER_CM_BPS (3% of protocol OI)";
    }
}
exports.ConcentrationCapExceeded = ConcentrationCapExceeded;
ConcentrationCapExceeded.code = 6046;
class UnsupportedAsset extends Error {
    constructor(logs) {
        super("6047: Asset not in launch panel allowlist (V3: BTC/ETH/SOL/XRP/HYPE; V2: BTC/ETH/SOL/JUP/BONK/WIF)");
        this.logs = logs;
        this.code = 6047;
        this.name = "UnsupportedAsset";
        this.msg = "Asset not in launch panel allowlist (V3: BTC/ETH/SOL/XRP/HYPE; V2: BTC/ETH/SOL/JUP/BONK/WIF)";
    }
}
exports.UnsupportedAsset = UnsupportedAsset;
UnsupportedAsset.code = 6047;
class CmInsufficientCollateral extends Error {
    constructor(logs) {
        super("6048: CM free collateral below requested withdrawal");
        this.logs = logs;
        this.code = 6048;
        this.name = "CmInsufficientCollateral";
        this.msg = "CM free collateral below requested withdrawal";
    }
}
exports.CmInsufficientCollateral = CmInsufficientCollateral;
CmInsufficientCollateral.code = 6048;
class CmUnderLiquidation extends Error {
    constructor(logs) {
        super("6049: CM is flagged under_liquidation; new position opens are locked");
        this.logs = logs;
        this.code = 6049;
        this.name = "CmUnderLiquidation";
        this.msg = "CM is flagged under_liquidation; new position opens are locked";
    }
}
exports.CmUnderLiquidation = CmUnderLiquidation;
CmUnderLiquidation.code = 6049;
class InvalidDirection extends Error {
    constructor(logs) {
        super("6050: OptionAccount direction field invalid for this OptionType");
        this.logs = logs;
        this.code = 6050;
        this.name = "InvalidDirection";
        this.msg = "OptionAccount direction field invalid for this OptionType";
    }
}
exports.InvalidDirection = InvalidDirection;
InvalidDirection.code = 6050;
class InvalidExtraParam extends Error {
    constructor(logs) {
        super("6051: OptionAccount extra_param invalid for this OptionType");
        this.logs = logs;
        this.code = 6051;
        this.name = "InvalidExtraParam";
        this.msg = "OptionAccount extra_param invalid for this OptionType";
    }
}
exports.InvalidExtraParam = InvalidExtraParam;
InvalidExtraParam.code = 6051;
class BoundaryImViolation extends Error {
    constructor(logs) {
        super("6052: Boundary-Aware IM violation — max(IM_scenario, M − V_0) not satisfied");
        this.logs = logs;
        this.code = 6052;
        this.name = "BoundaryImViolation";
        this.msg = "Boundary-Aware IM violation — max(IM_scenario, M − V_0) not satisfied";
    }
}
exports.BoundaryImViolation = BoundaryImViolation;
BoundaryImViolation.code = 6052;
class ProtocolSitgDrained extends Error {
    constructor(logs) {
        super("6053: Insurance Fund tier-3 (Protocol SITG) drained;required");
        this.logs = logs;
        this.code = 6053;
        this.name = "ProtocolSitgDrained";
        this.msg = "Insurance Fund tier-3 (Protocol SITG) drained;required";
    }
}
exports.ProtocolSitgDrained = ProtocolSitgDrained;
ProtocolSitgDrained.code = 6053;
class WaterfallTierInvalid extends Error {
    constructor(logs) {
        super("6054: Waterfall tier index out of range (valid 1..=5)");
        this.logs = logs;
        this.code = 6054;
        this.name = "WaterfallTierInvalid";
        this.msg = "Waterfall tier index out of range (valid 1..=5)";
    }
}
exports.WaterfallTierInvalid = WaterfallTierInvalid;
WaterfallTierInvalid.code = 6054;
class A1Reserved1 extends Error {
    constructor(logs) {
        super("6055: Signature too old (governance §15.5 drift defense, 1h max)");
        this.logs = logs;
        this.code = 6055;
        this.name = "A1Reserved1";
        this.msg = "Signature too old (governance §15.5 drift defense, 1h max)";
    }
}
exports.A1Reserved1 = A1Reserved1;
A1Reserved1.code = 6055;
class A1Reserved2 extends Error {
    constructor(logs) {
        super("6056: Protocol paused; only PauseProtocol / UnpauseProtocol may be queued");
        this.logs = logs;
        this.code = 6056;
        this.name = "A1Reserved2";
        this.msg = "Protocol paused; only PauseProtocol / UnpauseProtocol may be queued";
    }
}
exports.A1Reserved2 = A1Reserved2;
A1Reserved2.code = 6056;
class A1Reserved3 extends Error {
    constructor(logs) {
        super("6057: Timelock not yet elapsed (governance §15.4 24h)");
        this.logs = logs;
        this.code = 6057;
        this.name = "A1Reserved3";
        this.msg = "Timelock not yet elapsed (governance §15.4 24h)";
    }
}
exports.A1Reserved3 = A1Reserved3;
A1Reserved3.code = 6057;
class A1Reserved4 extends Error {
    constructor(logs) {
        super("6058: Multisig threshold not met (3-of-5 default)");
        this.logs = logs;
        this.code = 6058;
        this.name = "A1Reserved4";
        this.msg = "Multisig threshold not met (3-of-5 default)";
    }
}
exports.A1Reserved4 = A1Reserved4;
A1Reserved4.code = 6058;
class A1Reserved5 extends Error {
    constructor(logs) {
        super("6059: Proposal already executed; once-only semantics (governance §15.3)");
        this.logs = logs;
        this.code = 6059;
        this.name = "A1Reserved5";
        this.msg = "Proposal already executed; once-only semantics (governance §15.3)";
    }
}
exports.A1Reserved5 = A1Reserved5;
A1Reserved5.code = 6059;
class OracleDivergence extends Error {
    constructor(logs) {
        super("6060: Pyth vs Switchboard oracle divergence exceeds 5% (OracleDivergence)");
        this.logs = logs;
        this.code = 6060;
        this.name = "OracleDivergence";
        this.msg = "Pyth vs Switchboard oracle divergence exceeds 5% (OracleDivergence)";
    }
}
exports.OracleDivergence = OracleDivergence;
OracleDivergence.code = 6060;
class StaleOracle extends Error {
    constructor(logs) {
        super("6061: Oracle price sample older than ORACLE_STALENESS_SECS (60s mainnet)");
        this.logs = logs;
        this.code = 6061;
        this.name = "StaleOracle";
        this.msg = "Oracle price sample older than ORACLE_STALENESS_SECS (60s mainnet)";
    }
}
exports.StaleOracle = StaleOracle;
StaleOracle.code = 6061;
class ConfidenceTooHigh extends Error {
    constructor(logs) {
        super("6062: Pyth confidence/price ratio exceeds ORACLE_CONFIDENCE_BPS (5%)");
        this.logs = logs;
        this.code = 6062;
        this.name = "ConfidenceTooHigh";
        this.msg = "Pyth confidence/price ratio exceeds ORACLE_CONFIDENCE_BPS (5%)";
    }
}
exports.ConfidenceTooHigh = ConfidenceTooHigh;
ConfidenceTooHigh.code = 6062;
class CushionInterp extends Error {
    constructor(logs) {
        super("6063: Cushion-zone interpolation bounds invalid (internal; K-zone > K or zone > K)");
        this.logs = logs;
        this.code = 6063;
        this.name = "CushionInterp";
        this.msg = "Cushion-zone interpolation bounds invalid (internal; K-zone > K or zone > K)";
    }
}
exports.CushionInterp = CushionInterp;
CushionInterp.code = 6063;
class DutchAuctionNotStarted extends Error {
    constructor(logs) {
        super("6064: Dutch auction has not started yet (liq_start_ts > now)");
        this.logs = logs;
        this.code = 6064;
        this.name = "DutchAuctionNotStarted";
        this.msg = "Dutch auction has not started yet (liq_start_ts > now)";
    }
}
exports.DutchAuctionNotStarted = DutchAuctionNotStarted;
DutchAuctionNotStarted.code = 6064;
class PartialCloseFactorExceeded extends Error {
    constructor(logs) {
        super("6065: Partial close factor exceeds PARTIAL_CLOSE_MAX_BPS (50%)");
        this.logs = logs;
        this.code = 6065;
        this.name = "PartialCloseFactorExceeded";
        this.msg = "Partial close factor exceeds PARTIAL_CLOSE_MAX_BPS (50%)";
    }
}
exports.PartialCloseFactorExceeded = PartialCloseFactorExceeded;
PartialCloseFactorExceeded.code = 6065;
class SustainedBreachPending extends Error {
    constructor(logs) {
        super("6066: [deprecated] OneTouch sustained-breach — OneTouch dropped in the V3 amendment (2026-04-24)");
        this.logs = logs;
        this.code = 6066;
        this.name = "SustainedBreachPending";
        this.msg = "[deprecated] OneTouch sustained-breach — OneTouch dropped in the V3 amendment (2026-04-24)";
    }
}
exports.SustainedBreachPending = SustainedBreachPending;
SustainedBreachPending.code = 6066;
class TwapWindowEmpty extends Error {
    constructor(logs) {
        super("6067: TWAP window has no valid samples; settlement cannot proceed");
        this.logs = logs;
        this.code = 6067;
        this.name = "TwapWindowEmpty";
        this.msg = "TWAP window has no valid samples; settlement cannot proceed";
    }
}
exports.TwapWindowEmpty = TwapWindowEmpty;
TwapWindowEmpty.code = 6067;
class UnauthorizedRelayPayload extends Error {
    constructor(logs) {
        super("6068: Relay payload Ed25519 signature verification failed (buyer/CM/digest mismatch)");
        this.logs = logs;
        this.code = 6068;
        this.name = "UnauthorizedRelayPayload";
        this.msg = "Relay payload Ed25519 signature verification failed (buyer/CM/digest mismatch)";
    }
}
exports.UnauthorizedRelayPayload = UnauthorizedRelayPayload;
UnauthorizedRelayPayload.code = 6068;
class AuctionNotOpen extends Error {
    constructor(logs) {
        super("6069: Dutch auction not in Open state (already filled/cancelled)");
        this.logs = logs;
        this.code = 6069;
        this.name = "AuctionNotOpen";
        this.msg = "Dutch auction not in Open state (already filled/cancelled)";
    }
}
exports.AuctionNotOpen = AuctionNotOpen;
AuctionNotOpen.code = 6069;
class AuctionInvalidPrice extends Error {
    constructor(logs) {
        super("6070: Auction price parameters invalid (start < floor, zero duration, or price=0)");
        this.logs = logs;
        this.code = 6070;
        this.name = "AuctionInvalidPrice";
        this.msg = "Auction price parameters invalid (start < floor, zero duration, or price=0)";
    }
}
exports.AuctionInvalidPrice = AuctionInvalidPrice;
AuctionInvalidPrice.code = 6070;
class SelfLiquidationForbidden extends Error {
    constructor(logs) {
        super("6071: Self-liquidation forbidden () — liquidator cannot equal owner");
        this.logs = logs;
        this.code = 6071;
        this.name = "SelfLiquidationForbidden";
        this.msg = "Self-liquidation forbidden () — liquidator cannot equal owner";
    }
}
exports.SelfLiquidationForbidden = SelfLiquidationForbidden;
SelfLiquidationForbidden.code = 6071;
class RatioNotRestored extends Error {
    constructor(logs) {
        super("6072: Post-liquidation ratio not restored equity/IM < 1.10 after partial");
        this.logs = logs;
        this.code = 6072;
        this.name = "RatioNotRestored";
        this.msg = "Post-liquidation ratio not restored equity/IM < 1.10 after partial";
    }
}
exports.RatioNotRestored = RatioNotRestored;
RatioNotRestored.code = 6072;
class PythNotStaleEnough extends Error {
    constructor(logs) {
        super("6073: Pyth not stale enough for DEX fallback staleness ≤ threshold");
        this.logs = logs;
        this.code = 6073;
        this.name = "PythNotStaleEnough";
        this.msg = "Pyth not stale enough for DEX fallback staleness ≤ threshold";
    }
}
exports.PythNotStaleEnough = PythNotStaleEnough;
PythNotStaleEnough.code = 6073;
class MultiVenueFallbackForbidden extends Error {
    constructor(logs) {
        super("6074: Multi-venue median fallback forbidden single DEX venue only");
        this.logs = logs;
        this.code = 6074;
        this.name = "MultiVenueFallbackForbidden";
        this.msg = "Multi-venue median fallback forbidden single DEX venue only";
    }
}
exports.MultiVenueFallbackForbidden = MultiVenueFallbackForbidden;
MultiVenueFallbackForbidden.code = 6074;
class AdlClawbackCapExceeded extends Error {
    constructor(logs) {
        super("6075: ADL clawback exceeds 50% of winner profit");
        this.logs = logs;
        this.code = 6075;
        this.name = "AdlClawbackCapExceeded";
        this.msg = "ADL clawback exceeds 50% of winner profit";
    }
}
exports.AdlClawbackCapExceeded = AdlClawbackCapExceeded;
AdlClawbackCapExceeded.code = 6075;
class ProtocolFallbackTooEarly extends Error {
    constructor(logs) {
        super("6076: Protocol fallback called before slot=45");
        this.logs = logs;
        this.code = 6076;
        this.name = "ProtocolFallbackTooEarly";
        this.msg = "Protocol fallback called before slot=45";
    }
}
exports.ProtocolFallbackTooEarly = ProtocolFallbackTooEarly;
ProtocolFallbackTooEarly.code = 6076;
class SsviButterflyViolation extends Error {
    constructor(logs) {
        super("6077: SSVI butterfly arbitrage bound violated: θ·φ²·(1+|ρ|) > 4.0");
        this.logs = logs;
        this.code = 6077;
        this.name = "SsviButterflyViolation";
        this.msg = "SSVI butterfly arbitrage bound violated: θ·φ²·(1+|ρ|) > 4.0";
    }
}
exports.SsviButterflyViolation = SsviButterflyViolation;
SsviButterflyViolation.code = 6077;
class A2Reserved11 extends Error {
    constructor(logs) {
        super("6078: Placeholder 6078 (reserved)");
        this.logs = logs;
        this.code = 6078;
        this.name = "A2Reserved11";
        this.msg = "Placeholder 6078 (reserved)";
    }
}
exports.A2Reserved11 = A2Reserved11;
A2Reserved11.code = 6078;
class A2Reserved12 extends Error {
    constructor(logs) {
        super("6079: not yet implemented (P-004 variation_margin et al.)");
        this.logs = logs;
        this.code = 6079;
        this.name = "A2Reserved12";
        this.msg = "not yet implemented (P-004 variation_margin et al.)";
    }
}
exports.A2Reserved12 = A2Reserved12;
A2Reserved12.code = 6079;
class TierMustIncrease extends Error {
    constructor(logs) {
        super("6080: Tier change must increase tier rank (Standard < Silver < Gold < Platinum)");
        this.logs = logs;
        this.code = 6080;
        this.name = "TierMustIncrease";
        this.msg = "Tier change must increase tier rank (Standard < Silver < Gold < Platinum)";
    }
}
exports.TierMustIncrease = TierMustIncrease;
TierMustIncrease.code = 6080;
class TierMustDecrease extends Error {
    constructor(logs) {
        super("6081: Tier change must decrease tier rank");
        this.logs = logs;
        this.code = 6081;
        this.name = "TierMustDecrease";
        this.msg = "Tier change must decrease tier rank";
    }
}
exports.TierMustDecrease = TierMustDecrease;
TierMustDecrease.code = 6081;
class InsufficientLockupCollateral extends Error {
    constructor(logs) {
        super("6082: Insufficient free collateral to satisfy the requested tier's lockup floor");
        this.logs = logs;
        this.code = 6082;
        this.name = "InsufficientLockupCollateral";
        this.msg = "Insufficient free collateral to satisfy the requested tier's lockup floor";
    }
}
exports.InsufficientLockupCollateral = InsufficientLockupCollateral;
InsufficientLockupCollateral.code = 6082;
class TierLockupNotExpired extends Error {
    constructor(logs) {
        super("6083: Tier lockup minimum-hold (30 days) has not yet elapsed; downgrade rejected");
        this.logs = logs;
        this.code = 6083;
        this.name = "TierLockupNotExpired";
        this.msg = "Tier lockup minimum-hold (30 days) has not yet elapsed; downgrade rejected";
    }
}
exports.TierLockupNotExpired = TierLockupNotExpired;
TierLockupNotExpired.code = 6083;
class TierChangeForbiddenInLiquidation extends Error {
    constructor(logs) {
        super("6084: Tier change forbidden while CM is under_liquidation");
        this.logs = logs;
        this.code = 6084;
        this.name = "TierChangeForbiddenInLiquidation";
        this.msg = "Tier change forbidden while CM is under_liquidation";
    }
}
exports.TierChangeForbiddenInLiquidation = TierChangeForbiddenInLiquidation;
TierChangeForbiddenInLiquidation.code = 6084;
class UnsupportedTier extends Error {
    constructor(logs) {
        super("6085: Unsupported VerifiedTier discriminant; valid range is 0..=3 (Standard/Silver/Gold/Platinum)");
        this.logs = logs;
        this.code = 6085;
        this.name = "UnsupportedTier";
        this.msg = "Unsupported VerifiedTier discriminant; valid range is 0..=3 (Standard/Silver/Gold/Platinum)";
    }
}
exports.UnsupportedTier = UnsupportedTier;
UnsupportedTier.code = 6085;
class BuilderVolumeInsufficient extends Error {
    constructor(logs) {
        super("6086: Builder code 30-day routed volume below floor; deposit refund not permitted");
        this.logs = logs;
        this.code = 6086;
        this.name = "BuilderVolumeInsufficient";
        this.msg = "Builder code 30-day routed volume below floor; deposit refund not permitted";
    }
}
exports.BuilderVolumeInsufficient = BuilderVolumeInsufficient;
BuilderVolumeInsufficient.code = 6086;
class MakerRebateInactive extends Error {
    constructor(logs) {
        super("6087: Maker rebate phase is not active under current governance toggle");
        this.logs = logs;
        this.code = 6087;
        this.name = "MakerRebateInactive";
        this.msg = "Maker rebate phase is not active under current governance toggle";
    }
}
exports.MakerRebateInactive = MakerRebateInactive;
MakerRebateInactive.code = 6087;
class VolumeTrackerAuthorityMismatch extends Error {
    constructor(logs) {
        super("6088: Volume tracker authority does not match the fee-paying signer / CM authority");
        this.logs = logs;
        this.code = 6088;
        this.name = "VolumeTrackerAuthorityMismatch";
        this.msg = "Volume tracker authority does not match the fee-paying signer / CM authority";
    }
}
exports.VolumeTrackerAuthorityMismatch = VolumeTrackerAuthorityMismatch;
VolumeTrackerAuthorityMismatch.code = 6088;
class BuilderLabelInvalid extends Error {
    constructor(logs) {
        super("6089: Builder code label exceeds 32 bytes or contains an interior NUL byte");
        this.logs = logs;
        this.code = 6089;
        this.name = "BuilderLabelInvalid";
        this.msg = "Builder code label exceeds 32 bytes or contains an interior NUL byte";
    }
}
exports.BuilderLabelInvalid = BuilderLabelInvalid;
BuilderLabelInvalid.code = 6089;
class BuilderFeesUnderflow extends Error {
    constructor(logs) {
        super("6090: Builder fees-accrued underflow on withdraw");
        this.logs = logs;
        this.code = 6090;
        this.name = "BuilderFeesUnderflow";
        this.msg = "Builder fees-accrued underflow on withdraw";
    }
}
exports.BuilderFeesUnderflow = BuilderFeesUnderflow;
BuilderFeesUnderflow.code = 6090;
class MakerRebatePhaseOutOfRange extends Error {
    constructor(logs) {
        super("6091: Maker rebate phase value out of range; valid 0..=10_000 bps");
        this.logs = logs;
        this.code = 6091;
        this.name = "MakerRebatePhaseOutOfRange";
        this.msg = "Maker rebate phase value out of range; valid 0..=10_000 bps";
    }
}
exports.MakerRebatePhaseOutOfRange = MakerRebatePhaseOutOfRange;
MakerRebatePhaseOutOfRange.code = 6091;
class HamiltonStateMissing extends Error {
    constructor(logs) {
        super("6092: HamiltonState PDA not provided for asset with open positions (anti-stress-bypass)");
        this.logs = logs;
        this.code = 6092;
        this.name = "HamiltonStateMissing";
        this.msg = "HamiltonState PDA not provided for asset with open positions (anti-stress-bypass)";
    }
}
exports.HamiltonStateMissing = HamiltonStateMissing;
HamiltonStateMissing.code = 6092;
class OracleConfidenceTooWide extends Error {
    constructor(logs) {
        super("6093: Pyth confidence interval too wide (> 1% of price); oracle data not trustworthy");
        this.logs = logs;
        this.code = 6093;
        this.name = "OracleConfidenceTooWide";
        this.msg = "Pyth confidence interval too wide (> 1% of price); oracle data not trustworthy";
    }
}
exports.OracleConfidenceTooWide = OracleConfidenceTooWide;
OracleConfidenceTooWide.code = 6093;
class ConditionalOrderNotActive extends Error {
    constructor(logs) {
        super("6094: Conditional order not in Active state (already triggered/cancelled/expired)");
        this.logs = logs;
        this.code = 6094;
        this.name = "ConditionalOrderNotActive";
        this.msg = "Conditional order not in Active state (already triggered/cancelled/expired)";
    }
}
exports.ConditionalOrderNotActive = ConditionalOrderNotActive;
ConditionalOrderNotActive.code = 6094;
class ConditionalTriggerNotMet extends Error {
    constructor(logs) {
        super("6095: Conditional order trigger condition not met by current oracle price");
        this.logs = logs;
        this.code = 6095;
        this.name = "ConditionalTriggerNotMet";
        this.msg = "Conditional order trigger condition not met by current oracle price";
    }
}
exports.ConditionalTriggerNotMet = ConditionalTriggerNotMet;
ConditionalTriggerNotMet.code = 6095;
class ConditionalGraceNotElapsed extends Error {
    constructor(logs) {
        super("6096: Conditional order grace period has not elapsed (anti-flicker)");
        this.logs = logs;
        this.code = 6096;
        this.name = "ConditionalGraceNotElapsed";
        this.msg = "Conditional order grace period has not elapsed (anti-flicker)";
    }
}
exports.ConditionalGraceNotElapsed = ConditionalGraceNotElapsed;
ConditionalGraceNotElapsed.code = 6096;
class ConditionalOrderExpired extends Error {
    constructor(logs) {
        super("6097: Conditional order valid_until_ts has already elapsed");
        this.logs = logs;
        this.code = 6097;
        this.name = "ConditionalOrderExpired";
        this.msg = "Conditional order valid_until_ts has already elapsed";
    }
}
exports.ConditionalOrderExpired = ConditionalOrderExpired;
ConditionalOrderExpired.code = 6097;
class ConditionalSlippageRejected extends Error {
    constructor(logs) {
        super("6098: Conditional order action min/max premium violated (slippage protection)");
        this.logs = logs;
        this.code = 6098;
        this.name = "ConditionalSlippageRejected";
        this.msg = "Conditional order action min/max premium violated (slippage protection)";
    }
}
exports.ConditionalSlippageRejected = ConditionalSlippageRejected;
ConditionalSlippageRejected.code = 6098;
class OcoLinkMismatch extends Error {
    constructor(logs) {
        super("6099: OCO pair link mismatch (linked_order pubkey does not match)");
        this.logs = logs;
        this.code = 6099;
        this.name = "OcoLinkMismatch";
        this.msg = "OCO pair link mismatch (linked_order pubkey does not match)";
    }
}
exports.OcoLinkMismatch = OcoLinkMismatch;
OcoLinkMismatch.code = 6099;
class RfqAuctionNotOpen extends Error {
    constructor(logs) {
        super("6100: RFQ auction not in Open state");
        this.logs = logs;
        this.code = 6100;
        this.name = "RfqAuctionNotOpen";
        this.msg = "RFQ auction not in Open state";
    }
}
exports.RfqAuctionNotOpen = RfqAuctionNotOpen;
RfqAuctionNotOpen.code = 6100;
class RfqAuctionClosed extends Error {
    constructor(logs) {
        super("6101: RFQ auction close slot already reached (no new quotes accepted)");
        this.logs = logs;
        this.code = 6101;
        this.name = "RfqAuctionClosed";
        this.msg = "RFQ auction close slot already reached (no new quotes accepted)";
    }
}
exports.RfqAuctionClosed = RfqAuctionClosed;
RfqAuctionClosed.code = 6101;
class RfqQuoteNotBetter extends Error {
    constructor(logs) {
        super("6102: RFQ quote not better than current best (must strictly undercut)");
        this.logs = logs;
        this.code = 6102;
        this.name = "RfqQuoteNotBetter";
        this.msg = "RFQ quote not better than current best (must strictly undercut)";
    }
}
exports.RfqQuoteNotBetter = RfqQuoteNotBetter;
RfqQuoteNotBetter.code = 6102;
class RfqQuoteValidityShort extends Error {
    constructor(logs) {
        super("6103: RFQ quote validity window does not span the auction close slot");
        this.logs = logs;
        this.code = 6103;
        this.name = "RfqQuoteValidityShort";
        this.msg = "RFQ quote validity window does not span the auction close slot";
    }
}
exports.RfqQuoteValidityShort = RfqQuoteValidityShort;
RfqQuoteValidityShort.code = 6103;
class RfqMakerNotRegistered extends Error {
    constructor(logs) {
        super("6104: RFQ MM not registered (must register_rfq_maker with deposit first)");
        this.logs = logs;
        this.code = 6104;
        this.name = "RfqMakerNotRegistered";
        this.msg = "RFQ MM not registered (must register_rfq_maker with deposit first)";
    }
}
exports.RfqMakerNotRegistered = RfqMakerNotRegistered;
RfqMakerNotRegistered.code = 6104;
class RfqMakerDepositInsufficient extends Error {
    constructor(logs) {
        super("6105: RFQ MM deposit below minimum (anti-spam slashable bond)");
        this.logs = logs;
        this.code = 6105;
        this.name = "RfqMakerDepositInsufficient";
        this.msg = "RFQ MM deposit below minimum (anti-spam slashable bond)";
    }
}
exports.RfqMakerDepositInsufficient = RfqMakerDepositInsufficient;
RfqMakerDepositInsufficient.code = 6105;
class RfqQuoteSignatureInvalid extends Error {
    constructor(logs) {
        super("6106: RFQ ed25519 quote signature did not verify against expected payload");
        this.logs = logs;
        this.code = 6106;
        this.name = "RfqQuoteSignatureInvalid";
        this.msg = "RFQ ed25519 quote signature did not verify against expected payload";
    }
}
exports.RfqQuoteSignatureInvalid = RfqQuoteSignatureInvalid;
RfqQuoteSignatureInvalid.code = 6106;
class ComboLegIndexOutOfRange extends Error {
    constructor(logs) {
        super("6107: Combo intent v2 leg index out of range (0..leg_count)");
        this.logs = logs;
        this.code = 6107;
        this.name = "ComboLegIndexOutOfRange";
        this.msg = "Combo intent v2 leg index out of range (0..leg_count)";
    }
}
exports.ComboLegIndexOutOfRange = ComboLegIndexOutOfRange;
ComboLegIndexOutOfRange.code = 6107;
class ComboLegCountInvalid extends Error {
    constructor(logs) {
        super("6108: Combo intent v2 leg count must be in 1..=32");
        this.logs = logs;
        this.code = 6108;
        this.name = "ComboLegCountInvalid";
        this.msg = "Combo intent v2 leg count must be in 1..=32";
    }
}
exports.ComboLegCountInvalid = ComboLegCountInvalid;
ComboLegCountInvalid.code = 6108;
class ComboLegAlreadyFilled extends Error {
    constructor(logs) {
        super("6109: Combo intent v2 leg already filled");
        this.logs = logs;
        this.code = 6109;
        this.name = "ComboLegAlreadyFilled";
        this.msg = "Combo intent v2 leg already filled";
    }
}
exports.ComboLegAlreadyFilled = ComboLegAlreadyFilled;
ComboLegAlreadyFilled.code = 6109;
class ComboIntentV2Expired extends Error {
    constructor(logs) {
        super("6110: Combo intent v2 expires_ts has elapsed (cleanup required)");
        this.logs = logs;
        this.code = 6110;
        this.name = "ComboIntentV2Expired";
        this.msg = "Combo intent v2 expires_ts has elapsed (cleanup required)";
    }
}
exports.ComboIntentV2Expired = ComboIntentV2Expired;
ComboIntentV2Expired.code = 6110;
class ReplenishCapExceeded extends Error {
    constructor(logs) {
        super("6111: replenish_if_from_fees amount exceeds 10% of fee_accumulator balance (Rule 3 cap)");
        this.logs = logs;
        this.code = 6111;
        this.name = "ReplenishCapExceeded";
        this.msg = "replenish_if_from_fees amount exceeds 10% of fee_accumulator balance (Rule 3 cap)";
    }
}
exports.ReplenishCapExceeded = ReplenishCapExceeded;
ReplenishCapExceeded.code = 6111;
class LtvCapExceeded extends Error {
    constructor(logs) {
        super("6112: Dynamic LTV cap exceeded — depeg severity reduced max-lockable, cm.total_pm_locked + im > cap");
        this.logs = logs;
        this.code = 6112;
        this.name = "LtvCapExceeded";
        this.msg = "Dynamic LTV cap exceeded — depeg severity reduced max-lockable, cm.total_pm_locked + im > cap";
    }
}
exports.LtvCapExceeded = LtvCapExceeded;
LtvCapExceeded.code = 6112;
class EmergencyAlreadyActive extends Error {
    constructor(logs) {
        super("6113: emergency_pause: already active — re-pause not permitted (use emergency_resume first)");
        this.logs = logs;
        this.code = 6113;
        this.name = "EmergencyAlreadyActive";
        this.msg = "emergency_pause: already active — re-pause not permitted (use emergency_resume first)";
    }
}
exports.EmergencyAlreadyActive = EmergencyAlreadyActive;
EmergencyAlreadyActive.code = 6113;
class EmergencyNotActive extends Error {
    constructor(logs) {
        super("6114: emergency_resume / cleanup_expired_emergency: emergency not active — nothing to clear");
        this.logs = logs;
        this.code = 6114;
        this.name = "EmergencyNotActive";
        this.msg = "emergency_resume / cleanup_expired_emergency: emergency not active — nothing to clear";
    }
}
exports.EmergencyNotActive = EmergencyNotActive;
EmergencyNotActive.code = 6114;
class EmergencyNotExpired extends Error {
    constructor(logs) {
        super("6115: cleanup_expired_emergency: 24h timelock window not yet elapsed — only emergency_resume by SKEW_AUTHORITY may clear early");
        this.logs = logs;
        this.code = 6115;
        this.name = "EmergencyNotExpired";
        this.msg = "cleanup_expired_emergency: 24h timelock window not yet elapsed — only emergency_resume by SKEW_AUTHORITY may clear early";
    }
}
exports.EmergencyNotExpired = EmergencyNotExpired;
EmergencyNotExpired.code = 6115;
class RfqMakerAlreadySlashed extends Error {
    constructor(logs) {
        super("6116: slash_rfq_maker: registry already slashable=true — duplicate slash not permitted");
        this.logs = logs;
        this.code = 6116;
        this.name = "RfqMakerAlreadySlashed";
        this.msg = "slash_rfq_maker: registry already slashable=true — duplicate slash not permitted";
    }
}
exports.RfqMakerAlreadySlashed = RfqMakerAlreadySlashed;
RfqMakerAlreadySlashed.code = 6116;
class BonusBelowExpected extends Error {
    constructor(logs) {
        super("6117: liquidate: actual effective Dutch bonus bps fell below liquidator's min_expected_bonus_bps floor (race-condition front-run defense)");
        this.logs = logs;
        this.code = 6117;
        this.name = "BonusBelowExpected";
        this.msg = "liquidate: actual effective Dutch bonus bps fell below liquidator's min_expected_bonus_bps floor (race-condition front-run defense)";
    }
}
exports.BonusBelowExpected = BonusBelowExpected;
BonusBelowExpected.code = 6117;
class IncompletePositionAccounts extends Error {
    constructor(logs) {
        super("6118: PM compute: walked OptionAccount count != cm.positions_count — caller must pass every CM-owned option PDA in remaining_accounts (silent IM under-count defense)");
        this.logs = logs;
        this.code = 6118;
        this.name = "IncompletePositionAccounts";
        this.msg = "PM compute: walked OptionAccount count != cm.positions_count — caller must pass every CM-owned option PDA in remaining_accounts (silent IM under-count defense)";
    }
}
exports.IncompletePositionAccounts = IncompletePositionAccounts;
IncompletePositionAccounts.code = 6118;
class ProposalAlreadyExecuted extends Error {
    constructor(logs) {
        super("6119: governance_approve: proposal already executed — no further approvals accepted");
        this.logs = logs;
        this.code = 6119;
        this.name = "ProposalAlreadyExecuted";
        this.msg = "governance_approve: proposal already executed — no further approvals accepted";
    }
}
exports.ProposalAlreadyExecuted = ProposalAlreadyExecuted;
ProposalAlreadyExecuted.code = 6119;
class ProposalAlreadyApproved extends Error {
    constructor(logs) {
        super("6120: governance_approve: this member already recorded an approval on this proposal (duplicate-approval defense)");
        this.logs = logs;
        this.code = 6120;
        this.name = "ProposalAlreadyApproved";
        this.msg = "governance_approve: this member already recorded an approval on this proposal (duplicate-approval defense)";
    }
}
exports.ProposalAlreadyApproved = ProposalAlreadyApproved;
ProposalAlreadyApproved.code = 6120;
class InvalidStrike extends Error {
    constructor(logs) {
        super("6121: create_option: strike not aligned to per-asset k_round_micro grid step");
        this.logs = logs;
        this.code = 6121;
        this.name = "InvalidStrike";
        this.msg = "create_option: strike not aligned to per-asset k_round_micro grid step";
    }
}
exports.InvalidStrike = InvalidStrike;
InvalidStrike.code = 6121;
class NotionalTooSmall extends Error {
    constructor(logs) {
        super("6122: create_option: payoff × spot below per-asset min_position_usd_micro floor (dust position)");
        this.logs = logs;
        this.code = 6122;
        this.name = "NotionalTooSmall";
        this.msg = "create_option: payoff × spot below per-asset min_position_usd_micro floor (dust position)";
    }
}
exports.NotionalTooSmall = NotionalTooSmall;
NotionalTooSmall.code = 6122;
class CollateralMintAlreadyRegistered extends Error {
    constructor(logs) {
        super("6123: collateral policy: mint already registered (duplicate)");
        this.logs = logs;
        this.code = 6123;
        this.name = "CollateralMintAlreadyRegistered";
        this.msg = "collateral policy: mint already registered (duplicate)";
    }
}
exports.CollateralMintAlreadyRegistered = CollateralMintAlreadyRegistered;
CollateralMintAlreadyRegistered.code = 6123;
class CollateralKindInvalid extends Error {
    constructor(logs) {
        super("6124: collateral policy: invalid kind discriminator (0=Stable, 1=Native, 2=LST)");
        this.logs = logs;
        this.code = 6124;
        this.name = "CollateralKindInvalid";
        this.msg = "collateral policy: invalid kind discriminator (0=Stable, 1=Native, 2=LST)";
    }
}
exports.CollateralKindInvalid = CollateralKindInvalid;
CollateralKindInvalid.code = 6124;
class CollateralMintNotAllowed extends Error {
    constructor(logs) {
        super("6125: collateral policy: settlement_mint not in allowlist (atomic_fill / buy_option / fill_rfq)");
        this.logs = logs;
        this.code = 6125;
        this.name = "CollateralMintNotAllowed";
        this.msg = "collateral policy: settlement_mint not in allowlist (atomic_fill / buy_option / fill_rfq)";
    }
}
exports.CollateralMintNotAllowed = CollateralMintNotAllowed;
CollateralMintNotAllowed.code = 6125;
class PositionAlreadyTracked extends Error {
    constructor(logs) {
        super("6126: position registry: already tracking this option");
        this.logs = logs;
        this.code = 6126;
        this.name = "PositionAlreadyTracked";
        this.msg = "position registry: already tracking this option";
    }
}
exports.PositionAlreadyTracked = PositionAlreadyTracked;
PositionAlreadyTracked.code = 6126;
class PositionNotTracked extends Error {
    constructor(logs) {
        super("6127: position registry: option is not tracked by this CM");
        this.logs = logs;
        this.code = 6127;
        this.name = "PositionNotTracked";
        this.msg = "position registry: option is not tracked by this CM";
    }
}
exports.PositionNotTracked = PositionNotTracked;
PositionNotTracked.code = 6127;
class PositionRegistryFull extends Error {
    constructor(logs) {
        super("6128: position registry: maximum PM-tracked positions reached");
        this.logs = logs;
        this.code = 6128;
        this.name = "PositionRegistryFull";
        this.msg = "position registry: maximum PM-tracked positions reached";
    }
}
exports.PositionRegistryFull = PositionRegistryFull;
PositionRegistryFull.code = 6128;
class BuilderFeesOutstanding extends Error {
    constructor(logs) {
        super("6129: builder code close: withdraw accrued builder fees before closing the builder PDA");
        this.logs = logs;
        this.code = 6129;
        this.name = "BuilderFeesOutstanding";
        this.msg = "builder code close: withdraw accrued builder fees before closing the builder PDA";
    }
}
exports.BuilderFeesOutstanding = BuilderFeesOutstanding;
BuilderFeesOutstanding.code = 6129;
class MakerQuoteOff extends Error {
    constructor(logs) {
        super("6130: RFQ maker quote-off switch is active");
        this.logs = logs;
        this.code = 6130;
        this.name = "MakerQuoteOff";
        this.msg = "RFQ maker quote-off switch is active";
    }
}
exports.MakerQuoteOff = MakerQuoteOff;
MakerQuoteOff.code = 6130;
class MmpWindowExceeded extends Error {
    constructor(logs) {
        super("6131: RFQ maker MMP rolling-window limit exceeded");
        this.logs = logs;
        this.code = 6131;
        this.name = "MmpWindowExceeded";
        this.msg = "RFQ maker MMP rolling-window limit exceeded";
    }
}
exports.MmpWindowExceeded = MmpWindowExceeded;
MmpWindowExceeded.code = 6131;
class InvalidMakerRiskMode extends Error {
    constructor(logs) {
        super("6132: RFQ maker risk config mode out of range");
        this.logs = logs;
        this.code = 6132;
        this.name = "InvalidMakerRiskMode";
        this.msg = "RFQ maker risk config mode out of range";
    }
}
exports.InvalidMakerRiskMode = InvalidMakerRiskMode;
InvalidMakerRiskMode.code = 6132;
class InvalidTenorBucket extends Error {
    constructor(logs) {
        super("6133: expiry must match an allowlisted asset tenor bucket (1d / 7d / 14d / 28d / 90d)");
        this.logs = logs;
        this.code = 6133;
        this.name = "InvalidTenorBucket";
        this.msg = "expiry must match an allowlisted asset tenor bucket (1d / 7d / 14d / 28d / 90d)";
    }
}
exports.InvalidTenorBucket = InvalidTenorBucket;
InvalidTenorBucket.code = 6133;
class PmCacheDirty extends Error {
    constructor(logs) {
        super("6134: PM cache is dirty; run refresh_cm_risk_cache_full before using cached path");
        this.logs = logs;
        this.code = 6134;
        this.name = "PmCacheDirty";
        this.msg = "PM cache is dirty; run refresh_cm_risk_cache_full before using cached path";
    }
}
exports.PmCacheDirty = PmCacheDirty;
PmCacheDirty.code = 6134;
class PmCacheStale extends Error {
    constructor(logs) {
        super("6135: PM cache is stale; run refresh_cm_risk_cache_full before using cached path");
        this.logs = logs;
        this.code = 6135;
        this.name = "PmCacheStale";
        this.msg = "PM cache is stale; run refresh_cm_risk_cache_full before using cached path";
    }
}
exports.PmCacheStale = PmCacheStale;
PmCacheStale.code = 6135;
class PmCacheRegistryMismatch extends Error {
    constructor(logs) {
        super("6136: PM cache registry hash/count does not match the canonical position registry");
        this.logs = logs;
        this.code = 6136;
        this.name = "PmCacheRegistryMismatch";
        this.msg = "PM cache registry hash/count does not match the canonical position registry";
    }
}
exports.PmCacheRegistryMismatch = PmCacheRegistryMismatch;
PmCacheRegistryMismatch.code = 6136;
class PmCacheAuthorityMismatch extends Error {
    constructor(logs) {
        super("6137: PM cache CM/authority mismatch");
        this.logs = logs;
        this.code = 6137;
        this.name = "PmCacheAuthorityMismatch";
        this.msg = "PM cache CM/authority mismatch";
    }
}
exports.PmCacheAuthorityMismatch = PmCacheAuthorityMismatch;
PmCacheAuthorityMismatch.code = 6137;
class PmCacheModelMismatch extends Error {
    constructor(logs) {
        super("6138: PM cache model version mismatch");
        this.logs = logs;
        this.code = 6138;
        this.name = "PmCacheModelMismatch";
        this.msg = "PM cache model version mismatch";
    }
}
exports.PmCacheModelMismatch = PmCacheModelMismatch;
PmCacheModelMismatch.code = 6138;
class TakeQuoteUnauthorized extends Error {
    constructor(logs) {
        super("6139: take_best_quote signer is not the auction.buyer (only the auction registrant can take)");
        this.logs = logs;
        this.code = 6139;
        this.name = "TakeQuoteUnauthorized";
        this.msg = "take_best_quote signer is not the auction.buyer (only the auction registrant can take)";
    }
}
exports.TakeQuoteUnauthorized = TakeQuoteUnauthorized;
TakeQuoteUnauthorized.code = 6139;
class TakeQuoteNoMatchingQuote extends Error {
    constructor(logs) {
        super("6140: take_best_quote called on auction with no submitted quote (best_quote.mm == default)");
        this.logs = logs;
        this.code = 6140;
        this.name = "TakeQuoteNoMatchingQuote";
        this.msg = "take_best_quote called on auction with no submitted quote (best_quote.mm == default)";
    }
}
exports.TakeQuoteNoMatchingQuote = TakeQuoteNoMatchingQuote;
TakeQuoteNoMatchingQuote.code = 6140;
class TakeQuoteQuoteExpired extends Error {
    constructor(logs) {
        super("6141: take_best_quote best_quote.valid_until_slot has elapsed (re-submit / refresh required)");
        this.logs = logs;
        this.code = 6141;
        this.name = "TakeQuoteQuoteExpired";
        this.msg = "take_best_quote best_quote.valid_until_slot has elapsed (re-submit / refresh required)";
    }
}
exports.TakeQuoteQuoteExpired = TakeQuoteQuoteExpired;
TakeQuoteQuoteExpired.code = 6141;
class TakeQuotePriceMoved extends Error {
    constructor(logs) {
        super("6142: take_best_quote args.expected_premium_micro != current best_quote.premium (price moved during front-run window)");
        this.logs = logs;
        this.code = 6142;
        this.name = "TakeQuotePriceMoved";
        this.msg = "take_best_quote args.expected_premium_micro != current best_quote.premium (price moved during front-run window)";
    }
}
exports.TakeQuotePriceMoved = TakeQuotePriceMoved;
TakeQuotePriceMoved.code = 6142;
class RefreshQuoteNotOwnQuote extends Error {
    constructor(logs) {
        super("6143: refresh_quote: caller mm key != current auction.best_quote.mm (only own quote can be refreshed)");
        this.logs = logs;
        this.code = 6143;
        this.name = "RefreshQuoteNotOwnQuote";
        this.msg = "refresh_quote: caller mm key != current auction.best_quote.mm (only own quote can be refreshed)";
    }
}
exports.RefreshQuoteNotOwnQuote = RefreshQuoteNotOwnQuote;
RefreshQuoteNotOwnQuote.code = 6143;
class AxeInvalidBand extends Error {
    constructor(logs) {
        super("6144: publish_axe / update_axe args band/asset/side/size validation failed: lo>hi, asset>4, side not in -1/0/+1, size==0, etc.");
        this.logs = logs;
        this.code = 6144;
        this.name = "AxeInvalidBand";
        this.msg = "publish_axe / update_axe args band/asset/side/size validation failed: lo>hi, asset>4, side not in -1/0/+1, size==0, etc.";
    }
}
exports.AxeInvalidBand = AxeInvalidBand;
AxeInvalidBand.code = 6144;
class AxeInvalidValidUntil extends Error {
    constructor(logs) {
        super("6145: publish_axe / update_axe valid_until / expiry_band_lo must exceed current unix_timestamp");
        this.logs = logs;
        this.code = 6145;
        this.name = "AxeInvalidValidUntil";
        this.msg = "publish_axe / update_axe valid_until / expiry_band_lo must exceed current unix_timestamp";
    }
}
exports.AxeInvalidValidUntil = AxeInvalidValidUntil;
AxeInvalidValidUntil.code = 6145;
class AxeReservedBitsSet extends Error {
    constructor(logs) {
        super("6146: publish_axe / update_axe option_type_mask reserved bits 10..=15 must be zero");
        this.logs = logs;
        this.code = 6146;
        this.name = "AxeReservedBitsSet";
        this.msg = "publish_axe / update_axe option_type_mask reserved bits 10..=15 must be zero";
    }
}
exports.AxeReservedBitsSet = AxeReservedBitsSet;
AxeReservedBitsSet.code = 6146;
class AxeRevoked extends Error {
    constructor(logs) {
        super("6147: update_axe: axe.revoked == true — re-publish required (close the PDA via revoke_axe first then publish_axe again)");
        this.logs = logs;
        this.code = 6147;
        this.name = "AxeRevoked";
        this.msg = "update_axe: axe.revoked == true — re-publish required (close the PDA via revoke_axe first then publish_axe again)";
    }
}
exports.AxeRevoked = AxeRevoked;
AxeRevoked.code = 6147;
class BuyerNotWhitelisted extends Error {
    constructor(logs) {
        super("6148: atomic_fill_from_relay: payload.buyer not in seller_cm whitelist (counterparty restriction active)");
        this.logs = logs;
        this.code = 6148;
        this.name = "BuyerNotWhitelisted";
        this.msg = "atomic_fill_from_relay: payload.buyer not in seller_cm whitelist (counterparty restriction active)";
    }
}
exports.BuyerNotWhitelisted = BuyerNotWhitelisted;
BuyerNotWhitelisted.code = 6148;
class BlockTradeNotionalTooSmall extends Error {
    constructor(logs) {
        super("6149: finalize_rfq_auction / register_rfq_auction: block-trade flag set but notional below per-asset Rule 6.07 threshold");
        this.logs = logs;
        this.code = 6149;
        this.name = "BlockTradeNotionalTooSmall";
        this.msg = "finalize_rfq_auction / register_rfq_auction: block-trade flag set but notional below per-asset Rule 6.07 threshold";
    }
}
exports.BlockTradeNotionalTooSmall = BlockTradeNotionalTooSmall;
BlockTradeNotionalTooSmall.code = 6149;
class PositionLimitExceeded extends Error {
    constructor(logs) {
        super("6150: calculate_margin / atomic_fill_from_relay: per-asset short-position USD limit exceeded (Rule 12.01)");
        this.logs = logs;
        this.code = 6150;
        this.name = "PositionLimitExceeded";
        this.msg = "calculate_margin / atomic_fill_from_relay: per-asset short-position USD limit exceeded (Rule 12.01)";
    }
}
exports.PositionLimitExceeded = PositionLimitExceeded;
PositionLimitExceeded.code = 6150;
class PositionLimitAssetInvalid extends Error {
    constructor(logs) {
        super("6151: governance_set_position_limit: asset_idx out of range (valid 0..=4 BTC/ETH/SOL/XRP/HYPE)");
        this.logs = logs;
        this.code = 6151;
        this.name = "PositionLimitAssetInvalid";
        this.msg = "governance_set_position_limit: asset_idx out of range (valid 0..=4 BTC/ETH/SOL/XRP/HYPE)";
    }
}
exports.PositionLimitAssetInvalid = PositionLimitAssetInvalid;
PositionLimitAssetInvalid.code = 6151;
class CmAccountSizeUnexpected extends Error {
    constructor(logs) {
        super("6152: cm_realloc_v2: existing account data length is neither the pre-W2 144 B layout nor the post-W2 1176 B layout — refusing to migrate (corrupted account or wrong account passed)");
        this.logs = logs;
        this.code = 6152;
        this.name = "CmAccountSizeUnexpected";
        this.msg = "cm_realloc_v2: existing account data length is neither the pre-W2 144 B layout nor the post-W2 1176 B layout — refusing to migrate (corrupted account or wrong account passed)";
    }
}
exports.CmAccountSizeUnexpected = CmAccountSizeUnexpected;
CmAccountSizeUnexpected.code = 6152;
class MakerRateLimitExceeded extends Error {
    constructor(logs) {
        super("6153: submit_rfq_quote: Maker exceeded MAKER_RATE_LIMIT_MSG_PER_SLOT (100) quote-update messages within the current Solana slot (Rule 5.12 / MiFID II RTS 6 throttle)");
        this.logs = logs;
        this.code = 6153;
        this.name = "MakerRateLimitExceeded";
        this.msg = "submit_rfq_quote: Maker exceeded MAKER_RATE_LIMIT_MSG_PER_SLOT (100) quote-update messages within the current Solana slot (Rule 5.12 / MiFID II RTS 6 throttle)";
    }
}
exports.MakerRateLimitExceeded = MakerRateLimitExceeded;
MakerRateLimitExceeded.code = 6153;
class AuctionInsufficientMakers extends Error {
    constructor(logs) {
        super("6154: register_rfq_auction: block-trade / auction-lane RFQ broadcast must reach >= AUCTION_MIN_MAKERS (3) eligible Makers under separate beneficial ownership (Rule 5.21 / CFTC SEF Part 37 RFQ-3)");
        this.logs = logs;
        this.code = 6154;
        this.name = "AuctionInsufficientMakers";
        this.msg = "register_rfq_auction: block-trade / auction-lane RFQ broadcast must reach >= AUCTION_MIN_MAKERS (3) eligible Makers under separate beneficial ownership (Rule 5.21 / CFTC SEF Part 37 RFQ-3)";
    }
}
exports.AuctionInsufficientMakers = AuctionInsufficientMakers;
AuctionInsufficientMakers.code = 6154;
class CompressionInvariantBroken extends Error {
    constructor(logs) {
        super("6155: compress_positions: Net-P/L invariant broken (sum of v0 × signed_qty before != after). Caller passed unmatched series, miscounted qty, or zero-qty leg (Rule 6.08 / HKEX OTC Clear compression cycle)");
        this.logs = logs;
        this.code = 6155;
        this.name = "CompressionInvariantBroken";
        this.msg = "compress_positions: Net-P/L invariant broken (sum of v0 × signed_qty before != after). Caller passed unmatched series, miscounted qty, or zero-qty leg (Rule 6.08 / HKEX OTC Clear compression cycle)";
    }
}
exports.CompressionInvariantBroken = CompressionInvariantBroken;
CompressionInvariantBroken.code = 6155;
class RecoveryThresholdNotMet extends Error {
    constructor(logs) {
        super("6156: recovery_declare_trigger: VaultDrain arm — aggregate IF + protocol-fee balance not below RECOVERY_TRIGGER_USDC_MICRO (Rule 11A.01(i) Tᵉ = USDC 5,000,000)");
        this.logs = logs;
        this.code = 6156;
        this.name = "RecoveryThresholdNotMet";
        this.msg = "recovery_declare_trigger: VaultDrain arm — aggregate IF + protocol-fee balance not below RECOVERY_TRIGGER_USDC_MICRO (Rule 11A.01(i) Tᵉ = USDC 5,000,000)";
    }
}
exports.RecoveryThresholdNotMet = RecoveryThresholdNotMet;
RecoveryThresholdNotMet.code = 6156;
class RecoveryCommitteeQuorumMissing extends Error {
    constructor(logs) {
        super("6157: recovery_declare_trigger: CommitteeDetermination arm — Methodology Committee quorum invariant not satisfied (Rule 10.13 floor: ≥3 members, ≥1 independent)");
        this.logs = logs;
        this.code = 6157;
        this.name = "RecoveryCommitteeQuorumMissing";
        this.msg = "recovery_declare_trigger: CommitteeDetermination arm — Methodology Committee quorum invariant not satisfied (Rule 10.13 floor: ≥3 members, ≥1 independent)";
    }
}
exports.RecoveryCommitteeQuorumMissing = RecoveryCommitteeQuorumMissing;
RecoveryCommitteeQuorumMissing.code = 6157;
class RecoveryNotActive extends Error {
    constructor(logs) {
        super("6158: recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: no active recovery cycle (call recovery_declare_trigger first)");
        this.logs = logs;
        this.code = 6158;
        this.name = "RecoveryNotActive";
        this.msg = "recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: no active recovery cycle (call recovery_declare_trigger first)";
    }
}
exports.RecoveryNotActive = RecoveryNotActive;
RecoveryNotActive.code = 6158;
class RecoverySnapshotAlreadyPublished extends Error {
    constructor(logs) {
        super("6159: recovery_publish_snapshot: snapshot already published for the active recovery cycle (Rule 11A.02 once-per-cycle)");
        this.logs = logs;
        this.code = 6159;
        this.name = "RecoverySnapshotAlreadyPublished";
        this.msg = "recovery_publish_snapshot: snapshot already published for the active recovery cycle (Rule 11A.02 once-per-cycle)";
    }
}
exports.RecoverySnapshotAlreadyPublished = RecoverySnapshotAlreadyPublished;
RecoverySnapshotAlreadyPublished.code = 6159;
class RecoverySnapshotDeadlineExceeded extends Error {
    constructor(logs) {
        super("6160: recovery_publish_snapshot: more than one (1) Solana epoch elapsed since recovery_declare_trigger (Rule 11A.02 publication deadline)");
        this.logs = logs;
        this.code = 6160;
        this.name = "RecoverySnapshotDeadlineExceeded";
        this.msg = "recovery_publish_snapshot: more than one (1) Solana epoch elapsed since recovery_declare_trigger (Rule 11A.02 publication deadline)";
    }
}
exports.RecoverySnapshotDeadlineExceeded = RecoverySnapshotDeadlineExceeded;
RecoverySnapshotDeadlineExceeded.code = 6160;
class RecoveryPauseNotActive extends Error {
    constructor(logs) {
        super("6161: recovery_publish_snapshot: emergency_pause is not active (Rule 11A.02 requires emergency_pause to be invoked alongside the snapshot)");
        this.logs = logs;
        this.code = 6161;
        this.name = "RecoveryPauseNotActive";
        this.msg = "recovery_publish_snapshot: emergency_pause is not active (Rule 11A.02 requires emergency_pause to be invoked alongside the snapshot)";
    }
}
exports.RecoveryPauseNotActive = RecoveryPauseNotActive;
RecoveryPauseNotActive.code = 6161;
class RecoverySnapshotMissing extends Error {
    constructor(logs) {
        super("6162: recovery_apply_vmgh / recovery_partial_tear_up: snapshot not yet published (Rule 11A.02 ordering — snapshot must precede recovery tools)");
        this.logs = logs;
        this.code = 6162;
        this.name = "RecoverySnapshotMissing";
        this.msg = "recovery_apply_vmgh / recovery_partial_tear_up: snapshot not yet published (Rule 11A.02 ordering — snapshot must precede recovery tools)";
    }
}
exports.RecoverySnapshotMissing = RecoverySnapshotMissing;
RecoverySnapshotMissing.code = 6162;
class RecoveryVmghCapExceeded extends Error {
    constructor(logs) {
        super("6163: recovery_apply_vmgh: haircut_bps must be in (0, VMGH_HAIRCUT_CAP_BPS = 5_000] (Rule 11A.03(i) 50% cap)");
        this.logs = logs;
        this.code = 6163;
        this.name = "RecoveryVmghCapExceeded";
        this.msg = "recovery_apply_vmgh: haircut_bps must be in (0, VMGH_HAIRCUT_CAP_BPS = 5_000] (Rule 11A.03(i) 50% cap)";
    }
}
exports.RecoveryVmghCapExceeded = RecoveryVmghCapExceeded;
RecoveryVmghCapExceeded.code = 6163;
class RecoveryTearUpCapExceeded extends Error {
    constructor(logs) {
        super("6164: recovery_partial_tear_up: tear_up_bps must be in (0, TEAR_UP_PER_CYCLE_CAP_BPS = 2_500] (Rule 11A.03(ii) 25% per-cycle cap)");
        this.logs = logs;
        this.code = 6164;
        this.name = "RecoveryTearUpCapExceeded";
        this.msg = "recovery_partial_tear_up: tear_up_bps must be in (0, TEAR_UP_PER_CYCLE_CAP_BPS = 2_500] (Rule 11A.03(ii) 25% per-cycle cap)";
    }
}
exports.RecoveryTearUpCapExceeded = RecoveryTearUpCapExceeded;
RecoveryTearUpCapExceeded.code = 6164;
class RecoveryProtocolFeeMismatch extends Error {
    constructor(logs) {
        super("6165: recovery_declare_trigger: caller-supplied protocol_fee_balance_micro does not match on-chain sum of fee_accumulator PDAs threaded as remaining_accounts (IOSCO RRP 2017 §3.4 — trigger inputs must be verifiable, objective)");
        this.logs = logs;
        this.code = 6165;
        this.name = "RecoveryProtocolFeeMismatch";
        this.msg = "recovery_declare_trigger: caller-supplied protocol_fee_balance_micro does not match on-chain sum of fee_accumulator PDAs threaded as remaining_accounts (IOSCO RRP 2017 §3.4 — trigger inputs must be verifiable, objective)";
    }
}
exports.RecoveryProtocolFeeMismatch = RecoveryProtocolFeeMismatch;
RecoveryProtocolFeeMismatch.code = 6165;
class RecoveryTearUpCycleLimitReached extends Error {
    constructor(logs) {
        super("6166: recovery_partial_tear_up: cycle already used its tear-up. PROTOCOL.md §11A.03(ii) caps tear-up at 25% in a SINGLE tear-up cycle (singular). If the first tear-up is insufficient to restore solvency, escalate to §11A.04 resolution boundary (full wind-down) — do not iterate 'partial' calls. MAX_TEAR_UPS_PER_CYCLE = 1.");
        this.logs = logs;
        this.code = 6166;
        this.name = "RecoveryTearUpCycleLimitReached";
        this.msg = "recovery_partial_tear_up: cycle already used its tear-up. PROTOCOL.md §11A.03(ii) caps tear-up at 25% in a SINGLE tear-up cycle (singular). If the first tear-up is insufficient to restore solvency, escalate to §11A.04 resolution boundary (full wind-down) — do not iterate 'partial' calls. MAX_TEAR_UPS_PER_CYCLE = 1.";
    }
}
exports.RecoveryTearUpCycleLimitReached = RecoveryTearUpCycleLimitReached;
RecoveryTearUpCycleLimitReached.code = 6166;
class DigestReplayed extends Error {
    constructor(logs) {
        super("6167: recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: incoming digest equals the last accepted digest in this active cycle — replay rejected (F-RECOV-2). Submit a fresh off-chain snapshot or escalate to a new cycle.");
        this.logs = logs;
        this.code = 6167;
        this.name = "DigestReplayed";
        this.msg = "recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: incoming digest equals the last accepted digest in this active cycle — replay rejected (F-RECOV-2). Submit a fresh off-chain snapshot or escalate to a new cycle.";
    }
}
exports.DigestReplayed = DigestReplayed;
DigestReplayed.code = 6167;
class RecoveryDeterminationMissing extends Error {
    constructor(logs) {
        super("6168: recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda missing or not in Executed status (F-RECOV-3 / IOSCO RRP 2017 §3.4 verifiable input). Propose + queue + execute via propose_recovery_determination → execute_recovery_determination first.");
        this.logs = logs;
        this.code = 6168;
        this.name = "RecoveryDeterminationMissing";
        this.msg = "recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda missing or not in Executed status (F-RECOV-3 / IOSCO RRP 2017 §3.4 verifiable input). Propose + queue + execute via propose_recovery_determination → execute_recovery_determination first.";
    }
}
exports.RecoveryDeterminationMissing = RecoveryDeterminationMissing;
RecoveryDeterminationMissing.code = 6168;
class RecoveryDeterminationStale extends Error {
    constructor(logs) {
        super("6169: recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda was executed more than RECOVERY_DETERMINATION_VALID_WINDOW_SLOTS (≈24h) ago. Stale determinations are rejected — re-propose to refresh the on-chain governance attestation (F-RECOV-3).");
        this.logs = logs;
        this.code = 6169;
        this.name = "RecoveryDeterminationStale";
        this.msg = "recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda was executed more than RECOVERY_DETERMINATION_VALID_WINDOW_SLOTS (≈24h) ago. Stale determinations are rejected — re-propose to refresh the on-chain governance attestation (F-RECOV-3).";
    }
}
exports.RecoveryDeterminationStale = RecoveryDeterminationStale;
RecoveryDeterminationStale.code = 6169;
class RecoveryDeterminationKindMismatch extends Error {
    constructor(logs) {
        super("6170: recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda.trigger_kind does not match the trigger_kind argument passed to recovery_declare_trigger (F-RECOV-3 cross-binding).");
        this.logs = logs;
        this.code = 6170;
        this.name = "RecoveryDeterminationKindMismatch";
        this.msg = "recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda.trigger_kind does not match the trigger_kind argument passed to recovery_declare_trigger (F-RECOV-3 cross-binding).";
    }
}
exports.RecoveryDeterminationKindMismatch = RecoveryDeterminationKindMismatch;
RecoveryDeterminationKindMismatch.code = 6170;
class RecoveryDrainedVaultMismatch extends Error {
    constructor(logs) {
        super("6171: recovery_apply_vmgh: drained_vault token account is not owned by the SPL Token program, has the wrong mint, or its address does not derive from [RECOVERY_DRAINED_VAULT_SEED, mint] under this program (F-RECOV-4 SPL mutation invariant)");
        this.logs = logs;
        this.code = 6171;
        this.name = "RecoveryDrainedVaultMismatch";
        this.msg = "recovery_apply_vmgh: drained_vault token account is not owned by the SPL Token program, has the wrong mint, or its address does not derive from [RECOVERY_DRAINED_VAULT_SEED, mint] under this program (F-RECOV-4 SPL mutation invariant)";
    }
}
exports.RecoveryDrainedVaultMismatch = RecoveryDrainedVaultMismatch;
RecoveryDrainedVaultMismatch.code = 6171;
class RecoveryVmghMintMismatch extends Error {
    constructor(logs) {
        super("6172: recovery_apply_vmgh: fee_accumulator + drained_vault mints differ — VMGH drain must move USDC into a same-mint treasury PDA (F-RECOV-4)");
        this.logs = logs;
        this.code = 6172;
        this.name = "RecoveryVmghMintMismatch";
        this.msg = "recovery_apply_vmgh: fee_accumulator + drained_vault mints differ — VMGH drain must move USDC into a same-mint treasury PDA (F-RECOV-4)";
    }
}
exports.RecoveryVmghMintMismatch = RecoveryVmghMintMismatch;
RecoveryVmghMintMismatch.code = 6172;
class RecoveryTearUpCmMismatch extends Error {
    constructor(logs) {
        super("6173: recovery_partial_tear_up: ClearingMemberAccount threaded through remaining_accounts is not owned by skew-master program, has the wrong discriminator, or its PDA address does not derive from [CM_SEED, authority] (F-RECOV-4 option-balance mutation invariant)");
        this.logs = logs;
        this.code = 6173;
        this.name = "RecoveryTearUpCmMismatch";
        this.msg = "recovery_partial_tear_up: ClearingMemberAccount threaded through remaining_accounts is not owned by skew-master program, has the wrong discriminator, or its PDA address does not derive from [CM_SEED, authority] (F-RECOV-4 option-balance mutation invariant)";
    }
}
exports.RecoveryTearUpCmMismatch = RecoveryTearUpCmMismatch;
RecoveryTearUpCmMismatch.code = 6173;
class RecoveryTearUpEmptyScope extends Error {
    constructor(logs) {
        super("6174: recovery_partial_tear_up: at least one ClearingMemberAccount must be threaded through remaining_accounts — caller passed an empty scope. The §11A.03(ii) tear-up is a deterministic on-chain instruction; an empty scope would be a no-op masquerading as a tear-up.");
        this.logs = logs;
        this.code = 6174;
        this.name = "RecoveryTearUpEmptyScope";
        this.msg = "recovery_partial_tear_up: at least one ClearingMemberAccount must be threaded through remaining_accounts — caller passed an empty scope. The §11A.03(ii) tear-up is a deterministic on-chain instruction; an empty scope would be a no-op masquerading as a tear-up.";
    }
}
exports.RecoveryTearUpEmptyScope = RecoveryTearUpEmptyScope;
RecoveryTearUpEmptyScope.code = 6174;
function fromCode(code, logs) {
    switch (code) {
        case 6000:
            return new ExpiryTooSoon(logs);
        case 6001:
            return new ExpiryTooFar(logs);
        case 6002:
            return new StrikeZero(logs);
        case 6003:
            return new PayoffZero(logs);
        case 6004:
            return new InvalidState(logs);
        case 6005:
            return new CollateralMismatch(logs);
        case 6006:
            return new InvalidSettlementMint(logs);
        case 6007:
            return new UnsupportedOptionType(logs);
        case 6008:
            return new PremiumZero(logs);
        case 6009:
            return new PythFeedInvalid(logs);
        case 6010:
            return new PythPriceStale(logs);
        case 6011:
            return new PythConfidence(logs);
        case 6012:
            return new InvalidPayoffAddress(logs);
        case 6013:
            return new RfqNotOpen(logs);
        case 6014:
            return new RfqSpecMismatch(logs);
        case 6015:
            return new RangeUpperBoundInvalid(logs);
        case 6016:
            return new CloseNotYetEligible(logs);
        case 6017:
            return new PremiumExceedsMax(logs);
        case 6018:
            return new InvalidHolderAta(logs);
        case 6019:
            return new HolderMismatch(logs);
        case 6020:
            return new NotCurrentHolder(logs);
        case 6021:
            return new GracePeriodNotElapsed(logs);
        case 6022:
            return new SettleWindowExpired(logs);
        case 6023:
            return new OptionNotCancellable(logs);
        case 6024:
            return new SettleNormalWindowExpired(logs);
        case 6025:
            return new SettleWindowStillOpen(logs);
        case 6026:
            return new Unauthorized(logs);
        case 6027:
            return new NotPrimeAccount(logs);
        case 6028:
            return new MaxPositionsExceeded(logs);
        case 6029:
            return new OptionIsITM(logs);
        case 6030:
            return new PayoffExceedsLimit(logs);
        case 6031:
            return new InvalidSigmaIv(logs);
        case 6032:
            return new InsufficientMargin(logs);
        case 6033:
            return new InvalidPositionAccount(logs);
        case 6034:
            return new InsolvencyCascade(logs);
        case 6035:
            return new ThresholdNotMet(logs);
        case 6036:
            return new SignatureTooOld(logs);
        case 6037:
            return new TimelockNotElapsed(logs);
        case 6038:
            return new WithdrawalTooFast(logs);
        case 6039:
            return new WithdrawalCeilingExceeded(logs);
        case 6040:
            return new NotionalOutOfBand(logs);
        case 6041:
            return new MoneynessOutOfBand(logs);
        case 6042:
            return new SigmaOutOfBand(logs);
        case 6043:
            return new GammaFreezeActive(logs);
        case 6044:
            return new CMNotRegistered(logs);
        case 6045:
            return new IFTierExhausted(logs);
        case 6046:
            return new ConcentrationCapExceeded(logs);
        case 6047:
            return new UnsupportedAsset(logs);
        case 6048:
            return new CmInsufficientCollateral(logs);
        case 6049:
            return new CmUnderLiquidation(logs);
        case 6050:
            return new InvalidDirection(logs);
        case 6051:
            return new InvalidExtraParam(logs);
        case 6052:
            return new BoundaryImViolation(logs);
        case 6053:
            return new ProtocolSitgDrained(logs);
        case 6054:
            return new WaterfallTierInvalid(logs);
        case 6055:
            return new A1Reserved1(logs);
        case 6056:
            return new A1Reserved2(logs);
        case 6057:
            return new A1Reserved3(logs);
        case 6058:
            return new A1Reserved4(logs);
        case 6059:
            return new A1Reserved5(logs);
        case 6060:
            return new OracleDivergence(logs);
        case 6061:
            return new StaleOracle(logs);
        case 6062:
            return new ConfidenceTooHigh(logs);
        case 6063:
            return new CushionInterp(logs);
        case 6064:
            return new DutchAuctionNotStarted(logs);
        case 6065:
            return new PartialCloseFactorExceeded(logs);
        case 6066:
            return new SustainedBreachPending(logs);
        case 6067:
            return new TwapWindowEmpty(logs);
        case 6068:
            return new UnauthorizedRelayPayload(logs);
        case 6069:
            return new AuctionNotOpen(logs);
        case 6070:
            return new AuctionInvalidPrice(logs);
        case 6071:
            return new SelfLiquidationForbidden(logs);
        case 6072:
            return new RatioNotRestored(logs);
        case 6073:
            return new PythNotStaleEnough(logs);
        case 6074:
            return new MultiVenueFallbackForbidden(logs);
        case 6075:
            return new AdlClawbackCapExceeded(logs);
        case 6076:
            return new ProtocolFallbackTooEarly(logs);
        case 6077:
            return new SsviButterflyViolation(logs);
        case 6078:
            return new A2Reserved11(logs);
        case 6079:
            return new A2Reserved12(logs);
        case 6080:
            return new TierMustIncrease(logs);
        case 6081:
            return new TierMustDecrease(logs);
        case 6082:
            return new InsufficientLockupCollateral(logs);
        case 6083:
            return new TierLockupNotExpired(logs);
        case 6084:
            return new TierChangeForbiddenInLiquidation(logs);
        case 6085:
            return new UnsupportedTier(logs);
        case 6086:
            return new BuilderVolumeInsufficient(logs);
        case 6087:
            return new MakerRebateInactive(logs);
        case 6088:
            return new VolumeTrackerAuthorityMismatch(logs);
        case 6089:
            return new BuilderLabelInvalid(logs);
        case 6090:
            return new BuilderFeesUnderflow(logs);
        case 6091:
            return new MakerRebatePhaseOutOfRange(logs);
        case 6092:
            return new HamiltonStateMissing(logs);
        case 6093:
            return new OracleConfidenceTooWide(logs);
        case 6094:
            return new ConditionalOrderNotActive(logs);
        case 6095:
            return new ConditionalTriggerNotMet(logs);
        case 6096:
            return new ConditionalGraceNotElapsed(logs);
        case 6097:
            return new ConditionalOrderExpired(logs);
        case 6098:
            return new ConditionalSlippageRejected(logs);
        case 6099:
            return new OcoLinkMismatch(logs);
        case 6100:
            return new RfqAuctionNotOpen(logs);
        case 6101:
            return new RfqAuctionClosed(logs);
        case 6102:
            return new RfqQuoteNotBetter(logs);
        case 6103:
            return new RfqQuoteValidityShort(logs);
        case 6104:
            return new RfqMakerNotRegistered(logs);
        case 6105:
            return new RfqMakerDepositInsufficient(logs);
        case 6106:
            return new RfqQuoteSignatureInvalid(logs);
        case 6107:
            return new ComboLegIndexOutOfRange(logs);
        case 6108:
            return new ComboLegCountInvalid(logs);
        case 6109:
            return new ComboLegAlreadyFilled(logs);
        case 6110:
            return new ComboIntentV2Expired(logs);
        case 6111:
            return new ReplenishCapExceeded(logs);
        case 6112:
            return new LtvCapExceeded(logs);
        case 6113:
            return new EmergencyAlreadyActive(logs);
        case 6114:
            return new EmergencyNotActive(logs);
        case 6115:
            return new EmergencyNotExpired(logs);
        case 6116:
            return new RfqMakerAlreadySlashed(logs);
        case 6117:
            return new BonusBelowExpected(logs);
        case 6118:
            return new IncompletePositionAccounts(logs);
        case 6119:
            return new ProposalAlreadyExecuted(logs);
        case 6120:
            return new ProposalAlreadyApproved(logs);
        case 6121:
            return new InvalidStrike(logs);
        case 6122:
            return new NotionalTooSmall(logs);
        case 6123:
            return new CollateralMintAlreadyRegistered(logs);
        case 6124:
            return new CollateralKindInvalid(logs);
        case 6125:
            return new CollateralMintNotAllowed(logs);
        case 6126:
            return new PositionAlreadyTracked(logs);
        case 6127:
            return new PositionNotTracked(logs);
        case 6128:
            return new PositionRegistryFull(logs);
        case 6129:
            return new BuilderFeesOutstanding(logs);
        case 6130:
            return new MakerQuoteOff(logs);
        case 6131:
            return new MmpWindowExceeded(logs);
        case 6132:
            return new InvalidMakerRiskMode(logs);
        case 6133:
            return new InvalidTenorBucket(logs);
        case 6134:
            return new PmCacheDirty(logs);
        case 6135:
            return new PmCacheStale(logs);
        case 6136:
            return new PmCacheRegistryMismatch(logs);
        case 6137:
            return new PmCacheAuthorityMismatch(logs);
        case 6138:
            return new PmCacheModelMismatch(logs);
        case 6139:
            return new TakeQuoteUnauthorized(logs);
        case 6140:
            return new TakeQuoteNoMatchingQuote(logs);
        case 6141:
            return new TakeQuoteQuoteExpired(logs);
        case 6142:
            return new TakeQuotePriceMoved(logs);
        case 6143:
            return new RefreshQuoteNotOwnQuote(logs);
        case 6144:
            return new AxeInvalidBand(logs);
        case 6145:
            return new AxeInvalidValidUntil(logs);
        case 6146:
            return new AxeReservedBitsSet(logs);
        case 6147:
            return new AxeRevoked(logs);
        case 6148:
            return new BuyerNotWhitelisted(logs);
        case 6149:
            return new BlockTradeNotionalTooSmall(logs);
        case 6150:
            return new PositionLimitExceeded(logs);
        case 6151:
            return new PositionLimitAssetInvalid(logs);
        case 6152:
            return new CmAccountSizeUnexpected(logs);
        case 6153:
            return new MakerRateLimitExceeded(logs);
        case 6154:
            return new AuctionInsufficientMakers(logs);
        case 6155:
            return new CompressionInvariantBroken(logs);
        case 6156:
            return new RecoveryThresholdNotMet(logs);
        case 6157:
            return new RecoveryCommitteeQuorumMissing(logs);
        case 6158:
            return new RecoveryNotActive(logs);
        case 6159:
            return new RecoverySnapshotAlreadyPublished(logs);
        case 6160:
            return new RecoverySnapshotDeadlineExceeded(logs);
        case 6161:
            return new RecoveryPauseNotActive(logs);
        case 6162:
            return new RecoverySnapshotMissing(logs);
        case 6163:
            return new RecoveryVmghCapExceeded(logs);
        case 6164:
            return new RecoveryTearUpCapExceeded(logs);
        case 6165:
            return new RecoveryProtocolFeeMismatch(logs);
        case 6166:
            return new RecoveryTearUpCycleLimitReached(logs);
        case 6167:
            return new DigestReplayed(logs);
        case 6168:
            return new RecoveryDeterminationMissing(logs);
        case 6169:
            return new RecoveryDeterminationStale(logs);
        case 6170:
            return new RecoveryDeterminationKindMismatch(logs);
        case 6171:
            return new RecoveryDrainedVaultMismatch(logs);
        case 6172:
            return new RecoveryVmghMintMismatch(logs);
        case 6173:
            return new RecoveryTearUpCmMismatch(logs);
        case 6174:
            return new RecoveryTearUpEmptyScope(logs);
    }
    return null;
}
//# sourceMappingURL=custom.js.map