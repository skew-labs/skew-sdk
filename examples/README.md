# @skew/sdk — examples

Five end-to-end bot examples that run against devnet using nothing but the
SDK + a funded keypair. Each is < 100 lines and demonstrates one capability.

| # | Example | Live status (Round 23 verified 2026-04-26) | What it does |
|---|---|---|---|
| 01 | [`buy-vanilla-call`](./01-buy-vanilla-call) | ✅ **SDK live** (needs ≥0.1 SOL + ≥$1k USDC in wallet) | Create + buy a BTC vanilla call in 4 SDK calls |
| 02 | [`mm-bot`](./02-mm-bot) | ✅ **Live e2e verified Round 22** | Self-onboarding MM bot — BSM + 1.5× spread, WebSocket RFQ |
| 03 | [`arb-bot`](./03-arb-bot) | ✅ **Round 25 — runs end-to-end** (Pyth + Deribit live; Skew `/price` in fallback mode) | Skew vs Deribit ATM premium scanner |
| 04 | [`settler-bot`](./04-settler-bot) | ✅ **Round 28** — direct anchor scan, layout-resilient, 170 OptionAccount discovered live | Auto-settle expired options |
| 05 | [`delta-hedge-bot`](./05-delta-hedge-bot) | ❌ **REST `/v1/options/greeks` not deployed** + Jupiter integration stubbed | Portfolio delta-neutral maintenance |

**Round 23 finding:** REST API endpoints under `/v1/*` are largely **not deployed
yet** to the live `skew-pricing.fly.dev` server (returns 404 / empty). Only
`/portfolio_im` / `/portfolio_vm` / `/settlement_payoff` (no prefix) and the
WebSocket relay (`wss://skew-relay-devnet.fly.dev/subscribe`) are live.
Examples that depend on undeployed REST endpoints are tagged ⚠️ / ❌ above —
they typecheck and would work if the endpoints existed, but require either:
1. Direct anchor account scan via `@coral-xyz/anchor` (Bot 4)
2. Pricing endpoint deploy of `/iv` / `/greeks` (Bot 3 / Bot 5)
3. Different data source (Pyth Hermes for spot, Bot 5 hedge gap)

Bot 1 + 02-mm-bot are the **demo-ready** examples — they exercise the SDK
directly + the LIVE WebSocket relay, no phantom REST dependency.

## Prerequisites

```bash
# 1. Install — runs once
pnpm install

# 2. Generate or import a devnet keypair
solana-keygen new -o ~/skew-bot.json

# 3. Fund — devnet SOL + USDC
#    SOL:  https://faucet.solana.com (Devnet mode)
#    USDC: https://spl-token-faucet.com/?token-name=USDC-Dev

# 4. Get a Helius devnet RPC key (free): https://dashboard.helius.dev/

# 5. Set env (every example reads these)
export HELIUS_RPC=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
export KEYPAIR=~/skew-bot.json
export SKEW_API=https://api-devnet.skew.fi/v1
export RELAY_URL=wss://skew-relay-devnet.fly.dev/subscribe
```

## Run any example

```bash
cd skew/skew-sdk/examples/01-buy-vanilla-call
pnpm install
pnpm tsx index.ts
```

## Live infrastructure (devnet)

| Resource | URL |
|---|---|
| Relay | `wss://skew-relay-devnet.fly.dev/subscribe` |
| Relay /health | `https://skew-relay-devnet.fly.dev/health` |
| Devnet RPC | `https://devnet.helius-rpc.com/?api-key=<key>` |
| Pyth Hermes | `https://hermes.pyth.network/v2/updates/price/latest` |
| Devnet USDC | `4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8` |

## Cross-references

- `../README.md` — SDK package overview
- `../../docs/runbooks/sdk-developer-quickstart.md` — extended quickstart with prose
- `../../docs/runbooks/relay-protocol.md` — WebSocket message catalog (used by 02-mm-bot)
- `../../docs/api/openapi.yaml` — REST API (used by 01/03/04)
