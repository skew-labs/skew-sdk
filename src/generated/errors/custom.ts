export type CustomError =
  | ExpiryTooSoon
  | ExpiryTooFar
  | StrikeZero
  | PayoffZero
  | InvalidState
  | CollateralMismatch
  | InvalidSettlementMint
  | UnsupportedOptionType
  | PremiumZero
  | PythFeedInvalid
  | PythPriceStale
  | PythConfidence
  | InvalidPayoffAddress
  | RfqNotOpen
  | RfqSpecMismatch
  | RangeUpperBoundInvalid
  | CloseNotYetEligible
  | PremiumExceedsMax
  | InvalidHolderAta
  | HolderMismatch
  | NotCurrentHolder
  | GracePeriodNotElapsed
  | SettleWindowExpired
  | OptionNotCancellable
  | SettleNormalWindowExpired
  | SettleWindowStillOpen
  | Unauthorized
  | NotPrimeAccount
  | MaxPositionsExceeded
  | OptionIsITM
  | PayoffExceedsLimit
  | InvalidSigmaIv
  | InsufficientMargin
  | InvalidPositionAccount
  | InsolvencyCascade
  | ThresholdNotMet
  | SignatureTooOld
  | TimelockNotElapsed
  | WithdrawalTooFast
  | WithdrawalCeilingExceeded
  | NotionalOutOfBand
  | MoneynessOutOfBand
  | SigmaOutOfBand
  | GammaFreezeActive
  | CMNotRegistered
  | IFTierExhausted
  | ConcentrationCapExceeded
  | UnsupportedAsset
  | CmInsufficientCollateral
  | CmUnderLiquidation
  | InvalidDirection
  | InvalidExtraParam
  | BoundaryImViolation
  | ProtocolSitgDrained
  | WaterfallTierInvalid
  | A1Reserved1
  | A1Reserved2
  | A1Reserved3
  | A1Reserved4
  | A1Reserved5
  | OracleDivergence
  | StaleOracle
  | ConfidenceTooHigh
  | CushionInterp
  | DutchAuctionNotStarted
  | PartialCloseFactorExceeded
  | SustainedBreachPending
  | TwapWindowEmpty
  | UnauthorizedRelayPayload
  | AuctionNotOpen
  | AuctionInvalidPrice
  | SelfLiquidationForbidden
  | RatioNotRestored
  | PythNotStaleEnough
  | MultiVenueFallbackForbidden
  | AdlClawbackCapExceeded
  | ProtocolFallbackTooEarly
  | SsviButterflyViolation
  | A2Reserved11
  | A2Reserved12
  | TierMustIncrease
  | TierMustDecrease
  | InsufficientLockupCollateral
  | TierLockupNotExpired
  | TierChangeForbiddenInLiquidation
  | UnsupportedTier
  | BuilderVolumeInsufficient
  | MakerRebateInactive
  | VolumeTrackerAuthorityMismatch
  | BuilderLabelInvalid
  | BuilderFeesUnderflow
  | MakerRebatePhaseOutOfRange
  | HamiltonStateMissing
  | OracleConfidenceTooWide
  | ConditionalOrderNotActive
  | ConditionalTriggerNotMet
  | ConditionalGraceNotElapsed
  | ConditionalOrderExpired
  | ConditionalSlippageRejected
  | OcoLinkMismatch
  | RfqAuctionNotOpen
  | RfqAuctionClosed
  | RfqQuoteNotBetter
  | RfqQuoteValidityShort
  | RfqMakerNotRegistered
  | RfqMakerDepositInsufficient
  | RfqQuoteSignatureInvalid
  | ComboLegIndexOutOfRange
  | ComboLegCountInvalid
  | ComboLegAlreadyFilled
  | ComboIntentV2Expired
  | ReplenishCapExceeded
  | LtvCapExceeded
  | EmergencyAlreadyActive
  | EmergencyNotActive
  | EmergencyNotExpired
  | RfqMakerAlreadySlashed
  | BonusBelowExpected
  | IncompletePositionAccounts
  | ProposalAlreadyExecuted
  | ProposalAlreadyApproved
  | InvalidStrike
  | NotionalTooSmall
  | CollateralMintAlreadyRegistered
  | CollateralKindInvalid
  | CollateralMintNotAllowed
  | PositionAlreadyTracked
  | PositionNotTracked
  | PositionRegistryFull
  | BuilderFeesOutstanding
  | MakerQuoteOff
  | MmpWindowExceeded
  | InvalidMakerRiskMode
  | InvalidTenorBucket
  | PmCacheDirty
  | PmCacheStale
  | PmCacheRegistryMismatch
  | PmCacheAuthorityMismatch
  | PmCacheModelMismatch
  | TakeQuoteUnauthorized
  | TakeQuoteNoMatchingQuote
  | TakeQuoteQuoteExpired
  | TakeQuotePriceMoved
  | RefreshQuoteNotOwnQuote
  | AxeInvalidBand
  | AxeInvalidValidUntil
  | AxeReservedBitsSet
  | AxeRevoked
  | BuyerNotWhitelisted
  | BlockTradeNotionalTooSmall
  | PositionLimitExceeded
  | PositionLimitAssetInvalid
  | CmAccountSizeUnexpected
  | MakerRateLimitExceeded
  | AuctionInsufficientMakers
  | CompressionInvariantBroken
  | RecoveryThresholdNotMet
  | RecoveryCommitteeQuorumMissing
  | RecoveryNotActive
  | RecoverySnapshotAlreadyPublished
  | RecoverySnapshotDeadlineExceeded
  | RecoveryPauseNotActive
  | RecoverySnapshotMissing
  | RecoveryVmghCapExceeded
  | RecoveryTearUpCapExceeded
  | RecoveryProtocolFeeMismatch
  | RecoveryTearUpCycleLimitReached
  | DigestReplayed
  | RecoveryDeterminationMissing
  | RecoveryDeterminationStale
  | RecoveryDeterminationKindMismatch
  | RecoveryDrainedVaultMismatch
  | RecoveryVmghMintMismatch
  | RecoveryTearUpCmMismatch
  | RecoveryTearUpEmptyScope

export class ExpiryTooSoon extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "ExpiryTooSoon"
  readonly msg = "Expiry must be at least 300s in the future"

  constructor(readonly logs?: string[]) {
    super("6000: Expiry must be at least 300s in the future")
  }
}

export class ExpiryTooFar extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "ExpiryTooFar"
  readonly msg = "Expiry exceeds maximum horizon of 1 year"

  constructor(readonly logs?: string[]) {
    super("6001: Expiry exceeds maximum horizon of 1 year")
  }
}

export class StrikeZero extends Error {
  static readonly code = 6002
  readonly code = 6002
  readonly name = "StrikeZero"
  readonly msg = "Strike must be non-zero"

  constructor(readonly logs?: string[]) {
    super("6002: Strike must be non-zero")
  }
}

export class PayoffZero extends Error {
  static readonly code = 6003
  readonly code = 6003
  readonly name = "PayoffZero"
  readonly msg = "Payoff amount must be non-zero"

  constructor(readonly logs?: string[]) {
    super("6003: Payoff amount must be non-zero")
  }
}

export class InvalidState extends Error {
  static readonly code = 6004
  readonly code = 6004
  readonly name = "InvalidState"
  readonly msg = "Option is not in the expected state for this instruction"

  constructor(readonly logs?: string[]) {
    super("6004: Option is not in the expected state for this instruction")
  }
}

export class CollateralMismatch extends Error {
  static readonly code = 6005
  readonly code = 6005
  readonly name = "CollateralMismatch"
  readonly msg = "Collateral deposit amount does not match required collateral"

  constructor(readonly logs?: string[]) {
    super("6005: Collateral deposit amount does not match required collateral")
  }
}

export class InvalidSettlementMint extends Error {
  static readonly code = 6006
  readonly code = 6006
  readonly name = "InvalidSettlementMint"
  readonly msg = "Settlement mint must be a valid SPL Token mint"

  constructor(readonly logs?: string[]) {
    super("6006: Settlement mint must be a valid SPL Token mint")
  }
}

export class UnsupportedOptionType extends Error {
  static readonly code = 6007
  readonly code = 6007
  readonly name = "UnsupportedOptionType"
  readonly msg = "Option type not supported in current program version"

  constructor(readonly logs?: string[]) {
    super("6007: Option type not supported in current program version")
  }
}

export class PremiumZero extends Error {
  static readonly code = 6008
  readonly code = 6008
  readonly name = "PremiumZero"
  readonly msg = "Premium must be non-zero"

  constructor(readonly logs?: string[]) {
    super("6008: Premium must be non-zero")
  }
}

export class PythFeedInvalid extends Error {
  static readonly code = 6009
  readonly code = 6009
  readonly name = "PythFeedInvalid"
  readonly msg =
    "Pyth price account does not match the option's underlying feed"

  constructor(readonly logs?: string[]) {
    super(
      "6009: Pyth price account does not match the option's underlying feed"
    )
  }
}

export class PythPriceStale extends Error {
  static readonly code = 6010
  readonly code = 6010
  readonly name = "PythPriceStale"
  readonly msg = "Pyth price is stale (publish_time older than 300s)"

  constructor(readonly logs?: string[]) {
    super("6010: Pyth price is stale (publish_time older than 300s)")
  }
}

export class PythConfidence extends Error {
  static readonly code = 6011
  readonly code = 6011
  readonly name = "PythConfidence"
  readonly msg = "Pyth confidence interval too wide (conf/price >= 10%)"

  constructor(readonly logs?: string[]) {
    super("6011: Pyth confidence interval too wide (conf/price >= 10%)")
  }
}

export class InvalidPayoffAddress extends Error {
  static readonly code = 6012
  readonly code = 6012
  readonly name = "InvalidPayoffAddress"
  readonly msg = "Payoff token account owner does not match expected recipient"

  constructor(readonly logs?: string[]) {
    super("6012: Payoff token account owner does not match expected recipient")
  }
}

export class RfqNotOpen extends Error {
  static readonly code = 6013
  readonly code = 6013
  readonly name = "RfqNotOpen"
  readonly msg = "RFQ is not in Open state"

  constructor(readonly logs?: string[]) {
    super("6013: RFQ is not in Open state")
  }
}

export class RfqSpecMismatch extends Error {
  static readonly code = 6014
  readonly code = 6014
  readonly name = "RfqSpecMismatch"
  readonly msg = "Option spec does not match RFQ parameters"

  constructor(readonly logs?: string[]) {
    super("6014: Option spec does not match RFQ parameters")
  }
}

export class RangeUpperBoundInvalid extends Error {
  static readonly code = 6015
  readonly code = 6015
  readonly name = "RangeUpperBoundInvalid"
  readonly msg =
    "upper_bound must be strictly greater than strike for range-type options"

  constructor(readonly logs?: string[]) {
    super(
      "6015: upper_bound must be strictly greater than strike for range-type options"
    )
  }
}

export class CloseNotYetEligible extends Error {
  static readonly code = 6016
  readonly code = 6016
  readonly name = "CloseNotYetEligible"
  readonly msg = "Option expiry + 1 day has not yet passed; close not eligible"

  constructor(readonly logs?: string[]) {
    super("6016: Option expiry + 1 day has not yet passed; close not eligible")
  }
}

