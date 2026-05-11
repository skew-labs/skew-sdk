#!/usr/bin/env bash
# anchor-client-gen wrapper — generates skew-sdk/src/generated/* from the
# canonical IDL at skew-master/idl/skew_master.json.
#
# Background (Wave 1 cascade-failure root-cause #2):
#   The on-chain Anchor IDL is the single source of truth. Hand-mirrored
#   Borsh structs (skew-relay/src/payload.ts, skew-sdk/src/instant-rfq.ts
#   RelayPayload, skew-relay/src/tx-builder.ts ATOMIC_FILL_FROM_RELAY_ACCOUNT_ORDER)
#   drift silently. Codegen kills that drift by deriving every TypeScript
#   type and instruction-builder directly from the IDL.
#
# Resolver order (first hit wins):
#   1. ./node_modules/.bin/anchor-client-gen        — pinned dev dep
#   2. $ACG_BIN env var                              — explicit override
#   3. npx --yes anchor-client-gen@^0.28.1 ...       — npm fallback
#
# Anchor 0.31 vs anchor-client-gen 0.28 incompatibility (resolved 2026-05-08):
#   anchor-client-gen 0.28.1 (latest on npm) parses the legacy Anchor 0.28
#   IDL shape only. skew-master emits Anchor 0.31's spec-0.1.0 IDL. We
#   bridge the two with `scripts/idl_downgrade.js` — a pure-JS transform
#   that:
#     - lifts metadata.{name,version} to top-level
#     - flattens defined: { name: X } → defined: X
#     - rewrites writable→isMut, signer→isSigner on account metas
#     - inlines accounts/types so 0.28's combined account-struct lookup works
#     - inlines `type/alias` IdlTypeDef kinds (0.28 only knows struct/enum)
#     - converts instruction names to camelCase (discriminator unchanged —
#       0.28 snake_cases the name back to compute the on-chain digest)
#     - renames `pubkey` primitive → `publicKey`
#
# Until anchor-client-gen ships native spec-0.1.0 support upstream, this
# shim is the production codegen path. Drop it the moment a 1.x release
# lands on npm with `defined: { name }` parsing.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SDK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
IDL_PATH="$SDK_DIR/../skew-master/idl/skew_master.json"
OUT_DIR="$SDK_DIR/src/generated"
SHIM="$SCRIPT_DIR/idl_downgrade.js"

if [[ ! -f "$IDL_PATH" ]]; then
  echo "codegen: IDL not found at $IDL_PATH" >&2
  exit 1
fi
if [[ ! -f "$SHIM" ]]; then
  echo "codegen: idl_downgrade shim not found at $SHIM" >&2
  exit 1
fi

# Read program ID from skew-master/programs/skew-master/src/lib.rs
LIB_RS="$SDK_DIR/../skew-master/programs/skew-master/src/lib.rs"
PROGRAM_ID="$(grep -E '^declare_id!\("[^"]+"\)' "$LIB_RS" | sed -E 's/.*"([^"]+)".*/\1/' | head -n1)"
if [[ -z "${PROGRAM_ID:-}" ]]; then
  echo "codegen: could not parse declare_id from $LIB_RS" >&2
  exit 1
fi

echo "codegen: program_id=$PROGRAM_ID"
echo "codegen: idl=$IDL_PATH"
echo "codegen: out=$OUT_DIR"

ACG=""
if [[ -n "${ACG_BIN:-}" ]]; then
  ACG="$ACG_BIN"
elif [[ -x "$SDK_DIR/node_modules/.bin/anchor-client-gen" ]]; then
  ACG="$SDK_DIR/node_modules/.bin/anchor-client-gen"
fi

# Wipe stale generated/ so removed types don't linger. Preserve the README,
# which is hand-authored and not part of anchor-client-gen output.
README_TMP=""
if [[ -f "$OUT_DIR/README.md" ]]; then
  README_TMP="$(mktemp -t skew_gen_readme.XXXXXX.md)"
  cp "$OUT_DIR/README.md" "$README_TMP"
fi
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
if [[ -n "$README_TMP" ]]; then
  cp "$README_TMP" "$OUT_DIR/README.md"
  rm -f "$README_TMP"
fi

# Materialise the downgraded IDL to a temp file so anchor-client-gen has a
# stable path for its parser (it accepts `-` for stdin but that complicates
# the npx fallback path).
DOWNGRADED="$(mktemp -t skew_idl_028.XXXXXX.json)"
trap 'rm -f "$DOWNGRADED"' EXIT
node "$SHIM" "$IDL_PATH" > "$DOWNGRADED"

if [[ -n "$ACG" ]]; then
  "$ACG" "$DOWNGRADED" "$OUT_DIR" --program-id "$PROGRAM_ID"
else
  npx --yes -p "anchor-client-gen@^0.28.1" anchor-client-gen "$DOWNGRADED" "$OUT_DIR" --program-id "$PROGRAM_ID"
fi

echo "codegen: done — generated/ has $(find "$OUT_DIR" -type f | wc -l | tr -d ' ') files"
