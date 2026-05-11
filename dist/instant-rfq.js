"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RfqWalletMessageSigningUnsupported = exports.RELAY_PAYLOAD_LEN = exports.INSTANT_RFQ_DEFAULT_HIT_TIMEOUT_MS = exports.INSTANT_RFQ_DEFAULT_COLLECT_TIMEOUT_MS = exports.INSTANT_RFQ_DEFAULT_QUOTE_EXPIRY_SECONDS = exports.INSTANT_RFQ_DEFAULT_RELAY_URL = void 0;
exports.validateInstantRfqLane = validateInstantRfqLane;
exports.buildRelayPayload = buildRelayPayload;
exports.encodeRelayPayload = encodeRelayPayload;
exports.relayPayloadDigest = relayPayloadDigest;
exports.relayPayloadToJson = relayPayloadToJson;
exports.collectInstantRfqQuotes = collectInstantRfqQuotes;
exports.hitInstantRfqQuoteTxSigned = hitInstantRfqQuoteTxSigned;
exports.hitInstantRfqQuote = hitInstantRfqQuote;
const web3_js_1 = require("@solana/web3.js");
const sha256_1 = require("@noble/hashes/sha256");
const pda_1 = require("./pda");
exports.INSTANT_RFQ_DEFAULT_RELAY_URL = "wss://skew-relay-devnet.fly.dev/subscribe";
exports.INSTANT_RFQ_DEFAULT_QUOTE_EXPIRY_SECONDS = 600;
exports.INSTANT_RFQ_DEFAULT_COLLECT_TIMEOUT_MS = 60000;
exports.INSTANT_RFQ_DEFAULT_HIT_TIMEOUT_MS = 120000;
// Phase 7-H · F3.1 (2026-05-09) — v2 buyer-binding cutover. Bumped 100 → 132 B
// to append the buyer Pubkey at offsets 100..132. Closes a relay-compromise
// loophole where a stolen `cm_sig` could be reused against any buyer wallet.
// The on-chain handler now binds `payload.buyer == ctx.accounts.buyer.key()`
// and the digest covers the buyer pubkey too. v1 (100 B) clients hit
// UnauthorizedRelayPayload (6068) on the first signed digest verify.
exports.RELAY_PAYLOAD_LEN = 132;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _relayPayloadKeyParityCheck = true;
class RfqWalletMessageSigningUnsupported extends Error {
    constructor(cause) {
        super("This wallet cannot sign arbitrary Solana messages for Instant RFQ. Use hitInstantRfqQuoteTxSigned, which only requires a normal transaction signature.");
        this.code = "RFQ_WALLET_MESSAGE_SIGNING_UNSUPPORTED";
        this.name = "RfqWalletMessageSigningUnsupported";
        if (cause !== undefined) {
            this.cause = cause;
        }
    }
}
exports.RfqWalletMessageSigningUnsupported = RfqWalletMessageSigningUnsupported;
function validateInstantRfqLane(payload) {
    const mint = new web3_js_1.PublicKey(payload.settlementMint);
    const physicalSolSettlement = mint.equals(pda_1.JITOSOL_MINT) || mint.equals(pda_1.NATIVE_SOL_MINT);
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
function buildRelayPayload(args) {
    const now = BigInt(Math.floor(Date.now() / 1000));
    const mintBytes = args.settlementMint instanceof web3_js_1.PublicKey
        ? args.settlementMint.toBytes()
        : args.settlementMint;
    const buyerBytes = args.buyer instanceof web3_js_1.PublicKey ? args.buyer.toBytes() : args.buyer;
    const payload = {
        relayNonce: args.relayNonce,
        quoteExpiryTs: args.quoteExpiryTs ?? now + BigInt(exports.INSTANT_RFQ_DEFAULT_QUOTE_EXPIRY_SECONDS),
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
        buyer: buyerBytes,
    };
    validateInstantRfqLane(payload);
    return payload;
}
function encodeRelayPayload(payload) {
    if (payload.settlementMint.length !== 32) {
        throw new Error(`settlementMint must be 32 bytes, got ${payload.settlementMint.length}`);
    }
    if (payload.buyer.length !== 32) {
        throw new Error(`buyer must be 32 bytes, got ${payload.buyer.length}`);
    }
    const buf = new ArrayBuffer(exports.RELAY_PAYLOAD_LEN);
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
    // Phase 7-H · F3.1 (2026-05-09) — v2 buyer at offsets 100..132.
    out.set(payload.buyer, 100);
    return out;
}
function relayPayloadDigest(payloadOrBytes) {
    const bytes = payloadOrBytes instanceof Uint8Array
        ? payloadOrBytes
        : encodeRelayPayload(payloadOrBytes);
    if (bytes.length !== exports.RELAY_PAYLOAD_LEN) {
        throw new Error(`payload must be ${exports.RELAY_PAYLOAD_LEN} bytes, got ${bytes.length}`);
    }
    return (0, sha256_1.sha256)(bytes);
}
function exactMessageBytes(bytes) {
    const out = new Uint8Array(bytes.length);
    out.set(bytes);
    return out;
}
function relayPayloadToJson(payload) {
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
        // Phase 7-H · F3.1 (2026-05-09) — v2 buyer-binding. The relay overwrites
        // this server-side from the authenticated session pubkey before signing
        // the digest, but we serialize what the SDK has so the wire shape stays
        // canonical.
        buyer: Array.from(payload.buyer),
    };
}
async function collectInstantRfqQuotes(args) {
    const relayUrl = args.relayUrl ?? exports.INSTANT_RFQ_DEFAULT_RELAY_URL;
    const timeoutMs = args.timeoutMs ?? exports.INSTANT_RFQ_DEFAULT_COLLECT_TIMEOUT_MS;
    const maxQuotes = args.maxQuotes ?? 8;
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(relayUrl);
        let relayNonce = null;
        const quotes = [];
        let done = false;
        const finish = () => {
            if (done)
                return;
            done = true;
            try {
                ws.close();
            }
            catch {
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
            if (kind !== "quote_ack")
                return;
            if (relayNonce !== null && String(msg.relay_nonce) !== relayNonce.toString())
                return;
            const cm = String(msg.cm_pubkey ?? msg.cmPubkey ?? msg.mm ?? "");
            const premium = msg.premium_micro ?? msg.premiumMicro;
            if (!cm || premium === undefined || premium === null)
                return;
            quotes.push({
                relayNonce: BigInt(String(msg.relay_nonce)),
                cmPubkey: new web3_js_1.PublicKey(cm),
                premiumMicro: BigInt(String(premium)),
                ttlSeconds: msg.ttl_seconds === undefined || msg.ttl_seconds === null
                    ? null
                    : Number(msg.ttl_seconds),
                receivedAt: msg.received_at === undefined || msg.received_at === null
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
/**
 * Browser-safe Instant RFQ hit path.
 *
 * The buyer does not sign an arbitrary digest. Instead, the relay prepares the
 * exact atomic_fill_from_relay transaction after the selected CM signs the
 * payload digest, then the browser wallet signs that transaction normally.
 */
async function hitInstantRfqQuoteTxSigned(args) {
    validateInstantRfqLane(args.payload);
    return hitInstantRfqQuoteInternal({
        ...args,
        kind: "buyer_accept_tx_signed",
    });
}
/**
 * Legacy bot/HSM Instant RFQ hit path. Kept for server wallets that can sign a
 * detached Ed25519 digest. Browser wallets should use
 * hitInstantRfqQuoteTxSigned to avoid Phantom/Solflare signMessage failures.
 */
async function hitInstantRfqQuote(args) {
    if (typeof args.signMessage !== "function") {
        throw new RfqWalletMessageSigningUnsupported();
    }
    validateInstantRfqLane(args.payload);
    const digest = relayPayloadDigest(args.payload);
    let sig;
    try {
        sig = await args.signMessage(exactMessageBytes(digest));
    }
    catch (cause) {
        throw new RfqWalletMessageSigningUnsupported(cause);
    }
    if (sig.length !== 64) {
        throw new Error(`buyer signature must be 64 bytes, got ${sig.length}`);
    }
    return hitInstantRfqQuoteInternal({
        ...args,
        kind: "buyer_accept",
        buyerSig: sig,
    });
}
async function hitInstantRfqQuoteInternal(args) {
    const relayUrl = args.relayUrl ?? exports.INSTANT_RFQ_DEFAULT_RELAY_URL;
    const timeoutMs = args.timeoutMs ?? exports.INSTANT_RFQ_DEFAULT_HIT_TIMEOUT_MS;
    validateInstantRfqLane(args.payload);
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(relayUrl);
        const relayNonce = args.payload.relayNonce.toString();
        let done = false;
        let simulatedUnits;
        let premiumDestination;
        let autoPreparedAccounts;
        let riskPreflight;
        const finishErr = (err) => {
            if (done)
                return;
            done = true;
            try {
                ws.close();
            }
            catch {
                /* noop */
            }
            reject(err);
        };
        const finishOk = (result) => {
            if (done)
                return;
            done = true;
            try {
                ws.close();
            }
            catch {
                /* noop */
            }
            resolve(result);
        };
        const timer = setTimeout(() => finishErr(new Error("instant RFQ hit timed out waiting for fill_executed")), timeoutMs);
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
                kind: args.kind,
                payload: relayPayloadToJson(args.payload),
                ...(args.buyerSig ? { buyer_sig_b64: bytesToBase64(args.buyerSig) } : {}),
                buyer_pubkey: args.buyer.toBase58(),
                cm_pubkey: args.cmPubkey.toBase58(),
            }));
        };
        ws.onmessage = (event) => {
            const msg = parseWsJson(event.data);
            if (String(msg.relay_nonce ?? "") !== relayNonce)
                return;
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
                        if (!txB64)
                            throw new Error("buyer_tx_request missing tx_b64");
                        simulatedUnits =
                            typeof msg.simulated_units === "number" ? msg.simulated_units : undefined;
                        premiumDestination =
                            typeof msg.premium_destination === "string" ? msg.premium_destination : undefined;
                        autoPreparedAccounts = Array.isArray(msg.auto_prepared_accounts)
                            ? msg.auto_prepared_accounts.map(String)
                            : undefined;
                        if (typeof msg.risk_preflight === "object" && msg.risk_preflight !== null) {
                            const rp = msg.risk_preflight;
                            const maybeBigInt = (v) => v === undefined || v === null ? undefined : BigInt(String(v));
                            const preImMicro = maybeBigInt(rp.pre_im_micro);
                            const postImMicro = maybeBigInt(rp.post_im_micro);
                            const requiredDeltaMicro = maybeBigInt(rp.required_delta_micro);
                            const freeCollateralMicro = maybeBigInt(rp.free_collateral_micro);
                            const afterFillFreeMicro = maybeBigInt(rp.after_fill_free_micro);
                            const marginalImLockedMicro = maybeBigInt(rp.marginal_im_locked_micro);
                            const feeMicro = maybeBigInt(rp.fee_micro);
                            const premiumMicro = maybeBigInt(rp.premium_micro);
                            riskPreflight = {
                                status: typeof rp.status === "string" ? rp.status : undefined,
                                preImMicro,
                                preImUsd: microToUsd(preImMicro),
                                postImMicro,
                                postImUsd: microToUsd(postImMicro),
                                requiredDeltaMicro,
                                requiredDeltaUsd: microToUsd(requiredDeltaMicro),
                                freeCollateralMicro,
                                freeCollateralUsd: microToUsd(freeCollateralMicro),
                                afterFillFreeMicro,
                                afterFillFreeUsd: microToUsd(afterFillFreeMicro),
                                healthBeforeBps: maybeBigInt(rp.health_before_bps),
                                healthAfterBps: maybeBigInt(rp.health_after_bps),
                                marginalImLockedMicro,
                                marginalImLockedUsd: microToUsd(marginalImLockedMicro),
                                marginalImLockedPctOfNotional: microPercentOf(marginalImLockedMicro, args.payload.payoffAmount),
                                feeMicro,
                                feeUsd: microToUsd(feeMicro),
                                premiumMicro,
                                premiumUsd: microToUsd(premiumMicro),
                                mmp: typeof rp.mmp === "string" ? rp.mmp : undefined,
                                positionAccounts: typeof rp.position_accounts === "number" ? rp.position_accounts : undefined,
                            };
                        }
                        const txBytes = base64ToBytes(txB64);
                        let tx;
                        try {
                            tx = web3_js_1.VersionedTransaction.deserialize(txBytes);
                        }
                        catch {
                            tx = web3_js_1.Transaction.from(txBytes);
                        }
                        const signed = await args.signTransaction(tx);
                        ws.send(JSON.stringify({
                            kind: "buyer_tx_signed",
                            relay_nonce: relayNonce,
                            tx_b64: bytesToBase64(signed.serialize()),
                        }));
                    }
                    catch (err) {
                        clearTimeout(timer);
                        finishErr(err instanceof Error ? err : new Error(String(err)));
                    }
                })();
            }
        };
    });
}
function parseWsJson(data) {
    const raw = typeof data === "string"
        ? data
        : data instanceof ArrayBuffer
            ? new TextDecoder().decode(data)
            : ArrayBuffer.isView(data)
                ? new TextDecoder().decode(data)
                : String(data);
    return JSON.parse(raw);
}
function bytesToBase64(bytes) {
    if (typeof Buffer !== "undefined") {
        return Buffer.from(bytes).toString("base64");
    }
    let s = "";
    for (const b of bytes)
        s += String.fromCharCode(b);
    return btoa(s);
}
function microToUsd(value) {
    return value === undefined ? undefined : Number(value) / 1000000;
}
function microPercentOf(value, denominator) {
    if (value === undefined || denominator === undefined || denominator <= 0n)
        return undefined;
    return Number(value) / Number(denominator) * 100;
}
function base64ToBytes(s) {
    if (typeof Buffer !== "undefined") {
        return Uint8Array.from(Buffer.from(s, "base64"));
    }
    const raw = atob(s);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++)
        out[i] = raw.charCodeAt(i);
    return out;
}
//# sourceMappingURL=instant-rfq.js.map