export class PremiumExceedsMax extends Error {
  static readonly code = 6017
  readonly code = 6017
  readonly name = "PremiumExceedsMax"
  readonly msg = "Premium offered by underwriter exceeds buyer's max_premium"

  constructor(readonly logs?: string[]) {
    super("6017: Premium offered by underwriter exceeds buyer's max_premium")
  }
}

export class InvalidHolderAta extends Error {
  static readonly code = 6018
  readonly code = 6018
  readonly name = "InvalidHolderAta"
  readonly msg =
    "current_holder_option_ata mint does not match option_token_mint"

  constructor(readonly logs?: string[]) {
    super(
      "6018: current_holder_option_ata mint does not match option_token_mint"
    )
  }
}

export class HolderMismatch extends Error {
  static readonly code = 6019
  readonly code = 6019
  readonly name = "HolderMismatch"
  readonly msg =
    "current_holder_option_ata owner does not match payoff_token_account owner"

  constructor(readonly logs?: string[]) {
    super(
      "6019: current_holder_option_ata owner does not match payoff_token_account owner"
    )
  }
}

export class NotCurrentHolder extends Error {
  static readonly code = 6020
  readonly code = 6020
  readonly name = "NotCurrentHolder"
  readonly msg =
    "current_holder_option_ata does not hold exactly 1 option token"

  constructor(readonly logs?: string[]) {
    super(
      "6020: current_holder_option_ata does not hold exactly 1 option token"
    )
  }
}

export class GracePeriodNotElapsed extends Error {
  static readonly code = 6021
  readonly code = 6021
  readonly name = "GracePeriodNotElapsed"
  readonly msg =
    "Grace period (72h) has not elapsed; call expire_abandoned after expiry + 72h"

  constructor(readonly logs?: string[]) {
    super(
      "6021: Grace period (72h) has not elapsed; call expire_abandoned after expiry + 72h"
    )
  }
}

export class SettleWindowExpired extends Error {
  static readonly code = 6022
  readonly code = 6022
  readonly name = "SettleWindowExpired"
  readonly msg =
    "Settle window (72h past expiry) has closed; use expire_abandoned instead"

  constructor(readonly logs?: string[]) {
    super(
      "6022: Settle window (72h past expiry) has closed; use expire_abandoned instead"
    )
  }
}

export class OptionNotCancellable extends Error {
  static readonly code = 6023
  readonly code = 6023
  readonly name = "OptionNotCancellable"
  readonly msg = "Option can only be cancelled in Created or Funded state"

  constructor(readonly logs?: string[]) {
    super("6023: Option can only be cancelled in Created or Funded state")
  }
}

export class SettleNormalWindowExpired extends Error {
  static readonly code = 6024
  readonly code = 6024
  readonly name = "SettleNormalWindowExpired"
  readonly msg =
    "Settle 30-min normal window has passed; call mark_disputed instead"

  constructor(readonly logs?: string[]) {
    super(
      "6024: Settle 30-min normal window has passed; call mark_disputed instead"
    )
  }
}

export class SettleWindowStillOpen extends Error {
  static readonly code = 6025
  readonly code = 6025
  readonly name = "SettleWindowStillOpen"
  readonly msg = "Option is not yet past the 30-min normal settle window"

  constructor(readonly logs?: string[]) {
    super("6025: Option is not yet past the 30-min normal settle window")
  }
}

export class Unauthorized extends Error {
  static readonly code = 6026
  readonly code = 6026
  readonly name = "Unauthorized"
  readonly msg = "Caller is not the SKEW_AUTHORITY"

  constructor(readonly logs?: string[]) {
    super("6026: Caller is not the SKEW_AUTHORITY")
  }
}

export class NotPrimeAccount extends Error {
  static readonly code = 6027
  readonly code = 6027
  readonly name = "NotPrimeAccount"
  readonly msg =
    "Caller does not have an approved Prime Account (deprecated — see CMNotRegistered)"

  constructor(readonly logs?: string[]) {
    super(
      "6027: Caller does not have an approved Prime Account (deprecated — see CMNotRegistered)"
    )
  }
}

export class MaxPositionsExceeded extends Error {
  static readonly code = 6028
  readonly code = 6028
  readonly name = "MaxPositionsExceeded"
  readonly msg = "Prime Account position limit reached (deprecated)"

  constructor(readonly logs?: string[]) {
    super("6028: Prime Account position limit reached (deprecated)")
  }
}

export class OptionIsITM extends Error {
  static readonly code = 6029
  readonly code = 6029
  readonly name = "OptionIsITM"
  readonly msg = "Option is in-the-money; call settle first before rolling over"

  constructor(readonly logs?: string[]) {
    super("6029: Option is in-the-money; call settle first before rolling over")
  }
}

export class PayoffExceedsLimit extends Error {
  static readonly code = 6030
  readonly code = 6030
  readonly name = "PayoffExceedsLimit"
  readonly msg =
    "payoff_amount exceeds per-maturity limit (Tier 1: 10,000 USDC)"

  constructor(readonly logs?: string[]) {
    super(
      "6030: payoff_amount exceeds per-maturity limit (Tier 1: 10,000 USDC)"
    )
  }
}

export class InvalidSigmaIv extends Error {
  static readonly code = 6031
  readonly code = 6031
  readonly name = "InvalidSigmaIv"
  readonly msg = "sigma_iv value out of valid range (must be 0.01 < σ_IV < 5.0)"

  constructor(readonly logs?: string[]) {
    super("6031: sigma_iv value out of valid range (must be 0.01 < σ_IV < 5.0)")
  }
}

export class InsufficientMargin extends Error {
  static readonly code = 6032
  readonly code = 6032
  readonly name = "InsufficientMargin"
  readonly msg =
    "Portfolio margin ratio below minimum (margin_ratio < 1.10); add collateral"

  constructor(readonly logs?: string[]) {
    super(
      "6032: Portfolio margin ratio below minimum (margin_ratio < 1.10); add collateral"
    )
  }
}

export class InvalidPositionAccount extends Error {
  static readonly code = 6033
  readonly code = 6033
  readonly name = "InvalidPositionAccount"
  readonly msg = "PositionAccount parameters invalid (deprecated in v4)"

  constructor(readonly logs?: string[]) {
    super("6033: PositionAccount parameters invalid (deprecated in v4)")
  }
}

export class InsolvencyCascade extends Error {
  static readonly code = 6034
  readonly code = 6034
  readonly name = "InsolvencyCascade"
  readonly msg =
    "Liquidation would drive CM equity below zero (Bug #17 insolvency cascade guard)"

  constructor(readonly logs?: string[]) {
    super(
      "6034: Liquidation would drive CM equity below zero (Bug #17 insolvency cascade guard)"
    )
  }
}

export class ThresholdNotMet extends Error {
  static readonly code = 6035
  readonly code = 6035
  readonly name = "ThresholdNotMet"
  readonly msg =
    "Governance signatures below GOVERNANCE_MULTISIG_THRESHOLD (3 of 5)"

  constructor(readonly logs?: string[]) {
    super(
      "6035: Governance signatures below GOVERNANCE_MULTISIG_THRESHOLD (3 of 5)"
    )
  }
}

export class SignatureTooOld extends Error {
  static readonly code = 6036
  readonly code = 6036
  readonly name = "SignatureTooOld"
  readonly msg =
    "Admin signature older than SIG_MAX_AGE_SECS (1h) Drift-style replay defense"

  constructor(readonly logs?: string[]) {
    super(
      "6036: Admin signature older than SIG_MAX_AGE_SECS (1h) Drift-style replay defense"
    )
  }
}

export class TimelockNotElapsed extends Error {
  static readonly code = 6037
  readonly code = 6037
  readonly name = "TimelockNotElapsed"
  readonly msg = "Admin action timelock has not elapsed (TIMELOCK_24H_SLOTS)"

  constructor(readonly logs?: string[]) {
    super("6037: Admin action timelock has not elapsed (TIMELOCK_24H_SLOTS)")
  }
}

export class WithdrawalTooFast extends Error {
  static readonly code = 6038
  readonly code = 6038
  readonly name = "WithdrawalTooFast"
  readonly msg = "Withdrawal exceeds 10× normal-flow rate-limit"

  constructor(readonly logs?: string[]) {
    super("6038: Withdrawal exceeds 10× normal-flow rate-limit")
  }
}

export class WithdrawalCeilingExceeded extends Error {
  static readonly code = 6039
  readonly code = 6039
  readonly name = "WithdrawalCeilingExceeded"
  readonly msg =
    "Withdrawal exceeds hard ceiling = WITHDRAWAL_TVL_CEILING_BPS of TVL"

  constructor(readonly logs?: string[]) {
    super(
      "6039: Withdrawal exceeds hard ceiling = WITHDRAWAL_TVL_CEILING_BPS of TVL"
    )
  }
}

export class NotionalOutOfBand extends Error {
  static readonly code = 6040
  readonly code = 6040
  readonly name = "NotionalOutOfBand"
  readonly msg =
    "Notional outside [$10, $10M] band (NOTIONAL_MIN/MAX_USDC_MICRO)"

  constructor(readonly logs?: string[]) {
    super(
      "6040: Notional outside [$10, $10M] band (NOTIONAL_MIN/MAX_USDC_MICRO)"
    )
  }
}

export class MoneynessOutOfBand extends Error {
  static readonly code = 6041
  readonly code = 6041
  readonly name = "MoneynessOutOfBand"
  readonly msg = "Moneyness K/S outside [0.5, 2.0] band (MONEYNESS_MIN/MAX_BPS)"

  constructor(readonly logs?: string[]) {
    super("6041: Moneyness K/S outside [0.5, 2.0] band (MONEYNESS_MIN/MAX_BPS)")
  }
}

export class SigmaOutOfBand extends Error {
  static readonly code = 6042
  readonly code = 6042
  readonly name = "SigmaOutOfBand"
  readonly msg = "Volatility σ outside [0.10, 3.00] band (SIGMA_MIN/MAX)"

  constructor(readonly logs?: string[]) {
    super("6042: Volatility σ outside [0.10, 3.00] band (SIGMA_MIN/MAX)")
  }
}

export class GammaFreezeActive extends Error {
  static readonly code = 6043
  readonly code = 6043
  readonly name = "GammaFreezeActive"
  readonly msg =
    "Gamma freeze active — expiry must be at least 60 min in the future"

  constructor(readonly logs?: string[]) {
    super(
      "6043: Gamma freeze active — expiry must be at least 60 min in the future"
    )
  }
}

export class CMNotRegistered extends Error {
  static readonly code = 6044
  readonly code = 6044
  readonly name = "CMNotRegistered"
  readonly msg =
    "Caller is not a registered Clearing Member (register_clearing_member first)"

  constructor(readonly logs?: string[]) {
    super(
      "6044: Caller is not a registered Clearing Member (register_clearing_member first)"
    )
  }
}

export class IFTierExhausted extends Error {
  static readonly code = 6045
  readonly code = 6045
  readonly name = "IFTierExhausted"
  readonly msg =
    "Insurance Fund tier exhausted; waterfall cascades to next tier"

  constructor(readonly logs?: string[]) {
    super(
      "6045: Insurance Fund tier exhausted; waterfall cascades to next tier"
    )
  }
}

export class ConcentrationCapExceeded extends Error {
  static readonly code = 6046
  readonly code = 6046
  readonly name = "ConcentrationCapExceeded"
  readonly msg =
    "CM notional exceeds MAX_CONCENTRATION_PER_CM_BPS (3% of protocol OI)"

