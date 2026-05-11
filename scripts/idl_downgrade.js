#!/usr/bin/env node
// idl_downgrade.js — rewrite an Anchor 0.31 spec-0.1.0 IDL into the 0.28-style
// shape that anchor-client-gen 0.28.x can parse.
//
// Wave 1 cascade-failure root-cause #2 fix: closes the gap between
// skew-master's emitted IDL (Anchor 0.31, spec 0.1.0) and the only published
// codegen tool that produces typed TS clients (`anchor-client-gen@^0.28`).
// Without this shim, `pnpm gen:sdk` fails and the downstream
// skew-relay / skew-sdk hand-mirrors of `RelayPayload` cannot be retired.
//
// Reads stdin OR a file path (argv[2]); writes JSON to stdout.
//
// Transforms applied:
//   1. Drop top-level `address`, `metadata`, `spec`. Lift `metadata.name`/
//      `metadata.version` into top-level `name`/`version` (0.28 idl shape).
//   2. `defined: { name: X }` → `defined: X` (recursive).
//   3. Account metas: `writable` → `isMut`, `signer` → `isSigner` (defaulted
//      to false when absent, since 0.28 emits them unconditionally into
//      `{isSigner, isWritable}` literal AccountMeta init).
//   4. Inline each top-level `accounts[i].discriminator` entry's matching
//      struct fields from `types[i]` so 0.28's `acc.type.fields` lookup works.
//      Drop the now-redundant duplicate from `types`.
//   5. Convert `type/alias` kinds (Anchor 0.31 `IdlTypeDefTy::Type`) into
//      anonymous inlined references at every callsite, then drop the alias
//      from `types` (0.28 only knows `struct`/`enum`).
//   6. Strip extra fields 0.28 doesn't recognise (`docs` arrays survive,
//      `pda`, `relations`, `address`, `optional` are tolerated as ignored
//      object keys; `repr` on enum types is kept harmless).
//   7. Convert instruction names from `snake_case` → `camelCase` so
//      generated TS exports look idiomatic; the 0.28 discriminator helper
//      then re-snake_cases the name back to match the on-chain digest.
//      (Account/type names are PascalCase in both formats; left untouched.)

"use strict";

const fs = require("fs");

// ---------- helpers ----------

function snakeToCamel(s) {
  return s.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

// Deep-clone via JSON; safe — IDL is pure data.
function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

// Recursively rewrite `defined: { name: X }` → `defined: X`,
// and `pubkey` (Anchor 0.31 primitive) → `publicKey` (0.28 primitive).
function flattenDefined(node) {
  if (Array.isArray(node)) {
    return node.map(flattenDefined);
  }
  if (node === "pubkey") return "publicKey";
  if (!isPlainObject(node)) return node;
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    if (k === "defined" && isPlainObject(v) && typeof v.name === "string") {
      out.defined = v.name;
    } else {
      out[k] = flattenDefined(v);
    }
  }
  return out;
}

// Recursively replace any `defined: AliasName` reference with the alias's
// `aliasMap[AliasName]` body, repeated to fixed-point.
function inlineAliases(node, aliasMap) {
  if (Array.isArray(node)) return node.map((v) => inlineAliases(v, aliasMap));
  if (!isPlainObject(node)) return node;
  if (typeof node.defined === "string" && aliasMap[node.defined]) {
    return inlineAliases(clone(aliasMap[node.defined]), aliasMap);
  }
  const out = {};
  for (const [k, v] of Object.entries(node)) out[k] = inlineAliases(v, aliasMap);
  return out;
}

// Convert account meta flags: writable→isMut, signer→isSigner.
function rewriteAccountMeta(meta) {
  if (Array.isArray(meta)) return meta.map(rewriteAccountMeta);
  if (!isPlainObject(meta)) return meta;
  const out = {};
  for (const [k, v] of Object.entries(meta)) {
    if (k === "writable") out.isMut = !!v;
    else if (k === "signer") out.isSigner = !!v;
    else if (k === "accounts") out.accounts = rewriteAccountMeta(v);
    else out[k] = v;
  }
  // 0.28's account-iter does `{isSigner: ${item.isSigner}, isWritable: ${item.isMut}}`
  // and prints the literal; missing → `undefined` which JS coerces to false but
  // looks ugly. Default both to false on leaf metas (no nested `accounts`).
  if (!("accounts" in out)) {
    if (out.isMut === undefined) out.isMut = false;
    if (out.isSigner === undefined) out.isSigner = false;
  }
  return out;
}

// ---------- main ----------

