# 02 — MM Bot (Day 22 demo centerpiece)

> ✅ **LIVE END-TO-END VERIFIED — Round 22 (2026-04-26)**
>
> Two-WebSocket roundtrip test (buyer + CM) confirmed:
> 1. `buyer.send(quote_request)` → relay assigns `relay_nonce` + `quote_request_ack`
> 2. CM (Bot 2) receives broadcast → BSM fair value via Round 16 Hermes spot ($77882) + 1.015× spread → `quote_ack premium=$1870.77`
> 3. Buyer receives the quote, can accept
>
> **Caveat:** relay must run with `max_machines_running = 1` until Phase 2
> Redis pub/sub ships (Round 22 finding — see `mainnet-promotion-checklist.md` §7b).
> Otherwise buyer + CM may land on different machines and broadcast silently drops.
> Currently pinned at single machine.


A persistent Market Maker bot that:

1. Self-onboards as a Clearing Member on first run (`registerClearingMember`)
2. Subscribes to skew-relay WebSocket
3. On every `quote_request`: fetches Pyth spot + computes Black-Scholes fair value + adds 1.5% spread + sends `quote_ack`

**Total code: ~110 lines, no MM-specific deps** (Black-Scholes inline ~20 lines).

## What it shows

- `SkewClient.registerClearingMember(...)` — idempotent CM onboarding
- `findClearingMemberPda(...)` — pre-flight `getAccountInfo` to skip duplicate register
- WebSocket protocol — `hello → identify → quote_request → quote_ack` cycle
- Master paper §30.2 OPT 1 — 1.5× spread floor (customer-retention bound)
- Pyth Hermes REST for live spot

## Run

```bash
export HELIUS_RPC=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
export KEYPAIR=~/cm.json
export RELAY_URL=wss://skew-relay-devnet.fly.dev/subscribe
pnpm tsx index.ts
```

## Expected output

First run:
```
MM wallet: H2vDJ1V…
registering as CM with $50K collateral...
  CM PDA: 8KqZ…
MM bot online — awaiting RFQs
```

When a buyer broadcasts an RFQ:
```
quoted BTC VanillaCall K=80000 for $1247.50 (fair $1229.06)
```

## Prerequisites

- Devnet SOL ≥ 0.05 (rent + fees)
- Devnet USDC ≥ $50,000 (CM collateral)
- HELIUS_RPC + KEYPAIR + RELAY_URL env

## Customization

| Tunable | Where | Default |
|---|---|---|
| Spread multiplier | `SPREAD_MULT` | `0.015` (1.5% — paper §30.2 floor) |
| σ per asset | `ASSET_DEFAULT_SIGMA` | BTC 0.45, ETH 0.65, SOL 0.80, … |
| Initial collateral | `initialCollateralUsdc` | `50_000` |

> Lowering spread below 1.5% increases fill rate but kills capital efficiency.
> Master paper §30.2 grid sweep settled on 1.5× as the customer-retention bound.

## Cross-references

- `../../docs/runbooks/relay-protocol.md` — full message catalog
- Paper §30.2 — spread sweep
- Paper §10 — PM v1.4 IM that decides when your collateral is sufficient
