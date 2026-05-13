# @skew-labs/sdk release notes

## v0.7.11 - 2026-05-13

Status: published to npm as `@skew-labs/sdk@0.7.11`.

This patch is a public-documentation sync release. It keeps the npm package
page, GitHub README, and relay PM-cache wording aligned with the deployed
devnet surface.

### Verification

- `npm run strip-idl`
- `npm run build`
- `npm run verify:no-leak`
- `npm publish --dry-run`

### Install

```bash
npm install @skew-labs/sdk@0.7.11
```

For new integrations, `@latest` is preferred:

```bash
npm install @skew-labs/sdk@latest
```
