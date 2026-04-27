import { PublicKey } from "@solana/web3.js";
import type { CreateParams, Direction, PayoffType, Underlying } from "./types";

export const SKEW_PROGRAM_ID = new PublicKey(
  "3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK",
);

// ---------------------------------------------------------------------------
// Pyth devnet feeds (5-asset launch panel, Article 7).
// HYPE feed pending Wormhole / Pyth integration (~2026-Q2). Until then,
// resolvePythFeed("HYPE") falls back to the Pyth Hermes REST API and the
// instruction is rejected on-chain (UnsupportedAsset).
// Source: docs from `agents/inbox/infra-pyth-v3-5asset-feed-ids.md`.
// ---------------------------------------------------------------------------
const PYTH_DEVNET_FEEDS: Record<Underlying, string> = {
  BTC: "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J",
  ETH: "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw",
  SOL: "J83w4HKfqxwcq3BEMMkPFSppX3gqekLyLJBexebFVkix",
  XRP: "Hr1bjp5Ux8ezmNJ3ZH4kHk52R2hSzEUtX84mr7CG6jip",
  HYPE: "11111111111111111111111111111111", // Placeholder — pending Wormhole 2026-Q2
};

// Hermes REST symbol IDs for spot price fetch (V0 stamp default).
const HERMES_FEED_IDS: Record<Underlying, string> = {
  BTC: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  ETH: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  SOL: "ef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
  XRP: "ec5d399846a9209f3fe5881d70aae9268c94339ff9817e8d18ff19fa05eea1c8",
  HYPE: "", // pending
};

/** Default annualized σ used as the V0 stamp when caller doesn't supply one. */
export const ASSET_DEFAULT_SIGMA: Record<Underlying, number> = {
  BTC: 0.45,
  ETH: 0.65,
  SOL: 0.80,
  XRP: 0.75,
  HYPE: 0.85,
};

/** Resolve the Pyth feed PublicKey for a launch-panel asset. */
export function resolvePythFeed(underlying: Underlying): PublicKey {
  return new PublicKey(PYTH_DEVNET_FEEDS[underlying]);
}

/**
 * Map a launch-panel symbol to its anchor `state::asset::Asset` enum index.
 * BTC=0, ETH=1, SOL=2, XRP=3, HYPE=4 (Article 7 5-asset Iron Law).
 */
export function assetEnumIndex(underlying: Underlying): number {
  const idx = { BTC: 0, ETH: 1, SOL: 2, XRP: 3, HYPE: 4 }[underlying];
  if (idx === undefined) throw new Error(`Unsupported asset: ${underlying}`);
  return idx;
}

/** Encode buy/sell direction as the anchor wire i8 (+1 / -1). */
export function directionToI8(direction: Direction): number {
  return direction === "buy" ? 1 : -1;
}

// ---------------------------------------------------------------------------
// PayoffType → anchor OptionType + direction + extra_param mapping
//
// Anchor IDL `OptionType` has 3 variants (Digital / CappedVanilla / RangeAccrual)
// after Decision-32 OneTouch DROP. The SDK's seven user-friendly payoff names
// map onto (option_type, default direction, extra_param) triples here.
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
    // Capped vanilla with no upper cap. Anchor treats `extra_param=0` on a
    // call as "no cap"; on a put as "no floor". Keep symmetric default 0.
    optionType: { cappedVanilla: {} },
    defaultDirection: "buy",
    extraParam: () => 0,
  },
  vanilla_put: {
    optionType: { cappedVanilla: {} },
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
        throw new Error(
          "range_accrual requires upperBound (or extraParam) — upper bound USD",
        );
      return upper;
    },
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
 * unsupported asset (HYPE pre-Wormhole).
 */
