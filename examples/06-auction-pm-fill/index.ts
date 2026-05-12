/**
 * Judge-style Auction RFQ -> Instant PM fill demo.
 *
 * This script proves the official path:
 * register_rfq_auction -> submit_rfq_quote_direct -> finalize_rfq_auction
 * -> Instant RFQ quote -> atomic_fill_from_relay.
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import "dotenv/config";
import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
import { Connection, Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import {
  SkewClient,
  fetchPythSpotUsd,
  resolvePythFeed,
  type PayoffType,
  type Underlying,
} from "@skew-labs/sdk";
import idl from "@skew-labs/sdk/idl/skew_master.json" with { type: "json" };

function readKeypair(file: string | undefined, label: string): Keypair {
  if (!file) throw new Error(`${label} is required`);
  const expanded = file.startsWith("~/") ? path.join(os.homedir(), file.slice(2)) : file;
  const secret = Uint8Array.from(JSON.parse(fs.readFileSync(expanded, "utf8")) as number[]);
  return Keypair.fromSecretKey(secret);
}

function makeClient(connection: Connection, keypair: Keypair): SkewClient {
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
  const program = new Program(idl as never, provider);
  return SkewClient.fromProgram(connection, wallet, program);
}

const STRIKE_STEP_USD: Record<Underlying, number> = {
  BTC: 250,
  ETH: 10,
  SOL: 1,
  XRP: 0.01,
  HYPE: 0.5,
};

function roundToStrikeGrid(asset: Underlying, value: number): number {
  const step = STRIKE_STEP_USD[asset];
  const rounded = Math.round(value / step) * step;
  const decimals = step < 1 ? String(step).split(".")[1]?.length ?? 0 : 0;
  return Number(rounded.toFixed(decimals));
}

async function readRfqPreflightSpot(
  connection: Connection,
  asset: Underlying,
): Promise<{ source: "devnet-pyth" | "hermes"; spotUsd: number }> {
  const feed = resolvePythFeed(asset);
  const info = await connection.getAccountInfo(feed, "confirmed").catch(() => null);
  const data = info?.data;
  if (data && data.length >= 104 && data.readUInt32LE(0) === 0xa1b2c3d4) {
    const expo = data.readInt32LE(20);
    const price = Number(data.readBigInt64LE(48));
    const spotUsd = price * Math.pow(10, expo);
    if (Number.isFinite(spotUsd) && spotUsd > 0) {
      return { source: "devnet-pyth", spotUsd };
    }
  }
  return { source: "hermes", spotUsd: await fetchPythSpotUsd(asset) };
}

async function main(): Promise<void> {
  const rpc = process.env.HELIUS_RPC ?? process.env.SKEW_RPC_URL;
  if (!rpc) throw new Error("HELIUS_RPC or SKEW_RPC_URL is required");
  const buyerKeypair = readKeypair(process.env.BUYER_KEYPAIR ?? process.env.KEYPAIR, "BUYER_KEYPAIR");
  const makerKeypair = readKeypair(process.env.MAKER_KEYPAIR, "MAKER_KEYPAIR");
  if (buyerKeypair.publicKey.equals(makerKeypair.publicKey)) {
    throw new Error("BUYER_KEYPAIR and MAKER_KEYPAIR must be different wallets for a clean demo");
  }

  const connection = new Connection(rpc, "confirmed");
  const buyer = makeClient(connection, buyerKeypair);
  const maker = makeClient(connection, makerKeypair);

  const asset = (process.env.ASSET ?? "BTC").toUpperCase() as Underlying;
  const payoff = (process.env.PAYOFF ?? "vanilla_call") as PayoffType;
  const hermesSpot = await fetchPythSpotUsd(asset);
  const preflightSpot = await readRfqPreflightSpot(connection, asset);
  const defaultStrike = roundToStrikeGrid(
    asset,
    payoff.includes("put") ? preflightSpot.spotUsd * 1.1 : preflightSpot.spotUsd * 0.9,
  );
  const strike = Number(process.env.STRIKE ?? defaultStrike);
  const notional = Number(process.env.NOTIONAL_USD ?? 1_000);
  const maxPremiumUsd = Number(process.env.MAX_PREMIUM_USD ?? 100);
  const makerPremiumUsd = Number(process.env.MAKER_PREMIUM_USD ?? 25);
  const premiumMicro = BigInt(Math.round(makerPremiumUsd * 1_000_000));

  console.log("buyer", buyer.walletPublicKey.toBase58());
  console.log("maker", maker.walletPublicKey.toBase58());
  console.log("request", {
    asset,
    payoff,
    hermesSpot: Number(hermesSpot.toFixed(2)),
    preflightSource: preflightSpot.source,
    preflightSpot: Number(preflightSpot.spotUsd.toFixed(2)),
    strike,
    notional,
    maxPremiumUsd,
    makerPremiumUsd,
  });

  const makerLoop = maker.rfq.maker.serve({
    premiumUsd: makerPremiumUsd,
    quoteTtlSeconds: 600,
    relayUrl: process.env.RELAY_URL,
    timeoutMs: 180_000,
    autoPrepare: true,
    refreshPmCacheBeforeQuote: true,
    initialCollateralUsdc: Number(process.env.MAKER_INITIAL_COLLATERAL_USD ?? 50_000),
    filters: { assets: [asset], payoffs: [payoff] },
    signDigest: (digest) => nacl.sign.detached(digest, makerKeypair.secretKey),
  });

  const result = await buyer.rfq.auctionAndFill({
    asset,
    payoff,
    strike,
    expiry: process.env.EXPIRY ?? "7d",
    notional,
    maxPremiumUsd,
    relayUrl: process.env.RELAY_URL,
    auctionDurationSlots: BigInt(process.env.AUCTION_DURATION_SLOTS ?? "30"),
    auctionWaitMs: Number(process.env.AUCTION_WAIT_MS ?? 90_000),
    instantQuoteTimeoutMs: Number(process.env.INSTANT_QUOTE_TIMEOUT_MS ?? 90_000),
    instantHitTimeoutMs: Number(process.env.INSTANT_HIT_TIMEOUT_MS ?? 120_000),
    requireAuctionQuote: true,
    requireInstantMakerMatchesAuction: true,
    onAuctionRegistered: async ({ auction }) => {
      await maker.registerRfqMaker();
      const currentSlot = BigInt(await connection.getSlot("confirmed"));
      const quote = await maker.submitRfqQuoteDirect({
        auction,
        premiumMicro,
        validUntilSlot: currentSlot + 500n,
      });
      console.log("auction quote tx", quote.txSignature);
    },
  });

  const makerReceipt = await makerLoop;
  console.log("auction", result.auction);
  console.log("fill tx", result.fill.txSignature);
  console.log("option", result.fill.optionPda);
  console.log("pm", result.fill.margin);
  console.log("portfolio", {
    buyerHasLong: result.fill.portfolio.buyerHasLong,
    makerHasShort: result.fill.portfolio.makerHasShort,
  });
  console.log("readback", { ok: result.readbackOk, errors: result.readbackErrors });
  console.log("maker relay filled", makerReceipt.filled);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
