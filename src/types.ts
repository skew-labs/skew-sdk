import type { PublicKey } from "@solana/web3.js";

/**
 * 5-asset Iron Law launch panel (AGENT-PROTOCOL Article 7).
 * Mirrors anchor `state::asset::Asset` enum (BTC=0, ETH=1, SOL=2, XRP=3, HYPE=4).
 * Other symbols are rejected at the anchor instruction layer.
 */
export type Underlying = "BTC" | "ETH" | "SOL" | "XRP" | "HYPE";

/**
 * Anchor IDL has only 3 OptionType variants (Digital / CappedVanilla / RangeAccrual)
 * after the Decision-32 OneTouch DROP. The SDK exposes seven user-friendly payoff
 * names that map onto (option_type, direction, extra_param) triples. See
 * `mapPayoffToAnchor` in `pda.ts` for the mapping table.
 *
 * @example
 *   "digital_call"   → option_type=Digital,        direction=+1
 *   "vanilla_put"    → option_type=CappedVanilla,  direction=-1, extra_param=0 (uncapped floor)
 *   "capped_call"    → option_type=CappedVanilla,  direction=+1, extra_param=K_cap
 *   "range_accrual"  → option_type=RangeAccrual,   direction=+1, extra_param=upper_bound
 */
export type PayoffType =
  | "digital_call"
  | "digital_put"
  | "vanilla_call"
  | "vanilla_put"
  | "capped_call"
  | "capped_put"
  | "range_accrual";

/**
 * Buy / sell direction. Encoded on-chain as i8 (+1 for buy, -1 for sell).
 * If omitted in CreateParams, the SDK derives it from the PayoffType
 * (e.g. "digital_put" implies "sell").
 */
export type Direction = "buy" | "sell";

/**
 * Human-readable params for `SkewClient.create()`. All units are USD / ISO dates.
 *
 * Anchor `create_option` v2.1 takes 12 args. The SDK derives the wire-level
 * args from these high-level fields:
 *   - `underlying`        → asset: u8 (5-asset enum index)
 *   - `payoff`            → option_type + (default) direction
 *   - `strike`            → strike: u64 (USD × 10^8 per Pyth expo)
 *   - `expiry`            → expiry_ts: i64 (unix seconds)
 *   - `notional`          → payoff_amount: u64 (USDC × 10^6)
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
  /** Max payoff in USD (e.g. 1000 for $1,000 USDC). */
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
}

export interface BuyParams {
  /** Option PDA address string or PublicKey. */
  option: string | PublicKey;
  /** Premium the buyer is willing to pay in USD. Must be ≥ option's listed premium. */
  premiumUsd: number;
}

export interface BuyResult {
  txSignature: string;
}

export interface SettleResult {
  txSignature: string;
  /** ITM payoff paid to holder, in USD (0 if OTM). */
  payoffUsd: number;
}

/**
 * Params for `SkewClient.registerClearingMember()`. Phase 1 permissionless —
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
  /** register_clearing_member transaction signature. */
  txSignature: string;
}

/** Result of any single-tx mutation (transfer, cancel, close, collateral). */
export interface TxResult {
  txSignature: string;
}

/**
 * Read-only result of `calculate_margin`. Mirrors anchor `MarginCalcResult`
 * (master paper §10 PM v1.4 IM formula breakdown).
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
  /** Total IM locked across positions, USDC × 10^6. */
  imLockedUsdcMicro: bigint;
  /** Free collateral = collateral - im_locked, USDC × 10^6. */
  freeCollateralUsdcMicro: bigint;
}