  constructor(readonly logs?: string[]) {
    super(
      "6046: CM notional exceeds MAX_CONCENTRATION_PER_CM_BPS (3% of protocol OI)"
    )
  }
}

export class UnsupportedAsset extends Error {
  static readonly code = 6047
  readonly code = 6047
  readonly name = "UnsupportedAsset"
  readonly msg =
    "Asset not in launch panel allowlist (V3: BTC/ETH/SOL/XRP/HYPE; V2: BTC/ETH/SOL/JUP/BONK/WIF)"

  constructor(readonly logs?: string[]) {
    super(
      "6047: Asset not in launch panel allowlist (V3: BTC/ETH/SOL/XRP/HYPE; V2: BTC/ETH/SOL/JUP/BONK/WIF)"
    )
  }
}

export class CmInsufficientCollateral extends Error {
  static readonly code = 6048
  readonly code = 6048
  readonly name = "CmInsufficientCollateral"
  readonly msg = "CM free collateral below requested withdrawal"

  constructor(readonly logs?: string[]) {
    super("6048: CM free collateral below requested withdrawal")
  }
}

export class CmUnderLiquidation extends Error {
  static readonly code = 6049
  readonly code = 6049
  readonly name = "CmUnderLiquidation"
  readonly msg =
    "CM is flagged under_liquidation; new position opens are locked"

  constructor(readonly logs?: string[]) {
    super(
      "6049: CM is flagged under_liquidation; new position opens are locked"
    )
  }
}

export class InvalidDirection extends Error {
  static readonly code = 6050
  readonly code = 6050
  readonly name = "InvalidDirection"
  readonly msg = "OptionAccount direction field invalid for this OptionType"

  constructor(readonly logs?: string[]) {
    super("6050: OptionAccount direction field invalid for this OptionType")
  }
}

export class InvalidExtraParam extends Error {
  static readonly code = 6051
  readonly code = 6051
  readonly name = "InvalidExtraParam"
  readonly msg = "OptionAccount extra_param invalid for this OptionType"

  constructor(readonly logs?: string[]) {
    super("6051: OptionAccount extra_param invalid for this OptionType")
  }
}

export class BoundaryImViolation extends Error {
  static readonly code = 6052
  readonly code = 6052
  readonly name = "BoundaryImViolation"
  readonly msg =
    "Boundary-Aware IM violation — max(IM_scenario, M − V_0) not satisfied"

  constructor(readonly logs?: string[]) {
    super(
      "6052: Boundary-Aware IM violation — max(IM_scenario, M − V_0) not satisfied"
    )
  }
}

export class ProtocolSitgDrained extends Error {
  static readonly code = 6053
  readonly code = 6053
  readonly name = "ProtocolSitgDrained"
  readonly msg = "Insurance Fund tier-3 (Protocol SITG) drained;required"

  constructor(readonly logs?: string[]) {
    super("6053: Insurance Fund tier-3 (Protocol SITG) drained;required")
  }
}

export class WaterfallTierInvalid extends Error {
  static readonly code = 6054
  readonly code = 6054
  readonly name = "WaterfallTierInvalid"
  readonly msg = "Waterfall tier index out of range (valid 1..=5)"

  constructor(readonly logs?: string[]) {
    super("6054: Waterfall tier index out of range (valid 1..=5)")
  }
}

export class A1Reserved1 extends Error {
  static readonly code = 6055
  readonly code = 6055
  readonly name = "A1Reserved1"
  readonly msg = "Signature too old (governance §15.5 drift defense, 1h max)"

  constructor(readonly logs?: string[]) {
    super("6055: Signature too old (governance §15.5 drift defense, 1h max)")
  }
}

export class A1Reserved2 extends Error {
  static readonly code = 6056
  readonly code = 6056
  readonly name = "A1Reserved2"
  readonly msg =
    "Protocol paused; only PauseProtocol / UnpauseProtocol may be queued"

  constructor(readonly logs?: string[]) {
    super(
      "6056: Protocol paused; only PauseProtocol / UnpauseProtocol may be queued"
    )
  }
}

export class A1Reserved3 extends Error {
  static readonly code = 6057
  readonly code = 6057
  readonly name = "A1Reserved3"
  readonly msg = "Timelock not yet elapsed (governance §15.4 24h)"

  constructor(readonly logs?: string[]) {
    super("6057: Timelock not yet elapsed (governance §15.4 24h)")
  }
}

export class A1Reserved4 extends Error {
  static readonly code = 6058
  readonly code = 6058
  readonly name = "A1Reserved4"
  readonly msg = "Multisig threshold not met (3-of-5 default)"

  constructor(readonly logs?: string[]) {
    super("6058: Multisig threshold not met (3-of-5 default)")
  }
}

export class A1Reserved5 extends Error {
  static readonly code = 6059
  readonly code = 6059
  readonly name = "A1Reserved5"
  readonly msg =
    "Proposal already executed; once-only semantics (governance §15.3)"

  constructor(readonly logs?: string[]) {
    super(
      "6059: Proposal already executed; once-only semantics (governance §15.3)"
    )
  }
}

export class OracleDivergence extends Error {
  static readonly code = 6060
  readonly code = 6060
  readonly name = "OracleDivergence"
  readonly msg =
    "Pyth vs Switchboard oracle divergence exceeds 5% (OracleDivergence)"

  constructor(readonly logs?: string[]) {
    super(
      "6060: Pyth vs Switchboard oracle divergence exceeds 5% (OracleDivergence)"
    )
  }
}

export class StaleOracle extends Error {
  static readonly code = 6061
  readonly code = 6061
  readonly name = "StaleOracle"
  readonly msg =
    "Oracle price sample older than ORACLE_STALENESS_SECS (60s mainnet)"

  constructor(readonly logs?: string[]) {
    super(
      "6061: Oracle price sample older than ORACLE_STALENESS_SECS (60s mainnet)"
    )
  }
}

export class ConfidenceTooHigh extends Error {
  static readonly code = 6062
  readonly code = 6062
  readonly name = "ConfidenceTooHigh"
  readonly msg =
    "Pyth confidence/price ratio exceeds ORACLE_CONFIDENCE_BPS (5%)"

  constructor(readonly logs?: string[]) {
    super(
      "6062: Pyth confidence/price ratio exceeds ORACLE_CONFIDENCE_BPS (5%)"
    )
  }
}

export class CushionInterp extends Error {
  static readonly code = 6063
  readonly code = 6063
  readonly name = "CushionInterp"
  readonly msg =
    "Cushion-zone interpolation bounds invalid (internal; K-zone > K or zone > K)"

  constructor(readonly logs?: string[]) {
    super(
      "6063: Cushion-zone interpolation bounds invalid (internal; K-zone > K or zone > K)"
    )
  }
}

export class DutchAuctionNotStarted extends Error {
  static readonly code = 6064
  readonly code = 6064
  readonly name = "DutchAuctionNotStarted"
  readonly msg = "Dutch auction has not started yet (liq_start_ts > now)"

  constructor(readonly logs?: string[]) {
    super("6064: Dutch auction has not started yet (liq_start_ts > now)")
  }
}

export class PartialCloseFactorExceeded extends Error {
  static readonly code = 6065
  readonly code = 6065
  readonly name = "PartialCloseFactorExceeded"
  readonly msg = "Partial close factor exceeds PARTIAL_CLOSE_MAX_BPS (50%)"

  constructor(readonly logs?: string[]) {
    super("6065: Partial close factor exceeds PARTIAL_CLOSE_MAX_BPS (50%)")
  }
}

export class SustainedBreachPending extends Error {
  static readonly code = 6066
  readonly code = 6066
  readonly name = "SustainedBreachPending"
  readonly msg =
    "[deprecated] OneTouch sustained-breach — OneTouch dropped in the V3 amendment (2026-04-24)"

  constructor(readonly logs?: string[]) {
    super(
      "6066: [deprecated] OneTouch sustained-breach — OneTouch dropped in the V3 amendment (2026-04-24)"
    )
  }
}

export class TwapWindowEmpty extends Error {
  static readonly code = 6067
  readonly code = 6067
  readonly name = "TwapWindowEmpty"
  readonly msg = "TWAP window has no valid samples; settlement cannot proceed"

  constructor(readonly logs?: string[]) {
    super("6067: TWAP window has no valid samples; settlement cannot proceed")
  }
}

export class UnauthorizedRelayPayload extends Error {
  static readonly code = 6068
  readonly code = 6068
  readonly name = "UnauthorizedRelayPayload"
  readonly msg =
    "Relay payload Ed25519 signature verification failed (buyer/CM/digest mismatch)"

  constructor(readonly logs?: string[]) {
    super(
      "6068: Relay payload Ed25519 signature verification failed (buyer/CM/digest mismatch)"
    )
  }
}

export class AuctionNotOpen extends Error {
  static readonly code = 6069
  readonly code = 6069
  readonly name = "AuctionNotOpen"
  readonly msg = "Dutch auction not in Open state (already filled/cancelled)"

  constructor(readonly logs?: string[]) {
    super("6069: Dutch auction not in Open state (already filled/cancelled)")
  }
}

export class AuctionInvalidPrice extends Error {
  static readonly code = 6070
  readonly code = 6070
  readonly name = "AuctionInvalidPrice"
  readonly msg =
    "Auction price parameters invalid (start < floor, zero duration, or price=0)"

  constructor(readonly logs?: string[]) {
    super(
      "6070: Auction price parameters invalid (start < floor, zero duration, or price=0)"
    )
  }
}

export class SelfLiquidationForbidden extends Error {
  static readonly code = 6071
  readonly code = 6071
  readonly name = "SelfLiquidationForbidden"
  readonly msg = "Self-liquidation forbidden () — liquidator cannot equal owner"

  constructor(readonly logs?: string[]) {
    super("6071: Self-liquidation forbidden () — liquidator cannot equal owner")
  }
}

export class RatioNotRestored extends Error {
  static readonly code = 6072
  readonly code = 6072
  readonly name = "RatioNotRestored"
  readonly msg =
    "Post-liquidation ratio not restored equity/IM < 1.10 after partial"

  constructor(readonly logs?: string[]) {
    super(
      "6072: Post-liquidation ratio not restored equity/IM < 1.10 after partial"
    )
  }
}

export class PythNotStaleEnough extends Error {
  static readonly code = 6073
  readonly code = 6073
  readonly name = "PythNotStaleEnough"
  readonly msg = "Pyth not stale enough for DEX fallback staleness ≤ threshold"

  constructor(readonly logs?: string[]) {
    super("6073: Pyth not stale enough for DEX fallback staleness ≤ threshold")
  }
}

export class MultiVenueFallbackForbidden extends Error {
  static readonly code = 6074
  readonly code = 6074
  readonly name = "MultiVenueFallbackForbidden"
  readonly msg = "Multi-venue median fallback forbidden single DEX venue only"

  constructor(readonly logs?: string[]) {
    super("6074: Multi-venue median fallback forbidden single DEX venue only")
  }
}

export class AdlClawbackCapExceeded extends Error {
  static readonly code = 6075
  readonly code = 6075
  readonly name = "AdlClawbackCapExceeded"
  readonly msg = "ADL clawback exceeds 50% of winner profit"

  constructor(readonly logs?: string[]) {
    super("6075: ADL clawback exceeds 50% of winner profit")
  }
}

