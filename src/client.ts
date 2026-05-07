import {
  ComputeBudgetProgram,
  Connection,
  Ed25519Program,
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  type AccountMeta,
  type Signer,
  type TransactionInstruction,
} from "@solana/web3.js";
import { BN, Program, AnchorProvider, type Wallet, type Idl } from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountIdempotentInstruction,
  createSyncNativeInstruction,
} from "@solana/spl-token";

import type {
  CreateParams,
  CreateResult,
  BuyResult,
  SettleResult,
  RegisterCmParams,
  RegisterCmResult,
  TxResult,
  MarginCalcResult,
  ListOptionsOpts,
  OptionSummary,
  OptionType,
  OptionState,
  Direction,
  IsolatedVaultSnapshot,
  DvolSnapshot,
  ComboLeg,
  ComboIntentSnapshot,
  ComboStatus,
  RecoveryWinnerCm,
  RecoveryStepResult,
  // Phase 1639 — read snapshot types
  PoVSStateSnapshot,
  HamiltonSnapshot,
  SkewMetricsSnapshot,
  InsuranceFundSnapshot,
  ClearingMemberSnapshot,
  LstVaultSnapshot,
  NativeSolVaultSnapshot,
  SeriesListingSnapshot,
  BuilderCodeSnapshot,
  ConditionalOrderSnapshot,
  RfqAuctionSnapshot,
  ComboIntentV2Snapshot,
  ConditionalKindCode,
  ConditionalTriggerModeCode,
  ConditionalTriggerDirectionCode,
  ConditionalActionCode,
  CrossAssetSnapshot,
  MicrostructureSnapshot,
  CollateralPolicySnapshot,
  TxSimulationResult,
} from "./types";
import {
  SKEW_PROGRAM_ID,
  findOptionPda,
  findEscrowPda,
  findOptionTokenMintPda,
  findFeeAccumulatorPda,
  findFeeAuthorityPda,
  findCollateralPolicyPda,
  findMetadataPda,
  findClearingMemberPda,
  findCmEscrowPda,
  findPositionRegistryPda,
  findLiqStatePda,
  findPovsStatePda,
  findHamiltonPda,
  findSkewMetricsPda,
  findInsuranceFundPda,
  findIfEscrowPda,
  findGovernancePda,
  findSigmaIvPda,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  resolvePythFeed,
  generateNonce,
  toOnChainStrike,
  toSettlementUnits,
  toUsdcUnits,
  settlementMintDecimals,
  isoToUnixSeconds,
  // V2.1 anchor-instruction helpers (sub-1779)
  assetEnumIndex,
  directionToI8,
  mapPayoffToAnchor,
  fetchPythSpotUsd,
  ASSET_DEFAULT_SIGMA,
  fromOnChainStrike,
  fromUsdcUnits,
  indexToUnderlying,
  // Phase 1635-1637 (off-chain wiring) — Isolated Margin / DVOL / Combo intent
  findIsolatedVaultPda,
  findIsolatedVaultEscrowPda,
  findOptionCollateralLockPda,
  findDvolPda,
  findComboIntentPda,
  findComboEscrowPda,
  // Phase 1633.G — mainnet hardening (conditional / RFQ / combo v2)
  findConditionalOrderPda,
  findRfqAuctionPda,
  findRfqAuctionEscrowPda,
  findRfqMakerPda,
  findComboIntentV2Pda,
  rfqQuoteDigest,
  // Phase 1633.LST — jitoSOL collateral
  findLstVaultPda,
  findLstVaultEscrowPda,
  JITOSOL_MINT,
  NATIVE_SOL_MINT,
  findNativeSolVaultPda,
  findNativeSolVaultEscrowPda,
  JITOSOL_STAKE_POOL,
  PYTH_SOL_USD_FEED,
  findSeriesListingPda,
  findBuilderCodePda,
  findBuilderEscrowPda,
  findVolumeTrackerPda,
  findFeeConfigPda,
} from "./pda";

// Devnet USDC mint — overridable via SKEW_DEVNET_USDC_MINT env var.
const DEVNET_USDC_MINT = new PublicKey(
  process.env["SKEW_DEVNET_USDC_MINT"] ?? "4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8",
);

const PM_CALCULATE_CU_LIMIT = 1_000_000;
const PM_VARIATION_CU_LIMIT = 400_000;

export interface SkewClientOptions {
  programId?: string;
  usdcMint?: string;
}

/**
 * SkewClient — the machine gate to Skew infrastructure.
 *
 * Construction (one canonical path — `fromProgram`):
 * ```ts
 * import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };
 * const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
 * const program  = new Program(idl as any, provider);
 * const skew     = SkewClient.fromProgram(connection, wallet, program);
 *
 * const opt = await skew.create({ underlying: "BTC", payoff: "vanilla_call", strike: 80_000, expiry: "2026-05-10T16:00:00Z", notional: 1_000 });
 * await skew.buy(opt.address, 50);
 * await skew.settle(opt.address);
 * ```
 *
 * The default `new SkewClient(...)` constructor is intentionally lower-level
 * (consumed only by `fromProgram`). It throws on first method call if you
 * skipped `fromProgram` — guard rail to prevent the empty-IDL footgun.
 */
export class SkewClient {
  // Lazy-init: never instantiate a stub Program. Anchor 0.31's
  // `new Program(idl, provider)` calls `translateAddress(idl.address)` which
  // crashes on empty/missing fields — so we hold an optional and assert on use.
  private program: Program<Idl> | undefined = undefined;
  private wallet: Wallet;
  private connection: Connection;
  private usdcMint: PublicKey;

  /** Authority pubkey backing this client (matches anchor `cm.authority`
   *  for register_clearing_member / cm_add_collateral / etc). Read-only. */
  public get walletPublicKey(): PublicKey {
    return this.wallet.publicKey;
  }

  constructor(connection: Connection, wallet: Wallet, options: SkewClientOptions = {}) {
    this.connection = connection;
    this.wallet = wallet;
    const _programId = options.programId ? new PublicKey(options.programId) : SKEW_PROGRAM_ID;
    void _programId;
    this.usdcMint = options.usdcMint ? new PublicKey(options.usdcMint) : DEVNET_USDC_MINT;
    // Note: do NOT instantiate Program here. Use SkewClient.fromProgram(...)
    // to load with a real IDL.
  }

  /**
   * Load the SDK with a pre-built Program instance — the canonical entry point.
   *
   * @example
   *   import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };
   *   const program = new Program(idl as any, provider);
   *   const skew    = SkewClient.fromProgram(connection, wallet, program);
   */
  static fromProgram(
    connection: Connection,
    wallet: Wallet,
    program: Program<Idl>,
    usdcMint?: PublicKey,
  ): SkewClient {
    const client = new SkewClient(connection, wallet);
    client.program = program;
    if (usdcMint) client.usdcMint = usdcMint;
    return client;
  }

  private _program(): Program<Idl> {
    if (!this.program) {
      throw new Error(
        "SkewClient: Program is not loaded. Use `SkewClient.fromProgram(connection, wallet, program)` " +
          "after `new Program(idl, provider)`. See @skew-labs/sdk/README for setup.",
      );
    }
    return this.program;
  }

  /** Back-compat alias for guard checks. */
  private _assertProgramLoaded(): void {
    this._program();
  }

  private _collateralPolicy(): PublicKey {
    return findCollateralPolicyPda()[0];
  }

