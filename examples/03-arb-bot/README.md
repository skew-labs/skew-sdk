# 03 — Arb Bot (Skew vs Deribit ATM premium)

> ✅ **LIVE-VERIFIED RUN — Round 25 (2026-04-26)**
>
> The bot now uses the **live `/price` endpoint** instead of the previously
> phantom `/iv`. One full tick completes successfully against live data:
>
> ```
> BTC: spot=$78068 (Pyth Hermes) skew=$47.49 deribit=$3444 (DVOL 40%) diff=9862bps
> ETH: spot=$2351  (Pyth Hermes) skew=$47.49 deribit=$160  (DVOL 61.7%) diff=7033bps
> ```
>
> **Caveat — Skew `/price` is currently in `method: "fallback"` mode** (returns
> a flat $47.49 constant for any ATM input). The signal `Skew cheap` is therefore
> NOT a real arb opportunity — it's an artifact of the fallback. Once the
> pricing engine's calibrator ships real BSM (sub-1762-followup pricing-side),
> the signal becomes meaningful.
>
> All three live data sources (Pyth Hermes / Deribit DVOL / Skew /price) work
> end-to-end. The bot is **structurally complete** — pricing engine is the
> upstream block.


Scans Skew vs Deribit ATM 28d IV every 60s. If divergence > 100bps, places an
RFQ on the cheaper venue. The actual cross-venue Deribit hedge is left as an
exercise (needs Deribit API auth — the public IV feed is enough for the scan).

## What it shows

- Skew REST `GET /v1/options/iv?asset=BTC&K=ATM&T_days=30`
- Deribit public `get_volatility_index_data` (no auth)
- Skew REST `POST /v1/rfq/request` (RFQ broadcast)
- Crypto.randomUUID for `request_id`

## Run

```bash
export SKEW_API=https://api-devnet.skew.fi/v1
export HELIUS_RPC=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
export KEYPAIR=~/skew-bot.json
pnpm tsx index.ts
```

## Expected output

```
arb scanner — every 60s, threshold 100bps
[2026-04-26T17:30:00.000Z] scanning...
  BTC: skew=0.4452 deribit=0.4198 diff=254bps (Skew rich)
  ARB BTC: Sell on Skew (cross-venue Deribit hedge: TODO)
  RFQ 7c4f2a18-… placed (BTC Sell)
  ETH: skew=0.6510 deribit=0.6612 diff=102bps (Skew cheap)
  ARB ETH: Buy on Skew (cross-venue Deribit hedge: TODO)
  RFQ b9d1e057-… placed (BTC Buy)
```

## Caveats

- BTC/ETH only (other assets don't have Deribit options listed)
- Term-structure mismatch: Skew uses 30d, Deribit DVOL is fixed at 30d → safe
- Cross-venue execution requires Deribit API key + USDC bridge — out of scope here