export async function fetchPythSpotUsd(
  underlying: Underlying,
): Promise<number> {
  const feedId = HERMES_FEED_IDS[underlying];
  if (!feedId) {
    throw new Error(
      `Pyth Hermes feed not yet available for ${underlying}. ` +
        `Pass \`spotAtCreation\` explicitly or wait for integration.`,
    );
  }
  const url =
    "https://hermes.pyth.network/v2/updates/price/latest" +
    `?ids%5B%5D=${feedId}`;
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
const MICROSTRUCTURE_SEED = Buffer.from("microstructure");
const CROSS_ASSET_MATRIX_SEED = Buffer.from("cross_asset_matrix");
const HAMILTON_SEED = Buffer.from("hamilton");
const POVS_STATE_SEED = Buffer.from("povs_state");
const LIQ_STATE_SEED = Buffer.from("liq_state");
const INSURANCE_FUND_SEED = Buffer.from("insurance_fund");
const IF_ESCROW_SEED = Buffer.from("if_escrow");
const GOVERNANCE_SEED = Buffer.from("governance");
const SIGMA_IV_SEED = Buffer.from("sigma_iv");

export function findOptionPda(
  creator: PublicKey,
  nonce: bigint,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(nonce);
  return PublicKey.findProgramAddressSync(
    [OPTION_SEED, creator.toBuffer(), buf],
    programId,
  );
}

export function findEscrowPda(
  option: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [ESCROW_SEED, option.toBuffer()],
    programId,
  );
}

export function findOptionTokenMintPda(
  option: PublicKey,
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [OPTION_TOKEN_MINT_SEED, option.toBuffer()],
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

export function findFeeAuthorityPda(
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
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
  return PublicKey.findProgramAddressSync(
    [CM_SEED, authority.toBuffer()],
    programId,
  );
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
  return PublicKey.findProgramAddressSync(
    [CM_ESCROW_SEED, cmPda.toBuffer()],
    programId,
  );
}

/**
 * Per-asset MicrostructurePDA — multi-venue aggregated spot / spread / depth /
 * volume / 28d ATM IV. Written by SKEW_AUTHORITY via `update_microstructure`
 * every ~60 slots (master paper §29.9).
 *
 * Seeds: [b"microstructure", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE (Article 7 5-asset enum).
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
 * (master paper §10.6 / §18.4 ICC table). Single PDA, no asset index.
 *
 * Seeds: [b"cross_asset_matrix"]
 */
export function findCrossAssetMatrixPda(
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([CROSS_ASSET_MATRIX_SEED], programId);
}

/**
 * Per-asset HamiltonState PDA — 2-state (calm/stress) regime detection params.
 * Written by SKEW_AUTHORITY via `update_hamilton_state` (master paper §25).
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
  return PublicKey.findProgramAddressSync(
    [HAMILTON_SEED, Buffer.from([assetIdx])],
    programId,
  );
}

/**
 * Per-asset PoVSState PDA — Path-of-Vol-Surface state. σ_t / σ_∞ / θ_d / VRP /
 * IV / p_max / ξ / β / VaR99 / ES999 / regime indicator. Written by
 * SKEW_AUTHORITY via `update_povs_state` (master paper §7-§9).
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
  return PublicKey.findProgramAddressSync(
    [POVS_STATE_SEED, Buffer.from([assetIdx])],
    programId,
  );
}

function assertAssetIdx(fn: string, assetIdx: number): void {
  if (assetIdx < 0 || assetIdx > 4 || !Number.isInteger(assetIdx)) {
    throw new Error(
      `${fn}: assetIdx must be 0..4 (5-asset enum), got ${assetIdx}`,
    );
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
  return PublicKey.findProgramAddressSync(
    [LIQ_STATE_SEED, optionPda.toBuffer()],
    programId,
  );
}

/**
 * Singleton InsuranceFund PDA — protocol's last-resort capital pool.
 * Seeds: [b"insurance_fund"]
 */
export function findInsuranceFundPda(
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([INSURANCE_FUND_SEED], programId);
}

/**
 * Singleton InsuranceFund SPL escrow — token account holding the fund's USDC.
 * Seeds: [b"if_escrow"]
 */
export function findIfEscrowPda(
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([IF_ESCROW_SEED], programId);
}

/** Singleton GovernanceMultisig PDA. Seeds: [b"governance"]. */
export function findGovernancePda(
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([GOVERNANCE_SEED], programId);
}

/**
 * Singleton SigmaIvPda — Deribit IV crank writes all 5-asset IVs here.
 * Seeds: [b"sigma_iv"]. Single PDA, not per-asset.
 */
export function findSigmaIvPda(
  programId = SKEW_PROGRAM_ID,
): [PublicKey, number] {
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
    [
      Buffer.from("metadata"),
      MPL_TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    MPL_TOKEN_METADATA_PROGRAM_ID,
  );
}
