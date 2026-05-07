import { PublicKey, Transaction } from "@solana/web3.js";
import { sha256 } from "@noble/hashes/sha256";
import { JITOSOL_MINT, NATIVE_SOL_MINT } from "./pda";

export const INSTANT_RFQ_DEFAULT_RELAY_URL =
  "wss://skew-relay-devnet.fly.dev/subscribe";

export const RELAY_PAYLOAD_LEN = 100 as const;

export interface RelayPayload {
  relayNonce: bigint;
  quoteExpiryTs: bigint;
  optionType: number;
  asset: number;
  direction: number;
  strike: bigint;
  expiryTs: bigint;
  payoffAmount: bigint;
  settlementDecimals: number;
  upperBound: bigint;
  extraParam: number;
  premium: bigint;
  settlementMint: Uint8Array;
}

export interface InstantRfqOptionSpec {
  asset: number;
  strike: bigint;
  expiryTs: bigint;
  payoffAmountMicro: bigint;
  optionType: number;
  direction: number;
  upperBound: bigint;
  extraParam?: number;
}

export interface InstantRfqQuote {
  relayNonce: bigint;
  cmPubkey: PublicKey;
  premiumMicro: bigint;
  ttlSeconds: number | null;
  receivedAt: number | null;
  raw: Record<string, unknown>;
}

export interface InstantRfqHitResult {
  relayNonce: bigint;
  txSignature: string;
  optionPda: string;
  simulatedUnits?: number;
  premiumDestination?: string;
  autoPreparedAccounts?: string[];
  riskPreflight?: {
    status?: string;
    preImMicro?: bigint;
    postImMicro?: bigint;
    requiredDeltaMicro?: bigint;
    freeCollateralMicro?: bigint;
    afterFillFreeMicro?: bigint;
    healthBeforeBps?: bigint;
    healthAfterBps?: bigint;
    marginalImLockedMicro?: bigint;
    feeMicro?: bigint;
    premiumMicro?: bigint;
    mmp?: string;
    positionAccounts?: number;
  };
}

export function validateInstantRfqLane(payload: RelayPayload): void {
  const mint = new PublicKey(payload.settlementMint);
  const physicalSolSettlement =
    mint.equals(JITOSOL_MINT) || mint.equals(NATIVE_SOL_MINT);
  const inverse = payload.optionType === 4 || payload.optionType === 5;

  if (physicalSolSettlement) {
    if (payload.asset !== 2) {
      throw new Error("wSOL/jitoSOL Instant RFQ settlement is SOL-only in devnet v1");
    }
    if (!inverse) {
      throw new Error("wSOL/jitoSOL Instant RFQ settlement requires VanillaInverse or DigitalInverse");
    }
    if (payload.settlementDecimals !== 9) {
      throw new Error("wSOL/jitoSOL Instant RFQ settlement must use 9 decimals");
    }
    return;
  }

  if (inverse) {
    throw new Error("Inverse Instant RFQ must settle physically in wSOL or jitoSOL");
  }
  if (payload.settlementDecimals !== 6) {
    throw new Error("USDC/stable Instant RFQ lane must use 6 settlement decimals");
  }
}

export function buildRelayPayload(args: {
  relayNonce: bigint;
  optionSpec: InstantRfqOptionSpec;
  premiumMicro: bigint;
  settlementMint: PublicKey | Uint8Array;
  settlementDecimals?: number;
  quoteExpiryTs?: bigint;
}): RelayPayload {
  const now = BigInt(Math.floor(Date.now() / 1000));
  const mintBytes =
    args.settlementMint instanceof PublicKey
      ? args.settlementMint.toBytes()
      : args.settlementMint;
  const payload = {
    relayNonce: args.relayNonce,
    quoteExpiryTs: args.quoteExpiryTs ?? now + 30n,
    optionType: args.optionSpec.optionType,
    asset: args.optionSpec.asset,
    direction: args.optionSpec.direction,
    strike: args.optionSpec.strike,
    expiryTs: args.optionSpec.expiryTs,
    payoffAmount: args.optionSpec.payoffAmountMicro,
    settlementDecimals: args.settlementDecimals ?? 6,
    upperBound: args.optionSpec.upperBound,
    extraParam: args.optionSpec.extraParam ?? 0,
    premium: args.premiumMicro,
    settlementMint: mintBytes,
  };
  validateInstantRfqLane(payload);
  return payload;
}

export function encodeRelayPayload(payload: RelayPayload): Uint8Array {
  if (payload.settlementMint.length !== 32) {
    throw new Error(
      `settlementMint must be 32 bytes, got ${payload.settlementMint.length}`,
    );
  }
  const buf = new ArrayBuffer(RELAY_PAYLOAD_LEN);
  const view = new DataView(buf);
  view.setBigUint64(0, payload.relayNonce, true);
  view.setBigInt64(8, payload.quoteExpiryTs, true);
  view.setUint8(16, payload.optionType & 0xff);
  view.setUint8(17, payload.asset & 0xff);
  view.setInt8(18, payload.direction);
  view.setBigUint64(19, payload.strike, true);
  view.setBigInt64(27, payload.expiryTs, true);
  view.setBigUint64(35, payload.payoffAmount, true);
  view.setUint8(43, payload.settlementDecimals & 0xff);
  view.setBigUint64(44, payload.upperBound, true);
  view.setFloat64(52, payload.extraParam, true);
  view.setBigUint64(60, payload.premium, true);
  const out = new Uint8Array(buf);
  out.set(payload.settlementMint, 68);
  return out;
}

