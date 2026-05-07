import { PublicKey } from "@solana/web3.js";
import { sha256 } from "@noble/hashes/sha256";
import type { CreateParams, Direction, PayoffType, Underlying } from "./types";

export const SKEW_PROGRAM_ID = new PublicKey("3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK");

// ---------------------------------------------------------------------------
// Pyth devnet push-oracle feeds (launch panel).
// Devnet-frozen builds still use the 111... sentinel for HYPE because there is
// no devnet push account; the live Hermes pull feed is wired below for spot
// stamps, pricing, MCP, and terminal data.
// ---------------------------------------------------------------------------
const PYTH_DEVNET_FEEDS: Record<Underlying, string> = {
  BTC: "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J",
  ETH: "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw",
  SOL: "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix",
  XRP: "Hr1bjp5Ux8ezmNJ3ZH4kHk52R2hSzEUtX84mr7CG6jip",
  HYPE: "11111111111111111111111111111111", // Devnet-frozen sentinel; Hermes pull feed is live
};

// Hermes REST symbol IDs for spot price fetch (V0 stamp default).
const HERMES_FEED_IDS: Record<Underlying, string> = {
  BTC: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  SOL: "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
  XRP: "ec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8",
  HYPE: "4279e31cc369bbcc2faf022b382b080e32a8e689ff20fbc530d2a603eb6cd98b",
};

/** Default annualized σ used as the V0 stamp when caller doesn't supply one. */
export const ASSET_DEFAULT_SIGMA: Record<Underlying, number> = {
  BTC: 0.45,
  ETH: 0.65,
  SOL: 0.8,
  XRP: 0.75,
  HYPE: 0.85,
};

/** Resolve the Pyth feed PublicKey for a launch-panel asset. */
export function resolvePythFeed(underlying: Underlying): PublicKey {
  return new PublicKey(PYTH_DEVNET_FEEDS[underlying]);
}

/**
 * Map a launch-panel symbol to its anchor `state::asset::Asset` enum index.
 * BTC=0, ETH=1, SOL=2, XRP=3, HYPE=4 (launch list).
 */
export function assetEnumIndex(underlying: Underlying): number {
  const idx = { BTC: 0, ETH: 1, SOL: 2, XRP: 3, HYPE: 4 }[underlying];
  if (idx === undefined) throw new Error(`Unsupported asset: ${underlying}`);
  return idx;
}

// ---------------------------------------------------------------------------
// Expiry tenor policy.
//
// The on-chain AssetParams validator does not accept arbitrary expiries.
// Bots should build expiries from these helpers instead of hand-rolling
// `Date.now() + hours`, especially around the +/-1h boundary.
// ---------------------------------------------------------------------------

export const STANDARD_TENOR_DAYS = [1, 7, 14, 28, 90] as const;
export type StandardTenorDays = (typeof STANDARD_TENOR_DAYS)[number];
export const TENOR_TOLERANCE_SECONDS = 3_600;

export const SKEW_ALLOWED_TENORS_BY_UNDERLYING: Record<
  Underlying,
  readonly StandardTenorDays[]
> = {
  BTC: [1, 7, 14, 28, 90],
  ETH: [1, 7, 14, 28, 90],
  SOL: [1, 7, 14, 28, 90],
  XRP: [7, 14, 28],
  HYPE: [1, 7, 14, 28],
};

export interface AssertExpiryTenorOptions {
  nowSeconds?: number;
  context?: string;
}

function formatDeltaSeconds(deltaSeconds: number): string {
  if (Math.abs(deltaSeconds) < 72 * 3_600) {
    return `${(deltaSeconds / 3_600).toFixed(2)}h`;
  }
  return `${(deltaSeconds / 86_400).toFixed(2)}d`;
}

function tenorLabel(days: readonly StandardTenorDays[]): string {
  return days.map((d) => `${d}d`).join("/");
}

/**
 * Return an ISO timestamp exactly N standard tenor days from now.
 *
 * Use this in bots instead of `Date.now() + hours`. For example:
 *
 * ```ts
 * const expiry = expiryFromTenorDays(7);
 * await skew.create({ underlying: "BTC", expiry, ... });
 * ```
 */
export function expiryFromTenorDays(days: StandardTenorDays, nowMs = Date.now()): string {
  return new Date(Number(expiryTsFromTenorDays(days, nowMs)) * 1000).toISOString();
}

/**
 * Return unix seconds exactly N standard tenor days from now.
 *
 * This is the safer helper for low-level RFQ structs where Anchor expects
 * `expiryTs: bigint`. Do not pass `Date.now()` milliseconds to those fields.
 */
export function expiryTsFromTenorDays(days: StandardTenorDays, nowMs = Date.now()): bigint {
  if (!STANDARD_TENOR_DAYS.includes(days)) {
    throw new Error(`Unsupported Skew tenor: ${days}d`);
  }
  const nowSeconds = Math.floor(nowMs / 1000);
  return BigInt(nowSeconds + days * 86_400);
}

