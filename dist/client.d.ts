import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { Program, type Wallet, type Idl } from "@coral-xyz/anchor";
import type { CreateParams, CreateResult, BuyResult, SettleResult, RegisterCmParams, RegisterCmResult, TxResult, MarginCalcResult, ListOptionsOpts, OptionSummary, IsolatedVaultSnapshot, DvolSnapshot, ComboLeg, ComboIntentSnapshot, RecoveryWinnerCm, RecoveryStepResult, PoVSStateSnapshot, HamiltonSnapshot, SkewMetricsSnapshot, InsuranceFundSnapshot, ClearingMemberSnapshot, LstVaultSnapshot, NativeSolVaultSnapshot, SeriesListingSnapshot, BuilderCodeSnapshot, ConditionalOrderSnapshot, RfqAuctionSnapshot, ComboIntentV2Snapshot, CrossAssetSnapshot, MicrostructureSnapshot } from "./types";
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
export declare class SkewClient {
    private program;
    private wallet;
    private connection;
    private usdcMint;
    /** Authority pubkey backing this client (matches anchor `cm.authority`
     *  for register_clearing_member / cm_add_collateral / etc). Read-only. */
    get walletPublicKey(): PublicKey;
    constructor(connection: Connection, wallet: Wallet, options?: SkewClientOptions);
    /**
     * Load the SDK with a pre-built Program instance — the canonical entry point.
     *
     * @example
     *   import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };
     *   const program = new Program(idl as any, provider);
     *   const skew    = SkewClient.fromProgram(connection, wallet, program);
     */
    static fromProgram(connection: Connection, wallet: Wallet, program: Program<Idl>, usdcMint?: PublicKey): SkewClient;
    private _program;
    /** Back-compat alias for guard checks. */
    private _assertProgramLoaded;
    private _collateralPolicy;
    private _hamiltonRemaining;
    private _povsRemaining;
    private _positionRegistryRemaining;
    private _registryContains;
    private _pmRemaining;
    private _settleCmOptionalAccounts;
    private _settleHolderOptionalAccounts;
    private _buildUntrackHeldPositionIx;
    private _settleCollateralLockOptionalAccounts;
    private _optionTypeDiscriminant;
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
    create(params: CreateParams): Promise<CreateResult>;
    /**
     * Buy an option. Sends premium in the option's settlement mint to the
     * creator's matching ATA. BGK correction, sigma-IV routing, and fee
     * calculation are all internal.
     */
    buy(option: string | PublicKey, premiumUsd: number): Promise<BuyResult>;
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
    settle(option: string | PublicKey): Promise<SettleResult>;
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
    registerClearingMember(params: RegisterCmParams): Promise<RegisterCmResult>;
    /**
     * Add USDC collateral to an existing CM escrow.
     * Idempotent — anchor `cm_add_collateral` accepts repeated deposits.
     *
     * @example
     *   await skew.cmAddCollateral(10_000);  // +$10K to existing CM
     */
    cmAddCollateral(amountUsdc: number): Promise<TxResult>;
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
    cmWithdrawCollateral(amountUsdc: number): Promise<TxResult>;
    /** One-shot fee-volume tracker init required before relay/CM atomic fills. */
    initVolumeTracker(): Promise<TxResult & {
        volumeTracker: PublicKey;
    }>;
    /** SKEW_AUTHORITY one-shot init for the singleton FeeConfigPda. */
    initFeeConfig(): Promise<TxResult & {
        feeConfig: PublicKey;
    }>;
    /** SKEW_AUTHORITY one-shot init for the collateral mint policy allowlist. */
    initCollateralPolicy(): Promise<TxResult & {
        policy: PublicKey;
    }>;
    /**
     * Permissionless per-mint protocol fee accumulator bootstrap.
     *
     * Atomic fills require the fee accumulator account to already exist so the
     * hot fill ix can stay deterministic and CU-bounded. This helper mirrors
     * the relay's automatic prefill bootstrap and works for USDC, wSOL, and
     * jitoSOL as long as the mint is registered in CollateralPolicyPda.
     */
    initFeeAccumulator(settlementMint?: PublicKey): Promise<TxResult & {
        feeAccumulator: PublicKey;
    }>;
    /** SKEW_AUTHORITY registers a settlement/collateral mint in CollateralPolicyPda. */
    registerCollateralPolicyEntry(args: {
        mint: PublicKey;
        decimals: number;
        kind: 0 | 1 | 2;
        oracleFeed?: PublicKey;
        maxDepegBps?: number;
    }): Promise<TxResult>;
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
    transferOption(option: string | PublicKey, newHolder: string | PublicKey): Promise<TxResult>;
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
    bundleTransferAndSettle(option: string | PublicKey, newHolder: string | PublicKey): Promise<TxResult>;
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
    buildBundleTransferAndSettleCoSigned(option: string | PublicKey, newHolder: PublicKey): Promise<Transaction>;
    /**
     * Cancel an option BEFORE any buy. Only the creator can call — anchor
     * rejects if the option's `holder` is set (i.e. someone has bought it).
     * Returns escrow collateral to creator.
     *
     * @example
     *   await skew.cancelOption(optionPda);
     */
    cancelOption(option: string | PublicKey): Promise<TxResult>;
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
    closeExpired(option: string | PublicKey): Promise<TxResult>;
    /**
     * Close a released OptionCollateralLockPda sidecar and reclaim rent to the
     * writer. Normal stable and physical settlement mark the sidecar Released;
     * this sweep is intentionally separate so settlement stays on the hot path.
     */
    closeOptionCollateralLock(option: string | PublicKey): Promise<TxResult>;
    /**
     * Track an option token held by this wallet as a CM long hedge.
     *
     * This is the portfolio-margin bridge institutional desks expect: after a
     * CM buys an option, call this once so the long is included in the same
     * PositionRegistryPda as writer shorts and offsets future IM.
     */
    trackHeldPosition(option: string | PublicKey): Promise<TxResult & {
        cmPda: PublicKey;
        positionRegistry: PublicKey;
    }>;
    /**
     * Remove a CM-held long from the PM registry. The SDK calls this
     * automatically before `transferOption()` when the position is tracked.
     */
    untrackHeldPosition(option: string | PublicKey): Promise<TxResult>;
    /**
     * Recompute PM and release excess marginal IM from a relay option escrow
     * back into the writer CM escrow. `maxReleaseUsdc=0` means "release all
     * excess". Stable USDC CM lane only; physical SOL-family locks settle from
     * their vault-specific path.
     */
    rebalancePmLock(option: string | PublicKey, maxReleaseUsdc?: number): Promise<TxResult>;
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
    calculateMargin(currentSpotUsd: number): Promise<MarginCalcResult>;
    /**
     * Sweep an abandoned option after the 72h grace window past expiry.
     * Distinct from `closeExpired` which closes within 72h. Returns escrow to
     * creator. Permissionless — anyone can call.
     *
     * @example
     *   await skew.expireAbandoned(optionPda);
     */
    expireAbandoned(option: string | PublicKey): Promise<TxResult>;
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
    liquidate(option: string | PublicKey, defaultingCmAuthority: string | PublicKey, closeFactorBps: number, minExpectedBonusBps?: number): Promise<TxResult>;
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
    rolloverOption(oldOption: string | PublicKey, params: {
        newExpiry: string;
        newStrike: number;
        newNotional: number;
        swbAggregator?: PublicKey;
    }): Promise<{
        newOptionPda: PublicKey;
        txSignature: string;
    }>;
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
    listOptions(opts?: ListOptionsOpts): Promise<OptionSummary[]>;
    private _fetchOption;
    private _sendAndConfirm;
    /**
     * One-shot per (user, option) — initialise the IsolatedVault PDA + escrow ATA.
     * Caller pays rent (~0.004 SOL).
     */
    initIsolatedVault(option: string | PublicKey): Promise<TxResult>;
    /**
     * User → vault USDC transfer. Increments `vault.usdc_micro`.
     * Vault must already be initialised via `initIsolatedVault`.
     */
    depositIsolated(option: string | PublicKey, amountUsdc: number): Promise<TxResult>;
    /**
     * Vault → user USDC transfer. Anchor enforces
     * `amount ≤ vault.free_micro()` so funds locked behind an open option
     * fill cannot be pulled.
     */
    withdrawIsolated(option: string | PublicKey, amountUsdc: number): Promise<TxResult>;
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
    registerComboIntent(comboId: bigint, legs: ComboLeg[], totalMaxPremiumUsdc: number, expiryTsSeconds: bigint): Promise<TxResult & {
        combo: PublicKey;
        comboEscrow: PublicKey;
    }>;
    /**
     * Cancel an Open combo. Refunds residual escrow + closes the PDA + escrow,
     * recovering ~0.004 SOL of rent. Must be Open status (not Active/Cancelled).
     */
    cancelComboIntent(comboId: bigint): Promise<TxResult>;
    /**
     * Finalise a fully-filled combo. Flips status → Active, refunds residual
     * (max premium − actually paid), closes the PDA + escrow.
     */
    finalizeComboIntent(comboId: bigint): Promise<TxResult>;
    /**
     * Fetch the latest DVOL snapshot for an asset. Returns null when no
     * crank has run yet (PDA does not exist).
     */
    fetchDvol(assetIdx: number): Promise<DvolSnapshot | null>;
    /**
     * Fetch an IsolatedVault snapshot. Returns null when not initialised.
     */
    fetchIsolatedVault(user: PublicKey, option: string | PublicKey): Promise<IsolatedVaultSnapshot | null>;
    /**
     * Fetch a ComboIntent snapshot. Returns null when not registered or
     * already closed (cancelled / finalised).
     */
    fetchComboIntent(buyer: PublicKey, comboId: bigint): Promise<ComboIntentSnapshot | null>;
    /** Read the per-asset PoVS state — full Heston × VRP × tail vector. */
    fetchPovs(assetIdx: number): Promise<PoVSStateSnapshot | null>;
    /** Read the per-asset Hamilton 2-state regime filter posterior. */
    fetchHamilton(assetIdx: number): Promise<HamiltonSnapshot | null>;
    /** Read per-asset SkewMetrics — RR25 / BF25 / RR10 / ATM slope + 8-tenor IV. */
    fetchSkewMetrics(assetIdx: number): Promise<SkewMetricsSnapshot | null>;
    /**
     * Read the singleton CrossAssetMatrix — 10 pairwise ρ + 10 stress ρ across
     * BTC/ETH/SOL/XRP/HYPE. Single-PDA scan via getProgramAccounts; the IDL
     * lists CrossAssetMatrix as a `zero_copy` account so the standard
     * `program.account.crossAssetMatrix.all()` returns the parsed body.
     */
    fetchCrossAssetMatrix(): Promise<CrossAssetSnapshot | null>;
    /**
     * Read the per-asset MicrostructurePDA — spot / bid-ask / depth / 24h
     * volume / IV bid-ask. Per-asset scan via `.all()` + filter.
     */
    fetchMicrostructure(assetIdx: number): Promise<MicrostructureSnapshot | null>;
    /** Read the singleton Insurance Fund balances used by the 6-tier default cascade. */
    fetchInsuranceFund(): Promise<InsuranceFundSnapshot | null>;
    /** Read a CM's `ClearingMemberAccount` snapshot — full risk diagnostic. */
    fetchClearingMember(authority?: PublicKey): Promise<ClearingMemberSnapshot | null>;
    /**
     * ADL step — drains up to `targetLossUsdc` from the supplied winner CMs.
     * Each winner is capped at 50 % of their `free_collateral`. Off-chain
     * priority sort decides the order.
     *
     * @param targetLossUsdc — bad-debt residual to absorb (typically read from
     *   the tier-5 `DefaultAbsorbed` event the failed `liquidate` emitted).
     * @param winners — pre-sorted (cm, cm_escrow) pairs.
     */
    adlStep(targetLossUsdc: number, winners: RecoveryWinnerCm[]): Promise<RecoveryStepResult>;
    /**
     * Clawback step — pro-rata socialised loss across all supplied winners
     * proportional to `cm.collateral − cm.last_im_micro`. Capped at 50 %
     * per CM. Off-chain caller must include EVERY profitable CM (NOT just
     * top-N) for the proportional formula to be fair.
     */
    clawbackStep(targetLossUsdc: number, winners: RecoveryWinnerCm[]): Promise<RecoveryStepResult>;
    /**
     * IF auto-replenish — moves USDC from the protocol fee accumulator into
     * IF Tier-3 (Protocol SITG). This is SKEW_AUTHORITY-only: the keeper bot
     * polls `compute_if_target_micro` vs current capacity and invokes when
     * capacity < 80 % of target.
     */
    replenishIfFromFees(amountUsdc: number, settlementMint?: PublicKey): Promise<TxResult>;
    /** SKEW_AUTHORITY protocol fee withdrawal from a per-mint fee accumulator. */
    withdrawFees(amount: number, recipient?: PublicKey, settlementMint?: PublicKey): Promise<TxResult>;
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
    updateDvol(assetIdx: number, dvol28dPct: number, dvol90dPct: number, realizedVar28dPct: number): Promise<TxResult>;
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
    registerConditionalOrder(args: {
        orderId: bigint;
        kind: number;
        triggerOracle: PublicKey;
        triggerPrice1e8: bigint;
        triggerDirection: number;
        triggerMode: number;
        triggerGraceSlots: number;
        action: number;
        actionTarget: PublicKey;
        actionMinPremiumMicro: bigint;
        actionMaxPremiumMicro: bigint;
        actionMaxSlippageBps: number;
        validUntilTs: bigint;
    }): Promise<TxResult & {
        order: PublicKey;
    }>;
    /** Cancel an Active conditional order. PDA is closed → rent + keeper-reward refunded. */
    cancelConditionalOrder(orderId: bigint): Promise<TxResult>;
    /**
     * Permissionless trigger crank. Keeper calls this when Pyth EMA crosses
     * `triggerPrice1e8` in `triggerDirection`. State flips Active → Triggered;
     * `ConditionalOrderTriggered` event emitted.
     */
    executeConditionalOrder(orderAuthority: PublicKey, orderId: bigint, pythOracle: PublicKey, actionTarget?: PublicKey, linkedOrder?: PublicKey): Promise<TxResult>;
    /**
     * Register a paired SL+TP (one-cancels-other). When either leg's
     * `apply_*_action` lands, the on-chain crank cancels the surviving leg.
     */
    registerOcoPair(stopLoss: Parameters<SkewClient["registerConditionalOrder"]>[0], takeProfit: Parameters<SkewClient["registerConditionalOrder"]>[0]): Promise<TxResult & {
        stopLossOrder: PublicKey;
        takeProfitOrder: PublicKey;
    }>;
    /** Permissionless crank — closes an Active order whose `validUntilTs` has passed. */
    cleanupExpiredConditionalOrder(orderAuthority: PublicKey, orderId: bigint): Promise<TxResult>;
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
    applyCloseIsolatedAction(orderId: bigint, actionTarget: PublicKey): Promise<TxResult>;
    /** Fail-closed on-chain until direct exercise CPI exists. */
    applyEarlyExerciseAction(orderId: bigint): Promise<TxResult>;
    /** Fail-closed on-chain until direct RFQ CPI exists. */
    applySellViaRfqAction(orderId: bigint): Promise<TxResult>;
    /** Fail-closed on-chain until direct RFQ CPI exists. */
    applyBuybackViaRfqAction(orderId: bigint): Promise<TxResult>;
    /** One-time MM registration. Stakes `RFQ_MAKER_DEPOSIT_LAMPORTS` anti-spam deposit. */
    registerRfqMaker(): Promise<TxResult & {
        registry: PublicKey;
    }>;
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
    setMakerRiskConfig(args?: {
        quoteOff?: boolean;
        identityMode?: 0 | 1;
        marginMode?: 0 | 1 | 2;
        riskScopeAsset?: number;
        collateralScope?: 0 | 1;
    }): Promise<TxResult & {
        registry: PublicKey;
    }>;
    /**
     * Buyer commits an RFQ auction with `maxPremiumUsdc` USDC locked into
     * escrow until finalize / cancel. Current on-chain RFQ v1 requires the
     * stable settlement policy; SOL/jitoSOL collateral is live in CM / relay
     * PM paths, not in RFQ-auction escrow registration.
     *
     * `optionSpec` mirrors the on-chain `RfqOptionSpec` struct.
     */
    registerRfqAuction(args: {
        auctionId: bigint;
        optionSpec: {
            asset: number;
            strike: bigint;
            expiryTs: bigint;
            payoffAmountMicro: bigint;
            optionType: number;
            direction: number;
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
    }): Promise<TxResult & {
        auction: PublicKey;
        escrow: PublicKey;
    }>;
    /**
     * MM submits a better-than-best quote. Builds the canonical RFQ digest,
     * has the MM keypair sign it, prepends an `Ed25519Program.createInstructionWithPublicKey`
     * verify ix, then calls `submit_rfq_quote`. The on-chain handler reads
     * the Instructions sysvar and verifies the signature against the digest.
     *
     * @param mmKeypair — used to sign the quote digest. Must match the
     *   wallet's publicKey (the MM is the signer of the tx itself).
     */
    submitRfqQuote(args: {
        auction: PublicKey;
        premiumMicro: bigint;
        validUntilSlot: bigint;
        mmSignature: Uint8Array;
    }): Promise<TxResult>;
    /** Permissionless RFQ finalizer. Refunds RFQ escrow to buyer; relay atomic fill handles option mint + MM premium. */
    finalizeRfqAuction(args: {
        auction: PublicKey;
        buyerUsdcAta: PublicKey;
    }): Promise<TxResult>;
    /** Buyer-initiated cancel. Pre-close only if no quotes received. */
    cancelRfqAuction(auction: PublicKey): Promise<TxResult>;
    /**
     * Deprecated compatibility shim.
     *
     * The current Anchor IDL no longer exposes `take_best_quote`. Do not emulate
     * it against RFQ-auction state. Use the Instant RFQ relay lane for 1-click
     * HIT (`buyer_accept` → `cm_sign` → `buyer_tx_signed` →
     * `atomic_fill_from_relay`) or keep the
     * auction lane as price discovery + `finalizeRfqAuction`.
     */
    takeBestQuote(args: {
        auction: PublicKey;
        expectedPremiumMicro: bigint;
        /** Override buyer USDC ATA. Defaults to derived ATA on this.usdcMint. */
        buyerUsdcAta?: PublicKey;
        /** Deprecated no-op; relay take-best-quote now returns HTTP 410. */
        viaRelay?: boolean;
        /** Deprecated no-op; retained for old callers. */
        relayBase?: string;
    }): Promise<TxResult>;
    /**
     * Deprecated compatibility shim for the removed take-and-fill relay bundle.
     */
    takeAndFillBundle(args: {
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
    }>;
    /** Deprecated compatibility shim; current IDL does not expose refresh_quote. */
    refreshQuote(args: {
        auction: PublicKey;
        premiumMicro: bigint;
        validUntilSlot: bigint;
        mmSignature: Uint8Array;
    }): Promise<TxResult>;
    /**
     * Publish a new MakerAxe — MM 인벤토리 의향 board entry. Costs
     * 0.001 SOL anti-spam fee → InsuranceFund tier-3.
     *
     * Inbox 1.2 (two-way) fold: pass `side: 0` and populate both
     * `bid_premium_band_*` + `ask_premium_band_*`. side -1 = SELL only,
     * +1 = BUY only.
     */
    publishAxe(args: {
        axeId: bigint;
        asset: number;
        side: -1 | 0 | 1;
        optionTypeMask: number;
        strikeBandLo: bigint;
        strikeBandHi: bigint;
        expiryBandLo: bigint;
        expiryBandHi: bigint;
        sizeMicro: bigint;
        bidPremiumBandLo: bigint;
        bidPremiumBandHi: bigint;
        askPremiumBandLo: bigint;
        askPremiumBandHi: bigint;
        validUntil: bigint;
        /** Optional ipfs/arweave content hash; pass zeros if none. */
        noteHash?: Uint8Array;
    }): Promise<TxResult & {
        axe: PublicKey;
    }>;
    /** Replace mutable fields on an existing axe. Owner-only. */
    updateAxe(args: {
        axe: PublicKey;
        fields: Parameters<SkewClient["publishAxe"]>[0];
    }): Promise<TxResult>;
    /** Close axe PDA — rent flows back to MM. */
    revokeAxe(axe: PublicKey): Promise<TxResult>;
    /**
     * Register a 1..32-leg combo intent. v2 supersedes v1's max-4 limit.
     * No premium escrow at register — premium is captured leg-by-leg in
     * `finalizeComboLegV2`; cleanup permissionless after `expiresTs`.
     */
    registerComboIntentV2(args: {
        comboId: bigint;
        legs: Array<{
            option: PublicKey;
            side: number;
            maxPremiumMicro: bigint;
        }>;
        totalMaxPremiumMicro: bigint;
        expiresTs: bigint;
    }): Promise<TxResult & {
        intent: PublicKey;
    }>;
    /** Permissionless leg-fill recorder. Keeper calls per-leg as fills land on-chain. */
    finalizeComboLegV2(intent: PublicKey, legIndex: number, realisedPremiumMicro: bigint, option?: PublicKey): Promise<TxResult>;
    /** Buyer-initiated cancel of an Open intent. Closes the PDA → rent refund. */
    cancelComboIntentV2(comboId: bigint): Promise<TxResult>;
    /** Permissionless cleanup — closes an expired intent past its `expiresTs`. */
    cleanupExpiredComboV2(buyerAuthority: PublicKey, comboId: bigint): Promise<TxResult>;
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
    upgradeTier(targetRank: 0 | 1 | 2 | 3, lst?: {
        lstVault: PublicKey;
        stakePool?: PublicKey;
        solUsdPyth?: PublicKey;
    }): Promise<TxResult>;
    /**
     * Step the CM down to a lower Verified tier. Releases the tier-specific
     * USDC lockup back into `free_collateral`. Requires `now ≥ tier_locked_until`
     * (30 d after most recent upgrade). Strict rank decrease only.
     *
     * @example
     *   await skew.downgradeTier(1); // Gold/Platinum → Silver
     */
    downgradeTier(targetRank: 0 | 1 | 2 | 3, lstVault?: PublicKey): Promise<TxResult>;
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
    depositToIf(tier: 0 | 1 | 2, amountUsdc: number, isSitg: boolean): Promise<TxResult>;
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
    callVariationMargin(cmAuthority: PublicKey, remainingAccounts?: PublicKey[]): Promise<TxResult>;
    /**
     * One-shot per (user, lst_mint) — initialise the LstVault PDA + escrow
     * ATA. Phase 1 only accepts jitoSOL (`JITOSOL_MINT`). Subsequent
     * deposits/withdraws hang off this PDA.
     *
     * @example
     *   await skew.initLstVault(JITOSOL_MINT);
     */
    initLstVault(lstMint?: PublicKey): Promise<TxResult>;
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
    depositLstCollateral(amountLamports: bigint, lstMint?: PublicKey, stakePool?: PublicKey): Promise<TxResult>;
    /**
     * Withdraw LST collateral (jitoSOL) from the user's LstVault escrow back
     * to the user's LST ATA. Anchor handler enforces `amount ≤ free_qty()`
     * (lst_qty − locked_qty) so the user can't pull LST that's pledged
     * against open option fills.
     *
     * @example
     *   await skew.withdrawLstCollateral(500_000_000n);
     */
    withdrawLstCollateral(amountLamports: bigint, lstMint?: PublicKey): Promise<TxResult>;
    /**
     * One-shot per user — initialise the NativeSolVault PDA + wSOL escrow
     * ATA. No mint dimension (single canonical wSOL mint per protocol).
     * Subsequent deposits/withdraws hang off this PDA.
     *
     * @example
     *   await skew.initNativeSolVault();
     */
    initNativeSolVault(): Promise<TxResult>;
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
    wrapAndDeposit(amountLamports: bigint): Promise<{
        wrapTx: string;
        depositTx: string;
    }>;
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
    depositNativeSolCollateral(amountLamports: bigint): Promise<TxResult>;
    /**
     * Withdraw Native SOL collateral (wSOL) from the user's NativeSolVault
     * escrow back to the user's wSOL ATA. Gated on `amount ≤ free_qty()`
     * (sol_qty − locked_qty). The user can then unwrap wSOL → native SOL
     * on the client side (`close_account` / `sync_native`).
     *
     * @example
     *   await skew.withdrawNativeSolCollateral(500_000_000n);
     */
    withdrawNativeSolCollateral(amountLamports: bigint): Promise<TxResult>;
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
    listSeries(args: {
        asset: number;
        strikeMicro: bigint;
        expiryTs: bigint;
        optionTypeName: "Vanilla" | "Digital" | "CappedVanilla" | "RangeAccrual" | "VanillaInverse" | "DigitalInverse";
        direction: -1 | 0 | 1;
    }): Promise<TxResult & {
        series: PublicKey;
    }>;
    /**
     * Delist a series cell — closes the PDA + refunds rent to caller.
     * On-chain enforces `now ≥ expiry_ts` AND `total_oi_count == 0` so live
     * grid cells can't be cleared while OI is still open.
     */
    delistSeries(seriesPda: PublicKey): Promise<TxResult>;
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
    governanceSetSeriesMaxOi(seriesPda: PublicKey, maxOiCount: number): Promise<TxResult>;
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
    registerBuilder(label: string): Promise<TxResult & {
        builderCode: PublicKey;
    }>;
    /**
     * Withdraw accrued builder fees to the builder's USDC ATA. Anchor handler
     * caps at `builder_code.fees_accrued_micro`. Drains zero-balance fee
     * accumulator no-op.
     */
    withdrawBuilderFees(amountMicro: bigint): Promise<TxResult>;
    /**
     * Close the BuilderCode PDA — refunds the $1K deposit to the builder.
     * Anchor handler requires `builder_code.volume_30d_routed_micro <
     * BUILDER_REFUND_MIN_VOLUME` (no live channel) AND `fees_accrued_micro
     * == 0` (drained first via `withdrawBuilderFees`).
     */
    closeBuilderCode(): Promise<TxResult>;
    /** Decoded LstVault PDA — total + pledged + free LST collateral. */
    fetchLstVault(user: PublicKey, lstMint?: PublicKey): Promise<LstVaultSnapshot | null>;
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
    fetchNativeSolVault(user: PublicKey): Promise<NativeSolVaultSnapshot | null>;
    /** Decoded SeriesListingPda — σ·√T grid cell metadata. */
    fetchSeriesListing(series: PublicKey): Promise<SeriesListingSnapshot | null>;
    /** Decoded BuilderCodePda — registration + accrual state. */
    fetchBuilderCode(builder: PublicKey): Promise<BuilderCodeSnapshot | null>;
    /** Decoded ConditionalOrderPda — SL / TP / OCO state. */
    fetchConditionalOrder(authority: PublicKey, orderId: bigint): Promise<ConditionalOrderSnapshot | null>;
    /** Decoded RfqAuctionPda — open auction state + best quote. */
    fetchRfqAuction(auction: PublicKey): Promise<RfqAuctionSnapshot | null>;
    /** Decoded ComboIntentPdaV2 — only the first `legCount` legs are returned. */
    fetchComboIntentV2(buyer: PublicKey, comboId: bigint): Promise<ComboIntentV2Snapshot | null>;
    /** Deprecated compatibility shim; current IDL does not expose start_auction. */
    startAuction(args: {
        optionPda: PublicKey;
        startPriceMicro: bigint;
        floorPriceMicro: bigint;
        decayPerSlot: bigint;
        durationSlots: bigint;
    }): Promise<TxResult & {
        auction: PublicKey;
        auctionEscrow: PublicKey;
    }>;
    /** Deprecated compatibility shim; current IDL does not expose fill_auction. */
    fillAuction(optionPda: PublicKey): Promise<TxResult>;
    /** Deprecated compatibility shim; current IDL does not expose cancel_auction. */
    cancelAuction(optionPda: PublicKey): Promise<TxResult>;
}
//# sourceMappingURL=client.d.ts.map