export function relayPayloadDigest(payloadOrBytes: RelayPayload | Uint8Array): Uint8Array {
  const bytes =
    payloadOrBytes instanceof Uint8Array
      ? payloadOrBytes
      : encodeRelayPayload(payloadOrBytes);
  if (bytes.length !== RELAY_PAYLOAD_LEN) {
    throw new Error(`payload must be ${RELAY_PAYLOAD_LEN} bytes, got ${bytes.length}`);
  }
  return sha256(bytes);
}

export function relayPayloadToJson(payload: RelayPayload): Record<string, unknown> {
  return {
    relay_nonce: payload.relayNonce.toString(),
    quote_expiry_ts: payload.quoteExpiryTs.toString(),
    option_type: payload.optionType,
    asset: payload.asset,
    direction: payload.direction,
    strike: payload.strike.toString(),
    expiry_ts: payload.expiryTs.toString(),
    payoff_amount: payload.payoffAmount.toString(),
    settlement_decimals: payload.settlementDecimals,
    upper_bound: payload.upperBound.toString(),
    extra_param: payload.extraParam,
    premium: payload.premium.toString(),
    settlement_mint: Array.from(payload.settlementMint),
  };
}

export async function collectInstantRfqQuotes(args: {
  buyer: PublicKey;
  request: Record<string, unknown>;
  relayUrl?: string;
  timeoutMs?: number;
  maxQuotes?: number;
}): Promise<{ relayNonce: bigint; quotes: InstantRfqQuote[] }> {
  const relayUrl = args.relayUrl ?? INSTANT_RFQ_DEFAULT_RELAY_URL;
  const timeoutMs = args.timeoutMs ?? 2_500;
  const maxQuotes = args.maxQuotes ?? 8;

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(relayUrl);
    let relayNonce: bigint | null = null;
    const quotes: InstantRfqQuote[] = [];
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      try {
        ws.close();
      } catch {
        /* noop */
      }
      if (relayNonce === null) {
        reject(new Error("relay did not acknowledge quote_request"));
        return;
      }
      resolve({ relayNonce, quotes });
    };

    const timer = setTimeout(finish, timeoutMs);

    ws.onerror = () => {
      clearTimeout(timer);
      if (!done) {
        done = true;
        reject(new Error("instant RFQ relay websocket error"));
      }
    };
    ws.onopen = () => {
      ws.send(JSON.stringify({
        kind: "identify",
        role: "buyer",
        pubkey: args.buyer.toBase58(),
      }));
      ws.send(JSON.stringify({
        ...args.request,
        kind: "quote_request",
        buyer_pubkey: args.buyer.toBase58(),
      }));
    };
    ws.onmessage = (event) => {
      const msg = parseWsJson(event.data);
      const kind = typeof msg.kind === "string" ? msg.kind : "";
      if (kind === "quote_request_ack") {
        relayNonce = BigInt(String(msg.relay_nonce));
        return;
      }
      if (kind !== "quote_ack") return;
      if (relayNonce !== null && String(msg.relay_nonce) !== relayNonce.toString()) return;
      const cm = String(msg.cm_pubkey ?? msg.cmPubkey ?? msg.mm ?? "");
      const premium = msg.premium_micro ?? msg.premiumMicro;
      if (!cm || premium === undefined || premium === null) return;
      quotes.push({
        relayNonce: BigInt(String(msg.relay_nonce)),
        cmPubkey: new PublicKey(cm),
        premiumMicro: BigInt(String(premium)),
        ttlSeconds:
          msg.ttl_seconds === undefined || msg.ttl_seconds === null
            ? null
            : Number(msg.ttl_seconds),
        receivedAt:
          msg.received_at === undefined || msg.received_at === null
            ? null
            : Number(msg.received_at),
        raw: msg,
      });
      if (quotes.length >= maxQuotes) {
        clearTimeout(timer);
        finish();
      }
    };
  });
}

