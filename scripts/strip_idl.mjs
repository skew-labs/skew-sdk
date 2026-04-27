#!/usr/bin/env node
// IDL stripper — removes `docs` arrays from the Anchor IDL before publish.
//
// Anchor IDL embeds the source-code docstring of every account, instruction,
// argument, and field as a `docs: string[]` array. Those docstrings carry
// internal references (estimator names, calibration parameters, spec section
// numbers, Phase IDs) that have no business in a public SDK package.
//
// This script reads `idl/skew_master.json`, recursively deletes every
// `docs` array, and writes the result back. Run as part of build + before
// publish.
//
// Field NAMES (e.g. `sigma_t_micro`) cannot be renamed without breaking the
// SDK contract — those stay. The aim here is the human-readable commentary
// only.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const IDL_PATH = join(__dirname, "..", "idl", "skew_master.json");

const raw = readFileSync(IDL_PATH, "utf8");
const idl = JSON.parse(raw);

let stripped = 0;

function walk(node) {
  if (Array.isArray(node)) {
    for (const item of node) walk(item);
    return;
  }
  if (node !== null && typeof node === "object") {
    if ("docs" in node) {
      delete node.docs;
      stripped += 1;
    }
    for (const key of Object.keys(node)) walk(node[key]);
  }
}

walk(idl);

// Also clean error `msg` fields — they're user-facing on tx revert.
let msgsCleaned = 0;
function cleanMsgs(node) {
  if (Array.isArray(node)) {
    for (const item of node) cleanMsgs(item);
    return;
  }
  if (node !== null && typeof node === "object") {
    if (typeof node.msg === "string") {
      const before = node.msg;
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
      if (before !== node.msg) msgsCleaned += 1;
    }
    for (const key of Object.keys(node)) cleanMsgs(node[key]);
  }
}
cleanMsgs(idl);

writeFileSync(IDL_PATH, JSON.stringify(idl, null, 2) + "\n");

const before = raw.length;
const after = JSON.stringify(idl, null, 2).length;
console.log(
  `✓ strip_idl: removed ${stripped} docs blocks · cleaned ${msgsCleaned} error msgs · ${before} → ${after} bytes (${
    Math.round(((before - after) / before) * 100)
  }% smaller)`,
);