/**
 * SDK preflight for the on-chain AssetParams tenor buckets.
 *
 * Returns the matched tenor day. Throws before a transaction is built if the
 * expiry is off-bucket, so bots see a precise SDK error instead of an Anchor
 * simulation failure such as `6001`.
 */
export function assertExpiryTenor(
  underlyingOrAsset: Underlying | number,
  expiryTs: bigint | number,
  options: AssertExpiryTenorOptions = {},
): StandardTenorDays {
  const context = options.context ?? "expiry";
  const underlying =
    typeof underlyingOrAsset === "number"
      ? indexToUnderlying(underlyingOrAsset)
      : underlyingOrAsset;
  if (!underlying) {
    throw new Error(`${context}: unsupported asset index ${underlyingOrAsset}`);
  }

  const expirySeconds = Number(expiryTs);
  if (!Number.isFinite(expirySeconds) || !Number.isSafeInteger(expirySeconds)) {
    throw new Error(`${context}: invalid unix expiry seconds ${String(expiryTs)}`);
  }
  if (expirySeconds > 10_000_000_000) {
    throw new Error(
      `${context}: expiryTs looks like milliseconds. Anchor expects unix seconds; ` +
        `use isoToUnixSeconds(iso) or expiryTsFromTenorDays(1 | 7 | 14 | 28 | 90).`,
    );
  }

  const nowSeconds = options.nowSeconds ?? Math.floor(Date.now() / 1000);
  const deltaSeconds = expirySeconds - nowSeconds;
  if (deltaSeconds <= 0) {
    throw new Error(`${context}: expiry must be in the future`);
  }

  const allowed = SKEW_ALLOWED_TENORS_BY_UNDERLYING[underlying];
  for (const days of allowed) {
    const targetSeconds = days * 86_400;
    if (Math.abs(deltaSeconds - targetSeconds) <= TENOR_TOLERANCE_SECONDS) {
      return days;
    }
  }

  const nearest = allowed.reduce((best, days) => {
    const diff = Math.abs(deltaSeconds - days * 86_400);
    return diff < best.diff ? { days, diff } : best;
  }, { days: allowed[0], diff: Number.POSITIVE_INFINITY });

  throw new Error(
    `${context}: ${underlying} expiry is ${formatDeltaSeconds(deltaSeconds)} from now, ` +
      `but this deployment only accepts ${tenorLabel(allowed)} buckets ` +
      `(±${TENOR_TOLERANCE_SECONDS / 60}m). ` +
      `Nearest bucket is ${nearest.days}d; build bot expiries with ` +
      `expiryFromTenorDays(${nearest.days}).`,
  );
}

/** Encode buy/sell direction as the anchor wire i8 (+1 / -1). */
export function directionToI8(direction: Direction): number {
  return direction === "buy" ? 1 : -1;
}

// ---------------------------------------------------------------------------
// PayoffType → anchor OptionType + direction + extra_param mapping
//
// Anchor IDL `OptionType` has 6 storage variants after the inverse-family
// addition. The SDK's 11 user-friendly payoff names map onto
// (option_type, default direction, extra_param) triples here.
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnchorOptionType = Record<string, any>;

export interface PayoffMapping {
  optionType: AnchorOptionType;
  defaultDirection: Direction;
  extraParam(params: CreateParams): number;
}

const PAYOFF_TABLE: Record<PayoffType, PayoffMapping> = {
  digital_call: {
    optionType: { digital: {} },
    defaultDirection: "buy",
    extraParam: () => 0,
  },
  digital_put: {
    optionType: { digital: {} },
    defaultDirection: "sell",
    extraParam: () => 0,
  },
  vanilla_call: {
    // Phase 2 (2026-05-04): on-chain `Vanilla` is its own enum variant — route
    // here directly instead of `cappedVanilla` with extra_param=0. Critical:
    // pre-Phase-2 mapping mis-routed all vanilla writes to CappedVanilla → IM
    // model picked Theorem 1 (bounded) instead of ScanRisk-only (Vanilla short
    // call unbounded), under-charging short call IM.
    optionType: { vanilla: {} },
    defaultDirection: "buy",
    extraParam: () => 0,
  },
  vanilla_put: {
    optionType: { vanilla: {} },
    defaultDirection: "sell",
    extraParam: () => 0,
  },
  capped_call: {
    optionType: { cappedVanilla: {} },
    defaultDirection: "buy",
    extraParam: (p) => {
      if (p.extraParam === undefined)
        throw new Error("capped_call requires extraParam (cap strike in USD)");
      return p.extraParam;
    },
  },
  capped_put: {
    optionType: { cappedVanilla: {} },
    defaultDirection: "sell",
    extraParam: (p) => {
      if (p.extraParam === undefined)
        throw new Error("capped_put requires extraParam (cap strike in USD)");
      return p.extraParam;
    },
  },
  range_accrual: {
    optionType: { rangeAccrual: {} },
    defaultDirection: "buy",
    extraParam: (p) => {
      const upper = p.upperBound ?? p.extraParam;
      if (upper === undefined)
        throw new Error("range_accrual requires upperBound (or extraParam) — upper bound USD");
      return upper;
    },
  },
  // Phase 2 (2026-05-04) — Inverse family. Premium + payoff in BASE asset.
  // On-chain enum has one variant per (Vanilla|Digital)Inverse with direction
  // carried as i8 (+1 Call / −1 Put). SOL enables the inverse family today;
  // other assets remain linear-only until their AssetParams masks are widened.
  vanilla_inverse_call: {
    optionType: { vanillaInverse: {} },
    defaultDirection: "buy",
    extraParam: () => 0,
  },
  vanilla_inverse_put: {
    optionType: { vanillaInverse: {} },
    defaultDirection: "sell",
    extraParam: () => 0,
  },
  digital_inverse_call: {
    optionType: { digitalInverse: {} },
    defaultDirection: "buy",
    extraParam: () => 0,
  },
  digital_inverse_put: {
    optionType: { digitalInverse: {} },
    defaultDirection: "sell",
    extraParam: () => 0,
  },
};

