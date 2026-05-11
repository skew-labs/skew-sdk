# @skew-labs/sdk

TypeScript SDK for Skew — the venue-only Solana on-chain OTC options
protocol. Devnet launch-ready, audit-gated.

Current package version: **0.7.5** (top-level snapshot under
[`/README.md`](../../README.md)). Generated from the Anchor 0.31.1 IDL of
`skew-master` (123 ix · `skew_master.so` 2,398,832 B · devnet program
`3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK`).

The package exposes typed clients for the Anchor program, RFQ lanes,
portfolio-margin operations, collateral vaults, settlement, fee routing, and
read snapshots. It is the integration surface for desks, bots, dApps, and
keeper services that need direct protocol access without the web terminal.

[![npm](https://img.shields.io/badge/npm-%40skew--labs%2Fsdk-3178c6?style=flat-square&logo=npm)](https://www.npmjs.com/package/@skew-labs/sdk)
[![version](https://img.shields.io/npm/v/@skew-labs/sdk?style=flat-square)](https://www.npmjs.com/package/@skew-labs/sdk)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)

---

## Package Surface

- 90+ typed methods across clearing members, option lifecycle, Instant RFQ,
  Auction RFQ, collateral vaults, liquidation, insurance fund, builder codes,
  series listings, and settlement.
- 36 PDA helpers for bots and indexers that need deterministic account
  discovery.
- Byte-level account fetchers for compact accounts not exposed through normal
  IDL clients.
- Compute-budgeted margin calls for `calculateMargin` and variation-margin
  workflows.
- Off-chain pricer clients: `getMarginBreakdown()` and `estimateFee()`, using
  the same payload shape as the terminal.
- IV oracle access: `findPovsStatePda()` + `fetchPovs()` expose the PoVS state vector (`sigma_t`, `sigma_inf`, `theta_d`, `vrp_rel`, ATM IV, regime, tail fields). `POST /surface` turns that into the public Heston × SSVI strike/tenor grid.
- Capability map: `getSkewCapabilities()` exposes 5 underlyings, 11 payoff names, collateral rails, tenor policy, and every public trade lane for dApps, bots, and MCP agents.
- Runtime collateral policy reader: `fetchCollateralPolicy()` reads the live mint allowlist for the current deployment. Use it before routing wSOL/jitoSOL or custom devnet mints; capabilities describe protocol support, while the policy PDA describes what this deployment actually accepts.
- Simulation-first writes: `create({ dryRun: true })`, `create({ simulate: true })`, or `create({ simulateOnly: true })` runs create+deposit preflight and returns logs/CU without sending or consuming fees.
- Sanitized IDL bundled at `@skew-labs/sdk/idl/skew_master.json`.
- Naming map SDK ↔ REST so MM bots reading the OpenAPI spec use the same verbs
  as the SDK.

---

## Install

```bash
pnpm add @skew-labs/sdk @solana/web3.js @coral-xyz/anchor @solana/spl-token
```

Peers: `@coral-xyz/anchor ^0.31`, `@solana/web3.js ^1.95`, `@solana/spl-token ^0.4`.

---

## Setup

```typescript
import { Connection, Keypair } from "@solana/web3.js";
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import { SkewClient } from "@skew-labs/sdk";
import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };

const conn     = new Connection(process.env.HELIUS_RPC!, "confirmed");
const kp       = Keypair.fromSecretKey(/* ... */);
const wallet   = new Wallet(kp);
const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
const program  = new Program(idl as any, provider);
const skew     = SkewClient.fromProgram(conn, wallet, program);
```

> **Footgun.** Bare `new SkewClient(conn, wallet)` constructs but throws on every method call. Always `SkewClient.fromProgram(...)`.

For scripts and bots, prefer an explicit devnet keypair path:

```bash
export KEYPAIR_PATH=~/.config/solana/devnet.json
# or in MCP/agent processes:
export SKEW_KEYPAIR_PATH=~/.config/solana/devnet.json
```

## Public margin labels

Public docs and UIs should display margin-mode ranks as `M0`, `M1`, `M2`, and
`M3`.

| Public label | Rank | Launch posture |
|---|---:|---|
| `M0` | 0 | Default devnet clearing profile |
| `M1` | 1 | Audit-gated higher-collateral profile |
| `M2` | 2 | Audit-gated institutional profile |
| `M3` | 3 | Audit-gated highest-rank profile |

Some SDK response fields still use prelaunch field names such as `tier` or
`verified_tier`. Treat those as compatibility names around the same four ranks;
new public-facing copy should render the ranks as `M0` through `M3`.

## Capability map

```typescript
import { getSkewCapabilities } from "@skew-labs/sdk";

const caps = getSkewCapabilities();
// caps.underlyings   -> BTC, ETH, SOL, XRP, HYPE
// caps.payoffTypes   -> 11 user-facing payoff names
// caps.assetPayoffs  -> per-asset on-chain allowlist
// caps.tradeLanes    -> Instant RFQ, Auction RFQ, pre-funded listing, combos, conditionals, builder routing
```

Use this map when building dApps or bots so route selection is explicit:
Instant RFQ is the 1-click HIT lane; Auction RFQ is price discovery/finalization;
pre-funded listings are the simple writer-first primitive.

Capabilities are static. Before sending custody instructions, read runtime
deployment state:

```typescript
const policy = await skew.fetchCollateralPolicy();
if (!policy.entries.some((e) => e.mint.equals(mySettlementMint))) {
  throw new Error("settlement mint is not allowlisted on this deployment");
}
```

---

## Official RFQ API

The high-level RFQ surface is the recommended integration path for desks,
judges, bots, and dApps. It wraps the lower-level relay primitives without
changing them:

```typescript
const rfq = await skew.rfq.request({
  asset: "BTC",
  payoff: "vanilla_call",
  strike: 60_000,
  notional: 10_000,
  expiry: "7d",
  maxPremiumUsd: 300,
});

for await (const quote of rfq.quotes()) {
  console.log("quote", quote.makerBase58, quote.premiumUsd);
}

const best = await rfq.waitForBestQuote({ timeoutMs: 60_000 });
const fill = await rfq.accept(best, { maxPremiumUsd: 300 });

console.log(fill.optionPda);
console.log(fill.margin.pmLockedDeltaUsd);
console.log(fill.margin.pmLockedDeltaPctOfNotional);
console.log(fill.portfolio.buyerHasLong, fill.portfolio.makerHasShort);
```

`rfq.accept(...)` always uses the Instant RFQ PM-backed lane:

```txt
quote_request -> quote_ack -> buyer_accept_tx_signed -> cm_sign
-> buyer_tx_signed -> atomic_fill_from_relay
```

The older `create() -> deposit_collateral -> buy()` path remains available as
the fully-collateralized primitive, but it is not the official RFQ clearing
path.

Maker bots can serve one RFQ with the same facade while keeping their own
pricing and signing policy:

```typescript
import nacl from "tweetnacl";

await skew.rfq.maker.serve({
  autoPrepare: true,
  initialCollateralUsdc: 50_000,
  refreshPmCacheBeforeQuote: true,
  filters: { assets: ["BTC", "SOL"] },
  quote: async (request) => ({
    premiumUsd: myModel.price(request),
    ttlSeconds: 60,
  }),
  signDigest: (digest) => nacl.sign.detached(digest, makerKeypair.secretKey),
});
```

`autoPrepare` registers the maker as a CM/RFQ maker when needed, initializes
the volume tracker, and refreshes the PM cache. `refreshPmCacheBeforeQuote`
keeps long-running maker processes from quoting against a stale cache.

The facade performs SDK-side tenor, payoff, settlement, and devnet oracle
moneyness preflight before it opens the relay request. For example, a BTC
strike that is valid against live Hermes may still be rejected on devnet if it
is outside the currently deployed frozen-Pyth strike band; the SDK returns a
clear error before asking the wallet to sign.

Low-level functions remain exported for advanced integrations:
`collectInstantRfqQuotes`, `buildRelayPayload`, and
`hitInstantRfqQuoteTxSigned`.

Canonical API contract: [`docs/api/official-rfq.md`](../../docs/api/official-rfq.md).

---

## End-to-end in five lines

```typescript
import { expiryFromTenorDays } from "@skew-labs/sdk";

const cm  = await skew.registerClearingMember({ initialCollateralUsdc: 50_000 });
const opt = await skew.create({ underlying: "BTC", payoff: "vanilla_call",
                                strike: 80_000, expiry: expiryFromTenorDays(7),
                                notional: 1_000 });
const buyerSkew = SkewClient.fromProgram(conn, buyerWallet, program);
await buyerSkew.buy(opt.address, 50); // separate buyer; creator == buyer is blocked
await skew.settle(opt.address);    // anyone can call after expiry
```

For non-USDC settlement, `notional` is **base token units**, not USD:

```typescript
// 0.5 means 0.5 wSOL/jitoSOL payoff cap, not $0.50.
const preview = await skew.create({
  underlying: "SOL",
  payoff: "vanilla_inverse_call",
  strike: 180,
  expiry: expiryFromTenorDays(1),
  notional: 0.5,
  settlementMint: NATIVE_SOL_MINT,
  dryRun: true,
});
console.log(preview.simulation);
```

Live create/fill paths require expiry to land on a standard asset tenor bucket:
`1d`, `7d`, `14d`, `28d`, or `90d` from the transaction clock, with ±1h
tolerance. Shorter binaries are not enabled in the current deployment. Bots
should use `expiryFromTenorDays(1 | 7 | 14 | 28 | 90)` for ISO fields,
`expiryTsFromTenorDays(...)` for raw Anchor `expiryTs: bigint` structs, or call
`assertExpiryTenor(asset, expiryTs)` before sending. The SDK runs the same
preflight in `create()` and `registerRfqAuction()`, so invalid tenors and
millisecond-vs-second mistakes fail with a local error instead of an Anchor
simulation label such as `6001`.

That's the happy path. The other ~86 methods exist because real trading needs collateral top-ups, transfers, cancellations, multi-leg combos, isolated margin, liquidations, conditional orders (SL / TP / OCO), escrow-aware RFQ auctions with ed25519-verified MM quotes, 32-leg combo intents, secondary-market Dutch auctions, builder-code revenue share, series-listing keepers, M-mode collateral lockup, and the long tail of bookkeeping the on-chain program enforces.

Methods are grouped below. **Devnet launch additions** (conditional orders, RFQ auctions, combo intent v2 - 22 methods total) are available on devnet as of 2026-05-01 and have their own dedicated sections. Mainnet remains audit-gated.

---

## Methods (91)

### Clearing Member lifecycle (4)

| Method | Anchor ix | Notes |
|---|---|---|
| `registerClearingMember({ initialCollateralUsdc })` | `register_clearing_member` + `init_position_registry` | Permissionless. The SDK submits both ix in one tx so CM onboarding is atomic. |
| `cmAddCollateral(amountUsdc)` | `cm_deposit_collateral` | Top up before margin breaches `1.10`. |
| `cmWithdrawCollateral(amountUsdc)` | `cm_withdraw_collateral` | Anchor blocks the withdraw if it would drop you below the IM floor. |
| `calculateMargin(currentSpotUsd)` | `calculate_margin` (view) | Returns IM / variation / free. Re-runs the ConvexHullIM scan client-side. |

### Option lifecycle (8)

| Method | Anchor ix |
|---|---|
| `create(CreateParams)` | `create_option` + `deposit_collateral` |
| `buy(option, premiumUsdMax)` | `buy_option` |
| `settle(option)` | `settle` (Pyth EMA, permissionless) |
| `transferOption(option, recipient)` | `transfer_option` |
| `cancelOption(option)` | `cancel_option` (writer-only, pre-fill) |
| `closeExpired(option)` | `close_expired_option` |
| `expireAbandoned(option)` | `expire_abandoned` (no buyer ever, GC) |
| `rolloverOption(...)` | `rollover_option` (atomic close-old + create-new) |

### Bundles (2)

For settlement-day automation — close out a long position and forward proceeds in one atomic flow.

| Method | What it does |
|---|---|
| `bundleTransferAndSettle(...)` | Build, sign, send the bundle. |
| `buildBundleTransferAndSettleCoSigned(...)` | Build the unsigned tx for a co-signing relay. Returns `{ tx, signers }`. |

### Isolated margin (3)

A per-fill USDC sleeve that never commingles with the CM's cross-margin pool. Lets a CM offer "this exact fill is collateralized by exactly this much USDC, nothing else" — useful for buyer-funded RFQs and structured products.

| Method | Anchor ix |
|---|---|
| `initIsolatedVault(option)` | `init_isolated_vault` |
| `depositIsolated(option, amount)` | `deposit_isolated` |
| `withdrawIsolated(option, amount)` | `withdraw_isolated` (locked-funds-aware) |

### Multi-leg combo (3)

Buyer escrows max premium across N legs upfront. The relay fills each leg atomically, then `finalizeComboIntent` flips the intent to Active and refunds residual. Pricing the combo as one quote (not N quotes) is what makes Iron Condors work without adverse selection.

| Method | Anchor ix |
|---|---|
| `registerComboIntent(...)` | `register_combo_intent` |
| `cancelComboIntent(comboId)` | `cancel_combo_intent` |
| `finalizeComboIntent(comboId)` | `finalize_combo_intent` |

### DVOL keeper (1)

| Method | Anchor ix |
|---|---|
| `updateDvol(assetIdx, dvolBps)` | `update_dvol` (oracle-only ix; off-chain log-contract replicator posts hourly) |

### Conditional orders / SL+TP / OCO (8)

Triggered exits — perm-less Pyth EMA crank fires `executeConditionalOrder` when the trigger condition holds for the configured grace window, then anyone calls one of the four `apply_*` ix to actually execute the action. Buyer escrows collateral at register time when the action requires it.

| Method | Anchor ix | Notes |
|---|---|---|
| `registerConditionalOrder({ orderId, kind, triggerOracle, triggerPrice1e8, triggerDirection, triggerMode, triggerGraceSlots, action, actionTarget, actionMinPremiumMicro, actionMaxPremiumMicro, actionMaxSlippageBps, validUntilTs })` | `register_conditional_order` | `kind` 0=SL / 1=TP. `triggerMode` 0=Spot / 1=EMA. `triggerDirection` 0=Below / 1=Above. `action` 0=SellViaRfq / 1=EarlyExercise / 2=CloseIsolated / 3=BuybackViaRfq. Only CloseIsolated is live; the other apply paths fail-closed until direct CPI ships. |
| `cancelConditionalOrder(orderId)` | `cancel_conditional_order` | Buyer-initiated rollback. PDA closed → rent + keeper-reward refund. |
| `executeConditionalOrder(orderAuthority, orderId, pythOracle)` | `execute_conditional_order` | Perm-less keeper trigger. Flips Active → Triggered. |
| `registerOcoPair(stopLossArgs, takeProfitArgs)` | `register_oco_pair` | Atomic SL+TP — first to trigger cancels the other (sticky-terminal invariant). |
| `cleanupExpiredConditionalOrder(orderAuthority, orderId)` | `cleanup_expired_conditional_order` | Perm-less GC past `validUntilTs`. |
| `applyCloseIsolatedAction(orderId, actionTarget)` | `apply_close_isolated_action` | Real CPI — drains `IsolatedVault` → user. Single-tx single-click. |
| `applyEarlyExerciseAction(orderId)` | `apply_early_exercise_action` | Fail-closed until direct exercise CPI ships. |
| `applySellViaRfqAction(orderId)` / `applyBuybackViaRfqAction(orderId)` | `apply_sell_via_rfq_action` / `apply_buyback_via_rfq_action` | Fail-closed until direct RFQ CPI ships. |

### Instant RFQ HIT (relay atomic fill)

For immediate click-to-fill, use the relay lane:

`quote_request -> quote_ack -> buyer_accept_tx_signed -> fill_consent -> cm_sign -> buyer_tx_request -> buyer_tx_signed -> atomic_fill_from_relay`

The SDK exports `collectInstantRfqQuotes`, `buildRelayPayload`, `relayPayloadDigest`, and browser-safe `hitInstantRfqQuoteTxSigned` so clients do not need to emulate the removed `take_best_quote` instruction. `hitInstantRfqQuote` remains for bot/HSM clients that can produce detached message signatures.

Human-paced Instant RFQ demos are supported directly: quote collection defaults
to 60 seconds, hit/fill waiting defaults to 120 seconds, and unsigned relay
payloads default to a 10 minute quote expiry unless the caller supplies a
shorter `quoteExpiryTs`.

`hitInstantRfqQuote` returns `riskPreflight` after relay simulation. It includes
the maker's exact `preImMicro -> postImMicro`, `requiredDeltaMicro`,
`freeCollateralMicro -> afterFillFreeMicro`, health before/after, fee, premium,
MMP status, and position count. The same payload is pushed to CM bots over the
relay WebSocket as `maker_margin_preview` before the buyer signs the final tx.

CM bots must run one-time onboarding before quoting: `registerClearingMember(...)`
and `initVolumeTracker()`. The relay can auto-create buyer-side first-use
accounts in the buyer-signed transaction, but it cannot initialize a CM's
`seller_volume_tracker` without the CM transaction signature.

The PM desk loop is explicit:

| Method | Use |
|---|---|
| `calculateMargin(spot)` / `callVariationMargin(cm)` | refresh complete-book IM snapshots with ComputeBudget preattached |
| `trackHeldPosition(option)` | register a CM-held long option so it offsets writer risk in PM |
| `untrackHeldPosition(option)` | remove a held long before manual transfer or lifecycle cleanup |
| `rebalancePmLock(option, maxReleaseUsdc?)` | release excess marginal IM from an option escrow back into the writer CM escrow after a fresh PM recompute |

`transferOption()` automatically untracks the caller's held long first when it
is present in the registry, preventing stale hedge entries from freezing later
PM walks.

### Escrow-aware RFQ auctions (5)

Buyer escrows `max_premium_micro` USDC at `register`, browser MMs submit tx-signed quotes, bots/HSMs can submit Ed25519-signed quotes over the canonical 80-byte digest, and finalize is perm-less past `close_slot`. This is the auction/finalization lane, not 1-click HIT; immediate execution belongs to Instant RFQ above. The older single-MM `RfqAccount` path remains a full-collateral builder primitive for pre-funded listings.

| Method | Anchor ix |
|---|---|
| `registerRfqMaker()` | `register_rfq_maker` (per-MM anti-spam deposit) |
| `registerRfqAuction({ auctionId, optionSpec, maxPremiumUsdc, durationSlots })` | `register_rfq_auction` (buyer escrows USDC + opens N-MM window) |
| `submitRfqQuoteDirect({ auction, premiumMicro, validUntilSlot })` | `submit_rfq_quote_tx_signed` — browser wallet lane; normal tx signature only, no `signMessage` |
| `submitRfqQuoteSigned({ auction, premiumMicro, validUntilSlot, mmSignature })` | `submit_rfq_quote` — bot/HSM lane; builds 2-ix tx `[Ed25519Program.createInstructionWithPublicKey, submit_rfq_quote]` so the on-chain handler can verify the digest via the Instructions sysvar |
| `finalizeRfqAuction({ auction, winningMm? })` | `finalize_rfq_auction` (perm-less past `close_slot`; publishes winner/refund event state; click-to-fill uses Instant RFQ relay atomic fill) |
| `cancelRfqAuction(auction)` | `cancel_rfq_auction` (buyer-initiated; full escrow refund) |

The pure helpers `rfqQuoteDigestBytes` / `rfqQuoteDigestHex` mirror the on-chain construction byte-for-byte for the delegated bot/HSM lane. Browser UIs should prefer `submitRfqQuoteDirect`. (See [§ rfqQuoteDigest](#ed25519-rfq-quote-digest) below.)

### Combo intent v2 (4)

1..32 legs, total escrow + per-leg cap, perm-less leg finalization recorded against the escrow.

| Method | Anchor ix |
|---|---|
| `registerComboIntentV2({ comboId, legs, totalMaxPremiumMicro, expiresTs })` | `register_combo_intent_v2` — each leg `{ option, side, maxPremiumMicro }` |
| `finalizeComboLegV2(intent, legIndex, realisedPremiumMicro)` | `finalize_combo_leg_v2` (per-leg fill recorder; keeper-driven) |
| `cancelComboIntentV2(comboId)` | `cancel_combo_intent_v2` (buyer rollback; rent + unfilled escrow refund) |
| `cleanupExpiredComboV2(buyerAuthority, comboId)` | `cleanup_expired_combo_v2` (perm-less GC past `expiresTs`) |

### Liquidation + waterfall (3)

Defensive-side methods. Public so anyone can crank the protocol when a CM goes underwater.

| Method | Anchor ix |
|---|---|
| `liquidate(...)` | `liquidate_cm` (Dutch auction) |
| `adlStep(...)` | `adl_step` (auto-deleverage during waterfall) |
| `clawbackStep(...)` | `clawback_step` (out-of-cascade: socialize across profitable shorts) |

### Fee Accumulators + Insurance Fund (3)

| Method | Anchor ix |
|---|---|
| `initFeeAccumulator(settlementMint?)` | `init_fee_accumulator` (permissionless per-mint bootstrap for USDC / wSOL / jitoSOL fee accounts) |
| `replenishIfFromFees()` | `replenish_if_from_fees` (SKEW_AUTHORITY keeper skims USDC platform fees → IF when reserve < target) |
| `withdrawFees(amount, recipient?, settlementMint?)` | `withdraw_fees` (SKEW_AUTHORITY withdraws protocol fees from the selected mint accumulator) |

Builder-code economics are mint-aware on the Instant RFQ lane: USDC builder
shares accrue into the per-builder escrow and are withdrawn with
`withdrawBuilderFees`, while wSOL / jitoSOL physical shares pay directly to
the builder's settlement-mint token account inside `atomic_fill_from_relay`.

### Reads (2)

| Method | What it does |
|---|---|
| `listOptions(opts?)` | `getProgramAccounts` decoded into typed `OptionSummary[]` with filters (underlying / type / state / sortBy / limit). For high-frequency reads use the Neon-backed indexer at `/api/options`. |
| `fetchCollateralPolicy()` | Reads the live `CollateralPolicyPda` mint allowlist: registered mint, decimals, kind, oracle feed, and depeg fence. Use before routing non-USDC settlement/collateral. |

---

## Off-chain pricing helpers

```typescript
import { getMarginBreakdown, estimateFee } from "@skew-labs/sdk";

const breakdown = await getMarginBreakdown(legs);
// Public UIs should label the four returned margin ranks as M0/M1/M2/M3.

const fee = await estimateFee({
  notional: 1_000, side: "Buy", vipBucket: 2,
});
//   -> fee totals and discount components for the current launch config
```

Both call the same `skew-pricing` HTTP service the terminal calls. No wallet and no signing are needed. Public web API calls are rate-limited by Vercel middleware; direct pricing-service calls follow the pricing service deployment limits. Pricing responses may keep compatibility field names until the next versioned SDK cleanup; public docs should display margin ranks as `M0` through `M3`.

---

## Payoff names

Six on-chain `OptionType` variants: `Vanilla`, `Digital`, `CappedVanilla`, `RangeAccrual`, `VanillaInverse`, `DigitalInverse`. The SDK exposes 11 friendlier names that map onto `(option_type, direction, extra_param)`:

| SDK `payoff` | Anchor `optionType` | direction | `extra_param` | Set |
|---|---|---|---|---|
| `digital_call` | Digital | `+1` | `0` | `strike` |
| `digital_put`  | Digital | `−1` | `0` | `strike` |
| `vanilla_call` | Vanilla | `+1` | `0` | `strike` |
| `vanilla_put`  | Vanilla | `−1` | `0` | `strike` |
| `capped_call`  | CappedVanilla | `+1` | `K_cap` | `strike`, `extraParam` |
| `capped_put`   | CappedVanilla | `−1` | `K_cap` | `strike`, `extraParam` |
| `range_accrual` | RangeAccrual | `0` | `upper_bound` | `strike` (lower), `upperBound` |
| `vanilla_inverse_call` | VanillaInverse | `+1` | `0` | `strike` |
| `vanilla_inverse_put` | VanillaInverse | `−1` | `0` | `strike` |
| `digital_inverse_call` | DigitalInverse | `+1` | `0` | `strike` |
| `digital_inverse_put` | DigitalInverse | `−1` | `0` | `strike` |

```typescript
await skew.create({
  underlying: "ETH", payoff: "range_accrual",
  strike: 2_200, upperBound: 2_400,
  expiry: "2026-05-10T16:00:00Z", notional: 100,
});
```

---

## PDA helpers (36)

```typescript
import {
  // option-level (3)
  findOptionPda, findEscrowPda, findOptionTokenMintPda,
  // CM (2)
  findClearingMemberPda, findCmEscrowPda,
  // protocol-level (8)
  findFeeAccumulatorPda, findFeeAuthorityPda,
  findMicrostructurePda, findCrossAssetMatrixPda,
  findHamiltonPda, findPovsStatePda,
  findLiqStatePda, findInsuranceFundPda, findIfEscrowPda,
  // governance + IV oracle (2)
  findGovernancePda, findSigmaIvPda,
  // metaplex metadata (1)
  findMetadataPda,
  // isolated + combo (5)
  findIsolatedVaultPda, findIsolatedVaultEscrowPda,
  findDvolPda, findComboIntentPda, findComboEscrowPda,
  // conditional + RFQ + comboV2 (5)
  findConditionalOrderPda,
  findRfqAuctionPda, findRfqAuctionEscrowPda,
  findRfqMakerPda,
  findComboIntentV2Pda,
} from "@skew-labs/sdk";

const [cmPda] = findClearingMemberPda(wallet.publicKey);
if (!await connection.getAccountInfo(cmPda)) {
  // Not a CM — register first.
}
```

All PDAs derive deterministically from the published seeds in `pda.ts`. Never re-derive seeds in your bot — import the helper.

### Ed25519 RFQ quote digest

`submit_rfq_quote` requires the MM to ed25519-sign the canonical 80-byte digest:

```
SHA256( auction_pubkey ‖ premium_micro_LE ‖ valid_until_slot_LE ‖ mm_pubkey )
```

The SDK exposes a pure helper that mirrors the on-chain construction byte-for-byte:

```typescript
import { rfqQuoteDigestBytes } from "@skew-labs/sdk";
import { sign } from "@noble/ed25519";

const digest = rfqQuoteDigestBytes(auctionPda, premiumMicro, validUntilSlot, mmPubkey);
const sig: Uint8Array = await sign(digest, mmSecretKey);
await skew.submitRfqQuoteSigned({ auction: auctionPda, premiumMicro, validUntilSlot, mmSignature: sig });
```

`rfqQuoteDigest()` remains as a compatibility Buffer-returning alias; new browser-facing code should use the `Uint8Array` helper.

---

## V0 stamp (Boundary-Aware IM)

The on-chain margin engine floors initial margin at `max(IM_scenario, M − V_0)` where `V_0` is the option value at creation. That requires a stamp of `(spot_at_creation, sigma_at_creation)` at write time.

The SDK auto-fetches both from Pyth Hermes + per-asset default σ. Pass them explicitly only for HYPE (pre-Wormhole, no Hermes feed) or for deterministic test fixtures:

```typescript
await skew.create({
  underlying: "BTC", payoff: "vanilla_call",
  strike: 80_000, expiry: "2026-05-10T16:00:00Z", notional: 1_000,
  spotAtCreation:  77_645.20,
  sigmaAtCreation: 0.45,
});
```

---

## RFQ + WebSocket (MM bots)

Instant RFQ WebSocket:
- Endpoint: `wss://skew-relay-devnet.fly.dev/subscribe`
- `quote_request` collects CM quotes; `buyer_accept_tx_signed` + `cm_sign` prepares the fill tx; `buyer_tx_signed` lands `atomic_fill_from_relay`
- Fixed 132-byte `RelayPayload` + digest helpers ship from `@skew-labs/sdk`
- Catalog: [`docs/runbooks/relay-protocol.md`](../docs/runbooks/relay-protocol.md)

Self-onboarding MM bot template: [`docs/runbooks/sdk-developer-quickstart.md`](../../docs/runbooks/sdk-developer-quickstart.md).

---

## Naming map — SDK ↔ REST

The SDK uses `snake_case`. The REST API uses `PascalCase`. Same on-chain variants.

| SDK | REST API (`OptionTypeCode`) |
|---|---|
| `vanilla_call` | `VanillaCall` |
| `vanilla_put` | `VanillaPut` |
| `digital_call` | `DigitalCall` |
| `digital_put` | `DigitalPut` |
| `capped_call` | `CappedVanillaCall` |
| `capped_put` | `CappedVanillaPut` |
| `range_accrual` | `RangeAccrual` |
| `vanilla_inverse_call` | `VanillaInverseCall` |
| `vanilla_inverse_put` | `VanillaInversePut` |
| `digital_inverse_call` | `DigitalInverseCall` |
| `digital_inverse_put` | `DigitalInversePut` |

Direction: SDK `direction: "buy" | "sell"`, REST `Side: "Buy" | "Sell"`.

---

## Live infrastructure (devnet)

| Resource | URL |
|---|---|
| Program ID | `3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK` |
| Relay (WSS) | `wss://skew-relay-devnet.fly.dev/subscribe` |
| Relay health | `https://skew-relay-devnet.fly.dev/health` |
| Pricing | `https://skew-pricing.fly.dev` |
| Pyth Hermes | `https://hermes.pyth.network/v2/updates/price/latest` |
| Devnet USDC mint | `4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8` |

Devnet SOL: <https://faucet.solana.com>. Devnet USDC: the terminal's wallet bootstrap mints $1K on first connect.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `SkewClient: Program is not loaded` | bare `new SkewClient(...)` | use `SkewClient.fromProgram(...)` |
| `Cannot find module '@skew-labs/sdk/idl/skew_master.json'` | bad install | `pnpm install` at workspace root |
| `Account does not exist` for ATA | USDC ATA never initialised | send any non-zero USDC to the wallet first |
| `Pyth Hermes feed not yet available for <asset>` | Hermes unavailable or RPC degraded | retry, or pass `spotAtCreation` explicitly |
| Tx reverts `0x1791` (`Unauthorized`) | caller ≠ ix authority | use the right keypair |
| Tx reverts `0x1790` (`InsufficientMargin`) | `margin_ratio < 1.10` | `cmAddCollateral(...)` to top up |
| `BlockhashNotFound` mid-submit | tx aged out before broadcast | retry — relay handles this |

Full error catalog: [`docs/runbooks/error-catalog.md`](../../docs/runbooks/error-catalog.md).

---

## License

MIT. © Skew Labs.
