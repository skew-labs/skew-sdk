import {
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  type Signer,
} from "@solana/web3.js";
import {
  BN,
  Program,
  AnchorProvider,
  type Wallet,
  type Idl,
} from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
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
} from "./types";
import {
  SKEW_PROGRAM_ID,
  findOptionPda,
  findEscrowPda,
  findOptionTokenMintPda,
  findFeeAccumulatorPda,
  findFeeAuthorityPda,
  findMetadataPda,
  findClearingMemberPda,
  findCmEscrowPda,
  findLiqStatePda,
  findInsuranceFundPda,
  findIfEscrowPda,
  findGovernancePda,
  findSigmaIvPda,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  resolvePythFeed,
  generateNonce,
  toOnChainStrike,
  toUsdcUnits,
  isoToUnixSeconds,
  // V2.1 anchor-instruction helpers (sub-1779)
  assetEnumIndex,
  directionToI8,
  mapPayoffToAnchor,
  fetchPythSpotUsd,
  ASSET_DEFAULT_SIGMA,
} from "./pda";

// Devnet USDC mint — overridable via SKEW_DEVNET_USDC_MINT env var.
const DEVNET_USDC_MINT = new PublicKey(
  process.env["SKEW_DEVNET_USDC_MINT"] ?? "4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8",
);

export interface SkewClientOptions {
  programId?: string;
  usdcMint?: string;
}

