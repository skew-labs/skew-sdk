import { PublicKey } from "@solana/web3.js";
import type { CreateParams, Direction, PayoffType, Underlying } from "./types";
export declare const SKEW_PROGRAM_ID: PublicKey;
/** Default annualized σ used as the V0 stamp when caller doesn't supply one. */
export declare const ASSET_DEFAULT_SIGMA: Record<Underlying, number>;
/** Resolve the Pyth feed PublicKey for a launch-panel asset. */
export declare function resolvePythFeed(underlying: Underlying): PublicKey;
/**
 * Map a launch-panel symbol to its anchor `state::asset::Asset` enum index.
 * BTC=0, ETH=1, SOL=2, XRP=3, HYPE=4 (launch list).
 */
export declare function assetEnumIndex(underlying: Underlying): number;
/** Encode buy/sell direction as the anchor wire i8 (+1 / -1). */
export declare function directionToI8(direction: Direction): number;
type AnchorOptionType = Record<string, any>;
export interface PayoffMapping {
    optionType: AnchorOptionType;
    defaultDirection: Direction;
    extraParam(params: CreateParams): number;
}
export declare function mapPayoffToAnchor(payoff: PayoffType): PayoffMapping;
/**
 * Fetch the current Pyth price for a launch-panel asset via Hermes REST.
 * Used by `SkewClient.create()` when the caller doesn't supply spotAtCreation.
 *
 * Returns a USD float (e.g. 77645.20 for BTC). Throws on network error or
 * missing Hermes feed configuration.
 */
export declare function fetchPythSpotUsd(underlying: Underlying): Promise<number>;
/**
 * Per-asset SkewMetrics PDA — RR25 / BF25 / RR10 / ATM slope + 8-tenor IV.
 * Cranked hourly by SKEW_AUTHORITY via `update_skew_metrics`.
 * Seeds: [b"skew_metrics", &[asset_u8]]
 */
export declare function findSkewMetricsPda(assetIdx: number, programId?: PublicKey): [PublicKey, number];
/**
 * Per-series-cell grid metadata PDA.
 * Seeds: [b"series", &[asset], strike_le, expiry_ts_le, &[option_type], direction_le]
 *
 * @param optionTypeIdx — discriminant: Vanilla=0, Digital=1,
 *   CappedVanilla=2, RangeAccrual=3, VanillaInverse=4, DigitalInverse=5
 * @param direction — +1 Call / -1 Put / 0 RangeAccrual (i8 — encoded as 1-byte LE)
 */
export declare function findSeriesListingPda(assetIdx: number, strike: bigint, expiryTs: bigint, optionTypeIdx: 0 | 1 | 2 | 3 | 4 | 5, direction: -1 | 0 | 1, programId?: PublicKey): [PublicKey, number];
/**
 * Per-builder anti-spam deposit registry PDA.
 * Seeds: [b"builder", builder_pubkey]
 */
