"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkewRfqSession = exports.SkewRfqClient = void 0;
const web3_js_1 = require("@solana/web3.js");
const instant_rfq_1 = require("./instant-rfq");
const pda_1 = require("./pda");
const STRIKE_BANDS_BPS = {
    BTC: [7000, 13000],
    ETH: [7000, 13000],
    SOL: [4500, 15500],
    XRP: [5000, 15000],
    HYPE: [5500, 14500],
};
const STRIKE_STEP_USD = {
    BTC: 250,
    ETH: 10,
    SOL: 1,
    XRP: 0.01,
    HYPE: 0.5,
};
const OPTION_TYPE_INDEX = {
    vanilla_call: 0,
    vanilla_put: 0,
    digital_call: 1,
    digital_put: 1,
    capped_call: 2,
    capped_put: 2,
    range_accrual: 3,
    vanilla_inverse_call: 4,
    vanilla_inverse_put: 4,
    digital_inverse_call: 5,
    digital_inverse_put: 5,
};
const OPTION_TYPE_NAME = {
    0: "Vanilla",
    1: "Digital",
    2: "CappedVanilla",
    3: "RangeAccrual",
    4: "VanillaInverse",
    5: "DigitalInverse",
};
function isUnderlying(value) {
    return value === "BTC" || value === "ETH" || value === "SOL" || value === "XRP" || value === "HYPE";
}
function normalizeUnderlying(args) {
    const raw = (args.asset ?? args.underlying)?.toUpperCase();
    if (!raw || !isUnderlying(raw)) {
        throw new Error("rfq.request requires asset/underlying BTC|ETH|SOL|XRP|HYPE");
    }
    return raw;
}
function parseExpiry(expiry) {
    if (typeof expiry === "number") {
        return (0, pda_1.expiryTsFromTenorDays)(expiry);
    }
    if (expiry instanceof Date) {
        return BigInt(Math.floor(expiry.getTime() / 1000));
    }
    const trimmed = String(expiry).trim().toLowerCase();
    const tenorMatch = /^(\d+)d$/.exec(trimmed);
    if (tenorMatch) {
        return (0, pda_1.expiryTsFromTenorDays)(Number(tenorMatch[1]));
    }
    const ms = Date.parse(String(expiry));
    if (!Number.isFinite(ms)) {
        throw new Error(`rfq.request expiry is not a tenor or ISO timestamp: ${expiry}`);
    }
    return BigInt(Math.floor(ms / 1000));
}
function resolveSettlementMint(skew, raw) {
    if (raw === undefined || String(raw).trim() === "" || String(raw).toUpperCase() === "USDC") {
        return skew.usdcMintPublicKey;
    }
    if (raw instanceof web3_js_1.PublicKey)
        return raw;
    const upper = raw.trim().toUpperCase();
    if (upper === "SOL" || upper === "WSOL")
        return pda_1.NATIVE_SOL_MINT;
    if (upper === "JITO" || upper === "JITOSOL")
        return pda_1.JITOSOL_MINT;
    return new web3_js_1.PublicKey(raw);
}
function optionDirection(payoff, direction) {
    if (payoff === "range_accrual")
        return 0;
    const mapped = (0, pda_1.mapPayoffToAnchor)(payoff);
    return (0, pda_1.directionToI8)(direction ?? mapped.defaultDirection);
}
function assertStrikeGrid(asset, strike, context) {
    const step = STRIKE_STEP_USD[asset];
    const units = strike / step;
    if (Math.abs(units - Math.round(units)) > 1e-9) {
        throw new Error(`${context}: ${asset} strike ${strike} is off-grid; use ${step >= 1 ? `$${step}` : `$${step.toFixed(2)}`} strike increments.`);
    }
}
function amountFromUnits(units, decimals) {
    return Number(units) / 10 ** decimals;
}
function unitsFromPremium(args) {
    const value = args.maxPremium ?? args.maxPremiumUsd;
    if (value === undefined)
        return undefined;
    if (args.settlementDecimals !== 6 && args.maxPremiumUsd !== undefined && args.maxPremium === undefined) {
        throw new Error(`${args.context}: maxPremiumUsd is only unambiguous for USDC settlement; use maxPremium for base settlement`);
    }
    if (!Number.isFinite(value) || value < 0) {
        throw new Error(`${args.context}: premium cap must be a non-negative number`);
    }
    return BigInt(Math.round(value * 10 ** args.settlementDecimals));
}
function optionTypeFromWire(optionType, direction) {
    if (optionType === 0)
        return direction === -1 ? "vanilla_put" : "vanilla_call";
    if (optionType === 1)
        return direction === -1 ? "digital_put" : "digital_call";
    if (optionType === 2)
        return direction === -1 ? "capped_put" : "capped_call";
    if (optionType === 3)
        return "range_accrual";
    if (optionType === 4)
        return direction === -1 ? "vanilla_inverse_put" : "vanilla_inverse_call";
    if (optionType === 5)
        return direction === -1 ? "digital_inverse_put" : "digital_inverse_call";
    throw new Error(`Unsupported RFQ option_type ${optionType}`);
}
function parseRelayMessage(data) {
    const raw = typeof data === "string"
        ? data
        : data instanceof ArrayBuffer
            ? new TextDecoder().decode(data)
            : ArrayBuffer.isView(data)
                ? new TextDecoder().decode(data)
                : String(data);
    return JSON.parse(raw);
}
function serializeJson(value) {
    return JSON.parse(JSON.stringify(value, (_key, item) => (typeof item === "bigint" ? item.toString() : item)));
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function timeoutError(label, timeoutMs) {
    return new Error(`${label} timed out after ${timeoutMs}ms`);
}
function isAlreadyInitializedError(err) {
    const text = err instanceof Error ? err.message : String(err);
    return text.includes("already in use") || text.includes("AccountAlreadyInitialized") || text.includes("idempotent_already_registered");
}
function isAlreadyFinalizedAuctionError(err) {
    const text = err instanceof Error ? err.message : String(err);
    return text.includes("AuctionNotOpen") || text.includes("already finalized") || text.includes("Closed") || text.includes("Settled");
}
async function waitForAuctionSnapshot(args) {
    const deadline = Date.now() + args.timeoutMs;
    let last = null;
    while (Date.now() <= deadline) {
        last = await args.skew.fetchRfqAuction(args.auction);
        if (last) {
            const quoteCount = last.bestQuoteMm ? 1 : 0;
            if (quoteCount >= args.minQuotes)
                return last;
            if (!args.requireQuote && last.state !== "Open")
                return last;
        }
        await sleep(Math.min(args.pollMs, Math.max(1, deadline - Date.now())));
    }
    if (!last) {
        throw timeoutError("rfq.auctionAndFill auction registration readback", args.timeoutMs);
    }
    if (args.requireQuote && !last.bestQuoteMm) {
        throw new Error("rfq.auctionAndFill: no on-chain Auction RFQ quote was received; refusing to fall back to the legacy pre-funded bridge. Start/register a maker, submit an auction quote, or use skew.rfq.request() for direct Instant PM fill.");
    }
    return last;
}
async function waitUntilAuctionClosable(args) {
    const deadline = Date.now() + args.timeoutMs;
    while (Date.now() <= deadline) {
        const currentSlot = BigInt(await args.skew.solanaConnection.getSlot("confirmed"));
        if (currentSlot >= args.snapshot.auctionCloseSlot)
            return;
        await sleep(Math.min(args.pollMs, Math.max(1, deadline - Date.now())));
    }
    throw timeoutError("rfq.auctionAndFill waiting for auction close_slot", args.timeoutMs);
}
async function waitForBestQuoteMatching(args) {
    const deadline = Date.now() + args.timeoutMs;
    while (Date.now() <= deadline) {
        const candidates = args.session.quotesSeen.filter((quote) => {
            if (args.maker && !quote.maker.equals(args.maker))
                return false;
            if (args.maxPremiumUnits !== undefined && quote.premiumUnits > args.maxPremiumUnits)
                return false;
            return true;
        });
        if (candidates.length > 0) {
            if (args.settleMs && args.settleMs > 0)
                await sleep(args.settleMs);
            const settled = args.session.quotesSeen.filter((quote) => {
                if (args.maker && !quote.maker.equals(args.maker))
                    return false;
                if (args.maxPremiumUnits !== undefined && quote.premiumUnits > args.maxPremiumUnits)
                    return false;
                return true;
            });
            return settled.reduce((best, quote) => (quote.premiumUnits < best.premiumUnits ? quote : best), settled[0]);
        }
        await sleep(Math.min(250, Math.max(1, deadline - Date.now())));
    }
    const makerText = args.maker ? ` from maker ${args.maker.toBase58()}` : "";
    throw new Error(`rfq.auctionAndFill: no matching Instant RFQ quote${makerText}; official Auction execution does not fall back to pre-funded settlement.`);
}
class SkewRfqClient {
    constructor(skew) {
        this.skew = skew;
        this.maker = {
            serve: (args) => serveMakerOnce(this.skew, args),
        };
    }
    async buildRequest(args) {
        const asset = normalizeUnderlying(args);
        const payoff = args.payoff;
        const optionType = OPTION_TYPE_INDEX[payoff];
        if (optionType === undefined)
            throw new Error(`Unsupported RFQ payoff: ${payoff}`);
        assertStrikeGrid(asset, args.strike, "rfq.request");
        const expiryTs = parseExpiry(args.expiry);
        (0, pda_1.assertExpiryTenor)(asset, expiryTs, { context: "rfq.request" });
        const settlementMint = resolveSettlementMint(this.skew, args.settlementMint);
        const settlementDecimals = (0, pda_1.settlementMintDecimals)(settlementMint);
        const direction = optionDirection(payoff, args.direction);
        const upperBoundInput = args.upperBoundUsd ?? args.upperBound ?? args.extraParam;
        const createLike = {
            underlying: asset,
            payoff,
            strike: args.strike,
            expiry: new Date(Number(expiryTs) * 1000).toISOString(),
            notional: args.notional,
            extraParam: args.extraParam ?? upperBoundInput,
            upperBound: args.upperBound ?? args.upperBoundUsd,
            settlementMint,
        };
        const mapped = (0, pda_1.mapPayoffToAnchor)(payoff);
        const extraParam = payoff.startsWith("capped") ? mapped.extraParam(createLike) : Number(args.extraParam ?? 0);
        const upperBound = payoff === "range_accrual"
            ? (0, pda_1.toOnChainStrike)(upperBoundInput ?? Number.NaN)
            : 0n;
        if (payoff === "range_accrual" && (!Number.isFinite(upperBoundInput) || Number(upperBoundInput) <= args.strike)) {
            throw new Error("rfq.request range_accrual requires upperBoundUsd greater than strike");
        }
        const optionSpec = {
            asset: (0, pda_1.assetEnumIndex)(asset),
            strike: (0, pda_1.toOnChainStrike)(args.strike),
            expiryTs,
            payoffAmountMicro: (0, pda_1.toSettlementUnits)(args.notional, settlementMint),
            optionType,
            direction,
            upperBound,
            extraParam,
        };
        const maxPremiumUnits = unitsFromPremium({
            maxPremiumUsd: args.maxPremiumUsd,
            maxPremium: args.maxPremium,
            settlementDecimals,
            context: "rfq.request",
        });
        const oraclePreflight = args.skipMoneynessPreflight
            ? undefined
            : await this.validateMoneyness(asset, args.strike);
        const relayRequest = {
            asset: optionSpec.asset,
            option_type: optionSpec.optionType,
            direction: optionSpec.direction,
            strike: optionSpec.strike.toString(),
            expiry_ts: optionSpec.expiryTs.toString(),
            payoff_amount: optionSpec.payoffAmountMicro.toString(),
            settlement_decimals: settlementDecimals,
            upper_bound: optionSpec.upperBound.toString(),
            extra_param: optionSpec.extraParam ?? 0,
            settlement_mint: settlementMint.toBase58(),
            underlying: asset,
            payoff,
        };
        if (maxPremiumUnits !== undefined) {
            relayRequest["max_premium"] = maxPremiumUnits.toString();
            relayRequest["max_premium_micro"] = maxPremiumUnits.toString();
        }
        return {
            asset,
            payoff,
            strike: args.strike,
            notional: args.notional,
            expiryTs,
            expiryIso: new Date(Number(expiryTs) * 1000).toISOString(),
            settlementMint,
            settlementDecimals,
            optionSpec,
            relayRequest,
            maxPremiumUnits,
            oraclePreflight,
        };
    }
    async request(args) {
        const built = await this.buildRequest(args);
        const session = new SkewRfqSession(this.skew, built, {
            relayUrl: args.relayUrl,
            quoteTimeoutMs: args.quoteTimeoutMs,
            quoteExpirySeconds: args.quoteExpirySeconds,
        });
        await session.open();
        return session;
    }
    async stream(args) {
        const session = await this.request(args);
        return session.quotes();
    }
    /**
     * Official Auction RFQ execution wrapper.
     *
     * Auction RFQ is price discovery only: register, collect firm on-chain quotes,
     * and finalize/refund escrow. The actual PM-backed option issuance is then
     * forced through the Instant RFQ relay's `atomic_fill_from_relay` lane.
     * This method intentionally refuses to fall back to the legacy pre-funded
     * bridge when the auction or matching instant quote is missing.
     */
    async auctionAndFill(args) {
        const built = await this.buildRequest(args);
        if (!built.settlementMint.equals(this.skew.usdcMintPublicKey)) {
            throw new Error("rfq.auctionAndFill: Auction RFQ v1 is USDC/stable-only; use direct rfq.request() for non-USDC settlement rails.");
        }
        const premiumCapUsd = args.maxPremiumUsd ?? args.maxPremium;
        if (premiumCapUsd === undefined || !Number.isFinite(premiumCapUsd) || premiumCapUsd <= 0) {
            throw new Error("rfq.auctionAndFill requires maxPremiumUsd/maxPremium so the auction escrow and Instant accept cap are explicit.");
        }
        const auctionId = args.auctionId ?? (0, pda_1.generateNonce)();
        const durationSlots = BigInt(args.auctionDurationSlots ?? 30);
        const pollMs = args.auctionPollMs ?? 750;
        const auctionWaitMs = args.auctionWaitMs ?? Math.max(45000, Number(durationSlots) * 550 + 15000);
        const minAuctionQuotes = args.minAuctionQuotes ?? 1;
        const requireAuctionQuote = args.requireAuctionQuote !== false;
        const requireInstantMakerMatchesAuction = args.requireInstantMakerMatchesAuction !== false;
        const registered = await this.skew.registerRfqAuction({
            auctionId,
            optionSpec: built.optionSpec,
            maxPremiumUsdc: premiumCapUsd,
            durationSlots,
            settlementMint: built.settlementMint,
            isBlockTrade: args.isBlockTrade,
            minimumSizeMicro: args.minimumSizeMicro,
            eligibleMakerCount: args.eligibleMakerCount,
        });
        let snapshot = await this.skew.fetchRfqAuction(registered.auction);
        await args.onAuctionRegistered?.({
            auctionId,
            auction: registered.auction,
            escrow: registered.escrow,
            registerTxSignature: registered.txSignature,
            request: built,
            snapshot,
        });
        snapshot = await waitForAuctionSnapshot({
            skew: this.skew,
            auction: registered.auction,
            timeoutMs: auctionWaitMs,
            pollMs,
            minQuotes: minAuctionQuotes,
            requireQuote: requireAuctionQuote,
        });
        let finalizeTxSignature = null;
        if (args.finalizeAuction !== false) {
            await waitUntilAuctionClosable({
                skew: this.skew,
                snapshot,
                pollMs,
                timeoutMs: auctionWaitMs,
            });
            try {
                const finalized = await this.skew.finalizeRfqAuction({ auction: registered.auction });
                finalizeTxSignature = finalized.txSignature;
            }
            catch (err) {
                const afterError = await this.skew.fetchRfqAuction(registered.auction);
                if (!afterError || afterError.state === "Open" || !isAlreadyFinalizedAuctionError(err)) {
                    throw err;
                }
            }
        }
        const finalizedSnapshot = await this.skew.fetchRfqAuction(registered.auction);
        const auctionQuoteMaker = finalizedSnapshot?.bestQuoteMm ?? snapshot.bestQuoteMm;
        const auctionQuotePremiumMicro = finalizedSnapshot?.bestQuotePremiumMicro ?? snapshot.bestQuotePremiumMicro;
        const auctionQuotePremiumUsd = auctionQuotePremiumMicro === null ? null : Number(auctionQuotePremiumMicro) / 1000000;
        const instantPremiumCapUsd = auctionQuotePremiumUsd === null ? premiumCapUsd : Math.min(premiumCapUsd, auctionQuotePremiumUsd);
        const instantPremiumCapUnits = BigInt(Math.round(instantPremiumCapUsd * 1000000));
        const instantSession = await this.request({
            ...args,
            maxPremiumUsd: instantPremiumCapUsd,
            quoteTimeoutMs: args.instantQuoteTimeoutMs ?? args.quoteTimeoutMs,
        });
        let fill;
        try {
            const quote = await waitForBestQuoteMatching({
                session: instantSession,
                maker: requireInstantMakerMatchesAuction ? auctionQuoteMaker : null,
                maxPremiumUnits: instantPremiumCapUnits,
                timeoutMs: args.instantQuoteTimeoutMs ?? args.quoteTimeoutMs ?? 60000,
                settleMs: args.instantSettleMs ?? 500,
            });
            fill = await instantSession.accept(quote, {
                maxPremiumUsd: instantPremiumCapUsd,
                timeoutMs: args.instantHitTimeoutMs,
            });
        }
        catch (err) {
            instantSession.close();
            throw err;
        }
        const readbackErrors = [...fill.readbackErrors];
        if (fill.executionLane !== "instant_rfq_atomic_fill") {
            readbackErrors.push(`unexpected fill lane ${fill.executionLane}`);
        }
        if (!fill.pmBacked || fill.pmGuarantee !== "guaranteed") {
            readbackErrors.push("Instant PM fill did not return the guaranteed PM receipt");
        }
        return {
            success: true,
            executionLane: "auction_to_instant_pm_fill",
            pmBacked: true,
            pmGuarantee: "guaranteed",
            auction: {
                auctionId,
                pda: registered.auction.toBase58(),
                escrow: registered.escrow.toBase58(),
                registerTxSignature: registered.txSignature,
                finalizeTxSignature,
                stateBeforeFill: snapshot.state,
                stateAfterFinalize: finalizedSnapshot?.state ?? null,
                bestQuoteMm: auctionQuoteMaker?.toBase58() ?? null,
                bestQuotePremiumMicro: auctionQuotePremiumMicro,
                bestQuotePremiumUsd: auctionQuotePremiumUsd,
                usedAsInstantMakerFilter: requireInstantMakerMatchesAuction && auctionQuoteMaker !== null,
            },
            fill,
            readbackOk: readbackErrors.length === 0,
            readbackErrors,
        };
    }
    async validateMoneyness(asset, strike) {
        const oracle = await readOnChainOracleSpot(this.skew, asset);
        const [minBps, maxBps] = STRIKE_BANDS_BPS[asset];
        const strikeBps = Math.round((strike / oracle.spotUsd) * 10000);
        const strikeMinUsd = oracle.spotUsd * minBps / 10000;
        const strikeMaxUsd = oracle.spotUsd * maxBps / 10000;
        if (strikeBps < minBps || strikeBps > maxBps) {
            throw new Error(`rfq.request moneyness preflight failed: ${asset} strike $${strike.toLocaleString("en-US")} ` +
                `is outside ${oracle.source} band $${strikeMinUsd.toFixed(2)}..$${strikeMaxUsd.toFixed(2)} ` +
                `(spot $${oracle.spotUsd.toFixed(2)}, allowed ${minBps / 100}%..${maxBps / 100}% of spot).`);
        }
        return {
            source: oracle.source,
            spotUsd: oracle.spotUsd,
            strikeMinUsd,
            strikeMaxUsd,
            strikeBps,
        };
    }
}
exports.SkewRfqClient = SkewRfqClient;
class SkewRfqSession {
    constructor(skew, request, options = {}) {
        this.skew = skew;
        this.request = request;
        this.options = options;
        this.ws = null;
        this.opened = false;
        this.closed = false;
        this.failure = null;
        this.relayNonceValue = null;
        this.quoteQueue = [];
        this.waiters = [];
        this.endTimer = null;
        this.status = "open";
        this.tradeState = "RFQ_REQUESTED";
        this.clearingState = "NOT_APPLICABLE";
    }
    get relayNonce() {
        return this.relayNonceValue;
    }
    get quotesSeen() {
        return this.quoteQueue;
    }
    get bestQuote() {
        return this.quoteQueue.reduce((best, quote) => (best === null || quote.premiumUnits < best.premiumUnits ? quote : best), null);
    }
    async open() {
        if (this.opened)
            return;
        this.opened = true;
        const relayUrl = this.options.relayUrl ?? instant_rfq_1.INSTANT_RFQ_DEFAULT_RELAY_URL;
        const quoteTimeoutMs = this.options.quoteTimeoutMs ?? 60000;
        const ackTimeoutMs = Math.min(10000, quoteTimeoutMs);
        await new Promise((resolve, reject) => {
            const ws = new WebSocket(relayUrl);
            this.ws = ws;
            let settled = false;
            const ackTimer = setTimeout(() => {
                if (settled)
                    return;
                settled = true;
                this.fail(timeoutError("rfq.request relay ack", ackTimeoutMs));
                reject(this.failure);
            }, ackTimeoutMs);
            this.endTimer = setTimeout(() => this.finish("expired"), quoteTimeoutMs);
            ws.onerror = () => {
                const err = new Error("rfq.request relay websocket error");
                if (!settled) {
                    settled = true;
                    clearTimeout(ackTimer);
                    this.fail(err);
                    reject(err);
                }
                else {
                    this.fail(err);
                }
            };
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    kind: "identify",
                    role: "buyer",
                    pubkey: this.skew.walletPublicKey.toBase58(),
                }));
                ws.send(JSON.stringify({
                    ...this.request.relayRequest,
                    kind: "quote_request",
                    buyer_pubkey: this.skew.walletPublicKey.toBase58(),
                }));
            };
            ws.onmessage = (event) => {
                try {
                    const msg = parseRelayMessage(event.data);
                    const kind = typeof msg["kind"] === "string" ? String(msg["kind"]) : "";
                    if (kind === "quote_request_ack") {
                        this.relayNonceValue = BigInt(String(msg["relay_nonce"]));
                        if (!settled) {
                            settled = true;
                            clearTimeout(ackTimer);
                            resolve();
                        }
                        return;
                    }
                    if (kind === "quote_ack") {
                        const quote = this.parseQuote(msg);
                        if (quote) {
                            this.tradeState = "QUOTE_RECEIVED";
                            this.pushQuote(quote);
                        }
                        return;
                    }
                    if (kind === "fill_failed" || kind === "error") {
                        this.fail(new Error(`rfq.request relay failure: ${String(msg["reason"] ?? msg["error"] ?? "unknown")}`));
                    }
                }
                catch (err) {
                    this.fail(err instanceof Error ? err : new Error(String(err)));
                }
            };
            ws.onclose = () => {
                if (!this.closed && this.status === "open")
                    this.finish("expired");
            };
        });
    }
    async *quotes() {
        let idx = 0;
        while (true) {
            if (idx < this.quoteQueue.length) {
                yield this.quoteQueue[idx];
                idx += 1;
                continue;
            }
            if (this.failure)
                throw this.failure;
            if (this.closed)
                return;
            await this.waitForChange();
        }
    }
    async waitForQuotes(options = {}) {
        const minQuotes = options.minQuotes ?? 1;
        const timeoutMs = options.timeoutMs ?? 60000;
        const deadline = Date.now() + timeoutMs;
        while (this.quoteQueue.length < minQuotes) {
            if (this.failure)
                throw this.failure;
            if (this.closed)
                break;
            const remaining = deadline - Date.now();
            if (remaining <= 0)
                throw timeoutError("rfq.waitForQuotes", timeoutMs);
            await this.waitForChange(remaining);
        }
        return [...this.quoteQueue];
    }
    async waitForBestQuote(options = {}) {
        const timeoutMs = options.timeoutMs ?? 60000;
        await this.waitForQuotes({ minQuotes: 1, timeoutMs });
        if (options.settleMs && options.settleMs > 0) {
            await sleep(options.settleMs);
        }
        const best = this.bestQuote;
        if (!best)
            throw new Error("rfq.waitForBestQuote: no quote received");
        return best;
    }
    async accept(quote = this.bestQuote, options = {}) {
        if (!quote)
            throw new Error("rfq.accept requires a quote; call waitForBestQuote() first");
        if (this.relayNonceValue === null)
            throw new Error("rfq.accept called before relay nonce was assigned");
        const maxPremiumUnits = unitsFromPremium({
            maxPremiumUsd: options.maxPremiumUsd,
            maxPremium: options.maxPremium,
            settlementDecimals: this.request.settlementDecimals,
            context: "rfq.accept",
        });
        if (maxPremiumUnits !== undefined && quote.premiumUnits > maxPremiumUnits) {
            throw new Error(`rfq.accept quote premium ${quote.premium} exceeds cap ${amountFromUnits(maxPremiumUnits, this.request.settlementDecimals)}`);
        }
        const preMakerCm = await this.skew.fetchClearingMember(quote.maker);
        const preBuyerPortfolio = await this.skew.getPortfolio(this.skew.walletPublicKey);
        const seriesPrerequisite = await ensureSeriesListed(this.skew, this.request);
        const payload = (0, instant_rfq_1.buildRelayPayload)({
            relayNonce: this.relayNonceValue,
            optionSpec: this.request.optionSpec,
            premiumMicro: quote.premiumUnits,
            settlementMint: this.request.settlementMint,
            settlementDecimals: this.request.settlementDecimals,
            quoteExpiryTs: BigInt(Math.floor(Date.now() / 1000) +
                (options.quoteExpirySeconds ?? this.options.quoteExpirySeconds ?? instant_rfq_1.INSTANT_RFQ_DEFAULT_QUOTE_EXPIRY_SECONDS)),
            buyer: this.skew.walletPublicKey,
        });
        this.tradeState = "ACCEPT_REQUESTED";
        this.clearingState = "PENDING_CLEARING";
        let result;
        try {
            result = await (0, instant_rfq_1.hitInstantRfqQuoteTxSigned)({
                buyer: this.skew.walletPublicKey,
                cmPubkey: quote.maker,
                payload,
                relayUrl: this.options.relayUrl,
                timeoutMs: options.timeoutMs ?? instant_rfq_1.INSTANT_RFQ_DEFAULT_HIT_TIMEOUT_MS,
                signTransaction: (tx) => this.skew.signTransaction(tx),
            });
        }
        catch (err) {
            this.tradeState = "REJECTED";
            this.clearingState = "REJECTED";
            this.fail(err instanceof Error ? err : new Error(String(err)));
            throw err;
        }
        this.status = "filled";
        this.tradeState = result.tradeState ?? "FILLED";
        this.clearingState = result.clearingState ?? "FILLED";
        this.close();
        let option = null;
        for (let attempt = 0; attempt < 10; attempt += 1) {
            const listed = await this.skew.listOptions({ pda: result.optionPda, limit: 1 }).catch(() => []);
            if (listed[0]) {
                option = listed[0];
                break;
            }
            await sleep(500);
        }
        const [postMakerCm, postBuyerPortfolio, postMakerPortfolio] = await Promise.all([
            this.skew.fetchClearingMember(quote.maker),
            this.skew.getPortfolio(this.skew.walletPublicKey),
            this.skew.getPortfolio(quote.maker),
        ]);
        const buyerHasLong = postBuyerPortfolio.longOptions.some((summary) => summary.pda === result.optionPda);
        const makerHasShort = postMakerPortfolio.shortOptions.some((summary) => summary.pda === result.optionPda);
        const readbackErrors = [];
        if (!option) {
            readbackErrors.push("option PDA was not readable after fill");
        }
        else {
            if (option.creator !== quote.makerBase58) {
                readbackErrors.push(`option creator mismatch: expected ${quote.makerBase58}, got ${option.creator}`);
            }
            if (option.holder !== this.skew.walletPublicKey.toBase58()) {
                readbackErrors.push(`option holder mismatch: expected ${this.skew.walletPublicKey.toBase58()}, got ${option.holder}`);
            }
        }
        if (!buyerHasLong)
            readbackErrors.push("buyer portfolio does not contain filled long");
        if (!makerHasShort)
            readbackErrors.push("maker portfolio does not contain filled short");
        const preLocked = preMakerCm?.totalPmLockedMicro ?? 0n;
        const postLocked = postMakerCm?.totalPmLockedMicro ?? 0n;
        const delta = postLocked >= preLocked ? postLocked - preLocked : 0n;
        const notionalUnits = this.request.optionSpec.payoffAmountMicro;
        const prePositionsCount = preMakerCm?.positionsCount ?? null;
        const postPositionsCount = postMakerCm?.positionsCount ?? null;
        const registryUpdated = makerHasShort &&
            (prePositionsCount === null ||
                postPositionsCount === null ||
                postPositionsCount >= prePositionsCount + 1);
        return {
            success: true,
            executionLane: "instant_rfq_atomic_fill",
            tradeState: result.tradeState ?? "FILLED",
            clearingState: result.clearingState ?? "FILLED",
            pmBacked: true,
            pmGuarantee: "guaranteed",
            registryUpdated,
            rejectionReason: result.rejectionReason,
            relayEventId: result.relayEventId,
            relaySequence: result.relaySequence,
            serverTimeMs: result.serverTimeMs,
            txSignature: result.txSignature,
            explorer: `https://explorer.solana.com/tx/${result.txSignature}?cluster=devnet`,
            optionPda: result.optionPda,
            quote,
            request: this.request,
            option,
            margin: {
                notional: this.request.notional,
                notionalUnits,
                preTotalPmLockedUsd: preMakerCm ? Number(preLocked) / 1000000 : null,
                postTotalPmLockedUsd: postMakerCm ? Number(postLocked) / 1000000 : null,
                pmLockedDeltaUsd: Number(delta) / 1000000,
                pmLockedDeltaPctOfNotional: pctOf(delta, notionalUnits),
                postLastImUsd: postMakerCm ? Number(postMakerCm.lastImMicro) / 1000000 : null,
                postLastImPctOfNotional: postMakerCm ? pctOf(postMakerCm.lastImMicro, notionalUnits) : null,
                freeCollateralUsd: postMakerCm ? Number(postMakerCm.freeCollateralMicro) / 1000000 : null,
                prePositionsCount,
                postPositionsCount,
                riskPreflight: result.riskPreflight,
            },
            portfolio: {
                buyerBefore: preBuyerPortfolio,
                buyerAfter: postBuyerPortfolio,
                makerAfter: postMakerPortfolio,
                buyerHasLong,
                makerHasShort,
            },
            readbackOk: readbackErrors.length === 0,
            readbackErrors,
            seriesPrerequisite,
        };
    }
    close() {
        this.finish(this.status === "open" ? "cancelled" : this.status);
    }
    parseQuote(msg) {
        const relayNonce = msg["relay_nonce"];
        if (relayNonce === undefined || relayNonce === null)
            return null;
        if (this.relayNonceValue !== null && String(relayNonce) !== this.relayNonceValue.toString())
            return null;
        const maker = String(msg["cm_pubkey"] ?? msg["cmPubkey"] ?? msg["mm"] ?? "");
        const premium = msg["premium_micro"] ?? msg["premiumMicro"];
        if (!maker || premium === undefined || premium === null)
            return null;
        const premiumUnits = BigInt(String(premium));
        const premiumAmount = amountFromUnits(premiumUnits, this.request.settlementDecimals);
        return {
            id: `${relayNonce}:${maker}:${premiumUnits.toString()}`,
            tradeState: "QUOTE_RECEIVED",
            relayNonce: BigInt(String(relayNonce)),
            maker: new web3_js_1.PublicKey(maker),
            makerBase58: maker,
            premiumUnits,
            premium: premiumAmount,
            premiumUsd: this.request.settlementDecimals === 6 ? premiumAmount : undefined,
            ttlSeconds: msg["ttl_seconds"] === undefined || msg["ttl_seconds"] === null
                ? null
                : Number(msg["ttl_seconds"]),
            receivedAt: msg["received_at"] === undefined || msg["received_at"] === null
                ? Date.now()
                : Number(msg["received_at"]),
            relayEventId: typeof msg["event_id"] === "string" ? msg["event_id"] : undefined,
            relaySequence: typeof msg["sequence"] === "number" && Number.isFinite(msg["sequence"])
                ? msg["sequence"]
                : undefined,
            serverTimeMs: typeof msg["server_time_ms"] === "number" && Number.isFinite(msg["server_time_ms"])
                ? msg["server_time_ms"]
                : undefined,
            raw: serializeJson(msg),
        };
    }
    pushQuote(quote) {
        this.quoteQueue.push(quote);
        this.notify();
    }
    waitForChange(timeoutMs) {
        return new Promise((resolve, reject) => {
            let timer = null;
            const done = () => {
                if (timer)
                    clearTimeout(timer);
                resolve();
            };
            this.waiters.push(done);
            if (timeoutMs !== undefined) {
                timer = setTimeout(() => {
                    const idx = this.waiters.indexOf(done);
                    if (idx >= 0)
                        this.waiters.splice(idx, 1);
                    reject(timeoutError("rfq stream", timeoutMs));
                }, timeoutMs);
            }
        });
    }
    notify() {
        const waiters = this.waiters.splice(0);
        for (const waiter of waiters)
            waiter();
    }
    fail(err) {
        this.failure = err;
        this.status = "failed";
        this.finish("failed");
    }
    finish(status) {
        if (this.closed)
            return;
        this.closed = true;
        this.status = status;
        if (status === "expired") {
            this.tradeState = "EXPIRED";
            this.clearingState = "NOT_APPLICABLE";
        }
        if (status === "cancelled") {
            this.tradeState = "CANCELLED";
            this.clearingState = "NOT_APPLICABLE";
        }
        if (status === "failed") {
            this.tradeState = "REJECTED";
            this.clearingState = "REJECTED";
        }
        if (this.endTimer)
            clearTimeout(this.endTimer);
        try {
            this.ws?.close();
        }
        catch {
            /* noop */
        }
        this.notify();
    }
}
exports.SkewRfqSession = SkewRfqSession;
async function readOnChainOracleSpot(skew, asset) {
    const feed = (0, pda_1.resolvePythFeed)(asset);
    const info = await skew.solanaConnection.getAccountInfo(feed, "confirmed").catch(() => null);
    const data = info?.data;
    if (data && data.length >= 104 && data.readUInt32LE(0) === 0xa1b2c3d4) {
        const expo = data.readInt32LE(20);
        const price = Number(data.readBigInt64LE(48));
        const spotUsd = price * Math.pow(10, expo);
        if (Number.isFinite(spotUsd) && spotUsd > 0) {
            return { source: "devnet-pyth", spotUsd };
        }
    }
    return { source: "hermes", spotUsd: await (0, pda_1.fetchPythSpotUsd)(asset) };
}
async function ensureSeriesListed(skew, request) {
    const direction = request.optionSpec.direction;
    const optionType = request.optionSpec.optionType;
    const [series] = (0, pda_1.findSeriesListingPda)(request.optionSpec.asset, request.optionSpec.strike, request.optionSpec.expiryTs, optionType, direction);
    const existing = await skew.solanaConnection.getAccountInfo(series, "confirmed");
    if (existing !== null) {
        return { status: "already_listed", series: series.toBase58(), account_size: existing.data.length };
    }
    try {
        const listed = await skew.listSeries({
            asset: request.optionSpec.asset,
            strikeMicro: request.optionSpec.strike,
            expiryTs: request.optionSpec.expiryTs,
            optionTypeName: OPTION_TYPE_NAME[optionType],
            direction,
        });
        return { status: "listed", series: listed.series.toBase58(), tx_signature: listed.txSignature };
    }
    catch (err) {
        const after = await skew.solanaConnection.getAccountInfo(series, "confirmed");
        if (after !== null) {
            return {
                status: "listed_by_race",
                series: series.toBase58(),
                account_size: after.data.length,
                recovered_from: err instanceof Error ? err.message.slice(0, 240) : String(err).slice(0, 240),
            };
        }
        throw err;
    }
}
function pctOf(value, denominator) {
    if (denominator <= 0n)
        return null;
    return Number(value) / Number(denominator) * 100;
}
async function serveMakerOnce(skew, args) {
    const relayUrl = args.relayUrl ?? instant_rfq_1.INSTANT_RFQ_DEFAULT_RELAY_URL;
    const timeoutMs = args.timeoutMs ?? 10 * 60 * 1000;
    const quoteTtlSeconds = args.quoteTtlSeconds ?? instant_rfq_1.INSTANT_RFQ_DEFAULT_QUOTE_EXPIRY_SECONDS;
    if (args.autoPrepare !== false) {
        await prepareMaker(skew, args);
    }
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(relayUrl);
        let done = false;
        let quoteRequest = null;
        let quoteAck = null;
        let marginPreview = null;
        const finishOk = (out) => {
            if (done)
                return;
            done = true;
            try {
                ws.close();
            }
            catch {
                /* noop */
            }
            resolve(out);
        };
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
        const timer = setTimeout(() => {
            finishErr(timeoutError(quoteRequest ? "rfq.maker.serve fill" : "rfq.maker.serve quote_request", timeoutMs));
        }, timeoutMs);
        ws.onerror = () => {
            clearTimeout(timer);
            finishErr(new Error("rfq.maker.serve relay websocket error"));
        };
        ws.onopen = () => {
            ws.send(JSON.stringify({
                kind: "identify",
                role: "cm",
                pubkey: skew.walletPublicKey.toBase58(),
            }));
        };
        ws.onmessage = (event) => {
            void (async () => {
                try {
                    const msg = parseRelayMessage(event.data);
                    const kind = typeof msg["kind"] === "string" ? String(msg["kind"]) : "";
                    if (kind === "quote_request") {
                        if (quoteRequest !== null)
                            return;
                        const parsed = makerRequestFromRelay(msg);
                        if (!makerFilterMatches(parsed, args.filters))
                            return;
                        if (args.autoPrepare !== false && args.refreshPmCacheBeforeQuote !== false) {
                            await refreshMakerCache(skew, parsed.asset).catch(() => undefined);
                        }
                        const quote = args.quote
                            ? await args.quote(parsed)
                            : {
                                premiumUsd: args.premiumUsd,
                                premium: args.premium,
                                ttlSeconds: quoteTtlSeconds,
                            };
                        if (!quote)
                            return;
                        const units = quote.premiumUnits ?? unitsFromPremium({
                            maxPremiumUsd: quote.premiumUsd,
                            maxPremium: quote.premium,
                            settlementDecimals: Number(msg["settlement_decimals"] ?? 6) === 9 ? 9 : 6,
                            context: "rfq.maker.quote",
                        });
                        if (units === undefined || units <= 0n) {
                            throw new Error("rfq.maker quote must return premiumUsd, premium, or premiumUnits");
                        }
                        quoteRequest = parsed;
                        quoteAck = {
                            kind: "quote_ack",
                            relay_nonce: parsed.relayNonce.toString(),
                            premium_micro: units.toString(),
                            ttl_seconds: quote.ttlSeconds ?? quoteTtlSeconds,
                        };
                        ws.send(JSON.stringify(quoteAck));
                        return;
                    }
                    if (kind === "maker_margin_preview") {
                        marginPreview = serializeJson(msg);
                        return;
                    }
                    if (kind === "fill_consent") {
                        if (quoteRequest === null)
                            return;
                        const relayNonce = String(msg["relay_nonce"] ?? "");
                        const payloadHex = String(msg["payload_hex"] ?? "");
                        if (!relayNonce || !payloadHex)
                            throw new Error("fill_consent missing relay_nonce or payload_hex");
                        const payloadBytes = Uint8Array.from(Buffer.from(payloadHex, "hex"));
                        const { relayPayloadDigest } = await Promise.resolve().then(() => __importStar(require("./instant-rfq")));
                        const digest = relayPayloadDigest(payloadBytes);
                        const sig = await args.signDigest(digest, quoteRequest);
                        if (sig.length !== 64)
                            throw new Error(`rfq.maker signDigest must return 64 bytes, got ${sig.length}`);
                        ws.send(JSON.stringify({
                            kind: "cm_sign",
                            relay_nonce: relayNonce,
                            cm_sig_b64: Buffer.from(sig).toString("base64"),
                        }));
                        return;
                    }
                    if (kind === "fill_executed") {
                        if (quoteRequest === null || quoteAck === null)
                            return;
                        clearTimeout(timer);
                        const cm = await skew.fetchClearingMember(skew.walletPublicKey).catch(() => null);
                        finishOk({
                            filled: true,
                            maker: skew.walletPublicKey.toBase58(),
                            quoteRequest,
                            quoteAck,
                            marginPreview,
                            fillExecuted: serializeJson(msg),
                            clearingMemberAfter: cm,
                        });
                        return;
                    }
                    if (kind === "fill_failed" || kind === "error") {
                        clearTimeout(timer);
                        finishErr(new Error(`rfq.maker.serve relay failure: ${String(msg["reason"] ?? msg["error"] ?? "unknown")}\n${JSON.stringify(serializeJson(msg), null, 2)}`));
                    }
                }
                catch (err) {
                    clearTimeout(timer);
                    finishErr(err instanceof Error ? err : new Error(String(err)));
                }
            })();
        };
    });
}
async function prepareMaker(skew, args) {
    const initialCollateralUsdc = args.initialCollateralUsdc ?? 1000;
    const cm = await skew.fetchClearingMember(skew.walletPublicKey).catch(() => null);
    if (cm === null) {
        await skew.registerClearingMember({ initialCollateralUsdc });
    }
    await skew.initVolumeTracker().catch((err) => {
        if (!isAlreadyInitializedError(err))
            throw err;
    });
    await skew.registerRfqMaker();
    const firstAsset = args.filters?.assets?.[0] ?? "BTC";
    await refreshMakerCache(skew, firstAsset).catch(() => undefined);
}
async function refreshMakerCache(skew, asset) {
    const spot = await readOnChainOracleSpot(skew, asset).then((x) => x.spotUsd).catch(() => 0);
    await skew.refreshPmCacheFull(spot);
}
function makerRequestFromRelay(msg) {
    const assetIdx = Number(msg["asset"]);
    const asset = ["BTC", "ETH", "SOL", "XRP", "HYPE"][assetIdx];
    if (!asset)
        throw new Error(`rfq.maker received unsupported asset ${assetIdx}`);
    const optionType = Number(msg["option_type"]);
    const direction = Number(msg["direction"]);
    const payoff = optionTypeFromWire(optionType, direction);
    return {
        relayNonce: BigInt(String(msg["relay_nonce"])),
        asset,
        payoff,
        strike: Number(BigInt(String(msg["strike"]))) / 100000000,
        expiryTs: BigInt(String(msg["expiry_ts"])),
        notional: Number(BigInt(String(msg["payoff_amount"]))) / 1000000,
        raw: serializeJson(msg),
    };
}
function makerFilterMatches(request, filters) {
    if (!filters)
        return true;
    if (filters.assets && !filters.assets.includes(request.asset))
        return false;
    if (filters.payoffs && !filters.payoffs.includes(request.payoff))
        return false;
    return true;
}
//# sourceMappingURL=rfq.js.map