export function mapPayoffToAnchor(payoff: PayoffType): PayoffMapping {
  const m = PAYOFF_TABLE[payoff];
  if (!m) throw new Error(`Unknown payoff: ${payoff}`);
  return m;
}

// ---------------------------------------------------------------------------
// Pyth Hermes REST helper — V0 stamp default for spot_at_creation.
// ---------------------------------------------------------------------------

interface HermesParsedPrice {
  parsed: Array<{
    price: { price: string; expo: number };
  }>;
}

/**
 * Fetch the current Pyth price for a launch-panel asset via Hermes REST.
 * Used by `SkewClient.create()` when the caller doesn't supply spotAtCreation.
 *
 * Returns a USD float (e.g. 77645.20 for BTC). Throws on network error or
 * missing Hermes feed configuration.
 */
export async function fetchPythSpotUsd(underlying: Underlying): Promise<number> {
  const feedId = HERMES_FEED_IDS[underlying];
  if (!feedId) {
    throw new Error(
      `Pyth Hermes feed not yet available for ${underlying}. ` +
        `Pass \`spotAtCreation\` explicitly or wait for integration.`,
    );
  }
  const url = "https://hermes.pyth.network/v2/updates/price/latest" + `?ids%5B%5D=${feedId}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Hermes REST failed (${res.status}) for ${underlying}: ` +
        `pass spotAtCreation explicitly or retry`,
    );
  }
  const json = (await res.json()) as HermesParsedPrice;
  const entry = json.parsed?.[0]?.price;
  if (!entry) {
    throw new Error(`Hermes returned no price for ${underlying}`);
  }
  // expo is negative; multiply price by 10^expo to get USD float
  return Number(entry.price) * Math.pow(10, entry.expo);
}

// ---------------------------------------------------------------------------
// PDA helpers (unchanged from SDK 0.1.0)
// ---------------------------------------------------------------------------

const OPTION_SEED = Buffer.from("option");
const ESCROW_SEED = Buffer.from("escrow");
const OPTION_TOKEN_MINT_SEED = Buffer.from("option_token_mint");
const FEE_ACCUMULATOR_SEED = Buffer.from("fee_accumulator");
const FEE_AUTHORITY_SEED = Buffer.from("fee_authority");
const CM_SEED = Buffer.from("cm");
const CM_ESCROW_SEED = Buffer.from("cm_escrow");
const POSITION_REGISTRY_SEED = Buffer.from("position_registry");
const COLLATERAL_POLICY_SEED = Buffer.from("collateral_policy");
const MICROSTRUCTURE_SEED = Buffer.from("microstructure");
const CROSS_ASSET_MATRIX_SEED = Buffer.from("cross_asset_matrix");
const HAMILTON_SEED = Buffer.from("hamilton");
const POVS_STATE_SEED = Buffer.from("povs_state");
const LIQ_STATE_SEED = Buffer.from("liq_state");
const INSURANCE_FUND_SEED = Buffer.from("insurance_fund");
const IF_ESCROW_SEED = Buffer.from("if_escrow");
const GOVERNANCE_SEED = Buffer.from("governance");
const SIGMA_IV_SEED = Buffer.from("sigma_iv");
// Phase 1635 — Isolated Margin per-position vault
const ISOLATED_VAULT_SEED = Buffer.from("isolated_vault");
const ISOLATED_VAULT_ATA_SEED = Buffer.from("isolated_vault_ata");
// Phase 1636 — DVOL variance index
const DVOL_SEED = Buffer.from("dvol");
// Phase 1633.G — Mainnet hardening (conditional orders, RFQ auctions, combo v2)
const CONDITIONAL_ORDER_SEED = Buffer.from("cond_order");
const RFQ_AUCTION_SEED = Buffer.from("rfq_auction");
const RFQ_AUCTION_ESCROW_SEED = Buffer.from("rfq_escrow");
const RFQ_MAKER_REGISTRY_SEED = Buffer.from("rfq_maker");
const COMBO_INTENT_V2_SEED = Buffer.from("combo_intent_v2");
// Phase 1637 — Multi-leg combo intent
const COMBO_INTENT_SEED = Buffer.from("combo_intent");
const COMBO_ESCROW_SEED = Buffer.from("combo_escrow");
// Phase 1633.LST — jitoSOL collateral per-(user, mint) vault
const LST_VAULT_SEED = Buffer.from("lst_vault");
const LST_VAULT_ATA_SEED = Buffer.from("lst_vault_ata");
// Phase 1A.2 (2026-05-04) — Native SOL collateral vault seeds.
const NATIVE_SOL_VAULT_SEED = Buffer.from("native_sol_vault");
const NATIVE_SOL_VAULT_ATA_SEED = Buffer.from("native_sol_vault_ata");
const OPTION_COLLATERAL_LOCK_SEED = Buffer.from("option_collateral_lock");
// Phase 1633.G — per-asset SkewMetricsPda (RR/BF/term structure crank)
const SKEW_METRICS_SEED = Buffer.from("skew_metrics");
const VOLUME_TRACKER_SEED = Buffer.from("volume");
const FEE_CONFIG_SEED = Buffer.from("fee_config");