export class ProtocolFallbackTooEarly extends Error {
  static readonly code = 6076
  readonly code = 6076
  readonly name = "ProtocolFallbackTooEarly"
  readonly msg = "Protocol fallback called before slot=45"

  constructor(readonly logs?: string[]) {
    super("6076: Protocol fallback called before slot=45")
  }
}

export class SsviButterflyViolation extends Error {
  static readonly code = 6077
  readonly code = 6077
  readonly name = "SsviButterflyViolation"
  readonly msg = "SSVI butterfly arbitrage bound violated: θ·φ²·(1+|ρ|) > 4.0"

  constructor(readonly logs?: string[]) {
    super("6077: SSVI butterfly arbitrage bound violated: θ·φ²·(1+|ρ|) > 4.0")
  }
}

export class A2Reserved11 extends Error {
  static readonly code = 6078
  readonly code = 6078
  readonly name = "A2Reserved11"
  readonly msg = "Placeholder 6078 (reserved)"

  constructor(readonly logs?: string[]) {
    super("6078: Placeholder 6078 (reserved)")
  }
}

export class A2Reserved12 extends Error {
  static readonly code = 6079
  readonly code = 6079
  readonly name = "A2Reserved12"
  readonly msg = "not yet implemented (P-004 variation_margin et al.)"

  constructor(readonly logs?: string[]) {
    super("6079: not yet implemented (P-004 variation_margin et al.)")
  }
}

export class TierMustIncrease extends Error {
  static readonly code = 6080
  readonly code = 6080
  readonly name = "TierMustIncrease"
  readonly msg =
    "Tier change must increase tier rank (Standard < Silver < Gold < Platinum)"

  constructor(readonly logs?: string[]) {
    super(
      "6080: Tier change must increase tier rank (Standard < Silver < Gold < Platinum)"
    )
  }
}

export class TierMustDecrease extends Error {
  static readonly code = 6081
  readonly code = 6081
  readonly name = "TierMustDecrease"
  readonly msg = "Tier change must decrease tier rank"

  constructor(readonly logs?: string[]) {
    super("6081: Tier change must decrease tier rank")
  }
}

export class InsufficientLockupCollateral extends Error {
  static readonly code = 6082
  readonly code = 6082
  readonly name = "InsufficientLockupCollateral"
  readonly msg =
    "Insufficient free collateral to satisfy the requested tier's lockup floor"

  constructor(readonly logs?: string[]) {
    super(
      "6082: Insufficient free collateral to satisfy the requested tier's lockup floor"
    )
  }
}

export class TierLockupNotExpired extends Error {
  static readonly code = 6083
  readonly code = 6083
  readonly name = "TierLockupNotExpired"
  readonly msg =
    "Tier lockup minimum-hold (30 days) has not yet elapsed; downgrade rejected"

  constructor(readonly logs?: string[]) {
    super(
      "6083: Tier lockup minimum-hold (30 days) has not yet elapsed; downgrade rejected"
    )
  }
}

export class TierChangeForbiddenInLiquidation extends Error {
  static readonly code = 6084
  readonly code = 6084
  readonly name = "TierChangeForbiddenInLiquidation"
  readonly msg = "Tier change forbidden while CM is under_liquidation"

  constructor(readonly logs?: string[]) {
    super("6084: Tier change forbidden while CM is under_liquidation")
  }
}

export class UnsupportedTier extends Error {
  static readonly code = 6085
  readonly code = 6085
  readonly name = "UnsupportedTier"
  readonly msg =
    "Unsupported VerifiedTier discriminant; valid range is 0..=3 (Standard/Silver/Gold/Platinum)"

  constructor(readonly logs?: string[]) {
    super(
      "6085: Unsupported VerifiedTier discriminant; valid range is 0..=3 (Standard/Silver/Gold/Platinum)"
    )
  }
}

export class BuilderVolumeInsufficient extends Error {
  static readonly code = 6086
  readonly code = 6086
  readonly name = "BuilderVolumeInsufficient"
  readonly msg =
    "Builder code 30-day routed volume below floor; deposit refund not permitted"

  constructor(readonly logs?: string[]) {
    super(
      "6086: Builder code 30-day routed volume below floor; deposit refund not permitted"
    )
  }
}

export class MakerRebateInactive extends Error {
  static readonly code = 6087
  readonly code = 6087
  readonly name = "MakerRebateInactive"
  readonly msg =
    "Maker rebate phase is not active under current governance toggle"

  constructor(readonly logs?: string[]) {
    super(
      "6087: Maker rebate phase is not active under current governance toggle"
    )
  }
}

export class VolumeTrackerAuthorityMismatch extends Error {
  static readonly code = 6088
  readonly code = 6088
  readonly name = "VolumeTrackerAuthorityMismatch"
  readonly msg =
    "Volume tracker authority does not match the fee-paying signer / CM authority"

  constructor(readonly logs?: string[]) {
    super(
      "6088: Volume tracker authority does not match the fee-paying signer / CM authority"
    )
  }
}

export class BuilderLabelInvalid extends Error {
  static readonly code = 6089
  readonly code = 6089
  readonly name = "BuilderLabelInvalid"
  readonly msg =
    "Builder code label exceeds 32 bytes or contains an interior NUL byte"

  constructor(readonly logs?: string[]) {
    super(
      "6089: Builder code label exceeds 32 bytes or contains an interior NUL byte"
    )
  }
}

export class BuilderFeesUnderflow extends Error {
  static readonly code = 6090
  readonly code = 6090
  readonly name = "BuilderFeesUnderflow"
  readonly msg = "Builder fees-accrued underflow on withdraw"

  constructor(readonly logs?: string[]) {
    super("6090: Builder fees-accrued underflow on withdraw")
  }
}

export class MakerRebatePhaseOutOfRange extends Error {
  static readonly code = 6091
  readonly code = 6091
  readonly name = "MakerRebatePhaseOutOfRange"
  readonly msg = "Maker rebate phase value out of range; valid 0..=10_000 bps"

  constructor(readonly logs?: string[]) {
    super("6091: Maker rebate phase value out of range; valid 0..=10_000 bps")
  }
}

export class HamiltonStateMissing extends Error {
  static readonly code = 6092
  readonly code = 6092
  readonly name = "HamiltonStateMissing"
  readonly msg =
    "HamiltonState PDA not provided for asset with open positions (anti-stress-bypass)"

  constructor(readonly logs?: string[]) {
    super(
      "6092: HamiltonState PDA not provided for asset with open positions (anti-stress-bypass)"
    )
  }
}

export class OracleConfidenceTooWide extends Error {
  static readonly code = 6093
  readonly code = 6093
  readonly name = "OracleConfidenceTooWide"
  readonly msg =
    "Pyth confidence interval too wide (> 1% of price); oracle data not trustworthy"

  constructor(readonly logs?: string[]) {
    super(
      "6093: Pyth confidence interval too wide (> 1% of price); oracle data not trustworthy"
    )
  }
}

export class ConditionalOrderNotActive extends Error {
  static readonly code = 6094
  readonly code = 6094
  readonly name = "ConditionalOrderNotActive"
  readonly msg =
    "Conditional order not in Active state (already triggered/cancelled/expired)"

  constructor(readonly logs?: string[]) {
    super(
      "6094: Conditional order not in Active state (already triggered/cancelled/expired)"
    )
  }
}

export class ConditionalTriggerNotMet extends Error {
  static readonly code = 6095
  readonly code = 6095
  readonly name = "ConditionalTriggerNotMet"
  readonly msg =
    "Conditional order trigger condition not met by current oracle price"

  constructor(readonly logs?: string[]) {
    super(
      "6095: Conditional order trigger condition not met by current oracle price"
    )
  }
}

export class ConditionalGraceNotElapsed extends Error {
  static readonly code = 6096
  readonly code = 6096
  readonly name = "ConditionalGraceNotElapsed"
  readonly msg = "Conditional order grace period has not elapsed (anti-flicker)"

  constructor(readonly logs?: string[]) {
    super("6096: Conditional order grace period has not elapsed (anti-flicker)")
  }
}

export class ConditionalOrderExpired extends Error {
  static readonly code = 6097
  readonly code = 6097
  readonly name = "ConditionalOrderExpired"
  readonly msg = "Conditional order valid_until_ts has already elapsed"

  constructor(readonly logs?: string[]) {
    super("6097: Conditional order valid_until_ts has already elapsed")
  }
}

export class ConditionalSlippageRejected extends Error {
  static readonly code = 6098
  readonly code = 6098
  readonly name = "ConditionalSlippageRejected"
  readonly msg =
    "Conditional order action min/max premium violated (slippage protection)"

  constructor(readonly logs?: string[]) {
    super(
      "6098: Conditional order action min/max premium violated (slippage protection)"
    )
  }
}

export class OcoLinkMismatch extends Error {
  static readonly code = 6099
  readonly code = 6099
  readonly name = "OcoLinkMismatch"
  readonly msg = "OCO pair link mismatch (linked_order pubkey does not match)"

  constructor(readonly logs?: string[]) {
    super("6099: OCO pair link mismatch (linked_order pubkey does not match)")
  }
}

export class RfqAuctionNotOpen extends Error {
  static readonly code = 6100
  readonly code = 6100
  readonly name = "RfqAuctionNotOpen"
  readonly msg = "RFQ auction not in Open state"

  constructor(readonly logs?: string[]) {
    super("6100: RFQ auction not in Open state")
  }
}

export class RfqAuctionClosed extends Error {
  static readonly code = 6101
  readonly code = 6101
  readonly name = "RfqAuctionClosed"
  readonly msg =
    "RFQ auction close slot already reached (no new quotes accepted)"

  constructor(readonly logs?: string[]) {
    super(
      "6101: RFQ auction close slot already reached (no new quotes accepted)"
    )
  }
}

export class RfqQuoteNotBetter extends Error {
  static readonly code = 6102
  readonly code = 6102
  readonly name = "RfqQuoteNotBetter"
  readonly msg =
    "RFQ quote not better than current best (must strictly undercut)"

  constructor(readonly logs?: string[]) {
    super(
      "6102: RFQ quote not better than current best (must strictly undercut)"
    )
  }
}

export class RfqQuoteValidityShort extends Error {
  static readonly code = 6103
  readonly code = 6103
  readonly name = "RfqQuoteValidityShort"
  readonly msg =
    "RFQ quote validity window does not span the auction close slot"

  constructor(readonly logs?: string[]) {
    super(
      "6103: RFQ quote validity window does not span the auction close slot"
    )
  }
}

export class RfqMakerNotRegistered extends Error {
  static readonly code = 6104
  readonly code = 6104
  readonly name = "RfqMakerNotRegistered"
  readonly msg =
    "RFQ MM not registered (must register_rfq_maker with deposit first)"

  constructor(readonly logs?: string[]) {
    super(
      "6104: RFQ MM not registered (must register_rfq_maker with deposit first)"
    )
  }
}

export class RfqMakerDepositInsufficient extends Error {
  static readonly code = 6105
  readonly code = 6105
  readonly name = "RfqMakerDepositInsufficient"
  readonly msg = "RFQ MM deposit below minimum (anti-spam slashable bond)"

  constructor(readonly logs?: string[]) {
    super("6105: RFQ MM deposit below minimum (anti-spam slashable bond)")
  }
}

