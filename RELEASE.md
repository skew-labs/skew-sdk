# @skew-labs/sdk release runbook

## v0.5.0 (2026-05-09) — operator gated

The SDK is staged but NOT yet published. Operator runs the publish from a
trusted machine with npm 2FA, AFTER the on-chain redeploy is verified
(see `RUNBOOK_DEVNET_REDEPLOY_2026-05-09.md`).

### Pre-flight (already PASSED W37-C)
- [x] `node skew-sdk/scripts/strip_idl.mjs` → 0 docs / 0 errors stripped (already clean)
- [x] `node skew-sdk/scripts/verify_no_leak.mjs` → PASS (0 forbidden terms)
- [x] `pnpm --filter @skew-labs/sdk exec tsc --noEmit` → PASS
- [x] `pnpm --filter @skew-labs/sdk pack --dry-run` → tarball composes correctly
  - skew-labs-sdk-0.5.0.tgz: dist/ + idl/skew_master.json + LICENSE + package.json + README.md
- [x] CHANGELOG.md updated with W22-W30 deltas + BREAKING removed-RFQ section
- [x] Discriminator parity verified vs deployed program (slot 461100548)

### Operator publish command (NOT executed by automation)
```bash
cd skew/skew-sdk
npm publish --access public
# requires npm login + 2FA OTP
```

### Rollback
If the published version has a bug, npm allows `npm unpublish @skew-labs/sdk@0.5.0`
within 72 hours of publish. After 72h, mark as deprecated:
```bash
npm deprecate '@skew-labs/sdk@0.5.0' 'use 0.5.1+'
```

### Post-publish verification
```bash
# In a fresh project:
mkdir /tmp/sdk-verify && cd /tmp/sdk-verify
npm init -y
npm install @skew-labs/sdk@0.5.0
node -e "const sdk = require('@skew-labs/sdk'); console.log(Object.keys(sdk).slice(0,10))"
```

### Memory laws checked
- ✓ no hardcoded API keys / RPC URLs in dist/
- ✓ ip-leak-gate (28 forbidden terms) clean
- ✓ public IDL has spec/PROTOCOL/runbook docs stripped (W22 strip_idl.mjs)