/**
 * Per-asset SkewMetrics PDA — RR25 / BF25 / RR10 / ATM slope + 8-tenor IV.
 * Cranked hourly by SKEW_AUTHORITY via `update_skew_metrics`.
 * Seeds: [b"skew_metrics", &[asset_u8]]
 */
export function findSkewMetricsPda(
  assetIdx: number,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  assertAssetIdx("findSkewMetricsPda", assetIdx);
  return PublicKey.findProgramAddressSync([SKEW_METRICS_SEED, Buffer.from([assetIdx])], programId);
}

// Series listing — σ·√T grid metadata index PDA
const SERIES_LISTING_SEED = Buffer.from("series");
// Builder code anti-spam deposit registry
const BUILDER_SEED = Buffer.from("builder");
const BUILDER_ESCROW_SEED = Buffer.from("builder_escrow");
// Secondary-market auction escrow
const AUCTION_SEED = Buffer.from("auction");
const AUCTION_ESCROW_SEED = Buffer.from("auction_escrow");

/**
 * Per-series-cell grid metadata PDA.
 * Seeds: [b"series", &[asset], strike_le, expiry_ts_le, &[option_type], direction_le]
 *
 * @param optionTypeIdx — discriminant: Vanilla=0, Digital=1,
 *   CappedVanilla=2, RangeAccrual=3, VanillaInverse=4, DigitalInverse=5
 * @param direction — +1 Call / -1 Put / 0 RangeAccrual (i8 — encoded as 1-byte LE)
 */
export function findSeriesListingPda(
  assetIdx: number,
  strike: bigint,
  expiryTs: bigint,
  optionTypeIdx: 0 | 1 | 2 | 3 | 4 | 5,
  direction: -1 | 0 | 1,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  assertAssetIdx("findSeriesListingPda", assetIdx);
  const strikeBuf = Buffer.alloc(8);
  strikeBuf.writeBigUInt64LE(strike);
  const expiryBuf = Buffer.alloc(8);
  expiryBuf.writeBigInt64LE(expiryTs);
  // i8 → unsigned 1-byte (matches `direction.to_le_bytes()` for i8 on chain).
  const dirByte = (direction & 0xff) as number;
  return PublicKey.findProgramAddressSync(
    [
      SERIES_LISTING_SEED,
      Buffer.from([assetIdx]),
      strikeBuf,
      expiryBuf,
      Buffer.from([optionTypeIdx]),
      Buffer.from([dirByte]),
    ],
    programId,
  );
}

/**
 * Per-builder anti-spam deposit registry PDA.
 * Seeds: [b"builder", builder_pubkey]
 */
export function findBuilderCodePda(
  builder: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([BUILDER_SEED, builder.toBuffer()], programId);
}

/**
 * Per-builder refundable-deposit + accrued-fee escrow PDA.
 * Seeds: [b"builder_escrow", builder_pubkey]
 */
export function findBuilderEscrowPda(
  builder: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([BUILDER_ESCROW_SEED, builder.toBuffer()], programId);
}

/**
 * Per-option secondary-market auction PDA.
 * Seeds: [b"auction", option_pda]
 */
export function findAuctionPda(
  optionPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([AUCTION_SEED, optionPda.toBuffer()], programId);
}

/**
 * Per-auction option-token escrow ATA (authority = auction PDA).
 * Seeds: [b"auction_escrow", auction_pda]
 */