export class RfqQuoteSignatureInvalid extends Error {
  static readonly code = 6106
  readonly code = 6106
  readonly name = "RfqQuoteSignatureInvalid"
  readonly msg =
    "RFQ ed25519 quote signature did not verify against expected payload"

  constructor(readonly logs?: string[]) {
    super(
      "6106: RFQ ed25519 quote signature did not verify against expected payload"
    )
  }
}

export class ComboLegIndexOutOfRange extends Error {
  static readonly code = 6107
  readonly code = 6107
  readonly name = "ComboLegIndexOutOfRange"
  readonly msg = "Combo intent v2 leg index out of range (0..leg_count)"

  constructor(readonly logs?: string[]) {
    super("6107: Combo intent v2 leg index out of range (0..leg_count)")
  }
}

export class ComboLegCountInvalid extends Error {
  static readonly code = 6108
  readonly code = 6108
  readonly name = "ComboLegCountInvalid"
  readonly msg = "Combo intent v2 leg count must be in 1..=32"

  constructor(readonly logs?: string[]) {
    super("6108: Combo intent v2 leg count must be in 1..=32")
  }
}

export class ComboLegAlreadyFilled extends Error {
  static readonly code = 6109
  readonly code = 6109
  readonly name = "ComboLegAlreadyFilled"
  readonly msg = "Combo intent v2 leg already filled"

  constructor(readonly logs?: string[]) {
    super("6109: Combo intent v2 leg already filled")
  }
}

export class ComboIntentV2Expired extends Error {
  static readonly code = 6110
  readonly code = 6110
  readonly name = "ComboIntentV2Expired"
  readonly msg = "Combo intent v2 expires_ts has elapsed (cleanup required)"

  constructor(readonly logs?: string[]) {
    super("6110: Combo intent v2 expires_ts has elapsed (cleanup required)")
  }
}

export class ReplenishCapExceeded extends Error {
  static readonly code = 6111
  readonly code = 6111
  readonly name = "ReplenishCapExceeded"
  readonly msg =
    "replenish_if_from_fees amount exceeds 10% of fee_accumulator balance (Rule 3 cap)"

  constructor(readonly logs?: string[]) {
    super(
      "6111: replenish_if_from_fees amount exceeds 10% of fee_accumulator balance (Rule 3 cap)"
    )
  }
}

export class LtvCapExceeded extends Error {
  static readonly code = 6112
  readonly code = 6112
  readonly name = "LtvCapExceeded"
  readonly msg =
    "Dynamic LTV cap exceeded — depeg severity reduced max-lockable, cm.total_pm_locked + im > cap"

  constructor(readonly logs?: string[]) {
    super(
      "6112: Dynamic LTV cap exceeded — depeg severity reduced max-lockable, cm.total_pm_locked + im > cap"
    )
  }
}

export class EmergencyAlreadyActive extends Error {
  static readonly code = 6113
  readonly code = 6113
  readonly name = "EmergencyAlreadyActive"
  readonly msg =
    "emergency_pause: already active — re-pause not permitted (use emergency_resume first)"

  constructor(readonly logs?: string[]) {
    super(
      "6113: emergency_pause: already active — re-pause not permitted (use emergency_resume first)"
    )
  }
}

export class EmergencyNotActive extends Error {
  static readonly code = 6114
  readonly code = 6114
  readonly name = "EmergencyNotActive"
  readonly msg =
    "emergency_resume / cleanup_expired_emergency: emergency not active — nothing to clear"

  constructor(readonly logs?: string[]) {
    super(
      "6114: emergency_resume / cleanup_expired_emergency: emergency not active — nothing to clear"
    )
  }
}

export class EmergencyNotExpired extends Error {
  static readonly code = 6115
  readonly code = 6115
  readonly name = "EmergencyNotExpired"
  readonly msg =
    "cleanup_expired_emergency: 24h timelock window not yet elapsed — only emergency_resume by SKEW_AUTHORITY may clear early"

  constructor(readonly logs?: string[]) {
    super(
      "6115: cleanup_expired_emergency: 24h timelock window not yet elapsed — only emergency_resume by SKEW_AUTHORITY may clear early"
    )
  }
}

export class RfqMakerAlreadySlashed extends Error {
  static readonly code = 6116
  readonly code = 6116
  readonly name = "RfqMakerAlreadySlashed"
  readonly msg =
    "slash_rfq_maker: registry already slashable=true — duplicate slash not permitted"

  constructor(readonly logs?: string[]) {
    super(
      "6116: slash_rfq_maker: registry already slashable=true — duplicate slash not permitted"
    )
  }
}

export class BonusBelowExpected extends Error {
  static readonly code = 6117
  readonly code = 6117
  readonly name = "BonusBelowExpected"
  readonly msg =
    "liquidate: actual effective Dutch bonus bps fell below liquidator's min_expected_bonus_bps floor (race-condition front-run defense)"

  constructor(readonly logs?: string[]) {
    super(
      "6117: liquidate: actual effective Dutch bonus bps fell below liquidator's min_expected_bonus_bps floor (race-condition front-run defense)"
    )
  }
}

export class IncompletePositionAccounts extends Error {
  static readonly code = 6118
  readonly code = 6118
  readonly name = "IncompletePositionAccounts"
  readonly msg =
    "PM compute: walked OptionAccount count != cm.positions_count — caller must pass every CM-owned option PDA in remaining_accounts (silent IM under-count defense)"

  constructor(readonly logs?: string[]) {
    super(
      "6118: PM compute: walked OptionAccount count != cm.positions_count — caller must pass every CM-owned option PDA in remaining_accounts (silent IM under-count defense)"
    )
  }
}

export class ProposalAlreadyExecuted extends Error {
  static readonly code = 6119
  readonly code = 6119
  readonly name = "ProposalAlreadyExecuted"
  readonly msg =
    "governance_approve: proposal already executed — no further approvals accepted"

  constructor(readonly logs?: string[]) {
    super(
      "6119: governance_approve: proposal already executed — no further approvals accepted"
    )
  }
}

export class ProposalAlreadyApproved extends Error {
  static readonly code = 6120
  readonly code = 6120
  readonly name = "ProposalAlreadyApproved"
  readonly msg =
    "governance_approve: this member already recorded an approval on this proposal (duplicate-approval defense)"

  constructor(readonly logs?: string[]) {
    super(
      "6120: governance_approve: this member already recorded an approval on this proposal (duplicate-approval defense)"
    )
  }
}

export class InvalidStrike extends Error {
  static readonly code = 6121
  readonly code = 6121
  readonly name = "InvalidStrike"
  readonly msg =
    "create_option: strike not aligned to per-asset k_round_micro grid step"

  constructor(readonly logs?: string[]) {
    super(
      "6121: create_option: strike not aligned to per-asset k_round_micro grid step"
    )
  }
}

export class NotionalTooSmall extends Error {
  static readonly code = 6122
  readonly code = 6122
  readonly name = "NotionalTooSmall"
  readonly msg =
    "create_option: payoff × spot below per-asset min_position_usd_micro floor (dust position)"

  constructor(readonly logs?: string[]) {
    super(
      "6122: create_option: payoff × spot below per-asset min_position_usd_micro floor (dust position)"
    )
  }
}

export class CollateralMintAlreadyRegistered extends Error {
  static readonly code = 6123
  readonly code = 6123
  readonly name = "CollateralMintAlreadyRegistered"
  readonly msg = "collateral policy: mint already registered (duplicate)"

  constructor(readonly logs?: string[]) {
    super("6123: collateral policy: mint already registered (duplicate)")
  }
}

export class CollateralKindInvalid extends Error {
  static readonly code = 6124
  readonly code = 6124
  readonly name = "CollateralKindInvalid"
  readonly msg =
    "collateral policy: invalid kind discriminator (0=Stable, 1=Native, 2=LST)"

  constructor(readonly logs?: string[]) {
    super(
      "6124: collateral policy: invalid kind discriminator (0=Stable, 1=Native, 2=LST)"
    )
  }
}

export class CollateralMintNotAllowed extends Error {
  static readonly code = 6125
  readonly code = 6125
  readonly name = "CollateralMintNotAllowed"
  readonly msg =
    "collateral policy: settlement_mint not in allowlist (atomic_fill / buy_option / fill_rfq)"

  constructor(readonly logs?: string[]) {
    super(
      "6125: collateral policy: settlement_mint not in allowlist (atomic_fill / buy_option / fill_rfq)"
    )
  }
}

export class PositionAlreadyTracked extends Error {
  static readonly code = 6126
  readonly code = 6126
  readonly name = "PositionAlreadyTracked"
  readonly msg = "position registry: already tracking this option"

  constructor(readonly logs?: string[]) {
    super("6126: position registry: already tracking this option")
  }
}

export class PositionNotTracked extends Error {
  static readonly code = 6127
  readonly code = 6127
  readonly name = "PositionNotTracked"
  readonly msg = "position registry: option is not tracked by this CM"

  constructor(readonly logs?: string[]) {
    super("6127: position registry: option is not tracked by this CM")
  }
}

export class PositionRegistryFull extends Error {
  static readonly code = 6128
  readonly code = 6128
  readonly name = "PositionRegistryFull"
  readonly msg = "position registry: maximum PM-tracked positions reached"

  constructor(readonly logs?: string[]) {
    super("6128: position registry: maximum PM-tracked positions reached")
  }
}

export class BuilderFeesOutstanding extends Error {
  static readonly code = 6129
  readonly code = 6129
  readonly name = "BuilderFeesOutstanding"
  readonly msg =
    "builder code close: withdraw accrued builder fees before closing the builder PDA"

  constructor(readonly logs?: string[]) {
    super(
      "6129: builder code close: withdraw accrued builder fees before closing the builder PDA"
    )
  }
}

export class MakerQuoteOff extends Error {
  static readonly code = 6130
  readonly code = 6130
  readonly name = "MakerQuoteOff"
  readonly msg = "RFQ maker quote-off switch is active"

  constructor(readonly logs?: string[]) {
    super("6130: RFQ maker quote-off switch is active")
  }
}

export class MmpWindowExceeded extends Error {
  static readonly code = 6131
  readonly code = 6131
  readonly name = "MmpWindowExceeded"
  readonly msg = "RFQ maker MMP rolling-window limit exceeded"

  constructor(readonly logs?: string[]) {
    super("6131: RFQ maker MMP rolling-window limit exceeded")
  }
}

export class InvalidMakerRiskMode extends Error {
  static readonly code = 6132
  readonly code = 6132
  readonly name = "InvalidMakerRiskMode"
  readonly msg = "RFQ maker risk config mode out of range"

  constructor(readonly logs?: string[]) {
    super("6132: RFQ maker risk config mode out of range")
  }
}

export class InvalidTenorBucket extends Error {
  static readonly code = 6133
  readonly code = 6133
  readonly name = "InvalidTenorBucket"
  readonly msg =
    "expiry must match an allowlisted asset tenor bucket (1d / 7d / 14d / 28d / 90d)"

  constructor(readonly logs?: string[]) {
    super(
      "6133: expiry must match an allowlisted asset tenor bucket (1d / 7d / 14d / 28d / 90d)"
    )
  }
}

export class PmCacheDirty extends Error {
  static readonly code = 6134
  readonly code = 6134
  readonly name = "PmCacheDirty"
  readonly msg =
    "PM cache is dirty; run refresh_cm_risk_cache_full before using cached path"