export declare function findBuilderCodePda(builder: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-builder refundable-deposit + accrued-fee escrow PDA.
 * Seeds: [b"builder_escrow", builder_pubkey]
 */
export declare function findBuilderEscrowPda(builder: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-option secondary-market auction PDA.
 * Seeds: [b"auction", option_pda]
 */
export declare function findAuctionPda(optionPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-auction option-token escrow ATA (authority = auction PDA).
 * Seeds: [b"auction_escrow", auction_pda]
 */
export declare function findAuctionEscrowPda(auctionPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * jitoSOL SPL Token mint on Solana mainnet — `Jito4APyf642JPZPx3hGc6WWJ8zPKtRbRs4P815Awbb`
 * is the stake-pool program (LST manager); the actual mint is below.
 * Source: skew-master constants/mod.rs:1158.
 */
export declare const JITOSOL_MINT: PublicKey;
/**
 * Phase 1A.2 (2026-05-04) — Wrapped SOL (wSOL) mint.
 * Production canonical native_mint per Solana SPL token convention.
 * Used by `init_native_sol_vault` / deposit / withdraw paths.
 * Source: skew-master src/state/native_sol_vault.rs:NATIVE_SOL_MINT.
 */
export declare const NATIVE_SOL_MINT: PublicKey;
/**
 * jitoSOL Stake Pool account. Address-pinned by the on-chain
 * `upgrade_tier` handler so a malicious caller cannot swap a fake
 * stake pool that reports an inflated exchange rate.
 * Source: skew-master constants/mod.rs:1154.
 */
export declare const JITOSOL_STAKE_POOL: PublicKey;
/**
 * Pyth SOL/USD feed used for LST USD-value computation in
 * `upgrade_tier`. Address-pinned on-chain.
 * Source: skew-master constants/mod.rs:1171 (devnet).
 */
export declare const PYTH_SOL_USD_FEED: PublicKey;
/**
 * Per-(user, lst_mint) LST collateral vault PDA.
 * Seeds: [b"lst_vault", user, lst_mint]
 */
export declare function findLstVaultPda(user: PublicKey, lstMint: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-vault LST escrow ATA. Authority = LstVault PDA.
 * Seeds: [b"lst_vault_ata", vault_pda]
 */
export declare function findLstVaultEscrowPda(vaultPda: PublicKey, programId?: PublicKey): [PublicKey, number];
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
export declare function findNativeSolVaultPda(user: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Phase 1A.2 — Per-vault Native SOL escrow ATA (holds wSOL).
 * Authority = NativeSolVault PDA.
 * Seeds: [b"native_sol_vault_ata", vault_pda]
 */
export declare function findNativeSolVaultEscrowPda(vaultPda: PublicKey, programId?: PublicKey): [PublicKey, number];
export declare function findOptionPda(creator: PublicKey, nonce: bigint, programId?: PublicKey): [PublicKey, number];
export declare function findEscrowPda(option: PublicKey, programId?: PublicKey): [PublicKey, number];
export declare function findOptionTokenMintPda(option: PublicKey, programId?: PublicKey): [PublicKey, number];
export declare function findOptionCollateralLockPda(option: PublicKey, programId?: PublicKey): [PublicKey, number];
export declare function findFeeAccumulatorPda(settlementMint: PublicKey, programId?: PublicKey): [PublicKey, number];
export declare function findFeeAuthorityPda(programId?: PublicKey): [PublicKey, number];
/**
 * Clearing Member PDA — one per authority.
 * Seeds: [b"cm", authority]. Mirrors anchor IDL register_clearing_member account.
 */
export declare function findClearingMemberPda(authority: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-CM USDC escrow PDA. Authority = the CM PDA, so only
 * `cm_withdraw_collateral` (signed by the CM PDA) can move funds out.
 * Seeds: [b"cm_escrow", cm_pda].
 */
export declare function findCmEscrowPda(cmPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Canonical per-CM PM position registry PDA.
 * Seeds: [b"position_registry", authority]
 */
export declare function findPositionRegistryPda(authority: PublicKey, programId?: PublicKey): [PublicKey, number];
/** Singleton settlement/collateral mint allowlist PDA. */
export declare function findCollateralPolicyPda(programId?: PublicKey): [PublicKey, number];
/**
 * 30-day rolling fee-volume tracker PDA.
 * Seeds: [b"volume", authority]
 */
export declare function findVolumeTrackerPda(authority: PublicKey, programId?: PublicKey): [PublicKey, number];
/** Singleton fee schedule config PDA. */
export declare function findFeeConfigPda(programId?: PublicKey): [PublicKey, number];
/**
 * Per-asset MicrostructurePDA — multi-venue aggregated spot / spread / depth /
 * volume / 28d ATM IV. Written by SKEW_AUTHORITY via `update_microstructure`
 * every ~60 slots .
 *
 * Seeds: [b"microstructure", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE (launch enum).
 */
export declare function findMicrostructurePda(assetIdx: number, programId?: PublicKey): [PublicKey, number];
/**
 * Singleton CrossAssetMatrix PDA — 10 ρ_p5 + 10 stress correlation pairs
 * across 5 assets. Written by SKEW_AUTHORITY via `update_cross_asset_matrix`
 * ( / §18.4 ICC table). Single PDA, no asset index.
 *
 * Seeds: [b"cross_asset_matrix"]
 */
export declare function findCrossAssetMatrixPda(programId?: PublicKey): [PublicKey, number];
/**
 * Per-asset HamiltonState PDA — 2-state (calm/stress) regime detection params.
 * Written by SKEW_AUTHORITY via `update_hamilton_state` .
 * Streams 11 fields per asset (π_calm/π_stress/μ/σ/p01/p10/consecutive days).
 *
 * Seeds: [b"hamilton", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
 */
export declare function findHamiltonPda(assetIdx: number, programId?: PublicKey): [PublicKey, number];
/**
 * Per-asset PoVSState PDA — Path-of-Vol-Surface state. σ_t / σ_∞ / θ_d / VRP /
 * IV / p_max / ξ / β / VaR99 / ES999 / regime indicator. Written by
 * SKEW_AUTHORITY via `update_povs_state` (§9).
 *
 * Seeds: [b"povs_state", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
 */
export declare function findPovsStatePda(assetIdx: number, programId?: PublicKey): [PublicKey, number];
/**
 * Per-option LiqStatePDA — Dutch-auction liquidation state for one option.
 * Seeds: [b"liq_state", option_pda]
 */
export declare function findLiqStatePda(optionPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Singleton InsuranceFund PDA — protocol's last-resort capital pool.
 * Seeds: [b"insurance_fund"]
 */
export declare function findInsuranceFundPda(programId?: PublicKey): [PublicKey, number];
/**
 * Phase 57301 (2026-05-04) — MakerAxe PDA. MM 인벤토리 의향 board entry.
 * Seeds: [b"axe", mm, &axe_id.to_le_bytes()]
 */
export declare const MAKER_AXE_SEED: Buffer<ArrayBuffer>;
export declare function findMakerAxePda(mm: PublicKey, axeId: bigint, programId?: PublicKey): [PublicKey, number];
/**
 * Singleton InsuranceFund SPL escrow — token account holding the fund's USDC.
 * Seeds: [b"if_escrow"]
 */
export declare function findIfEscrowPda(programId?: PublicKey): [PublicKey, number];
/** Singleton GovernanceMultisig PDA. Seeds: [b"governance"]. */
export declare function findGovernancePda(programId?: PublicKey): [PublicKey, number];
/**
 * Singleton SigmaIvPda — Deribit IV crank writes all 5-asset IVs here.
 * Seeds: [b"sigma_iv"]. Single PDA, not per-asset.
 */
export declare function findSigmaIvPda(programId?: PublicKey): [PublicKey, number];
export declare function generateNonce(): bigint;
export declare function toOnChainStrike(usd: number): bigint;
export declare function toUsdcUnits(usd: number): bigint;
export declare function settlementMintDecimals(mint: PublicKey): 6 | 9;
export declare function toSettlementUnits(amount: number, mint: PublicKey): bigint;
/** Inverse of `toOnChainStrike`: divide a Pyth-scaled u64 by 10^8 to USD. */
export declare function fromOnChainStrike(strike: bigint): number;
/** Inverse of `toUsdcUnits`: divide a USDC × 10^6 u64 by 10^6 to USD. */
export declare function fromUsdcUnits(units: bigint): number;
/**
 * Reverse of `assetEnumIndex` — map the on-chain `asset: u8` back to its
 * launch-panel symbol. Returns `undefined` for indices outside 0..4 so
 * callers can decide between "unknown" vs. "default".
 */
export declare function indexToUnderlying(idx: number): Underlying | undefined;
export declare function isoToUnixSeconds(iso: string): bigint;
export declare const MPL_TOKEN_METADATA_PROGRAM_ID: PublicKey;
export declare function findMetadataPda(mint: PublicKey): [PublicKey, number];
/**
 * Per-(user, option) IsolatedVault PDA.
 * Seeds: [b"isolated_vault", user, option_pda]
 */
export declare function findIsolatedVaultPda(user: PublicKey, optionPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-vault SPL escrow ATA. Authority = the IsolatedVault PDA itself.
 * Seeds: [b"isolated_vault_ata", vault_pda]
 */
export declare function findIsolatedVaultEscrowPda(vaultPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-asset DVOL PDA.
 * Seeds: [b"dvol", &[asset_u8]]
 *
 * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
 */
export declare function findDvolPda(assetIdx: number, programId?: PublicKey): [PublicKey, number];
/**
 * Per-(buyer, combo_id) ComboIntentPda.
 * Seeds: [b"combo_intent", buyer, combo_id_le_bytes_u64]
 *
 * @param buyer — buyer authority public key.
 * @param comboId — caller-chosen u64 nonce so a single buyer can run
 *   multiple concurrent combos.
 */
export declare function findComboIntentPda(buyer: PublicKey, comboId: bigint, programId?: PublicKey): [PublicKey, number];
/**
 * Per-combo SPL premium escrow ATA. Authority = the ComboIntentPda itself.
 * Seeds: [b"combo_escrow", combo_intent_pda]
 */
export declare function findComboEscrowPda(comboIntentPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * ConditionalOrderPda — per-(authority, order_id) stop-loss / take-profit /
 * OCO leg. order_id is a caller-chosen u64 nonce; one authority can have
 * many concurrent orders.
 *
 * Seeds: [b"cond_order", authority, order_id_le]
 */
export declare function findConditionalOrderPda(authority: PublicKey, orderId: bigint, programId?: PublicKey): [PublicKey, number];
/**
 * RfqAuctionPda — per-(buyer, auction_id) RFQ auction. Buyer escrows
 * `max_premium_micro` USDC at register time; finalize/cancel refunds the
 * auction escrow to the buyer. Premium settlement happens in the relay fill.
 *
 * Seeds: [b"rfq_auction", buyer, auction_id_le]
 */
export declare function findRfqAuctionPda(buyer: PublicKey, auctionId: bigint, programId?: PublicKey): [PublicKey, number];
/**
 * RfqMakerRegistryPda — per-MM anti-spam deposit account. MMs register
 * once with `register_rfq_maker` and stake `RFQ_MAKER_DEPOSIT_LAMPORTS`;
 * the registry gates `submit_rfq_quote` so an unregistered key cannot
 * spam quotes.
 *
 * Seeds: [b"rfq_maker", mm_pubkey]
 */
export declare function findRfqMakerPda(mm: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Per-auction USDC escrow ATA. Authority is the `RfqAuctionPda` itself.
 * Created by `register_rfq_auction`, drained by `finalize` or `cancel`.
 *
 * Seeds: [b"rfq_escrow", auction_pubkey]
 */
export declare function findRfqAuctionEscrowPda(auctionPda: PublicKey, programId?: PublicKey): [PublicKey, number];
/**
 * Combo intent v2 PDA (32-leg variant). Replaces the v1 max-4-leg
 * `findComboIntentPda` for callers using the wider leg array.
 *
 * Seeds: [b"combo_intent_v2", buyer, combo_id_le]
 */
export declare function findComboIntentV2Pda(buyer: PublicKey, comboId: bigint, programId?: PublicKey): [PublicKey, number];
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
export declare function rfqQuoteDigest(auction: PublicKey, premiumMicro: bigint, validUntilSlot: bigint, mm: PublicKey): Buffer;
export {};
//# sourceMappingURL=pda.d.ts.map