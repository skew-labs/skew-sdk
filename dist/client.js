"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkewClient = void 0;
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@coral-xyz/anchor");
const spl_token_1 = require("@solana/spl-token");
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const pda_1 = require("./pda");
const errors_1 = require("./generated/errors");
const OptionAccount_1 = require("./generated/accounts/OptionAccount");
const rfq_1 = require("./rfq");
// Devnet USDC mint — overridable via SKEW_DEVNET_USDC_MINT env var.
const DEVNET_USDC_MINT = new web3_js_1.PublicKey(process.env["SKEW_DEVNET_USDC_MINT"] ?? "4T2KU8PXd25XvMh6kzv3F7d55yPP6NcS7HemERBe97K8");
const PM_MIN_CU_LIMIT = 400000;
const PM_MAX_CU_LIMIT = 1000000;
const RFQ_QUOTE_DIRECT_CU_LIMIT = 80000;
const RFQ_QUOTE_ED25519_CU_LIMIT = 120000;
const RFQ_TAKE_BEST_CU_LIMIT = 90000;
const MAKER_AXE_CU_LIMIT = 110000;
const LEGACY_CM_ACCOUNT_SIZE = 144;
const LEGACY_RFQ_MAKER_REGISTRY_SIZE = 104;
const RFQ_MAKER_MIN_BALANCE_LAMPORTS = 1020000000;
const OPTION_ACCOUNT_SIZE = 288;
const OPTION_ACCOUNT_DISCRIMINATOR_B58 = "EkCYUNaERC7";
const DEFAULT_SKEW_WEB_URL = "https://skew-web.vercel.app";
function estimatePmCuLimit(remainingAccountCount) {
    const count = Math.max(0, Math.floor(remainingAccountCount));
    return Math.min(PM_MAX_CU_LIMIT, Math.max(PM_MIN_CU_LIMIT, 300000 + count * 25000));
}
function pubkeyishToBase58(value) {
    return value instanceof web3_js_1.PublicKey ? value.toBase58() : value;
}
function defaultSkewWebUrl() {
    const env = typeof process !== "undefined"
        ? process.env["SKEW_WEB_URL"] ?? process.env["NEXT_PUBLIC_SKEW_WEB_URL"]
        : undefined;
    return env && env.trim().length > 0 ? env : DEFAULT_SKEW_WEB_URL;
}
function apiUrl(pathname, webUrl) {
    const base = (webUrl ?? defaultSkewWebUrl()).replace(/\/+$/, "");
    return new URL(pathname, `${base}/`);
}
function setOptionalParam(url, key, value) {
    if (value === undefined)
        return;
    if (typeof value === "boolean") {
        url.searchParams.set(key, value ? "1" : "0");
        return;
    }
    url.searchParams.set(key, String(value));
}
async function fetchJson(url, timeoutMs = 10000) {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => {
        ctrl.abort(new DOMException(`Skew API ${url.pathname} timed out`, "TimeoutError"));
    }, timeoutMs);
    let res;
    try {
        res = await fetch(url.toString(), {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: ctrl.signal,
        });
    }
    catch (err) {
        if (err instanceof DOMException && (err.name === "AbortError" || err.name === "TimeoutError")) {
            throw new Error(`Skew API ${url.pathname} timed out after ${timeoutMs}ms`);
        }
        throw err;
    }
    finally {
        clearTimeout(timeout);
    }
    const text = await res.text();
    let parsed;
    try {
        parsed = text.length > 0 ? JSON.parse(text) : {};
    }
    catch {
        parsed = { error: text };
    }
    if (!res.ok) {
        const message = parsed && typeof parsed === "object" && "error" in parsed
            ? typeof parsed.error === "string"
                ? String(parsed.error)
                : JSON.stringify(parsed.error)
            : `HTTP ${res.status}`;
        throw new Error(`Skew API ${url.pathname} failed: ${message}`);
    }
    return parsed;
}
async function postJson(url, body, timeoutMs = 10000) {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => {
        ctrl.abort(new DOMException(`Skew API ${url.pathname} timed out`, "TimeoutError"));
    }, timeoutMs);
    let res;
    try {
        res = await fetch(url.toString(), {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            signal: ctrl.signal,
        });
    }
    catch (err) {
        if (err instanceof DOMException && (err.name === "AbortError" || err.name === "TimeoutError")) {
            throw new Error(`Skew API ${url.pathname} timed out after ${timeoutMs}ms`);
        }
        throw err;
    }
    finally {
        clearTimeout(timeout);
    }
    const text = await res.text();
    let parsed;
    try {
        parsed = text.length > 0 ? JSON.parse(text) : {};
    }
    catch {
        parsed = { error: text };
    }
    if (!res.ok) {
        const message = parsed && typeof parsed === "object" && "error" in parsed
            ? typeof parsed.error === "string"
                ? String(parsed.error)
                : JSON.stringify(parsed.error)
            : `HTTP ${res.status}`;
        throw new Error(`Skew API ${url.pathname} failed: ${message}`);
    }
    return parsed;
}
function payoffFromRfqSpec(args) {
    const isPut = args.direction < 0;
    switch (args.optionType) {
        case 0:
            return isPut ? "vanilla_put" : "vanilla_call";
        case 1:
            return isPut ? "digital_put" : "digital_call";
        case 2:
            return isPut ? "capped_put" : "capped_call";
        case 3:
            return "range_accrual";
        case 4:
            throw new Error("createOptionFromRfqAuction: inverse RFQs are not supported by USDC Auction RFQ v1; use Instant RFQ physical/CM lane");
        case 5:
            throw new Error("createOptionFromRfqAuction: inverse RFQs are not supported by USDC Auction RFQ v1; use Instant RFQ physical/CM lane");
        default:
            throw new Error(`Unsupported RFQ option type code: ${args.optionType}`);
    }
}
function createParamsFromRfqAuctionSnapshot(snap) {
    const underlying = (0, pda_1.indexToUnderlying)(snap.optionSpec.asset);
    if (!underlying) {
        throw new Error(`RFQ auction has unsupported asset index ${snap.optionSpec.asset}`);
    }
    const payoff = payoffFromRfqSpec({
        optionType: snap.optionSpec.optionType,
        direction: snap.optionSpec.direction,
    });
    const params = {
        underlying,
        payoff,
        strike: (0, pda_1.fromOnChainStrike)(snap.optionSpec.strike),
        expiry: new Date(Number(snap.optionSpec.expiryTs) * 1000).toISOString(),
        notional: (0, pda_1.fromUsdcUnits)(snap.optionSpec.payoffAmountMicro),
    };
    if (snap.optionSpec.optionType === 2) {
        if (snap.optionSpec.upperBound === 0n) {
            throw new Error("createOptionFromRfqAuction: capped RFQ requires upper_bound as cap strike");
        }
        params.upperBound = (0, pda_1.fromOnChainStrike)(snap.optionSpec.upperBound);
        params.extraParam = params.upperBound;
    }
    if (snap.optionSpec.optionType === 3) {
        if (snap.optionSpec.upperBound === 0n) {
            throw new Error("createOptionFromRfqAuction: range RFQ requires upper_bound");
        }
        params.upperBound = (0, pda_1.fromOnChainStrike)(snap.optionSpec.upperBound);
        params.extraParam = params.upperBound;
    }
    return params;
}
function parseProgramErrorCode(text) {
    const match = /custom program error:\s*(0x[0-9a-f]+|\d+)/i.exec(text);
    if (!match)
        return null;
    const raw = match[1];
    return raw.startsWith("0x") ? Number.parseInt(raw.slice(2), 16) : Number.parseInt(raw, 10);
}
function extractCustomProgramErrorCode(value) {
    if (typeof value === "string")
        return parseProgramErrorCode(value);
    if (Array.isArray(value)) {
        for (const item of value) {
            const nested = extractCustomProgramErrorCode(item);
            if (nested !== null)
                return nested;
        }
        return null;
    }
    if (typeof value !== "object" || value === null)
        return null;
    const record = value;
    const custom = record["Custom"];
    if (typeof custom === "number" && Number.isInteger(custom))
        return custom;
    if (typeof custom === "string" && /^[0-9]+$/.test(custom))
        return Number.parseInt(custom, 10);
    const message = record["message"];
    if (typeof message === "string") {
        const parsed = parseProgramErrorCode(message);
        if (parsed !== null)
            return parsed;
    }
    for (const item of Object.values(record)) {
        const nested = extractCustomProgramErrorCode(item);
        if (nested !== null)
            return nested;
    }
    return null;
}
/**
 * SkewClient — the machine gate to Skew infrastructure.
 *
 * Construction (one canonical path — `fromProgram`):
 * ```ts
 * import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };
 * const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
 * const program  = new Program(idl as any, provider);
 * const skew     = SkewClient.fromProgram(connection, wallet, program);
 *
 * const opt = await skew.create({ underlying: "BTC", payoff: "vanilla_call", strike: 80_000, expiry: "2026-05-10T16:00:00Z", notional: 1_000 });
 * await skew.buy(opt.address, 50);
 * await skew.settle(opt.address);
 * ```
 *
 * The default `new SkewClient(...)` constructor is intentionally lower-level
 * (consumed only by `fromProgram`). It throws on first method call if you
 * skipped `fromProgram` — guard rail to prevent the empty-IDL footgun.
 */
