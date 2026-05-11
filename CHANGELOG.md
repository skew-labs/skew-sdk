# @skew-labs/sdk changelog

## 0.5.0 — 2026-05-09

W22-W30 surface delivery + post-redeploy regen.

### Added
- `recovery_declare_trigger`, `recovery_publish_snapshot`, `recovery_apply_vmgh`,
  `recovery_partial_tear_up` — IOSCO RRP 2017 §11A Recovery Regime (W22-C)
- `recovery_determination_op(op, change_id)` — merged Propose/Execute multisig
  gate (W27-A + W28-E dispatch consolidation)
- `governance_committee_op(op, change_id, ...)` — merged Propose/Execute for
  Methodology Committee membership rotation (W29-A)
- `init_methodology_committee` + 3 supporting handlers (Rule 10.13/10.15) (W15)
- 8 Recovery* event types (Declared / SnapshotPublished / VmghApplied /
  VmghDrainExecuted / PartialTearUpApplied / TearUpAppliedToCm /
  DeterminationProposed / DeterminationExecuted)
- Accounts: `RecoveryStatePda`, `RecoveryDeterminationPda`,
  `MethodologyCommitteePda`, `MethodologyDecisionPda`
- 19 new error variants (codes 6155-6174 — Recovery* family + DigestReplayed)
- SIMM v2.6 Equity types (W21-C / W22-D / W27-C): `SimmEquityInput`,
  `simm_equity_delta` aggregator, Vega Margin module scaffold

### Removed (BREAKING)
- `create_rfq`, `fill_rfq`, `cancel_rfq`, `close_legacy_rfq` — legacy v4 RFQ
  ix family deprecated 2026-04-30 by Phase 1633.E. Use the
  `register_rfq_auction` / `submit_rfq_quote` / `finalize_rfq_auction` family
  instead. Removed in W30 to recover BPF dispatch stack budget.
- `RfqAccount`, `RfqState` types
- `RfqCreated`, `RfqFilled`, `RfqCancelled` events
- `closeLegacyRfq` client wrapper

### Fixed
- W22-D: `CONC_THRESHOLD_USDC_MICRO` 12-element constant table — removed stray
  `_000` group; literals were 1000× over the ISDA SIMM v2.6 §77 reference.
  Reference-only path; no production margin drift, but mandated by
  numeric-verification absolute law.

### Notes
- IDL hash: `0a7add4a4b9f92a7b354d546f73031e33cfc476ca5c53978ed7196443802dc05`
- 291 generated TS files (was 300; 9 dropped post-W30)
- 5/5 random ix discriminator parity verified
  (recovery_declare_trigger / governance_committee_op /
  init_methodology_committee / create_option / atomic_fill_from_relay)

## 0.4.6 — earlier

W4 → W21 generations. See git log for incremental changes.