export async function hitInstantRfqQuote(args: {
  buyer: PublicKey;
  cmPubkey: PublicKey;
  payload: RelayPayload;
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  relayUrl?: string;
  timeoutMs?: number;
}): Promise<InstantRfqHitResult> {
  const relayUrl = args.relayUrl ?? INSTANT_RFQ_DEFAULT_RELAY_URL;
  const timeoutMs = args.timeoutMs ?? 30_000;
  validateInstantRfqLane(args.payload);
  const digest = relayPayloadDigest(args.payload);
  const sig = await args.signMessage(digest);
  if (sig.length !== 64) {
    throw new Error(`buyer signature must be 64 bytes, got ${sig.length}`);
  }

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(relayUrl);
    const relayNonce = args.payload.relayNonce.toString();
    let done = false;
    let simulatedUnits: number | undefined;
    let premiumDestination: string | undefined;
    let autoPreparedAccounts: string[] | undefined;
    let riskPreflight: InstantRfqHitResult["riskPreflight"] | undefined;

    const finishErr = (err: Error) => {
      if (done) return;
      done = true;
      try {
        ws.close();
      } catch {
        /* noop */
      }
      reject(err);
    };
    const finishOk = (result: InstantRfqHitResult) => {
      if (done) return;
      done = true;
      try {
        ws.close();
      } catch {
        /* noop */
      }
      resolve(result);
    };

    const timer = setTimeout(
      () => finishErr(new Error("instant RFQ hit timed out waiting for fill_executed")),
      timeoutMs,
    );

    ws.onerror = () => {
      clearTimeout(timer);
      finishErr(new Error("instant RFQ relay websocket error"));
    };
    ws.onopen = () => {
      ws.send(JSON.stringify({
        kind: "identify",
        role: "buyer",
        pubkey: args.buyer.toBase58(),
      }));
      ws.send(JSON.stringify({
        kind: "buyer_accept",
        payload: relayPayloadToJson(args.payload),
        buyer_sig_b64: bytesToBase64(sig),
        buyer_pubkey: args.buyer.toBase58(),
        cm_pubkey: args.cmPubkey.toBase58(),
      }));
    };
    ws.onmessage = (event) => {
      const msg = parseWsJson(event.data);
      if (String(msg.relay_nonce ?? "") !== relayNonce) return;
      if (msg.kind === "fill_executed") {
        clearTimeout(timer);
        finishOk({
          relayNonce: args.payload.relayNonce,
          txSignature: String(msg.tx_sig ?? msg.txSignature ?? ""),
          optionPda: String(msg.option_pda ?? msg.optionPda ?? ""),
          simulatedUnits,
          premiumDestination,
          autoPreparedAccounts,
          riskPreflight,
        });
      }
      if (msg.kind === "fill_failed") {
        clearTimeout(timer);
        finishErr(new Error(String(msg.reason ?? "instant RFQ fill failed")));
      }
      if (msg.kind === "buyer_tx_request") {
        void (async () => {
          try {
            const txB64 = String(msg.tx_b64 ?? "");
            if (!txB64) throw new Error("buyer_tx_request missing tx_b64");
            simulatedUnits =
              typeof msg.simulated_units === "number" ? msg.simulated_units : undefined;
            premiumDestination =
              typeof msg.premium_destination === "string" ? msg.premium_destination : undefined;
            autoPreparedAccounts = Array.isArray(msg.auto_prepared_accounts)
              ? msg.auto_prepared_accounts.map(String)
              : undefined;
            if (typeof msg.risk_preflight === "object" && msg.risk_preflight !== null) {
              const rp = msg.risk_preflight as Record<string, unknown>;
              const maybeBigInt = (v: unknown): bigint | undefined =>
                v === undefined || v === null ? undefined : BigInt(String(v));
              riskPreflight = {
                status: typeof rp.status === "string" ? rp.status : undefined,
                preImMicro: maybeBigInt(rp.pre_im_micro),
                postImMicro: maybeBigInt(rp.post_im_micro),
                requiredDeltaMicro: maybeBigInt(rp.required_delta_micro),
                freeCollateralMicro: maybeBigInt(rp.free_collateral_micro),
                afterFillFreeMicro: maybeBigInt(rp.after_fill_free_micro),
                healthBeforeBps: maybeBigInt(rp.health_before_bps),
                healthAfterBps: maybeBigInt(rp.health_after_bps),
                marginalImLockedMicro: maybeBigInt(rp.marginal_im_locked_micro),
                feeMicro: maybeBigInt(rp.fee_micro),
                premiumMicro: maybeBigInt(rp.premium_micro),
                mmp: typeof rp.mmp === "string" ? rp.mmp : undefined,
                positionAccounts:
                  typeof rp.position_accounts === "number" ? rp.position_accounts : undefined,
              };
            }
            const tx = Transaction.from(base64ToBytes(txB64));
            const signed = await args.signTransaction(tx);
            ws.send(JSON.stringify({
              kind: "buyer_tx_signed",
              relay_nonce: relayNonce,
              tx_b64: bytesToBase64(signed.serialize()),
            }));
          } catch (err) {
            clearTimeout(timer);
            finishErr(err instanceof Error ? err : new Error(String(err)));
          }
        })();
      }
    };
  });
}

function parseWsJson(data: unknown): Record<string, unknown> {
  const raw =
    typeof data === "string"
      ? data
      : data instanceof ArrayBuffer
        ? new TextDecoder().decode(data)
        : ArrayBuffer.isView(data)
          ? new TextDecoder().decode(data)
          : String(data);
  return JSON.parse(raw) as Record<string, unknown>;
}

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function base64ToBytes(s: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    return Uint8Array.from(Buffer.from(s, "base64"));
  }
  const raw = atob(s);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
