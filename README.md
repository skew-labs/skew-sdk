# @skew/sdk

> **TypeScript SDK for Skew — Solana options infrastructure.**
> Become a Clearing Member, create, buy, and settle options in five lines.

[![npm](https://img.shields.io/badge/npm-%40skew%2Fsdk-3178c6?style=flat-square&logo=npm)](https://www.npmjs.com/package/@skew/sdk)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](../../LICENSE)

---

## What you get

- **5 high-level methods** wrapping every anchor instruction needed for options trading
- **7 payoff names** mapping cleanly onto 3 anchor variants (vanilla as a first-class type)
- **PDA helpers** for every account a bot might inspect off-chain
- **Pyth Hermes auto-fetch** for `spot_at_creation` (V0 stamp for Boundary-Aware IM)
- **IDL re-export** at `@skew/sdk/idl/skew_master.json` — no `target/idl/` walk needed

---

## Install

```bash
pnpm add @skew/sdk @solana/web3.js @coral-xyz/anchor @solana/spl-token
# or: npm install @skew/sdk @solana/web3.js @coral-xyz/anchor @solana/spl-token
```

Peer dependencies: `@coral-xyz/anchor ^0.31`, `@solana/web3.js ^1.95`, `@solana/spl-token ^0.4`.

---

## Setup

```typescript
import { Connection, Keypair } from "@solana/web3.js";
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import { SkewClient } from "@skew/sdk";
import idl from "@skew/sdk/idl/skew_master.json" assert { type: "json" };

const conn     = new Connection(process.env.HELIUS_RPC!, "confirmed");
const kp       = Keypair.fromSecretKey(/* ... */);
const wallet   = new Wallet(kp);
const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
const program  = new Program(idl as any, provider);
const skew     = SkewClient.fromProgram(conn, wallet, program);
```

> **Footgun.** `new SkewClient(conn, wallet)` (without `.fromProgram(...)`) throws on every method call. Always use `SkewClient.fromProgram(...)`.

---

## The five methods

```typescript
// 1. Register as a CM with $50K USDC collateral
const cm = await skew.registerClearingMember({ initialCollateralUsdc: 50_000 });

// 2. Mint a BTC vanilla call: $80K strike, 14d expiry
const opt = await skew.create({
  underlying: "BTC",
  payoff:     "vanilla_call",
  strike:     80_000,
  expiry:     "2026-05-10T16:00:00Z",
  notional:   1_000,
});

// 3. Buy that option for up to $50 premium
await skew.buy(opt.address, 50);

// 4. Settle at expiry — anyone can call (permissionless)
await skew.settle(opt.address);
```

| Method | Returns | Anchor instruction |
|---|---|---|
| `registerClearingMember({ initialCollateralUsdc })` | `{ cmPda, cmEscrow, txSignature }` | `register_clearing_member` |
| `create(CreateParams)` | `{ address, nonce, createTx, depositTx }` | `create_option` + `deposit_collateral` |
| `buy(option, premiumUsd)` | `{ txSignature }` | `buy_option` |
| `settle(option)` | `{ txSignature, payoffUsd }` | `settle` |

---

## Payoff names

The on-chain program has three option types — `Digital`, `CappedVanilla`, `RangeAccrual`. The SDK exposes seven friendlier names that map onto `(option_type, direction, extra_param)` triples:

| SDK `payoff` | Anchor `optionType` | direction | `extra_param` | What you set |
|---|---|---|---|---|
| `digital_call` | Digital | `+1` | `0` | `strike` |
| `digital_put`  | Digital | `−1` | `0` | `strike` |
| `vanilla_call` | CappedVanilla | `+1` | `0` (no cap) | `strike` |
| `vanilla_put`  | CappedVanilla | `−1` | `0` (no floor) | `strike` |
| `capped_call`  | CappedVanilla | `+1` | `K_cap` | `strike`, `extraParam` |
| `capped_put`   | CappedVanilla | `−1` | `K_cap` | `strike`, `extraParam` |
| `range_accrual` | RangeAccrual | `+1` | `upper_bound` | `strike` (lower), `upperBound` |

```typescript
// Vanilla put (no extra fields)
await skew.create({
  underlying: "ETH", payoff: "vanilla_put", strike: 2_400,
  expiry: "2026-05-10T16:00:00Z", notional: 500,
});

// Range accrual
await skew.create({
  underlying: "ETH", payoff: "range_accrual",
  strike: 2_200, upperBound: 2_400,
  expiry: "2026-05-10T16:00:00Z", notional: 100,
});
```

---

## PDA helpers

```typescript
import {
  findOptionPda,
  findEscrowPda,
  findOptionTokenMintPda,
  findClearingMemberPda,
  findCmEscrowPda,
  findFeeAccumulatorPda,
} from "@skew/sdk";

const [cmPda] = findClearingMemberPda(wallet.publicKey);
const account = await connection.getAccountInfo(cmPda);
if (!account) {
  // Not a CM yet — call registerClearingMember()
}
```

---

## RFQ + WebSocket (MM bots)

REST RFQ:
- `POST /v1/rfq/request` — broadcast a quote request
- `GET /v1/rfq/{id}/responses` — collect CM responses
- `POST /v1/rfq/{id}/accept` — accept best, submit atomic fill

See [`docs/api/openapi.yaml`](../../docs/api/openapi.yaml) for the full REST spec.

WebSocket (relay) — for MM bots that want live subscriptions:
- Endpoint: `wss://skew-relay-devnet.fly.dev/subscribe`
- Message catalog: [`docs/runbooks/relay-protocol.md`](../../docs/runbooks/relay-protocol.md)
- Borsh `RelayPayload` + ed25519 signing helpers exported from `@skew/relay`

A minimum self-onboarding MM bot is in [`docs/runbooks/sdk-developer-quickstart.md`](../../docs/runbooks/sdk-developer-quickstart.md).

---

## Naming map — SDK ↔ REST

The SDK uses `snake_case`. The REST API uses `PascalCase`. Both refer to identical on-chain variants.

| SDK | REST API (`OptionTypeCode`) |
|---|---|
| `vanilla_call` | `VanillaCall` |
| `vanilla_put` | `VanillaPut` |
| `digital_call` | `DigitalCall` |
| `digital_put` | `DigitalPut` |
| `capped_call` | `CappedVanillaCall` |
| `capped_put` | `CappedVanillaPut` |
| `range_accrual` | `RangeAccrual` |

Direction:
- SDK: `direction: "buy" | "sell"`
- REST: `Side: "Buy" | "Sell"`

---

## V0 stamp (Boundary-Aware IM)

`spotAtCreation` and `sigmaAtCreation` are V0 stamps the on-chain margin engine uses for the Boundary-Aware initial-margin floor.

The SDK auto-fetches them from Pyth Hermes + per-asset default σ if omitted. You only need to pass them explicitly for HYPE (pre-Wormhole — no Hermes feed) or for deterministic test fixtures:

```typescript
await skew.create({
  underlying:        "BTC",
  payoff:            "vanilla_call",
  strike:            80_000,
  expiry:            "2026-05-10T16:00:00Z",
  notional:          1_000,
  spotAtCreation:    77_645.20,
  sigmaAtCreation:   0.45,
});
```

---

## Live infrastructure (devnet)

| Resource | URL |
|---|---|
| Relay (WSS) | `wss://skew-relay-devnet.fly.dev/subscribe` |
| Relay health | `https://skew-relay-devnet.fly.dev/health` |
| Devnet RPC | `https://devnet.helius-rpc.com/?api-key=<your-key>` |
| Pyth Hermes | `https://hermes.pyth.network/v2/updates/price/latest` |
| Devnet USDC mint | `4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8` |

Get devnet SOL: <https://faucet.solana.com>
Get devnet USDC: <https://spl-token-faucet.com/?token-name=USDC-Dev>

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `SkewClient: Program is not loaded` | bare `new SkewClient(...)` | use `SkewClient.fromProgram(...)` |
| `Cannot find module '@skew/sdk/idl/skew_master.json'` | bad install | `pnpm install` in workspace root |
| `Account does not exist` for ATA | USDC ATA never initialized | send any non-zero USDC to the wallet first |
| `Pyth Hermes feed not yet available for HYPE` | HYPE pre-Wormhole | pass `spotAtCreation` explicitly |
| Tx reverts with `0x1791` (`Unauthorized`) | caller != authority for an admin op | use the right keypair |
| Tx reverts with `0x1790` (`InsufficientMargin`) | `margin_ratio < 1.10` | `cmAddCollateral(...)` to top up |
| `BlockhashNotFound` mid-submit | tx took > 150 slots to broadcast | retry — relay handles this automatically |

Full error catalog: [`docs/runbooks/error-catalog.md`](../../docs/runbooks/error-catalog.md).

---

## License

MIT. © Skew Labs.