function downgrade(idl031) {
  // Step 1: top-level shape
  const out = {
    version: (idl031.metadata && idl031.metadata.version) || "0.0.0",
    name: (idl031.metadata && idl031.metadata.name) || "program",
    instructions: [],
    accounts: [],
    types: [],
    errors: idl031.errors ? clone(idl031.errors) : [],
  };

  // Step 2: flatten `defined` everywhere up-front.
  const flat = flattenDefined(idl031);

  // Step 5a: collect type/alias kinds — these are 0.31's `IdlTypeDefTy::Type`,
  // unsupported by 0.28. Build aliasMap and drop them from `types`.
  const aliasMap = {};
  const realTypes = [];
  for (const t of flat.types || []) {
    if (t && t.type && t.type.kind === "type" && t.type.alias) {
      aliasMap[t.name] = t.type.alias;
    } else {
      realTypes.push(t);
    }
  }

  // Step 5b: inline alias references everywhere.
  const realTypesInlined = inlineAliases(realTypes, aliasMap);
  const instructionsInlined = inlineAliases(flat.instructions || [], aliasMap);

  // Step 4: build accounts with inlined struct fields. 0.31 has separate
  // accounts (just discriminators) + types (field layouts). 0.28 expects
  // accounts inline.
  const typesByName = new Map();
  for (const t of realTypesInlined) typesByName.set(t.name, t);

  const accountTypeNames = new Set();
  for (const a of flat.accounts || []) {
    const layout = typesByName.get(a.name);
    if (!layout) {
      throw new Error(
        `idl_downgrade: account ${a.name} has no matching entry in idl.types`
      );
    }
    accountTypeNames.add(a.name);
    out.accounts.push({
      name: a.name,
      docs: layout.docs,
      type: clone(layout.type),
    });
  }

  // Step 4b: types[] should now exclude the entries already promoted to
  // accounts (0.28 gens both from one source).
  out.types = realTypesInlined
    .filter((t) => !accountTypeNames.has(t.name))
    .map((t) => ({ name: t.name, docs: t.docs, type: clone(t.type) }));

  // Step 7: instructions — camelCase the name, rewrite account metas, drop
  // the precomputed `discriminator` (0.28 recomputes from name).
  out.instructions = instructionsInlined.map((ix) => {
    const ixOut = {
      name: snakeToCamel(ix.name),
      docs: ix.docs,
      accounts: rewriteAccountMeta(ix.accounts || []),
      args: ix.args || [],
    };
    return ixOut;
  });

  return out;
}

function readInput() {
  const arg = process.argv[2];
  if (arg && arg !== "-") {
    return fs.readFileSync(arg, "utf8");
  }
  // stdin
  return fs.readFileSync(0, "utf8");
}

// Strip every `docs` array recursively from the IDL tree. Docstrings carry
// internal estimator references, calibration parameters, and `spec §`
// section numbers that the IP-leak gate (`scripts/verify_no_leak.mjs`)
// blocks. Field NAMES survive (they are public on-chain layout); only the
// human-readable commentary attached as Anchor `docs` arrays is removed.
function stripDocs(node) {
  if (Array.isArray(node)) {
    for (const item of node) stripDocs(item);
    return;
  }
  if (node !== null && typeof node === "object") {
    if ("docs" in node) delete node.docs;
    for (const key of Object.keys(node)) stripDocs(node[key]);
  }
}

// Sanitise error `msg` strings — same rules as scripts/strip_idl.mjs so the
// generated TS stays leak-free even when error variants carry trailing
// `spec §...` / `master paper §...` / `Iron Law N` / `AGENT-PROTOCOL` /
// `Phase NNNN` references in the on-chain `#[msg]` attributes.
function cleanMsgs(node) {
  if (Array.isArray(node)) {
    for (const item of node) cleanMsgs(item);
    return;
  }
  if (node !== null && typeof node === "object") {
    if (typeof node.msg === "string") {
      node.msg = node.msg
        .replace(/[—\-—–]?\s*spec §[\d.]+[a-z]*[A-Za-z\-]*\s*Bug #\d+\s*[—\-]?/gi, "")
        .replace(/[—\-—–]?\s*\(?spec §[\d.]+[a-z]*(?:\s+SIM\s+\w)?(?:\s*,\s*§[\d.]+[a-z]*)*\)?\s*[—\-]?/gi, "")
        .replace(/\s*\bmaster paper\s*§[\d.]+(?:\s*[a-zA-Z\d.\-]+)?\s*/gi, "")
        .replace(/\s*\bIron Law\s+\d+\s*/gi, "")
        .replace(/\s*\bAGENT-PROTOCOL\s+Article\s+\d+\s*/gi, "")
        .replace(/\s*\bArticle\s+\d+\s+\d+-asset\s+Iron Law\s*/gi, "")
        .replace(/\s*\bPhase\s+\d+\s*[a-zA-Z\-]*\s*/g, "")
        .replace(/\s*—\s*$/g, "")
        .replace(/\s+/g, " ")
        .trim();
    }
    for (const key of Object.keys(node)) cleanMsgs(node[key]);
  }
}

function main() {
  const raw = readInput();
  const idl031 = JSON.parse(raw);
  const idl028 = downgrade(idl031);
  stripDocs(idl028);
  cleanMsgs(idl028);
  process.stdout.write(JSON.stringify(idl028, null, 2));
}

main();