/**
 * SkewClient — the machine gate to Skew infrastructure.
 *
 * Construction (one canonical path — `fromProgram`):
 * ```ts
 * import idl from "@skew/sdk/idl/skew_master.json" assert { type: "json" };
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

  constructor(
    connection: Connection,
    wallet: Wallet,
    options: SkewClientOptions = {},
  ) {
    this.connection = connection;
    this.wallet = wallet;
    const _programId = options.programId
      ? new PublicKey(options.programId)
      : SKEW_PROGRAM_ID;
    void _programId;
    this.usdcMint = options.usdcMint ? new PublicKey(options.usdcMint) : DEVNET_USDC_MINT;
    // Note: do NOT instantiate Program here. Use SkewClient.fromProgram(...)
    // to load with a real IDL.
  }

  /**
   * Load the SDK with a pre-built Program instance — the canonical entry point.
   *
   * @example
   *   import idl from "@skew/sdk/idl/skew_master.json" assert { type: "json" };
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
          "after `new Program(idl, provider)`. See @skew/sdk/README for setup.",
      );
    }
    return this.program;
  }

  /** Back-compat alias for guard checks. */
  private _assertProgramLoaded(): void {
    this._program();
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

    const pythFeed = resolvePythFeed(underlying);
    const strikeOnChain = toOnChainStrike(strike);
    const expiryTs = isoToUnixSeconds(expiry);
    const payoffUnits = toUsdcUnits(notional);
    const upperBoundOnChain = params.upperBound
      ? toOnChainStrike(params.upperBound)
      : 0n;

    // V2.1 derivations
    const assetIdx = assetEnumIndex(underlying);
    const mapping = mapPayoffToAnchor(payoff);
    const directionWire = directionToI8(params.direction ?? mapping.defaultDirection);
    const extraParam = mapping.extraParam(params);

    // V0 stamp — auto-fetch from Pyth Hermes if caller didn't supply.
    // HYPE pre-Wormhole has no Hermes feed; caller must supply spotAtCreation.
    const spotAtCreationUsd =
      params.spotAtCreation ?? (await fetchPythSpotUsd(underlying));
    const sigmaAtCreation =
      params.sigmaAtCreation ?? ASSET_DEFAULT_SIGMA[underlying];

    // i64 spot_at_creation: USD × 10^8 (matches Pyth on-chain convention)
    const spotI64 = BigInt(Math.round(spotAtCreationUsd * 1e8));

    // 1 — create_option (12 args matching anchor v2.1 signature)
    const createTx = await this._program().methods
      .createOption(
        new BN(nonce.toString()),
        mapping.optionType as never,
        assetIdx,                              // u8: 5-asset enum index
        directionWire,                         // i8: +1 buy / -1 sell
        new BN(strikeOnChain.toString()),
        new BN(expiryTs.toString()),
        new BN(payoffUnits.toString()),
        6, // USDC decimals
        new BN(upperBoundOnChain.toString()),
        extraParam,                            // f64
        new BN(spotI64.toString()),            // i64: V0 spot stamp
        sigmaAtCreation,                       // f64: V0 σ stamp
      )
      .accounts({
        option: optionPda,
        creator,
        underlyingFeed: pythFeed,
        settlementMint: this.usdcMint,
        metadataPda,
        mplTokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        governance: findGovernancePda()[0],
      })
      .transaction();

    const createSig = await this._sendAndConfirm(createTx);

    // 2 — deposit_collateral (creator's USDC ATA → escrow)
    const creatorAta = getAssociatedTokenAddressSync(this.usdcMint, creator);
    const depositTx = await this._program().methods
      .depositCollateral(new BN(payoffUnits.toString()))
      .accounts({
        option: optionPda,
        creator,
        creatorTokenAccount: creatorAta,
        escrowTokenAccount: escrowPda,
        settlementMint: this.usdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();

    const depositSig = await this._sendAndConfirm(depositTx);

    return {
      address: optionPda,
      nonce,
      createTx: createSig,
      depositTx: depositSig,
    };
  }

  /**
   * Buy an option. Sends premium from buyer's USDC ATA to creator's ATA.
   * BGK correction, σ_IV routing, fee calculation — all internal.
   */
  async buy(
    option: string | PublicKey,
    premiumUsd: number,
  ): Promise<BuyResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const buyer = this.wallet.publicKey;

    // Fetch option to get creator for premium_to routing.
    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;

    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);
    const [metadataPda] = findMetadataPda(optionTokenMintPda);
    const [feeAccumulator] = findFeeAccumulatorPda(this.usdcMint);
    const [feeAuthority] = findFeeAuthorityPda();

    const buyerAta  = getAssociatedTokenAddressSync(this.usdcMint, buyer);
    const creatorAta = getAssociatedTokenAddressSync(this.usdcMint, creator);
    const buyerOptionAta = getAssociatedTokenAddressSync(optionTokenMintPda, buyer, false, TOKEN_PROGRAM_ID);

    const [sigmaIvPda] = findSigmaIvPda();

    const tx = await this._program().methods
      .buyOption(new BN(toUsdcUnits(premiumUsd).toString()))
      .accounts({
        option: optionPda,
        buyer,
        premiumFrom: buyerAta,
        premiumTo: creatorAta,
        settlementMint: this.usdcMint,
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
      })
      .transaction();

    const sig = await this._sendAndConfirm(tx);
    return { txSignature: sig };
  }

  /**
   * Settle an expired option. Permissionless — anyone can call.
   * Reads Pyth price, routes payoff to holder, returns residual to creator.
   */
  async settle(option: string | PublicKey): Promise<SettleResult> {
    this._assertProgramLoaded();
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;

    const raw = await this._fetchOption(optionPda);
    const creator: PublicKey = (raw as { creator: PublicKey }).creator;
    const holder: PublicKey  = (raw as { holder: PublicKey }).holder;
    const pythFeed: PublicKey = (raw as { underlyingFeedId: PublicKey }).underlyingFeedId;

    const [escrowPda] = findEscrowPda(optionPda);
    const [optionTokenMintPda] = findOptionTokenMintPda(optionPda);

    const effectiveHolder = holder.equals(PublicKey.default) ? creator : holder;
    const holderAta  = getAssociatedTokenAddressSync(this.usdcMint, effectiveHolder);
    const creatorAta = getAssociatedTokenAddressSync(this.usdcMint, creator);
    const holderOptionAta = holder.equals(PublicKey.default)
      ? SystemProgram.programId
      : getAssociatedTokenAddressSync(optionTokenMintPda, holder, false, TOKEN_PROGRAM_ID);

    const tx = await this._program().methods
      .settle()
      .accounts({
        option: optionPda,
        caller: this.wallet.publicKey,
        pythPrice: pythFeed,
        escrowTokenAccount: escrowPda,
        optionTokenMint: optionTokenMintPda,
        currentHolderOptionAta: holderOptionAta,
        payoffTokenAccount: holderAta,
        creatorRefundTokenAccount: creatorAta,
        settlementMint: this.usdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();

    const sig = await this._sendAndConfirm(tx);
    return { txSignature: sig, payoffUsd: 0 }; // payoffUsd resolved via event/indexer post-tx
  }

  /**
   * Register the wallet as a Clearing Member (Phase 1 permissionless).
   *
   * Mirrors anchor `register_clearing_member`. Derives the CM PDA + escrow PDA,
   * computes the authority's USDC ATA, and submits a single transaction. The
   * caller's USDC ATA must already hold ≥ `initialCollateralUsdc` tokens — the
   * SDK does not auto-faucet (use spl-token-faucet.com on devnet).
   *
   * @example
   *   const result = await skew.registerClearingMember({
   *     initialCollateralUsdc: 50_000,    // $50k
   *   });
   *   console.log(`CM PDA: ${result.cmPda.toBase58()}`);
   */
  async registerClearingMember(
    params: RegisterCmParams,
  ): Promise<RegisterCmResult> {
    this._assertProgramLoaded();
    const authority = this.wallet.publicKey;
    const [cmPda] = findClearingMemberPda(authority);
    const [cmEscrow] = findCmEscrowPda(cmPda);
    const authorityUsdcAta = getAssociatedTokenAddressSync(
      this.usdcMint,
      authority,
    );
    const collateralMicro = toUsdcUnits(params.initialCollateralUsdc);

    const tx = await this._program().methods
      .registerClearingMember(new BN(collateralMicro.toString()))
      .accounts({
        cm: cmPda,
        authority,
        usdcMint: this.usdcMint,
        authorityUsdcAta,
        cmEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();

    const txSignature = await this._sendAndConfirm(tx);
    return { cmPda, cmEscrow, txSignature };
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

    const tx = await this._program().methods
      .cmAddCollateral(new BN(toUsdcUnits(amountUsdc).toString()))
      .accounts({
        cm: cmPda,
        authority,
        usdcMint: this.usdcMint,
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
   * Anchor enforces `withdrawal ≤ free_collateral` (collateral − im_locked) — if
   * IM is locked against open positions, that portion is non-withdrawable.
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

    const tx = await this._program().methods
      .cmWithdrawCollateral(new BN(toUsdcUnits(amountUsdc).toString()))
      .accounts({
        cm: cmPda,
        authority,
        usdcMint: this.usdcMint,
        authorityUsdcAta,
        cmEscrow,
        tokenProgram: TOKEN_PROGRAM_ID,
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
      optionTokenMintPda, currentHolder, false, TOKEN_PROGRAM_ID,
    );
    const newHolderOptionAta = getAssociatedTokenAddressSync(
      optionTokenMintPda, newHolderPk, false, TOKEN_PROGRAM_ID,
    );

    const tx = await this._program().methods
      .transferOption()
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
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
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
    const creatorAta = getAssociatedTokenAddressSync(this.usdcMint, creator);

    const tx = await this._program().methods
      .cancelOption()
      .accounts({
        option: optionPda,
        creator,
        escrowTokenAccount: escrowPda,
        creatorTokenAccount: creatorAta,
        settlementMint: this.usdcMint,
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
    const creatorAta = getAssociatedTokenAddressSync(this.usdcMint, creator);

    const tx = await this._program().methods
      .closeExpired()
      .accounts({
        option: optionPda,
        caller,
        creator,
        escrowTokenAccount: escrowPda,
        creatorTokenAccount: creatorAta,
        settlementMint: this.usdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Read-only — invoke `calculate_margin` (master paper §10 PM v1.4) for the
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

    const tx = await this._program().methods
      .calculateMargin(currentSpotUsd)
      .accounts({
        caller,
        cm: cmPda,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);

    // Read CM PDA to extract resulting IM breakdown
    const cmAccountClient = (this._program().account as Record<string, { fetch: (k: PublicKey) => Promise<unknown> }>)["clearingMember"];
    if (!cmAccountClient) {
      // Fallback if account name differs — return tx sig only
      return {
        txSignature,
        collateralUsdcMicro: 0n,
        imLockedUsdcMicro: 0n,
        freeCollateralUsdcMicro: 0n,
      };
    }
    const cm = await cmAccountClient.fetch(cmPda) as Record<string, BN>;
    const collateral = BigInt((cm.collateral ?? new BN(0)).toString());
    const imLocked = BigInt((cm.imLocked ?? new BN(0)).toString());
    return {
      txSignature,
      collateralUsdcMicro: collateral,
      imLockedUsdcMicro: imLocked,
      freeCollateralUsdcMicro: collateral - imLocked,
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
    const creatorAta = getAssociatedTokenAddressSync(this.usdcMint, creator);

    const tx = await this._program().methods
      .expireAbandoned()
      .accounts({
        option: optionPda,
        caller,
        escrowTokenAccount: escrowPda,
        creatorRefundTokenAccount: creatorAta,
        settlementMint: this.usdcMint,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { txSignature };
  }

  /**
   * Trigger Dutch-auction liquidation. Permissionless — anyone with USDC ATA
   * can call. Bonus 150 → 500 bps over 90 slots; partial-close cap 50%
   * (`closeFactorBps` 1..5000).
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
  ): Promise<TxResult> {
    this._assertProgramLoaded();
    if (closeFactorBps < 1 || closeFactorBps > 5000 || !Number.isInteger(closeFactorBps)) {
      throw new Error(`closeFactorBps must be 1..5000, got ${closeFactorBps}`);
    }
    const optionPda = typeof option === "string" ? new PublicKey(option) : option;
    const cmAuthorityPk = typeof defaultingCmAuthority === "string"
      ? new PublicKey(defaultingCmAuthority)
      : defaultingCmAuthority;
    const liquidator = this.wallet.publicKey;
    if (liquidator.equals(cmAuthorityPk)) {
      throw new Error("liquidator must differ from defaulting CM authority (Bug #7 self-liquidation guard)");
    }
    const [liqState] = findLiqStatePda(optionPda);
    const [optionEscrow] = findEscrowPda(optionPda);
    const [defaultingCm] = findClearingMemberPda(cmAuthorityPk);
    const [cmEscrow] = findCmEscrowPda(defaultingCm);
    const [insuranceFund] = findInsuranceFundPda();
    const [ifEscrow] = findIfEscrowPda();
    const liquidatorPayoutAta = getAssociatedTokenAddressSync(this.usdcMint, liquidator);

    const tx = await this._program().methods
      .liquidate(closeFactorBps)
      .accounts({
        liqState,
        option: optionPda,
        defaultingCm,
        insuranceFund,
        optionEscrow,
        cmEscrow,
        ifEscrow,
        liquidatorPayoutAta,
        settlementMint: this.usdcMint,
        liquidator,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
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

    const tx = await this._program().methods
      .rolloverOption(
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
        pythPrice: pythFeed,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        swbAggregator: swb,
      })
      .transaction();
    const txSignature = await this._sendAndConfirm(tx);
    return { newOptionPda, txSignature };
  }

  private async _fetchOption(pda: PublicKey): Promise<unknown> {
    const acc = (this._program().account as Record<string, { fetch: (k: PublicKey) => Promise<unknown> }>)["optionAccount"];
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
}