class SkewClient {
    /** Authority pubkey backing this client (matches anchor `cm.authority`
     *  for register_clearing_member / cm_add_collateral / etc). Read-only. */
    get walletPublicKey() {
        return this.wallet.publicKey;
    }
    /** Read-only access for high-level SDK facades that need RPC account checks. */
    get solanaConnection() {
        return this.connection;
    }
    /** Settlement mint used by default for USDC/stable flows. */
    get usdcMintPublicKey() {
        return this.usdcMint;
    }
    constructor(connection, wallet, options = {}) {
        // Lazy-init: never instantiate a stub Program. Anchor 0.31's
        // `new Program(idl, provider)` calls `translateAddress(idl.address)` which
        // crashes on empty/missing fields — so we hold an optional and assert on use.
        this.program = undefined;
        this.connection = connection;
        this.wallet = wallet;
        const _programId = options.programId ? new web3_js_1.PublicKey(options.programId) : pda_1.SKEW_PROGRAM_ID;
        void _programId;
        this.usdcMint = options.usdcMint ? new web3_js_1.PublicKey(options.usdcMint) : DEVNET_USDC_MINT;
        this.rfq = new rfq_1.SkewRfqClient(this);
        // Note: do NOT instantiate Program here. Use SkewClient.fromProgram(...)
        // to load with a real IDL.
    }
    /**
     * Load the SDK with a pre-built Program instance — the canonical entry point.
     *
     * @example
     *   import idl from "@skew-labs/sdk/idl/skew_master.json" assert { type: "json" };
     *   const program = new Program(idl as any, provider);
     *   const skew    = SkewClient.fromProgram(connection, wallet, program);
     */
    static fromProgram(connection, wallet, program, usdcMint) {
        const client = new SkewClient(connection, wallet);
        client.program = program;
        if (usdcMint)
            client.usdcMint = usdcMint;
        return client;
    }
    _program() {
        if (!this.program) {
            throw new Error("SkewClient: Program is not loaded. Use `SkewClient.fromProgram(connection, wallet, program)` " +
                "after `new Program(idl, provider)`. See @skew-labs/sdk/README for setup.");
        }
        return this.program;
    }
    /** Back-compat alias for guard checks. */
    _assertProgramLoaded() {
        this._program();
    }
    /** Sign a transaction with the configured wallet. Used by RFQ accept flows. */
    async signTransaction(tx) {
        return this.wallet.signTransaction(tx);
    }
    _collateralPolicy() {
        return (0, pda_1.findCollateralPolicyPda)()[0];
    }
    async _signApiMessage(message) {
        const bytes = new TextEncoder().encode(message);
        const walletWithPayer = this.wallet;
        const secretKey = walletWithPayer.payer?.secretKey;
        if (secretKey) {
            return Buffer.from(tweetnacl_1.default.sign.detached(bytes, secretKey)).toString("base64");
        }
        const walletWithMessage = this.wallet;
        if (typeof walletWithMessage.signMessage === "function") {
            const signature = await walletWithMessage.signMessage(bytes);
            return Buffer.from(signature).toString("base64");
        }
        throw new Error("SkewClient: this wallet cannot sign API messages. Use a Keypair-backed MCP/Node wallet or a wallet adapter with signMessage.");
    }
    _secondaryListingMessage(args) {
        return [
            "skew.secondary_listing.v1",
            `option_pda=${args.optionPda}`,
            `option_token_mint=${args.optionTokenMint}`,
            `seller=${args.seller}`,
            `ask_price_usdc=${args.askPriceUsdc}`,
            `token_amount=${args.tokenAmount}`,
            `duration_hours=${args.durationHours}`,
            `seller_handle=${args.sellerHandle ?? ""}`,
        ].join("\n");
    }
    _secondaryBuyIntentMessage(args) {
        return [
            "skew.secondary_buy_intent.v1",
            `listing_id=${args.listingId}`,
            `option_pda=${args.optionPda}`,
            `seller=${args.seller}`,
            `buyer=${args.buyer}`,
            `payment_tx_sig=${args.paymentTxSig}`,
            `ask_price_usdc=${args.askPriceUsdc}`,
        ].join("\n");
    }
    /**
     * Read the live CollateralPolicyPda mint allowlist for this deployment.
     *
     * `getSkewCapabilities()` tells you what the protocol can support in
     * principle. This method tells you what the currently deployed program has
     * actually allowlisted at runtime, so bots/agents can preflight wSOL/jitoSOL
     * or custom devnet mints before sending a mutating instruction.
     */
    async fetchCollateralPolicy() {
        this._assertProgramLoaded();
        const pda = this._collateralPolicy();
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.collateralPolicyPda.fetch(pda);
            const entryCount = Math.min(Number(acc.entryCount ?? 0), 8);
            const entries = (acc.entries ?? [])
                .slice(0, entryCount)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((entry) => {
                const kindCode = Number(entry.kind ?? 255);
                return {
                    mint: entry.mint,
                    decimals: Number(entry.decimals ?? 0),
                    kindCode,
                    kind: collateralPolicyKindLabel(kindCode),
                    oracleFeed: entry.oracleFeed,
                    maxDepegBps: Number(entry.maxDepegBps ?? 0),
                };
            });
            return {
                pda,
                initialized: true,
                bump: Number(acc.bump ?? 0),
                entryCount,
                entries,
            };
        }
        catch {
            return {
                pda,
                initialized: false,
                bump: null,
                entryCount: 0,
                entries: [],
            };
        }
    }
    async _requireCollateralPolicyMint(mint) {
        const policy = await this.fetchCollateralPolicy();
        if (!policy.initialized) {
            throw new Error(`CollateralPolicyPda is not initialized at ${policy.pda.toBase58()}. ` +
                "Run initCollateralPolicy/registerCollateralPolicyEntry on this deployment before custody writes.");
        }
        const entry = policy.entries.find((x) => x.mint.equals(mint));
        if (!entry) {
            const allowlist = policy.entries.map((x) => `${x.kind}:${x.mint.toBase58()}`).join(", ");
            throw new Error(`Settlement/collateral mint ${mint.toBase58()} is not registered in CollateralPolicyPda. ` +
                `Registered mints: ${allowlist || "(none)"}. Call fetchCollateralPolicy() before routing.`);
        }
    }
    async _requireUsdcBalance(ata, amountMicro, context) {
        let acc;
        try {
            acc = await (0, spl_token_1.getAccount)(this.connection, ata, "confirmed", spl_token_1.TOKEN_PROGRAM_ID);
        }
        catch (err) {
            if (err instanceof spl_token_1.TokenAccountNotFoundError ||
                err instanceof spl_token_1.TokenInvalidAccountOwnerError) {
                throw new Error(`${context}: buyer USDC token account is not initialized. ` +
                    "Use the devnet faucet/top-up flow first, then submit the RFQ again.");
            }
            throw err;
        }
        if (acc.mint && !acc.mint.equals(this.usdcMint)) {
            throw new Error(`${context}: settlement token account mint mismatch`);
        }
        const available = BigInt(acc.amount.toString());
        if (available < amountMicro) {
            const need = Number(amountMicro) / 1000000;
            const have = Number(available) / 1000000;
            throw new Error(`${context}: insufficient devnet USDC for RFQ escrow. ` +
                `Need ${need.toFixed(2)} USDC, have ${have.toFixed(2)} USDC. ` +
                "Use the devnet faucet/top-up flow first, then submit again.");
        }
    }
    async _ensureClearingMemberLayout(authority = this.wallet.publicKey) {
        const [cm] = (0, pda_1.findClearingMemberPda)(authority);
        const info = await this.connection.getAccountInfo(cm, "confirmed");
        if (!info || info.data.length !== LEGACY_CM_ACCOUNT_SIZE)
            return null;
        const tx = await this._program()
            .methods.cmReallocV2()
            .accounts({
            authority,
            cm,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        return this._sendAndConfirm(tx);
    }
    async _ensureRfqMakerRegistryLayout(mm = this.wallet.publicKey) {
        const [registry] = (0, pda_1.findRfqMakerPda)(mm);
        const info = await this.connection.getAccountInfo(registry, "confirmed");
        if (!info || info.data.length !== LEGACY_RFQ_MAKER_REGISTRY_SIZE)
            return null;
        const tx = await this._program()
            .methods.rfqMakerReallocV2()
            .accounts({
            mm,
            registry,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        return this._sendAndConfirm(tx);
    }
    _hamiltonRemaining() {
        return [0, 1, 2, 3, 4].map((assetIdx) => ({
            pubkey: (0, pda_1.findHamiltonPda)(assetIdx)[0],
            isWritable: false,
            isSigner: false,
        }));
    }
    _povsRemaining() {
        return [0, 1, 2, 3, 4].map((assetIdx) => ({
            pubkey: (0, pda_1.findPovsStatePda)(assetIdx)[0],
            isWritable: false,
            isSigner: false,
        }));
    }
    async _positionRegistryRemaining(authority) {
        const [registry] = (0, pda_1.findPositionRegistryPda)(authority);
        const metas = [{ pubkey: registry, isWritable: false, isSigner: false }];
        const info = await this.connection.getAccountInfo(registry, "confirmed");
        if (!info || info.data.length < 80)
            return metas;
        const count = Math.min(info.data[73] ?? 0, 32);
        for (let i = 0; i < count; i++) {
            const off = 80 + i * 32;
            metas.push({
                pubkey: new web3_js_1.PublicKey(info.data.subarray(off, off + 32)),
                isWritable: false,
                isSigner: false,
            });
        }
        return metas;
    }
    async _registryContains(authority, optionPda) {
        const [registry] = (0, pda_1.findPositionRegistryPda)(authority);
        const info = await this.connection.getAccountInfo(registry, "confirmed");
        if (!info || info.data.length < 80)
            return false;
        const count = Math.min(info.data[73] ?? 0, 32);
        for (let i = 0; i < count; i++) {
            const off = 80 + i * 32;
            if (new web3_js_1.PublicKey(info.data.subarray(off, off + 32)).equals(optionPda))
                return true;
        }
        return false;
    }
    async _pmRemaining(authority) {
        return [
            ...(await this._positionRegistryRemaining(authority)),
            ...this._povsRemaining(),
            ...this._hamiltonRemaining(),
        ];
    }
    async _settleCmOptionalAccounts(optionPda, creator) {
        if (!(await this._registryContains(creator, optionPda))) {
            return { creatorCm: null, positionRegistry: null, creatorCmCollateralAta: null };
        }
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(creator);
        const [creatorCm] = (0, pda_1.findClearingMemberPda)(creator);
        const [creatorCmCollateralAta] = (0, pda_1.findCmEscrowPda)(creatorCm);
        return { creatorCm, positionRegistry, creatorCmCollateralAta };
    }
    async _settleHolderOptionalAccounts(optionPda, holder, creator) {
        if (holder.equals(web3_js_1.PublicKey.default) ||
            (creator !== undefined && holder.equals(creator)) ||
            !(await this._registryContains(holder, optionPda))) {
            return { holderCm: null, holderPositionRegistry: null };
        }
        const [holderCm] = (0, pda_1.findClearingMemberPda)(holder);
        const [holderPositionRegistry] = (0, pda_1.findPositionRegistryPda)(holder);
        return { holderCm, holderPositionRegistry };
    }
    async _buildUntrackHeldPositionIx(optionPda, holder) {
        if (!(await this._registryContains(holder, optionPda)))
            return null;
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        if (holder.equals(creator))
            return null;
        const [cm] = (0, pda_1.findClearingMemberPda)(holder);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(holder);
        const [optionTokenMint] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const holderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMint, holder, false, spl_token_1.TOKEN_PROGRAM_ID);
        return this._program()
            .methods.untrackHeldPosition()
            .accounts({
            holder,
            cm,
            positionRegistry,
            option: optionPda,
            optionTokenMint,
            holderOptionAta,
        })
            .instruction();
    }
    async _settleCollateralLockOptionalAccounts(optionPda, creator) {
        const [lock] = (0, pda_1.findOptionCollateralLockPda)(optionPda);
        const info = await this.connection.getAccountInfo(lock, "confirmed");
        if (!info || info.data.length < 73) {
            return {
                optionCollateralLock: null,
                lstVault: null,
                lstVaultAta: null,
                nativeSolVault: null,
                nativeSolVaultAta: null,
            };
        }
        const kind = info.data[72] ?? 0;
        if (kind === 2) {
            const [lstVault] = (0, pda_1.findLstVaultPda)(creator, pda_1.JITOSOL_MINT);
            const [lstVaultAta] = (0, pda_1.findLstVaultEscrowPda)(lstVault);
            return {
                optionCollateralLock: lock,
                lstVault,
                lstVaultAta,
                nativeSolVault: null,
                nativeSolVaultAta: null,
            };
        }
        if (kind === 1) {
            const [nativeSolVault] = (0, pda_1.findNativeSolVaultPda)(creator);
            const [nativeSolVaultAta] = (0, pda_1.findNativeSolVaultEscrowPda)(nativeSolVault);
            return {
                optionCollateralLock: lock,
                lstVault: null,
                lstVaultAta: null,
                nativeSolVault,
                nativeSolVaultAta,
            };
        }
        return {
            optionCollateralLock: lock,
            lstVault: null,
            lstVaultAta: null,
            nativeSolVault: null,
            nativeSolVaultAta: null,
        };
    }
    _optionTypeDiscriminant(optionType) {
        const key = typeof optionType === "string"
            ? optionType
            : optionType && typeof optionType === "object"
                ? (Object.keys(optionType)[0] ?? "")
                : "";
        const normalized = key.charAt(0).toLowerCase() + key.slice(1);
        const table = {
            vanilla: 0,
            digital: 1,
            cappedVanilla: 2,
            rangeAccrual: 3,
            vanillaInverse: 4,
            digitalInverse: 5,
        };
        const idx = table[normalized];
        if (idx === undefined)
            throw new Error(`Unsupported option type: ${key}`);
        return idx;
    }
    /**
     * Create an option and deposit collateral in two transactions.
     *
     * Anchor `create_option` v2.1 takes 12 arguments. The SDK derives every
     * wire-level argument from the high-level CreateParams:
     *   - underlying    → asset: u8 (5-asset enum index)
     *   - payoff        → option_type (Digital/CappedVanilla/RangeAccrual)
     *                   + default direction (overridable via params.direction)
     *                   + extra_param (range upper bound or capped K_cap)
     *   - strike        → strike: u64 (USD × 10^8 per Pyth expo)
     *   - expiry        → expiry_ts: i64 (unix seconds)
     *   - notional      → payoff_amount: u64 (USDC × 10^6)
     *   - spotAtCreation → spot_at_creation: i64 (V0 stamp; auto-fetched from Pyth Hermes if omitted)
     *   - sigmaAtCreation → sigma_at_creation: f64 (V0 stamp; defaults from ASSET_DEFAULT_SIGMA)
     *
     * The V0 stamps feed the Boundary-Aware IM floor `max(IM_scenario, M − V_0)`
     * computed inside `pricing::v0_from_integer_px` on-chain.
     *
     * @example
     *   // Vanilla call (default direction = "buy")
     *   await skew.create({
     *     underlying: "BTC",
     *     payoff: "vanilla_call",
     *     strike: 80_000,
     *     expiry: "2026-05-08T16:00:00Z",
     *     notional: 1.0,
     *   });
     *
     * @example
     *   // Range accrual (upperBound required)
     *   await skew.create({
     *     underlying: "ETH",
     *     payoff: "range_accrual",
     *     strike: 2200,           // lower bound
     *     upperBound: 2400,
     *     expiry: "2026-05-08T16:00:00Z",
     *     notional: 100,
     *   });
     */
    async create(params) {
        this._assertProgramLoaded();
        const { underlying, payoff, strike, expiry, notional } = params;
        const creator = this.wallet.publicKey;
        const nonce = (0, pda_1.generateNonce)();
        const [optionPda] = (0, pda_1.findOptionPda)(creator, nonce);
        const [escrowPda] = (0, pda_1.findEscrowPda)(optionPda);
        const [optionTokenMintPda] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const [metadataPda] = (0, pda_1.findMetadataPda)(optionTokenMintPda);
        // Phase 2 (2026-05-04) — generic settlement mint. Default USDC.
        const settlementMint = params.settlementMint ?? this.usdcMint;
        await this._requireCollateralPolicyMint(settlementMint);
        const payoffDecimals = (0, pda_1.settlementMintDecimals)(settlementMint);
        const pythFeed = (0, pda_1.resolvePythFeed)(underlying);
        const strikeOnChain = (0, pda_1.toOnChainStrike)(strike);
        const expiryTs = (0, pda_1.isoToUnixSeconds)(expiry);
        (0, pda_1.assertExpiryTenor)(underlying, expiryTs, { context: "create" });
        const payoffUnits = (0, pda_1.toSettlementUnits)(notional, settlementMint);
        const rangeUpperUsd = payoff === "range_accrual" ? (params.upperBound ?? params.extraParam) : undefined;
        const upperBoundOnChain = rangeUpperUsd === undefined ? 0n : (0, pda_1.toOnChainStrike)(rangeUpperUsd);
        // V2.1 derivations
        const assetIdx = (0, pda_1.assetEnumIndex)(underlying);
        const mapping = (0, pda_1.mapPayoffToAnchor)(payoff);
        const directionWire = payoff === "range_accrual"
            ? 0
            : (0, pda_1.directionToI8)(params.direction ?? mapping.defaultDirection);
        const extraParam = mapping.extraParam(params);
        // V0 stamp — auto-fetch from Pyth Hermes if caller didn't supply.
        // If Hermes is unavailable, caller can still pass spotAtCreation explicitly.
        const spotAtCreationUsd = params.spotAtCreation ?? (await (0, pda_1.fetchPythSpotUsd)(underlying));
        const sigmaAtCreation = params.sigmaAtCreation ?? pda_1.ASSET_DEFAULT_SIGMA[underlying];
        // i64 spot_at_creation: USD × 10^8 (matches Pyth on-chain convention)
        const spotI64 = BigInt(Math.round(spotAtCreationUsd * 1e8));
        // 1 — create_option (12 args matching anchor v2.1 signature)
        const createTx = await this._program()
            .methods.createOption(new anchor_1.BN(nonce.toString()), mapping.optionType, assetIdx, // u8: 5-asset enum index
        directionWire, // i8: +1 buy / -1 sell
        new anchor_1.BN(strikeOnChain.toString()), new anchor_1.BN(expiryTs.toString()), new anchor_1.BN(payoffUnits.toString()), payoffDecimals, new anchor_1.BN(upperBoundOnChain.toString()), extraParam, // f64
        new anchor_1.BN(spotI64.toString()), // i64: V0 spot stamp
        sigmaAtCreation)
            .accounts({
            option: optionPda,
            creator,
            underlyingFeed: pythFeed,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            metadataPda,
            mplTokenMetadataProgram: pda_1.MPL_TOKEN_METADATA_PROGRAM_ID,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            systemProgram: web3_js_1.SystemProgram.programId,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .remainingAccounts(this._hamiltonRemaining())
            .transaction();
        // 2 — deposit_collateral (creator's settlement-mint ATA → escrow)
        const creatorAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const depositTx = await this._program()
            .methods.depositCollateral(new anchor_1.BN(payoffUnits.toString()))
            .accounts({
            option: optionPda,
            creator,
            creatorTokenAccount: creatorAta,
            escrowTokenAccount: escrowPda,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        if (params.simulateOnly === true || params.dryRun === true || params.simulate === true) {
            const simulationTx = new web3_js_1.Transaction();
            simulationTx.add(...createTx.instructions, ...depositTx.instructions);
            const simulation = await this._simulateTransaction(simulationTx);
            return {
                address: optionPda,
                nonce,
                createTx: "SIMULATED_CREATE_OPTION",
                depositTx: "SIMULATED_DEPOSIT_COLLATERAL",
                simulated: true,
                simulation,
            };
        }
        const createSig = await this._sendAndConfirm(createTx);
        const depositSig = await this._sendAndConfirm(depositTx);
        return {
            address: optionPda,
            nonce,
            createTx: createSig,
            depositTx: depositSig,
        };
    }
    /**
     * Buy an option. Sends premium in the option's settlement mint to the
     * creator's matching ATA. BGK correction, sigma-IV routing, and fee
     * calculation are all internal.
     */
    async buy(option, premiumUsd) {
        return this._buyWithPremiumMicro(option, (0, pda_1.toUsdcUnits)(premiumUsd));
    }
    async _buyWithPremiumMicro(option, premiumMicro) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const buyer = this.wallet.publicKey;
        // Fetch option to get creator for premium_to routing.
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const [optionTokenMintPda] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const [metadataPda] = (0, pda_1.findMetadataPda)(optionTokenMintPda);
        const [feeAccumulator] = (0, pda_1.findFeeAccumulatorPda)(settlementMint);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const [buyerVolumeTracker] = (0, pda_1.findVolumeTrackerPda)(buyer);
        const [feeConfig] = (0, pda_1.findFeeConfigPda)();
        const buyerAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, buyer);
        const creatorAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const buyerOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, buyer, false, spl_token_1.TOKEN_PROGRAM_ID);
        const [sigmaIvPda] = (0, pda_1.findSigmaIvPda)();
        const tx = await this._program()
            .methods.buyOption(new anchor_1.BN(premiumMicro.toString()))
            .accounts({
            option: optionPda,
            buyer,
            premiumFrom: buyerAta,
            premiumTo: creatorAta,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            optionTokenMint: optionTokenMintPda,
            optionTokenTo: buyerOptionAta,
            metadataPda,
            mplTokenMetadataProgram: pda_1.MPL_TOKEN_METADATA_PROGRAM_ID,
            feeAccumulator,
            feeAuthority,
            sigmaIvPda,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            governance: (0, pda_1.findGovernancePda)()[0],
            buyerVolumeTracker,
            feeConfig,
        })
            .remainingAccounts(this._hamiltonRemaining())
            .transaction();
        const sig = await this._sendAndConfirm(tx);
        const after = await this.listOptions({ pda: optionPda, limit: 1 });
        const optionSummary = after[0];
        let buyerOptionAmount;
        try {
            const tokenAccount = await (0, spl_token_1.getAccount)(this.connection, buyerOptionAta, "confirmed", spl_token_1.TOKEN_PROGRAM_ID);
            buyerOptionAmount = tokenAccount.amount.toString();
        }
        catch {
            buyerOptionAmount = undefined;
        }
        return {
            txSignature: sig,
            option: optionSummary,
            optionAddress: optionPda.toBase58(),
            optionTokenMint: optionTokenMintPda.toBase58(),
            buyerOptionAta: buyerOptionAta.toBase58(),
            buyerOptionAmount,
            buyer: buyer.toBase58(),
            creator: creator.toBase58(),
            holder: optionSummary?.holder,
        };
    }
    /**
     * Settle an expired option. Permissionless — anyone can call.
     * Reads Pyth price, routes payoff to holder, returns residual to creator.
     *
     * **If you just received the option via `transferOption()` in the previous
     * slot:** bundle transfer + settle in one tx using `bundleTransferAndSettle()`
     * (single-signer, current holder signs both ix) or
     * `buildBundleTransferAndSettleCoSigned()` (two-signer, new holder co-signs)
     * instead of calling settle separately. This eliminates the slot race where
     * the new holder's settle tx may land before transfer finalises.
     */
    async settle(option) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const holder = raw.holder;
        const pythFeed = raw.underlyingFeedId;
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const [escrowPda] = (0, pda_1.findEscrowPda)(optionPda);
        const [optionTokenMintPda] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const [feeAccumulator] = (0, pda_1.findFeeAccumulatorPda)(settlementMint);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const cmOptional = await this._settleCmOptionalAccounts(optionPda, creator);
        const collOptional = await this._settleCollateralLockOptionalAccounts(optionPda, creator);
        const holderOptional = await this._settleHolderOptionalAccounts(optionPda, holder, creator);
        const effectiveHolder = holder.equals(web3_js_1.PublicKey.default) ? creator : holder;
        const holderAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, effectiveHolder);
        const creatorAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const holderOptionAta = holder.equals(web3_js_1.PublicKey.default)
            ? web3_js_1.SystemProgram.programId
            : (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, holder, false, spl_token_1.TOKEN_PROGRAM_ID);
        const tx = await this._program()
            .methods.settle()
            .accounts({
            option: optionPda,
            caller: this.wallet.publicKey,
            pythPrice: pythFeed,
            escrowTokenAccount: escrowPda,
            optionTokenMint: optionTokenMintPda,
            currentHolderOptionAta: holderOptionAta,
            payoffTokenAccount: holderAta,
            creatorRefundTokenAccount: creatorAta,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            creatorCm: cmOptional.creatorCm,
            positionRegistry: cmOptional.positionRegistry,
            creatorCmCollateralAta: cmOptional.creatorCmCollateralAta,
            swbAggregator: web3_js_1.PublicKey.default,
            feeAccumulator,
            feeAuthority,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            optionCollateralLock: collOptional.optionCollateralLock,
            lstVault: collOptional.lstVault,
            lstVaultAta: collOptional.lstVaultAta,
            nativeSolVault: collOptional.nativeSolVault,
            nativeSolVaultAta: collOptional.nativeSolVaultAta,
            holderCm: holderOptional.holderCm,
            holderPositionRegistry: holderOptional.holderPositionRegistry,
        })
            .transaction();
        const sig = await this._sendAndConfirm(tx);
        return { txSignature: sig, payoffUsd: 0 }; // payoffUsd resolved via event/indexer post-tx
    }
    /**
     * Register the wallet as a Clearing Member (permissionless).
     *
     * Mirrors anchor `register_clearing_member` + `init_position_registry`.
     * The on-chain init is split into two instructions to stay inside Solana's
     * BPF stack budget, but the SDK submits them in one transaction so CM
     * onboarding remains atomic from the caller's point of view. The caller's
     * USDC ATA must already hold ≥ `initialCollateralUsdc` tokens — the SDK
     * does not auto-faucet (use spl-token-faucet.com on devnet).
     *
     * @example
     *   const result = await skew.registerClearingMember({
     *     initialCollateralUsdc: 50_000,    // $50k
     *   });
     *   console.log(`CM PDA: ${result.cmPda.toBase58()}`);
     */
    async registerClearingMember(params) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [cmPda] = (0, pda_1.findClearingMemberPda)(authority);
        const [cmEscrow] = (0, pda_1.findCmEscrowPda)(cmPda);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(authority);
        const authorityUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, authority);
        const collateralMicro = (0, pda_1.toUsdcUnits)(params.initialCollateralUsdc);
        // -------------------------------------------------------------------
        // Phase 7-B · F1.4 (High) — idempotent CM-register pre-fetch.
        //
        // The on-chain `register_clearing_member` ix uses an Anchor `init`
        // constraint on the CM PDA, which collides with `0x0`
        // (AccountAlreadyInUse) on the second invocation. Without an SDK
        // pre-check, a double-click, page refresh, or simultaneous two-tab
        // submission produced an unactionable raw error. We short-circuit on a
        // confirmed-commitment fetch: if the PDA already exists we silently
        // succeed and return a sentinel signature so downstream code stays
        // idempotent. Race-condition recovery is handled below in the
        // try/catch around `_sendAndConfirm`.
        // -------------------------------------------------------------------
        const existingCmInfo = await this.connection.getAccountInfo(cmPda, "confirmed");
        if (existingCmInfo !== null) {
            const migrationSig = existingCmInfo.data.length === LEGACY_CM_ACCOUNT_SIZE
                ? await this._ensureClearingMemberLayout(authority)
                : null;
            const existingRegistryInfo = await this.connection.getAccountInfo(positionRegistry, "confirmed");
            if (existingRegistryInfo === null) {
                const tx = new web3_js_1.Transaction();
                tx.add(await this._program()
                    .methods.initPositionRegistry()
                    .accounts({
                    cm: cmPda,
                    positionRegistry,
                    authority,
                    systemProgram: web3_js_1.SystemProgram.programId,
                })
                    .instruction());
                const txSignature = await this._sendAndConfirm(tx);
                return {
                    cmPda,
                    cmEscrow,
                    positionRegistry,
                    txSignature: migrationSig ? `${migrationSig},${txSignature}` : txSignature,
                    alreadyRegistered: true,
                    atasCreated: [],
                };
            }
            return {
                cmPda,
                cmEscrow,
                positionRegistry,
                txSignature: migrationSig ?? "idempotent_already_registered",
                alreadyRegistered: true,
                atasCreated: [],
            };
        }
        // -------------------------------------------------------------------
        // Phase 7-B · F1.6 (High) — SOL pre-flight balance check.
        //
        // First-time CM onboarding allocates three rent-exempt accounts in a
        // single tx:
        //   • ClearingMemberAccount (~360 B)             ≈ 0.00307 SOL
        //   • cm_escrow SPL TokenAccount (165 B)         ≈ 0.00204 SOL
        //   • PositionRegistry (~1104 B; init in 2nd ix) ≈ 0.00839 SOL
        // Plus 1 signer fee (5_000 lamports). Conservative floor =
        // 0.0145 SOL ≈ 14_500_000 lamports. We round up to 0.02 SOL
        // (20_000_000 lamports) to absorb future state-size growth and give
        // the caller a clear, actionable error instead of the on-chain `0x1`
        // (insufficient lamports for rent).
        // -------------------------------------------------------------------
        const MIN_SOL_LAMPORTS_FOR_CM_REGISTER = 20000000; // 0.02 SOL
        const solBalance = await this.connection.getBalance(authority, "confirmed");
        if (solBalance < MIN_SOL_LAMPORTS_FOR_CM_REGISTER) {
            throw new Error(`InsufficientSolForCmRegister: authority ${authority.toBase58()} has ` +
                `${solBalance} lamports (≈ ${(solBalance / 1e9).toFixed(6)} SOL); ` +
                `register_clearing_member needs ≥ ${MIN_SOL_LAMPORTS_FOR_CM_REGISTER} ` +
                `lamports (0.02 SOL) for rent-exempt CM PDA + escrow ATA + ` +
                `PositionRegistry + tx fee. Airdrop or fund the wallet and retry.`);
        }
        // -------------------------------------------------------------------
        // Phase 7-B · F1.1 (Critical) — USDC ATA idempotent init.
        //
        // The on-chain handler treats `authority_usdc_ata` with `mut +
        // token::mint=usdc_mint + token::authority=authority` constraints.
        // Anchor requires the account to ALREADY exist (it is not declared
        // `init`); a brand-new wallet that has never touched USDC fails with
        // error `3012` (AccountNotInitialized) before the program body runs.
        //
        // We detect three cases via spl-token `getAccount`:
        //   1. Account exists, owner = authority, mint = USDC → no-op.
        //   2. Account does not exist (TokenAccountNotFoundError) → prepend
        //      `createAssociatedTokenAccountIdempotentInstruction` so the
        //      onboarding tx becomes (createATA, register, initRegistry) —
        //      atomic from the caller's POV.
        //   3. Account exists but owner is NOT the SPL token program
        //      (TokenInvalidAccountOwnerError) → caller has a corrupted ATA
        //      slot; re-throw a clear error rather than silently mask it.
        //
        // Other mints (vault PDAs, second-counterparty ATAs) are NOT auto-
        // initialised — the program is responsible for those.
        // -------------------------------------------------------------------
        const atasCreated = [];
        let usdcAtaExists = false;
        let usdcAtaBalanceMicro = 0n;
        try {
            const usdcAtaState = await (0, spl_token_1.getAccount)(this.connection, authorityUsdcAta, "confirmed", spl_token_1.TOKEN_PROGRAM_ID);
            usdcAtaExists = true;
            usdcAtaBalanceMicro = BigInt(usdcAtaState.amount.toString());
        }
        catch (err) {
            if (err instanceof spl_token_1.TokenAccountNotFoundError) {
                usdcAtaExists = false;
            }
            else if (err instanceof spl_token_1.TokenInvalidAccountOwnerError) {
                throw new Error(`CorruptedUsdcAta: ${authorityUsdcAta.toBase58()} exists but is ` +
                    `not owned by the SPL Token program. The wallet's USDC ATA slot ` +
                    `is in an unexpected state — close it manually before retrying.`);
            }
            else {
                // Network / parse error — surface with context, do NOT swallow.
                throw err;
            }
        }
        // -------------------------------------------------------------------
        // Phase 7-B · F1.6 (High) — USDC pre-flight balance check.
        //
        // Only enforced when `initial_collateral_usdc > 0`. The SPL transfer
        // CPI inside the on-chain handler reverts with `0x1` (insufficient
        // funds) on a short balance — opaque to the user. We do the check
        // here against the freshly-fetched `usdcAtaBalanceMicro` so the
        // failure mode is obvious. If the ATA does not exist yet, the
        // balance is necessarily 0, so any positive `collateralMicro`
        // immediately fails this check (no point creating an empty ATA only
        // to revert in the second ix).
        // -------------------------------------------------------------------
        if (collateralMicro > 0n) {
            if (usdcAtaBalanceMicro < collateralMicro) {
                const have = (Number(usdcAtaBalanceMicro) / 1e6).toFixed(6);
                const need = (Number(collateralMicro) / 1e6).toFixed(6);
                throw new Error(`InsufficientUsdcForCmRegister: authority's USDC ATA ` +
                    `${authorityUsdcAta.toBase58()} holds $${have}, ` +
                    `register_clearing_member requested $${need} initial collateral. ` +
                    `${usdcAtaExists
                        ? "Top up the ATA"
                        : "Mint USDC into the wallet first (devnet: spl-token-faucet.com)"} and retry.`);
            }
        }
        // -------------------------------------------------------------------
        // Build the onboarding transaction. The order matters:
        //   1. (optional) createIdempotent USDC ATA — required for new wallets.
        //   2. register_clearing_member (CM PDA + cm_escrow init + transfer).
        //   3. init_position_registry (PositionRegistry PDA init).
        // The two on-chain ixs are split for BPF stack budget reasons (W6.1)
        // but the SDK keeps them in one tx so onboarding is atomic.
        // -------------------------------------------------------------------
        const tx = new web3_js_1.Transaction();
        if (!usdcAtaExists) {
            tx.add((0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(authority, // payer
            authorityUsdcAta, // ata to create
            authority, // owner
            this.usdcMint, // mint
            spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID));
            atasCreated.push(authorityUsdcAta);
        }
        const registerIx = await this._program()
            .methods.registerClearingMember(new anchor_1.BN(collateralMicro.toString()))
            .accounts({
            cm: cmPda,
            authority,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            authorityUsdcAta,
            cmEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        })
            .instruction();
        const initRegistryIx = await this._program()
            .methods.initPositionRegistry()
            .accounts({
            cm: cmPda,
            positionRegistry,
            authority,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .instruction();
        tx.add(registerIx, initRegistryIx);
        // -------------------------------------------------------------------
        // Phase 7-B · F1.4 race recovery — robust pattern (fetch → try-init
        // → re-fetch on failure). The pre-fetch above can return null while
        // a parallel tab's tx is in-flight; if our submit then loses the
        // race we re-check the on-chain state and return the idempotent
        // sentinel. Any other error (insufficient lamports, SPL revert,
        // network) is re-thrown unchanged.
        // -------------------------------------------------------------------
        let txSignature;
        try {
            txSignature = await this._sendAndConfirm(tx);
        }
        catch (sendErr) {
            const recheck = await this.connection.getAccountInfo(cmPda, "confirmed");
            if (recheck !== null) {
                const registryRecheck = await this.connection.getAccountInfo(positionRegistry, "confirmed");
                if (registryRecheck === null) {
                    const tx = new web3_js_1.Transaction();
                    tx.add(await this._program()
                        .methods.initPositionRegistry()
                        .accounts({
                        cm: cmPda,
                        positionRegistry,
                        authority,
                        systemProgram: web3_js_1.SystemProgram.programId,
                    })
                        .instruction());
                    const txSignature = await this._sendAndConfirm(tx);
                    return {
                        cmPda,
                        cmEscrow,
                        positionRegistry,
                        txSignature,
                        alreadyRegistered: true,
                        atasCreated,
                    };
                }
                return {
                    cmPda,
                    cmEscrow,
                    positionRegistry,
                    txSignature: "idempotent_already_registered",
                    alreadyRegistered: true,
                    atasCreated,
                };
            }
            throw sendErr;
        }
        return {
            cmPda,
            cmEscrow,
            positionRegistry,
            txSignature,
            alreadyRegistered: false,
            atasCreated,
        };
    }
    /**
     * Add USDC collateral to an existing CM escrow.
     * Idempotent — anchor `cm_add_collateral` accepts repeated deposits.
     *
     * @example
     *   await skew.cmAddCollateral(10_000);  // +$10K to existing CM
     */
    async cmAddCollateral(amountUsdc) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [cmPda] = (0, pda_1.findClearingMemberPda)(authority);
        const [cmEscrow] = (0, pda_1.findCmEscrowPda)(cmPda);
        const authorityUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, authority);
        const amountMicro = (0, pda_1.toUsdcUnits)(amountUsdc);
        if (amountMicro <= 0n) {
            throw new Error("cmAddCollateral: amountUsdc must be greater than zero");
        }
        await this._requireUsdcBalance(authorityUsdcAta, amountMicro, "cmAddCollateral");
        await this._ensureClearingMemberLayout(authority);
        const tx = await this._program()
            .methods.cmAddCollateral(new anchor_1.BN(amountMicro.toString()))
            .accounts({
            cm: cmPda,
            authority,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            authorityUsdcAta,
            cmEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Withdraw USDC collateral from CM escrow back to authority's USDC ATA.
     * Anchor enforces `withdrawal ≤ free_collateral`
     * (collateral − tier_lockup − total_pm_locked). Tier lockup remains
     * IM-eligible through `tradable_collateral()`, but it cannot leave the
     * CM escrow until the downgrade window releases it.
     *
     * @example
     *   await skew.cmWithdrawCollateral(5_000);
     */
    async cmWithdrawCollateral(amountUsdc) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [cmPda] = (0, pda_1.findClearingMemberPda)(authority);
        const [cmEscrow] = (0, pda_1.findCmEscrowPda)(cmPda);
        const authorityUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, authority);
        await this._ensureClearingMemberLayout(authority);
        const tx = await this._program()
            .methods.cmWithdrawCollateral(new anchor_1.BN((0, pda_1.toUsdcUnits)(amountUsdc).toString()))
            .accounts({
            cm: cmPda,
            authority,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            authorityUsdcAta,
            cmEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** One-shot fee-volume tracker init required before relay/CM atomic fills. */
    async initVolumeTracker() {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [volumeTracker] = (0, pda_1.findVolumeTrackerPda)(authority);
        const tx = await this._program()
            .methods.initVolumeTracker()
            .accounts({
            volumeTracker,
            authority,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, volumeTracker };
    }
    /** SKEW_AUTHORITY one-shot init for the singleton FeeConfigPda. */
    async initFeeConfig() {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [feeConfig] = (0, pda_1.findFeeConfigPda)();
        const tx = await this._program()
            .methods.initFeeConfig()
            .accounts({
            feeConfig,
            authority,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, feeConfig };
    }
    /** SKEW_AUTHORITY one-shot init for the collateral mint policy allowlist. */
    async initCollateralPolicy() {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const policy = this._collateralPolicy();
        const tx = await this._program()
            .methods.initCollateralPolicy()
            .accounts({
            authority,
            policy,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, policy };
    }
    /**
     * Permissionless per-mint protocol fee accumulator bootstrap.
     *
     * Atomic fills require the fee accumulator account to already exist so the
     * hot fill ix can stay deterministic and CU-bounded. This helper mirrors
     * the relay's automatic prefill bootstrap and works for USDC, wSOL, and
     * jitoSOL as long as the mint is registered in CollateralPolicyPda.
     */
    async initFeeAccumulator(settlementMint = this.usdcMint) {
        this._assertProgramLoaded();
        const payer = this.wallet.publicKey;
        const [feeAccumulator] = (0, pda_1.findFeeAccumulatorPda)(settlementMint);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const tx = await this._program()
            .methods.initFeeAccumulator()
            .accounts({
            payer,
            feeAccumulator,
            feeAuthority,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            systemProgram: web3_js_1.SystemProgram.programId,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, feeAccumulator };
    }
    /** SKEW_AUTHORITY registers a settlement/collateral mint in CollateralPolicyPda. */
    async registerCollateralPolicyEntry(args) {
        this._assertProgramLoaded();
        const tx = await this._program()
            .methods.registerCollateralPolicyEntry(args.mint, args.decimals, args.kind, args.oracleFeed ?? web3_js_1.PublicKey.default, args.maxDepegBps ?? 0)
            .accounts({
            authority: this.wallet.publicKey,
            policy: this._collateralPolicy(),
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Transfer an option SPL Token from current holder to a new holder.
     * Auto-creates the new holder's option ATA if missing. Novation is
     * automatic on-chain — issuer (CM) is preserved; only `holder` changes.
     *
     * **Race-safe immediate settlement:** if the new holder intends to settle
     * the option soon after receiving it (e.g. transfer happens at expiry),
     * use `bundleTransferAndSettle()` instead. A standalone `transferOption()`
     * followed by an immediate `settle()` from the new holder may race in the
     * same slot — Solana guarantees atomic ix execution, so one of the two
     * fails cleanly (no data corruption), but the second tx wastes fees if
     * the first hasn't landed yet. Bundling avoids the round-trip.
     *
     * @example
     *   await skew.transferOption(optionPda, newHolderPubkey);
     */
    async transferOption(option, newHolder) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const newHolderPk = typeof newHolder === "string" ? new web3_js_1.PublicKey(newHolder) : newHolder;
        const currentHolder = this.wallet.publicKey;
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const before = (await this.listOptions({ pda: optionPda, limit: 1 }))[0] ?? null;
        if (before === null) {
            throw new Error(`transferOption: option not found on-chain: ${optionPda.toBase58()}`);
        }
        if (before.holder !== currentHolder.toBase58()) {
            throw new Error(`transferOption: configured wallet ${currentHolder.toBase58()} is not current holder ${before.holder}`);
        }
        if (before.state !== "Active") {
            throw new Error(`transferOption: option state must be Active, got ${before.state}`);
        }
        if (before.expiryTs <= Math.floor(Date.now() / 1000)) {
            throw new Error("transferOption: option is expired and cannot be transferred");
        }
        if (newHolderPk.equals(currentHolder)) {
            throw new Error("transferOption: new_holder must differ from current holder");
        }
        if (newHolderPk.equals(creator)) {
            throw new Error("transferOption cannot transfer an active PM-backed option back to its creator. " +
                "That is a buyback/close workflow, not a holder transfer, and would leave the writer " +
                "position registry inconsistent. Use a non-creator buyer, settle after expiry, or wait " +
                "for the dedicated PM buyback close primitive.");
        }
        const [optionTokenMintPda] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const currentHolderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, currentHolder, false, spl_token_1.TOKEN_PROGRAM_ID);
        const newHolderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, newHolderPk, false, spl_token_1.TOKEN_PROGRAM_ID);
        const transferIx = await this._program()
            .methods.transferOption()
            .accounts({
            option: optionPda,
            currentHolder,
            currentHolderOptionAta,
            newHolder: newHolderPk,
            newHolderOptionAta,
            optionTokenMint: optionTokenMintPda,
            systemProgram: web3_js_1.SystemProgram.programId,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        })
            .instruction();
        const tx = new web3_js_1.Transaction();
        const untrackIx = await this._buildUntrackHeldPositionIx(optionPda, currentHolder);
        if (untrackIx)
            tx.add(untrackIx);
        tx.add(transferIx);
        const txSignature = await this._sendAndConfirm(tx);
        let optionReadback;
        for (let attempt = 0; attempt < 10; attempt += 1) {
            optionReadback = (await this.listOptions({ pda: optionPda, limit: 1 }))[0];
            if (optionReadback?.holder === newHolderPk.toBase58()) {
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        const [oldHolderPortfolio, newHolderPortfolio] = await Promise.all([
            this.getPortfolio(currentHolder),
            this.getPortfolio(newHolderPk),
        ]);
        const oldHolderPortfolioContainsOption = oldHolderPortfolio.longOptions.some((summary) => summary.pda === optionPda.toBase58());
        const newHolderPortfolioContainsOption = newHolderPortfolio.longOptions.some((summary) => summary.pda === optionPda.toBase58());
        const readbackErrors = [];
        if (optionReadback?.holder !== newHolderPk.toBase58()) {
            readbackErrors.push(`post-transfer option holder is ${optionReadback?.holder ?? "missing"}, expected ${newHolderPk.toBase58()}`);
        }
        if (oldHolderPortfolioContainsOption) {
            readbackErrors.push("old holder portfolio still contains transferred option");
        }
        if (!newHolderPortfolioContainsOption) {
            readbackErrors.push("new holder portfolio does not contain transferred option");
        }
        return {
            txSignature,
            readbackOk: readbackErrors.length === 0,
            readbackErrors,
            oldHolder: currentHolder.toBase58(),
            newHolder: newHolderPk.toBase58(),
            optionReadback,
            oldHolderPortfolioContainsOption,
            newHolderPortfolioContainsOption,
        };
    }
    /**
     * Bundle `transfer_option` + `settle` into a single atomic tx (single-signer).
     *
     * Use case: the current holder hands the option to `newHolder` AND has it
     * settled in the same tx — e.g. expiry is imminent and the new holder does
     * not want to pay rent on the option PDA after acquiring it. Both ix succeed
     * or both rollback (Solana atomic-tx guarantee). No race window where the
     * new holder is briefly the SPL token owner but settlement has not happened.
     *
     * **Caveats:**
     *  - `caller` for settle is the current holder (this wallet), but
     *    `payoffTokenAccount` routes USDC payoff to the **new holder's** USDC
     *    ATA — current holder pays rent for transfer ATA init but receives
     *    nothing from settlement.
     *  - Requires `option.state == Active` AND `now >= expiry`. Pre-expiry calls
     *    revert at the settle ix with `SkewError::NotExpired` and rollback the
     *    transfer too.
     *  - For the cross-wallet case where the new holder co-signs the settle,
     *    use `buildBundleTransferAndSettleCoSigned()`.
     *
     * @example
     *   // Holder A hands option to B and settles in one shot at expiry
     *   await skew.bundleTransferAndSettle(optionPda, bWallet);
     */
    async bundleTransferAndSettle(option, newHolder) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const newHolderPk = typeof newHolder === "string" ? new web3_js_1.PublicKey(newHolder) : newHolder;
        const currentHolder = this.wallet.publicKey;
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const pythFeed = raw.underlyingFeedId;
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const [escrowPda] = (0, pda_1.findEscrowPda)(optionPda);
        const [optionTokenMintPda] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const [feeAccumulator] = (0, pda_1.findFeeAccumulatorPda)(settlementMint);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const cmOptional = await this._settleCmOptionalAccounts(optionPda, creator);
        const collOptional = await this._settleCollateralLockOptionalAccounts(optionPda, creator);
        const currentHolderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, currentHolder, false, spl_token_1.TOKEN_PROGRAM_ID);
        const newHolderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, newHolderPk, false, spl_token_1.TOKEN_PROGRAM_ID);
        const newHolderUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, newHolderPk);
        const creatorUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const transferIx = await this._program()
            .methods.transferOption()
            .accounts({
            option: optionPda,
            currentHolder,
            currentHolderOptionAta,
            newHolder: newHolderPk,
            newHolderOptionAta,
            optionTokenMint: optionTokenMintPda,
            systemProgram: web3_js_1.SystemProgram.programId,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        })
            .instruction();
        // After transferIx, the option SPL token sits in newHolderOptionAta —
        // settle ix burns from there and routes payoff to newHolderUsdcAta.
        const settleIx = await this._program()
            .methods.settle()
            .accounts({
            option: optionPda,
            caller: currentHolder,
            pythPrice: pythFeed,
            escrowTokenAccount: escrowPda,
            optionTokenMint: optionTokenMintPda,
            currentHolderOptionAta: newHolderOptionAta,
            payoffTokenAccount: newHolderUsdcAta,
            creatorRefundTokenAccount: creatorUsdcAta,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            creatorCm: cmOptional.creatorCm,
            positionRegistry: cmOptional.positionRegistry,
            creatorCmCollateralAta: cmOptional.creatorCmCollateralAta,
            swbAggregator: web3_js_1.PublicKey.default,
            feeAccumulator,
            feeAuthority,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            optionCollateralLock: collOptional.optionCollateralLock,
            lstVault: collOptional.lstVault,
            lstVaultAta: collOptional.lstVaultAta,
            nativeSolVault: collOptional.nativeSolVault,
            nativeSolVaultAta: collOptional.nativeSolVaultAta,
        })
            .instruction();
        const tx = new web3_js_1.Transaction().add(transferIx, settleIx);
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Two-signer variant of `bundleTransferAndSettle`. Returns a `Transaction`
     * with the transfer ix signed by the current holder; the caller must
     * `partialSign(newHolderKeypair)` and then submit the raw bytes.
     *
     * Use case: A and B negotiate an OTC handoff at expiry — B wants to receive
     * the option AND be the `caller` for settle in the same tx (so the settle
     * payoff arrives without a separate B-signed tx). The settle ix's `caller`
     * is `newHolder`, which makes B a required signer.
     *
     * The SDK does **not** submit — caller is responsible for `partialSign` +
     * `connection.sendRawTransaction`.
     *
     * @example
     *   // A builds + partial-signs, hands serialized tx to B
     *   const partial = await skewA.buildBundleTransferAndSettleCoSigned(opt, bWallet.publicKey);
     *   // B co-signs and submits
     *   partial.partialSign(bKeypair);
     *   const sig = await connection.sendRawTransaction(partial.serialize());
     */
    async buildBundleTransferAndSettleCoSigned(option, newHolder) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const currentHolder = this.wallet.publicKey;
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const pythFeed = raw.underlyingFeedId;
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const [escrowPda] = (0, pda_1.findEscrowPda)(optionPda);
        const [optionTokenMintPda] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const [feeAccumulator] = (0, pda_1.findFeeAccumulatorPda)(settlementMint);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const cmOptional = await this._settleCmOptionalAccounts(optionPda, creator);
        const collOptional = await this._settleCollateralLockOptionalAccounts(optionPda, creator);
        const currentHolderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, currentHolder, false, spl_token_1.TOKEN_PROGRAM_ID);
        const newHolderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMintPda, newHolder, false, spl_token_1.TOKEN_PROGRAM_ID);
        const newHolderUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, newHolder);
        const creatorUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const transferIx = await this._program()
            .methods.transferOption()
            .accounts({
            option: optionPda,
            currentHolder,
            currentHolderOptionAta,
            newHolder,
            newHolderOptionAta,
            optionTokenMint: optionTokenMintPda,
            systemProgram: web3_js_1.SystemProgram.programId,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        })
            .instruction();
        // settle ix's caller = newHolder → newHolder must sign as well.
        const settleIx = await this._program()
            .methods.settle()
            .accounts({
            option: optionPda,
            caller: newHolder,
            pythPrice: pythFeed,
            escrowTokenAccount: escrowPda,
            optionTokenMint: optionTokenMintPda,
            currentHolderOptionAta: newHolderOptionAta,
            payoffTokenAccount: newHolderUsdcAta,
            creatorRefundTokenAccount: creatorUsdcAta,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            creatorCm: cmOptional.creatorCm,
            positionRegistry: cmOptional.positionRegistry,
            creatorCmCollateralAta: cmOptional.creatorCmCollateralAta,
            swbAggregator: web3_js_1.PublicKey.default,
            feeAccumulator,
            feeAuthority,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            optionCollateralLock: collOptional.optionCollateralLock,
            lstVault: collOptional.lstVault,
            lstVaultAta: collOptional.lstVaultAta,
            nativeSolVault: collOptional.nativeSolVault,
            nativeSolVaultAta: collOptional.nativeSolVaultAta,
        })
            .instruction();
        const tx = new web3_js_1.Transaction().add(transferIx, settleIx);
        tx.feePayer = currentHolder;
        const { blockhash } = await this.connection.getLatestBlockhash("confirmed");
        tx.recentBlockhash = blockhash;
        await this.wallet.signTransaction(tx);
        return tx;
    }
    /**
     * Cancel an option BEFORE any buy. Only the creator can call — anchor
     * rejects if the option's `holder` is set (i.e. someone has bought it).
     * Returns escrow collateral to creator.
     *
     * @example
     *   await skew.cancelOption(optionPda);
     */
    async cancelOption(option) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const creator = this.wallet.publicKey;
        const [escrowPda] = (0, pda_1.findEscrowPda)(optionPda);
        const raw = await this._fetchOption(optionPda);
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const creatorAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const tx = await this._program()
            .methods.cancelOption()
            .accounts({
            option: optionPda,
            creator,
            escrowTokenAccount: escrowPda,
            creatorTokenAccount: creatorAta,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Close an expired option. Permissionless — anyone can call.
     * Used by Settler bots to sweep abandoned options after expiry.
     *
     * Difference from `settle()`: `close_expired` returns escrow back to creator
     * when the option went unsold (no holder); `settle` distributes payoff to
     * holder. Anchor routes correctly per option state.
     *
     * @example
     *   await skew.closeExpired(optionPda);
     */
    async closeExpired(option) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const caller = this.wallet.publicKey;
        const [escrowPda] = (0, pda_1.findEscrowPda)(optionPda);
        // Need creator pubkey to compute their ATA — fetch from option account
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const creatorAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const tx = await this._program()
            .methods.closeExpired()
            .accounts({
            option: optionPda,
            caller,
            creator,
            escrowTokenAccount: escrowPda,
            creatorTokenAccount: creatorAta,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Close a released OptionCollateralLockPda sidecar and reclaim rent to the
     * writer. Normal stable and physical settlement mark the sidecar Released;
     * this sweep is intentionally separate so settlement stays on the hot path.
     */
    async closeOptionCollateralLock(option) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const [lock] = (0, pda_1.findOptionCollateralLockPda)(optionPda);
        const lockAcc = await this._program().account.optionCollateralLockPda.fetch(lock);
        const refund = lockAcc.writer;
        const tx = await this._program()
            .methods.closeOptionCollateralLock()
            .accounts({
            lock,
            caller: this.wallet.publicKey,
            refund,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Close a terminal RFQ auction and its zero-balance escrow ATA. */
    async closeRfqAuction(buyer, auctionId) {
        this._assertProgramLoaded();
        const [auction] = (0, pda_1.findRfqAuctionPda)(buyer, auctionId);
        const [escrowAta] = (0, pda_1.findRfqAuctionEscrowPda)(auction);
        const tx = await this._program()
            .methods.closeRfqAuction()
            .accounts({
            refundTarget: buyer,
            auction,
            escrowAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Close a quote-off, non-slashable RFQ maker registry and reclaim the bond. */
    async closeRfqMakerRegistry(mm = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const [registry] = (0, pda_1.findRfqMakerPda)(mm);
        const tx = await this._program()
            .methods.closeRfqMakerRegistry()
            .accounts({ mm, registry })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Close a fully-filled combo v2 receipt PDA. */
    async closeFinalizedComboV2(comboId) {
        this._assertProgramLoaded();
        const buyer = this.wallet.publicKey;
        const [intent] = (0, pda_1.findComboIntentV2Pda)(buyer, comboId);
        const tx = await this._program()
            .methods.closeFinalizedComboV2()
            .accounts({ buyer, intent })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Conservative rent-reclaim discovery for the current wallet.
     * Returns only closes that can be proven from cheap reads; absence from this
     * list does not imply the account is not closeable.
     */
    async listRentReclaimable(authority = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const out = [];
        const [maker] = (0, pda_1.findRfqMakerPda)(authority);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const registry = await this._program().account.rfqMakerRegistryPda.fetch(maker);
            const blockers = [];
            if (registry.slashable)
                blockers.push("maker registry is slashable");
            if (!registry.quoteOff)
                blockers.push("quote_off must be enabled before close");
            if (Number(registry.mmpWindowFillCount ?? 0) !== 0)
                blockers.push("MMP fill window not reset");
            if (BigInt(registry.mmpWindowPremiumMicro?.toString?.() ?? "0") !== 0n) {
                blockers.push("MMP premium window not reset");
            }
            if (BigInt(registry.mmpWindowNotionalMicro?.toString?.() ?? "0") !== 0n) {
                blockers.push("MMP notional window not reset");
            }
            if (blockers.length === 0) {
                out.push({
                    kind: "rfq_maker_registry",
                    pda: maker,
                    refundTarget: authority,
                    reason: "quote-off non-slashable maker registry",
                    blockers,
                });
            }
        }
        catch {
            // no maker registry, nothing to reclaim
        }
        return out;
    }
    /**
     * Track an option token held by this wallet as a CM long hedge.
     *
     * This is the portfolio-margin bridge institutional desks expect: after a
     * CM buys an option, call this once so the long is included in the same
     * PositionRegistryPda as writer shorts and offsets future IM.
     */
    async trackHeldPosition(option) {
        this._assertProgramLoaded();
        const holder = this.wallet.publicKey;
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const [cmPda] = (0, pda_1.findClearingMemberPda)(holder);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(holder);
        const [optionTokenMint] = (0, pda_1.findOptionTokenMintPda)(optionPda);
        const holderOptionAta = (0, spl_token_1.getAssociatedTokenAddressSync)(optionTokenMint, holder, false, spl_token_1.TOKEN_PROGRAM_ID);
        const tx = await this._program()
            .methods.trackHeldPosition()
            .accounts({
            holder,
            cm: cmPda,
            positionRegistry,
            option: optionPda,
            optionTokenMint,
            holderOptionAta,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, cmPda, positionRegistry };
    }
    /**
     * Remove a CM-held long from the PM registry. The SDK calls this
     * automatically before `transferOption()` when the position is tracked.
     */
    async untrackHeldPosition(option) {
        this._assertProgramLoaded();
        const holder = this.wallet.publicKey;
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const ix = await this._buildUntrackHeldPositionIx(optionPda, holder);
        if (!ix)
            throw new Error(`Option is not tracked by ${holder.toBase58()}`);
        const tx = new web3_js_1.Transaction().add(ix);
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Recompute PM and release excess marginal IM from a relay option escrow
     * back into the writer CM escrow. `maxReleaseUsdc=0` means "release all
     * excess". Stable USDC CM lane only; physical SOL-family locks settle from
     * their vault-specific path.
     */
    async rebalancePmLock(option, maxReleaseUsdc = 0) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const [cm] = (0, pda_1.findClearingMemberPda)(creator);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(creator);
        const [optionEscrow] = (0, pda_1.findEscrowPda)(optionPda);
        const [cmEscrow] = (0, pda_1.findCmEscrowPda)(cm);
        const [optionCollateralLock] = (0, pda_1.findOptionCollateralLockPda)(optionPda);
        const pmRemaining = await this._pmRemaining(creator);
        const tx = await this._program()
            .methods.rebalancePmLock(new anchor_1.BN((0, pda_1.toUsdcUnits)(maxReleaseUsdc).toString()))
            .accounts({
            caller: this.wallet.publicKey,
            cm,
            positionRegistry,
            option: optionPda,
            settlementMint,
            optionEscrow,
            cmEscrow,
            optionCollateralLock,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .remainingAccounts(pmRemaining)
            .preInstructions([
            web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
                units: estimatePmCuLimit(pmRemaining.length),
            }),
        ])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Read-only — invoke `calculate_margin` ( PM v1.4) for the
     * caller's CM and return the IM breakdown. The instruction itself just
     * recomputes + writes the result into the CM PDA; this helper sends the tx
     * then reads the PDA so the caller gets numbers in one call.
     *
     * @param currentSpotUsd — current mark spot USD (e.g. fetch from Pyth Hermes
     *                         on the BTC feed). Used by anchor for stress sims.
     * @example
     *   const m = await skew.calculateMargin(77_645.20);
     *   console.log(`free: $${Number(m.freeCollateralUsdcMicro) / 1e6}`);
     */
    async calculateMargin(currentSpotUsd) {
        this._assertProgramLoaded();
        const caller = this.wallet.publicKey;
        const [cmPda] = (0, pda_1.findClearingMemberPda)(caller);
        const pmRemaining = await this._pmRemaining(caller);
        const cuLimit = web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
            units: estimatePmCuLimit(pmRemaining.length),
        });
        const tx = await this._program()
            .methods.calculateMargin(currentSpotUsd)
            .accounts({
            caller,
            cm: cmPda,
        })
            .remainingAccounts(pmRemaining)
            .preInstructions([cuLimit])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        // Read CM PDA to extract resulting IM breakdown
        const accounts = this._program().account;
        const cmAccountClient = accounts["clearingMemberAccount"] ?? accounts["clearingMember"];
        if (!cmAccountClient) {
            // Fallback if account name differs — return tx sig only
            return {
                txSignature,
                collateralUsdcMicro: 0n,
                imLockedUsdcMicro: 0n,
                freeCollateralUsdcMicro: 0n,
            };
        }
        const cm = (await cmAccountClient.fetch(cmPda));
        const bnField = (...keys) => {
            for (const key of keys) {
                const value = cm[key];
                if (value)
                    return BigInt(value.toString());
            }
            return 0n;
        };
        const satSub = (a, b) => (a > b ? a - b : 0n);
        const collateral = bnField("collateral");
        const lastIm = bnField("lastImMicro", "last_im_micro");
        const tierLockup = bnField("tierLockupCollateral", "tier_lockup_collateral");
        const totalPmLocked = bnField("totalPmLockedMicro", "total_pm_locked_micro");
        const freeCollateral = satSub(satSub(collateral, tierLockup), totalPmLocked);
        return {
            txSignature,
            collateralUsdcMicro: collateral,
            imLockedUsdcMicro: lastIm,
            freeCollateralUsdcMicro: freeCollateral,
        };
    }
    /** Init the hybrid PM cache sidecar for this wallet's CM. */
    async initPmCache(cmAuthority = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const [cm] = (0, pda_1.findClearingMemberPda)(cmAuthority);
        const [cache] = (0, pda_1.findCmRiskCachePda)(cmAuthority);
        const tx = await this._program()
            .methods.initCmRiskCache()
            .accounts({
            payer: this.wallet.publicKey,
            cm,
            cmRiskCache: cache,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, cache };
    }
    /** Read the hybrid PM cache sidecar without mutating chain state. */
    async fetchPmCache(cmAuthority = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const [pda] = (0, pda_1.findCmRiskCachePda)(cmAuthority);
        const info = await this.connection.getAccountInfo(pda, "confirmed");
        if (!info || info.data.length < 236) {
            return {
                pda,
                initialized: false,
                cm: null,
                authority: cmAuthority,
                registryHash: null,
                registryCount: 0,
                dirty: true,
                dirtyReason: 0,
                modelVersion: 0,
                snapshotSlot: 0n,
                snapshotTs: 0n,
                cachedImMicro: 0n,
                cachedMmMicro: 0n,
                freeCollateralMicro: 0n,
                baseImMicro: 0n,
                scanRiskMicro: 0n,
                boundaryMicro: 0n,
                tailAddonMicro: 0n,
                iccCreditMicro: 0n,
                wrongWayAddonMicro: 0n,
                yieldRhoAddonMicro: 0n,
                cacheAgeSlots: null,
            };
        }
        const d = info.data;
        const readPk = (off) => new web3_js_1.PublicKey(d.subarray(off, off + 32));
        const readU64 = (off) => d.readBigUInt64LE(off);
        const readI64 = (off) => d.readBigInt64LE(off);
        const currentSlot = await this.connection.getSlot("confirmed").catch(() => null);
        const snapshotSlot = readU64(124);
        return {
            pda,
            initialized: true,
            cm: readPk(8),
            authority: readPk(40),
            registryHash: Buffer.from(d.subarray(72, 104)).toString("hex"),
            registryCount: d[104] ?? 0,
            dirty: (d[105] ?? 1) !== 0,
            dirtyReason: d[106] ?? 0,
            modelVersion: d.readUInt16LE(108),
            snapshotSlot,
            snapshotTs: readI64(132),
            cachedImMicro: readU64(140),
            cachedMmMicro: readU64(148),
            freeCollateralMicro: readU64(156),
            baseImMicro: readU64(164),
            scanRiskMicro: readU64(172),
            boundaryMicro: readU64(180),
            tailAddonMicro: readU64(188),
            iccCreditMicro: readU64(196),
            wrongWayAddonMicro: readU64(204),
            yieldRhoAddonMicro: readU64(212),
            cacheAgeSlots: currentSlot == null
                ? null
                : BigInt(currentSlot) > snapshotSlot
                    ? BigInt(currentSlot) - snapshotSlot
                    : 0n,
        };
    }
    /** Full-walk PM refresh that writes the cache sidecar. */
    async refreshPmCacheFull(currentSpotUsd = 0, cmAuthority = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const caller = this.wallet.publicKey;
        const [cm] = (0, pda_1.findClearingMemberPda)(cmAuthority);
        const [cache] = (0, pda_1.findCmRiskCachePda)(cmAuthority);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(cmAuthority);
        const pmRemaining = (await this._pmRemaining(cmAuthority)).filter((m) => !m.pubkey.equals(positionRegistry));
        const tx = await this._program()
            .methods.refreshCmRiskCacheFull(currentSpotUsd)
            .accounts({
            caller,
            cm,
            cmRiskCache: cache,
            positionRegistry,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .remainingAccounts(pmRemaining)
            .preInstructions([
            web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
                units: estimatePmCuLimit(pmRemaining.length + 1),
            }),
        ])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        const snap = await this.fetchPmCache(cmAuthority);
        return {
            txSignature,
            cache,
            collateralUsdcMicro: snap.cachedImMicro + snap.freeCollateralMicro,
            imLockedUsdcMicro: snap.cachedImMicro,
            freeCollateralUsdcMicro: snap.freeCollateralMicro,
        };
    }
    /** Cached IM query. Fails closed if the cache is dirty/stale or registry hash mismatches. */
    async calculateMarginCached(currentSpotUsd = 0, cmAuthority = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const caller = this.wallet.publicKey;
        const [cm] = (0, pda_1.findClearingMemberPda)(cmAuthority);
        const [cache] = (0, pda_1.findCmRiskCachePda)(cmAuthority);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(cmAuthority);
        const tx = await this._program()
            .methods.calculateMarginCached(currentSpotUsd)
            .accounts({ caller, cm, cmRiskCache: cache, positionRegistry })
            .preInstructions([web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: 250000 })])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        const snap = await this.fetchPmCache(cmAuthority);
        return {
            txSignature,
            cache,
            collateralUsdcMicro: snap.cachedImMicro + snap.freeCollateralMicro,
            imLockedUsdcMicro: snap.cachedImMicro,
            freeCollateralUsdcMicro: snap.freeCollateralMicro,
        };
    }
    /**
     * Cache-aware preview shell for agents/UI. Exact post-IM still belongs to
     * the relay/API pricing engine; this method exposes cache freshness and can
     * combine a caller-supplied post-IM estimate without sending a tx.
     */
    async previewIncrementalMargin(args = {}) {
        const authority = args.cmAuthority ?? this.wallet.publicKey;
        const cache = await this.fetchPmCache(authority);
        if (!cache.initialized) {
            return {
                mode: "BLOCKED",
                preImMicro: 0n,
                postImMicro: 0n,
                deltaImMicro: 0n,
                freeCollateralMicro: 0n,
                afterFillFreeMicro: 0n,
                cacheAgeSlots: null,
                reason: "PM cache is not initialized",
            };
        }
        if (cache.dirty) {
            return {
                mode: "BLOCKED",
                preImMicro: cache.cachedImMicro,
                postImMicro: cache.cachedImMicro,
                deltaImMicro: 0n,
                freeCollateralMicro: cache.freeCollateralMicro,
                afterFillFreeMicro: cache.freeCollateralMicro,
                cacheAgeSlots: cache.cacheAgeSlots,
                reason: `PM cache dirty (${cache.dirtyReason}); run refreshPmCacheFull`,
            };
        }
        const post = args.estimatedPostImMicro ?? cache.cachedImMicro;
        const delta = post > cache.cachedImMicro ? post - cache.cachedImMicro : 0n;
        return {
            mode: args.estimatedPostImMicro == null ? "CACHE" : "CACHE",
            preImMicro: cache.cachedImMicro,
            postImMicro: post,
            deltaImMicro: delta,
            freeCollateralMicro: cache.freeCollateralMicro,
            afterFillFreeMicro: cache.freeCollateralMicro > delta ? cache.freeCollateralMicro - delta : 0n,
            cacheAgeSlots: cache.cacheAgeSlots,
            reason: args.estimatedPostImMicro == null
                ? "cache snapshot only; relay/API margin-preview computes exact post-IM"
                : undefined,
        };
    }
    /**
     * Sweep an abandoned option after the 72h grace window past expiry.
     * Distinct from `closeExpired` which closes within 72h. Returns escrow to
     * creator. Permissionless — anyone can call.
     *
     * @example
     *   await skew.expireAbandoned(optionPda);
     */
    async expireAbandoned(option) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const caller = this.wallet.publicKey;
        const [escrowPda] = (0, pda_1.findEscrowPda)(optionPda);
        const raw = await this._fetchOption(optionPda);
        const creator = raw.creator;
        const settlementMint = raw.settlementMint ?? this.usdcMint;
        const creatorAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, creator);
        const tx = await this._program()
            .methods.expireAbandoned()
            .accounts({
            option: optionPda,
            caller,
            escrowTokenAccount: escrowPda,
            creatorRefundTokenAccount: creatorAta,
            settlementMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Trigger Dutch-auction liquidation. Permissionless — anyone with USDC ATA
     * can call. Bonus floor is guarded by the optional
     * `minExpectedBonusBps` slippage check; pass `0` to disable it.
     *
     * NOTE: anchor enforces `liquidator != defaultingCmAuthority`. The SDK
     * pre-validates to avoid wasting a tx fee.
     *
     * @example
     *   await skew.liquidate(optionPda, defaultingCmAuthority, 5000);
     */
    async liquidate(option, defaultingCmAuthority, closeFactorBps, minExpectedBonusBps = 0) {
        this._assertProgramLoaded();
        if (closeFactorBps < 1 || closeFactorBps > 5000 || !Number.isInteger(closeFactorBps)) {
            throw new Error(`closeFactorBps must be 1..5000, got ${closeFactorBps}`);
        }
        if (minExpectedBonusBps < 0 ||
            minExpectedBonusBps > 10000 ||
            !Number.isInteger(minExpectedBonusBps)) {
            throw new Error(`minExpectedBonusBps must be 0..10000, got ${minExpectedBonusBps}`);
        }
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const cmAuthorityPk = typeof defaultingCmAuthority === "string"
            ? new web3_js_1.PublicKey(defaultingCmAuthority)
            : defaultingCmAuthority;
        const liquidator = this.wallet.publicKey;
        if (liquidator.equals(cmAuthorityPk)) {
            throw new Error("liquidator must differ from defaulting CM authority (Bug #7 self-liquidation guard)");
        }
        const [liqState] = (0, pda_1.findLiqStatePda)(optionPda);
        const [optionEscrow] = (0, pda_1.findEscrowPda)(optionPda);
        const [defaultingCm] = (0, pda_1.findClearingMemberPda)(cmAuthorityPk);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(cmAuthorityPk);
        const [cmEscrow] = (0, pda_1.findCmEscrowPda)(defaultingCm);
        const [insuranceFund] = (0, pda_1.findInsuranceFundPda)();
        const [ifEscrow] = (0, pda_1.findIfEscrowPda)();
        const liquidatorPayoutAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, liquidator);
        const pmRemaining = await this._pmRemaining(cmAuthorityPk);
        const [optionCollateralLock] = (0, pda_1.findOptionCollateralLockPda)(optionPda);
        const tx = await this._program()
            .methods.liquidate(closeFactorBps, minExpectedBonusBps)
            .accounts({
            liqState,
            option: optionPda,
            defaultingCm,
            positionRegistry,
            insuranceFund,
            optionEscrow,
            cmEscrow,
            ifEscrow,
            liquidatorPayoutAta,
            settlementMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            liquidator,
            systemProgram: web3_js_1.SystemProgram.programId,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .remainingAccounts([
            ...pmRemaining,
            { pubkey: optionCollateralLock, isWritable: true, isSigner: false },
        ])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Roll over a currently-OTM option past expiry to a new expiry. Creator-only.
     * Anchor rejects ITM rollover (must `settle` instead — see SkewError 6029
     * `OptionIsITM`). Re-uses the same collateral; new expiry / strike / payoff.
     *
     * @example
     *   await skew.rolloverOption(oldOptionPda, {
     *     newExpiry: "2026-06-10T16:00:00Z",
     *     newStrike: 75_000,
     *     newNotional: 1_000,
     *   });
     *
     * NOTE: requires Pyth feed + Switchboard aggregator pubkeys for
     * settlement-spot read; the SDK fetches via `resolvePythFeed(asset)` from
     * the old option's underlying. SwitchboardAggregator pubkey must be passed
     * via `swbAggregator` if the underlying is on Tier 2 — for Tier 1
     * (BTC/ETH/SOL) it's the same Pyth feed.
     */
    async rolloverOption(oldOption, params) {
        this._assertProgramLoaded();
        const oldOptionPda = typeof oldOption === "string" ? new web3_js_1.PublicKey(oldOption) : oldOption;
        const creator = this.wallet.publicKey;
        const newNonce = (0, pda_1.generateNonce)();
        const [newOptionPda] = (0, pda_1.findOptionPda)(creator, newNonce);
        const [oldEscrow] = (0, pda_1.findEscrowPda)(oldOptionPda);
        const [newEscrow] = (0, pda_1.findEscrowPda)(newOptionPda);
        const raw = await this._fetchOption(oldOptionPda);
        const pythFeed = raw.underlyingFeedId;
        const swb = params.swbAggregator ?? pythFeed;
        const newExpiryTs = (0, pda_1.isoToUnixSeconds)(params.newExpiry);
        const newStrikeOnChain = (0, pda_1.toOnChainStrike)(params.newStrike);
        const newPayoffUnits = (0, pda_1.toUsdcUnits)(params.newNotional);
        const tx = await this._program()
            .methods.rolloverOption(new anchor_1.BN(newNonce.toString()), new anchor_1.BN(newExpiryTs.toString()), new anchor_1.BN(newStrikeOnChain.toString()), new anchor_1.BN(newPayoffUnits.toString()))
            .accounts({
            creator,
            oldOption: oldOptionPda,
            newOption: newOptionPda,
            oldEscrow,
            newEscrow,
            collateralMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            pythPrice: pythFeed,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            governance: (0, pda_1.findGovernancePda)()[0],
            swbAggregator: swb,
        })
            .remainingAccounts(this._hamiltonRemaining())
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { newOptionPda, txSignature };
    }
    /**
     * List options on-chain via `getProgramAccounts` with the OptionAccount
     * discriminator filter (added automatically by Anchor). Returns decoded
     * summaries — strike in USD, expiry as unix seconds, state/type as their
     * IDL variant names, etc.
     *
     * Pure read — no signer required. Filters (`underlying`, `optionType`,
     * `state`) are applied client-side after decode; for current devnet
     * volumes (~tens to a few hundred options) one full scan is faster than
     * round-tripping per-byte memcmp filters. Hard cap of 500 returned items
     * keeps JSON payloads bounded.
     *
     * @example
     *   // Browse all live BTC options sorted by latest expiry first.
     *   const live = await skew.listOptions({
     *     underlying: "BTC",
     *     state: "Active",
     *     sortBy: "expiry",
     *     limit: 50,
     *   });
     *
     * @example
     *   // Find the writer's just-created Range Accruals before any buyer.
     *   const created = await skew.listOptions({
     *     optionType: "RangeAccrual",
     *     state: "Created",
     *   });
     */
    async listOptions(opts = {}) {
        this._assertProgramLoaded();
        if (opts.pda) {
            const pda = new web3_js_1.PublicKey(pubkeyishToBase58(opts.pda));
            const info = await this.connection.getAccountInfo(pda, "confirmed");
            if (!info || !info.owner.equals(pda_1.SKEW_PROGRAM_ID) || info.data.length !== OPTION_ACCOUNT_SIZE) {
                return [];
            }
            try {
                const account = OptionAccount_1.OptionAccount.decode(Buffer.from(info.data));
                const decoded = decodeOptionAccount(pda, account);
                if (!decoded)
                    return [];
                return applyOptionSummaryFilters([decoded], opts);
            }
            catch {
                return [];
            }
        }
        const raw = await this.connection.getProgramAccounts(pda_1.SKEW_PROGRAM_ID, {
            commitment: "confirmed",
            filters: [
                {
                    dataSize: OPTION_ACCOUNT_SIZE,
                },
                {
                    memcmp: {
                        offset: 0,
                        bytes: OPTION_ACCOUNT_DISCRIMINATOR_B58,
                    },
                },
            ],
        });
        let summaries = [];
        for (const entry of raw) {
            try {
                const account = OptionAccount_1.OptionAccount.decode(Buffer.from(entry.account.data));
                const decoded = decodeOptionAccount(entry.pubkey, account);
                if (decoded)
                    summaries.push(decoded);
            }
            catch {
                // Devnet contains legacy/short OptionAccount PDAs from previous IDL
                // layouts. They must not poison inventory discovery for healthy rows.
            }
        }
        return applyOptionSummaryFilters(summaries, opts);
    }
    /**
     * List live Auction RFQs from the same public tape endpoint used by the
     * terminal. The endpoint merges the indexer view with a bounded on-chain
     * snapshot, so a freshly submitted auction can be discovered even when the
     * event indexer is behind.
     */
    async listRfqAuctions(opts = {}) {
        const url = apiUrl("/api/rfq-auctions", opts.webUrl);
        setOptionalParam(url, "buyer", opts.buyer ? pubkeyishToBase58(opts.buyer) : undefined);
        setOptionalParam(url, "asset", opts.asset);
        setOptionalParam(url, "with_quote", opts.withQuote);
        setOptionalParam(url, "limit", opts.limit);
        setOptionalParam(url, "source", opts.source);
        return fetchJson(url);
    }
    /**
     * List firm/indicative quotes for one Auction RFQ PDA from the same public
     * tape endpoint used by the terminal. If the indexer is behind, the endpoint
     * falls back to the on-chain auction snapshot's best quote.
     */
    async listRfqQuotes(auction, opts = {}) {
        const auctionPda = pubkeyishToBase58(auction);
        const url = apiUrl(`/api/rfq-auctions/${encodeURIComponent(auctionPda)}/quotes`, opts.webUrl);
        setOptionalParam(url, "limit", opts.limit);
        return fetchJson(url);
    }
    /**
     * List the secondary market tape from the same public endpoint used by the
     * terminal. This is a readback surface, not an execution primitive: fills
     * should still go through the SDK/MCP/API trade path that holds the wallet.
     */
    async listSecondaryListings(opts = {}) {
        const url = apiUrl("/api/listings", opts.webUrl);
        setOptionalParam(url, "asset", opts.asset);
        if (opts.active !== undefined) {
            url.searchParams.set("active", opts.active ? "true" : "false");
        }
        setOptionalParam(url, "minQty", opts.minQty);
        setOptionalParam(url, "maxAsk", opts.maxAsk);
        setOptionalParam(url, "excludeMe", opts.excludeMe ? pubkeyishToBase58(opts.excludeMe) : undefined);
        setOptionalParam(url, "seller", opts.seller ? pubkeyishToBase58(opts.seller) : undefined);
        setOptionalParam(url, "optionPda", opts.optionPda ? pubkeyishToBase58(opts.optionPda) : undefined);
        if (opts.pending !== undefined) {
            url.searchParams.set("pending", opts.pending ? "true" : "false");
        }
        setOptionalParam(url, "limit", opts.limit);
        return fetchJson(url);
    }
    /**
     * Post a seller-signed secondary-market discovery row. This is a tape
     * listing, not escrow custody: the option remains in the seller wallet
     * until the seller later signs `transferOption`.
     */
    async createSecondaryListing(args) {
        const optionPda = pubkeyishToBase58(args.optionPda);
        const optionTokenMint = args.optionTokenMint
            ? pubkeyishToBase58(args.optionTokenMint)
            : (0, pda_1.findOptionTokenMintPda)(new web3_js_1.PublicKey(optionPda))[0].toBase58();
        const seller = this.wallet.publicKey.toBase58();
        const optionReadback = (await this.listOptions({ pda: optionPda, limit: 1 }))[0] ?? null;
        if (optionReadback === null) {
            throw new Error(`createSecondaryListing: option not found on-chain: ${optionPda}`);
        }
        if (optionReadback.holder !== seller) {
            throw new Error(`createSecondaryListing: configured wallet ${seller} is not current option holder ${optionReadback.holder}`);
        }
        const askPriceUsdc = Number(args.askPriceUsdc);
        const tokenAmount = Number(args.tokenAmount ?? 1);
        const durationHours = Number(args.durationHours ?? 24);
        const sellerHandle = args.sellerHandle ?? null;
        if (optionReadback.state !== "Active") {
            throw new Error(`createSecondaryListing: option state must be Active for transfer delivery, got ${optionReadback.state}`);
        }
        if (optionReadback.expiryTs <= Math.floor(Date.now() / 1000)) {
            throw new Error("createSecondaryListing: option is expired and cannot be transferred");
        }
        if (optionTokenMint !== optionReadback.optionTokenMint) {
            throw new Error(`createSecondaryListing: option token mint guard mismatch: expected ${optionReadback.optionTokenMint}, got ${optionTokenMint}`);
        }
        if (!Number.isFinite(askPriceUsdc) || askPriceUsdc <= 0) {
            throw new Error("createSecondaryListing: askPriceUsdc must be > 0");
        }
        if (!Number.isFinite(tokenAmount) || tokenAmount !== 1) {
            throw new Error("createSecondaryListing: tokenAmount must be exactly 1 for option-token delivery");
        }
        if (!Number.isFinite(durationHours) || durationHours <= 0 || durationHours > 720) {
            throw new Error("createSecondaryListing: durationHours must be in (0, 720]");
        }
        const listingExpiryTs = Math.floor(Date.now() / 1000 + durationHours * 3600);
        if (listingExpiryTs >= optionReadback.expiryTs) {
            throw new Error("createSecondaryListing: listing duration must end before option expiry");
        }
        const signedMessage = this._secondaryListingMessage({
            optionPda,
            optionTokenMint,
            seller,
            askPriceUsdc,
            tokenAmount,
            durationHours,
            sellerHandle,
        });
        const signature = await this._signApiMessage(signedMessage);
        const url = apiUrl("/api/listings", args.webUrl);
        const response = await postJson(url, {
            optionPda,
            optionTokenMint,
            seller,
            sellerHandle,
            askPriceUsdc,
            tokenAmount,
            durationHours,
            signedMessage,
            signature,
        });
        return {
            success: true,
            listing: response.listing,
            option_pda: optionPda,
            option_token_mint: optionTokenMint,
            seller,
            ask_price_usdc: askPriceUsdc,
            token_amount: tokenAmount,
            holder_verified: true,
            option_readback: optionReadback,
        };
    }
    /**
     * Pay a secondary listing seller in devnet USDC and record a buyer-signed
     * buy intent on the public tape. Completion still requires the seller to
     * sign `transferOption(option, buyer)` because the current secondary lane
     * is escrow-less discovery plus explicit option transfer.
     */
    async buySecondaryListing(args) {
        const listingId = String(args.listingId);
        const buyer = this.wallet.publicKey;
        if (!listingId)
            throw new Error("buySecondaryListing: listingId is required");
        const listingUrl = apiUrl(`/api/listings/${encodeURIComponent(listingId)}`, args.webUrl);
        const listingResponse = await fetchJson(listingUrl);
        const listing = listingResponse.listing;
        if (!listing) {
            throw new Error(`buySecondaryListing: listing not found: ${listingId}`);
        }
        const optionPda = String(listing.option_pda);
        const seller = String(listing.seller);
        const askPriceUsdc = Number(listing.ask_price_usdc);
        if (args.optionPda !== undefined) {
            const expectedOption = pubkeyishToBase58(args.optionPda);
            if (expectedOption !== optionPda) {
                throw new Error(`buySecondaryListing: option guard mismatch: expected ${expectedOption}, listing has ${optionPda}`);
            }
        }
        if (args.seller !== undefined) {
            const expectedSeller = pubkeyishToBase58(args.seller);
            if (expectedSeller !== seller) {
                throw new Error(`buySecondaryListing: seller guard mismatch: expected ${expectedSeller}, listing has ${seller}`);
            }
        }
        if (args.askPriceUsdc !== undefined && Number(args.askPriceUsdc) !== askPriceUsdc) {
            throw new Error(`buySecondaryListing: ask guard mismatch: expected ${Number(args.askPriceUsdc)}, listing has ${askPriceUsdc}`);
        }
        if (listing.status !== "active") {
            throw new Error(`buySecondaryListing: listing is ${listing.status}, not active`);
        }
        if (Number(listing.token_amount) !== 1) {
            throw new Error(`buySecondaryListing: listing token_amount must be exactly 1, got ${listing.token_amount}`);
        }
        if (listing.seller_handle && String(listing.seller_handle).startsWith("pending:")) {
            throw new Error("buySecondaryListing: listing already has a pending buyer");
        }
        if (new Date(listing.listing_expires_at).getTime() <= Date.now()) {
            throw new Error("buySecondaryListing: listing has expired");
        }
        if (seller === buyer.toBase58()) {
            throw new Error("buySecondaryListing: buyer cannot buy their own listing");
        }
        if (!Number.isFinite(askPriceUsdc) || askPriceUsdc <= 0) {
            throw new Error("buySecondaryListing: askPriceUsdc must be > 0");
        }
        const optionReadback = (await this.listOptions({ pda: optionPda, limit: 1 }))[0] ?? null;
        if (optionReadback === null) {
            throw new Error(`buySecondaryListing: option not found on-chain: ${optionPda}`);
        }
        if (optionReadback.holder !== seller) {
            throw new Error(`buySecondaryListing: listing seller ${seller} is not current holder ${optionReadback.holder}`);
        }
        if (optionReadback.state !== "Active") {
            throw new Error(`buySecondaryListing: option state must be Active for transfer delivery, got ${optionReadback.state}`);
        }
        if (optionReadback.expiryTs <= Math.floor(Date.now() / 1000)) {
            throw new Error("buySecondaryListing: option is expired and cannot be transferred");
        }
        if (String(listing.option_token_mint) !== optionReadback.optionTokenMint) {
            throw new Error(`buySecondaryListing: listing option_token_mint ${listing.option_token_mint} does not match on-chain mint ${optionReadback.optionTokenMint}`);
        }
        if (optionReadback.creator === buyer.toBase58()) {
            throw new Error("buySecondaryListing: option creator cannot buy this listing through transferOption. " +
                "Creator-side buyback needs a dedicated PM close path; paying first would leave delivery blocked.");
        }
        const buyerAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, buyer);
        const sellerPk = new web3_js_1.PublicKey(seller);
        const sellerAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, sellerPk);
        const amountMicro = BigInt(Math.round(askPriceUsdc * 1000000));
        const buyerTokenAccount = await (0, spl_token_1.getAccount)(this.connection, buyerAta, "confirmed", spl_token_1.TOKEN_PROGRAM_ID);
        if (buyerTokenAccount.amount < amountMicro) {
            throw new Error(`buySecondaryListing: insufficient USDC; need ${amountMicro.toString()} micro, have ${buyerTokenAccount.amount.toString()} micro`);
        }
        const tx = new web3_js_1.Transaction();
        tx.add((0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(buyer, sellerAta, sellerPk, this.usdcMint, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID));
        tx.add((0, spl_token_1.createTransferInstruction)(buyerAta, sellerAta, buyer, amountMicro, [], spl_token_1.TOKEN_PROGRAM_ID));
        const paymentTxSig = await this._sendAndConfirm(tx);
        const signedMessage = this._secondaryBuyIntentMessage({
            listingId,
            optionPda,
            seller,
            buyer: buyer.toBase58(),
            paymentTxSig,
            askPriceUsdc,
        });
        const signature = await this._signApiMessage(signedMessage);
        const url = apiUrl(`/api/listings/${encodeURIComponent(listingId)}/buy`, args.webUrl);
        const result = await postJson(url, {
            buyer: buyer.toBase58(),
            paymentTxSig,
            optionPda,
            seller,
            askPriceUsdc,
            signedMessage,
            signature,
        });
        return {
            ...result,
            listing_readback: listing,
        };
    }
    /**
     * Create a real pre-funded OptionAccount from the terms of an Auction RFQ's
     * current best firm quote. This is the low-CU execution bridge for local
     * MCP demos and builder bots:
     *
     * 1. Buyer opens an Auction RFQ.
     * 2. Maker submits a firm quote.
     * 3. Maker calls this method to create/deposit the actual option matching
     *    the auction terms.
     * 4. Buyer calls `buy(option, premiumUsd)` using the returned premium.
     *
     * This method does not mutate the auction PDA, and it does not pretend that
     * `finalize_rfq_auction` mints an option. The returned option PDA is the
     * actual execution artifact that portfolio/readback tools must track.
     */
    async createOptionFromRfqAuction(args) {
        this._assertProgramLoaded();
        const auction = typeof args.auction === "string" ? new web3_js_1.PublicKey(args.auction) : args.auction;
        const snap = await this.fetchRfqAuction(auction);
        if (!snap) {
            throw new Error(`createOptionFromRfqAuction: RFQ auction not found: ${auction.toBase58()}`);
        }
        if (!snap.bestQuoteMm || snap.bestQuotePremiumMicro === null || snap.bestQuoteValidUntilSlot === null) {
            throw new Error(`createOptionFromRfqAuction: RFQ auction ${auction.toBase58()} has no firm best quote yet`);
        }
        if (snap.state === "Cancelled") {
            throw new Error(`createOptionFromRfqAuction: RFQ auction ${auction.toBase58()} is cancelled`);
        }
        const requireBestQuoteForMaker = args.requireBestQuoteForMaker ?? true;
        if (requireBestQuoteForMaker && !snap.bestQuoteMm.equals(this.wallet.publicKey)) {
            throw new Error(`createOptionFromRfqAuction: configured wallet ${this.wallet.publicKey.toBase58()} is not the best-quote maker ${snap.bestQuoteMm.toBase58()}`);
        }
        if (args.allowExpiredQuote !== true) {
            const currentSlot = BigInt(await this.connection.getSlot("confirmed"));
            if (snap.bestQuoteValidUntilSlot < currentSlot) {
                throw new Error(`createOptionFromRfqAuction: best quote expired at slot ${snap.bestQuoteValidUntilSlot.toString()}, current slot ${currentSlot.toString()}`);
            }
        }
        const createParams = createParamsFromRfqAuctionSnapshot(snap);
        createParams.simulateOnly = args.simulateOnly;
        createParams.dryRun = args.dryRun;
        createParams.simulate = args.simulate;
        const created = await this.create(createParams);
        const [optionTokenMint] = (0, pda_1.findOptionTokenMintPda)(created.address);
        return {
            auction: auction.toBase58(),
            buyer: snap.buyer.toBase58(),
            maker: this.wallet.publicKey.toBase58(),
            quoteMm: snap.bestQuoteMm.toBase58(),
            premiumMicro: snap.bestQuotePremiumMicro,
            premiumUsd: (0, pda_1.fromUsdcUnits)(snap.bestQuotePremiumMicro),
            option: created.address.toBase58(),
            optionTokenMint: optionTokenMint.toBase58(),
            createTx: created.createTx,
            depositTx: created.depositTx,
            simulated: created.simulated,
            simulation: created.simulation,
            createParams,
        };
    }
    /**
     * Buyer-side RFQ execution guard for the Auction RFQ -> pre-funded option
     * bridge. The on-chain `buy_option` primitive intentionally knows only the
     * funded option PDA and premium amount, so this SDK helper binds a buyer
     * action back to the auction tape before sending the transaction:
     *
     * - configured wallet must be the RFQ buyer
     * - current best quote maker must match the option creator
     * - option terms must match the auction spec
     * - exact best-quote premium is passed to `buy_option`
     */
    async buyOptionFromRfqAuction(args) {
        this._assertProgramLoaded();
        const auction = typeof args.auction === "string" ? new web3_js_1.PublicKey(args.auction) : args.auction;
        const optionPda = typeof args.option === "string" ? new web3_js_1.PublicKey(args.option) : args.option;
        const snap = await this.fetchRfqAuction(auction);
        if (!snap) {
            throw new Error(`buyOptionFromRfqAuction: RFQ auction not found: ${auction.toBase58()}`);
        }
        if (!snap.buyer.equals(this.wallet.publicKey)) {
            throw new Error(`buyOptionFromRfqAuction: configured wallet ${this.wallet.publicKey.toBase58()} is not RFQ buyer ${snap.buyer.toBase58()}`);
        }
        if (!snap.bestQuoteMm || snap.bestQuotePremiumMicro === null || snap.bestQuoteValidUntilSlot === null) {
            throw new Error(`buyOptionFromRfqAuction: RFQ auction ${auction.toBase58()} has no firm best quote`);
        }
        if (snap.state === "Cancelled") {
            throw new Error(`buyOptionFromRfqAuction: RFQ auction ${auction.toBase58()} is cancelled`);
        }
        if (args.allowExpiredQuote !== true) {
            const currentSlot = BigInt(await this.connection.getSlot("confirmed"));
            if (snap.bestQuoteValidUntilSlot < currentSlot) {
                throw new Error(`buyOptionFromRfqAuction: best quote expired at slot ${snap.bestQuoteValidUntilSlot.toString()}, current slot ${currentSlot.toString()}`);
            }
        }
        const options = await this.listOptions({ pda: optionPda, limit: 1 });
        const optionSummary = options[0];
        if (!optionSummary) {
            throw new Error(`buyOptionFromRfqAuction: option not found: ${optionPda.toBase58()}`);
        }
        const expected = createParamsFromRfqAuctionSnapshot(snap);
        const expectedType = expected.payoff;
        const expectedDirection = expectedType === "vanilla_put" ||
            expectedType === "digital_put" ||
            expectedType === "capped_put"
            ? "sell"
            : "buy";
        const optionTypeMatches = (expectedType === "vanilla_call" || expectedType === "vanilla_put") &&
            optionSummary.optionType === "Vanilla" ||
            (expectedType === "digital_call" || expectedType === "digital_put") &&
                optionSummary.optionType === "Digital" ||
            (expectedType === "capped_call" || expectedType === "capped_put") &&
                optionSummary.optionType === "CappedVanilla" ||
            expectedType === "range_accrual" &&
                optionSummary.optionType === "RangeAccrual";
        const directionMatches = optionSummary.optionType === "RangeAccrual" || optionSummary.direction === expectedDirection;
        const upperMatches = optionSummary.optionType !== "RangeAccrual" ||
            Math.abs(optionSummary.upperBoundUsd - (expected.upperBound ?? 0)) < 0.000001;
        const capMatches = optionSummary.optionType !== "CappedVanilla" ||
            Math.abs(optionSummary.extraParamUsd - (expected.extraParam ?? 0)) < 0.000001;
        const termsMatch = optionSummary.creator === snap.bestQuoteMm.toBase58() &&
            optionSummary.underlying === expected.underlying &&
            optionTypeMatches &&
            directionMatches &&
            Math.abs(optionSummary.strikeUsd - expected.strike) < 0.000001 &&
            optionSummary.expiryTs === Math.floor(Date.parse(expected.expiry) / 1000) &&
            Math.abs(optionSummary.payoffUsd - expected.notional) < 0.000001 &&
            upperMatches &&
            capMatches;
        if (!termsMatch) {
            throw new Error(`buyOptionFromRfqAuction: option ${optionPda.toBase58()} does not match RFQ auction ${auction.toBase58()} best quote terms`);
        }
        const result = await this._buyWithPremiumMicro(optionPda, snap.bestQuotePremiumMicro);
        return {
            ...result,
            auction: auction.toBase58(),
            buyer: snap.buyer.toBase58(),
            maker: optionSummary.creator,
            quoteMm: snap.bestQuoteMm.toBase58(),
            premiumMicro: snap.bestQuotePremiumMicro,
            premiumUsd: (0, pda_1.fromUsdcUnits)(snap.bestQuotePremiumMicro),
            verifiedTerms: true,
        };
    }
    /**
     * Portfolio readback from the actual OptionAccount source of truth. Longs are
     * current-holder matches; shorts are creator/writer matches. A single option
     * can appear in both lists while the creator still holds an unsold listing,
     * so `options` de-duplicates by PDA for receipt-style callers.
     */
    async getPortfolio(owner = this.wallet.publicKey) {
        const ownerBase58 = pubkeyishToBase58(owner);
        const [longOptions, shortOptions, clearingMember] = await Promise.all([
            this.listOptions({ holder: ownerBase58, limit: 500 }),
            this.listOptions({ creator: ownerBase58, limit: 500 }),
            this.fetchClearingMember(new web3_js_1.PublicKey(ownerBase58)),
        ]);
        const byPda = new Map();
        for (const option of longOptions)
            byPda.set(option.pda, option);
        for (const option of shortOptions)
            byPda.set(option.pda, option);
        return {
            owner: ownerBase58,
            longOptions,
            shortOptions,
            options: [...byPda.values()],
            clearingMember,
        };
    }
    async _fetchOption(pda) {
        const acc = this._program().account["optionAccount"];
        if (!acc)
            throw new Error("IDL not loaded — use SkewClient.fromProgram()");
        const result = await acc.fetch(pda);
        if (!result)
            throw new Error(`Option not found: ${pda.toBase58()}`);
        return result;
    }
    async _sendAndConfirm(tx) {
        const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash("confirmed");
        tx.recentBlockhash = blockhash;
        tx.feePayer = this.wallet.publicKey;
        const signed = await this.wallet.signTransaction(tx);
        let sig;
        try {
            sig = await this.connection.sendRawTransaction(signed.serialize(), {
                skipPreflight: false,
            });
        }
        catch (err) {
            const typed = this._typedProgramError(err);
            if (typed)
                throw typed;
            throw err;
        }
        const confirmation = await this.connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");
        if (confirmation.value.err) {
            const logs = await this._confirmedTransactionLogs(sig);
            const typed = this._typedProgramError(confirmation.value.err, logs);
            if (typed)
                throw typed;
            const err = new Error(`Transaction ${sig} failed: ${JSON.stringify(confirmation.value.err)}`);
            if (logs)
                err.logs = logs;
            throw err;
        }
        return sig;
    }
    _typedProgramError(err, logs) {
        const errWithLogs = logs ? { logs } : err;
        const fromLogs = (0, errors_1.fromTxError)(errWithLogs, this.program?.programId ?? pda_1.SKEW_PROGRAM_ID);
        if (fromLogs)
            return fromLogs;
        const code = extractCustomProgramErrorCode(err);
        return code === null ? null : (0, errors_1.fromCode)(code, logs);
    }
    async _confirmedTransactionLogs(sig) {
        try {
            const tx = await this.connection.getTransaction(sig, {
                commitment: "confirmed",
                maxSupportedTransactionVersion: 0,
            });
            return tx?.meta?.logMessages ?? undefined;
        }
        catch {
            return undefined;
        }
    }
    async _simulateTransaction(tx) {
        const { blockhash } = await this.connection.getLatestBlockhash("confirmed");
        tx.recentBlockhash = blockhash;
        tx.feePayer = this.wallet.publicKey;
        const signed = await this.wallet.signTransaction(tx);
        const sim = await this.connection.simulateTransaction(signed, undefined, false);
        return {
            ok: sim.value.err == null,
            err: sim.value.err == null ? null : JSON.stringify(sim.value.err),
            unitsConsumed: sim.value.unitsConsumed ?? undefined,
            logs: sim.value.logs ?? [],
        };
    }
    // -------------------------------------------------------------------------
    // Phase 1635 — Isolated Margin per-position vault
    //
    // A user opts into isolated margin for a SPECIFIC option by initialising
    // a per-(user, option) vault, depositing USDC, and letting settle/liquidate
    // drain the vault first when remaining_accounts carries the matching
    // (vault_pda, vault_escrow) pair.
    // -------------------------------------------------------------------------
    /**
     * One-shot per (user, option) — initialise the IsolatedVault PDA + escrow ATA.
     * Caller pays rent (~0.004 SOL).
     */
    async initIsolatedVault(option) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findIsolatedVaultPda)(user, optionPda);
        const [vaultEscrow] = (0, pda_1.findIsolatedVaultEscrowPda)(vault);
        const tx = await this._program()
            .methods.initIsolatedVault()
            .accounts({
            user,
            option: optionPda,
            vault,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            vaultEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * User → vault USDC transfer. Increments `vault.usdc_micro`.
     * Vault must already be initialised via `initIsolatedVault`.
     */
    async depositIsolated(option, amountUsdc) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findIsolatedVaultPda)(user, optionPda);
        const [vaultEscrow] = (0, pda_1.findIsolatedVaultEscrowPda)(vault);
        const userAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, user);
        const tx = await this._program()
            .methods.depositIsolated(new anchor_1.BN((0, pda_1.toUsdcUnits)(amountUsdc).toString()))
            .accounts({
            user,
            vault,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            userAta,
            vaultEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Vault → user USDC transfer. Anchor enforces
     * `amount ≤ vault.free_micro()` so funds locked behind an open option
     * fill cannot be pulled.
     */
    async withdrawIsolated(option, amountUsdc) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findIsolatedVaultPda)(user, optionPda);
        const [vaultEscrow] = (0, pda_1.findIsolatedVaultEscrowPda)(vault);
        const userAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, user);
        const tx = await this._program()
            .methods.withdrawIsolated(new anchor_1.BN((0, pda_1.toUsdcUnits)(amountUsdc).toString()))
            .accounts({
            user,
            vault,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            userAta,
            vaultEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // -------------------------------------------------------------------------
    // Phase 1637 — Multi-leg combo intent
    //
    // Buyer commits upfront premium to a multi-leg strategy (Iron Condor /
    // vertical spread / etc.). Off-chain relay coordinates leg fills via
    // atomic_fill_relay with the combo PDA in remaining_accounts. Once all
    // legs filled, finalize_combo_intent flips → Active and refunds residual.
    // -------------------------------------------------------------------------
    /**
     * Register a multi-leg combo intent — escrow upfront max premium + pin
     * the leg specs (option PDAs + side ±1 + per-leg max premium).
     *
     * @param comboId — caller-chosen u64 nonce; same buyer can run multiple
     *   concurrent combos.
     * @param legs — 2..=4 legs. Leg's `option` PDA must be deterministic
     *   (predicted via `findOptionPda(cm_authority, relay_nonce)` for relay
     *   path or already-existing for OTC).
     * @param totalMaxPremiumUsdc — cap on total premium across all legs.
     * @param expiryTsSeconds — unix ts of combo expiry. Cancel becomes
     *   permitted at any time before; fills must complete by then.
     */
    async registerComboIntent(comboId, legs, totalMaxPremiumUsdc, expiryTsSeconds) {
        this._assertProgramLoaded();
        if (legs.length < 2 || legs.length > 4) {
            throw new Error(`registerComboIntent: legs.length must be 2..=4, got ${legs.length}`);
        }
        const buyer = this.wallet.publicKey;
        const [combo] = (0, pda_1.findComboIntentPda)(buyer, comboId);
        const [comboEscrow] = (0, pda_1.findComboEscrowPda)(combo);
        const buyerAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, buyer);
        // Pad to fixed-4 array.
        const legOptions = [
            legs[0]?.option ?? web3_js_1.PublicKey.default,
            legs[1]?.option ?? web3_js_1.PublicKey.default,
            legs[2]?.option ?? web3_js_1.PublicKey.default,
            legs[3]?.option ?? web3_js_1.PublicKey.default,
        ];
        const legSides = [
            legs[0]?.side ?? 0,
            legs[1]?.side ?? 0,
            legs[2]?.side ?? 0,
            legs[3]?.side ?? 0,
        ];
        const legMaxPremiums = [0, 1, 2, 3].map((i) => new anchor_1.BN((0, pda_1.toUsdcUnits)(legs[i]?.maxPremiumUsdc ?? 0).toString()));
        const tx = await this._program()
            .methods.registerComboIntent(new anchor_1.BN(comboId.toString()), legs.length, legOptions, legSides, legMaxPremiums, new anchor_1.BN((0, pda_1.toUsdcUnits)(totalMaxPremiumUsdc).toString()), new anchor_1.BN(expiryTsSeconds.toString()))
            .accounts({
            buyer,
            combo,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            buyerAta,
            comboEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .remainingAccounts(this._hamiltonRemaining())
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, combo, comboEscrow };
    }
    /**
     * Cancel an Open combo. Refunds residual escrow + closes the PDA + escrow,
     * recovering ~0.004 SOL of rent. Must be Open status (not Active/Cancelled).
     */
    async cancelComboIntent(comboId) {
        this._assertProgramLoaded();
        const buyer = this.wallet.publicKey;
        const [combo] = (0, pda_1.findComboIntentPda)(buyer, comboId);
        const [comboEscrow] = (0, pda_1.findComboEscrowPda)(combo);
        const buyerAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, buyer);
        const tx = await this._program()
            .methods.cancelComboIntent()
            .accounts({
            buyer,
            combo,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            buyerAta,
            comboEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Finalise a fully-filled combo. Flips status → Active, refunds residual
     * (max premium − actually paid), closes the PDA + escrow.
     */
    async finalizeComboIntent(comboId) {
        this._assertProgramLoaded();
        const buyer = this.wallet.publicKey;
        const [combo] = (0, pda_1.findComboIntentPda)(buyer, comboId);
        const [comboEscrow] = (0, pda_1.findComboEscrowPda)(combo);
        const buyerAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, buyer);
        const tx = await this._program()
            .methods.finalizeComboIntent()
            .accounts({
            buyer,
            combo,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            buyerAta,
            comboEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // -------------------------------------------------------------------------
    // Read-only fetchers — DVOL + IsolatedVault + ComboIntent
    // -------------------------------------------------------------------------
    /**
     * Fetch the latest DVOL snapshot for an asset. Returns null when no
     * crank has run yet (PDA does not exist).
     */
    async fetchDvol(assetIdx) {
        this._assertProgramLoaded();
        const [dvolPda] = (0, pda_1.findDvolPda)(assetIdx);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.dvolPda.fetch(dvolPda);
            const slot = await this.connection.getSlot();
            const lastSlot = BigInt(acc.lastUpdateSlot.toString());
            // DVOL_STALENESS_SLOTS = 9_000 (≈ 1 h at 400 ms/slot).
            const isFresh = BigInt(slot) - lastSlot < 9000n;
            return {
                dvol28dPct: Number(acc.dvol28dMicro.toString()) / 10000,
                dvol90dPct: Number(acc.dvol90dMicro.toString()) / 10000,
                realizedVar28dPct: Number(acc.realizedVar28dMicro.toString()) / 10000,
                lastUpdateSlot: lastSlot,
                isFresh,
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Fetch an IsolatedVault snapshot. Returns null when not initialised.
     */
    async fetchIsolatedVault(user, option) {
        this._assertProgramLoaded();
        const optionPda = typeof option === "string" ? new web3_js_1.PublicKey(option) : option;
        const [vaultPda] = (0, pda_1.findIsolatedVaultPda)(user, optionPda);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.isolatedVault.fetch(vaultPda);
            const usdc = BigInt(acc.usdcMicro.toString());
            const locked = BigInt(acc.lockedMicro.toString());
            return {
                usdcMicro: usdc,
                lockedMicro: locked,
                freeMicro: usdc > locked ? usdc - locked : 0n,
                realizedPnlMicro: BigInt(acc.realizedPnlMicro.toString()),
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Fetch a ComboIntent snapshot. Returns null when not registered or
     * already closed (cancelled / finalised).
     */
    async fetchComboIntent(buyer, comboId) {
        this._assertProgramLoaded();
        const [comboPda] = (0, pda_1.findComboIntentPda)(buyer, comboId);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.comboIntentPda.fetch(comboPda);
            const nLegs = acc.nLegs;
            const mask = acc.legsFilledMask;
            const fullMask = nLegs === 0 ? 0 : (1 << nLegs) - 1;
            const statusMap = {
                open: "Open",
                active: "Active",
                cancelled: "Cancelled",
                settled: "Settled",
            };
            const statusKey = Object.keys(acc.status)[0] ?? "open";
            return {
                nLegs,
                legsFilledMask: mask,
                status: statusMap[statusKey] ?? "Open",
                totalMaxPremiumMicro: BigInt(acc.totalMaxPremiumMicro.toString()),
                totalPremiumPaidMicro: BigInt(acc.totalPremiumPaidMicro.toString()),
                expiryTs: BigInt(acc.expiryTs.toString()),
                isFullyFilled: fullMask !== 0 && (mask & fullMask) === fullMask,
            };
        }
        catch {
            return null;
        }
    }
    // -------------------------------------------------------------------------
    // Phase 1639 — read snapshot fetchers for the §3 hidden-index PDAs
    //
    // These wrap `program.account.<X>.fetch()` over the PDAs the SKEW_AUTHORITY
    // crank pipeline populates. Returning `null` (instead of throwing) lets
    // UI / LLM callers handle cold-start gracefully — the F1 surface engine
    // already has the same falls-back-cleanly contract.
    //
    // micro→decimal conversion: every `*_micro` field divides by 1e6 per spec
    // §33.3 fixed-point convention.
    // -------------------------------------------------------------------------
    /** Read the per-asset PoVS state — full Heston × VRP × tail vector. */
    async fetchPovs(assetIdx) {
        this._assertProgramLoaded();
        const [pda] = (0, pda_1.findPovsStatePda)(assetIdx);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.poVSState.fetch(pda);
            const SCALE = 1000000;
            return {
                sigmaT: Number(acc.sigmaTMicro.toString()) / SCALE,
                sigmaInf: Number(acc.sigmaInfMicro.toString()) / SCALE,
                thetaDt28: Number(acc.thetaDMicro.toString()) / SCALE,
                vrpRel: Number(acc.vrpRelMicro.toString()) / SCALE,
                ivAtm28d: Number(acc.ivMicro.toString()) / SCALE,
                regimeRt: Math.max(0, Math.min(1, Number(acc.regimeIndicatorMicro.toString()) / SCALE)),
                xi: Number(acc.xiMicro.toString()) / SCALE,
                beta: Number(acc.betaMicro.toString()) / SCALE,
                var99: Number(acc.var99Micro.toString()) / SCALE,
                es999: Number(acc.es999Micro.toString()) / SCALE,
                lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
            };
        }
        catch {
            return null;
        }
    }
    /** Read the per-asset Hamilton 2-state regime filter posterior. */
    async fetchHamilton(assetIdx) {
        this._assertProgramLoaded();
        const [pda] = (0, pda_1.findHamiltonPda)(assetIdx);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.hamiltonState.fetch(pda);
            const SCALE = 1000000;
            return {
                asset: assetIdx,
                piCalm: Number(acc.piCalmMicro.toString()) / SCALE,
                piStress: Number(acc.piStressMicro.toString()) / SCALE,
                muCalm: Number(acc.muCalmMicro.toString()) / SCALE,
                muStress: Number(acc.muStressMicro.toString()) / SCALE,
                sigmaCalm: Number(acc.sigmaCalmMicro.toString()) / SCALE,
                sigmaStress: Number(acc.sigmaStressMicro.toString()) / SCALE,
                p01: Number(acc.p01Micro.toString()) / SCALE,
                p10: Number(acc.p10Micro.toString()) / SCALE,
                consecutiveStressDays: Number(acc.consecutiveStressDays),
                consecutiveCalmDays: Number(acc.consecutiveCalmDays),
                lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
            };
        }
        catch {
            return null;
        }
    }
    /** Read per-asset SkewMetrics — RR25 / BF25 / RR10 / ATM slope + 8-tenor IV. */
    async fetchSkewMetrics(assetIdx) {
        this._assertProgramLoaded();
        const [pda] = (0, pda_1.findSkewMetricsPda)(assetIdx);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.skewMetricsPda.fetch(pda);
            const SCALE = 1000000;
            const rawTenors = acc.ivPerTenorMicro ?? [];
            const ivPerTenor = rawTenors.map((v) => Number(v.toString()) / SCALE);
            return {
                asset: assetIdx,
                atmIv28d: Number(acc.atmIv28dMicro.toString()) / SCALE,
                rr25: Number(acc.rr25Micro.toString()) / SCALE,
                bf25: Number(acc.bf25Micro.toString()) / SCALE,
                rr10: Number(acc.rr10Micro.toString()) / SCALE,
                atmSlope: Number(acc.atmSlopeMicro.toString()) / SCALE,
                ivPerTenor,
                lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Read the singleton CrossAssetMatrix — 10 pairwise ρ + 10 stress ρ across
     * BTC/ETH/SOL/XRP/HYPE. Single-PDA scan via getProgramAccounts; the IDL
     * lists CrossAssetMatrix as a `zero_copy` account so the standard
     * `program.account.crossAssetMatrix.all()` returns the parsed body.
     */
    async fetchCrossAssetMatrix() {
        this._assertProgramLoaded();
        try {
            const accClient = this._program().account["crossAssetMatrix"];
            if (!accClient)
                return null;
            const accs = await accClient.all();
            if (accs.length === 0)
                return null;
            const acc = accs[0].account;
            const SCALE = 1000000;
            return {
                iccRhoP5: acc.iccRhoP5Micro.map((v) => Number(v) / SCALE),
                stressRho: acc.stressRhoMicro.map((v) => Number(v) / SCALE),
                lastFitSlot: BigInt(acc.lastFitSlot.toString()),
                lastPearsonSlot: BigInt(acc.lastPearsonSlot.toString()),
                lastStressSlot: BigInt(acc.lastStressSlot.toString()),
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Read the per-asset MicrostructurePDA — spot / bid-ask / depth / 24h
     * volume / IV bid-ask. Per-asset scan via `.all()` + filter.
     */
    async fetchMicrostructure(assetIdx) {
        this._assertProgramLoaded();
        try {
            const accClient = this._program().account["microstructurePDA"];
            if (!accClient)
                return null;
            const accs = await accClient.all();
            const match = accs.find((x) => x.account.asset === assetIdx);
            if (!match)
                return null;
            const acc = match.account;
            const SCALE = 1000000;
            return {
                asset: assetIdx,
                lastUpdateSlot: BigInt(acc.lastUpdateSlot.toString()),
                spot: Number(acc.spotMicro.toString()) / SCALE,
                bidAskSpreadBps: acc.bidAskSpreadBps,
                depth100kUsd: Number(acc.depth100kUsdMicro.toString()) / SCALE,
                volume24hUsd: Number(acc.volume24hUsdMicro.toString()) / SCALE,
                ivBid28d: Number(acc.ivBid28dMicro.toString()) / SCALE,
                ivAsk28d: Number(acc.ivAsk28dMicro.toString()) / SCALE,
            };
        }
        catch {
            return null;
        }
    }
    /** Read the singleton Insurance Fund balances used by the 6-tier default cascade. */
    async fetchInsuranceFund() {
        this._assertProgramLoaded();
        const [pda] = (0, pda_1.findInsuranceFundPda)();
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.insuranceFund.fetch(pda);
            return {
                tier3ProtocolSitgMicro: BigInt(acc.tier3ProtocolSitg.toString()),
                tier1MutualizedPoolMicro: BigInt(acc.tier1MutualizedPool.toString()),
                tier2MutualizedPoolMicro: BigInt(acc.tier2MutualizedPool.toString()),
                crossMutualizedPoolMicro: BigInt(acc.crossMutualizedPool.toString()),
                totalCmContributionsMicro: BigInt(acc.totalCmContributions.toString()),
                totalDrainedMicro: BigInt(acc.totalDrained.toString()),
                defaultEventCount: Number(acc.defaultEventCount),
            };
        }
        catch {
            return null;
        }
    }
    /** Read a CM's `ClearingMemberAccount` snapshot — full risk diagnostic. */
    async fetchClearingMember(authority = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const [pda] = (0, pda_1.findClearingMemberPda)(authority);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.clearingMemberAccount.fetch(pda);
            const collateral = BigInt(acc.collateral.toString());
            const ifContribution = BigInt(acc.ifContribution.toString());
            const tierLockup = BigInt(acc.tierLockupCollateral.toString());
            const totalPmLocked = BigInt(acc.totalPmLockedMicro.toString());
            const free = collateral - tierLockup - totalPmLocked;
            const tradable = collateral - totalPmLocked;
            const tierKey = Object.keys(acc.tier)[0] ?? "standard";
            const tierMap = {
                standard: 0,
                silver: 1,
                gold: 2,
                platinum: 3,
            };
            return {
                authority,
                collateralMicro: collateral,
                ifContributionMicro: ifContribution,
                tierLockupCollateralMicro: tierLockup,
                totalPmLockedMicro: totalPmLocked,
                freeCollateralMicro: free > 0n ? free : 0n,
                tradableCollateralMicro: tradable > 0n ? tradable : 0n,
                netNotionalLongMicro: BigInt(acc.netNotionalLong.toString()),
                netNotionalShortMicro: BigInt(acc.netNotionalShort.toString()),
                positionsCount: Number(acc.positionsCount),
                lastImMicro: BigInt(acc.lastImMicro.toString()),
                tier: tierMap[tierKey] ?? 0,
                tierLockedUntil: BigInt(acc.tierLockedUntil.toString()),
                underLiquidation: Boolean(acc.underLiquidation),
                lastMarginCheck: BigInt(acc.lastMarginCheck.toString()),
            };
        }
        catch {
            return null;
        }
    }
    // -------------------------------------------------------------------------
    // Phase 1634 admin / keeper wrappers — ADL + Clawback + IF auto-replenish
    //
    // SKEW_AUTHORITY-only paths. Phase 1 keeper bots invoke these in response
    // to liquidate.rs Tier-5 ProtocolSitgDrained signals (post-cascade bad-debt
    // residual) or scheduled fee → SITG replenish polls.
    //
    // Phase 2 governance multisig will swap the address gate from a hardcoded
    // single key to a 3-of-5 multisig threshold check.
    // -------------------------------------------------------------------------
    /**
     * ADL step — drains up to `targetLossUsdc` from the supplied winner CMs.
     * Each winner is capped at 50 % of their `free_collateral`. Off-chain
     * priority sort decides the order.
     *
     * @param targetLossUsdc — bad-debt residual to absorb (typically read from
     *   the tier-5 `DefaultAbsorbed` event the failed `liquidate` emitted).
     * @param winners — pre-sorted (cm, cm_escrow) pairs.
     */
    async adlStep(targetLossUsdc, winners) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [insuranceFund] = (0, pda_1.findInsuranceFundPda)();
        const [ifEscrow] = (0, pda_1.findIfEscrowPda)();
        const remaining = winners.flatMap((w) => [
            { pubkey: w.cm, isSigner: false, isWritable: true },
            { pubkey: w.cmEscrow, isSigner: false, isWritable: true },
        ]);
        const tx = await this._program()
            .methods.adlStep(new anchor_1.BN((0, pda_1.toUsdcUnits)(targetLossUsdc).toString()))
            .accounts({
            insuranceFund,
            ifEscrow,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            authority,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .remainingAccounts(remaining)
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        // Anchor `Result<u64>` returns are NOT exposed via `.transaction()` —
        // callers must subscribe to `AdlExecuted` events for per-CM drained
        // amounts and sum them off-chain. The advertised return type here is
        // the RPC-confirmed total via the post-tx event scan (Phase 2 indexer
        // helper TBD).
        return { txSignature, totalDrainedMicro: 0n };
    }
    /**
     * Clawback step — pro-rata socialised loss across all supplied winners
     * proportional to `cm.collateral − cm.last_im_micro`. Capped at 50 %
     * per CM. Off-chain caller must include EVERY profitable CM (NOT just
     * top-N) for the proportional formula to be fair.
     */
    async clawbackStep(targetLossUsdc, winners) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [insuranceFund] = (0, pda_1.findInsuranceFundPda)();
        const [ifEscrow] = (0, pda_1.findIfEscrowPda)();
        const remaining = winners.flatMap((w) => [
            { pubkey: w.cm, isSigner: false, isWritable: true },
            { pubkey: w.cmEscrow, isSigner: false, isWritable: true },
        ]);
        const tx = await this._program()
            .methods.clawbackStep(new anchor_1.BN((0, pda_1.toUsdcUnits)(targetLossUsdc).toString()))
            .accounts({
            insuranceFund,
            ifEscrow,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            authority,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .remainingAccounts(remaining)
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, totalDrainedMicro: 0n };
    }
    /**
     * IF auto-replenish — moves USDC from the protocol fee accumulator into
     * IF Tier-3 (Protocol SITG). This is SKEW_AUTHORITY-only: the keeper bot
     * polls `compute_if_target_micro` vs current capacity and invokes when
     * capacity < 80 % of target.
     */
    async replenishIfFromFees(amountUsdc, settlementMint) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const mint = settlementMint ?? this.usdcMint;
        if (!mint.equals(this.usdcMint)) {
            throw new Error("replenishIfFromFees is USDC-only. Physical wSOL/jitoSOL fees are withdrawable protocol fees, not IF replenish source.");
        }
        const [insuranceFund] = (0, pda_1.findInsuranceFundPda)();
        const [ifEscrow] = (0, pda_1.findIfEscrowPda)();
        const [feeAccumulator] = (0, pda_1.findFeeAccumulatorPda)(mint);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const tx = await this._program()
            .methods.replenishIfFromFees(new anchor_1.BN((0, pda_1.toUsdcUnits)(amountUsdc).toString()))
            .accounts({
            insuranceFund,
            feeAccumulator,
            feeAuthority,
            ifEscrow,
            settlementMint: mint,
            collateralPolicy: this._collateralPolicy(),
            authority,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** SKEW_AUTHORITY protocol fee withdrawal from a per-mint fee accumulator. */
    async withdrawFees(amount, recipient, settlementMint) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const mint = settlementMint ?? this.usdcMint;
        const [feeAccumulator] = (0, pda_1.findFeeAccumulatorPda)(mint);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const recipientAta = recipient ?? (0, spl_token_1.getAssociatedTokenAddressSync)(mint, authority);
        const tx = await this._program()
            .methods.withdrawFees(new anchor_1.BN((0, pda_1.toSettlementUnits)(amount, mint).toString()))
            .accounts({
            authority,
            feeAccumulator,
            feeAuthority,
            recipient: recipientAta,
            settlementMint: mint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * SKEW_AUTHORITY DVOL crank. The off-chain pricing service runs the
     * variance-replication integral hourly and publishes the result here.
     * Cadence: 1 h. NOT timelocked (high-cadence advisor crank).
     *
     * @param assetIdx — 0=BTC, 1=ETH, 2=SOL, 3=XRP, 4=HYPE.
     * @param dvol28dPct / dvol90dPct — annualised variance-swap fair vol
     *   in percent (e.g. 65.5 → encoded × 10⁴).
     * @param realizedVar28dPct — realised variance accumulator, percent.
     */
    async updateDvol(assetIdx, dvol28dPct, dvol90dPct, realizedVar28dPct) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [dvolPda] = (0, pda_1.findDvolPda)(assetIdx);
        const toMicro = (pct) => new anchor_1.BN(Math.floor(pct * 10000).toString());
        const tx = await this._program()
            .methods.updateDvol(assetIdx, toMicro(dvol28dPct), toMicro(dvol90dPct), toMicro(realizedVar28dPct))
            .accounts({
            dvolPda,
            authority,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // ────────────────────────────────────────────────────────────────────────
    // Phase 1633.G — Mainnet hardening
    // 18 wrappers: conditional orders (5) + apply actions (4) +
    //   RFQ auctions (5) + combo v2 (4).
    // ────────────────────────────────────────────────────────────────────────
    /**
     * Register a stop-loss / take-profit / OCO leg conditional order.
     *
     * Flow:
     *   1. Caller picks a `orderId` (u64, locally unique per authority).
     *   2. Pyth oracle + trigger price + direction define the trip wire.
     *   3. Action enum picks what fires: CloseIsolatedPosition (auto-CPI),
     *      EarlyExercise / SellViaRfq / BuybackViaRfq (fail-closed until direct CPI).
     *   4. Keeper observes Pyth EMA crossing → `executeConditionalOrder`
     *      flips state to Triggered → user calls the matching `apply_*`.
     */
    async registerConditionalOrder(args) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [order] = (0, pda_1.findConditionalOrderPda)(authority, args.orderId);
        const tx = await this._program()
            .methods.registerConditionalOrder({
            orderId: new anchor_1.BN(args.orderId.toString()),
            kind: args.kind,
            triggerOracle: args.triggerOracle,
            triggerPrice1e8: new anchor_1.BN(args.triggerPrice1e8.toString()),
            triggerDirection: args.triggerDirection,
            triggerMode: args.triggerMode,
            triggerGraceSlots: args.triggerGraceSlots,
            action: args.action,
            actionTarget: args.actionTarget,
            actionMinPremiumMicro: new anchor_1.BN(args.actionMinPremiumMicro.toString()),
            actionMaxPremiumMicro: new anchor_1.BN(args.actionMaxPremiumMicro.toString()),
            actionMaxSlippageBps: args.actionMaxSlippageBps,
            validUntilTs: new anchor_1.BN(args.validUntilTs.toString()),
        })
            .accounts({
            authority,
            order,
            actionTarget: args.actionTarget,
            governance: (0, pda_1.findGovernancePda)()[0],
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, order };
    }
    /** Cancel an Active conditional order. PDA is closed → rent + keeper-reward refunded. */
    async cancelConditionalOrder(orderId) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [order] = (0, pda_1.findConditionalOrderPda)(authority, orderId);
        const tx = await this._program()
            .methods.cancelConditionalOrder()
            .accounts({ authority, order })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Permissionless trigger crank. Keeper calls this when Pyth EMA crosses
     * `triggerPrice1e8` in `triggerDirection`. State flips Active → Triggered;
     * `ConditionalOrderTriggered` event emitted.
     */
    async executeConditionalOrder(orderAuthority, orderId, pythOracle, actionTarget, linkedOrder) {
        this._assertProgramLoaded();
        const [order] = (0, pda_1.findConditionalOrderPda)(orderAuthority, orderId);
        const snapshot = actionTarget
            ? null
            : await this.fetchConditionalOrder(orderAuthority, orderId);
        const target = actionTarget ?? snapshot?.actionTarget;
        if (!target) {
            throw new Error("executeConditionalOrder requires actionTarget, or a fetchable ConditionalOrderPda");
        }
        const tx = await this._program()
            .methods.executeConditionalOrder()
            .accounts({
            caller: this.wallet.publicKey,
            order,
            triggerOracle: pythOracle,
            actionTarget: target,
            linkedOrder: linkedOrder ?? order,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .remainingAccounts(this._hamiltonRemaining())
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Register a paired SL+TP (one-cancels-other). When either leg's
     * `apply_*_action` lands, the on-chain crank cancels the surviving leg.
     */
    async registerOcoPair(stopLoss, takeProfit) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [stopLossOrder] = (0, pda_1.findConditionalOrderPda)(authority, stopLoss.orderId);
        const [takeProfitOrder] = (0, pda_1.findConditionalOrderPda)(authority, takeProfit.orderId);
        const toArgs = (a) => ({
            orderId: new anchor_1.BN(a.orderId.toString()),
            kind: a.kind,
            triggerOracle: a.triggerOracle,
            triggerPrice1e8: new anchor_1.BN(a.triggerPrice1e8.toString()),
            triggerDirection: a.triggerDirection,
            triggerMode: a.triggerMode,
            triggerGraceSlots: a.triggerGraceSlots,
            action: a.action,
            actionTarget: a.actionTarget,
            actionMinPremiumMicro: new anchor_1.BN(a.actionMinPremiumMicro.toString()),
            actionMaxPremiumMicro: new anchor_1.BN(a.actionMaxPremiumMicro.toString()),
            actionMaxSlippageBps: a.actionMaxSlippageBps,
            validUntilTs: new anchor_1.BN(a.validUntilTs.toString()),
        });
        const tx = await this._program()
            .methods.registerOcoPair(toArgs(stopLoss), toArgs(takeProfit))
            .accounts({
            authority,
            orderA: stopLossOrder,
            orderB: takeProfitOrder,
            actionTarget: stopLoss.actionTarget,
            governance: (0, pda_1.findGovernancePda)()[0],
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, stopLossOrder, takeProfitOrder };
    }
    /** Permissionless crank — closes an Active order whose `validUntilTs` has passed. */
    async cleanupExpiredConditionalOrder(orderAuthority, orderId) {
        this._assertProgramLoaded();
        const [order] = (0, pda_1.findConditionalOrderPda)(orderAuthority, orderId);
        const tx = await this._program()
            .methods.cleanupExpiredConditionalOrder()
            .accounts({
            caller: this.wallet.publicKey,
            order,
            authority: orderAuthority,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // ── Apply actions (4) — user-signed completion of triggered conditional orders ──
    /**
     * Drains the IsolatedVault for the (user, option) and closes the order PDA.
     * Single-tx, single-click — the only of the 4 apply ix that wires a real CPI.
     *
     * The caller must supply `actionTarget` (the option PDA the order is bound
     * to). The on-chain handler enforces `option == order.action_target`, so
     * a wrong value reverts the tx — but the SDK can't read it from the order
     * PDA without the IDL exposing `ConditionalOrderPda` (the Phase 1633.G
     * IDL was hand-patched for ix only; account schemas pending). For now,
     * pass the same `actionTarget` you used in `registerConditionalOrder`.
     */
    async applyCloseIsolatedAction(orderId, actionTarget) {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        const [order] = (0, pda_1.findConditionalOrderPda)(user, orderId);
        const [vault] = (0, pda_1.findIsolatedVaultPda)(user, actionTarget);
        const [vaultEscrow] = (0, pda_1.findIsolatedVaultEscrowPda)(vault);
        const userAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, user);
        const tx = await this._program()
            .methods.applyCloseIsolatedAction()
            .accounts({
            user,
            order,
            option: actionTarget,
            vault,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            userAta,
            vaultEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Fail-closed on-chain until direct exercise CPI exists. */
    async applyEarlyExerciseAction(orderId) {
        this._assertProgramLoaded();
        throw new Error(`applyEarlyExerciseAction(${orderId}) is fail-closed on-chain until direct exercise CPI ships`);
    }
    /** Fail-closed on-chain until direct RFQ CPI exists. */
    async applySellViaRfqAction(orderId) {
        this._assertProgramLoaded();
        throw new Error(`applySellViaRfqAction(${orderId}) is fail-closed on-chain until direct RFQ CPI ships`);
    }
    /** Fail-closed on-chain until direct RFQ CPI exists. */
    async applyBuybackViaRfqAction(orderId) {
        this._assertProgramLoaded();
        throw new Error(`applyBuybackViaRfqAction(${orderId}) is fail-closed on-chain until direct RFQ CPI ships`);
    }
    // ── RFQ Auctions (5) — Phase 1633.G escrow + ed25519 verified MM quotes ──
    /** One-time MM registration. Stakes `RFQ_MAKER_DEPOSIT_LAMPORTS` anti-spam deposit. */
    async registerRfqMaker() {
        this._assertProgramLoaded();
        const mm = this.wallet.publicKey;
        const [registry] = (0, pda_1.findRfqMakerPda)(mm);
        const existing = await this.connection.getAccountInfo(registry, "confirmed");
        if (existing !== null) {
            const migrationSig = existing.data.length === LEGACY_RFQ_MAKER_REGISTRY_SIZE
                ? await this._ensureRfqMakerRegistryLayout(mm)
                : null;
            return { txSignature: migrationSig ?? "idempotent_already_registered", registry };
        }
        const lamports = await this.connection.getBalance(mm, "confirmed");
        if (lamports < RFQ_MAKER_MIN_BALANCE_LAMPORTS) {
            throw new Error(`registerRfqMaker: wallet needs at least ${(RFQ_MAKER_MIN_BALANCE_LAMPORTS / 1e9).toFixed(2)} SOL ` +
                `for the 1.00 SOL maker deposit plus rent/fees; current balance ${(lamports / 1e9).toFixed(4)} SOL`);
        }
        const tx = await this._program()
            .methods.registerRfqMaker()
            .accounts({ mm, registry, systemProgram: web3_js_1.SystemProgram.programId })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, registry };
    }
    /** Read a maker's RFQ registry state, including quote-off and MMP counters. */
    async fetchRfqMaker(mm = this.wallet.publicKey) {
        this._assertProgramLoaded();
        const [pda] = (0, pda_1.findRfqMakerPda)(mm);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const acc = await this._program().account.rfqMakerRegistryPda.fetch(pda);
            const depositLamports = BigInt(acc.depositLamports.toString());
            return {
                pda,
                mm,
                depositLamports,
                depositMicro: depositLamports,
                successCount: Number(acc.successCount),
                failCount: Number(acc.failCount),
                slashable: Boolean(acc.slashable),
                registeredAt: BigInt(acc.registeredAt.toString()),
                quoteOff: Boolean(acc.quoteOff),
                identityMode: Number(acc.identityMode),
                marginMode: Number(acc.marginMode),
                riskScopeAsset: Number(acc.riskScopeAsset),
                collateralScope: Number(acc.collateralScope),
                mmpWindowStartTs: BigInt(acc.mmpWindowStartTs.toString()),
                mmpWindowFillCount: Number(acc.mmpWindowFillCount),
                mmpWindowPremiumMicro: BigInt(acc.mmpWindowPremiumMicro.toString()),
                mmpWindowNotionalMicro: BigInt(acc.mmpWindowNotionalMicro.toString()),
            };
        }
        catch {
            return null;
        }
    }
    /**
     * Update the RFQ maker's on-chain kill switch + public tape controls.
     *
     * Defaults mirror the production lane:
     * - `quoteOff=false`
     * - `identityMode=0` anonymous, `1` disclosed
     * - `marginMode=0` portfolio, `1` single-asset, `2` cross-portfolio
     * - `riskScopeAsset=255` cross-asset, or 0..4 for a launch-panel asset
     * - `collateralScope=0` cross, `1` segregated
     */
    async setMakerRiskConfig(args = {}) {
        this._assertProgramLoaded();
        const mm = this.wallet.publicKey;
        const [registry] = (0, pda_1.findRfqMakerPda)(mm);
        await this._ensureRfqMakerRegistryLayout(mm);
        const tx = await this._program()
            .methods.setMakerRiskConfig({
            quoteOff: args.quoteOff ?? false,
            identityMode: args.identityMode ?? 0,
            marginMode: args.marginMode ?? 0,
            riskScopeAsset: args.riskScopeAsset ?? 255,
            collateralScope: args.collateralScope ?? 0,
        })
            .accounts({ mm, registry })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, registry };
    }
    /**
     * Buyer commits an RFQ auction with `maxPremiumUsdc` USDC locked into
     * escrow until finalize / cancel. Current on-chain RFQ v1 requires the
     * stable settlement policy; SOL/jitoSOL collateral is live in CM / relay
     * PM paths, not in RFQ-auction escrow registration.
     *
     * `optionSpec` mirrors the on-chain `RfqOptionSpec` struct.
     */
    async registerRfqAuction(args) {
        this._assertProgramLoaded();
        const buyer = this.wallet.publicKey;
        const [auction] = (0, pda_1.findRfqAuctionPda)(buyer, args.auctionId);
        const [escrow] = (0, pda_1.findRfqAuctionEscrowPda)(auction);
        const settlementMint = args.settlementMint ?? this.usdcMint;
        if (!settlementMint.equals(this.usdcMint)) {
            throw new Error("registerRfqAuction: current on-chain RFQ v1 is USDC/stable-only; use atomic_fill_from_relay / CM collateral paths for SOL or jitoSOL capacity.");
        }
        (0, pda_1.assertExpiryTenor)(args.optionSpec.asset, args.optionSpec.expiryTs, {
            context: "registerRfqAuction",
        });
        const buyerSettlementAta = (0, spl_token_1.getAssociatedTokenAddressSync)(settlementMint, buyer);
        const maxPremiumMicro = (0, pda_1.toUsdcUnits)(args.maxPremiumUsdc);
        if (maxPremiumMicro <= 0n) {
            throw new Error("registerRfqAuction: maxPremiumUsdc must be greater than zero");
        }
        await this._requireUsdcBalance(buyerSettlementAta, maxPremiumMicro, "registerRfqAuction");
        const rfqDirection = args.optionSpec.optionType === 3 && args.optionSpec.direction === 0
            ? 1
            : args.optionSpec.direction;
        const tx = await this._program()
            .methods.registerRfqAuction({
            auctionId: new anchor_1.BN(args.auctionId.toString()),
            optionSpec: {
                asset: args.optionSpec.asset,
                strike: new anchor_1.BN(args.optionSpec.strike.toString()),
                expiryTs: new anchor_1.BN(args.optionSpec.expiryTs.toString()),
                payoffAmountMicro: new anchor_1.BN(args.optionSpec.payoffAmountMicro.toString()),
                optionType: args.optionSpec.optionType,
                // Current Auction RFQ registration is price discovery only and
                // validates +/-1. RangeAccrual semantics are preserved by
                // optionType=3 + upperBound; relay fills use direction=0 later.
                direction: rfqDirection,
                upperBound: new anchor_1.BN(args.optionSpec.upperBound.toString()),
            },
            maxPremiumMicro: new anchor_1.BN(maxPremiumMicro.toString()),
            durationSlots: new anchor_1.BN(args.durationSlots.toString()),
            // W2 #2 — block trade flag (default false).
            isBlockTrade: args.isBlockTrade ?? false,
            // W2 #2 — minimum size hint (default 0).
            minimumSizeMicro: new anchor_1.BN(args.minimumSizeMicro?.toString() ?? "0"),
            // Wave 5B — Rule 5.21 RFQ-3 minimum (default 3).
            eligibleMakerCount: args.eligibleMakerCount ?? 3,
        })
            .accounts({
            buyer,
            auction,
            usdcMint: settlementMint,
            collateralPolicy: this._collateralPolicy(),
            buyerUsdcAta: buyerSettlementAta,
            escrowAta: escrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .remainingAccounts(this._hamiltonRemaining())
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, auction, escrow };
    }
    /**
     * MM submits a better-than-best quote. Builds the canonical RFQ digest,
     * has the MM keypair sign it, prepends an `Ed25519Program.createInstructionWithPublicKey`
     * verify ix, then calls `submit_rfq_quote`. The on-chain handler reads
     * the Instructions sysvar and verifies the signature against the digest.
     *
     * @param mmKeypair — used to sign the quote digest. Must match the
     *   wallet's publicKey (the MM is the signer of the tx itself).
     */
    async submitRfqQuote(args) {
        return this.submitRfqQuoteSigned(args);
    }
    async submitRfqQuoteSigned(args) {
        this._assertProgramLoaded();
        const mm = this.wallet.publicKey;
        const [registry] = (0, pda_1.findRfqMakerPda)(mm);
        await this._ensureRfqMakerRegistryLayout(mm);
        const digest = (0, pda_1.rfqQuoteDigestBytes)(args.auction, args.premiumMicro, args.validUntilSlot, mm);
        if (args.mmSignature.length !== 64) {
            throw new Error(`submitRfqQuoteSigned: mmSignature must be 64 bytes (ed25519), got ${args.mmSignature.length}`);
        }
        // The on-chain RFQ parser intentionally mirrors the atomic-fill relay's
        // fixed Ed25519 layout:
        //   header[16] | pubkey[32] | digest[32] | signature[64]
        // web3.js' convenience builder places message/signature at different
        // offsets, so build the tiny verify instruction directly.
        const edData = Buffer.alloc(144);
        edData[0] = 1;
        edData[1] = 0;
        edData.writeUInt16LE(80, 2); // signature_offset
        edData.writeUInt16LE(0xffff, 4); // signature_instruction_index
        edData.writeUInt16LE(16, 6); // public_key_offset
        edData.writeUInt16LE(0xffff, 8); // public_key_instruction_index
        edData.writeUInt16LE(48, 10); // message_data_offset
        edData.writeUInt16LE(32, 12); // message_data_size
        edData.writeUInt16LE(0xffff, 14); // message_instruction_index
        mm.toBuffer().copy(edData, 16);
        Buffer.from(digest).copy(edData, 48);
        Buffer.from(args.mmSignature).copy(edData, 80);
        const ed25519Ix = new web3_js_1.TransactionInstruction({
            programId: web3_js_1.Ed25519Program.programId,
            keys: [],
            data: edData,
        });
        const sigArr = Array.from(args.mmSignature);
        const submitIx = await this._program()
            .methods.submitRfqQuote({
            premiumMicro: new anchor_1.BN(args.premiumMicro.toString()),
            makerSignature: sigArr,
            validUntilSlot: new anchor_1.BN(args.validUntilSlot.toString()),
        })
            .accounts({
            mm,
            registry,
            auction: args.auction,
            ixSysvar: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .instruction();
        const tx = new web3_js_1.Transaction()
            .add(web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: RFQ_QUOTE_ED25519_CU_LIMIT }))
            .add(ed25519Ix)
            .add(submitIx);
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Browser/direct RFQ quote lane. The MM wallet signs the transaction only;
     * no detached `signMessage` digest is required. This is the terminal MM
     * quote path. The auction can later be finalized as firm quote tape; any
     * cleared option position still routes through Instant RFQ atomic fill with
     * fresh buyer/MM consent.
     */
    async submitRfqQuoteDirect(args) {
        this._assertProgramLoaded();
        const mm = this.wallet.publicKey;
        const [registry] = (0, pda_1.findRfqMakerPda)(mm);
        await this._ensureRfqMakerRegistryLayout(mm);
        const tx = await this._program()
            .methods.submitRfqQuoteTxSigned({
            premiumMicro: new anchor_1.BN(args.premiumMicro.toString()),
            validUntilSlot: new anchor_1.BN(args.validUntilSlot.toString()),
        })
            .accounts({
            mm,
            registry,
            auction: args.auction,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .preInstructions([
            web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: RFQ_QUOTE_DIRECT_CU_LIMIT }),
        ])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Permissionless RFQ finalizer. Refunds RFQ escrow to buyer and records the
     * auction result after close. Both browser tx-signed quotes and bot/HSM
     * Ed25519 quotes are valid firm tape; cleared option execution remains the
     * Instant RFQ atomic-fill lane.
     */
    async finalizeRfqAuction(args) {
        this._assertProgramLoaded();
        const snap = args.buyerUsdcAta ? null : await this.fetchRfqAuction(args.auction);
        if (!args.buyerUsdcAta && !snap) {
            throw new Error(`finalizeRfqAuction: RFQ auction not found: ${args.auction.toBase58()}`);
        }
        const buyerUsdcAta = args.buyerUsdcAta ?? (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, snap.buyer);
        const [escrow] = (0, pda_1.findRfqAuctionEscrowPda)(args.auction);
        const tx = await this._program()
            .methods.finalizeRfqAuction()
            .accounts({
            caller: this.wallet.publicKey,
            auction: args.auction,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            escrowAta: escrow,
            buyerUsdcAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .remainingAccounts(this._hamiltonRemaining())
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Buyer-initiated cancel. Pre-close only if no quotes received. */
    async cancelRfqAuction(auction) {
        this._assertProgramLoaded();
        const buyer = this.wallet.publicKey;
        const [escrow] = (0, pda_1.findRfqAuctionEscrowPda)(auction);
        const buyerUsdcAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, buyer);
        const tx = await this._program()
            .methods.cancelRfqAuction()
            .accounts({
            buyer,
            auction,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            escrowAta: escrow,
            buyerUsdcAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // ── Phase 57301 (2026-05-04) — Paradigm-style OTC primitives ────────────────
    //
    // Auction RFQ has one public launch lane:
    //   1. `finalizeRfqAuction` records the winning quote and refunds the buyer
    //      after close. Cleared execution hands off to Instant RFQ atomic fill.
    //
    // The program IDL still exposes `take_best_quote`, but the current on-chain
    // implementation marks the auction settled without minting/novating the
    // option and can leave premium escrow behind. Keep the SDK fail-closed until
    // a future program release adds complete fill + close semantics.
    //
    // MakerAxe is the MM inventory-intent surface. It is not settlement by itself,
    // but it is a live on-chain primitive again and must not be hidden from SDK
    // users or terminal surfaces.
    /**
     * Historical buyer-accept helper for Auction RFQ.
     *
     * Launch SDK keeps this fail-closed because the current raw program path
     * does not mint/novate a cleared option and can leave premium escrow behind.
     * Use `finalizeRfqAuction` for auction tape/refund and Instant RFQ atomic
     * fill for a real PM/CM option position.
     */
    async takeBestQuote(args) {
        void args;
        this._assertProgramLoaded();
        throw new Error("takeBestQuote is disabled for the current devnet program: Auction RFQ is price discovery + firm quote tape, and cleared execution must route through Instant RFQ atomic_fill_from_relay.");
        /*
        const buyer = this.wallet.publicKey;
        const [escrow] = findRfqAuctionEscrowPda(args.auction);
        const buyerUsdcAta = args.buyerUsdcAta ?? getAssociatedTokenAddressSync(this.usdcMint, buyer);
        const tx = await this._program()
          .methods.takeBestQuote({
            expectedPremiumMicro: new BN(args.expectedPremiumMicro.toString()),
          })
          .accounts({
            buyer,
            auction: args.auction,
            usdcMint: this.usdcMint,
            escrowAta: escrow,
            buyerUsdcAta,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .preInstructions([
            ComputeBudgetProgram.setComputeUnitLimit({ units: RFQ_TAKE_BEST_CU_LIMIT }),
          ])
          .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
        */
    }
    /**
     * Deprecated compatibility shim for the removed take-and-fill relay bundle.
     */
    async takeAndFillBundle(args) {
        void args;
        this._assertProgramLoaded();
        throw new Error("take-and-fill relay bundling is disabled. Auction RFQ is price discovery + firm quote tape; cleared execution uses Instant RFQ buyer_accept_tx_signed + cm_sign + buyer_tx_signed over RelayPayload for atomic_fill_from_relay.");
    }
    /** MM refreshes its current best quote before the auction closes. */
    async refreshQuote(args) {
        this._assertProgramLoaded();
        const mm = this.wallet.publicKey;
        const [registry] = (0, pda_1.findRfqMakerPda)(mm);
        await this._ensureRfqMakerRegistryLayout(mm);
        if (args.mmSignature.length !== 64) {
            throw new Error(`refreshQuote: mmSignature must be 64 bytes (ed25519), got ${args.mmSignature.length}`);
        }
        const digest = (0, pda_1.rfqQuoteDigestBytes)(args.auction, args.premiumMicro, args.validUntilSlot, mm);
        const edData = Buffer.alloc(144);
        edData[0] = 1;
        edData[1] = 0;
        edData.writeUInt16LE(80, 2);
        edData.writeUInt16LE(0xffff, 4);
        edData.writeUInt16LE(16, 6);
        edData.writeUInt16LE(0xffff, 8);
        edData.writeUInt16LE(48, 10);
        edData.writeUInt16LE(32, 12);
        edData.writeUInt16LE(0xffff, 14);
        mm.toBuffer().copy(edData, 16);
        Buffer.from(digest).copy(edData, 48);
        Buffer.from(args.mmSignature).copy(edData, 80);
        const ed25519Ix = new web3_js_1.TransactionInstruction({
            programId: web3_js_1.Ed25519Program.programId,
            keys: [],
            data: edData,
        });
        const submitIx = await this._program()
            .methods.refreshQuote({
            premiumMicro: new anchor_1.BN(args.premiumMicro.toString()),
            makerSignature: Array.from(args.mmSignature),
            validUntilSlot: new anchor_1.BN(args.validUntilSlot.toString()),
        })
            .accounts({
            mm,
            registry,
            auction: args.auction,
            ixSysvar: web3_js_1.SYSVAR_INSTRUCTIONS_PUBKEY,
        })
            .instruction();
        const tx = new web3_js_1.Transaction()
            .add(web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: RFQ_QUOTE_ED25519_CU_LIMIT }))
            .add(ed25519Ix)
            .add(submitIx);
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // ── MakerAxe family (publish / update / revoke) ─────────────────────────
    /**
     * Publish a new MakerAxe — MM 인벤토리 의향 board entry. Costs
     * 0.001 SOL anti-spam fee → InsuranceFund tier-3.
     *
     * Inbox 1.2 (two-way) fold: pass `side: 0` and populate both
     * `bid_premium_band_*` + `ask_premium_band_*`. side -1 = SELL only,
     * +1 = BUY only.
     */
    async publishAxe(args) {
        this._assertProgramLoaded();
        const mm = this.wallet.publicKey;
        const [axe] = (0, pda_1.findMakerAxePda)(mm, args.axeId);
        const noteHash = args.noteHash ? Array.from(args.noteHash) : Array(32).fill(0);
        if (noteHash.length !== 32) {
            throw new Error(`publishAxe: noteHash must be 32 bytes, got ${noteHash.length}`);
        }
        const tx = await this._program()
            .methods.publishAxe({
            axeId: new anchor_1.BN(args.axeId.toString()),
            asset: args.asset,
            side: args.side,
            optionTypeMask: args.optionTypeMask,
            strikeBandLo: new anchor_1.BN(args.strikeBandLo.toString()),
            strikeBandHi: new anchor_1.BN(args.strikeBandHi.toString()),
            expiryBandLo: new anchor_1.BN(args.expiryBandLo.toString()),
            expiryBandHi: new anchor_1.BN(args.expiryBandHi.toString()),
            sizeMicro: new anchor_1.BN(args.sizeMicro.toString()),
            bidPremiumBandLo: new anchor_1.BN(args.bidPremiumBandLo.toString()),
            bidPremiumBandHi: new anchor_1.BN(args.bidPremiumBandHi.toString()),
            askPremiumBandLo: new anchor_1.BN(args.askPremiumBandLo.toString()),
            askPremiumBandHi: new anchor_1.BN(args.askPremiumBandHi.toString()),
            validUntil: new anchor_1.BN(args.validUntil.toString()),
            noteHash,
        })
            .accounts({
            mm,
            axe,
            insuranceFund: (0, pda_1.findInsuranceFundPda)()[0],
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .preInstructions([web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: MAKER_AXE_CU_LIMIT })])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, axe };
    }
    /** Replace mutable fields on an existing axe. Owner-only. */
    async updateAxe(args) {
        this._assertProgramLoaded();
        const mm = this.wallet.publicKey;
        const f = args.fields;
        const noteHash = f.noteHash ? Array.from(f.noteHash) : Array(32).fill(0);
        if (noteHash.length !== 32) {
            throw new Error(`updateAxe: noteHash must be 32 bytes, got ${noteHash.length}`);
        }
        const tx = await this._program()
            .methods.updateAxe({
            axeId: new anchor_1.BN(f.axeId.toString()),
            asset: f.asset,
            side: f.side,
            optionTypeMask: f.optionTypeMask,
            strikeBandLo: new anchor_1.BN(f.strikeBandLo.toString()),
            strikeBandHi: new anchor_1.BN(f.strikeBandHi.toString()),
            expiryBandLo: new anchor_1.BN(f.expiryBandLo.toString()),
            expiryBandHi: new anchor_1.BN(f.expiryBandHi.toString()),
            sizeMicro: new anchor_1.BN(f.sizeMicro.toString()),
            bidPremiumBandLo: new anchor_1.BN(f.bidPremiumBandLo.toString()),
            bidPremiumBandHi: new anchor_1.BN(f.bidPremiumBandHi.toString()),
            askPremiumBandLo: new anchor_1.BN(f.askPremiumBandLo.toString()),
            askPremiumBandHi: new anchor_1.BN(f.askPremiumBandHi.toString()),
            validUntil: new anchor_1.BN(f.validUntil.toString()),
            noteHash,
        })
            .accounts({
            mm,
            axe: args.axe,
        })
            .preInstructions([web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: MAKER_AXE_CU_LIMIT })])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Close axe PDA — rent flows back to MM. */
    async revokeAxe(axe) {
        this._assertProgramLoaded();
        const tx = await this._program()
            .methods.revokeAxe()
            .accounts({
            mm: this.wallet.publicKey,
            axe,
        })
            .preInstructions([web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: MAKER_AXE_CU_LIMIT })])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // ── Combo intent v2 (4) — 32-leg variant of register/finalize/cancel/cleanup ──
    /**
     * Register a 1..32-leg combo intent. v2 supersedes v1's max-4 limit.
     * No premium escrow at register — premium is captured leg-by-leg in
     * `finalizeComboLegV2`; cleanup permissionless after `expiresTs`.
     */
    async registerComboIntentV2(args) {
        this._assertProgramLoaded();
        if (args.legs.length === 0 || args.legs.length > 32) {
            throw new Error(`registerComboIntentV2: legs.length must be 1..=32, got ${args.legs.length}`);
        }
        const buyer = this.wallet.publicKey;
        const [intent] = (0, pda_1.findComboIntentV2Pda)(buyer, args.comboId);
        const tx = await this._program()
            .methods.registerComboIntentV2({
            comboId: new anchor_1.BN(args.comboId.toString()),
            legCount: args.legs.length,
            legs: args.legs.map((l) => ({
                option: l.option,
                side: l.side,
                filled: false,
                maxPremiumMicro: new anchor_1.BN(l.maxPremiumMicro.toString()),
                fillPremiumMicro: new anchor_1.BN(0),
            })),
            totalMaxPremiumMicro: new anchor_1.BN(args.totalMaxPremiumMicro.toString()),
            expiresTs: new anchor_1.BN(args.expiresTs.toString()),
        })
            .accounts({
            buyer,
            intent,
            systemProgram: web3_js_1.SystemProgram.programId,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, intent };
    }
    /** Permissionless leg-fill recorder. Keeper calls per-leg as fills land on-chain. */
    async finalizeComboLegV2(intent, legIndex, realisedPremiumMicro, option) {
        this._assertProgramLoaded();
        let legOption = option;
        if (!legOption) {
            const info = await this.connection.getAccountInfo(intent, "confirmed");
            if (!info || info.data.length < 88 + (legIndex + 1) * 56) {
                throw new Error("finalizeComboLegV2 requires option, or a fetchable intent account");
            }
            legOption = new web3_js_1.PublicKey(info.data.subarray(88 + legIndex * 56, 88 + legIndex * 56 + 32));
        }
        const tx = await this._program()
            .methods.finalizeComboLegV2(legIndex, new anchor_1.BN(realisedPremiumMicro.toString()))
            .accounts({
            caller: this.wallet.publicKey,
            intent,
            option: legOption,
            governance: (0, pda_1.findGovernancePda)()[0],
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Buyer-initiated cancel of an Open intent. Closes the PDA → rent refund. */
    async cancelComboIntentV2(comboId) {
        this._assertProgramLoaded();
        const buyer = this.wallet.publicKey;
        const [intent] = (0, pda_1.findComboIntentV2Pda)(buyer, comboId);
        const tx = await this._program()
            .methods.cancelComboIntentV2()
            .accounts({ buyer, intent })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Permissionless cleanup — closes an expired intent past its `expiresTs`. */
    async cleanupExpiredComboV2(buyerAuthority, comboId) {
        this._assertProgramLoaded();
        const [intent] = (0, pda_1.findComboIntentV2Pda)(buyerAuthority, comboId);
        const tx = await this._program()
            .methods.cleanupExpiredComboV2()
            .accounts({
            caller: this.wallet.publicKey,
            intent,
            buyer: buyerAuthority,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // -------------------------------------------------------------------------
    // Phase 1639 — clearing-class ladder + LST collateral + IF deposit + VM crank
    //
    // Closes the SDK gaps identified in CHANGE_PLAN.md §3.1. The clearing-class
    // ladder is the entry path to the launch PM/fee policy. Calendar credit
    // is disabled at launch; non-vanilla Greek credit remains audit-gated.
    // -------------------------------------------------------------------------
    /**
     * Step the CM up to a higher clearing class. Locks the class-specific USDC
     * floor for 30 days (TIER_LOCKUP_MIN_SECONDS) — `cm.tier_lockup_collateral`
     * is subtracted from `free_collateral()` so it cannot be withdrawn, while
     * `tradable_collateral()` keeps it available for IM and first-loss default
     * waterfall semantics. Strict rank increase only.
     *
     * Compatibility ranks:
     *   0 = M0 Segregated ($0)
     *   1 = M1 Portfolio ($500K)
     *   2 = M2 Cross-Asset ($2M)
     *   3 = M3 Clearing Prime ($10M)
     *
     * @example
     *   await skew.upgradeTier(2); // M0/M1 -> M2 Cross-Asset
     */
    async upgradeTier(targetRank, lst) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [cm] = (0, pda_1.findClearingMemberPda)(authority);
        // Phase 6 R7 — optional LST trio. All-or-nothing on-chain; defaults
        // to address-pinned constants when only the vault is supplied.
        // Anchor's typed accounts() builder rejects `null` for Optional<>
        // fields — use the loose record path via `as any` so we can pass
        // explicit nulls (mapped to None in the IDL serializer).
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const accounts = { cm, authority };
        if (lst) {
            accounts.lstVault = lst.lstVault;
            accounts.stakePool = lst.stakePool ?? pda_1.JITOSOL_STAKE_POOL;
            accounts.solUsdPyth = lst.solUsdPyth ?? pda_1.PYTH_SOL_USD_FEED;
        }
        else {
            accounts.lstVault = null;
            accounts.stakePool = null;
            accounts.solUsdPyth = null;
        }
        const tx = await this._program()
            .methods.upgradeTier(targetRank)
            .accounts(accounts)
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Step the CM down to a lower clearing class. Releases the class-specific
     * USDC lockup back into `free_collateral`. Requires `now ≥ tier_locked_until`
     * (30 d after most recent upgrade). Strict rank decrease only.
     *
     * @example
     *   await skew.downgradeTier(1); // M2/M3 -> M1 Portfolio
     */
    async downgradeTier(targetRank, lstVault) {
        this._assertProgramLoaded();
        const authority = this.wallet.publicKey;
        const [cm] = (0, pda_1.findClearingMemberPda)(authority);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const downgradeAccounts = { cm, authority, lstVault: lstVault ?? null };
        const tx = await this._program()
            .methods.downgradeTier(targetRank)
            .accounts(downgradeAccounts)
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Deposit USDC to a specific IF tier slot. SITG flag distinguishes
     * Tier-3 protocol-skin-in-the-game from Tier-4 mutualized pool slots.
     *
     * `tier`:
     *   0 = Tier1 (BTC/ETH/SOL mutualized pool)
     *   1 = Tier2 (XRP/HYPE mutualized pool)
     *   2 = Cross (cross-asset spillover reserve)
     *
     * @param isSitg — when true and tier=Tier1, deposit lands in Tier-3
     *                 SITG (SKEW_AUTHORITY only). When false, lands in
     *                 Tier-4 mutualized.
     *
     * @example
     *   await skew.depositToIf(0, 50_000, false); // $50K to Tier-1 mutualized
     */
    async depositToIf(tier, amountUsdc, isSitg) {
        this._assertProgramLoaded();
        const depositor = this.wallet.publicKey;
        const [insuranceFund] = (0, pda_1.findInsuranceFundPda)();
        const [ifEscrow] = (0, pda_1.findIfEscrowPda)();
        const [contributingCm] = (0, pda_1.findClearingMemberPda)(depositor);
        const depositorAta = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, depositor);
        const tierEnum = tier === 0 ? { tier1: {} } : tier === 1 ? { tier2: {} } : { cross: {} };
        const tx = await this._program()
            .methods.depositToIf(tierEnum, new anchor_1.BN((0, pda_1.toUsdcUnits)(amountUsdc).toString()), isSitg)
            .accounts({
            insuranceFund,
            depositor,
            contributingCm: tier === 1 && !isSitg ? contributingCm : null,
            usdcMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            depositorAta,
            ifEscrow,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Daily IM re-mark crank. Permissionless — anyone may push for any CM.
     * Refreshes `cm.last_im_micro` snapshot so `liquidate.rs`'s 24-h
     * `LIQUIDATION_MARGIN_FRESHNESS_SECS` gate keeps admitting valid Dutch
     * auctions even when the CM takes no new fills.
     *
     * Caller passes `remainingAccounts` = the CM's open OptionAccount PDAs
     * + per-asset PoVS / Hamilton / CrossAsset PDAs (same set
     * `calculateMargin` consumes).
     *
     * @example
     *   await skew.callVariationMargin(targetCmAuthority, [...optionPdas, ...stateAccounts]);
     */
    async callVariationMargin(cmAuthority, remainingAccounts = []) {
        this._assertProgramLoaded();
        const [cm] = (0, pda_1.findClearingMemberPda)(cmAuthority);
        const pmRemaining = remainingAccounts.length > 0
            ? remainingAccounts.map((pubkey) => ({
                pubkey,
                isSigner: false,
                isWritable: false,
            }))
            : await this._pmRemaining(cmAuthority);
        const tx = await this._program()
            .methods.callVariationMargin()
            .accounts({ keeper: this.wallet.publicKey, cm })
            .remainingAccounts(pmRemaining)
            .preInstructions([
            web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
                units: estimatePmCuLimit(pmRemaining.length),
            }),
        ])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /** Cached variation-margin crank. Fails closed if cache is stale/dirty. */
    async callVariationMarginCached(cmAuthority) {
        this._assertProgramLoaded();
        const [cm] = (0, pda_1.findClearingMemberPda)(cmAuthority);
        const [cache] = (0, pda_1.findCmRiskCachePda)(cmAuthority);
        const [positionRegistry] = (0, pda_1.findPositionRegistryPda)(cmAuthority);
        const tx = await this._program()
            .methods.callVariationMarginCached()
            .accounts({
            keeper: this.wallet.publicKey,
            cm,
            cmRiskCache: cache,
            positionRegistry,
        })
            .preInstructions([web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: 250000 })])
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * One-shot per (user, lst_mint) — initialise the LstVault PDA + escrow
     * ATA. Phase 1 only accepts jitoSOL (`JITOSOL_MINT`). Subsequent
     * deposits/withdraws hang off this PDA.
     *
     * @example
     *   await skew.initLstVault(JITOSOL_MINT);
     */
    async initLstVault(lstMint = pda_1.JITOSOL_MINT) {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findLstVaultPda)(user, lstMint);
        const [vaultAta] = (0, pda_1.findLstVaultEscrowPda)(vault);
        const tx = await this._program()
            .methods.initLstVault()
            .accounts({
            vault,
            user,
            lstMint,
            vaultAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Deposit LST collateral (jitoSOL) into the user's LstVault escrow.
     * Anchor handler validates the SPL Stake Pool exchange-rate read so the
     * vault stamps a fresh `last_er_update_slot` for the dynamic LTV cap path.
     *
     * `amountLamports` is in LST native units (jitoSOL has 9 decimals like SOL).
     *
     * @example
     *   await skew.depositLstCollateral(1_500_000_000n); // 1.5 jitoSOL
     */
    async depositLstCollateral(amountLamports, lstMint = pda_1.JITOSOL_MINT, stakePool) {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findLstVaultPda)(user, lstMint);
        const [vaultAta] = (0, pda_1.findLstVaultEscrowPda)(vault);
        const userLstAta = (0, spl_token_1.getAssociatedTokenAddressSync)(lstMint, user);
        const accounts = {
            vault,
            user,
            lstMint,
            userLstAta,
            vaultAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        };
        if (stakePool)
            accounts["stakePool"] = stakePool;
        const tx = await this._program()
            .methods.depositLstCollateral(new anchor_1.BN(amountLamports.toString()))
            .accounts(accounts)
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Withdraw LST collateral (jitoSOL) from the user's LstVault escrow back
     * to the user's LST ATA. Anchor handler enforces `amount ≤ free_qty()`
     * (lst_qty − locked_qty) so the user can't pull LST that's pledged
     * against open option fills.
     *
     * @example
     *   await skew.withdrawLstCollateral(500_000_000n);
     */
    async withdrawLstCollateral(amountLamports, lstMint = pda_1.JITOSOL_MINT) {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findLstVaultPda)(user, lstMint);
        const [vaultAta] = (0, pda_1.findLstVaultEscrowPda)(vault);
        const userLstAta = (0, spl_token_1.getAssociatedTokenAddressSync)(lstMint, user);
        const tx = await this._program()
            .methods.withdrawLstCollateral(new anchor_1.BN(amountLamports.toString()))
            .accounts({
            vault,
            user,
            lstMint,
            userLstAta,
            vaultAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // =====================================================================
    // Phase 1A.2 (2026-05-04) — Native SOL collateral lifecycle.
    //
    // Mirror of LST collateral path for Native (wrapped) SOL. ETF APs +
    // regulated US institutions cannot hold LSTs; this path lets them post
    // Native SOL while retaining capital-efficient portfolio margin.
    //
    // Spec: V2_SOL_NATIVE_OPTIONS_PLAN_2026-05-04.md §5.
    // =====================================================================
    /**
     * One-shot per user — initialise the NativeSolVault PDA + wSOL escrow
     * ATA. No mint dimension (single canonical wSOL mint per protocol).
     * Subsequent deposits/withdraws hang off this PDA.
     *
     * @example
     *   await skew.initNativeSolVault();
     */
    async initNativeSolVault() {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findNativeSolVaultPda)(user);
        const [vaultAta] = (0, pda_1.findNativeSolVaultEscrowPda)(vault);
        const tx = await this._program()
            .methods.initNativeSolVault()
            .accounts({
            vault,
            user,
            wsolMint: pda_1.NATIVE_SOL_MINT,
            vaultAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Wrap native SOL → wSOL → deposit into NativeSolVault, in a single helper
     * (cheatsheet 2026-05-04 §10 ask #3 — `wrapAndDeposit`).
     *
     * Builds two transactions:
     *   1. wrap_tx: getOrCreate user wSOL ATA → SystemProgram.transfer →
     *      sync_native (token::sync_native) — wraps native SOL into the user's
     *      wSOL ATA without consuming separate SOL outside what's wrapped.
     *   2. deposit_tx: depositNativeSolCollateral (SDK existing method).
     *
     * Idempotent — initNativeSolVault is called first, swallowing
     * "already initialized" errors so re-invocation is safe.
     *
     * @example
     *   const r = await skew.wrapAndDeposit(2_000_000_000n); // 2 SOL
     *   console.log(r.wrapTx, r.depositTx);
     */
    async wrapAndDeposit(amountLamports) {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        // Step 0 — idempotent vault init. If already initialised, the on-chain
        // ix returns AlreadyInUse / InitAccount0; swallow those known shapes.
        try {
            await this.initNativeSolVault();
        }
        catch (e) {
            const msg = String(e.message ?? e).toLowerCase();
            if (!msg.includes("already") &&
                !msg.includes("initialized") &&
                !msg.includes("0x0") &&
                !msg.includes("already in use")) {
                throw e;
            }
        }
        // Step 1 — wrap native SOL → wSOL on the client side.
        const userWsolAta = (0, spl_token_1.getAssociatedTokenAddressSync)(pda_1.NATIVE_SOL_MINT, user);
        const wrapTx = new web3_js_1.Transaction().add((0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(user, userWsolAta, user, pda_1.NATIVE_SOL_MINT), web3_js_1.SystemProgram.transfer({
            fromPubkey: user,
            toPubkey: userWsolAta,
            lamports: Number(amountLamports),
        }), (0, spl_token_1.createSyncNativeInstruction)(userWsolAta));
        const wrapSig = await this._sendAndConfirm(wrapTx);
        // Step 2 — depositNativeSolCollateral.
        const r = await this.depositNativeSolCollateral(amountLamports);
        return { wrapTx: wrapSig, depositTx: r.txSignature };
    }
    /**
     * Deposit Native SOL collateral (wSOL) into the user's NativeSolVault
     * escrow. The user is responsible for wrapping native SOL → wSOL on the
     * client side (`system_program::transfer` + `sync_native`) before this call.
     *
     * `amountLamports` is in wSOL native units (= lamports, 9 decimals).
     *
     * @example
     *   await skew.depositNativeSolCollateral(2_000_000_000n); // 2 SOL
     */
    async depositNativeSolCollateral(amountLamports) {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findNativeSolVaultPda)(user);
        const [vaultAta] = (0, pda_1.findNativeSolVaultEscrowPda)(vault);
        const userWsolAta = (0, spl_token_1.getAssociatedTokenAddressSync)(pda_1.NATIVE_SOL_MINT, user);
        const tx = await this._program()
            .methods.depositNativeSolCollateral(new anchor_1.BN(amountLamports.toString()))
            .accounts({
            vault,
            user,
            wsolMint: pda_1.NATIVE_SOL_MINT,
            userWsolAta,
            vaultAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Withdraw Native SOL collateral (wSOL) from the user's NativeSolVault
     * escrow back to the user's wSOL ATA. Gated on `amount ≤ free_qty()`
     * (sol_qty − locked_qty). The user can then unwrap wSOL → native SOL
     * on the client side (`close_account` / `sync_native`).
     *
     * @example
     *   await skew.withdrawNativeSolCollateral(500_000_000n);
     */
    async withdrawNativeSolCollateral(amountLamports) {
        this._assertProgramLoaded();
        const user = this.wallet.publicKey;
        const [vault] = (0, pda_1.findNativeSolVaultPda)(user);
        const [vaultAta] = (0, pda_1.findNativeSolVaultEscrowPda)(vault);
        const userWsolAta = (0, spl_token_1.getAssociatedTokenAddressSync)(pda_1.NATIVE_SOL_MINT, user);
        const tx = await this._program()
            .methods.withdrawNativeSolCollateral(new anchor_1.BN(amountLamports.toString()))
            .accounts({
            vault,
            user,
            wsolMint: pda_1.NATIVE_SOL_MINT,
            userWsolAta,
            vaultAta,
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // -------------------------------------------------------------------------
    // Series listing + Builder code lifecycle + Secondary auction
    //
    // Closes the SDK gaps in CHANGE_PLAN.md §3.2 (PR-E). Series listing is
    // the σ·√T metadata grid (no money); builder code is the 25%-share
    // referral path; secondary auction lets a holder Dutch-auction their
    // option-token to a new buyer.
    // -------------------------------------------------------------------------
    /**
     * List a single grid cell (asset, strike, expiry, type, direction). Pays
     * rent (~0.0009 SOL). Permissionless — off-chain keepers run this daily
     * over a σ·√T grid policy (k_max / n_strikes etc), but any user may also
     * list a custom cell.
     *
     * @param optionTypeName Anchor IDL enum name — Vanilla / Digital /
     * CappedVanilla / RangeAccrual / VanillaInverse / DigitalInverse.
     * @param direction +1 Call / -1 Put / 0 RangeAccrual.
     */
    async listSeries(args) {
        this._assertProgramLoaded();
        const optionTypeIdx = {
            Vanilla: 0,
            Digital: 1,
            CappedVanilla: 2,
            RangeAccrual: 3,
            VanillaInverse: 4,
            DigitalInverse: 5,
        }[args.optionTypeName];
        const [series] = (0, pda_1.findSeriesListingPda)(args.asset, args.strikeMicro, args.expiryTs, optionTypeIdx, args.direction);
        const optionTypeArg = {};
        optionTypeArg[args.optionTypeName.charAt(0).toLowerCase() + args.optionTypeName.slice(1)] = {};
        const tx = await this._program()
            .methods.listSeries(args.asset, new anchor_1.BN(args.strikeMicro.toString()), new anchor_1.BN(args.expiryTs.toString()), optionTypeArg, args.direction)
            .accounts({
            caller: this.wallet.publicKey,
            series,
            systemProgram: web3_js_1.SystemProgram.programId,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, series };
    }
    /**
     * Delist a series cell — closes the PDA + refunds rent to caller.
     * On-chain enforces `now ≥ expiry_ts` AND `total_oi_count == 0` so live
     * grid cells can't be cleared while OI is still open.
     */
    async delistSeries(seriesPda) {
        this._assertProgramLoaded();
        const tx = await this._program()
            .methods.delistSeries()
            .accounts({
            caller: this.wallet.publicKey,
            series: seriesPda,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * M6 (2026-05-03) — SKEW_AUTHORITY sets per-series `max_oi_count` cap.
     * `cap = 0` removes the cap (default for newly-listed series). Existing
     * OI is NEVER force-closed when the cap is reduced — matches CME
     * spot-month tightening behaviour. Caller must be SKEW_AUTHORITY (Phase
     * 1) or the Squads multisig signer (Phase 2).
     *
     * Per-strike-bucket OI ceiling is Skew's first-mover defense against
     * the Ni-Pearson-Poteshman (2005, JFE 78) 16.5 bp / $9 B option-
     * expiration pinning effect; CME / Deribit / Derive enforce no
     * equivalent strike-level cap.
     *
     * Emits `SeriesMaxOiUpdated` event with prev/new cap + current OI.
     */
    async governanceSetSeriesMaxOi(seriesPda, maxOiCount) {
        this._assertProgramLoaded();
        const tx = await this._program()
            .methods.governanceSetSeriesMaxOi(maxOiCount)
            .accounts({
            authority: this.wallet.publicKey,
            series: seriesPda,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Register as a fee-rebate Builder. Locks $1K USDC anti-spam deposit;
     * `label` is a short ASCII tag the builder uses in its UI / marketing.
     * Earns 25% of taker fees on all trades that route through the
     * builder's code (set via VolumeTrackerPda).
     *
     * Spec — `docs/fee-schedule-v5.1.md` §4.4 builder-rebate cascade.
     *
     * @param label up to 32 ASCII bytes (no interior NUL); rejected at
     *   anchor validation if longer or has NUL.
     */
    async registerBuilder(label) {
        this._assertProgramLoaded();
        const builder = this.wallet.publicKey;
        const [builderCode] = (0, pda_1.findBuilderCodePda)(builder);
        const [builderEscrow] = (0, pda_1.findBuilderEscrowPda)(builder);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const builderTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, builder);
        const labelBuf = Buffer.alloc(32);
        Buffer.from(label, "utf8").copy(labelBuf);
        const labelArr = Array.from(labelBuf);
        const tx = await this._program()
            .methods.registerBuilder(labelArr)
            .accounts({
            builderCode,
            builder,
            builderTokenAccount,
            builderEscrow,
            feeAuthority,
            settlementMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
            systemProgram: web3_js_1.SystemProgram.programId,
            rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature, builderCode };
    }
    /**
     * Withdraw accrued builder fees to the builder's USDC ATA. Anchor handler
     * caps at `builder_code.fees_accrued_micro`. Drains zero-balance fee
     * accumulator no-op.
     */
    async withdrawBuilderFees(amountMicro) {
        this._assertProgramLoaded();
        const builder = this.wallet.publicKey;
        const [builderCode] = (0, pda_1.findBuilderCodePda)(builder);
        const [builderEscrow] = (0, pda_1.findBuilderEscrowPda)(builder);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const builderTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, builder);
        const tx = await this._program()
            .methods.withdrawBuilderFees(new anchor_1.BN(amountMicro.toString()))
            .accounts({
            builderCode,
            builder,
            builderTokenAccount,
            builderEscrow,
            feeAuthority,
            settlementMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    /**
     * Close the BuilderCode PDA — refunds the $1K deposit to the builder.
     * Anchor handler requires `builder_code.volume_30d_routed_micro <
     * BUILDER_REFUND_MIN_VOLUME` (no live channel) AND `fees_accrued_micro
     * == 0` (drained first via `withdrawBuilderFees`).
     */
    async closeBuilderCode() {
        this._assertProgramLoaded();
        const builder = this.wallet.publicKey;
        const [builderCode] = (0, pda_1.findBuilderCodePda)(builder);
        const [builderEscrow] = (0, pda_1.findBuilderEscrowPda)(builder);
        const [feeAuthority] = (0, pda_1.findFeeAuthorityPda)();
        const builderTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(this.usdcMint, builder);
        const tx = await this._program()
            .methods.closeBuilderCode()
            .accounts({
            builderCode,
            builder,
            builderTokenAccount,
            builderEscrow,
            feeAuthority,
            settlementMint: this.usdcMint,
            collateralPolicy: this._collateralPolicy(),
            tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
        })
            .transaction();
        const txSignature = await this._sendAndConfirm(tx);
        return { txSignature };
    }
    // -------------------------------------------------------------------------
    // Manual byte-level fetchers — for accounts whose struct isn't in the IDL
    // `accounts` array (so `program.account.<name>.fetch` would fail). Each
    // reads via `connection.getAccountInfo` + parses Borsh-LE offsets matching
    // the on-chain struct in `skew-master/programs/skew-master/src/state/`.
    // Returns null when the account doesn't exist.
    // -------------------------------------------------------------------------
    /** Decoded LstVault PDA — total + pledged + free LST collateral. */
    async fetchLstVault(user, lstMint = pda_1.JITOSOL_MINT) {
        const [pda] = (0, pda_1.findLstVaultPda)(user, lstMint);
        const info = await this.connection.getAccountInfo(pda, "confirmed");
        if (!info || info.data.length < 105)
            return null;
        const buf = info.data;
        const lstQty = buf.readBigUInt64LE(72);
        const lockedQty = buf.readBigUInt64LE(80);
        const lastErUpdateSlot = buf.readBigUInt64LE(88);
        const tierLockedQty = buf.readBigUInt64LE(97);
        const free = lstQty - lockedQty - tierLockedQty;
        return {
            user: new web3_js_1.PublicKey(buf.subarray(8, 40)),
            lstMint: new web3_js_1.PublicKey(buf.subarray(40, 72)),
            lstQty,
            lockedQty,
            tierLockedQty,
            lastErUpdateSlot,
            freeQty: free < 0n ? 0n : free,
        };
    }
    /**
     * Decoded NativeSolVault PDA — total + pledged + free wSOL collateral.
     *
     * Layout (state/native_sol_vault.rs:74, 65 B):
     *   0..8   anchor discriminator
     *   8..40  user                  (Pubkey 32B)
     *   40..48 sol_qty               (u64 LE, lamports)
     *   48..56 locked_qty            (u64 LE, lamports)
     *   56..64 last_update_slot      (u64 LE)
     *   64     bump                  (u8)
     *
     * Smaller than LstVault (105 B) — no lst_mint dimension, no tier_locked_qty
     * (class lockup is jitoSOL-only by design).
     */
    async fetchNativeSolVault(user) {
        const [pda] = (0, pda_1.findNativeSolVaultPda)(user);
        const info = await this.connection.getAccountInfo(pda, "confirmed");
        if (!info || info.data.length < 65)
            return null;
        const buf = info.data;
        const solQty = buf.readBigUInt64LE(40);
        const lockedQty = buf.readBigUInt64LE(48);
        const lastUpdateSlot = buf.readBigUInt64LE(56);
        const free = solQty - lockedQty;
        return {
            user: new web3_js_1.PublicKey(buf.subarray(8, 40)),
            solQty,
            lockedQty,
            lastUpdateSlot,
            freeQty: free < 0n ? 0n : free,
        };
    }
    /** Decoded SeriesListingPda — σ·√T grid cell metadata. */
    async fetchSeriesListing(series) {
        const info = await this.connection.getAccountInfo(series, "confirmed");
        if (!info || info.data.length < 72)
            return null;
        const buf = info.data;
        return {
            asset: buf[8],
            optionType: buf[9],
            direction: buf.readInt8(10),
            status: buf[11],
            strike: buf.readBigUInt64LE(16),
            expiryTs: buf.readBigInt64LE(24),
            lastFillPriceMicro: buf.readBigUInt64LE(32),
            lastFillAt: buf.readBigInt64LE(40),
            totalOiCount: buf.readUInt32LE(48),
            cumulativeFillCount: buf.readUInt32LE(52),
            maxOiCount: buf.readUInt32LE(56),
            listedAt: buf.readBigInt64LE(60),
        };
    }
    /** Decoded BuilderCodePda — registration + accrual state. */
    async fetchBuilderCode(builder) {
        const [pda] = (0, pda_1.findBuilderCodePda)(builder);
        const info = await this.connection.getAccountInfo(pda, "confirmed");
        if (!info || info.data.length < 113)
            return null;
        const buf = info.data;
        // Trim trailing zero bytes from the 32-byte UTF-8 label.
        const labelBytes = buf.subarray(81, 113);
        let labelEnd = labelBytes.length;
        while (labelEnd > 0 && labelBytes[labelEnd - 1] === 0)
            labelEnd -= 1;
        return {
            builder: new web3_js_1.PublicKey(buf.subarray(8, 40)),
            registeredAt: buf.readBigInt64LE(41),
            depositLockedMicro: buf.readBigUInt64LE(49),
            volume30dRoutedMicro: buf.readBigUInt64LE(57),
            lastVolumeUpdateTs: buf.readBigInt64LE(65),
            feesAccruedMicro: buf.readBigUInt64LE(73),
            label: labelBytes.subarray(0, labelEnd).toString("utf8"),
        };
    }
    /** Decoded ConditionalOrderPda — SL / TP / OCO state. */
    async fetchConditionalOrder(authority, orderId) {
        const [pda] = (0, pda_1.findConditionalOrderPda)(authority, orderId);
        const info = await this.connection.getAccountInfo(pda, "confirmed");
        if (!info || info.data.length < 286)
            return null;
        const buf = info.data;
        const stateMap = {
            0: "Active",
            1: "Triggered",
            2: "Cancelled",
            3: "Expired",
        };
        return {
            pda,
            authority: new web3_js_1.PublicKey(buf.subarray(8, 40)),
            orderId: buf.readBigUInt64LE(40),
            kind: buf[48],
            triggerMode: buf[49],
            triggerDirection: buf[50],
            action: buf[51],
            state: stateMap[buf[52]] ?? "Active",
            triggerOracle: new web3_js_1.PublicKey(buf.subarray(56, 88)),
            triggerPrice1e8: buf.readBigInt64LE(88),
            triggerGraceSlots: buf.readUInt32LE(96),
            actionTarget: new web3_js_1.PublicKey(buf.subarray(112, 144)),
            actionMinPremiumMicro: buf.readBigUInt64LE(144),
            actionMaxPremiumMicro: buf.readBigUInt64LE(152),
            actionMaxSlippageBps: buf.readUInt16LE(160),
            validUntilTs: buf.readBigInt64LE(200),
            registeredAt: buf.readBigInt64LE(208),
        };
    }
    /** Decoded RfqAuctionPda — open auction state + best quote. */
    async fetchRfqAuction(auction) {
        const info = await this.connection.getAccountInfo(auction, "confirmed");
        if (!info || info.data.length < 312)
            return null;
        if (!info.owner.equals(pda_1.SKEW_PROGRAM_ID)) {
            throw new Error(`RFQ auction account owner mismatch: ${auction.toBase58()}`);
        }
        if (!info.data.subarray(0, 8).equals(RFQ_AUCTION_DISCRIMINATOR)) {
            throw new Error(`RFQ auction account discriminator mismatch: ${auction.toBase58()}`);
        }
        const buf = info.data;
        const stateMap = {
            0: "Open",
            1: "Closed",
            2: "Settled",
            3: "Cancelled",
        };
        const mmKey = new web3_js_1.PublicKey(buf.subarray(112, 144));
        const hasQuote = !mmKey.equals(web3_js_1.PublicKey.default);
        return {
            pda: auction,
            auctionId: buf.readBigUInt64LE(8),
            buyer: new web3_js_1.PublicKey(buf.subarray(16, 48)),
            optionSpec: {
                asset: buf[48],
                optionType: buf[49],
                direction: buf.readInt8(50),
                strike: buf.readBigUInt64LE(56),
                expiryTs: buf.readBigInt64LE(64),
                payoffAmountMicro: buf.readBigUInt64LE(72),
                upperBound: buf.readBigUInt64LE(80),
            },
            maxPremiumMicro: buf.readBigUInt64LE(88),
            auctionOpenSlot: buf.readBigUInt64LE(96),
            auctionCloseSlot: buf.readBigUInt64LE(104),
            state: stateMap[buf[232]] ?? "Open",
            bestQuotePremiumMicro: hasQuote ? buf.readBigUInt64LE(144) : null,
            bestQuoteMm: hasQuote ? mmKey : null,
            bestQuoteValidUntilSlot: hasQuote ? buf.readBigUInt64LE(216) : null,
            registeredAt: buf.readBigInt64LE(240),
        };
    }
    /** Decoded ComboIntentPdaV2 — only the first `legCount` legs are returned. */
    async fetchComboIntentV2(buyer, comboId) {
        const [pda] = (0, pda_1.findComboIntentV2Pda)(buyer, comboId);
        const info = await this.connection.getAccountInfo(pda, "confirmed");
        if (!info || info.data.length < 1944)
            return null;
        const buf = info.data;
        const legCount = buf[49];
        const legs = [];
        const LEG_BASE = 88;
        const LEG_SIZE = 56;
        for (let i = 0; i < legCount && i < 32; i++) {
            const off = LEG_BASE + i * LEG_SIZE;
            legs.push({
                option: new web3_js_1.PublicKey(buf.subarray(off, off + 32)),
                side: buf.readInt8(off + 32),
                filled: buf[off + 33] !== 0,
                // pad @ +34..+40
                maxPremiumMicro: buf.readBigUInt64LE(off + 40),
                fillPremiumMicro: buf.readBigUInt64LE(off + 48),
            });
        }
        return {
            buyer: new web3_js_1.PublicKey(buf.subarray(8, 40)),
            comboId: buf.readBigUInt64LE(40),
            status: buf[48],
            legCount,
            legsFilled: buf[50],
            // bump @ 51; padding @ 52..56
            totalMaxPremiumMicro: buf.readBigUInt64LE(56),
            totalRealisedPremiumMicro: buf.readBigUInt64LE(64),
            expiresTs: buf.readBigInt64LE(72),
            createdAt: buf.readBigInt64LE(80),
            legs,
        };
    }
    // -------------------------------------------------------------------------
    // Secondary-market Dutch auction compatibility shims. These instructions are
    // not present in the current IDL; callers fail closed until the secondary
    // auction family is restored.
    // -------------------------------------------------------------------------
    /** Deprecated compatibility shim; current IDL does not expose start_auction. */
    async startAuction(args) {
        void args;
        this._assertProgramLoaded();
        throw new Error("start_auction is not in the current skew_master IDL.");
    }
    /** Deprecated compatibility shim; current IDL does not expose fill_auction. */
    async fillAuction(optionPda) {
        void optionPda;
        this._assertProgramLoaded();
        throw new Error("fill_auction is not in the current skew_master IDL.");
    }
    /** Deprecated compatibility shim; current IDL does not expose cancel_auction. */
    async cancelAuction(optionPda) {
        void optionPda;
        this._assertProgramLoaded();
        throw new Error("cancel_auction is not in the current skew_master IDL.");
    }
}
exports.SkewClient = SkewClient;
// ---------------------------------------------------------------------------
// OptionAccount decode (used by listOptions)
//
// Anchor 0.31 returns enum variants as `{ <camelCaseVariant>: {} }` and
// snake_case fields as camelCase on the decoded `account`. We project
// that into the public `OptionSummary` shape with USD-converted scalars.
// ---------------------------------------------------------------------------
const OPTION_TYPE_VARIANTS = {
    vanilla: "Vanilla",
    digital: "Digital",
    cappedVanilla: "CappedVanilla",
    rangeAccrual: "RangeAccrual",
    // Phase 2 (2026-05-04) — Inverse family decoding.
    vanillaInverse: "VanillaInverse",
    digitalInverse: "DigitalInverse",
};
const RFQ_AUCTION_DISCRIMINATOR = Buffer.from([126, 144, 41, 183, 184, 86, 59, 68]);
const OPTION_STATE_VARIANTS = {
    created: "Created",
    funded: "Funded",
    active: "Active",
    expired: "Expired",
    settled: "Settled",
    disputed: "Disputed",
    expiredAbandoned: "ExpiredAbandoned",
};
function decodeAnchorEnum(raw, table) {
    if (!raw || typeof raw !== "object")
        return null;
    const kind = raw.kind;
    if (typeof kind === "string") {
        const byKind = Object.values(table).find((value) => value === kind);
        if (byKind)
            return byKind;
    }
    for (const key of Object.keys(raw)) {
        const mapped = table[key];
        if (mapped)
            return mapped;
    }
    return null;
}
function bnToBigint(value) {
    return BigInt(value.toString());
}
function collateralPolicyKindLabel(kindCode) {
    if (kindCode === 0)
        return "stable";
    if (kindCode === 1)
        return "native";
    if (kindCode === 2)
        return "lst";
    return "unknown";
}
function decodeOptionAccount(pda, raw) {
    const acc = raw;
    const optionType = decodeAnchorEnum(acc.optionType ?? acc.option_type, OPTION_TYPE_VARIANTS);
    const state = decodeAnchorEnum(acc.state, OPTION_STATE_VARIANTS);
    const underlying = (0, pda_1.indexToUnderlying)(Number(acc.asset));
    if (!optionType || !state || !underlying)
        return null;
    const strikeOnChain = bnToBigint(acc.strike);
    const upperBoundOnChain = bnToBigint(acc.upperBound ?? acc.upper_bound ?? new anchor_1.BN(0));
    const extraParam = Number(acc.extraParam ?? acc.extra_param ?? 0);
    const payoffAmount = bnToBigint(acc.payoffAmount ?? acc.payoff_amount ?? new anchor_1.BN(0));
    const collateralLocked = bnToBigint(acc.collateralLocked ?? acc.collateral_locked ?? new anchor_1.BN(0));
    const v0UsdcMicro = bnToBigint(acc.v0UsdcMicro ?? acc.v0_usdc_micro ?? new anchor_1.BN(0));
    const spotAtCreationRaw = bnToBigint(acc.spotAtCreation ?? acc.spot_at_creation ?? new anchor_1.BN(0));
    const settledPriceRaw = bnToBigint(acc.settledPrice ?? acc.settled_price ?? new anchor_1.BN(0));
    const settledAtRaw = Number((acc.settledAt ?? acc.settled_at ?? new anchor_1.BN(0)).toString());
    const metadata = acc.metadata ?? web3_js_1.PublicKey.default;
    const direction = Number(acc.direction) >= 0 ? "buy" : "sell";
    return {
        pda: pda.toBase58(),
        optionTokenMint: (0, pda_1.findOptionTokenMintPda)(pda)[0].toBase58(),
        creator: acc.creator.toBase58(),
        holder: acc.holder.toBase58(),
        optionType,
        state,
        underlying,
        underlyingIndex: Number(acc.asset),
        direction,
        strikeOnChain,
        strikeUsd: (0, pda_1.fromOnChainStrike)(strikeOnChain),
        upperBoundOnChain,
        upperBoundUsd: (0, pda_1.fromOnChainStrike)(upperBoundOnChain),
        extraParam,
        extraParamUsd: optionType === "CappedVanilla" ? extraParam : 0,
        expiryTs: Number((acc.expiryTs ?? acc.expiry_ts ?? new anchor_1.BN(0)).toString()),
        payoffAmount,
        payoffUsd: (0, pda_1.fromUsdcUnits)(payoffAmount),
        collateralLocked,
        collateralLockedUsd: (0, pda_1.fromUsdcUnits)(collateralLocked),
        v0UsdcMicro,
        v0Usd: (0, pda_1.fromUsdcUnits)(v0UsdcMicro),
        sigmaAtCreation: Number(acc.sigmaAtCreation ?? acc.sigma_at_creation ?? 0),
        spotAtCreationUsd: Number(spotAtCreationRaw) / 100000000,
        settled: Boolean(acc.settled),
        createdAt: Number((acc.createdAt ?? acc.created_at ?? new anchor_1.BN(0)).toString()),
        underlyingFeedId: (acc.underlyingFeedId ?? acc.underlying_feed_id ?? web3_js_1.PublicKey.default).toBase58(),
        settlementMint: (acc.settlementMint ?? acc.settlement_mint ?? web3_js_1.PublicKey.default).toBase58(),
        settlementDecimals: Number(acc.settlementDecimals ?? acc.settlement_decimals ?? 6),
        metadata: metadata.toBase58(),
        metadataStatus: metadata.equals(web3_js_1.PublicKey.default) ? "pending" : "registered",
        settledPriceRaw,
        settledPriceUsd: settledPriceRaw === 0n ? null : Number(settledPriceRaw) / 100000000,
        settledAt: settledAtRaw > 0 ? settledAtRaw : null,
    };
}
function applyOptionSummaryFilters(input, opts = {}) {
    let summaries = [...input];
    if (opts.underlying)
        summaries = summaries.filter((s) => s.underlying === opts.underlying);
    if (opts.optionType)
        summaries = summaries.filter((s) => s.optionType === opts.optionType);
    if (opts.state)
        summaries = summaries.filter((s) => s.state === opts.state);
    if (opts.holder) {
        const holder = pubkeyishToBase58(opts.holder);
        summaries = summaries.filter((s) => s.holder === holder);
    }
    if (opts.creator) {
        const creator = pubkeyishToBase58(opts.creator);
        summaries = summaries.filter((s) => s.creator === creator);
    }
    const sortBy = opts.sortBy ?? "createdAt";
    summaries.sort((a, b) => sortBy === "expiry" ? b.expiryTs - a.expiryTs : b.createdAt - a.createdAt);
    const limit = Math.max(0, Math.min(opts.limit ?? 100, 500));
    return summaries.slice(0, limit);
}
//# sourceMappingURL=client.js.map