  constructor(readonly logs?: string[]) {
    super(
      "6134: PM cache is dirty; run refresh_cm_risk_cache_full before using cached path"
    )
  }
}

export class PmCacheStale extends Error {
  static readonly code = 6135
  readonly code = 6135
  readonly name = "PmCacheStale"
  readonly msg =
    "PM cache is stale; run refresh_cm_risk_cache_full before using cached path"

  constructor(readonly logs?: string[]) {
    super(
      "6135: PM cache is stale; run refresh_cm_risk_cache_full before using cached path"
    )
  }
}

export class PmCacheRegistryMismatch extends Error {
  static readonly code = 6136
  readonly code = 6136
  readonly name = "PmCacheRegistryMismatch"
  readonly msg =
    "PM cache registry hash/count does not match the canonical position registry"

  constructor(readonly logs?: string[]) {
    super(
      "6136: PM cache registry hash/count does not match the canonical position registry"
    )
  }
}

export class PmCacheAuthorityMismatch extends Error {
  static readonly code = 6137
  readonly code = 6137
  readonly name = "PmCacheAuthorityMismatch"
  readonly msg = "PM cache CM/authority mismatch"

  constructor(readonly logs?: string[]) {
    super("6137: PM cache CM/authority mismatch")
  }
}

export class PmCacheModelMismatch extends Error {
  static readonly code = 6138
  readonly code = 6138
  readonly name = "PmCacheModelMismatch"
  readonly msg = "PM cache model version mismatch"

  constructor(readonly logs?: string[]) {
    super("6138: PM cache model version mismatch")
  }
}

export class TakeQuoteUnauthorized extends Error {
  static readonly code = 6139
  readonly code = 6139
  readonly name = "TakeQuoteUnauthorized"
  readonly msg =
    "take_best_quote signer is not the auction.buyer (only the auction registrant can take)"

  constructor(readonly logs?: string[]) {
    super(
      "6139: take_best_quote signer is not the auction.buyer (only the auction registrant can take)"
    )
  }
}

export class TakeQuoteNoMatchingQuote extends Error {
  static readonly code = 6140
  readonly code = 6140
  readonly name = "TakeQuoteNoMatchingQuote"
  readonly msg =
    "take_best_quote called on auction with no submitted quote (best_quote.mm == default)"

  constructor(readonly logs?: string[]) {
    super(
      "6140: take_best_quote called on auction with no submitted quote (best_quote.mm == default)"
    )
  }
}

export class TakeQuoteQuoteExpired extends Error {
  static readonly code = 6141
  readonly code = 6141
  readonly name = "TakeQuoteQuoteExpired"
  readonly msg =
    "take_best_quote best_quote.valid_until_slot has elapsed (re-submit / refresh required)"

  constructor(readonly logs?: string[]) {
    super(
      "6141: take_best_quote best_quote.valid_until_slot has elapsed (re-submit / refresh required)"
    )
  }
}

export class TakeQuotePriceMoved extends Error {
  static readonly code = 6142
  readonly code = 6142
  readonly name = "TakeQuotePriceMoved"
  readonly msg =
    "take_best_quote args.expected_premium_micro != current best_quote.premium (price moved during front-run window)"

  constructor(readonly logs?: string[]) {
    super(
      "6142: take_best_quote args.expected_premium_micro != current best_quote.premium (price moved during front-run window)"
    )
  }
}

export class RefreshQuoteNotOwnQuote extends Error {
  static readonly code = 6143
  readonly code = 6143
  readonly name = "RefreshQuoteNotOwnQuote"
  readonly msg =
    "refresh_quote: caller mm key != current auction.best_quote.mm (only own quote can be refreshed)"

  constructor(readonly logs?: string[]) {
    super(
      "6143: refresh_quote: caller mm key != current auction.best_quote.mm (only own quote can be refreshed)"
    )
  }
}

export class AxeInvalidBand extends Error {
  static readonly code = 6144
  readonly code = 6144
  readonly name = "AxeInvalidBand"
  readonly msg =
    "publish_axe / update_axe args band/asset/side/size validation failed: lo>hi, asset>4, side not in -1/0/+1, size==0, etc."

  constructor(readonly logs?: string[]) {
    super(
      "6144: publish_axe / update_axe args band/asset/side/size validation failed: lo>hi, asset>4, side not in -1/0/+1, size==0, etc."
    )
  }
}

export class AxeInvalidValidUntil extends Error {
  static readonly code = 6145
  readonly code = 6145
  readonly name = "AxeInvalidValidUntil"
  readonly msg =
    "publish_axe / update_axe valid_until / expiry_band_lo must exceed current unix_timestamp"

  constructor(readonly logs?: string[]) {
    super(
      "6145: publish_axe / update_axe valid_until / expiry_band_lo must exceed current unix_timestamp"
    )
  }
}

export class AxeReservedBitsSet extends Error {
  static readonly code = 6146
  readonly code = 6146
  readonly name = "AxeReservedBitsSet"
  readonly msg =
    "publish_axe / update_axe option_type_mask reserved bits 10..=15 must be zero"

  constructor(readonly logs?: string[]) {
    super(
      "6146: publish_axe / update_axe option_type_mask reserved bits 10..=15 must be zero"
    )
  }
}

export class AxeRevoked extends Error {
  static readonly code = 6147
  readonly code = 6147
  readonly name = "AxeRevoked"
  readonly msg =
    "update_axe: axe.revoked == true — re-publish required (close the PDA via revoke_axe first then publish_axe again)"

  constructor(readonly logs?: string[]) {
    super(
      "6147: update_axe: axe.revoked == true — re-publish required (close the PDA via revoke_axe first then publish_axe again)"
    )
  }
}

export class BuyerNotWhitelisted extends Error {
  static readonly code = 6148
  readonly code = 6148
  readonly name = "BuyerNotWhitelisted"
  readonly msg =
    "atomic_fill_from_relay: payload.buyer not in seller_cm whitelist (counterparty restriction active)"

  constructor(readonly logs?: string[]) {
    super(
      "6148: atomic_fill_from_relay: payload.buyer not in seller_cm whitelist (counterparty restriction active)"
    )
  }
}

export class BlockTradeNotionalTooSmall extends Error {
  static readonly code = 6149
  readonly code = 6149
  readonly name = "BlockTradeNotionalTooSmall"
  readonly msg =
    "finalize_rfq_auction / register_rfq_auction: block-trade flag set but notional below per-asset Rule 6.07 threshold"

  constructor(readonly logs?: string[]) {
    super(
      "6149: finalize_rfq_auction / register_rfq_auction: block-trade flag set but notional below per-asset Rule 6.07 threshold"
    )
  }
}

export class PositionLimitExceeded extends Error {
  static readonly code = 6150
  readonly code = 6150
  readonly name = "PositionLimitExceeded"
  readonly msg =
    "calculate_margin / atomic_fill_from_relay: per-asset short-position USD limit exceeded (Rule 12.01)"

  constructor(readonly logs?: string[]) {
    super(
      "6150: calculate_margin / atomic_fill_from_relay: per-asset short-position USD limit exceeded (Rule 12.01)"
    )
  }
}

export class PositionLimitAssetInvalid extends Error {
  static readonly code = 6151
  readonly code = 6151
  readonly name = "PositionLimitAssetInvalid"
  readonly msg =
    "governance_set_position_limit: asset_idx out of range (valid 0..=4 BTC/ETH/SOL/XRP/HYPE)"

  constructor(readonly logs?: string[]) {
    super(
      "6151: governance_set_position_limit: asset_idx out of range (valid 0..=4 BTC/ETH/SOL/XRP/HYPE)"
    )
  }
}

export class CmAccountSizeUnexpected extends Error {
  static readonly code = 6152
  readonly code = 6152
  readonly name = "CmAccountSizeUnexpected"
  readonly msg =
    "cm_realloc_v2: existing account data length is neither the pre-W2 144 B layout nor the post-W2 1176 B layout — refusing to migrate (corrupted account or wrong account passed)"

  constructor(readonly logs?: string[]) {
    super(
      "6152: cm_realloc_v2: existing account data length is neither the pre-W2 144 B layout nor the post-W2 1176 B layout — refusing to migrate (corrupted account or wrong account passed)"
    )
  }
}

export class MakerRateLimitExceeded extends Error {
  static readonly code = 6153
  readonly code = 6153
  readonly name = "MakerRateLimitExceeded"
  readonly msg =
    "submit_rfq_quote: Maker exceeded MAKER_RATE_LIMIT_MSG_PER_SLOT (100) quote-update messages within the current Solana slot (Rule 5.12 / MiFID II RTS 6 throttle)"

  constructor(readonly logs?: string[]) {
    super(
      "6153: submit_rfq_quote: Maker exceeded MAKER_RATE_LIMIT_MSG_PER_SLOT (100) quote-update messages within the current Solana slot (Rule 5.12 / MiFID II RTS 6 throttle)"
    )
  }
}

export class AuctionInsufficientMakers extends Error {
  static readonly code = 6154
  readonly code = 6154
  readonly name = "AuctionInsufficientMakers"
  readonly msg =
    "register_rfq_auction: block-trade / auction-lane RFQ broadcast must reach >= AUCTION_MIN_MAKERS (3) eligible Makers under separate beneficial ownership (Rule 5.21 / CFTC SEF Part 37 RFQ-3)"

  constructor(readonly logs?: string[]) {
    super(
      "6154: register_rfq_auction: block-trade / auction-lane RFQ broadcast must reach >= AUCTION_MIN_MAKERS (3) eligible Makers under separate beneficial ownership (Rule 5.21 / CFTC SEF Part 37 RFQ-3)"
    )
  }
}

export class CompressionInvariantBroken extends Error {
  static readonly code = 6155
  readonly code = 6155
  readonly name = "CompressionInvariantBroken"
  readonly msg =
    "compress_positions: Net-P/L invariant broken (sum of v0 × signed_qty before != after). Caller passed unmatched series, miscounted qty, or zero-qty leg (Rule 6.08 / HKEX OTC Clear compression cycle)"

  constructor(readonly logs?: string[]) {
    super(
      "6155: compress_positions: Net-P/L invariant broken (sum of v0 × signed_qty before != after). Caller passed unmatched series, miscounted qty, or zero-qty leg (Rule 6.08 / HKEX OTC Clear compression cycle)"
    )
  }
}

export class RecoveryThresholdNotMet extends Error {
  static readonly code = 6156
  readonly code = 6156
  readonly name = "RecoveryThresholdNotMet"
  readonly msg =
    "recovery_declare_trigger: VaultDrain arm — aggregate IF + protocol-fee balance not below RECOVERY_TRIGGER_USDC_MICRO (Rule 11A.01(i) Tᵉ = USDC 5,000,000)"

  constructor(readonly logs?: string[]) {
    super(
      "6156: recovery_declare_trigger: VaultDrain arm — aggregate IF + protocol-fee balance not below RECOVERY_TRIGGER_USDC_MICRO (Rule 11A.01(i) Tᵉ = USDC 5,000,000)"
    )
  }
}

export class RecoveryCommitteeQuorumMissing extends Error {
  static readonly code = 6157
  readonly code = 6157
  readonly name = "RecoveryCommitteeQuorumMissing"
  readonly msg =
    "recovery_declare_trigger: CommitteeDetermination arm — Methodology Committee quorum invariant not satisfied (Rule 10.13 floor: ≥3 members, ≥1 independent)"

