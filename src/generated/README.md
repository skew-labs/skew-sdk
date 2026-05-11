# `src/generated/` — anchor-client-gen output

**Do not edit files in this directory by hand.**

Every TypeScript file here is regenerated from
[`skew-master/idl/skew_master.json`](../../../skew-master/idl/skew_master.json)
by `bash scripts/codegen.sh` (npm script: `pnpm gen:sdk`).

The CI workflow `.github/workflows/sdk-codegen.yml` re-runs codegen on every
PR that touches the IDL or the SDK and fails the job if `git diff` reports
drift. That gate guarantees the SDK clients (instructions, accounts, types,
errors) cannot fall out of sync with the on-chain program.

## Why this exists (Wave 1 cascade-failure root-cause #2)

Before codegen, three files duplicated on-chain Borsh layouts by hand:

- `skew-relay/src/payload.ts` — `RelayPayload` byte-for-byte mirror
- `skew-relay/src/tx-builder.ts` — `ATOMIC_FILL_FROM_RELAY_ACCOUNT_ORDER`
  literal account list
- `skew-sdk/src/instant-rfq.ts` — duplicate `RelayPayload` interface

When `skew-master` evolved the on-chain struct (Phase 4 AF-3 2026-05-02,
Phase 2 Inverse 2026-05-04), the hand-mirrors had to be updated manually.
Any miss = silent serialization drift → tx fails after the buyer signs.
Codegen makes that class of bug uncompilable: `instant-rfq.ts` now contains
a compile-time parity check (`_relayPayloadKeyParityCheck`) that asserts
the public camelCase `RelayPayload` interface and the IDL-derived
`generated/types/RelayPayload::RelayPayloadFields` describe the same field
set.

## Regenerate

```sh
cd skew/skew-sdk
pnpm gen:sdk
```

## Anchor 0.31 ↔ anchor-client-gen 0.28 bridge (2026-05-08)

`anchor-client-gen@^1.0.0` is not yet published to npm. The latest npm
release is `0.28.1`; the GitHub master is `1.30.0`. Both still parse the
legacy Anchor 0.28 IDL format (`defined: "TypeName"` strings) and fail on
skew-master's Anchor 0.31 spec-0.1.0 IDL (`defined: { name: "TypeName" }`
objects, separate `accounts/types` sections, `discriminator` arrays,
snake_case fields, `pubkey` primitive, `type/alias` `IdlTypeDef` kinds).

We bridge the gap with a pure-JS shim, [`scripts/idl_downgrade.js`](../../scripts/idl_downgrade.js),
that reads the canonical IDL and emits a 0.28-compatible shape on stdout.
`scripts/codegen.sh` pipes it through `anchor-client-gen 0.28.1` and writes
the TS client into this directory. The shim covers:

- top-level metadata lift (`metadata.{name,version}` → top-level)
- `defined: { name: X }` → `defined: X` (recursive)
- `pubkey` primitive → `publicKey`
- account meta flag rewrite (`writable` → `isMut`, `signer` → `isSigner`)
- combined account/type inlining (0.28 expects struct fields on each
  `accounts[i]`, not a separate `types[]` lookup)
- `type/alias` (Anchor 0.31 `IdlTypeDefTy::Type`) inlining + removal
- instruction names → camelCase (the discriminator helper re-snake_cases
  for the on-chain digest)

Drop the shim the moment a spec-0.1.0-aware anchor-client-gen release
lands on npm.