export function findAuctionEscrowPda(
  auctionPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([AUCTION_ESCROW_SEED, auctionPda.toBuffer()], programId);
}

/**
 * jitoSOL SPL Token mint on Solana mainnet — `Jito4APyf642JPZPx3hGc6WWJ8zPKtRbRs4P815Awbb`
 * is the stake-pool program (LST manager); the actual mint is below.
 * Source: skew-master constants/mod.rs:1158.
 */
export const JITOSOL_MINT = new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn");

/**
 * Phase 1A.2 (2026-05-04) — Wrapped SOL (wSOL) mint.
 * Production canonical native_mint per Solana SPL token convention.
 * Used by `init_native_sol_vault` / deposit / withdraw paths.
 * Source: skew-master src/state/native_sol_vault.rs:NATIVE_SOL_MINT.
 */
export const NATIVE_SOL_MINT = new PublicKey("So11111111111111111111111111111111111111112");

/**
 * jitoSOL Stake Pool account. Address-pinned by the on-chain
 * `upgrade_tier` handler so a malicious caller cannot swap a fake
 * stake pool that reports an inflated exchange rate.
 * Source: skew-master constants/mod.rs:1154.
 */
export const JITOSOL_STAKE_POOL = new PublicKey("Jito4APyf642JPZPx3hGc6WWJ8zPKtRbRs4P815Awbb");

/**
 * Pyth SOL/USD feed used for LST USD-value computation in
 * `upgrade_tier`. Address-pinned on-chain.
 * Source: skew-master constants/mod.rs:1171 (devnet).
 */
export const PYTH_SOL_USD_FEED = new PublicKey("J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix");

/**
 * Per-(user, lst_mint) LST collateral vault PDA.
 * Seeds: [b"lst_vault", user, lst_mint]
 */
export function findLstVaultPda(
  user: PublicKey,
  lstMint: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [LST_VAULT_SEED, user.toBuffer(), lstMint.toBuffer()],
    programId,
  );
}

/**
 * Per-vault LST escrow ATA. Authority = LstVault PDA.
 * Seeds: [b"lst_vault_ata", vault_pda]
 */
export function findLstVaultEscrowPda(
  vaultPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([LST_VAULT_ATA_SEED, vaultPda.toBuffer()], programId);
}

/**
 * Phase 1A.2 (2026-05-04) — Per-user Native SOL collateral vault PDA.
 * Seeds: [b"native_sol_vault", user]
 *
 * Single-mint vault (no `mint` dimension; canonical wSOL only). ETF APs +
 * regulated US institutions cannot hold LSTs for compliance reasons; this
 * path lets them post Native SOL while retaining Skew's portfolio margin.
 *
 * Spec: V2_SOL_NATIVE_OPTIONS_PLAN_2026-05-04.md §5.
 */
export function findNativeSolVaultPda(
  user: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([NATIVE_SOL_VAULT_SEED, user.toBuffer()], programId);
}

/**
 * Phase 1A.2 — Per-vault Native SOL escrow ATA (holds wSOL).
 * Authority = NativeSolVault PDA.
 * Seeds: [b"native_sol_vault_ata", vault_pda]
 */
export function findNativeSolVaultEscrowPda(
  vaultPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [NATIVE_SOL_VAULT_ATA_SEED, vaultPda.toBuffer()],
    programId,
  );
}

export function findOptionPda(
  creator: PublicKey,
  nonce: bigint,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(nonce);
  return PublicKey.findProgramAddressSync([OPTION_SEED, creator.toBuffer(), buf], programId);
}

export function findEscrowPda(option: PublicKey, programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([ESCROW_SEED, option.toBuffer()], programId);
}

export function findOptionTokenMintPda(
  option: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([OPTION_TOKEN_MINT_SEED, option.toBuffer()], programId);
}

export function findOptionCollateralLockPda(
  option: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [OPTION_COLLATERAL_LOCK_SEED, option.toBuffer()],
    programId,
  );
}

export function findFeeAccumulatorPda(
  settlementMint: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [FEE_ACCUMULATOR_SEED, settlementMint.toBuffer()],
    programId,
  );
}

export function findFeeAuthorityPda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([FEE_AUTHORITY_SEED], programId);
}

/**
 * Clearing Member PDA — one per authority.
 * Seeds: [b"cm", authority]. Mirrors anchor IDL register_clearing_member account.
 */
export function findClearingMemberPda(
  authority: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([CM_SEED, authority.toBuffer()], programId);
}

/**
 * Per-CM USDC escrow PDA. Authority = the CM PDA, so only
 * `cm_withdraw_collateral` (signed by the CM PDA) can move funds out.
 * Seeds: [b"cm_escrow", cm_pda].
 */
export function findCmEscrowPda(
  cmPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([CM_ESCROW_SEED, cmPda.toBuffer()], programId);
}

/**
 * Canonical per-CM PM position registry PDA.
 * Seeds: [b"position_registry", authority]
 */