  constructor(readonly logs?: string[]) {
    super(
      "6157: recovery_declare_trigger: CommitteeDetermination arm — Methodology Committee quorum invariant not satisfied (Rule 10.13 floor: ≥3 members, ≥1 independent)"
    )
  }
}

export class RecoveryNotActive extends Error {
  static readonly code = 6158
  readonly code = 6158
  readonly name = "RecoveryNotActive"
  readonly msg =
    "recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: no active recovery cycle (call recovery_declare_trigger first)"

  constructor(readonly logs?: string[]) {
    super(
      "6158: recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: no active recovery cycle (call recovery_declare_trigger first)"
    )
  }
}

export class RecoverySnapshotAlreadyPublished extends Error {
  static readonly code = 6159
  readonly code = 6159
  readonly name = "RecoverySnapshotAlreadyPublished"
  readonly msg =
    "recovery_publish_snapshot: snapshot already published for the active recovery cycle (Rule 11A.02 once-per-cycle)"

  constructor(readonly logs?: string[]) {
    super(
      "6159: recovery_publish_snapshot: snapshot already published for the active recovery cycle (Rule 11A.02 once-per-cycle)"
    )
  }
}

export class RecoverySnapshotDeadlineExceeded extends Error {
  static readonly code = 6160
  readonly code = 6160
  readonly name = "RecoverySnapshotDeadlineExceeded"
  readonly msg =
    "recovery_publish_snapshot: more than one (1) Solana epoch elapsed since recovery_declare_trigger (Rule 11A.02 publication deadline)"

  constructor(readonly logs?: string[]) {
    super(
      "6160: recovery_publish_snapshot: more than one (1) Solana epoch elapsed since recovery_declare_trigger (Rule 11A.02 publication deadline)"
    )
  }
}

export class RecoveryPauseNotActive extends Error {
  static readonly code = 6161
  readonly code = 6161
  readonly name = "RecoveryPauseNotActive"
  readonly msg =
    "recovery_publish_snapshot: emergency_pause is not active (Rule 11A.02 requires emergency_pause to be invoked alongside the snapshot)"

  constructor(readonly logs?: string[]) {
    super(
      "6161: recovery_publish_snapshot: emergency_pause is not active (Rule 11A.02 requires emergency_pause to be invoked alongside the snapshot)"
    )
  }
}

export class RecoverySnapshotMissing extends Error {
  static readonly code = 6162
  readonly code = 6162
  readonly name = "RecoverySnapshotMissing"
  readonly msg =
    "recovery_apply_vmgh / recovery_partial_tear_up: snapshot not yet published (Rule 11A.02 ordering — snapshot must precede recovery tools)"

  constructor(readonly logs?: string[]) {
    super(
      "6162: recovery_apply_vmgh / recovery_partial_tear_up: snapshot not yet published (Rule 11A.02 ordering — snapshot must precede recovery tools)"
    )
  }
}

export class RecoveryVmghCapExceeded extends Error {
  static readonly code = 6163
  readonly code = 6163
  readonly name = "RecoveryVmghCapExceeded"
  readonly msg =
    "recovery_apply_vmgh: haircut_bps must be in (0, VMGH_HAIRCUT_CAP_BPS = 5_000] (Rule 11A.03(i) 50% cap)"

  constructor(readonly logs?: string[]) {
    super(
      "6163: recovery_apply_vmgh: haircut_bps must be in (0, VMGH_HAIRCUT_CAP_BPS = 5_000] (Rule 11A.03(i) 50% cap)"
    )
  }
}

export class RecoveryTearUpCapExceeded extends Error {
  static readonly code = 6164
  readonly code = 6164
  readonly name = "RecoveryTearUpCapExceeded"
  readonly msg =
    "recovery_partial_tear_up: tear_up_bps must be in (0, TEAR_UP_PER_CYCLE_CAP_BPS = 2_500] (Rule 11A.03(ii) 25% per-cycle cap)"

  constructor(readonly logs?: string[]) {
    super(
      "6164: recovery_partial_tear_up: tear_up_bps must be in (0, TEAR_UP_PER_CYCLE_CAP_BPS = 2_500] (Rule 11A.03(ii) 25% per-cycle cap)"
    )
  }
}

export class RecoveryProtocolFeeMismatch extends Error {
  static readonly code = 6165
  readonly code = 6165
  readonly name = "RecoveryProtocolFeeMismatch"
  readonly msg =
    "recovery_declare_trigger: caller-supplied protocol_fee_balance_micro does not match on-chain sum of fee_accumulator PDAs threaded as remaining_accounts (IOSCO RRP 2017 §3.4 — trigger inputs must be verifiable, objective)"

  constructor(readonly logs?: string[]) {
    super(
      "6165: recovery_declare_trigger: caller-supplied protocol_fee_balance_micro does not match on-chain sum of fee_accumulator PDAs threaded as remaining_accounts (IOSCO RRP 2017 §3.4 — trigger inputs must be verifiable, objective)"
    )
  }
}

export class RecoveryTearUpCycleLimitReached extends Error {
  static readonly code = 6166
  readonly code = 6166
  readonly name = "RecoveryTearUpCycleLimitReached"
  readonly msg =
    "recovery_partial_tear_up: cycle already used its tear-up. PROTOCOL.md §11A.03(ii) caps tear-up at 25% in a SINGLE tear-up cycle (singular). If the first tear-up is insufficient to restore solvency, escalate to §11A.04 resolution boundary (full wind-down) — do not iterate 'partial' calls. MAX_TEAR_UPS_PER_CYCLE = 1."

  constructor(readonly logs?: string[]) {
    super(
      "6166: recovery_partial_tear_up: cycle already used its tear-up. PROTOCOL.md §11A.03(ii) caps tear-up at 25% in a SINGLE tear-up cycle (singular). If the first tear-up is insufficient to restore solvency, escalate to §11A.04 resolution boundary (full wind-down) — do not iterate 'partial' calls. MAX_TEAR_UPS_PER_CYCLE = 1."
    )
  }
}

export class DigestReplayed extends Error {
  static readonly code = 6167
  readonly code = 6167
  readonly name = "DigestReplayed"
  readonly msg =
    "recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: incoming digest equals the last accepted digest in this active cycle — replay rejected (F-RECOV-2). Submit a fresh off-chain snapshot or escalate to a new cycle."

  constructor(readonly logs?: string[]) {
    super(
      "6167: recovery_publish_snapshot / recovery_apply_vmgh / recovery_partial_tear_up: incoming digest equals the last accepted digest in this active cycle — replay rejected (F-RECOV-2). Submit a fresh off-chain snapshot or escalate to a new cycle."
    )
  }
}

export class RecoveryDeterminationMissing extends Error {
  static readonly code = 6168
  readonly code = 6168
  readonly name = "RecoveryDeterminationMissing"
  readonly msg =
    "recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda missing or not in Executed status (F-RECOV-3 / IOSCO RRP 2017 §3.4 verifiable input). Propose + queue + execute via propose_recovery_determination → execute_recovery_determination first."

  constructor(readonly logs?: string[]) {
    super(
      "6168: recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda missing or not in Executed status (F-RECOV-3 / IOSCO RRP 2017 §3.4 verifiable input). Propose + queue + execute via propose_recovery_determination → execute_recovery_determination first."
    )
  }
}

export class RecoveryDeterminationStale extends Error {
  static readonly code = 6169
  readonly code = 6169
  readonly name = "RecoveryDeterminationStale"
  readonly msg =
    "recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda was executed more than RECOVERY_DETERMINATION_VALID_WINDOW_SLOTS (≈24h) ago. Stale determinations are rejected — re-propose to refresh the on-chain governance attestation (F-RECOV-3)."

  constructor(readonly logs?: string[]) {
    super(
      "6169: recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda was executed more than RECOVERY_DETERMINATION_VALID_WINDOW_SLOTS (≈24h) ago. Stale determinations are rejected — re-propose to refresh the on-chain governance attestation (F-RECOV-3)."
    )
  }
}

export class RecoveryDeterminationKindMismatch extends Error {
  static readonly code = 6170
  readonly code = 6170
  readonly name = "RecoveryDeterminationKindMismatch"
  readonly msg =
    "recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda.trigger_kind does not match the trigger_kind argument passed to recovery_declare_trigger (F-RECOV-3 cross-binding)."

  constructor(readonly logs?: string[]) {
    super(
      "6170: recovery_declare_trigger: CommitteeDetermination arm — RecoveryDeterminationPda.trigger_kind does not match the trigger_kind argument passed to recovery_declare_trigger (F-RECOV-3 cross-binding)."
    )
  }
}

export class RecoveryDrainedVaultMismatch extends Error {
  static readonly code = 6171
  readonly code = 6171
  readonly name = "RecoveryDrainedVaultMismatch"
  readonly msg =
    "recovery_apply_vmgh: drained_vault token account is not owned by the SPL Token program, has the wrong mint, or its address does not derive from [RECOVERY_DRAINED_VAULT_SEED, mint] under this program (F-RECOV-4 SPL mutation invariant)"

  constructor(readonly logs?: string[]) {
    super(
      "6171: recovery_apply_vmgh: drained_vault token account is not owned by the SPL Token program, has the wrong mint, or its address does not derive from [RECOVERY_DRAINED_VAULT_SEED, mint] under this program (F-RECOV-4 SPL mutation invariant)"
    )
  }
}

export class RecoveryVmghMintMismatch extends Error {
  static readonly code = 6172
  readonly code = 6172
  readonly name = "RecoveryVmghMintMismatch"
  readonly msg =
    "recovery_apply_vmgh: fee_accumulator + drained_vault mints differ — VMGH drain must move USDC into a same-mint treasury PDA (F-RECOV-4)"

  constructor(readonly logs?: string[]) {
    super(
      "6172: recovery_apply_vmgh: fee_accumulator + drained_vault mints differ — VMGH drain must move USDC into a same-mint treasury PDA (F-RECOV-4)"
    )
  }
}

export class RecoveryTearUpCmMismatch extends Error {
  static readonly code = 6173
  readonly code = 6173
  readonly name = "RecoveryTearUpCmMismatch"
  readonly msg =
    "recovery_partial_tear_up: ClearingMemberAccount threaded through remaining_accounts is not owned by skew-master program, has the wrong discriminator, or its PDA address does not derive from [CM_SEED, authority] (F-RECOV-4 option-balance mutation invariant)"

  constructor(readonly logs?: string[]) {
    super(
      "6173: recovery_partial_tear_up: ClearingMemberAccount threaded through remaining_accounts is not owned by skew-master program, has the wrong discriminator, or its PDA address does not derive from [CM_SEED, authority] (F-RECOV-4 option-balance mutation invariant)"
    )
  }
}

export class RecoveryTearUpEmptyScope extends Error {
  static readonly code = 6174
  readonly code = 6174
  readonly name = "RecoveryTearUpEmptyScope"
  readonly msg =
    "recovery_partial_tear_up: at least one ClearingMemberAccount must be threaded through remaining_accounts — caller passed an empty scope. The §11A.03(ii) tear-up is a deterministic on-chain instruction; an empty scope would be a no-op masquerading as a tear-up."

