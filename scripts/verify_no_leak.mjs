#!/usr/bin/env node
// IP-leak verifier for @skew-labs/sdk.
//
// The SDK ships the Anchor IDL plus generated TypeScript bindings. Field
// NAMES are part of the on-chain layout and cannot be renamed without
// breaking the protocol contract — those are explicitly allowed.
//
// What we DO block: human-readable commentary that references the
// off-chain pricing engine's internal estimator framework — calibration
// methods, rejected estimators, internal spec sections, Phase identifiers.
// Those leak via Anchor's `docs` arrays. `strip_idl.mjs` removes them
// before publish; this script is the post-condition gate.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// Forbidden human-readable strings — academic estimator framework names
// and internal references that have no business in the public SDK package.
//
// Intentionally NOT in this list (per user explicit authorisation
// "yes to weakening verify_no_leak.mjs", 2026-05-03):
//   - Protocol field names (sigma_t_micro, vrp_rel, var_99, etc.) —
//     these are public state-vector identifiers documented in the
//     architecture page and the on-chain IDL.
//   - Protocol release tags ("Phase 1633.G", "Phase 1641", etc.) —
//     versioning labels for shipped on-chain releases, not IP.
//   - On-chain account names like "HamiltonState" — published in the
//     IDL and referenced throughout user-facing docs.
const FORBIDDEN = [
  "POT-GPD",
  "Yang-Zhang",
  "Yang–Zhang",
  "RiskMetrics",
  "GARCH",
  "Hansen-Lunde",
  "Hansen–Lunde",
  "master paper",
  "spec §",
  "AGENT-PROTOCOL",
  "DISPROVEN",
];

const AUDIT_DIRS = ["dist", "src", "idl", "README.md", "package.json"];
const EXCLUDE = [
  join("scripts", "verify_no_leak.mjs"),
  join("scripts", "strip_idl.mjs"),
];

const TEXT_EXT = new Set([
  ".js", ".mjs", ".cjs", ".ts", ".tsx", ".json", ".md", ".map",
]);

function walk(p) {
  const out = [];
  try {
    const stat = statSync(p);
    if (stat.isFile()) {
      out.push(p);
      return out;
    }
    if (!stat.isDirectory()) return out;
    for (const name of readdirSync(p)) out.push(...walk(join(p, name)));
  } catch { /* ignore */ }
  return out;
}

function isExcluded(rel) {
  return EXCLUDE.some((e) => rel.endsWith(e) || rel === e);
}

let totalHits = 0;
const hits = [];

for (const dir of AUDIT_DIRS) {
  const abs = join(ROOT, dir);
  for (const file of walk(abs)) {
    const rel = file.slice(ROOT.length + 1).replace(/\\/g, "/");
    if (isExcluded(rel)) continue;
    if (!TEXT_EXT.has(extname(file))) continue;
    let content;
    try { content = readFileSync(file, "utf8"); } catch { continue; }
    for (const term of FORBIDDEN) {
      const idx = content.indexOf(term);
      if (idx !== -1) {
        const snippet = content
          .slice(Math.max(0, idx - 40), Math.min(content.length, idx + term.length + 40))
          .replace(/\n/g, " ");
        hits.push({ file: rel, term, snippet });
        totalHits += 1;
      }
    }
  }
}

if (totalHits === 0) {
  console.log("✓ verify_no_leak (sdk): PASS — 0 forbidden terms found");
  process.exit(0);
} else {
  console.error(`✗ verify_no_leak (sdk): FAIL — ${totalHits} forbidden term hits`);
  for (const hit of hits.slice(0, 50)) {
    console.error(`  ${hit.file} → "${hit.term}"`);
    console.error(`    ...${hit.snippet}...`);
  }
  if (hits.length > 50) console.error(`  ... ${hits.length - 50} more`);
  process.exit(1);
}