export function findPositionRegistryPda(
  authority: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [POSITION_REGISTRY_SEED, authority.toBuffer()],
    programId,
  );
}

/** Singleton settlement/collateral mint allowlist PDA. */
export function findCollateralPolicyPda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([COLLATERAL_POLICY_SEED], programId);
}

/**
 * 30-day rolling fee-volume tracker PDA.
 * Seeds: [b"volume", authority]
 */
export function findVolumeTrackerPda(
  authority: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([VOLUME_TRACKER_SEED, authority.toBuffer()], programId);
}

/** Singleton fee schedule config PDA. */
export function findFeeConfigPda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([FEE_CONFIG_SEED], programId);
}

/**
 * Per-asset MicrostructurePDA — multi-venue aggregated spot / spread / depth /
 * volume / 28d ATM IV. Written by SKEW_AUTHORITY via `update_microstructure`
 * every ~60 slots .
 *
 * Seeds: [b"microstructure", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE (launch enum).
 */
export function findMicrostructurePda(
  assetIdx: number,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  assertAssetIdx("findMicrostructurePda", assetIdx);
  return PublicKey.findProgramAddressSync(
    [MICROSTRUCTURE_SEED, Buffer.from([assetIdx])],
    programId,
  );
}

/**
 * Singleton CrossAssetMatrix PDA — 10 ρ_p5 + 10 stress correlation pairs
 * across 5 assets. Written by SKEW_AUTHORITY via `update_cross_asset_matrix`
 * ( / §18.4 ICC table). Single PDA, no asset index.
 *
 * Seeds: [b"cross_asset_matrix"]
 */
export function findCrossAssetMatrixPda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([CROSS_ASSET_MATRIX_SEED], programId);
}

/**
 * Per-asset HamiltonState PDA — 2-state (calm/stress) regime detection params.
 * Written by SKEW_AUTHORITY via `update_hamilton_state` .
 * Streams 11 fields per asset (π_calm/π_stress/μ/σ/p01/p10/consecutive days).
 *
 * Seeds: [b"hamilton", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
 */
export function findHamiltonPda(
  assetIdx: number,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  assertAssetIdx("findHamiltonPda", assetIdx);
  return PublicKey.findProgramAddressSync([HAMILTON_SEED, Buffer.from([assetIdx])], programId);
}

/**
 * Per-asset PoVSState PDA — Path-of-Vol-Surface state. σ_t / σ_∞ / θ_d / VRP /
 * IV / p_max / ξ / β / VaR99 / ES999 / regime indicator. Written by
 * SKEW_AUTHORITY via `update_povs_state` (§9).
 *
 * Seeds: [b"povs_state", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
 */
export function findPovsStatePda(
  assetIdx: number,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  assertAssetIdx("findPovsStatePda", assetIdx);
  return PublicKey.findProgramAddressSync([POVS_STATE_SEED, Buffer.from([assetIdx])], programId);
}

function assertAssetIdx(fn: string, assetIdx: number): void {
  if (assetIdx < 0 || assetIdx > 4 || !Number.isInteger(assetIdx)) {
    throw new Error(`${fn}: assetIdx must be 0..4 (5-asset enum), got ${assetIdx}`);
  }
}

/**
 * Per-option LiqStatePDA — Dutch-auction liquidation state for one option.
 * Seeds: [b"liq_state", option_pda]
 */
export function findLiqStatePda(
  optionPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([LIQ_STATE_SEED, optionPda.toBuffer()], programId);
}

/**
 * Singleton InsuranceFund PDA — protocol's last-resort capital pool.
 * Seeds: [b"insurance_fund"]
 */
export function findInsuranceFundPda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([INSURANCE_FUND_SEED], programId);
}

/**
 * Phase 57301 (2026-05-04) — MakerAxe PDA. MM 인벤토리 의향 board entry.
 * Seeds: [b"axe", mm, &axe_id.to_le_bytes()]
 */
export const MAKER_AXE_SEED = Buffer.from("axe");

export function findMakerAxePda(
  mm: PublicKey,
  axeId: bigint,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  const idLe = Buffer.alloc(8);
  idLe.writeBigUInt64LE(axeId);
  return PublicKey.findProgramAddressSync([MAKER_AXE_SEED, mm.toBuffer(), idLe], programId);
}

/**
 * Singleton InsuranceFund SPL escrow — token account holding the fund's USDC.
 * Seeds: [b"if_escrow"]
 */
export function findIfEscrowPda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([IF_ESCROW_SEED], programId);
}

/** Singleton GovernanceMultisig PDA. Seeds: [b"governance"]. */
export function findGovernancePda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([GOVERNANCE_SEED], programId);
}

/**
 * Singleton SigmaIvPda — Deribit IV crank writes all 5-asset IVs here.
 * Seeds: [b"sigma_iv"]. Single PDA, not per-asset.
 */