  constructor(readonly logs?: string[]) {
    super(
      "6174: recovery_partial_tear_up: at least one ClearingMemberAccount must be threaded through remaining_accounts — caller passed an empty scope. The §11A.03(ii) tear-up is a deterministic on-chain instruction; an empty scope would be a no-op masquerading as a tear-up."
    )
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new ExpiryTooSoon(logs)
    case 6001:
      return new ExpiryTooFar(logs)
    case 6002:
      return new StrikeZero(logs)
    case 6003:
      return new PayoffZero(logs)
    case 6004:
      return new InvalidState(logs)
    case 6005:
      return new CollateralMismatch(logs)
    case 6006:
      return new InvalidSettlementMint(logs)
    case 6007:
      return new UnsupportedOptionType(logs)
    case 6008:
      return new PremiumZero(logs)
    case 6009:
      return new PythFeedInvalid(logs)
    case 6010:
      return new PythPriceStale(logs)
    case 6011:
      return new PythConfidence(logs)
    case 6012:
      return new InvalidPayoffAddress(logs)
    case 6013:
      return new RfqNotOpen(logs)
    case 6014:
      return new RfqSpecMismatch(logs)
    case 6015:
      return new RangeUpperBoundInvalid(logs)
    case 6016:
      return new CloseNotYetEligible(logs)
    case 6017:
      return new PremiumExceedsMax(logs)
    case 6018:
      return new InvalidHolderAta(logs)
    case 6019:
      return new HolderMismatch(logs)
    case 6020:
      return new NotCurrentHolder(logs)
    case 6021:
      return new GracePeriodNotElapsed(logs)
    case 6022:
      return new SettleWindowExpired(logs)
    case 6023:
      return new OptionNotCancellable(logs)
    case 6024:
      return new SettleNormalWindowExpired(logs)
    case 6025:
      return new SettleWindowStillOpen(logs)
    case 6026:
      return new Unauthorized(logs)
    case 6027:
      return new NotPrimeAccount(logs)
    case 6028:
      return new MaxPositionsExceeded(logs)
    case 6029:
      return new OptionIsITM(logs)
    case 6030:
      return new PayoffExceedsLimit(logs)
    case 6031:
      return new InvalidSigmaIv(logs)
    case 6032:
      return new InsufficientMargin(logs)
    case 6033:
      return new InvalidPositionAccount(logs)
    case 6034:
      return new InsolvencyCascade(logs)
    case 6035:
      return new ThresholdNotMet(logs)
    case 6036:
      return new SignatureTooOld(logs)
    case 6037:
      return new TimelockNotElapsed(logs)
    case 6038:
      return new WithdrawalTooFast(logs)
    case 6039:
      return new WithdrawalCeilingExceeded(logs)
    case 6040:
      return new NotionalOutOfBand(logs)
    case 6041:
      return new MoneynessOutOfBand(logs)
    case 6042:
      return new SigmaOutOfBand(logs)
    case 6043:
      return new GammaFreezeActive(logs)
    case 6044:
      return new CMNotRegistered(logs)
    case 6045:
      return new IFTierExhausted(logs)
    case 6046:
      return new ConcentrationCapExceeded(logs)
    case 6047:
      return new UnsupportedAsset(logs)
    case 6048:
      return new CmInsufficientCollateral(logs)
    case 6049:
      return new CmUnderLiquidation(logs)
    case 6050:
      return new InvalidDirection(logs)
    case 6051:
      return new InvalidExtraParam(logs)
    case 6052:
      return new BoundaryImViolation(logs)
    case 6053:
      return new ProtocolSitgDrained(logs)
    case 6054:
      return new WaterfallTierInvalid(logs)
    case 6055:
      return new A1Reserved1(logs)
    case 6056:
      return new A1Reserved2(logs)
    case 6057:
      return new A1Reserved3(logs)
    case 6058:
      return new A1Reserved4(logs)
    case 6059:
      return new A1Reserved5(logs)
    case 6060:
      return new OracleDivergence(logs)
    case 6061:
      return new StaleOracle(logs)
    case 6062:
      return new ConfidenceTooHigh(logs)
    case 6063:
      return new CushionInterp(logs)
    case 6064:
      return new DutchAuctionNotStarted(logs)
    case 6065:
      return new PartialCloseFactorExceeded(logs)
    case 6066:
      return new SustainedBreachPending(logs)
    case 6067:
      return new TwapWindowEmpty(logs)
    case 6068:
      return new UnauthorizedRelayPayload(logs)
    case 6069:
      return new AuctionNotOpen(logs)
    case 6070:
      return new AuctionInvalidPrice(logs)
    case 6071:
      return new SelfLiquidationForbidden(logs)
    case 6072:
      return new RatioNotRestored(logs)
    case 6073:
      return new PythNotStaleEnough(logs)
    case 6074:
      return new MultiVenueFallbackForbidden(logs)
    case 6075:
      return new AdlClawbackCapExceeded(logs)
    case 6076:
      return new ProtocolFallbackTooEarly(logs)
    case 6077:
      return new SsviButterflyViolation(logs)
    case 6078:
      return new A2Reserved11(logs)
    case 6079:
      return new A2Reserved12(logs)
    case 6080:
      return new TierMustIncrease(logs)
    case 6081:
      return new TierMustDecrease(logs)
    case 6082:
      return new InsufficientLockupCollateral(logs)
    case 6083:
      return new TierLockupNotExpired(logs)
    case 6084:
      return new TierChangeForbiddenInLiquidation(logs)
    case 6085:
      return new UnsupportedTier(logs)
    case 6086:
      return new BuilderVolumeInsufficient(logs)
    case 6087:
      return new MakerRebateInactive(logs)
    case 6088:
      return new VolumeTrackerAuthorityMismatch(logs)
    case 6089:
      return new BuilderLabelInvalid(logs)
    case 6090:
      return new BuilderFeesUnderflow(logs)
    case 6091:
      return new MakerRebatePhaseOutOfRange(logs)
    case 6092:
      return new HamiltonStateMissing(logs)
    case 6093:
      return new OracleConfidenceTooWide(logs)
    case 6094:
      return new ConditionalOrderNotActive(logs)
    case 6095:
      return new ConditionalTriggerNotMet(logs)
    case 6096:
      return new ConditionalGraceNotElapsed(logs)
    case 6097:
      return new ConditionalOrderExpired(logs)
    case 6098:
      return new ConditionalSlippageRejected(logs)
    case 6099:
      return new OcoLinkMismatch(logs)
    case 6100:
      return new RfqAuctionNotOpen(logs)
    case 6101:
      return new RfqAuctionClosed(logs)
    case 6102:
      return new RfqQuoteNotBetter(logs)
    case 6103:
      return new RfqQuoteValidityShort(logs)
    case 6104:
      return new RfqMakerNotRegistered(logs)
    case 6105:
      return new RfqMakerDepositInsufficient(logs)
    case 6106:
      return new RfqQuoteSignatureInvalid(logs)
    case 6107:
      return new ComboLegIndexOutOfRange(logs)
    case 6108:
      return new ComboLegCountInvalid(logs)
    case 6109:
      return new ComboLegAlreadyFilled(logs)
    case 6110:
      return new ComboIntentV2Expired(logs)
    case 6111:
      return new ReplenishCapExceeded(logs)
    case 6112:
      return new LtvCapExceeded(logs)
    case 6113:
      return new EmergencyAlreadyActive(logs)
    case 6114:
      return new EmergencyNotActive(logs)
    case 6115:
      return new EmergencyNotExpired(logs)
    case 6116:
      return new RfqMakerAlreadySlashed(logs)
    case 6117:
      return new BonusBelowExpected(logs)
    case 6118:
      return new IncompletePositionAccounts(logs)
    case 6119:
      return new ProposalAlreadyExecuted(logs)
    case 6120:
      return new ProposalAlreadyApproved(logs)
    case 6121:
      return new InvalidStrike(logs)
    case 6122:
      return new NotionalTooSmall(logs)
    case 6123:
      return new CollateralMintAlreadyRegistered(logs)
    case 6124:
      return new CollateralKindInvalid(logs)
    case 6125:
      return new CollateralMintNotAllowed(logs)
    case 6126:
      return new PositionAlreadyTracked(logs)
    case 6127:
      return new PositionNotTracked(logs)
    case 6128:
      return new PositionRegistryFull(logs)
    case 6129:
      return new BuilderFeesOutstanding(logs)
    case 6130:
      return new MakerQuoteOff(logs)
    case 6131:
      return new MmpWindowExceeded(logs)
    case 6132:
      return new InvalidMakerRiskMode(logs)
    case 6133:
      return new InvalidTenorBucket(logs)
    case 6134:
      return new PmCacheDirty(logs)
    case 6135:
      return new PmCacheStale(logs)
    case 6136:
      return new PmCacheRegistryMismatch(logs)
    case 6137:
      return new PmCacheAuthorityMismatch(logs)
    case 6138:
      return new PmCacheModelMismatch(logs)
    case 6139:
      return new TakeQuoteUnauthorized(logs)
    case 6140:
      return new TakeQuoteNoMatchingQuote(logs)
    case 6141:
      return new TakeQuoteQuoteExpired(logs)
    case 6142:
      return new TakeQuotePriceMoved(logs)
    case 6143:
      return new RefreshQuoteNotOwnQuote(logs)
    case 6144:
      return new AxeInvalidBand(logs)
    case 6145:
      return new AxeInvalidValidUntil(logs)
    case 6146:
      return new AxeReservedBitsSet(logs)
    case 6147:
      return new AxeRevoked(logs)
    case 6148:
      return new BuyerNotWhitelisted(logs)
    case 6149:
      return new BlockTradeNotionalTooSmall(logs)
    case 6150:
      return new PositionLimitExceeded(logs)
    case 6151:
      return new PositionLimitAssetInvalid(logs)
    case 6152:
      return new CmAccountSizeUnexpected(logs)
    case 6153:
      return new MakerRateLimitExceeded(logs)
    case 6154:
      return new AuctionInsufficientMakers(logs)
    case 6155:
      return new CompressionInvariantBroken(logs)
    case 6156:
      return new RecoveryThresholdNotMet(logs)
    case 6157:
      return new RecoveryCommitteeQuorumMissing(logs)
    case 6158:
      return new RecoveryNotActive(logs)
    case 6159:
      return new RecoverySnapshotAlreadyPublished(logs)
    case 6160:
      return new RecoverySnapshotDeadlineExceeded(logs)
    case 6161:
      return new RecoveryPauseNotActive(logs)
    case 6162:
      return new RecoverySnapshotMissing(logs)
    case 6163:
      return new RecoveryVmghCapExceeded(logs)
    case 6164:
      return new RecoveryTearUpCapExceeded(logs)
    case 6165:
      return new RecoveryProtocolFeeMismatch(logs)
    case 6166:
      return new RecoveryTearUpCycleLimitReached(logs)
    case 6167:
      return new DigestReplayed(logs)
    case 6168:
      return new RecoveryDeterminationMissing(logs)
    case 6169:
      return new RecoveryDeterminationStale(logs)
    case 6170:
      return new RecoveryDeterminationKindMismatch(logs)
    case 6171:
      return new RecoveryDrainedVaultMismatch(logs)
    case 6172:
      return new RecoveryVmghMintMismatch(logs)
    case 6173:
      return new RecoveryTearUpCmMismatch(logs)
    case 6174:
      return new RecoveryTearUpEmptyScope(logs)
  }

  return null
}