  /**
   * Read the live CollateralPolicyPda mint allowlist for this deployment.
   *
   * `getSkewCapabilities()` tells you what the protocol can support in
   * principle. This method tells you what the currently deployed program has
   * actually allowlisted at runtime, so bots/agents can preflight wSOL/jitoSOL
   * or custom devnet mints before sending a mutating instruction.
   */
  async fetchCollateralPolicy(): Promise<CollateralPolicySnapshot> {
    this._assertProgramLoaded();
    const pda = this._collateralPolicy();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).collateralPolicyPda.fetch(pda);
      const entryCount = Math.min(Number(acc.entryCount ?? 0), 8);
      const entries = (acc.entries ?? [])
        .slice(0, entryCount)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((entry: any) => {
          const kindCode = Number(entry.kind ?? 255);
          return {
            mint: entry.mint as PublicKey,
            decimals: Number(entry.decimals ?? 0),
            kindCode,
            kind: collateralPolicyKindLabel(kindCode),
            oracleFeed: entry.oracleFeed as PublicKey,
            maxDepegBps: Number(entry.maxDepegBps ?? 0),
          };
        });
      return {
        pda,
        initialized: true,
        bump: Number(acc.bump ?? 0),
        entryCount,
        entries,
      };
    } catch {
      return {
        pda,
        initialized: false,
        bump: null,
        entryCount: 0,
        entries: [],
      };
    }
  }

  private async _requireCollateralPolicyMint(mint: PublicKey): Promise<void> {
    const policy = await this.fetchCollateralPolicy();
    if (!policy.initialized) {
      throw new Error(
        `CollateralPolicyPda is not initialized at ${policy.pda.toBase58()}. ` +
          "Run initCollateralPolicy/registerCollateralPolicyEntry on this deployment before custody writes.",
      );
    }
    const entry = policy.entries.find((x) => x.mint.equals(mint));
    if (!entry) {
      const allowlist = policy.entries.map((x) => `${x.kind}:${x.mint.toBase58()}`).join(", ");
      throw new Error(
        `Settlement/collateral mint ${mint.toBase58()} is not registered in CollateralPolicyPda. ` +
          `Registered mints: ${allowlist || "(none)"}. Call fetchCollateralPolicy() before routing.`,
      );
    }
  }

  private _hamiltonRemaining(): AccountMeta[] {
    return [0, 1, 2, 3, 4].map((assetIdx) => ({
      pubkey: findHamiltonPda(assetIdx)[0],
      isWritable: false,
      isSigner: false,
    }));
  }

  private _povsRemaining(): AccountMeta[] {
    return [0, 1, 2, 3, 4].map((assetIdx) => ({
      pubkey: findPovsStatePda(assetIdx)[0],
      isWritable: false,
      isSigner: false,
    }));
  }

  private async _positionRegistryRemaining(authority: PublicKey): Promise<AccountMeta[]> {
    const [registry] = findPositionRegistryPda(authority);
    const metas: AccountMeta[] = [{ pubkey: registry, isWritable: false, isSigner: false }];
    const info = await this.connection.getAccountInfo(registry, "confirmed");
    if (!info || info.data.length < 80) return metas;
    const count = Math.min(info.data[73] ?? 0, 32);
    for (let i = 0; i < count; i++) {
      const off = 80 + i * 32;
      metas.push({
        pubkey: new PublicKey(info.data.subarray(off, off + 32)),
        isWritable: false,
        isSigner: false,
      });
    }
    return metas;
  }

  private async _registryContains(authority: PublicKey, optionPda: PublicKey): Promise<boolean> {
    const [registry] = findPositionRegistryPda(authority);
    const info = await this.connection.getAccountInfo(registry, "confirmed");
    if (!info || info.data.length < 80) return false;
    const count = Math.min(info.data[73] ?? 0, 32);
    for (let i = 0; i < count; i++) {
      const off = 80 + i * 32;
      if (new PublicKey(info.data.subarray(off, off + 32)).equals(optionPda)) return true;
    }
    return false;
  }

  private async _pmRemaining(authority: PublicKey): Promise<AccountMeta[]> {
    return [
      ...(await this._positionRegistryRemaining(authority)),
      ...this._povsRemaining(),
      ...this._hamiltonRemaining(),
    ];
  }

  private async _settleCmOptionalAccounts(
    optionPda: PublicKey,
    creator: PublicKey,
  ): Promise<{
    creatorCm: PublicKey | null;
    positionRegistry: PublicKey | null;
    creatorCmCollateralAta: PublicKey | null;
  }> {
    if (!(await this._registryContains(creator, optionPda))) {
      return { creatorCm: null, positionRegistry: null, creatorCmCollateralAta: null };
    }
    const [positionRegistry] = findPositionRegistryPda(creator);
    const [creatorCm] = findClearingMemberPda(creator);
    const [creatorCmCollateralAta] = findCmEscrowPda(creatorCm);
    return { creatorCm, positionRegistry, creatorCmCollateralAta };
  }

  private async _settleHolderOptionalAccounts(
    optionPda: PublicKey,
    holder: PublicKey,
  ): Promise<{
    holderCm: PublicKey | null;
    holderPositionRegistry: PublicKey | null;
  }> {
    if (holder.equals(PublicKey.default) || !(await this._registryContains(holder, optionPda))) {
      return { holderCm: null, holderPositionRegistry: null };
    }
    const [holderCm] = findClearingMemberPda(holder);
    const [holderPositionRegistry] = findPositionRegistryPda(holder);
    return { holderCm, holderPositionRegistry };
  }

  private async _buildUntrackHeldPositionIx(
    optionPda: PublicKey,
    holder: PublicKey,
  ): Promise<TransactionInstruction | null> {
    if (!(await this._registryContains(holder, optionPda))) return null;
    const [cm] = findClearingMemberPda(holder);
    const [positionRegistry] = findPositionRegistryPda(holder);
    const [optionTokenMint] = findOptionTokenMintPda(optionPda);
    const holderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMint,
      holder,
      false,
      TOKEN_PROGRAM_ID,
    );
    return this._program()
      .methods.untrackHeldPosition()
      .accounts({
        holder,
        cm,
        positionRegistry,
        option: optionPda,
        optionTokenMint,
        holderOptionAta,
      })
      .instruction();
  }

  private async _settleCollateralLockOptionalAccounts(
    optionPda: PublicKey,
    creator: PublicKey,
  ): Promise<{
    optionCollateralLock: PublicKey | null;
    lstVault: PublicKey | null;
    lstVaultAta: PublicKey | null;
    nativeSolVault: PublicKey | null;
    nativeSolVaultAta: PublicKey | null;
  }> {
    const [lock] = findOptionCollateralLockPda(optionPda);
    const info = await this.connection.getAccountInfo(lock, "confirmed");
    if (!info || info.data.length < 73) {
      return {
        optionCollateralLock: null,
        lstVault: null,
        lstVaultAta: null,
        nativeSolVault: null,
        nativeSolVaultAta: null,
      };
    }
    const kind = info.data[72] ?? 0;
    if (kind === 2) {
      const [lstVault] = findLstVaultPda(creator, JITOSOL_MINT);
      const [lstVaultAta] = findLstVaultEscrowPda(lstVault);
      return {
        optionCollateralLock: lock,
        lstVault,
        lstVaultAta,
        nativeSolVault: null,
        nativeSolVaultAta: null,
      };
    }
    if (kind === 1) {
      const [nativeSolVault] = findNativeSolVaultPda(creator);
      const [nativeSolVaultAta] = findNativeSolVaultEscrowPda(nativeSolVault);
      return {
        optionCollateralLock: lock,
        lstVault: null,
        lstVaultAta: null,
        nativeSolVault,
        nativeSolVaultAta,
      };
    }
    return {
      optionCollateralLock: lock,
      lstVault: null,
      lstVaultAta: null,
      nativeSolVault: null,
      nativeSolVaultAta: null,
    };
  }

  private _optionTypeDiscriminant(optionType: unknown): 0 | 1 | 2 | 3 | 4 | 5 {
    const key =
      typeof optionType === "string"
        ? optionType
        : optionType && typeof optionType === "object"
          ? (Object.keys(optionType as Record<string, unknown>)[0] ?? "")
          : "";
    const normalized = key.charAt(0).toLowerCase() + key.slice(1);
    const table: Record<string, 0 | 1 | 2 | 3 | 4 | 5> = {
      vanilla: 0,
      digital: 1,
      cappedVanilla: 2,
      rangeAccrual: 3,
      vanillaInverse: 4,
      digitalInverse: 5,
    };
    const idx = table[normalized];
    if (idx === undefined) throw new Error(`Unsupported option type: ${key}`);
    return idx;
  }

  /**
   * Create an option and deposit collateral in two transactions.
   *
   * Anchor `create_option` v2.1 takes 12 arguments. The SDK derives every
   * wire-level argument from the high-level CreateParams:
   *   - underlying    → asset: u8 (5-asset enum index)
   *   - payoff        → option_type (Digital/CappedVanilla/RangeAccrual)
   *                   + default direction (overridable via params.direction)
   *                   + extra_param (range upper bound or capped K_cap)
   *   - strike        → strike: u64 (USD × 10^8 per Pyth expo)
   *   - expiry        → expiry_ts: i64 (unix seconds)
   *   - notional      → payoff_amount: u64 (USDC × 10^6)
   *   - spotAtCreation → spot_at_creation: i64 (V0 stamp; auto-fetched from Pyth Hermes if omitted)
   *   - sigmaAtCreation → sigma_at_creation: f64 (V0 stamp; defaults from ASSET_DEFAULT_SIGMA)
   *
   * The V0 stamps feed the Boundary-Aware IM floor `max(IM_scenario, M − V_0)`
   * computed inside `pricing::v0_from_integer_px` on-chain.
   *
   * @example
   *   // Vanilla call (default direction = "buy")
   *   await skew.create({
   *     underlying: "BTC",
   *     payoff: "vanilla_call",
   *     strike: 80_000,
   *     expiry: "2026-05-08T16:00:00Z",
   *     notional: 1.0,
   *   });
   *
   * @example
   *   // Range accrual (upperBound required)
   *   await skew.create({
   *     underlying: "ETH",
   *     payoff: "range_accrual",
   *     strike: 2200,           // lower bound
   *     upperBound: 2400,
   *     expiry: "2026-05-08T16:00:00Z",
   *     notional: 100,
   *   });
   */
  async create(params: CreateParams): Promise<CreateResult> {
    this._assertProgramLoaded();
    const { underlying, payoff, strike, expiry, notional } = params;

    const creator = this.wallet.publicKey;
    const nonce = generateNonce();
    const [optionPda] = findOptionPda(creator, nonce);
    const [escrowPda] = findEscrowPda(optionPda);
    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);
    const [metadataPda] = findMetadataPda(optionTokenMintPda);

    // Phase 2 (2026-05-04) — generic settlement mint. Default USDC.
    const settlementMint = params.settlementMint ?? this.usdcMint;
    await this._requireCollateralPolicyMint(settlementMint);
    const payoffDecimals = settlementMintDecimals(settlementMint);

    const pythFeed = resolvePythFeed(underlying);
    const strikeOnChain = toOnChainStrike(strike);
    const expiryTs = isoToUnixSeconds(expiry);
    const payoffUnits = toSettlementUnits(notional, settlementMint);
    const upperBoundOnChain = params.upperBound ? toOnChainStrike(params.upperBound) : 0n;

    // V2.1 derivations
    const assetIdx = assetEnumIndex(underlying);
    const mapping = mapPayoffToAnchor(payoff);
    const directionWire = directionToI8(params.direction ?? mapping.defaultDirection);
    const extraParam = mapping.extraParam(params);

    // V0 stamp — auto-fetch from Pyth Hermes if caller didn't supply.
    // If Hermes is unavailable, caller can still pass spotAtCreation explicitly.
    const spotAtCreationUsd = params.spotAtCreation ?? (await fetchPythSpotUsd(underlying));
    const sigmaAtCreation = params.sigmaAtCreation ?? ASSET_DEFAULT_SIGMA[underlying];

    // i64 spot_at_creation: USD × 10^8 (matches Pyth on-chain convention)
    const spotI64 = BigInt(Math.round(spotAtCreationUsd * 1e8));

    // 1 — create_option (12 args matching anchor v2.1 signature)
    const createTx = await this._program()
      .methods.createOption(
        new BN(nonce.toString()),
        mapping.optionType as never,
        assetIdx, // u8: 5-asset enum index
        directionWire, // i8: +1 buy / -1 sell
        new BN(strikeOnChain.toString()),
        new BN(expiryTs.toString()),
        new BN(payoffUnits.toString()),
        payoffDecimals,
        new BN(upperBoundOnChain.toString()),
        extraParam, // f64
        new BN(spotI64.toString()), // i64: V0 spot stamp
        sigmaAtCreation, // f64: V0 σ stamp
      )
      .accounts({
        option: optionPda,
        creator,
        underlyingFeed: pythFeed,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        metadataPda,
        mplTokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        governance: findGovernancePda()[0],
      })
      .remainingAccounts(this._hamiltonRemaining())
      .transaction();

    // 2 — deposit_collateral (creator's settlement-mint ATA → escrow)
    const creatorAta = getAssociatedTokenAddressSync(settlementMint, creator);
    const depositTx = await this._program()
      .methods.depositCollateral(new BN(payoffUnits.toString()))
      .accounts({
        option: optionPda,
        creator,
        creatorTokenAccount: creatorAta,
        escrowTokenAccount: escrowPda,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    if (params.simulateOnly === true || params.dryRun === true || params.simulate === true) {
      const simulationTx = new Transaction();
      simulationTx.add(...createTx.instructions, ...depositTx.instructions);
      const simulation = await this._simulateTransaction(simulationTx);
      return {
        address: optionPda,
        nonce,
        createTx: "SIMULATED_CREATE_OPTION",
        depositTx: "SIMULATED_DEPOSIT_COLLATERAL",
        simulated: true,
        simulation,
      };
    }

    const createSig = await this._sendAndConfirm(createTx);
    const depositSig = await this._sendAndConfirm(depositTx);

    return {
      address: optionPda,
      nonce,
      createTx: createSig,
      depositTx: depositSig,
    };
  }

  /**
   * Buy an option. Sends premium in the option's settlement mint to the
   * creator's matching ATA. BGK correction, sigma-IV routing, and fee
   * calculation are all internal.
   */
  async buy(option: string | PublicKey, premiumUsd: number): Promise<BuyResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const buyer = this.wallet.publicKey;

    // Fetch option to get creator for premium_to routing.
    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;

    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);
    const [metadataPda] = findMetadataPda(optionTokenMintPda);
    const [feeAccumulator] = findFeeAccumulatorPda(settlementMint);
    const [feeAuthority] = findFeeAuthorityPda();
    const [buyerVolumeTracker] = findVolumeTrackerPda(buyer);
    const [feeConfig] = findFeeConfigPda();

    const buyerAta = getAssociatedTokenAddressSync(settlementMint, buyer);
    const creatorAta = getAssociatedTokenAddressSync(settlementMint, creator);
    const buyerOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda,
      buyer,
      false,
      TOKEN_PROGRAM_ID,
    );

    const [sigmaIvPda] = findSigmaIvPda();

    const tx = await this._program()
      .methods.buyOption(new BN(toUsdcUnits(premiumUsd).toString()))
      .accounts({
        option: optionPda,
        buyer,
        premiumFrom: buyerAta,
        premiumTo: creatorAta,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        optionTokenMint: optionTokenMintPda,
        optionTokenTo: buyerOptionAta,
        metadataPda,
        mplTokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        feeAccumulator,
        feeAuthority,
        sigmaIvPda,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        governance: findGovernancePda()[0],
        buyerVolumeTracker,
        feeConfig,
      })
      .remainingAccounts(this._hamiltonRemaining())
      .transaction();

    const sig = await this._sendAndConfirm(tx);
    return { txSignature: sig };
  }

  /**
   * Settle an expired option. Permissionless — anyone can call.
   * Reads Pyth price, routes payoff to holder, returns residual to creator.
   *
   * **If you just received the option via `transferOption()` in the previous
   * slot:** bundle transfer + settle in one tx using `bundleTransferAndSettle()`
   * (single-signer, current holder signs both ix) or
   * `buildBundleTransferAndSettleCoSigned()` (two-signer, new holder co-signs)
   * instead of calling settle separately. This eliminates the slot race where
   * the new holder's settle tx may land before transfer finalises.
   */
  async settle(option: string | PublicKey): Promise<SettleResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;

    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const holder: PublicKey = (raw as { holder: PublicKey }).holder;
    const pythFeed: PublicKey = (raw as { underlyingFeedId: PublicKey }).underlyingFeedId;
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;

    const [escrowPda] = findEscrowPda(optionPda);
    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);
    const [feeAccumulator] = findFeeAccumulatorPda(settlementMint);
    const [feeAuthority] = findFeeAuthorityPda();
    const cmOptional = await this._settleCmOptionalAccounts(optionPda, creator);
    const collOptional = await this._settleCollateralLockOptionalAccounts(optionPda, creator);
    const holderOptional = await this._settleHolderOptionalAccounts(optionPda, holder);

    const effectiveHolder = holder.equals(PublicKey.default) ? creator : holder;
    const holderAta = getAssociatedTokenAddressSync(settlementMint, effectiveHolder);
    const creatorAta = getAssociatedTokenAddressSync(settlementMint, creator);
    const holderOptionAta = holder.equals(PublicKey.default)
      ? SystemProgram.programId
      : getAssociatedTokenAddressSync(optionTokenMintPda, holder, false, TOKEN_PROGRAM_ID);

    const tx = await this._program()
      .methods.settle()
      .accounts({
        option: optionPda,
        caller: this.wallet.publicKey,
        pythPrice: pythFeed,
        escrowTokenAccount: escrowPda,
        optionTokenMint: optionTokenMintPda,
        currentHolderOptionAta: holderOptionAta,
        payoffTokenAccount: holderAta,
        creatorRefundTokenAccount: creatorAta,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
        creatorCm: cmOptional.creatorCm,
        positionRegistry: cmOptional.positionRegistry,
        creatorCmCollateralAta: cmOptional.creatorCmCollateralAta,
        swbAggregator: PublicKey.default,
        feeAccumulator,
        feeAuthority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        optionCollateralLock: collOptional.optionCollateralLock,
        lstVault: collOptional.lstVault,
        lstVaultAta: collOptional.lstVaultAta,
        nativeSolVault: collOptional.nativeSolVault,
        nativeSolVaultAta: collOptional.nativeSolVaultAta,
        holderCm: holderOptional.holderCm,
        holderPositionRegistry: holderOptional.holderPositionRegistry,
      } as any)
      .transaction();

    const sig = await this._sendAndConfirm(tx);
    return { txSignature: sig, payoffUsd: 0 }; // payoffUsd resolved via event/indexer post-tx
  }

  /**
   * Register the wallet as a Clearing Member (permissionless).
   *
   * Mirrors anchor `register_clearing_member` + `init_position_registry`.
   * The on-chain init is split into two instructions to stay inside Solana's
   * BPF stack budget, but the SDK submits them in one transaction so CM
   * onboarding remains atomic from the caller's point of view. The caller's
   * USDC ATA must already hold ≥ `initialCollateralUsdc` tokens — the SDK
   * does not auto-faucet (use spl-token-faucet.com on devnet).
   *
   * @example
   *   const result = await skew.registerClearingMember({
   *     initialCollateralUsdc: 50_000,    // $50k
   *   });
   *   console.log(`CM PDA: ${result.cmPda.toBase58()}`);
   */
  async registerClearingMember(params: RegisterCmParams): Promise<RegisterCmResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [cmPda] = findClearingMemberPda(authority);
    const [cmEscrow] = findCmEscrowPda(cmPda);
    const [positionRegistry] = findPositionRegistryPda(authority);
    const authorityUsdcAta = getAssociatedTokenAddressSync(this.usdcMint, authority);
    const collateralMicro = toUsdcUnits(params.initialCollateralUsdc);

    const registerIx = await this._program()
      .methods.registerClearingMember(new BN(collateralMicro.toString()))
      .accounts({
        cm: cmPda,
        authority,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        authorityUsdcAta,
        cmEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .instruction();

    const initRegistryIx = await this._program()
      .methods.initPositionRegistry()
      .accounts({
        cm: cmPda,
        positionRegistry,
        authority,
        systemProgram: SystemProgram.programId,
      })
      .instruction();

    const tx = new Transaction().add(registerIx, initRegistryIx);

    const txSignature = await this._sendAndConfirm(tx);
    return { cmPda, cmEscrow, positionRegistry, txSignature };
  }

  /**
   * Add USDC collateral to an existing CM escrow.
   * Idempotent — anchor `cm_add_collateral` accepts repeated deposits.
   *
   * @example
   *   await skew.cmAddCollateral(10_000);  // +$10K to existing CM
   */
  async cmAddCollateral(amountUsdc: number): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [cmPda] = findClearingMemberPda(authority);
    const [cmEscrow] = findCmEscrowPda(cmPda);
    const authorityUsdcAta = getAssociatedTokenAddressSync(this.usdcMint, authority);

    const tx = await this._program()
      .methods.cmAddCollateral(new BN(toUsdcUnits(amountUsdc).toString()))
      .accounts({
        cm: cmPda,
        authority,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        authorityUsdcAta,
        cmEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Withdraw USDC collateral from CM escrow back to authority's USDC ATA.
   * Anchor enforces `withdrawal ≤ free_collateral`
   * (collateral − tier_lockup − total_pm_locked). Tier lockup remains
   * IM-eligible through `tradable_collateral()`, but it cannot leave the
   * CM escrow until the downgrade window releases it.
   *
   * @example
   *   await skew.cmWithdrawCollateral(5_000);
   */
  async cmWithdrawCollateral(amountUsdc: number): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [cmPda] = findClearingMemberPda(authority);
    const [cmEscrow] = findCmEscrowPda(cmPda);
    const authorityUsdcAta = getAssociatedTokenAddressSync(this.usdcMint, authority);

    const tx = await this._program()
      .methods.cmWithdrawCollateral(new BN(toUsdcUnits(amountUsdc).toString()))
      .accounts({
        cm: cmPda,
        authority,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        authorityUsdcAta,
        cmEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /** One-shot fee-volume tracker init required before relay/CM atomic fills. */
  async initVolumeTracker(): Promise<TxResult & { volumeTracker: PublicKey }> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [volumeTracker] = findVolumeTrackerPda(authority);
    const tx = await this._program()
      .methods.initVolumeTracker()
      .accounts({
        volumeTracker,
        authority,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, volumeTracker };
  }

  /** SKEW_AUTHORITY one-shot init for the singleton FeeConfigPda. */
  async initFeeConfig(): Promise<TxResult & { feeConfig: PublicKey }> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [feeConfig] = findFeeConfigPda();
    const tx = await this._program()
      .methods.initFeeConfig()
      .accounts({
        feeConfig,
        authority,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, feeConfig };
  }

  /** SKEW_AUTHORITY one-shot init for the collateral mint policy allowlist. */
  async initCollateralPolicy(): Promise<TxResult & { policy: PublicKey }> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const policy = this._collateralPolicy();
    const tx = await this._program()
      .methods.initCollateralPolicy()
      .accounts({
        authority,
        policy,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, policy };
  }

  /**
   * Permissionless per-mint protocol fee accumulator bootstrap.
   *
   * Atomic fills require the fee accumulator account to already exist so the
   * hot fill ix can stay deterministic and CU-bounded. This helper mirrors
   * the relay's automatic prefill bootstrap and works for USDC, wSOL, and
   * jitoSOL as long as the mint is registered in CollateralPolicyPda.
   */
  async initFeeAccumulator(
    settlementMint: PublicKey = this.usdcMint,
  ): Promise<TxResult & { feeAccumulator: PublicKey }> {
    this._assertProgramLoaded();
    const payer = this.wallet.publicKey;
    const [feeAccumulator] = findFeeAccumulatorPda(settlementMint);
    const [feeAuthority] = findFeeAuthorityPda();
    const tx = await this._program()
      .methods.initFeeAccumulator()
      .accounts({
        payer,
        feeAccumulator,
        feeAuthority,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, feeAccumulator };
  }

  /** SKEW_AUTHORITY registers a settlement/collateral mint in CollateralPolicyPda. */
  async registerCollateralPolicyEntry(args: {
    mint: PublicKey;
    decimals: number;
    kind: 0 | 1 | 2;
    oracleFeed?: PublicKey;
    maxDepegBps?: number;
  }): Promise<TxResult> {
    this._assertProgramLoaded();
    const tx = await this._program()
      .methods.registerCollateralPolicyEntry(
        args.mint,
        args.decimals,
        args.kind,
        args.oracleFeed ?? PublicKey.default,
        args.maxDepegBps ?? 0,
      )
      .accounts({
        authority: this.wallet.publicKey,
        policy: this._collateralPolicy(),
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Transfer an option SPL Token from current holder to a new holder.
   * Auto-creates the new holder's option ATA if missing. Novation is
   * automatic on-chain — issuer (CM) is preserved; only `holder` changes.
   *
   * **Race-safe immediate settlement:** if the new holder intends to settle
   * the option soon after receiving it (e.g. transfer happens at expiry),
   * use `bundleTransferAndSettle()` instead. A standalone `transferOption()`
   * followed by an immediate `settle()` from the new holder may race in the
   * same slot — Solana guarantees atomic ix execution, so one of the two
   * fails cleanly (no data corruption), but the second tx wastes fees if
   * the first hasn't landed yet. Bundling avoids the round-trip.
   *
   * @example
   *   await skew.transferOption(optionPda, newHolderPubkey);
   */
  async transferOption(
    option: string | PublicKey,
    newHolder: string | PublicKey,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const newHolderPk = typeof newHolder === "string" ? new PublicKey(newHolder) : newHolder;
    const currentHolder = this.wallet.publicKey;

    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);
    const currentHolderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda,
      currentHolder,
      false,
      TOKEN_PROGRAM_ID,
    );
    const newHolderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda,
      newHolderPk,
      false,
      TOKEN_PROGRAM_ID,
    );

    const transferIx = await this._program()
      .methods.transferOption()
      .accounts({
        option: optionPda,
        currentHolder,
        currentHolderOptionAta,
        newHolder: newHolderPk,
        newHolderOptionAta,
        optionTokenMint: optionTokenMintPda,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .instruction();

    const tx = new Transaction();
    const untrackIx = await this._buildUntrackHeldPositionIx(optionPda, currentHolder);
    if (untrackIx) tx.add(untrackIx);
    tx.add(transferIx);
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Bundle `transfer_option` + `settle` into a single atomic tx (single-signer).
   *
   * Use case: the current holder hands the option to `newHolder` AND has it
   * settled in the same tx — e.g. expiry is imminent and the new holder does
   * not want to pay rent on the option PDA after acquiring it. Both ix succeed
   * or both rollback (Solana atomic-tx guarantee). No race window where the
   * new holder is briefly the SPL token owner but settlement has not happened.
   *
   * **Caveats:**
   *  - `caller` for settle is the current holder (this wallet), but
   *    `payoffTokenAccount` routes USDC payoff to the **new holder's** USDC
   *    ATA — current holder pays rent for transfer ATA init but receives
   *    nothing from settlement.
   *  - Requires `option.state == Active` AND `now >= expiry`. Pre-expiry calls
   *    revert at the settle ix with `SkewError::NotExpired` and rollback the
   *    transfer too.
   *  - For the cross-wallet case where the new holder co-signs the settle,
   *    use `buildBundleTransferAndSettleCoSigned()`.
   *
   * @example
   *   // Holder A hands option to B and settles in one shot at expiry
   *   await skew.bundleTransferAndSettle(optionPda, bWallet);
   */
  async bundleTransferAndSettle(
    option: string | PublicKey,
    newHolder: string | PublicKey,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const newHolderPk = typeof newHolder === "string" ? new PublicKey(newHolder) : newHolder;
    const currentHolder = this.wallet.publicKey;

    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const pythFeed: PublicKey = (raw as { underlyingFeedId: PublicKey }).underlyingFeedId;
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;

    const [escrowPda] = findEscrowPda(optionPda);
    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);
    const [feeAccumulator] = findFeeAccumulatorPda(settlementMint);
    const [feeAuthority] = findFeeAuthorityPda();
    const cmOptional = await this._settleCmOptionalAccounts(optionPda, creator);
    const collOptional = await this._settleCollateralLockOptionalAccounts(optionPda, creator);

    const currentHolderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda,
      currentHolder,
      false,
      TOKEN_PROGRAM_ID,
    );
    const newHolderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda,
      newHolderPk,
      false,
      TOKEN_PROGRAM_ID,
    );
    const newHolderUsdcAta = getAssociatedTokenAddressSync(settlementMint, newHolderPk);
    const creatorUsdcAta = getAssociatedTokenAddressSync(settlementMint, creator);

    const transferIx = await this._program()
      .methods.transferOption()
      .accounts({
        option: optionPda,
        currentHolder,
        currentHolderOptionAta,
        newHolder: newHolderPk,
        newHolderOptionAta,
        optionTokenMint: optionTokenMintPda,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .instruction();

    // After transferIx, the option SPL token sits in newHolderOptionAta —
    // settle ix burns from there and routes payoff to newHolderUsdcAta.
    const settleIx = await this._program()
      .methods.settle()
      .accounts({
        option: optionPda,
        caller: currentHolder,
        pythPrice: pythFeed,
        escrowTokenAccount: escrowPda,
        optionTokenMint: optionTokenMintPda,
        currentHolderOptionAta: newHolderOptionAta,
        payoffTokenAccount: newHolderUsdcAta,
        creatorRefundTokenAccount: creatorUsdcAta,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
        creatorCm: cmOptional.creatorCm,
        positionRegistry: cmOptional.positionRegistry,
        creatorCmCollateralAta: cmOptional.creatorCmCollateralAta,
        swbAggregator: PublicKey.default,
        feeAccumulator,
        feeAuthority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        optionCollateralLock: collOptional.optionCollateralLock,
        lstVault: collOptional.lstVault,
        lstVaultAta: collOptional.lstVaultAta,
        nativeSolVault: collOptional.nativeSolVault,
        nativeSolVaultAta: collOptional.nativeSolVaultAta,
      } as any)
      .instruction();

    const tx = new Transaction().add(transferIx, settleIx);
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Two-signer variant of `bundleTransferAndSettle`. Returns a `Transaction`
   * with the transfer ix signed by the current holder; the caller must
   * `partialSign(newHolderKeypair)` and then submit the raw bytes.
   *
   * Use case: A and B negotiate an OTC handoff at expiry — B wants to receive
   * the option AND be the `caller` for settle in the same tx (so the settle
   * payoff arrives without a separate B-signed tx). The settle ix's `caller`
   * is `newHolder`, which makes B a required signer.
   *
   * The SDK does **not** submit — caller is responsible for `partialSign` +
   * `connection.sendRawTransaction`.
   *
   * @example
   *   // A builds + partial-signs, hands serialized tx to B
   *   const partial = await skewA.buildBundleTransferAndSettleCoSigned(opt, bWallet.publicKey);
   *   // B co-signs and submits
   *   partial.partialSign(bKeypair);
   *   const sig = await connection.sendRawTransaction(partial.serialize());
   */
  async buildBundleTransferAndSettleCoSigned(
    option: string | PublicKey,
    newHolder: PublicKey,
  ): Promise<Transaction> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const currentHolder = this.wallet.publicKey;

    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const pythFeed: PublicKey = (raw as { underlyingFeedId: PublicKey }).underlyingFeedId;
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;

    const [escrowPda] = findEscrowPda(optionPda);
    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);
    const [feeAccumulator] = findFeeAccumulatorPda(settlementMint);
    const [feeAuthority] = findFeeAuthorityPda();
    const cmOptional = await this._settleCmOptionalAccounts(optionPda, creator);
    const collOptional = await this._settleCollateralLockOptionalAccounts(optionPda, creator);

    const currentHolderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda,
      currentHolder,
      false,
      TOKEN_PROGRAM_ID,
    );
    const newHolderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda,
      newHolder,
      false,
      TOKEN_PROGRAM_ID,
    );
    const newHolderUsdcAta = getAssociatedTokenAddressSync(settlementMint, newHolder);
    const creatorUsdcAta = getAssociatedTokenAddressSync(settlementMint, creator);

    const transferIx = await this._program()
      .methods.transferOption()
      .accounts({
        option: optionPda,
        currentHolder,
        currentHolderOptionAta,
        newHolder,
        newHolderOptionAta,
        optionTokenMint: optionTokenMintPda,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .instruction();

    // settle ix's caller = newHolder → newHolder must sign as well.
    const settleIx = await this._program()
      .methods.settle()
      .accounts({
        option: optionPda,
        caller: newHolder,
        pythPrice: pythFeed,
        escrowTokenAccount: escrowPda,
        optionTokenMint: optionTokenMintPda,
        currentHolderOptionAta: newHolderOptionAta,
        payoffTokenAccount: newHolderUsdcAta,
        creatorRefundTokenAccount: creatorUsdcAta,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
        creatorCm: cmOptional.creatorCm,
        positionRegistry: cmOptional.positionRegistry,
        creatorCmCollateralAta: cmOptional.creatorCmCollateralAta,
        swbAggregator: PublicKey.default,
        feeAccumulator,
        feeAuthority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        optionCollateralLock: collOptional.optionCollateralLock,
        lstVault: collOptional.lstVault,
        lstVaultAta: collOptional.lstVaultAta,
        nativeSolVault: collOptional.nativeSolVault,
        nativeSolVaultAta: collOptional.nativeSolVaultAta,
      } as any)
      .instruction();

    const tx = new Transaction().add(transferIx, settleIx);
    tx.feePayer = currentHolder;
    const { blockhash } = await this.connection.getLatestBlockhash("confirmed");
    tx.recentBlockhash = blockhash;
    await this.wallet.signTransaction(tx);
    return tx;
  }

  /**
   * Cancel an option BEFORE any buy. Only the creator can call — anchor
   * rejects if the option's `holder` is set (i.e. someone has bought it).
   * Returns escrow collateral to creator.
   *
   * @example
   *   await skew.cancelOption(optionPda);
   */
  async cancelOption(option: string | PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const creator = this.wallet.publicKey;
    const [escrowPda] = findEscrowPda(optionPda);
    const raw = await this._fetchOption(optionPda);
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;
    const creatorAta = getAssociatedTokenAddressSync(settlementMint, creator);

    const tx = await this._program()
      .methods.cancelOption()
      .accounts({
        option: optionPda,
        creator,
        escrowTokenAccount: escrowPda,
        creatorTokenAccount: creatorAta,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Close an expired option. Permissionless — anyone can call.
   * Used by Settler bots to sweep abandoned options after expiry.
   *
   * Difference from `settle()`: `close_expired` returns escrow back to creator
   * when the option went unsold (no holder); `settle` distributes payoff to
   * holder. Anchor routes correctly per option state.
   *
   * @example
   *   await skew.closeExpired(optionPda);
   */
  async closeExpired(option: string | PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const caller = this.wallet.publicKey;
    const [escrowPda] = findEscrowPda(optionPda);

    // Need creator pubkey to compute their ATA — fetch from option account
    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;
    const creatorAta = getAssociatedTokenAddressSync(settlementMint, creator);

    const tx = await this._program()
      .methods.closeExpired()
      .accounts({
        option: optionPda,
        caller,
        creator,
        escrowTokenAccount: escrowPda,
        creatorTokenAccount: creatorAta,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Close a released OptionCollateralLockPda sidecar and reclaim rent to the
   * writer. Normal stable and physical settlement mark the sidecar Released;
   * this sweep is intentionally separate so settlement stays on the hot path.
   */
  async closeOptionCollateralLock(option: string | PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const [lock] = findOptionCollateralLockPda(optionPda);
    const lockAcc: any = await (this._program().account as any).optionCollateralLockPda.fetch(lock);
    const refund: PublicKey = lockAcc.writer;
    const tx = await this._program()
      .methods.closeOptionCollateralLock()
      .accounts({
        lock,
        caller: this.wallet.publicKey,
        refund,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Track an option token held by this wallet as a CM long hedge.
   *
   * This is the portfolio-margin bridge institutional desks expect: after a
   * CM buys an option, call this once so the long is included in the same
   * PositionRegistryPda as writer shorts and offsets future IM.
   */
  async trackHeldPosition(
    option: string | PublicKey,
  ): Promise<TxResult & { cmPda: PublicKey; positionRegistry: PublicKey }> {
    this._assertProgramLoaded();
    const holder = this.wallet.publicKey;
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const [cmPda] = findClearingMemberPda(holder);
    const [positionRegistry] = findPositionRegistryPda(holder);
    const [optionTokenMint] = findOptionTokenMintPda(optionPda);
    const holderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMint,
      holder,
      false,
      TOKEN_PROGRAM_ID,
    );
    const tx = await this._program()
      .methods.trackHeldPosition()
      .accounts({
        holder,
        cm: cmPda,
        positionRegistry,
        option: optionPda,
        optionTokenMint,
        holderOptionAta,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, cmPda, positionRegistry };
  }

  /**
   * Remove a CM-held long from the PM registry. The SDK calls this
   * automatically before `transferOption()` when the position is tracked.
   */
  async untrackHeldPosition(option: string | PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const holder = this.wallet.publicKey;
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const ix = await this._buildUntrackHeldPositionIx(optionPda, holder);
    if (!ix) throw new Error(`Option is not tracked by ${holder.toBase58()}`);
    const tx = new Transaction().add(ix);
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Recompute PM and release excess marginal IM from a relay option escrow
   * back into the writer CM escrow. `maxReleaseUsdc=0` means "release all
   * excess". Stable USDC CM lane only; physical SOL-family locks settle from
   * their vault-specific path.
   */
  async rebalancePmLock(
    option: string | PublicKey,
    maxReleaseUsdc = 0,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;
    const [cm] = findClearingMemberPda(creator);
    const [positionRegistry] = findPositionRegistryPda(creator);
    const [optionEscrow] = findEscrowPda(optionPda);
    const [cmEscrow] = findCmEscrowPda(cm);
    const [optionCollateralLock] = findOptionCollateralLockPda(optionPda);
    const pmRemaining = await this._pmRemaining(creator);
    const tx = await this._program()
      .methods.rebalancePmLock(new BN(toUsdcUnits(maxReleaseUsdc).toString()))
      .accounts({
        caller: this.wallet.publicKey,
        cm,
        positionRegistry,
        option: optionPda,
        settlementMint,
        optionEscrow,
        cmEscrow,
        optionCollateralLock,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(pmRemaining)
      .preInstructions([
        ComputeBudgetProgram.setComputeUnitLimit({
          units: PM_VARIATION_CU_LIMIT,
        }),
      ])
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Read-only — invoke `calculate_margin` ( PM v1.4) for the
   * caller's CM and return the IM breakdown. The instruction itself just
   * recomputes + writes the result into the CM PDA; this helper sends the tx
   * then reads the PDA so the caller gets numbers in one call.
   *
   * @param currentSpotUsd — current mark spot USD (e.g. fetch from Pyth Hermes
   *                         on the BTC feed). Used by anchor for stress sims.
   * @example
   *   const m = await skew.calculateMargin(77_645.20);
   *   console.log(`free: $${Number(m.freeCollateralUsdcMicro) / 1e6}`);
   */
  async calculateMargin(currentSpotUsd: number): Promise<MarginCalcResult> {
    this._assertProgramLoaded();
    const caller = this.wallet.publicKey;
    const [cmPda] = findClearingMemberPda(caller);

    const pmRemaining = await this._pmRemaining(caller);

    // ConvexHullIM dispatch + Greeks aggregation + per-asset PoVS / Hamilton
    // reads + tier-specific add-ons can exceed the default 200 K CU budget on
    // larger portfolios. Bump to 1 M unconditionally — the upper bound for a
    // 10-position × 5-asset Platinum scan is ~145 kCU (`docs/runbooks/cu-budget-tier-v5.md`).
    const cuLimit = ComputeBudgetProgram.setComputeUnitLimit({
      units: PM_CALCULATE_CU_LIMIT,
    });

    const tx = await this._program()
      .methods.calculateMargin(currentSpotUsd)
      .accounts({
        caller,
        cm: cmPda,
      })
      .remainingAccounts(pmRemaining)
      .preInstructions([cuLimit])
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);

    // Read CM PDA to extract resulting IM breakdown
    const cmAccountClient = (
      this._program().account as Record<string, { fetch: (k: PublicKey) => Promise<unknown> }>
    )["clearingMember"];
    if (!cmAccountClient) {
      // Fallback if account name differs — return tx sig only
      return {
        txSignature,
        collateralUsdcMicro: 0n,
        imLockedUsdcMicro: 0n,
        freeCollateralUsdcMicro: 0n,
      };
    }
    const cm = (await cmAccountClient.fetch(cmPda)) as Record<string, BN | undefined>;
    const bnField = (...keys: string[]): bigint => {
      for (const key of keys) {
        const value = cm[key];
        if (value) return BigInt(value.toString());
      }
      return 0n;
    };
    const satSub = (a: bigint, b: bigint): bigint => (a > b ? a - b : 0n);
    const collateral = bnField("collateral");
    const lastIm = bnField("lastImMicro", "last_im_micro");
    const tierLockup = bnField("tierLockupCollateral", "tier_lockup_collateral");
    const totalPmLocked = bnField("totalPmLockedMicro", "total_pm_locked_micro");
    const freeCollateral = satSub(satSub(collateral, tierLockup), totalPmLocked);
    return {
      txSignature,
      collateralUsdcMicro: collateral,
      imLockedUsdcMicro: lastIm,
      freeCollateralUsdcMicro: freeCollateral,
    };
  }

  /**
   * Sweep an abandoned option after the 72h grace window past expiry.
   * Distinct from `closeExpired` which closes within 72h. Returns escrow to
   * creator. Permissionless — anyone can call.
   *
   * @example
   *   await skew.expireAbandoned(optionPda);
   */
  async expireAbandoned(option: string | PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const caller = this.wallet.publicKey;
    const [escrowPda] = findEscrowPda(optionPda);
    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const settlementMint: PublicKey =
      (raw as { settlementMint?: PublicKey }).settlementMint ?? this.usdcMint;
    const creatorAta = getAssociatedTokenAddressSync(settlementMint, creator);

    const tx = await this._program()
      .methods.expireAbandoned()
      .accounts({
        option: optionPda,
        caller,
        escrowTokenAccount: escrowPda,
        creatorRefundTokenAccount: creatorAta,
        settlementMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Trigger Dutch-auction liquidation. Permissionless — anyone with USDC ATA
   * can call. Bonus floor is guarded by the optional
   * `minExpectedBonusBps` slippage check; pass `0` to disable it.
   *
   * NOTE: anchor enforces `liquidator != defaultingCmAuthority`. The SDK
   * pre-validates to avoid wasting a tx fee.
   *
   * @example
   *   await skew.liquidate(optionPda, defaultingCmAuthority, 5000);
   */
  async liquidate(
    option: string | PublicKey,
    defaultingCmAuthority: string | PublicKey,
    closeFactorBps: number,
    minExpectedBonusBps = 0,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    if (closeFactorBps < 1 || closeFactorBps > 5000 || !Number.isInteger(closeFactorBps)) {
      throw new Error(`closeFactorBps must be 1..5000, got ${closeFactorBps}`);
    }
    if (
      minExpectedBonusBps < 0 ||
      minExpectedBonusBps > 10_000 ||
      !Number.isInteger(minExpectedBonusBps)
    ) {
      throw new Error(`minExpectedBonusBps must be 0..10000, got ${minExpectedBonusBps}`);
    }
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const cmAuthorityPk =
      typeof defaultingCmAuthority === "string"
        ? new PublicKey(defaultingCmAuthority)
        : defaultingCmAuthority;
    const liquidator = this.wallet.publicKey;
    if (liquidator.equals(cmAuthorityPk)) {
      throw new Error(
        "liquidator must differ from defaulting CM authority (Bug #7 self-liquidation guard)",
      );
    }
    const [liqState] = findLiqStatePda(optionPda);
    const [optionEscrow] = findEscrowPda(optionPda);
    const [defaultingCm] = findClearingMemberPda(cmAuthorityPk);
    const [positionRegistry] = findPositionRegistryPda(cmAuthorityPk);
    const [cmEscrow] = findCmEscrowPda(defaultingCm);
    const [insuranceFund] = findInsuranceFundPda();
    const [ifEscrow] = findIfEscrowPda();
    const liquidatorPayoutAta = getAssociatedTokenAddressSync(this.usdcMint, liquidator);
    const pmRemaining = await this._pmRemaining(cmAuthorityPk);
    const [optionCollateralLock] = findOptionCollateralLockPda(optionPda);

    const tx = await this._program()
      .methods.liquidate(closeFactorBps, minExpectedBonusBps)
      .accounts({
        liqState,
        option: optionPda,
        defaultingCm,
        positionRegistry,
        insuranceFund,
        optionEscrow,
        cmEscrow,
        ifEscrow,
        liquidatorPayoutAta,
        settlementMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        liquidator,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts([
        ...pmRemaining,
        { pubkey: optionCollateralLock, isWritable: true, isSigner: false },
      ])
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Roll over a currently-OTM option past expiry to a new expiry. Creator-only.
   * Anchor rejects ITM rollover (must `settle` instead — see SkewError 6029
   * `OptionIsITM`). Re-uses the same collateral; new expiry / strike / payoff.
   *
   * @example
   *   await skew.rolloverOption(oldOptionPda, {
   *     newExpiry: "2026-06-10T16:00:00Z",
   *     newStrike: 75_000,
   *     newNotional: 1_000,
   *   });
   *
   * NOTE: requires Pyth feed + Switchboard aggregator pubkeys for
   * settlement-spot read; the SDK fetches via `resolvePythFeed(asset)` from
   * the old option's underlying. SwitchboardAggregator pubkey must be passed
   * via `swbAggregator` if the underlying is on Tier 2 — for Tier 1
   * (BTC/ETH/SOL) it's the same Pyth feed.
   */
  async rolloverOption(
    oldOption: string | PublicKey,
    params: {
      newExpiry: string;
      newStrike: number;
      newNotional: number;
      swbAggregator?: PublicKey;
    },
  ): Promise<{ newOptionPda: PublicKey; txSignature: string }> {
    this._assertProgramLoaded();
    const oldOptionPda = typeof oldOption === "string" ? new PublicKey(oldOption) : oldOption;
    const creator = this.wallet.publicKey;
    const newNonce = generateNonce();
    const [newOptionPda] = findOptionPda(creator, newNonce);
    const [oldEscrow] = findEscrowPda(oldOptionPda);
    const [newEscrow] = findEscrowPda(newOptionPda);

    const raw = await this._fetchOption(oldOptionPda);
    const pythFeed: PublicKey = (raw as { underlyingFeedId: PublicKey }).underlyingFeedId;
    const swb = params.swbAggregator ?? pythFeed;

    const newExpiryTs = isoToUnixSeconds(params.newExpiry);
    const newStrikeOnChain = toOnChainStrike(params.newStrike);
    const newPayoffUnits = toUsdcUnits(params.newNotional);

    const tx = await this._program()
      .methods.rolloverOption(
        new BN(newNonce.toString()),
        new BN(newExpiryTs.toString()),
        new BN(newStrikeOnChain.toString()),
        new BN(newPayoffUnits.toString()),
      )
      .accounts({
        creator,
        oldOption: oldOptionPda,
        newOption: newOptionPda,
        oldEscrow,
        newEscrow,
        collateralMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        pythPrice: pythFeed,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        governance: findGovernancePda()[0],
        swbAggregator: swb,
      })
      .remainingAccounts(this._hamiltonRemaining())
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { newOptionPda, txSignature };
  }

  /**
   * List options on-chain via `getProgramAccounts` with the OptionAccount
   * discriminator filter (added automatically by Anchor). Returns decoded
   * summaries — strike in USD, expiry as unix seconds, state/type as their
   * IDL variant names, etc.
   *
   * Pure read — no signer required. Filters (`underlying`, `optionType`,
   * `state`) are applied client-side after decode; for current devnet
   * volumes (~tens to a few hundred options) one full scan is faster than
   * round-tripping per-byte memcmp filters. Hard cap of 500 returned items
   * keeps JSON payloads bounded.
   *
   * @example
   *   // Browse all live BTC options sorted by latest expiry first.
   *   const live = await skew.listOptions({
   *     underlying: "BTC",
   *     state: "Active",
   *     sortBy: "expiry",
   *     limit: 50,
   *   });
   *
   * @example
   *   // Find the writer's just-created Range Accruals before any buyer.
   *   const created = await skew.listOptions({
   *     optionType: "RangeAccrual",
   *     state: "Created",
   *   });
   */
  async listOptions(opts: ListOptionsOpts = {}): Promise<OptionSummary[]> {
    this._assertProgramLoaded();
    const accClient = (
      this._program().account as Record<
        string,
        {
          all: () => Promise<Array<{ publicKey: PublicKey; account: unknown }>>;
        }
      >
    )["optionAccount"];
    if (!accClient) {
      throw new Error("IDL not loaded — use SkewClient.fromProgram()");
    }

    const raw = await accClient.all();
    let summaries: OptionSummary[] = [];
    for (const entry of raw) {
      const decoded = decodeOptionAccount(entry.publicKey, entry.account);
      if (decoded) summaries.push(decoded);
    }

    if (opts.underlying) summaries = summaries.filter((s) => s.underlying === opts.underlying);
    if (opts.optionType) summaries = summaries.filter((s) => s.optionType === opts.optionType);
    if (opts.state) summaries = summaries.filter((s) => s.state === opts.state);

    const sortBy = opts.sortBy ?? "createdAt";
    summaries.sort((a, b) =>
      sortBy === "expiry" ? b.expiryTs - a.expiryTs : b.createdAt - a.createdAt,
    );

    const limit = Math.max(0, Math.min(opts.limit ?? 100, 500));
    return summaries.slice(0, limit);
  }

  private async _fetchOption(pda: PublicKey): Promise<unknown> {
    const acc = (
      this._program().account as Record<string, { fetch: (k: PublicKey) => Promise<unknown> }>
    )["optionAccount"];
    if (!acc) throw new Error("IDL not loaded — use SkewClient.fromProgram()");
    const result = await acc.fetch(pda);
    if (!result) throw new Error(`Option not found: ${pda.toBase58()}`);
    return result;
  }

  private async _sendAndConfirm(tx: Transaction): Promise<string> {
    const { blockhash, lastValidBlockHeight } =
      await this.connection.getLatestBlockhash("confirmed");
    tx.recentBlockhash = blockhash;
    tx.feePayer = this.wallet.publicKey;
    const signed = await this.wallet.signTransaction(tx);
    const sig = await this.connection.sendRawTransaction(signed.serialize(), {
      skipPreflight: false,
    });
    await this.connection.confirmTransaction(
      { signature: sig, blockhash, lastValidBlockHeight },
      "confirmed",
    );
    return sig;
  }

  private async _simulateTransaction(tx: Transaction): Promise<TxSimulationResult> {
    const { blockhash } = await this.connection.getLatestBlockhash("confirmed");
    tx.recentBlockhash = blockhash;
    tx.feePayer = this.wallet.publicKey;
    const signed = await this.wallet.signTransaction(tx);
    const sim = await this.connection.simulateTransaction(signed, undefined, false);
    return {
      ok: sim.value.err == null,
      err: sim.value.err == null ? null : JSON.stringify(sim.value.err),
      unitsConsumed: sim.value.unitsConsumed ?? undefined,
      logs: sim.value.logs ?? [],
    };
  }

  // -------------------------------------------------------------------------
  // Phase 1635 — Isolated Margin per-position vault
  //
  // A user opts into isolated margin for a SPECIFIC option by initialising
  // a per-(user, option) vault, depositing USDC, and letting settle/liquidate
  // drain the vault first when remaining_accounts carries the matching
  // (vault_pda, vault_escrow) pair.
  // -------------------------------------------------------------------------

  /**
   * One-shot per (user, option) — initialise the IsolatedVault PDA + escrow ATA.
   * Caller pays rent (~0.004 SOL).
   */
  async initIsolatedVault(option: string | PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const user = this.wallet.publicKey;
    const [vault] = findIsolatedVaultPda(user, optionPda);
    const [vaultEscrow] = findIsolatedVaultEscrowPda(vault);

    const tx = await this._program()
      .methods.initIsolatedVault()
      .accounts({
        user,
        option: optionPda,
        vault,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        vaultEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * User → vault USDC transfer. Increments `vault.usdc_micro`.
   * Vault must already be initialised via `initIsolatedVault`.
   */
  async depositIsolated(option: string | PublicKey, amountUsdc: number): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const user = this.wallet.publicKey;
    const [vault] = findIsolatedVaultPda(user, optionPda);
    const [vaultEscrow] = findIsolatedVaultEscrowPda(vault);
    const userAta = getAssociatedTokenAddressSync(this.usdcMint, user);

    const tx = await this._program()
      .methods.depositIsolated(new BN(toUsdcUnits(amountUsdc).toString()))
      .accounts({
        user,
        vault,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        userAta,
        vaultEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Vault → user USDC transfer. Anchor enforces
   * `amount ≤ vault.free_micro()` so funds locked behind an open option
   * fill cannot be pulled.
   */
  async withdrawIsolated(option: string | PublicKey, amountUsdc: number): Promise<TxResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const user = this.wallet.publicKey;
    const [vault] = findIsolatedVaultPda(user, optionPda);
    const [vaultEscrow] = findIsolatedVaultEscrowPda(vault);
    const userAta = getAssociatedTokenAddressSync(this.usdcMint, user);

    const tx = await this._program()
      .methods.withdrawIsolated(new BN(toUsdcUnits(amountUsdc).toString()))
      .accounts({
        user,
        vault,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        userAta,
        vaultEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // -------------------------------------------------------------------------
  // Phase 1637 — Multi-leg combo intent
  //
  // Buyer commits upfront premium to a multi-leg strategy (Iron Condor /
  // vertical spread / etc.). Off-chain relay coordinates leg fills via
  // atomic_fill_relay with the combo PDA in remaining_accounts. Once all
  // legs filled, finalize_combo_intent flips → Active and refunds residual.
  // -------------------------------------------------------------------------

  /**
   * Register a multi-leg combo intent — escrow upfront max premium + pin
   * the leg specs (option PDAs + side ±1 + per-leg max premium).
   *
   * @param comboId — caller-chosen u64 nonce; same buyer can run multiple
   *   concurrent combos.
   * @param legs — 2..=4 legs. Leg's `option` PDA must be deterministic
   *   (predicted via `findOptionPda(cm_authority, relay_nonce)` for relay
   *   path or already-existing for OTC).
   * @param totalMaxPremiumUsdc — cap on total premium across all legs.
   * @param expiryTsSeconds — unix ts of combo expiry. Cancel becomes
   *   permitted at any time before; fills must complete by then.
   */
  async registerComboIntent(
    comboId: bigint,
    legs: ComboLeg[],
    totalMaxPremiumUsdc: number,
    expiryTsSeconds: bigint,
  ): Promise<TxResult & { combo: PublicKey; comboEscrow: PublicKey }> {
    this._assertProgramLoaded();
    if (legs.length < 2 || legs.length > 4) {
      throw new Error(`registerComboIntent: legs.length must be 2..=4, got ${legs.length}`);
    }
    const buyer = this.wallet.publicKey;
    const [combo] = findComboIntentPda(buyer, comboId);
    const [comboEscrow] = findComboEscrowPda(combo);
    const buyerAta = getAssociatedTokenAddressSync(this.usdcMint, buyer);

    // Pad to fixed-4 array.
    const legOptions: PublicKey[] = [
      legs[0]?.option ?? PublicKey.default,
      legs[1]?.option ?? PublicKey.default,
      legs[2]?.option ?? PublicKey.default,
      legs[3]?.option ?? PublicKey.default,
    ];
    const legSides: number[] = [
      legs[0]?.side ?? 0,
      legs[1]?.side ?? 0,
      legs[2]?.side ?? 0,
      legs[3]?.side ?? 0,
    ];
    const legMaxPremiums: BN[] = [0, 1, 2, 3].map(
      (i) => new BN(toUsdcUnits(legs[i]?.maxPremiumUsdc ?? 0).toString()),
    );

    const tx = await this._program()
      .methods.registerComboIntent(
        new BN(comboId.toString()),
        legs.length,
        legOptions,
        legSides,
        legMaxPremiums,
        new BN(toUsdcUnits(totalMaxPremiumUsdc).toString()),
        new BN(expiryTsSeconds.toString()),
      )
      .accounts({
        buyer,
        combo,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        buyerAta,
        comboEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        governance: findGovernancePda()[0],
      })
      .remainingAccounts(this._hamiltonRemaining())
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, combo, comboEscrow };
  }

  /**
   * Cancel an Open combo. Refunds residual escrow + closes the PDA + escrow,
   * recovering ~0.004 SOL of rent. Must be Open status (not Active/Cancelled).
   */
  async cancelComboIntent(comboId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const buyer = this.wallet.publicKey;
    const [combo] = findComboIntentPda(buyer, comboId);
    const [comboEscrow] = findComboEscrowPda(combo);
    const buyerAta = getAssociatedTokenAddressSync(this.usdcMint, buyer);

    const tx = await this._program()
      .methods.cancelComboIntent()
      .accounts({
        buyer,
        combo,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        buyerAta,
        comboEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Finalise a fully-filled combo. Flips status → Active, refunds residual
   * (max premium − actually paid), closes the PDA + escrow.
   */
  async finalizeComboIntent(comboId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const buyer = this.wallet.publicKey;
    const [combo] = findComboIntentPda(buyer, comboId);
    const [comboEscrow] = findComboEscrowPda(combo);
    const buyerAta = getAssociatedTokenAddressSync(this.usdcMint, buyer);

    const tx = await this._program()
      .methods.finalizeComboIntent()
      .accounts({
        buyer,
        combo,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        buyerAta,
        comboEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // -------------------------------------------------------------------------
  // Read-only fetchers — DVOL + IsolatedVault + ComboIntent
  // -------------------------------------------------------------------------

  /**
   * Fetch the latest DVOL snapshot for an asset. Returns null when no
   * crank has run yet (PDA does not exist).
   */
  async fetchDvol(assetIdx: number): Promise<DvolSnapshot | null> {
    this._assertProgramLoaded();
    const [dvolPda] = findDvolPda(assetIdx);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).dvolPda.fetch(dvolPda);
      const slot = await this.connection.getSlot();
      const lastSlot = BigInt(acc.lastUpdateSlot.toString());
      // DVOL_STALENESS_SLOTS = 9_000 (≈ 1 h at 400 ms/slot).
      const isFresh = BigInt(slot) - lastSlot < 9_000n;
      return {
        dvol28dPct: Number(acc.dvol28dMicro.toString()) / 10_000,
        dvol90dPct: Number(acc.dvol90dMicro.toString()) / 10_000,
        realizedVar28dPct: Number(acc.realizedVar28dMicro.toString()) / 10_000,
        lastUpdateSlot: lastSlot,
        isFresh,
      };
    } catch {
      return null;
    }
  }

  /**
   * Fetch an IsolatedVault snapshot. Returns null when not initialised.
   */
  async fetchIsolatedVault(
    user: PublicKey,
    option: string | PublicKey,
  ): Promise<IsolatedVaultSnapshot | null> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const [vaultPda] = findIsolatedVaultPda(user, optionPda);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).isolatedVault.fetch(vaultPda);
      const usdc = BigInt(acc.usdcMicro.toString());
      const locked = BigInt(acc.lockedMicro.toString());
      return {
        usdcMicro: usdc,
        lockedMicro: locked,
        freeMicro: usdc > locked ? usdc - locked : 0n,
        realizedPnlMicro: BigInt(acc.realizedPnlMicro.toString()),
      };
    } catch {
      return null;
    }
  }

  /**
   * Fetch a ComboIntent snapshot. Returns null when not registered or
   * already closed (cancelled / finalised).
   */
  async fetchComboIntent(buyer: PublicKey, comboId: bigint): Promise<ComboIntentSnapshot | null> {
    this._assertProgramLoaded();
    const [comboPda] = findComboIntentPda(buyer, comboId);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).comboIntentPda.fetch(comboPda);
      const nLegs = acc.nLegs as number;
      const mask = acc.legsFilledMask as number;
      const fullMask = nLegs === 0 ? 0 : (1 << nLegs) - 1;
      const statusMap: Record<string, ComboStatus> = {
        open: "Open",
        active: "Active",
        cancelled: "Cancelled",
        settled: "Settled",
      };
      const statusKey = Object.keys(acc.status)[0] ?? "open";
      return {
        nLegs,
        legsFilledMask: mask,
        status: statusMap[statusKey] ?? "Open",
        totalMaxPremiumMicro: BigInt(acc.totalMaxPremiumMicro.toString()),
        totalPremiumPaidMicro: BigInt(acc.totalPremiumPaidMicro.toString()),
        expiryTs: BigInt(acc.expiryTs.toString()),
        isFullyFilled: fullMask !== 0 && (mask & fullMask) === fullMask,
      };
    } catch {
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // Phase 1639 — read snapshot fetchers for the §3 hidden-index PDAs
  //
  // These wrap `program.account.<X>.fetch()` over the PDAs the SKEW_AUTHORITY
  // crank pipeline populates. Returning `null` (instead of throwing) lets
  // UI / LLM callers handle cold-start gracefully — the F1 surface engine
  // already has the same falls-back-cleanly contract.
  //
  // micro→decimal conversion: every `*_micro` field divides by 1e6 per spec
  // §33.3 fixed-point convention.
  // -------------------------------------------------------------------------

  /** Read the per-asset PoVS state — full Heston × VRP × tail vector. */
  async fetchPovs(assetIdx: number): Promise<PoVSStateSnapshot | null> {
    this._assertProgramLoaded();
    const [pda] = findPovsStatePda(assetIdx);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).poVSState.fetch(pda);
      const SCALE = 1_000_000;
      return {
        sigmaT: Number(acc.sigmaTMicro.toString()) / SCALE,
        sigmaInf: Number(acc.sigmaInfMicro.toString()) / SCALE,
        thetaDt28: Number(acc.thetaDMicro.toString()) / SCALE,
        vrpRel: Number(acc.vrpRelMicro.toString()) / SCALE,
        ivAtm28d: Number(acc.ivMicro.toString()) / SCALE,
        regimeRt: Math.max(0, Math.min(1, Number(acc.regimeIndicatorMicro.toString()) / SCALE)),
        xi: Number(acc.xiMicro.toString()) / SCALE,
        beta: Number(acc.betaMicro.toString()) / SCALE,
        var99: Number(acc.var99Micro.toString()) / SCALE,
        es999: Number(acc.es999Micro.toString()) / SCALE,
        lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
      };
    } catch {
      return null;
    }
  }

  /** Read the per-asset Hamilton 2-state regime filter posterior. */
  async fetchHamilton(assetIdx: number): Promise<HamiltonSnapshot | null> {
    this._assertProgramLoaded();
    const [pda] = findHamiltonPda(assetIdx);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).hamiltonState.fetch(pda);
      const SCALE = 1_000_000;
      return {
        asset: assetIdx,
        piCalm: Number(acc.piCalmMicro.toString()) / SCALE,
        piStress: Number(acc.piStressMicro.toString()) / SCALE,
        muCalm: Number(acc.muCalmMicro.toString()) / SCALE,
        muStress: Number(acc.muStressMicro.toString()) / SCALE,
        sigmaCalm: Number(acc.sigmaCalmMicro.toString()) / SCALE,
        sigmaStress: Number(acc.sigmaStressMicro.toString()) / SCALE,
        p01: Number(acc.p01Micro.toString()) / SCALE,
        p10: Number(acc.p10Micro.toString()) / SCALE,
        consecutiveStressDays: Number(acc.consecutiveStressDays),
        consecutiveCalmDays: Number(acc.consecutiveCalmDays),
        lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
      };
    } catch {
      return null;
    }
  }

  /** Read per-asset SkewMetrics — RR25 / BF25 / RR10 / ATM slope + 8-tenor IV. */
  async fetchSkewMetrics(assetIdx: number): Promise<SkewMetricsSnapshot | null> {
    this._assertProgramLoaded();
    const [pda] = findSkewMetricsPda(assetIdx);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).skewMetricsPda.fetch(pda);
      const SCALE = 1_000_000;
      const rawTenors = (acc.ivPerTenorMicro as Array<{ toString(): string }>) ?? [];
      const ivPerTenor = rawTenors.map((v) => Number(v.toString()) / SCALE);
      return {
        asset: assetIdx,
        atmIv28d: Number(acc.atmIv28dMicro.toString()) / SCALE,
        rr25: Number(acc.rr25Micro.toString()) / SCALE,
        bf25: Number(acc.bf25Micro.toString()) / SCALE,
        rr10: Number(acc.rr10Micro.toString()) / SCALE,
        atmSlope: Number(acc.atmSlopeMicro.toString()) / SCALE,
        ivPerTenor,
        lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
      };
    } catch {
      return null;
    }
  }

  /**
   * Read the singleton CrossAssetMatrix — 10 pairwise ρ + 10 stress ρ across
   * BTC/ETH/SOL/XRP/HYPE. Single-PDA scan via getProgramAccounts; the IDL
   * lists CrossAssetMatrix as a `zero_copy` account so the standard
   * `program.account.crossAssetMatrix.all()` returns the parsed body.
   */
  async fetchCrossAssetMatrix(): Promise<CrossAssetSnapshot | null> {
    this._assertProgramLoaded();
    try {
      const accClient = (
        this._program().account as Record<
          string,
          {
            all: () => Promise<
              Array<{
                publicKey: PublicKey;
                account: {
                  iccRhoP5Micro: number[];
                  stressRhoMicro: number[];
                  lastFitSlot: { toString(): string };
                  lastPearsonSlot: { toString(): string };
                  lastStressSlot: { toString(): string };
                };
              }>
            >;
          }
        >
      )["crossAssetMatrix"];
      if (!accClient) return null;
      const accs = await accClient.all();
      if (accs.length === 0) return null;
      const acc = accs[0]!.account;
      const SCALE = 1_000_000;
      return {
        iccRhoP5: acc.iccRhoP5Micro.map((v) => Number(v) / SCALE),
        stressRho: acc.stressRhoMicro.map((v) => Number(v) / SCALE),
        lastFitSlot: BigInt(acc.lastFitSlot.toString()),
        lastPearsonSlot: BigInt(acc.lastPearsonSlot.toString()),
        lastStressSlot: BigInt(acc.lastStressSlot.toString()),
      };
    } catch {
      return null;
    }
  }

  /**
   * Read the per-asset MicrostructurePDA — spot / bid-ask / depth / 24h
   * volume / IV bid-ask. Per-asset scan via `.all()` + filter.
   */
  async fetchMicrostructure(assetIdx: number): Promise<MicrostructureSnapshot | null> {
    this._assertProgramLoaded();
    try {
      const accClient = (
        this._program().account as Record<
          string,
          {
            all: () => Promise<
              Array<{
                publicKey: PublicKey;
                account: {
                  asset: number;
                  lastUpdateSlot: { toString(): string };
                  spotMicro: { toString(): string };
                  bidAskSpreadBps: number;
                  depth100kUsdMicro: { toString(): string };
                  volume24hUsdMicro: { toString(): string };
                  ivBid28dMicro: { toString(): string };
                  ivAsk28dMicro: { toString(): string };
                };
              }>
            >;
          }
        >
      )["microstructurePDA"];
      if (!accClient) return null;
      const accs = await accClient.all();
      const match = accs.find((x) => x.account.asset === assetIdx);
      if (!match) return null;
      const acc = match.account;
      const SCALE = 1_000_000;
      return {
        asset: assetIdx,
        lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
        spot: Number(acc.spotMicro.toString()) / SCALE,
        bidAskSpreadBps: acc.bidAskSpreadBps,
        depth100kUsd: Number(acc.depth100kUsdMicro.toString()) / SCALE,
        volume24hUsd: Number(acc.volume24hUsdMicro.toString()) / SCALE,
        ivBid28d: Number(acc.ivBid28dMicro.toString()) / SCALE,
        ivAsk28d: Number(acc.ivAsk28dMicro.toString()) / SCALE,
      };
    } catch {
      return null;
    }
  }

  /** Read the singleton Insurance Fund balances used by the 6-tier default cascade. */
  async fetchInsuranceFund(): Promise<InsuranceFundSnapshot | null> {
    this._assertProgramLoaded();
    const [pda] = findInsuranceFundPda();
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).insuranceFund.fetch(pda);
      return {
        tier3ProtocolSitgMicro: BigInt(acc.tier3ProtocolSitg.toString()),
        tier1MutualizedPoolMicro: BigInt(acc.tier1MutualizedPool.toString()),
        tier2MutualizedPoolMicro: BigInt(acc.tier2MutualizedPool.toString()),
        crossMutualizedPoolMicro: BigInt(acc.crossMutualizedPool.toString()),
        totalCmContributionsMicro: BigInt(acc.totalCmContributions.toString()),
        totalDrainedMicro: BigInt(acc.totalDrained.toString()),
        defaultEventCount: Number(acc.defaultEventCount),
      };
    } catch {
      return null;
    }
  }

  /** Read a CM's `ClearingMemberAccount` snapshot — full risk diagnostic. */
  async fetchClearingMember(
    authority: PublicKey = this.wallet.publicKey,
  ): Promise<ClearingMemberSnapshot | null> {
    this._assertProgramLoaded();
    const [pda] = findClearingMemberPda(authority);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const acc: any = await (this._program().account as any).clearingMemberAccount.fetch(pda);
      const collateral = BigInt(acc.collateral.toString());
      const ifContribution = BigInt(acc.ifContribution.toString());
      const tierLockup = BigInt(acc.tierLockupCollateral.toString());
      const totalPmLocked = BigInt(acc.totalPmLockedMicro.toString());
      const free = collateral - ifContribution - tierLockup - totalPmLocked;
      const tierKey = Object.keys(acc.tier)[0] ?? "standard";
      const tierMap: Record<string, 0 | 1 | 2 | 3> = {
        standard: 0,
        silver: 1,
        gold: 2,
        platinum: 3,
      };
      return {
        authority,
        collateralMicro: collateral,
        ifContributionMicro: ifContribution,
        tierLockupCollateralMicro: tierLockup,
        totalPmLockedMicro: totalPmLocked,
        freeCollateralMicro: free > 0n ? free : 0n,
        netNotionalLongMicro: BigInt(acc.netNotionalLong.toString()),
        netNotionalShortMicro: BigInt(acc.netNotionalShort.toString()),
        positionsCount: Number(acc.positionsCount),
        lastImMicro: BigInt(acc.lastImMicro.toString()),
        tier: tierMap[tierKey] ?? 0,
        tierLockedUntil: BigInt(acc.tierLockedUntil.toString()),
        underLiquidation: Boolean(acc.underLiquidation),
        lastMarginCheck: BigInt(acc.lastMarginCheck.toString()),
      };
    } catch {
      return null;
    }
  }

  // -------------------------------------------------------------------------
  // Phase 1634 admin / keeper wrappers — ADL + Clawback + IF auto-replenish
  //
  // SKEW_AUTHORITY-only paths. Phase 1 keeper bots invoke these in response
  // to liquidate.rs Tier-5 ProtocolSitgDrained signals (post-cascade bad-debt
  // residual) or scheduled fee → SITG replenish polls.
  //
  // Phase 2 governance multisig will swap the address gate from a hardcoded
  // single key to a 3-of-5 multisig threshold check.
  // -------------------------------------------------------------------------

  /**
   * ADL step — drains up to `targetLossUsdc` from the supplied winner CMs.
   * Each winner is capped at 50 % of their `free_collateral`. Off-chain
   * priority sort decides the order.
   *
   * @param targetLossUsdc — bad-debt residual to absorb (typically read from
   *   the tier-5 `DefaultAbsorbed` event the failed `liquidate` emitted).
   * @param winners — pre-sorted (cm, cm_escrow) pairs.
   */
  async adlStep(targetLossUsdc: number, winners: RecoveryWinnerCm[]): Promise<RecoveryStepResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [insuranceFund] = findInsuranceFundPda();
    const [ifEscrow] = findIfEscrowPda();
    const remaining = winners.flatMap((w) => [
      { pubkey: w.cm, isSigner: false, isWritable: true },
      { pubkey: w.cmEscrow, isSigner: false, isWritable: true },
    ]);

    const tx = await this._program()
      .methods.adlStep(new BN(toUsdcUnits(targetLossUsdc).toString()))
      .accounts({
        insuranceFund,
        ifEscrow,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        authority,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(remaining)
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    // Anchor `Result<u64>` returns are NOT exposed via `.transaction()` —
    // callers must subscribe to `AdlExecuted` events for per-CM drained
    // amounts and sum them off-chain. The advertised return type here is
    // the RPC-confirmed total via the post-tx event scan (Phase 2 indexer
    // helper TBD).
    return { txSignature, totalDrainedMicro: 0n };
  }

  /**
   * Clawback step — pro-rata socialised loss across all supplied winners
   * proportional to `cm.collateral − cm.last_im_micro`. Capped at 50 %
   * per CM. Off-chain caller must include EVERY profitable CM (NOT just
   * top-N) for the proportional formula to be fair.
   */
  async clawbackStep(
    targetLossUsdc: number,
    winners: RecoveryWinnerCm[],
  ): Promise<RecoveryStepResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [insuranceFund] = findInsuranceFundPda();
    const [ifEscrow] = findIfEscrowPda();
    const remaining = winners.flatMap((w) => [
      { pubkey: w.cm, isSigner: false, isWritable: true },
      { pubkey: w.cmEscrow, isSigner: false, isWritable: true },
    ]);

    const tx = await this._program()
      .methods.clawbackStep(new BN(toUsdcUnits(targetLossUsdc).toString()))
      .accounts({
        insuranceFund,
        ifEscrow,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        authority,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .remainingAccounts(remaining)
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, totalDrainedMicro: 0n };
  }

  /**
   * IF auto-replenish — moves USDC from the protocol fee accumulator into
   * IF Tier-3 (Protocol SITG). This is SKEW_AUTHORITY-only: the keeper bot
   * polls `compute_if_target_micro` vs current capacity and invokes when
   * capacity < 80 % of target.
   */
  async replenishIfFromFees(amountUsdc: number, settlementMint?: PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const mint = settlementMint ?? this.usdcMint;
    if (!mint.equals(this.usdcMint)) {
      throw new Error(
        "replenishIfFromFees is USDC-only. Physical wSOL/jitoSOL fees are withdrawable protocol fees, not IF replenish source.",
      );
    }
    const [insuranceFund] = findInsuranceFundPda();
    const [ifEscrow] = findIfEscrowPda();
    const [feeAccumulator] = findFeeAccumulatorPda(mint);
    const [feeAuthority] = findFeeAuthorityPda();

    const tx = await this._program()
      .methods.replenishIfFromFees(new BN(toUsdcUnits(amountUsdc).toString()))
      .accounts({
        insuranceFund,
        feeAccumulator,
        feeAuthority,
        ifEscrow,
        settlementMint: mint,
        collateralPolicy: this._collateralPolicy(),
        authority,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /** SKEW_AUTHORITY protocol fee withdrawal from a per-mint fee accumulator. */
  async withdrawFees(
    amount: number,
    recipient?: PublicKey,
    settlementMint?: PublicKey,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const mint = settlementMint ?? this.usdcMint;
    const [feeAccumulator] = findFeeAccumulatorPda(mint);
    const [feeAuthority] = findFeeAuthorityPda();
    const recipientAta = recipient ?? getAssociatedTokenAddressSync(mint, authority);
    const tx = await this._program()
      .methods.withdrawFees(new BN(toSettlementUnits(amount, mint).toString()))
      .accounts({
        authority,
        feeAccumulator,
        feeAuthority,
        recipient: recipientAta,
        settlementMint: mint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * SKEW_AUTHORITY DVOL crank. The off-chain pricing service runs the
   * variance-replication integral hourly and publishes the result here.
   * Cadence: 1 h. NOT timelocked (high-cadence advisor crank).
   *
   * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
   * @param dvol28dPct / dvol90dPct — annualised variance-swap fair vol
   *   in percent (e.g. 65.5 → encoded × 10⁴).
   * @param realizedVar28dPct — realised variance accumulator, percent.
   */
  async updateDvol(
    assetIdx: number,
    dvol28dPct: number,
    dvol90dPct: number,
    realizedVar28dPct: number,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [dvolPda] = findDvolPda(assetIdx);

    const toMicro = (pct: number): BN => new BN(Math.floor(pct * 10_000).toString());

    const tx = await this._program()
      .methods.updateDvol(
        assetIdx,
        toMicro(dvol28dPct),
        toMicro(dvol90dPct),
        toMicro(realizedVar28dPct),
      )
      .accounts({
        dvolPda,
        authority,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // ────────────────────────────────────────────────────────────────────────
  // Phase 1633.G — Mainnet hardening
  // 18 wrappers: conditional orders (5) + apply actions (4) +
  //   RFQ auctions (5) + combo v2 (4).
  // ────────────────────────────────────────────────────────────────────────

  /**
   * Register a stop-loss / take-profit / OCO leg conditional order.
   *
   * Flow:
   *   1. Caller picks a `orderId` (u64, locally unique per authority).
   *   2. Pyth oracle + trigger price + direction define the trip wire.
   *   3. Action enum picks what fires: CloseIsolatedPosition (auto-CPI),
   *      EarlyExercise / SellViaRfq / BuybackViaRfq (fail-closed until direct CPI).
   *   4. Keeper observes Pyth EMA crossing → `executeConditionalOrder`
   *      flips state to Triggered → user calls the matching `apply_*`.
   */
  async registerConditionalOrder(args: {
    orderId: bigint;
    kind: number; // ConditionalKind enum
    triggerOracle: PublicKey; // Pyth price account
    triggerPrice1e8: bigint; // i64
    triggerDirection: number; // 0=Below, 1=Above
    triggerMode: number; // 0=Spot, 1=EMA
    triggerGraceSlots: number;
    action: number; // ConditionalAction enum
    actionTarget: PublicKey; // OptionAccount PDA
    actionMinPremiumMicro: bigint;
    actionMaxPremiumMicro: bigint;
    actionMaxSlippageBps: number;
    validUntilTs: bigint;
  }): Promise<TxResult & { order: PublicKey }> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [order] = findConditionalOrderPda(authority, args.orderId);
    const tx = await this._program()
      .methods.registerConditionalOrder({
        orderId: new BN(args.orderId.toString()),
        kind: args.kind,
        triggerOracle: args.triggerOracle,
        triggerPrice1e8: new BN(args.triggerPrice1e8.toString()),
        triggerDirection: args.triggerDirection,
        triggerMode: args.triggerMode,
        triggerGraceSlots: args.triggerGraceSlots,
        action: args.action,
        actionTarget: args.actionTarget,
        actionMinPremiumMicro: new BN(args.actionMinPremiumMicro.toString()),
        actionMaxPremiumMicro: new BN(args.actionMaxPremiumMicro.toString()),
        actionMaxSlippageBps: args.actionMaxSlippageBps,
        validUntilTs: new BN(args.validUntilTs.toString()),
      })
      .accounts({
        authority,
        order,
        actionTarget: args.actionTarget,
        governance: findGovernancePda()[0],
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, order };
  }

  /** Cancel an Active conditional order. PDA is closed → rent + keeper-reward refunded. */
  async cancelConditionalOrder(orderId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [order] = findConditionalOrderPda(authority, orderId);
    const tx = await this._program()
      .methods.cancelConditionalOrder()
      .accounts({ authority, order })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Permissionless trigger crank. Keeper calls this when Pyth EMA crosses
   * `triggerPrice1e8` in `triggerDirection`. State flips Active → Triggered;
   * `ConditionalOrderTriggered` event emitted.
   */
  async executeConditionalOrder(
    orderAuthority: PublicKey,
    orderId: bigint,
    pythOracle: PublicKey,
    actionTarget?: PublicKey,
    linkedOrder?: PublicKey,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const [order] = findConditionalOrderPda(orderAuthority, orderId);
    const snapshot = actionTarget
      ? null
      : await this.fetchConditionalOrder(orderAuthority, orderId);
    const target = actionTarget ?? snapshot?.actionTarget;
    if (!target) {
      throw new Error(
        "executeConditionalOrder requires actionTarget, or a fetchable ConditionalOrderPda",
      );
    }
    const tx = await this._program()
      .methods.executeConditionalOrder()
      .accounts({
        caller: this.wallet.publicKey,
        order,
        triggerOracle: pythOracle,
        actionTarget: target,
        linkedOrder: linkedOrder ?? order,
        governance: findGovernancePda()[0],
      })
      .remainingAccounts(this._hamiltonRemaining())
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Register a paired SL+TP (one-cancels-other). When either leg's
   * `apply_*_action` lands, the on-chain crank cancels the surviving leg.
   */
  async registerOcoPair(
    stopLoss: Parameters<SkewClient["registerConditionalOrder"]>[0],
    takeProfit: Parameters<SkewClient["registerConditionalOrder"]>[0],
  ): Promise<TxResult & { stopLossOrder: PublicKey; takeProfitOrder: PublicKey }> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [stopLossOrder] = findConditionalOrderPda(authority, stopLoss.orderId);
    const [takeProfitOrder] = findConditionalOrderPda(authority, takeProfit.orderId);
    const toArgs = (a: typeof stopLoss) => ({
      orderId: new BN(a.orderId.toString()),
      kind: a.kind,
      triggerOracle: a.triggerOracle,
      triggerPrice1e8: new BN(a.triggerPrice1e8.toString()),
      triggerDirection: a.triggerDirection,
      triggerMode: a.triggerMode,
      triggerGraceSlots: a.triggerGraceSlots,
      action: a.action,
      actionTarget: a.actionTarget,
      actionMinPremiumMicro: new BN(a.actionMinPremiumMicro.toString()),
      actionMaxPremiumMicro: new BN(a.actionMaxPremiumMicro.toString()),
      actionMaxSlippageBps: a.actionMaxSlippageBps,
      validUntilTs: new BN(a.validUntilTs.toString()),
    });
    const tx = await this._program()
      .methods.registerOcoPair(toArgs(stopLoss), toArgs(takeProfit))
      .accounts({
        authority,
        orderA: stopLossOrder,
        orderB: takeProfitOrder,
        actionTarget: stopLoss.actionTarget,
        governance: findGovernancePda()[0],
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, stopLossOrder, takeProfitOrder };
  }

  /** Permissionless crank — closes an Active order whose `validUntilTs` has passed. */
  async cleanupExpiredConditionalOrder(
    orderAuthority: PublicKey,
    orderId: bigint,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const [order] = findConditionalOrderPda(orderAuthority, orderId);
    const tx = await this._program()
      .methods.cleanupExpiredConditionalOrder()
      .accounts({
        caller: this.wallet.publicKey,
        order,
        authority: orderAuthority,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // ── Apply actions (4) — user-signed completion of triggered conditional orders ──

  /**
   * Drains the IsolatedVault for the (user, option) and closes the order PDA.
   * Single-tx, single-click — the only of the 4 apply ix that wires a real CPI.
   *
   * The caller must supply `actionTarget` (the option PDA the order is bound
   * to). The on-chain handler enforces `option == order.action_target`, so
   * a wrong value reverts the tx — but the SDK can't read it from the order
   * PDA without the IDL exposing `ConditionalOrderPda` (the Phase 1633.G
   * IDL was hand-patched for ix only; account schemas pending). For now,
   * pass the same `actionTarget` you used in `registerConditionalOrder`.
   */
  async applyCloseIsolatedAction(orderId: bigint, actionTarget: PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;
    const [order] = findConditionalOrderPda(user, orderId);
    const [vault] = findIsolatedVaultPda(user, actionTarget);
    const [vaultEscrow] = findIsolatedVaultEscrowPda(vault);
    const userAta = getAssociatedTokenAddressSync(this.usdcMint, user);
    const tx = await this._program()
      .methods.applyCloseIsolatedAction()
      .accounts({
        user,
        order,
        option: actionTarget,
        vault,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        userAta,
        vaultEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /** Fail-closed on-chain until direct exercise CPI exists. */
  async applyEarlyExerciseAction(orderId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    throw new Error(
      `applyEarlyExerciseAction(${orderId}) is fail-closed on-chain until direct exercise CPI ships`,
    );
  }

  /** Fail-closed on-chain until direct RFQ CPI exists. */
  async applySellViaRfqAction(orderId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    throw new Error(
      `applySellViaRfqAction(${orderId}) is fail-closed on-chain until direct RFQ CPI ships`,
    );
  }

  /** Fail-closed on-chain until direct RFQ CPI exists. */
  async applyBuybackViaRfqAction(orderId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    throw new Error(
      `applyBuybackViaRfqAction(${orderId}) is fail-closed on-chain until direct RFQ CPI ships`,
    );
  }

  // ── RFQ Auctions (5) — Phase 1633.G escrow + ed25519 verified MM quotes ──

  /** One-time MM registration. Stakes `RFQ_MAKER_DEPOSIT_LAMPORTS` anti-spam deposit. */
  async registerRfqMaker(): Promise<TxResult & { registry: PublicKey }> {
    this._assertProgramLoaded();
    const mm = this.wallet.publicKey;
    const [registry] = findRfqMakerPda(mm);
    const tx = await this._program()
      .methods.registerRfqMaker()
      .accounts({ mm, registry, systemProgram: SystemProgram.programId })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, registry };
  }

  /**
   * Update the RFQ maker's on-chain kill switch + public tape controls.
   *
   * Defaults mirror the production lane:
   * - `quoteOff=false`
   * - `identityMode=0` anonymous, `1` disclosed
   * - `marginMode=0` portfolio, `1` single-asset, `2` cross-portfolio
   * - `riskScopeAsset=255` cross-asset, or 0..4 for a launch-panel asset
   * - `collateralScope=0` cross, `1` segregated
   */
  async setMakerRiskConfig(args: {
    quoteOff?: boolean;
    identityMode?: 0 | 1;
    marginMode?: 0 | 1 | 2;
    riskScopeAsset?: number;
    collateralScope?: 0 | 1;
  } = {}): Promise<TxResult & { registry: PublicKey }> {
    this._assertProgramLoaded();
    const mm = this.wallet.publicKey;
    const [registry] = findRfqMakerPda(mm);
    const tx = await this._program()
      .methods.setMakerRiskConfig({
        quoteOff: args.quoteOff ?? false,
        identityMode: args.identityMode ?? 0,
        marginMode: args.marginMode ?? 0,
        riskScopeAsset: args.riskScopeAsset ?? 255,
        collateralScope: args.collateralScope ?? 0,
      })
      .accounts({ mm, registry })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, registry };
  }

  /**
   * Buyer commits an RFQ auction with `maxPremiumUsdc` USDC locked into
   * escrow until finalize / cancel. Current on-chain RFQ v1 requires the
   * stable settlement policy; SOL/jitoSOL collateral is live in CM / relay
   * PM paths, not in RFQ-auction escrow registration.
   *
   * `optionSpec` mirrors the on-chain `RfqOptionSpec` struct.
   */
  async registerRfqAuction(args: {
    auctionId: bigint;
    optionSpec: {
      asset: number; // 0..=4
      strike: bigint; // 1e8 micro
      expiryTs: bigint;
      payoffAmountMicro: bigint;
      optionType: number; // OptionTypeCode
      direction: number; // ±1 on the current Auction RFQ validator; RangeAccrual uses upperBound
      upperBound: bigint;
    };
    maxPremiumUsdc: number;
    durationSlots: bigint;
    /**
     * Settlement mint. Defaults to USDC. The current Anchor handler requires
     * the stable-mint CollateralPolicy entry, so the SDK rejects non-USDC here
     * until RFQ auction custody is upgraded beyond v1.
     */
    settlementMint?: PublicKey;
  }): Promise<TxResult & { auction: PublicKey; escrow: PublicKey }> {
    this._assertProgramLoaded();
    const buyer = this.wallet.publicKey;
    const [auction] = findRfqAuctionPda(buyer, args.auctionId);
    const [escrow] = findRfqAuctionEscrowPda(auction);
    const settlementMint = args.settlementMint ?? this.usdcMint;
    if (!settlementMint.equals(this.usdcMint)) {
      throw new Error(
        "registerRfqAuction: current on-chain RFQ v1 is USDC/stable-only; use atomic_fill_from_relay / CM collateral paths for SOL or jitoSOL capacity.",
      );
    }
    const buyerSettlementAta = getAssociatedTokenAddressSync(settlementMint, buyer);
    const rfqDirection =
      args.optionSpec.optionType === 3 && args.optionSpec.direction === 0
        ? 1
        : args.optionSpec.direction;
    const tx = await this._program()
      .methods.registerRfqAuction({
        auctionId: new BN(args.auctionId.toString()),
        optionSpec: {
          asset: args.optionSpec.asset,
          strike: new BN(args.optionSpec.strike.toString()),
          expiryTs: new BN(args.optionSpec.expiryTs.toString()),
          payoffAmountMicro: new BN(args.optionSpec.payoffAmountMicro.toString()),
          optionType: args.optionSpec.optionType,
          // Current Auction RFQ registration is price discovery only and
          // validates +/-1. RangeAccrual semantics are preserved by
          // optionType=3 + upperBound; relay fills use direction=0 later.
          direction: rfqDirection,
          upperBound: new BN(args.optionSpec.upperBound.toString()),
        },
        maxPremiumMicro: new BN(toUsdcUnits(args.maxPremiumUsdc).toString()),
        durationSlots: new BN(args.durationSlots.toString()),
      })
      .accounts({
        buyer,
        auction,
        usdcMint: settlementMint,
        collateralPolicy: this._collateralPolicy(),
        buyerUsdcAta: buyerSettlementAta,
        escrowAta: escrow,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        governance: findGovernancePda()[0],
      })
      .remainingAccounts(this._hamiltonRemaining())
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, auction, escrow };
  }

  /**
   * MM submits a better-than-best quote. Builds the canonical RFQ digest,
   * has the MM keypair sign it, prepends an `Ed25519Program.createInstructionWithPublicKey`
   * verify ix, then calls `submit_rfq_quote`. The on-chain handler reads
   * the Instructions sysvar and verifies the signature against the digest.
   *
   * @param mmKeypair — used to sign the quote digest. Must match the
   *   wallet's publicKey (the MM is the signer of the tx itself).
   */
  async submitRfqQuote(args: {
    auction: PublicKey;
    premiumMicro: bigint;
    validUntilSlot: bigint;
    mmSignature: Uint8Array; // ed25519 sig over rfqQuoteDigest(...)
  }): Promise<TxResult> {
    this._assertProgramLoaded();
    const mm = this.wallet.publicKey;
    const [registry] = findRfqMakerPda(mm);
    const digest = rfqQuoteDigest(args.auction, args.premiumMicro, args.validUntilSlot, mm);
    if (args.mmSignature.length !== 64) {
      throw new Error(
        `submitRfqQuote: mmSignature must be 64 bytes (ed25519), got ${args.mmSignature.length}`,
      );
    }
    const ed25519Ix = Ed25519Program.createInstructionWithPublicKey({
      publicKey: mm.toBuffer(),
      message: digest,
      signature: args.mmSignature,
    });
    const sigArr = Array.from(args.mmSignature);
    const submitIx = await this._program()
      .methods.submitRfqQuote({
        premiumMicro: new BN(args.premiumMicro.toString()),
        makerSignature: sigArr,
        validUntilSlot: new BN(args.validUntilSlot.toString()),
      })
      .accounts({
        mm,
        registry,
        auction: args.auction,
        ixSysvar: SYSVAR_INSTRUCTIONS_PUBKEY,
        governance: findGovernancePda()[0],
      })
      .instruction();
    const tx = new Transaction().add(ed25519Ix).add(submitIx);
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /** Permissionless RFQ finalizer. Refunds RFQ escrow to buyer; relay atomic fill handles option mint + MM premium. */
  async finalizeRfqAuction(args: {
    auction: PublicKey;
    buyerUsdcAta: PublicKey;
  }): Promise<TxResult> {
    this._assertProgramLoaded();
    const [escrow] = findRfqAuctionEscrowPda(args.auction);
    const tx = await this._program()
      .methods.finalizeRfqAuction()
      .accounts({
        caller: this.wallet.publicKey,
        auction: args.auction,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        escrowAta: escrow,
        buyerUsdcAta: args.buyerUsdcAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        governance: findGovernancePda()[0],
      })
      .remainingAccounts(this._hamiltonRemaining())
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /** Buyer-initiated cancel. Pre-close only if no quotes received. */
  async cancelRfqAuction(auction: PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const buyer = this.wallet.publicKey;
    const [escrow] = findRfqAuctionEscrowPda(auction);
    const buyerUsdcAta = getAssociatedTokenAddressSync(this.usdcMint, buyer);
    const tx = await this._program()
      .methods.cancelRfqAuction()
      .accounts({
        buyer,
        auction,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        escrowAta: escrow,
        buyerUsdcAta,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // ── Phase 57301 (2026-05-04) — Paradigm-style OTC primitives ────────────────
  //
  // refresh_quote / publish_axe / update_axe / revoke_axe. The old
  // take_best_quote client surface below is a fail-closed compatibility shim.
  //
  // Anchor agent rejected inbox 1.2 (two-way single-auction) and 1.5 (router
  // ix) per OUTBOX_ANCHOR_*. Two-way is folded into MakerAxe.{bid,ask}_band;
  // best-ex aggregator is client-side. See OTC_PARADIGM_PHASE_PLAN_*.md rev3.

  /**
   * Deprecated compatibility shim.
   *
   * The current Anchor IDL no longer exposes `take_best_quote`. Do not emulate
   * it against RFQ-auction state. Use the Instant RFQ relay lane for 1-click
   * HIT (`buyer_accept` → `cm_sign` → `buyer_tx_signed` →
   * `atomic_fill_from_relay`) or keep the
   * auction lane as price discovery + `finalizeRfqAuction`.
   */
  async takeBestQuote(args: {
    auction: PublicKey;
    expectedPremiumMicro: bigint;
    /** Override buyer USDC ATA. Defaults to derived ATA on this.usdcMint. */
    buyerUsdcAta?: PublicKey;
    /** Deprecated no-op; relay take-best-quote now returns HTTP 410. */
    viaRelay?: boolean;
    /** Deprecated no-op; retained for old callers. */
    relayBase?: string;
  }): Promise<TxResult> {
    void args;
    this._assertProgramLoaded();
    throw new Error(
      "take_best_quote is not in the current skew_master IDL. Use Instant RFQ relay HIT (buyer_accept + cm_sign + buyer_tx_signed) for click-to-fill, or finalizeRfqAuction after close_slot for the auction lane.",
    );
  }

  /**
   * Deprecated compatibility shim for the removed take-and-fill relay bundle.
   */
  async takeAndFillBundle(args: {
    auction: PublicKey;
    expectedPremiumMicro: bigint;
    /** Optional pre-built fill tx (feePayer = relay). Omit during wip-merge. */
    fillTransaction?: Transaction | null;
    buyerUsdcAta?: PublicKey;
    relayBase?: string;
  }): Promise<{
    takeSignature: string | null;
    fillSignature: string | null;
    bundleId: string | null;
    atomic: boolean;
    fillError?: string;
  }> {
    void args;
    this._assertProgramLoaded();
    throw new Error(
      "take-and-fill is disabled because take_best_quote is not in the current skew_master IDL. Use Instant RFQ buyer_accept + cm_sign + buyer_tx_signed over RelayPayload for atomic_fill_from_relay.",
    );
  }

  /** Deprecated compatibility shim; current IDL does not expose refresh_quote. */
  async refreshQuote(args: {
    auction: PublicKey;
    premiumMicro: bigint;
    validUntilSlot: bigint;
    mmSignature: Uint8Array;
  }): Promise<TxResult> {
    void args;
    this._assertProgramLoaded();
    throw new Error(
      "refresh_quote is not in the current skew_master IDL. Submit a fresh quote with submitRfqQuote instead.",
    );
  }

  // ── MakerAxe family (publish / update / revoke) ─────────────────────────

  /**
   * Publish a new MakerAxe — MM 인벤토리 의향 board entry. Costs
   * 0.001 SOL anti-spam fee → InsuranceFund tier-3.
   *
   * Inbox 1.2 (two-way) fold: pass `side: 0` and populate both
   * `bid_premium_band_*` + `ask_premium_band_*`. side -1 = SELL only,
   * +1 = BUY only.
   */
  async publishAxe(args: {
    axeId: bigint;
    asset: number; // 0..=4 (BTC, ETH, SOL, XRP, HYPE)
    side: -1 | 0 | 1; // -1 SELL / 0 TWO-WAY / +1 BUY
    optionTypeMask: number; // bitmask, bits 10..15 reserved
    strikeBandLo: bigint;
    strikeBandHi: bigint;
    expiryBandLo: bigint; // unix s
    expiryBandHi: bigint;
    sizeMicro: bigint;
    bidPremiumBandLo: bigint;
    bidPremiumBandHi: bigint;
    askPremiumBandLo: bigint;
    askPremiumBandHi: bigint;
    validUntil: bigint; // unix s
    /** Optional ipfs/arweave content hash; pass zeros if none. */
    noteHash?: Uint8Array;
  }): Promise<TxResult & { axe: PublicKey }> {
    void args;
    this._assertProgramLoaded();
    throw new Error("publish_axe is not in the current skew_master IDL.");
  }

  /** Replace mutable fields on an existing axe. Owner-only. */
  async updateAxe(args: {
    axe: PublicKey;
    fields: Parameters<SkewClient["publishAxe"]>[0];
  }): Promise<TxResult> {
    void args;
    this._assertProgramLoaded();
    throw new Error("update_axe is not in the current skew_master IDL.");
  }

  /** Close axe PDA — rent flows back to MM. */
  async revokeAxe(axe: PublicKey): Promise<TxResult> {
    void axe;
    this._assertProgramLoaded();
    throw new Error("revoke_axe is not in the current skew_master IDL.");
  }

  // ── Combo intent v2 (4) — 32-leg variant of register/finalize/cancel/cleanup ──

  /**
   * Register a 1..32-leg combo intent. v2 supersedes v1's max-4 limit.
   * No premium escrow at register — premium is captured leg-by-leg in
   * `finalizeComboLegV2`; cleanup permissionless after `expiresTs`.
   */
  async registerComboIntentV2(args: {
    comboId: bigint;
    legs: Array<{
      option: PublicKey;
      side: number; // ±1
      maxPremiumMicro: bigint;
    }>;
    totalMaxPremiumMicro: bigint;
    expiresTs: bigint;
  }): Promise<TxResult & { intent: PublicKey }> {
    this._assertProgramLoaded();
    if (args.legs.length === 0 || args.legs.length > 32) {
      throw new Error(`registerComboIntentV2: legs.length must be 1..=32, got ${args.legs.length}`);
    }
    const buyer = this.wallet.publicKey;
    const [intent] = findComboIntentV2Pda(buyer, args.comboId);
    const tx = await this._program()
      .methods.registerComboIntentV2({
        comboId: new BN(args.comboId.toString()),
        legCount: args.legs.length,
        legs: args.legs.map((l) => ({
          option: l.option,
          side: l.side,
          filled: false,
          maxPremiumMicro: new BN(l.maxPremiumMicro.toString()),
          fillPremiumMicro: new BN(0),
        })),
        totalMaxPremiumMicro: new BN(args.totalMaxPremiumMicro.toString()),
        expiresTs: new BN(args.expiresTs.toString()),
      })
      .accounts({
        buyer,
        intent,
        systemProgram: SystemProgram.programId,
        governance: findGovernancePda()[0],
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, intent };
  }

  /** Permissionless leg-fill recorder. Keeper calls per-leg as fills land on-chain. */
  async finalizeComboLegV2(
    intent: PublicKey,
    legIndex: number,
    realisedPremiumMicro: bigint,
    option?: PublicKey,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    let legOption = option;
    if (!legOption) {
      const info = await this.connection.getAccountInfo(intent, "confirmed");
      if (!info || info.data.length < 88 + (legIndex + 1) * 56) {
        throw new Error("finalizeComboLegV2 requires option, or a fetchable intent account");
      }
      legOption = new PublicKey(info.data.subarray(88 + legIndex * 56, 88 + legIndex * 56 + 32));
    }
    const tx = await this._program()
      .methods.finalizeComboLegV2(legIndex, new BN(realisedPremiumMicro.toString()))
      .accounts({
        caller: this.wallet.publicKey,
        intent,
        option: legOption,
        governance: findGovernancePda()[0],
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /** Buyer-initiated cancel of an Open intent. Closes the PDA → rent refund. */
  async cancelComboIntentV2(comboId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const buyer = this.wallet.publicKey;
    const [intent] = findComboIntentV2Pda(buyer, comboId);
    const tx = await this._program()
      .methods.cancelComboIntentV2()
      .accounts({ buyer, intent })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /** Permissionless cleanup — closes an expired intent past its `expiresTs`. */
  async cleanupExpiredComboV2(buyerAuthority: PublicKey, comboId: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const [intent] = findComboIntentV2Pda(buyerAuthority, comboId);
    const tx = await this._program()
      .methods.cleanupExpiredComboV2()
      .accounts({
        caller: this.wallet.publicKey,
        intent,
        buyer: buyerAuthority,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // -------------------------------------------------------------------------
  // Phase 1639 — Verified-tier ladder + LST collateral + IF deposit + VM crank
  //
  // Closes the SDK gaps identified in CHANGE_PLAN.md §3.1. Verified-tier
  // ladder is the entry path to capital-efficient PM (Silver/Gold/Platinum
  // unlock 50/85% calendar netting + 5-dim SSVI + 25-dim cross-asset).
  // -------------------------------------------------------------------------

  /**
   * Step the CM up to a higher Verified tier. Locks the tier-specific USDC
   * floor for 30 days (TIER_LOCKUP_MIN_SECONDS) — `cm.tier_lockup_collateral`
   * is subtracted from `free_collateral()` so it cannot be withdrawn, while
   * `tradable_collateral()` keeps it available for IM and first-loss default
   * waterfall semantics. Strict rank increase only.
   *
   * Tier ranks:
   *   0 = Standard ($0)
   *   1 = Silver ($500K)
   *   2 = Gold ($2M)
   *   3 = Platinum ($10M)
   *
   * @example
   *   await skew.upgradeTier(2); // Standard/Silver → Gold
   */
  async upgradeTier(
    targetRank: 0 | 1 | 2 | 3,
    lst?: {
      lstVault: PublicKey;
      stakePool?: PublicKey;
      solUsdPyth?: PublicKey;
    },
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [cm] = findClearingMemberPda(authority);
    // Phase 6 R7 — optional LST trio. All-or-nothing on-chain; defaults
    // to address-pinned constants when only the vault is supplied.
    // Anchor's typed accounts() builder rejects `null` for Optional<>
    // fields — use the loose record path via `as any` so we can pass
    // explicit nulls (mapped to None in the IDL serializer).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accounts: any = { cm, authority };
    if (lst) {
      accounts.lstVault = lst.lstVault;
      accounts.stakePool = lst.stakePool ?? JITOSOL_STAKE_POOL;
      accounts.solUsdPyth = lst.solUsdPyth ?? PYTH_SOL_USD_FEED;
    } else {
      accounts.lstVault = null;
      accounts.stakePool = null;
      accounts.solUsdPyth = null;
    }
    const tx = await this._program()
      .methods.upgradeTier(targetRank)
      .accounts(accounts)
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Step the CM down to a lower Verified tier. Releases the tier-specific
   * USDC lockup back into `free_collateral`. Requires `now ≥ tier_locked_until`
   * (30 d after most recent upgrade). Strict rank decrease only.
   *
   * @example
   *   await skew.downgradeTier(1); // Gold/Platinum → Silver
   */
  async downgradeTier(targetRank: 0 | 1 | 2 | 3, lstVault?: PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [cm] = findClearingMemberPda(authority);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const downgradeAccounts: any = { cm, authority, lstVault: lstVault ?? null };
    const tx = await this._program()
      .methods.downgradeTier(targetRank)
      .accounts(downgradeAccounts)
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Deposit USDC to a specific IF tier slot. SITG flag distinguishes
   * Tier-3 protocol-skin-in-the-game from Tier-4 mutualized pool slots.
   *
   * `tier`:
   *   0 = Tier1 (BTC/ETH/SOL mutualized pool)
   *   1 = Tier2 (XRP/HYPE mutualized pool)
   *   2 = Cross (cross-asset spillover reserve)
   *
   * @param isSitg — when true and tier=Tier1, deposit lands in Tier-3
   *                 SITG (SKEW_AUTHORITY only). When false, lands in
   *                 Tier-4 mutualized.
   *
   * @example
   *   await skew.depositToIf(0, 50_000, false); // $50K to Tier-1 mutualized
   */
  async depositToIf(tier: 0 | 1 | 2, amountUsdc: number, isSitg: boolean): Promise<TxResult> {
    this._assertProgramLoaded();
    const depositor = this.wallet.publicKey;
    const [insuranceFund] = findInsuranceFundPda();
    const [ifEscrow] = findIfEscrowPda();
    const [contributingCm] = findClearingMemberPda(depositor);
    const depositorAta = getAssociatedTokenAddressSync(this.usdcMint, depositor);
    const tierEnum = tier === 0 ? { tier1: {} } : tier === 1 ? { tier2: {} } : { cross: {} };
    const tx = await this._program()
      .methods.depositToIf(tierEnum, new BN(toUsdcUnits(amountUsdc).toString()), isSitg)
      .accounts({
        insuranceFund,
        depositor,
        contributingCm: tier === 1 && !isSitg ? contributingCm : null,
        usdcMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        depositorAta,
        ifEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
      } as any)
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Daily IM re-mark crank. Permissionless — anyone may push for any CM.
   * Refreshes `cm.last_im_micro` snapshot so `liquidate.rs`'s 24-h
   * `LIQUIDATION_MARGIN_FRESHNESS_SECS` gate keeps admitting valid Dutch
   * auctions even when the CM takes no new fills.
   *
   * Caller passes `remainingAccounts` = the CM's open OptionAccount PDAs
   * + per-asset PoVS / Hamilton / CrossAsset PDAs (same set
   * `calculateMargin` consumes).
   *
   * @example
   *   await skew.callVariationMargin(targetCmAuthority, [...optionPdas, ...stateAccounts]);
   */
  async callVariationMargin(
    cmAuthority: PublicKey,
    remainingAccounts: PublicKey[] = [],
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const [cm] = findClearingMemberPda(cmAuthority);
    const pmRemaining =
      remainingAccounts.length > 0
        ? remainingAccounts.map((pubkey) => ({
            pubkey,
            isSigner: false,
            isWritable: false,
          }))
        : await this._pmRemaining(cmAuthority);
    const tx = await this._program()
      .methods.callVariationMargin()
      .accounts({ keeper: this.wallet.publicKey, cm })
      .remainingAccounts(pmRemaining)
      .preInstructions([
        ComputeBudgetProgram.setComputeUnitLimit({
          units: PM_VARIATION_CU_LIMIT,
        }),
      ])
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * One-shot per (user, lst_mint) — initialise the LstVault PDA + escrow
   * ATA. Phase 1 only accepts jitoSOL (`JITOSOL_MINT`). Subsequent
   * deposits/withdraws hang off this PDA.
   *
   * @example
   *   await skew.initLstVault(JITOSOL_MINT);
   */
  async initLstVault(lstMint: PublicKey = JITOSOL_MINT): Promise<TxResult> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;
    const [vault] = findLstVaultPda(user, lstMint);
    const [vaultAta] = findLstVaultEscrowPda(vault);
    const tx = await this._program()
      .methods.initLstVault()
      .accounts({
        vault,
        user,
        lstMint,
        vaultAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Deposit LST collateral (jitoSOL) into the user's LstVault escrow.
   * Anchor handler validates the SPL Stake Pool exchange-rate read so the
   * vault stamps a fresh `last_er_update_slot` for the dynamic LTV cap path.
   *
   * `amountLamports` is in LST native units (jitoSOL has 9 decimals like SOL).
   *
   * @example
   *   await skew.depositLstCollateral(1_500_000_000n); // 1.5 jitoSOL
   */
  async depositLstCollateral(
    amountLamports: bigint,
    lstMint: PublicKey = JITOSOL_MINT,
    stakePool?: PublicKey,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;
    const [vault] = findLstVaultPda(user, lstMint);
    const [vaultAta] = findLstVaultEscrowPda(vault);
    const userLstAta = getAssociatedTokenAddressSync(lstMint, user);
    const accounts: Record<string, PublicKey> = {
      vault,
      user,
      lstMint,
      userLstAta,
      vaultAta,
      tokenProgram: TOKEN_PROGRAM_ID,
    };
    if (stakePool) accounts["stakePool"] = stakePool;
    const tx = await this._program()
      .methods.depositLstCollateral(new BN(amountLamports.toString()))
      .accounts(accounts)
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Withdraw LST collateral (jitoSOL) from the user's LstVault escrow back
   * to the user's LST ATA. Anchor handler enforces `amount ≤ free_qty()`
   * (lst_qty − locked_qty) so the user can't pull LST that's pledged
   * against open option fills.
   *
   * @example
   *   await skew.withdrawLstCollateral(500_000_000n);
   */
  async withdrawLstCollateral(
    amountLamports: bigint,
    lstMint: PublicKey = JITOSOL_MINT,
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;
    const [vault] = findLstVaultPda(user, lstMint);
    const [vaultAta] = findLstVaultEscrowPda(vault);
    const userLstAta = getAssociatedTokenAddressSync(lstMint, user);
    const tx = await this._program()
      .methods.withdrawLstCollateral(new BN(amountLamports.toString()))
      .accounts({
        vault,
        user,
        lstMint,
        userLstAta,
        vaultAta,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // =====================================================================
  // Phase 1A.2 (2026-05-04) — Native SOL collateral lifecycle.
  //
  // Mirror of LST collateral path for Native (wrapped) SOL. ETF APs +
  // regulated US institutions cannot hold LSTs; this path lets them post
  // Native SOL while retaining capital-efficient portfolio margin.
  //
  // Spec: V2_SOL_NATIVE_OPTIONS_PLAN_2026-05-04.md §5.
  // =====================================================================

  /**
   * One-shot per user — initialise the NativeSolVault PDA + wSOL escrow
   * ATA. No mint dimension (single canonical wSOL mint per protocol).
   * Subsequent deposits/withdraws hang off this PDA.
   *
   * @example
   *   await skew.initNativeSolVault();
   */
  async initNativeSolVault(): Promise<TxResult> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;
    const [vault] = findNativeSolVaultPda(user);
    const [vaultAta] = findNativeSolVaultEscrowPda(vault);
    const tx = await this._program()
      .methods.initNativeSolVault()
      .accounts({
        vault,
        user,
        wsolMint: NATIVE_SOL_MINT,
        vaultAta,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Wrap native SOL → wSOL → deposit into NativeSolVault, in a single helper
   * (cheatsheet 2026-05-04 §10 ask #3 — `wrapAndDeposit`).
   *
   * Builds two transactions:
   *   1. wrap_tx: getOrCreate user wSOL ATA → SystemProgram.transfer →
   *      sync_native (token::sync_native) — wraps native SOL into the user's
   *      wSOL ATA without consuming separate SOL outside what's wrapped.
   *   2. deposit_tx: depositNativeSolCollateral (SDK existing method).
   *
   * Idempotent — initNativeSolVault is called first, swallowing
   * "already initialized" errors so re-invocation is safe.
   *
   * @example
   *   const r = await skew.wrapAndDeposit(2_000_000_000n); // 2 SOL
   *   console.log(r.wrapTx, r.depositTx);
   */
  async wrapAndDeposit(amountLamports: bigint): Promise<{
    wrapTx: string;
    depositTx: string;
  }> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;

    // Step 0 — idempotent vault init. If already initialised, the on-chain
    // ix returns AlreadyInUse / InitAccount0; swallow those known shapes.
    try {
      await this.initNativeSolVault();
    } catch (e) {
      const msg = String((e as Error).message ?? e).toLowerCase();
      if (
        !msg.includes("already") &&
        !msg.includes("initialized") &&
        !msg.includes("0x0") &&
        !msg.includes("already in use")
      ) {
        throw e;
      }
    }

    // Step 1 — wrap native SOL → wSOL on the client side.
    const userWsolAta = getAssociatedTokenAddressSync(NATIVE_SOL_MINT, user);
    const wrapTx = new Transaction().add(
      createAssociatedTokenAccountIdempotentInstruction(user, userWsolAta, user, NATIVE_SOL_MINT),
      SystemProgram.transfer({
        fromPubkey: user,
        toPubkey: userWsolAta,
        lamports: Number(amountLamports),
      }),
      createSyncNativeInstruction(userWsolAta),
    );
    const wrapSig = await this._sendAndConfirm(wrapTx);

    // Step 2 — depositNativeSolCollateral.
    const r = await this.depositNativeSolCollateral(amountLamports);
    return { wrapTx: wrapSig, depositTx: r.txSignature };
  }

  /**
   * Deposit Native SOL collateral (wSOL) into the user's NativeSolVault
   * escrow. The user is responsible for wrapping native SOL → wSOL on the
   * client side (`system_program::transfer` + `sync_native`) before this call.
   *
   * `amountLamports` is in wSOL native units (= lamports, 9 decimals).
   *
   * @example
   *   await skew.depositNativeSolCollateral(2_000_000_000n); // 2 SOL
   */
  async depositNativeSolCollateral(amountLamports: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;
    const [vault] = findNativeSolVaultPda(user);
    const [vaultAta] = findNativeSolVaultEscrowPda(vault);
    const userWsolAta = getAssociatedTokenAddressSync(NATIVE_SOL_MINT, user);
    const tx = await this._program()
      .methods.depositNativeSolCollateral(new BN(amountLamports.toString()))
      .accounts({
        vault,
        user,
        wsolMint: NATIVE_SOL_MINT,
        userWsolAta,
        vaultAta,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Withdraw Native SOL collateral (wSOL) from the user's NativeSolVault
   * escrow back to the user's wSOL ATA. Gated on `amount ≤ free_qty()`
   * (sol_qty − locked_qty). The user can then unwrap wSOL → native SOL
   * on the client side (`close_account` / `sync_native`).
   *
   * @example
   *   await skew.withdrawNativeSolCollateral(500_000_000n);
   */
  async withdrawNativeSolCollateral(amountLamports: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const user = this.wallet.publicKey;
    const [vault] = findNativeSolVaultPda(user);
    const [vaultAta] = findNativeSolVaultEscrowPda(vault);
    const userWsolAta = getAssociatedTokenAddressSync(NATIVE_SOL_MINT, user);
    const tx = await this._program()
      .methods.withdrawNativeSolCollateral(new BN(amountLamports.toString()))
      .accounts({
        vault,
        user,
        wsolMint: NATIVE_SOL_MINT,
        userWsolAta,
        vaultAta,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // -------------------------------------------------------------------------
  // Series listing + Builder code lifecycle + Secondary auction
  //
  // Closes the SDK gaps in CHANGE_PLAN.md §3.2 (PR-E). Series listing is
  // the σ·√T metadata grid (no money); builder code is the 25%-share
  // referral path; secondary auction lets a holder Dutch-auction their
  // option-token to a new buyer.
  // -------------------------------------------------------------------------

  /**
   * List a single grid cell (asset, strike, expiry, type, direction). Pays
   * rent (~0.0009 SOL). Permissionless — off-chain keepers run this daily
   * over a σ·√T grid policy (k_max / n_strikes etc), but any user may also
   * list a custom cell.
   *
   * @param optionTypeName Anchor IDL enum name — Vanilla / Digital /
   * CappedVanilla / RangeAccrual / VanillaInverse / DigitalInverse.
   * @param direction +1 Call / -1 Put / 0 RangeAccrual.
   */
  async listSeries(args: {
    asset: number;
    strikeMicro: bigint;
    expiryTs: bigint;
    optionTypeName:
      | "Vanilla"
      | "Digital"
      | "CappedVanilla"
      | "RangeAccrual"
      | "VanillaInverse"
      | "DigitalInverse";
    direction: -1 | 0 | 1;
  }): Promise<TxResult & { series: PublicKey }> {
    this._assertProgramLoaded();
    const optionTypeIdx = (
      {
        Vanilla: 0,
        Digital: 1,
        CappedVanilla: 2,
        RangeAccrual: 3,
        VanillaInverse: 4,
        DigitalInverse: 5,
      } as const
    )[args.optionTypeName];
    const [series] = findSeriesListingPda(
      args.asset,
      args.strikeMicro,
      args.expiryTs,
      optionTypeIdx,
      args.direction,
    );
    const optionTypeArg: Record<string, Record<string, never>> = {};
    optionTypeArg[args.optionTypeName.charAt(0).toLowerCase() + args.optionTypeName.slice(1)] = {};
    const tx = await this._program()
      .methods.listSeries(
        args.asset,
        new BN(args.strikeMicro.toString()),
        new BN(args.expiryTs.toString()),
        optionTypeArg,
        args.direction,
      )
      .accounts({
        caller: this.wallet.publicKey,
        series,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, series };
  }

  /**
   * Delist a series cell — closes the PDA + refunds rent to caller.
   * On-chain enforces `now ≥ expiry_ts` AND `total_oi_count == 0` so live
   * grid cells can't be cleared while OI is still open.
   */
  async delistSeries(seriesPda: PublicKey): Promise<TxResult> {
    this._assertProgramLoaded();
    const tx = await this._program()
      .methods.delistSeries()
      .accounts({
        caller: this.wallet.publicKey,
        series: seriesPda,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * M6 (2026-05-03) — SKEW_AUTHORITY sets per-series `max_oi_count` cap.
   * `cap = 0` removes the cap (default for newly-listed series). Existing
   * OI is NEVER force-closed when the cap is reduced — matches CME
   * spot-month tightening behaviour. Caller must be SKEW_AUTHORITY (Phase
   * 1) or the Squads multisig signer (Phase 2).
   *
   * Per-strike-bucket OI ceiling is Skew's first-mover defense against
   * the Ni-Pearson-Poteshman (2005, JFE 78) 16.5 bp / $9 B option-
   * expiration pinning effect; CME / Deribit / Derive enforce no
   * equivalent strike-level cap.
   *
   * Emits `SeriesMaxOiUpdated` event with prev/new cap + current OI.
   */
  async governanceSetSeriesMaxOi(seriesPda: PublicKey, maxOiCount: number): Promise<TxResult> {
    this._assertProgramLoaded();
    const tx = await this._program()
      .methods.governanceSetSeriesMaxOi(maxOiCount)
      .accounts({
        authority: this.wallet.publicKey,
        series: seriesPda,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Register as a fee-rebate Builder. Locks $1K USDC anti-spam deposit;
   * `label` is a short ASCII tag the builder uses in its UI / marketing.
   * Earns 25% of taker fees on all trades that route through the
   * builder's code (set via VolumeTrackerPda).
   *
   * Spec — `docs/fee-schedule-v5.1.md` §4.4 builder-rebate cascade.
   *
   * @param label up to 32 ASCII bytes (no interior NUL); rejected at
   *   anchor validation if longer or has NUL.
   */
  async registerBuilder(label: string): Promise<TxResult & { builderCode: PublicKey }> {
    this._assertProgramLoaded();
    const builder = this.wallet.publicKey;
    const [builderCode] = findBuilderCodePda(builder);
    const [builderEscrow] = findBuilderEscrowPda(builder);
    const [feeAuthority] = findFeeAuthorityPda();
    const builderTokenAccount = getAssociatedTokenAddressSync(this.usdcMint, builder);
    const labelBuf = Buffer.alloc(32);
    Buffer.from(label, "utf8").copy(labelBuf);
    const labelArr = Array.from(labelBuf);
    const tx = await this._program()
      .methods.registerBuilder(labelArr)
      .accounts({
        builderCode,
        builder,
        builderTokenAccount,
        builderEscrow,
        feeAuthority,
        settlementMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature, builderCode };
  }

  /**
   * Withdraw accrued builder fees to the builder's USDC ATA. Anchor handler
   * caps at `builder_code.fees_accrued_micro`. Drains zero-balance fee
   * accumulator no-op.
   */
  async withdrawBuilderFees(amountMicro: bigint): Promise<TxResult> {
    this._assertProgramLoaded();
    const builder = this.wallet.publicKey;
    const [builderCode] = findBuilderCodePda(builder);
    const [builderEscrow] = findBuilderEscrowPda(builder);
    const [feeAuthority] = findFeeAuthorityPda();
    const builderTokenAccount = getAssociatedTokenAddressSync(this.usdcMint, builder);
    const tx = await this._program()
      .methods.withdrawBuilderFees(new BN(amountMicro.toString()))
      .accounts({
        builderCode,
        builder,
        builderTokenAccount,
        builderEscrow,
        feeAuthority,
        settlementMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Close the BuilderCode PDA — refunds the $1K deposit to the builder.
   * Anchor handler requires `builder_code.volume_30d_routed_micro <
   * BUILDER_REFUND_MIN_VOLUME` (no live channel) AND `fees_accrued_micro
   * == 0` (drained first via `withdrawBuilderFees`).
   */
  async closeBuilderCode(): Promise<TxResult> {
    this._assertProgramLoaded();
    const builder = this.wallet.publicKey;
    const [builderCode] = findBuilderCodePda(builder);
    const [builderEscrow] = findBuilderEscrowPda(builder);
    const [feeAuthority] = findFeeAuthorityPda();
    const builderTokenAccount = getAssociatedTokenAddressSync(this.usdcMint, builder);
    const tx = await this._program()
      .methods.closeBuilderCode()
      .accounts({
        builderCode,
        builder,
        builderTokenAccount,
        builderEscrow,
        feeAuthority,
        settlementMint: this.usdcMint,
        collateralPolicy: this._collateralPolicy(),
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  // -------------------------------------------------------------------------
  // Manual byte-level fetchers — for accounts whose struct isn't in the IDL
  // `accounts` array (so `program.account.<name>.fetch` would fail). Each
  // reads via `connection.getAccountInfo` + parses Borsh-LE offsets matching
  // the on-chain struct in `skew-master/programs/skew-master/src/state/`.
  // Returns null when the account doesn't exist.
  // -------------------------------------------------------------------------

  /** Decoded LstVault PDA — total + pledged + free LST collateral. */
  async fetchLstVault(
    user: PublicKey,
    lstMint: PublicKey = JITOSOL_MINT,
  ): Promise<LstVaultSnapshot | null> {
    const [pda] = findLstVaultPda(user, lstMint);
    const info = await this.connection.getAccountInfo(pda, "confirmed");
    if (!info || info.data.length < 105) return null;
    const buf = info.data;
    const lstQty = buf.readBigUInt64LE(72);
    const lockedQty = buf.readBigUInt64LE(80);
    const lastErUpdateSlot = buf.readBigUInt64LE(88);
    const tierLockedQty = buf.readBigUInt64LE(97);
    const free = lstQty - lockedQty - tierLockedQty;
    return {
      user: new PublicKey(buf.subarray(8, 40)),
      lstMint: new PublicKey(buf.subarray(40, 72)),
      lstQty,
      lockedQty,
      tierLockedQty,
      lastErUpdateSlot,
      freeQty: free < 0n ? 0n : free,
    };
  }

  /**
   * Decoded NativeSolVault PDA — total + pledged + free wSOL collateral.
   *
   * Layout (state/native_sol_vault.rs:74, 65 B):
   *   0..8   anchor discriminator
   *   8..40  user                  (Pubkey 32B)
   *   40..48 sol_qty               (u64 LE, lamports)
   *   48..56 locked_qty            (u64 LE, lamports)
   *   56..64 last_update_slot      (u64 LE)
   *   64     bump                  (u8)
   *
   * Smaller than LstVault (105 B) — no lst_mint dimension, no tier_locked_qty
   * (Verified-tier lockup is jitoSOL-only by design).
   */
  async fetchNativeSolVault(user: PublicKey): Promise<NativeSolVaultSnapshot | null> {
    const [pda] = findNativeSolVaultPda(user);
    const info = await this.connection.getAccountInfo(pda, "confirmed");
    if (!info || info.data.length < 65) return null;
    const buf = info.data;
    const solQty = buf.readBigUInt64LE(40);
    const lockedQty = buf.readBigUInt64LE(48);
    const lastUpdateSlot = buf.readBigUInt64LE(56);
    const free = solQty - lockedQty;
    return {
      user: new PublicKey(buf.subarray(8, 40)),
      solQty,
      lockedQty,
      lastUpdateSlot,
      freeQty: free < 0n ? 0n : free,
    };
  }

  /** Decoded SeriesListingPda — σ·√T grid cell metadata. */
  async fetchSeriesListing(series: PublicKey): Promise<SeriesListingSnapshot | null> {
    const info = await this.connection.getAccountInfo(series, "confirmed");
    if (!info || info.data.length < 72) return null;
    const buf = info.data;
    return {
      asset: buf[8]!,
      optionType: buf[9]!,
      direction: buf.readInt8(10),
      status: buf[11]!,
      strike: buf.readBigUInt64LE(16),
      expiryTs: buf.readBigInt64LE(24),
      lastFillPriceMicro: buf.readBigUInt64LE(32),
      lastFillAt: buf.readBigInt64LE(40),
      totalOiCount: buf.readUInt32LE(48),
      cumulativeFillCount: buf.readUInt32LE(52),
      maxOiCount: buf.readUInt32LE(56),
      listedAt: buf.readBigInt64LE(60),
    };
  }

  /** Decoded BuilderCodePda — registration + accrual state. */
  async fetchBuilderCode(builder: PublicKey): Promise<BuilderCodeSnapshot | null> {
    const [pda] = findBuilderCodePda(builder);
    const info = await this.connection.getAccountInfo(pda, "confirmed");
    if (!info || info.data.length < 113) return null;
    const buf = info.data;
    // Trim trailing zero bytes from the 32-byte UTF-8 label.
    const labelBytes = buf.subarray(81, 113);
    let labelEnd = labelBytes.length;
    while (labelEnd > 0 && labelBytes[labelEnd - 1] === 0) labelEnd -= 1;
    return {
      builder: new PublicKey(buf.subarray(8, 40)),
      registeredAt: buf.readBigInt64LE(41),
      depositLockedMicro: buf.readBigUInt64LE(49),
      volume30dRoutedMicro: buf.readBigUInt64LE(57),
      lastVolumeUpdateTs: buf.readBigInt64LE(65),
      feesAccruedMicro: buf.readBigUInt64LE(73),
      label: labelBytes.subarray(0, labelEnd).toString("utf8"),
    };
  }

  /** Decoded ConditionalOrderPda — SL / TP / OCO state. */
  async fetchConditionalOrder(
    authority: PublicKey,
    orderId: bigint,
  ): Promise<ConditionalOrderSnapshot | null> {
    const [pda] = findConditionalOrderPda(authority, orderId);
    const info = await this.connection.getAccountInfo(pda, "confirmed");
    if (!info || info.data.length < 286) return null;
    const buf = info.data;
    const stateMap: Record<number, ConditionalOrderSnapshot["state"]> = {
      0: "Active",
      1: "Triggered",
      2: "Cancelled",
      3: "Expired",
    };
    return {
      pda,
      authority: new PublicKey(buf.subarray(8, 40)),
      orderId: buf.readBigUInt64LE(40),
      kind: buf[48]! as ConditionalKindCode,
      triggerMode: buf[49]! as ConditionalTriggerModeCode,
      triggerDirection: buf[50]! as ConditionalTriggerDirectionCode,
      action: buf[51]! as ConditionalActionCode,
      state: stateMap[buf[52]!] ?? "Active",
      triggerOracle: new PublicKey(buf.subarray(56, 88)),
      triggerPrice1e8: buf.readBigInt64LE(88),
      triggerGraceSlots: buf.readUInt32LE(96),
      actionTarget: new PublicKey(buf.subarray(112, 144)),
      actionMinPremiumMicro: buf.readBigUInt64LE(144),
      actionMaxPremiumMicro: buf.readBigUInt64LE(152),
      actionMaxSlippageBps: buf.readUInt16LE(160),
      validUntilTs: buf.readBigInt64LE(200),
      registeredAt: buf.readBigInt64LE(208),
    };
  }

  /** Decoded RfqAuctionPda — open auction state + best quote. */
  async fetchRfqAuction(auction: PublicKey): Promise<RfqAuctionSnapshot | null> {
    const info = await this.connection.getAccountInfo(auction, "confirmed");
    if (!info || info.data.length < 312) return null;
    const buf = info.data;
    const stateMap: Record<number, RfqAuctionSnapshot["state"]> = {
      0: "Open",
      1: "Closed",
      2: "Settled",
      3: "Cancelled",
    };
    const mmKey = new PublicKey(buf.subarray(112, 144));
    const hasQuote = !mmKey.equals(PublicKey.default);
    return {
      pda: auction,
      auctionId: buf.readBigUInt64LE(8),
      buyer: new PublicKey(buf.subarray(16, 48)),
      optionSpec: {
        asset: buf[48]!,
        optionType: buf[49]!,
        direction: buf.readInt8(50),
        strike: buf.readBigUInt64LE(56),
        expiryTs: buf.readBigInt64LE(64),
        payoffAmountMicro: buf.readBigUInt64LE(72),
        upperBound: buf.readBigUInt64LE(80),
      },
      maxPremiumMicro: buf.readBigUInt64LE(88),
      auctionOpenSlot: buf.readBigUInt64LE(96),
      auctionCloseSlot: buf.readBigUInt64LE(104),
      state: stateMap[buf[232]!] ?? "Open",
      bestQuotePremiumMicro: hasQuote ? buf.readBigUInt64LE(144) : null,
      bestQuoteMm: hasQuote ? mmKey : null,
      bestQuoteValidUntilSlot: hasQuote ? buf.readBigUInt64LE(216) : null,
      registeredAt: buf.readBigInt64LE(240),
    };
  }

  /** Decoded ComboIntentPdaV2 — only the first `legCount` legs are returned. */
  async fetchComboIntentV2(
    buyer: PublicKey,
    comboId: bigint,
  ): Promise<ComboIntentV2Snapshot | null> {
    const [pda] = findComboIntentV2Pda(buyer, comboId);
    const info = await this.connection.getAccountInfo(pda, "confirmed");
    if (!info || info.data.length < 1944) return null;
    const buf = info.data;
    const legCount = buf[49]!;
    const legs: ComboIntentV2Snapshot["legs"] = [];
    const LEG_BASE = 88;
    const LEG_SIZE = 56;
    for (let i = 0; i < legCount && i < 32; i++) {
      const off = LEG_BASE + i * LEG_SIZE;
      legs.push({
        option: new PublicKey(buf.subarray(off, off + 32)),
        side: buf.readInt8(off + 32),
        filled: buf[off + 33] !== 0,
        // pad @ +34..+40
        maxPremiumMicro: buf.readBigUInt64LE(off + 40),
        fillPremiumMicro: buf.readBigUInt64LE(off + 48),
      });
    }
    return {
      buyer: new PublicKey(buf.subarray(8, 40)),
      comboId: buf.readBigUInt64LE(40),
      status: buf[48]!,
      legCount,
      legsFilled: buf[50]!,
      // bump @ 51; padding @ 52..56
      totalMaxPremiumMicro: buf.readBigUInt64LE(56),
      totalRealisedPremiumMicro: buf.readBigUInt64LE(64),
      expiresTs: buf.readBigInt64LE(72),
      createdAt: buf.readBigInt64LE(80),
      legs,
    };
  }

  // -------------------------------------------------------------------------
  // Secondary-market Dutch auction compatibility shims. These instructions are
  // not present in the current IDL; callers fail closed until the secondary
  // auction family is restored.
  // -------------------------------------------------------------------------

  /** Deprecated compatibility shim; current IDL does not expose start_auction. */
  async startAuction(args: {
    optionPda: PublicKey;
    startPriceMicro: bigint;
    floorPriceMicro: bigint;
    decayPerSlot: bigint;
    durationSlots: bigint;
  }): Promise<TxResult & { auction: PublicKey; auctionEscrow: PublicKey }> {
    void args;
    this._assertProgramLoaded();
    throw new Error("start_auction is not in the current skew_master IDL.");
  }

  /** Deprecated compatibility shim; current IDL does not expose fill_auction. */
  async fillAuction(optionPda: PublicKey): Promise<TxResult> {
    void optionPda;
    this._assertProgramLoaded();
    throw new Error("fill_auction is not in the current skew_master IDL.");
  }

  /** Deprecated compatibility shim; current IDL does not expose cancel_auction. */
  async cancelAuction(optionPda: PublicKey): Promise<TxResult> {
    void optionPda;
    this._assertProgramLoaded();
    throw new Error("cancel_auction is not in the current skew_master IDL.");
  }
}

// ---------------------------------------------------------------------------
// OptionAccount decode (used by listOptions)
//
// Anchor 0.31 returns enum variants as `{ <camelCaseVariant>: {} }` and
// snake_case fields as camelCase on the decoded `account`. We project
// that into the public `OptionSummary` shape with USD-converted scalars.
// ---------------------------------------------------------------------------

const OPTION_TYPE_VARIANTS: Record<string, OptionType> = {
  vanilla: "Vanilla",
  digital: "Digital",
  cappedVanilla: "CappedVanilla",
  rangeAccrual: "RangeAccrual",
  // Phase 2 (2026-05-04) — Inverse family decoding.
  vanillaInverse: "VanillaInverse",
  digitalInverse: "DigitalInverse",
};

const OPTION_STATE_VARIANTS: Record<string, OptionState> = {
  created: "Created",
  funded: "Funded",
  active: "Active",
  expired: "Expired",
  settled: "Settled",
  disputed: "Disputed",
  expiredAbandoned: "ExpiredAbandoned",
};

function decodeAnchorEnum<T extends string>(raw: unknown, table: Record<string, T>): T | null {
  if (!raw || typeof raw !== "object") return null;
  for (const key of Object.keys(raw)) {
    const mapped = table[key];
    if (mapped) return mapped;
  }
  return null;
}

interface RawOptionAccount {
  creator: PublicKey;
  holder: PublicKey;
  optionType: unknown;
  state: unknown;
  asset: number;
  direction: number;
  strike: BN;
  upperBound: BN;
  expiryTs: BN;
  payoffAmount: BN;
  collateralLocked: BN;
  v0UsdcMicro: BN;
  sigmaAtCreation: number;
  spotAtCreation: BN;
  settled: boolean;
  createdAt: BN;
  underlyingFeedId: PublicKey;
  settlementMint: PublicKey;
}

function bnToBigint(value: BN): bigint {
  return BigInt(value.toString());
}

function collateralPolicyKindLabel(kindCode: number): "stable" | "native" | "lst" | "unknown" {
  if (kindCode === 0) return "stable";
  if (kindCode === 1) return "native";
  if (kindCode === 2) return "lst";
  return "unknown";
}

function decodeOptionAccount(pda: PublicKey, raw: unknown): OptionSummary | null {
  const acc = raw as RawOptionAccount;
  const optionType = decodeAnchorEnum<OptionType>(acc.optionType, OPTION_TYPE_VARIANTS);
  const state = decodeAnchorEnum<OptionState>(acc.state, OPTION_STATE_VARIANTS);
  const underlying = indexToUnderlying(Number(acc.asset));
  if (!optionType || !state || !underlying) return null;

  const strikeOnChain = bnToBigint(acc.strike);
  const upperBoundOnChain = bnToBigint(acc.upperBound);
  const payoffAmount = bnToBigint(acc.payoffAmount);
  const collateralLocked = bnToBigint(acc.collateralLocked);
  const v0UsdcMicro = bnToBigint(acc.v0UsdcMicro);
  const spotAtCreationRaw = bnToBigint(acc.spotAtCreation);
  const direction: Direction = Number(acc.direction) >= 0 ? "buy" : "sell";

  return {
    pda: pda.toBase58(),
    creator: acc.creator.toBase58(),
    holder: acc.holder.toBase58(),
    optionType,
    state,
    underlying,
    underlyingIndex: Number(acc.asset),
    direction,
    strikeOnChain,
    strikeUsd: fromOnChainStrike(strikeOnChain),
    upperBoundOnChain,
    upperBoundUsd: fromOnChainStrike(upperBoundOnChain),
    expiryTs: Number(acc.expiryTs.toString()),
    payoffAmount,
    payoffUsd: fromUsdcUnits(payoffAmount),
    collateralLocked,
    collateralLockedUsd: fromUsdcUnits(collateralLocked),
    v0UsdcMicro,
    v0Usd: fromUsdcUnits(v0UsdcMicro),
    sigmaAtCreation: Number(acc.sigmaAtCreation),
    spotAtCreationUsd: Number(spotAtCreationRaw) / 100_000_000,
    settled: Boolean(acc.settled),
    createdAt: Number(acc.createdAt.toString()),
    underlyingFeedId: acc.underlyingFeedId.toBase58(),
    settlementMint: acc.settlementMint.toBase58(),
  };
}
