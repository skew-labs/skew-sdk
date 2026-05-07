# 01 — Buy a Vanilla Call

> ✅ **SDK LIVE-VERIFIED — Round 19 (2026-04-26)**
>
> `SkewClient.create({...})` reaches Solana RPC simulation with valid 12-arg
> instruction body (verified against live Anchor program at
> `3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK`).
> Same for `.buy()` from a separate buyer wallet, `.cmAddCollateral()`, `.cmWithdrawCollateral()`,
> `.calculateMargin()`.
>
> **Prerequisites for actually executing (not just simulating):**
> - Devnet SOL ≥ 0.05 (rent + fees) in `KEYPAIR`
> - Devnet USDC ≥ $1,000 in the writer wallet
> - Without funding, you'll see `Attempt to debit an account but found no
>   record of a prior credit` — proof the RPC + program are reachable;
>   only the wallet balance is missing.


The simplest writer-side SDK demo. Creates an option and deposits collateral.
W4 hardening blocks same-wallet buyback (`creator == buyer`) to prevent wash
volume, so activation should be done by a separate buyer wallet or RFQ/relay.

## What it shows

- `SkewClient.create({...})` — create an option (12 anchor args derived from 5 fields)
- `SkewClient.buy(option, premiumUsd)` — pay premium from a separate buyer wallet
- `payoff: "vanilla_call"` — the SDK's first-class vanilla type (no extra params)
- Auto Pyth Hermes spot fetch for V0 stamp

## Run

```bash
export HELIUS_RPC=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
export KEYPAIR=~/skew-bot.json
pnpm tsx index.ts
```

## Expected output

```
wallet:  H8jzj…
creating BTC vanilla_call $80k expiry 2026-05-10T16:00:00Z
  option PDA: 7K…
  create tx:  3Z…
  deposit tx: 4M…
W4 note: same-wallet buy is blocked on-chain (creator == buyer).
Use a separate buyer wallet or the RFQ/relay path to activate this option.

✓ done. View on Solana Explorer:
  https://explorer.solana.com/address/7K…?cluster=devnet
```

## Prerequisites

- Devnet SOL ≥ 0.1 (rent + fees)
- Devnet USDC ≥ $1,000 in the writer wallet
- HELIUS_RPC + KEYPAIR env

## Adapt to other payoffs

Swap `payoff: "vanilla_call"` for any of the 11 SDK payoffs:

```ts
// Vanilla put — short-side default direction
payoff: "vanilla_put"

// Capped call — needs extraParam (cap strike)
payoff: "capped_call", extraParam: 90_000

// Range accrual — needs upperBound
payoff: "range_accrual", upperBound: 90_000

// Inverse SOL-style payoff family
payoff: "vanilla_inverse_call"
```

See [`../README.md`](../README.md) for the full mapping table.