export function findSigmaIvPda(programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([SIGMA_IV_SEED], programId);
}

export function generateNonce(): bigint {
  const buf = new BigUint64Array(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).crypto.getRandomValues(buf);
  return buf[0];
}

// Pyth expo = -8 → strike in USD must be multiplied by 10^8.
export function toOnChainStrike(usd: number): bigint {
  return BigInt(Math.round(usd)) * 100_000_000n;
}

// Settlement mint (USDC) uses 6 decimals.
export function toUsdcUnits(usd: number): bigint {
  return BigInt(Math.floor(usd * 1_000_000));
}

export function settlementMintDecimals(mint: PublicKey): 6 | 9 {
  return mint.equals(JITOSOL_MINT) || mint.equals(NATIVE_SOL_MINT) ? 9 : 6;
}

export function toSettlementUnits(amount: number, mint: PublicKey): bigint {
  const decimals = settlementMintDecimals(mint);
  return BigInt(Math.floor(amount * 10 ** decimals));
}

/** Inverse of `toOnChainStrike`: divide a Pyth-scaled u64 by 10^8 to USD. */
export function fromOnChainStrike(strike: bigint): number {
  return Number(strike) / 100_000_000;
}

/** Inverse of `toUsdcUnits`: divide a USDC × 10^6 u64 by 10^6 to USD. */
export function fromUsdcUnits(units: bigint): number {
  return Number(units) / 1_000_000;
}

/**
 * Reverse of `assetEnumIndex` — map the on-chain `asset: u8` back to its
 * launch-panel symbol. Returns `undefined` for indices outside 0..4 so
 * callers can decide between "unknown" vs. "default".
 */
export function indexToUnderlying(idx: number): Underlying | undefined {
  return (["BTC", "ETH", "SOL", "XRP", "HYPE"] as const)[idx];
}

export function isoToUnixSeconds(iso: string): bigint {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) throw new Error(`Invalid ISO date: ${iso}`);
  return BigInt(Math.floor(ms / 1000));
}

export const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
);

export function findMetadataPda(mint: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
    MPL_TOKEN_METADATA_PROGRAM_ID,
  );
}

// ---------------------------------------------------------------------------
// Phase 1635 — Isolated Margin per-position USDC vault PDAs
//
// Per-(user, option) PDA + escrow ATA. A position's loss caps at the vault
// balance instead of cascading across the writer's ClearingMember collateral.
// On-chain settle/liquidate drains the vault FIRST when the matching
// (vault_pda, vault_escrow_ata) pair is passed via remaining_accounts.
// ---------------------------------------------------------------------------

/**
 * Per-(user, option) IsolatedVault PDA.
 * Seeds: [b"isolated_vault", user, option_pda]
 */
export function findIsolatedVaultPda(
  user: PublicKey,
  optionPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [ISOLATED_VAULT_SEED, user.toBuffer(), optionPda.toBuffer()],
    programId,
  );
}

/**
 * Per-vault SPL escrow ATA. Authority = the IsolatedVault PDA itself.
 * Seeds: [b"isolated_vault_ata", vault_pda]
 */
export function findIsolatedVaultEscrowPda(
  vaultPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [ISOLATED_VAULT_ATA_SEED, vaultPda.toBuffer()],
    programId,
  );
}

// ---------------------------------------------------------------------------
// Phase 1636 — DVOL variance index PDA
//
// Per-asset Deribit-style variance-swap fair-strike index. SKEW_AUTHORITY
// pushes 28d / 90d annualised vol + realised-variance via `update_dvol`.
// Consumed by frontend dashboards + variance-swap products (Phase 2).
// ---------------------------------------------------------------------------

/**
 * Per-asset DVOL PDA.
 * Seeds: [b"dvol", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
 */
export function findDvolPda(assetIdx: number, programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  assertAssetIdx("findDvolPda", assetIdx);
  return PublicKey.findProgramAddressSync([DVOL_SEED, Buffer.from([assetIdx])], programId);
}

// ---------------------------------------------------------------------------
// Phase 1637 — Multi-leg combo intent PDAs
//
// Per-(buyer, combo_id) intent + premium escrow. Buyer commits upfront; the
// relay coordinates leg fills via atomic_fill_relay with the combo PDA in
// remaining_accounts; finalize/cancel returns residual + recovers rent.
// ---------------------------------------------------------------------------

/**
 * Per-(buyer, combo_id) ComboIntentPda.
 * Seeds: [b"combo_intent", buyer, combo_id_le_bytes_u64]
 *
 * @param buyer — buyer authority public key.
 * @param comboId — caller-chosen u64 nonce so a single buyer can run
 *   multiple concurrent combos.
 */
export function findComboIntentPda(
  buyer: PublicKey,
  comboId: bigint,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(comboId, 0);
  return PublicKey.findProgramAddressSync([COMBO_INTENT_SEED, buyer.toBuffer(), buf], programId);
}

