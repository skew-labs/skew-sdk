# 04 — Settler Bot (auto-settle expired)

> ✅ **Round 28 — direct Anchor account scan rewrite, live-verified (2026-04-26)**
>
> Bot 4 now uses **Helius `getProgramAccounts` directly** with the OptionAccount
> discriminator filter, eliminating the phantom `/v1/positions` REST dependency.
> Live verification result on 2026-04-26:
>
> ```
> Bot 4 settler — 170 OptionAccount(s) on devnet
>   expired: 170, active: 0
> Samples:
>   J7AigKv6SjD8Y3ku...  expiry=2026-04-22T07:20:58Z  EXPIRED
>   HZsx8RZvM8WLz3GJ...  expiry=2026-04-22T07:20:50Z  EXPIRED
>   ...
> ```
>
> **Resilient to IDL drift** — the bot only parses the **stable prefix bytes
> (offset 0-68)** of OptionAccount data, so it works against all 3 layouts
> currently on devnet (238B / 246B / 254B variants), unaffected by the
> Round 26 mainnet-promotion-checklist §7c finding.
>
> The actual `settle()` / `closeExpired()` calls inherit the same drift
> caveat as other SDK methods — they reach RPC simulation but handler-success
> requires anchor team's redeploy.


Permissionless settler — every 60s scans active positions, settles those
past expiry. Falls back to `closeExpired()` for unsold options.

## What it shows

- `SkewClient.settle(option)` — distribute payoff to holder
- `SkewClient.closeExpired(option)` — return escrow when no holder
- REST `GET /v1/positions?state=Active` — discovery
- Error-driven fallback (settle → closeExpired on `NoHolder`)
- Idempotency — `AlreadySettled` is a benign skip

## Run

```bash
export HELIUS_RPC=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
export KEYPAIR=~/skew-bot.json
export SKEW_API=https://api-devnet.skew.fi/v1
pnpm tsx index.ts
```

## Expected output

```
settler: H8jzj…
[2026-04-26T17:30:00.000Z] 3 expired — settling...
  settle 7K3z…: 5N7M…
  close_expired 9P2x…: 4M3J…
  H4qF… already settled
```

## Economics (Phase 1)

Settler bots earn **no fee** in Phase 1 — run as good-citizen
uptime contributor or for Phase 2 LP rebates. Tx fees are paid by the
settler (~0.000005 SOL per settle).

## Race conditions

When multiple settler bots target the same expired position, only the first
succeeds; others get `AlreadySettled`. The bot treats this as a benign skip.

## Cross-references

- `../../docs/api/openapi.yaml` `/v1/positions` schema
- Paper §J.6 — settler economics
