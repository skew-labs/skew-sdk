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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RfqMakerRegistryPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class RfqMakerRegistryPda {
    constructor(fields) {
        this.mm = fields.mm;
        this.deposit_lamports = fields.deposit_lamports;
        this.success_count = fields.success_count;
        this.fail_count = fields.fail_count;
        this.slashable = fields.slashable;
        this.bump = fields.bump;
        this._padding_0 = fields._padding_0;
        this.registered_at = fields.registered_at;
        this.quote_off = fields.quote_off;
        this.identity_mode = fields.identity_mode;
        this.margin_mode = fields.margin_mode;
        this.risk_scope_asset = fields.risk_scope_asset;
        this.collateral_scope = fields.collateral_scope;
        this.mmp_window_start_ts = fields.mmp_window_start_ts;
        this.mmp_window_fill_count = fields.mmp_window_fill_count;
        this.mmp_window_premium_micro = fields.mmp_window_premium_micro;
        this.mmp_window_notional_micro = fields.mmp_window_notional_micro;
        this._reserved = fields._reserved;
        this.last_quote_slot = fields.last_quote_slot;
        this.quotes_in_current_slot = fields.quotes_in_current_slot;
    }
    static async fetch(c, address, programId = programId_1.PROGRAM_ID) {
        const info = await c.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(c, addresses, programId = programId_1.PROGRAM_ID) {
        const infos = await c.getMultipleAccountsInfo(addresses);
        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(RfqMakerRegistryPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = RfqMakerRegistryPda.layout.decode(data.slice(8));
        return new RfqMakerRegistryPda({
            mm: dec.mm,
            deposit_lamports: dec.deposit_lamports,
            success_count: dec.success_count,
            fail_count: dec.fail_count,
            slashable: dec.slashable,
            bump: dec.bump,
            _padding_0: dec._padding_0,
            registered_at: dec.registered_at,
            quote_off: dec.quote_off,
            identity_mode: dec.identity_mode,
            margin_mode: dec.margin_mode,
            risk_scope_asset: dec.risk_scope_asset,
            collateral_scope: dec.collateral_scope,
            mmp_window_start_ts: dec.mmp_window_start_ts,
            mmp_window_fill_count: dec.mmp_window_fill_count,
            mmp_window_premium_micro: dec.mmp_window_premium_micro,
            mmp_window_notional_micro: dec.mmp_window_notional_micro,
            _reserved: dec._reserved,
            last_quote_slot: dec.last_quote_slot,
            quotes_in_current_slot: dec.quotes_in_current_slot,
        });
    }
    toJSON() {
        return {
            mm: this.mm.toString(),
            deposit_lamports: this.deposit_lamports.toString(),
            success_count: this.success_count,
            fail_count: this.fail_count,
            slashable: this.slashable,
            bump: this.bump,
            _padding_0: this._padding_0,
            registered_at: this.registered_at.toString(),
            quote_off: this.quote_off,
            identity_mode: this.identity_mode,
            margin_mode: this.margin_mode,
            risk_scope_asset: this.risk_scope_asset,
            collateral_scope: this.collateral_scope,
            mmp_window_start_ts: this.mmp_window_start_ts.toString(),
            mmp_window_fill_count: this.mmp_window_fill_count,
            mmp_window_premium_micro: this.mmp_window_premium_micro.toString(),
            mmp_window_notional_micro: this.mmp_window_notional_micro.toString(),
            _reserved: this._reserved,
            last_quote_slot: this.last_quote_slot.toString(),
            quotes_in_current_slot: this.quotes_in_current_slot,
        };
    }
    static fromJSON(obj) {
        return new RfqMakerRegistryPda({
            mm: new web3_js_1.PublicKey(obj.mm),
            deposit_lamports: new bn_js_1.default(obj.deposit_lamports),
            success_count: obj.success_count,
            fail_count: obj.fail_count,
            slashable: obj.slashable,
            bump: obj.bump,
            _padding_0: obj._padding_0,
            registered_at: new bn_js_1.default(obj.registered_at),
            quote_off: obj.quote_off,
            identity_mode: obj.identity_mode,
            margin_mode: obj.margin_mode,
            risk_scope_asset: obj.risk_scope_asset,
            collateral_scope: obj.collateral_scope,
            mmp_window_start_ts: new bn_js_1.default(obj.mmp_window_start_ts),
            mmp_window_fill_count: obj.mmp_window_fill_count,
            mmp_window_premium_micro: new bn_js_1.default(obj.mmp_window_premium_micro),
            mmp_window_notional_micro: new bn_js_1.default(obj.mmp_window_notional_micro),
            _reserved: obj._reserved,
            last_quote_slot: new bn_js_1.default(obj.last_quote_slot),
            quotes_in_current_slot: obj.quotes_in_current_slot,
        });
    }
}
exports.RfqMakerRegistryPda = RfqMakerRegistryPda;
RfqMakerRegistryPda.discriminator = Buffer.from([
    13, 250, 217, 42, 250, 56, 162, 221,
]);
RfqMakerRegistryPda.layout = borsh.struct([
    borsh.publicKey("mm"),
    borsh.u64("deposit_lamports"),
    borsh.u32("success_count"),
    borsh.u32("fail_count"),
    borsh.bool("slashable"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_padding_0"),
    borsh.i64("registered_at"),
    borsh.bool("quote_off"),
    borsh.u8("identity_mode"),
    borsh.u8("margin_mode"),
    borsh.u8("risk_scope_asset"),
    borsh.u8("collateral_scope"),
    borsh.i64("mmp_window_start_ts"),
    borsh.u16("mmp_window_fill_count"),
    borsh.u64("mmp_window_premium_micro"),
    borsh.u64("mmp_window_notional_micro"),
    borsh.array(borsh.u8(), 1, "_reserved"),
    borsh.u64("last_quote_slot"),
    borsh.u32("quotes_in_current_slot"),
]);
//# sourceMappingURL=RfqMakerRegistryPda.js.map