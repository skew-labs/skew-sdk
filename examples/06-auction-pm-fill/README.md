# 06 - Auction RFQ to PM Fill

Run this first when evaluating Skew from a clean machine. It is the official
PM-backed RFQ demo path, not the legacy pre-funded bridge.

This is the judge-style end-to-end path:

1. Buyer opens an Auction RFQ.
2. Maker posts a firm on-chain auction quote.
3. Auction is finalized after `close_slot`.
4. Buyer replays the same terms into Instant RFQ.
5. The selected maker quote is filled through `atomic_fill_from_relay`.
6. The script prints the option PDA, portfolio readback, and PM lock delta.

No legacy pre-funded bridge is used.

## Run

```bash
export HELIUS_RPC=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
export BUYER_KEYPAIR=~/buyer.json
export MAKER_KEYPAIR=~/maker.json
export RELAY_URL=wss://skew-relay-devnet.fly.dev/subscribe

pnpm install
pnpm start
```

You can also copy `.env.example` to `.env`; the script loads it automatically.

The maker needs devnet SOL for the RFQ maker deposit and devnet USDC for CM
collateral. The buyer needs enough USDC for `maxPremiumUsd`.

## Expected output

The exact PDA and transaction values change on every run. The important fields
are the lifecycle and PM readback fields:

```txt
executionLane: instant_rfq_atomic_fill
tradeState: FILLED
clearingState: FILLED
pmBacked: true
pmGuarantee: guaranteed
optionPda: <option PDA>
pmLockedDeltaUsd: 28.58
pmLockedDeltaPctOfNotional: 2.86
buyerHasLong: true
makerHasShort: true
readbackOk: true
```

If no maker is running or a quote expires, the script fails closed. It does not
fall back to `create_option_from_rfq_quote -> buy_option_from_rfq_quote`.
