# 06 - Auction RFQ to PM Fill

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

The maker needs devnet SOL for the RFQ maker deposit and devnet USDC for CM
collateral. The buyer needs enough USDC for `maxPremiumUsd`.