/**
 * Per-combo SPL premium escrow ATA. Authority = the ComboIntentPda itself.
 * Seeds: [b"combo_escrow", combo_intent_pda]
 */
export function findComboEscrowPda(
  comboIntentPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [COMBO_ESCROW_SEED, comboIntentPda.toBuffer()],
    programId,
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Phase 1633.G — mainnet hardening PDAs
// ──────────────────────────────────────────────────────────────────────────

/**
 * ConditionalOrderPda — per-(authority, order_id) stop-loss / take-profit /
 * OCO leg. order_id is a caller-chosen u64 nonce; one authority can have
 * many concurrent orders.
 *
 * Seeds: [b"cond_order", authority, order_id_le]
 */
export function findConditionalOrderPda(
  authority: PublicKey,
  orderId: bigint,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(orderId, 0);
  return PublicKey.findProgramAddressSync(
    [CONDITIONAL_ORDER_SEED, authority.toBuffer(), buf],
    programId,
  );
}

/**
 * RfqAuctionPda — per-(buyer, auction_id) RFQ auction. Buyer escrows
 * `max_premium_micro` USDC at register time; finalize/cancel refunds the
 * auction escrow to the buyer. Premium settlement happens in the relay fill.
 *
 * Seeds: [b"rfq_auction", buyer, auction_id_le]
 */
export function findRfqAuctionPda(
  buyer: PublicKey,
  auctionId: bigint,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(auctionId, 0);
  return PublicKey.findProgramAddressSync([RFQ_AUCTION_SEED, buyer.toBuffer(), buf], programId);
}

/**
 * RfqMakerRegistryPda — per-MM anti-spam deposit account. MMs register
 * once with `register_rfq_maker` and stake `RFQ_MAKER_DEPOSIT_LAMPORTS`;
 * the registry gates `submit_rfq_quote` so an unregistered key cannot
 * spam quotes.
 *
 * Seeds: [b"rfq_maker", mm_pubkey]
 */
export function findRfqMakerPda(mm: PublicKey, programId = SKEW_PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([RFQ_MAKER_REGISTRY_SEED, mm.toBuffer()], programId);
}

/**
 * Per-auction USDC escrow ATA. Authority is the `RfqAuctionPda` itself.
 * Created by `register_rfq_auction`, drained by `finalize` or `cancel`.
 *
 * Seeds: [b"rfq_escrow", auction_pubkey]
 */
export function findRfqAuctionEscrowPda(
  auctionPda: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [RFQ_AUCTION_ESCROW_SEED, auctionPda.toBuffer()],
    programId,
  );
}

/**
 * Combo intent v2 PDA (32-leg variant). Replaces the v1 max-4-leg
 * `findComboIntentPda` for callers using the wider leg array.
 *
 * Seeds: [b"combo_intent_v2", buyer, combo_id_le]
 */
export function findComboIntentV2Pda(
  buyer: PublicKey,
  comboId: bigint,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(comboId, 0);
  return PublicKey.findProgramAddressSync([COMBO_INTENT_V2_SEED, buyer.toBuffer(), buf], programId);
}

/**
 * Canonical RFQ-quote digest the MM client must sign before calling
 * `submit_rfq_quote`. Mirrors on-chain `rfq_quote_digest()` in
 * `skew-master/programs/skew-master/src/rfq_auction_ix.rs`.
 *
 *   SHA256( auction_pubkey ‖ premium_micro_LE ‖ valid_until_slot_LE ‖ mm_pubkey )
 *
 *   32 + 8 + 8 + 32 = 80 bytes input → 32 bytes output.
 *
 * The MM client builds this digest, signs it with their keypair, then
 * includes an `Ed25519Program.createInstructionWithPublicKey` ix at
 * `current_index - 1` in the same tx as `submit_rfq_quote`. The on-chain
 * handler reads the Instructions sysvar and verifies the signature.
 */
export function rfqQuoteDigestBytes(
  auction: PublicKey,
  premiumMicro: bigint,
  validUntilSlot: bigint,
  mm: PublicKey,
): Uint8Array {
  const payload = new Uint8Array(80);
  payload.set(auction.toBytes(), 0);
  const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
  view.setBigUint64(32, premiumMicro, true);
  view.setBigUint64(40, validUntilSlot, true);
  payload.set(mm.toBytes(), 48);
  return sha256(payload);
}

export function rfqQuoteDigestHex(
  auction: PublicKey,
  premiumMicro: bigint,
  validUntilSlot: bigint,
  mm: PublicKey,
): string {
  return Array.from(rfqQuoteDigestBytes(auction, premiumMicro, validUntilSlot, mm))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function rfqQuoteDigest(
  auction: PublicKey,
  premiumMicro: bigint,
  validUntilSlot: bigint,
  mm: PublicKey,
): Buffer {
  return Buffer.from(rfqQuoteDigestBytes(auction, premiumMicro, validUntilSlot, mm));
}
