# 05 — Delta Hedge Bot

> ❌ **TWO REST DEPENDENCIES NOT DEPLOYED + 1 STUB — Round 23 verified live (2026-04-26)**
>
> 1. `GET /v1/positions?authority=...&state=Active` — **404** on live server
> 2. `GET /v1/options/greeks?asset=...&K=...&T_days=...&cp=C` — **404** (real route is `POST /greeks` but it returns zeros — stub-only)
> 3. Jupiter swap CPI integration is intentionally stubbed in `index.ts`
>
> This example **will not produce useful output today.** Treat as a Phase 2
> roadmap reference. To make it work you'd need to:
> - Replace `/v1/positions` with direct Helius `getProgramAccounts` scan
> - Replace `/v1/options/greeks` with inline BSM (see `02-mm-bot/index.ts` for the 20-line BSM helper)
> - Wire `@jup-ag/api` for actual Jupiter swap RFQ + execute
>
> **02-mm-bot is the canonical "live e2e working" example** — start there.


Keep portfolio Δ-neutral via Jupiter spot rebalances. Every 30s:

1. Fetch active positions for your authority
2. Aggregate $Δ per asset (sign * Δ * notional)
3. Compare to current spot hedge; if drift > 5%, swap via Jupiter

## What it shows

- REST `GET /v1/positions?authority=...&state=Active`
- REST `GET /v1/options/greeks?asset=...&K=...&T_days=...&cp=...`
- Per-asset Δ aggregation across an option book
- Threshold-based rebalance (5% of portfolio Δ)

## Run

```bash
export HELIUS_RPC=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
export KEYPAIR=~/skew-bot.json
export SKEW_API=https://api-devnet.skew.fi/v1
pnpm tsx index.ts
```

## Expected output

```
hedge bot for H8jzj… — every 30s, threshold 5%
[2026-04-26T17:30:00.000Z] 4 active positions
  BTC: portfolio Δ=1247.32 hedge=-1180.45 net=66.87 rel=5.4%
  BTC: REBALANCE — swap -66.87 via Jupiter (TODO: wire @jup-ag/api)
  ETH: portfolio Δ=-540.12 hedge=540.00 net=-0.12 rel=0.0%
```

## Caveats

- Jupiter integration is **stubbed** — production version should wire `@jup-ag/api`. The bot logs the swap and updates a local hedge state.
- $5K position threshold recommended — Jupiter slippage 2–5% means hedging tiny positions costs more than the benefit.
- Greeks are at a single tenor; for multi-tenor portfolios, call `greeks` per (asset, K, T) tuple and weight by notional.

## Production checklist

- [ ] Wire `@jup-ag/api` for actual swaps
- [ ] Add Γ tracking — when |Γ * spot_move| > rehedge cost, advance the rebalance
- [ ] Multi-asset portfolio basis swap (BTC/ETH directional spreads)
- [ ] PnL tracking + DB
- [ ] Sentry alerts on slippage > 5%
