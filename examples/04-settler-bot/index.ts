/**
 * 04-settler-bot — Round 28 rewrite using direct anchor account scan.
 *
 * The earlier REST `/v1/positions` route doesn't exist on the live server
 * (Round 23 finding). This rewrite uses Helius `getProgramAccounts` directly
 * with the OptionAccount discriminator filter, parses only the **stable
 * prefix bytes (offset 0-68)** so the bot is resilient to the IDL drift
 * documented in mainnet-promotion-checklist §7c.
 *
 * Stable layout used:
 *   0-8    discriminator   (filter via memcmp base58)
 *   8-40   creator         (Pubkey 32B)
 *   40-48  nonce           (u64)
 *   48-49  bump            (u8)
 *   49-50  version         (u8)
 *   50-58  created_at      (i64)
 *   58-59  option_type tag (1B Anchor enum)
 *   59-60  state tag       (1B)
 *   60-68  expiry_ts       (i64)  ← used for expired filter
 *
 * Run: HELIUS_RPC=... pnpm tsx index.ts
 */

import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Wallet, AnchorProvider, Program } from "@coral-xyz/anchor";
import { SkewClient } from "@skew/sdk";
import idl from "@skew/sdk/idl/skew_master.json" assert { type: "json" };
import * as fs from "node:fs";

const TICK_MS = 60_000;
const PROGRAM = "3w2qSp1UnuTbTfdHPXxm3zZaz6JZRmPpbmHf56Y1DsgK";

// Anchor account discriminator for OptionAccount, base58-encoded for memcmp filter.
// Computed: sha256("account:OptionAccount")[..8] = 522cc32adb39125c → base58 EkCYUNaERC7
const OPTION_ACCOUNT_DISC_B58 = "EkCYUNaERC7";

interface OptionPrefix {
  pubkey: PublicKey;
  expiry_ts: number;
}

async function scanExpiredOptions(connection: Connection): Promise<OptionPrefix[]> {
  const rpc = (connection as unknown as { _rpcEndpoint: string })._rpcEndpoint;
  const r = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "getProgramAccounts",
      params: [PROGRAM, {
        encoding: "base64",
        filters: [{ memcmp: { offset: 0, bytes: OPTION_ACCOUNT_DISC_B58 } }],
        dataSlice: { offset: 0, length: 68 },
      }],
    }),
  }).then((r) => r.json()) as { result?: Array<{ pubkey: string; account: { data: [string, "base64"] } }> };

  const now = Math.floor(Date.now() / 1000);
  const expired: OptionPrefix[] = [];
  for (const acc of r.result ?? []) {
    const buf = Buffer.from(acc.account.data[0], "base64");
    if (buf.length < 68) continue;
    const lo = buf.readUInt32LE(60);
    const hi = buf.readInt32LE(64);
    const expiry_ts = hi * 0x100000000 + lo;
    if (expiry_ts < now) {
      expired.push({ pubkey: new PublicKey(acc.pubkey), expiry_ts });
    }
  }
  return expired;
}

async function main(): Promise<void> {
  const conn = new Connection(process.env.HELIUS_RPC!, "confirmed");
  const kp = process.env.KEYPAIR
    ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fs.readFileSync(process.env.KEYPAIR, "utf-8"))))
    : Keypair.generate();
  const wallet = new Wallet(kp);
  const provider = new AnchorProvider(conn, wallet, { commitment: "confirmed" });
  const program = new Program(idl as never, provider);
  const skew = SkewClient.fromProgram(conn, wallet, program);
  console.log(`settler: ${kp.publicKey.toBase58()}`);

  async function tick(): Promise<void> {
    try {
      const expired = await scanExpiredOptions(conn);
      const ts = new Date().toISOString();
      console.log(`[${ts}] ${expired.length} expired OptionAccount(s) on chain`);
      for (const opt of expired) {
        try {
          const r = await skew.settle(opt.pubkey);
          console.log(`  settle ${opt.pubkey.toBase58().slice(0, 8)}...: ${r.txSignature.slice(0, 12)}...`);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (msg.includes("HolderRequired") || msg.includes("NoHolder")) {
            try {
              const r2 = await skew.closeExpired(opt.pubkey);
              console.log(`  closeExpired ${opt.pubkey.toBase58().slice(0, 8)}...: ${r2.txSignature.slice(0, 12)}...`);
            } catch (e2) {
              console.error(`  closeExpired failed:`, e2 instanceof Error ? e2.message : String(e2));
            }
          } else if (msg.includes("AlreadySettled")) {
            // benign
          } else {
            console.error(`  ${opt.pubkey.toBase58().slice(0, 8)}...: ${msg.slice(0, 80)}`);
          }
        }
      }
    } catch (e) {
      console.error("tick failed:", e instanceof Error ? e.message : String(e));
    }
  }

  await tick();
  setInterval(() => tick().catch(console.error), TICK_MS);
}

main().catch((e) => { console.error(e); process.exit(1); });
