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
exports.MakerAxe = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class MakerAxe {
    constructor(fields) {
        this.mm = fields.mm;
        this.axe_id = fields.axe_id;
        this.asset = fields.asset;
        this.side = fields.side;
        this.option_type_mask = fields.option_type_mask;
        this._pad_0 = fields._pad_0;
        this.strike_band_lo = fields.strike_band_lo;
        this.strike_band_hi = fields.strike_band_hi;
        this.expiry_band_lo = fields.expiry_band_lo;
        this.expiry_band_hi = fields.expiry_band_hi;
        this.size_micro = fields.size_micro;
        this.bid_premium_band_lo = fields.bid_premium_band_lo;
        this.bid_premium_band_hi = fields.bid_premium_band_hi;
        this.ask_premium_band_lo = fields.ask_premium_band_lo;
        this.ask_premium_band_hi = fields.ask_premium_band_hi;
        this.valid_until = fields.valid_until;
        this.note_hash = fields.note_hash;
        this.revoked = fields.revoked;
        this.bump = fields.bump;
        this._pad_1 = fields._pad_1;
        this.created_at = fields.created_at;
        this.version_slot = fields.version_slot;
        this._reserved = fields._reserved;
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
        if (!data.slice(0, 8).equals(MakerAxe.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = MakerAxe.layout.decode(data.slice(8));
        return new MakerAxe({
            mm: dec.mm,
            axe_id: dec.axe_id,
            asset: dec.asset,
            side: dec.side,
            option_type_mask: dec.option_type_mask,
            _pad_0: dec._pad_0,
            strike_band_lo: dec.strike_band_lo,
            strike_band_hi: dec.strike_band_hi,
            expiry_band_lo: dec.expiry_band_lo,
            expiry_band_hi: dec.expiry_band_hi,
            size_micro: dec.size_micro,
            bid_premium_band_lo: dec.bid_premium_band_lo,
            bid_premium_band_hi: dec.bid_premium_band_hi,
            ask_premium_band_lo: dec.ask_premium_band_lo,
            ask_premium_band_hi: dec.ask_premium_band_hi,
            valid_until: dec.valid_until,
            note_hash: dec.note_hash,
            revoked: dec.revoked,
            bump: dec.bump,
            _pad_1: dec._pad_1,
            created_at: dec.created_at,
            version_slot: dec.version_slot,
            _reserved: dec._reserved,
        });
    }
    toJSON() {
        return {
            mm: this.mm.toString(),
            axe_id: this.axe_id.toString(),
            asset: this.asset,
            side: this.side,
            option_type_mask: this.option_type_mask,
            _pad_0: this._pad_0,
            strike_band_lo: this.strike_band_lo.toString(),
            strike_band_hi: this.strike_band_hi.toString(),
            expiry_band_lo: this.expiry_band_lo.toString(),
            expiry_band_hi: this.expiry_band_hi.toString(),
            size_micro: this.size_micro.toString(),
            bid_premium_band_lo: this.bid_premium_band_lo.toString(),
            bid_premium_band_hi: this.bid_premium_band_hi.toString(),
            ask_premium_band_lo: this.ask_premium_band_lo.toString(),
            ask_premium_band_hi: this.ask_premium_band_hi.toString(),
            valid_until: this.valid_until.toString(),
            note_hash: this.note_hash,
            revoked: this.revoked,
            bump: this.bump,
            _pad_1: this._pad_1,
            created_at: this.created_at.toString(),
            version_slot: this.version_slot.toString(),
            _reserved: this._reserved,
        };
    }
    static fromJSON(obj) {
        return new MakerAxe({
            mm: new web3_js_1.PublicKey(obj.mm),
            axe_id: new bn_js_1.default(obj.axe_id),
            asset: obj.asset,
            side: obj.side,
            option_type_mask: obj.option_type_mask,
            _pad_0: obj._pad_0,
            strike_band_lo: new bn_js_1.default(obj.strike_band_lo),
            strike_band_hi: new bn_js_1.default(obj.strike_band_hi),
            expiry_band_lo: new bn_js_1.default(obj.expiry_band_lo),
            expiry_band_hi: new bn_js_1.default(obj.expiry_band_hi),
            size_micro: new bn_js_1.default(obj.size_micro),
            bid_premium_band_lo: new bn_js_1.default(obj.bid_premium_band_lo),
            bid_premium_band_hi: new bn_js_1.default(obj.bid_premium_band_hi),
            ask_premium_band_lo: new bn_js_1.default(obj.ask_premium_band_lo),
            ask_premium_band_hi: new bn_js_1.default(obj.ask_premium_band_hi),
            valid_until: new bn_js_1.default(obj.valid_until),
            note_hash: obj.note_hash,
            revoked: obj.revoked,
            bump: obj.bump,
            _pad_1: obj._pad_1,
            created_at: new bn_js_1.default(obj.created_at),
            version_slot: new bn_js_1.default(obj.version_slot),
            _reserved: obj._reserved,
        });
    }
}
exports.MakerAxe = MakerAxe;
MakerAxe.discriminator = Buffer.from([
    43, 128, 182, 133, 98, 105, 172, 174,
]);
MakerAxe.layout = borsh.struct([
    borsh.publicKey("mm"),
    borsh.u64("axe_id"),
    borsh.u8("asset"),
    borsh.i8("side"),
    borsh.u16("option_type_mask"),
    borsh.array(borsh.u8(), 4, "_pad_0"),
    borsh.u64("strike_band_lo"),
    borsh.u64("strike_band_hi"),
    borsh.i64("expiry_band_lo"),
    borsh.i64("expiry_band_hi"),
    borsh.u64("size_micro"),
    borsh.u64("bid_premium_band_lo"),
    borsh.u64("bid_premium_band_hi"),
    borsh.u64("ask_premium_band_lo"),
    borsh.u64("ask_premium_band_hi"),
    borsh.i64("valid_until"),
    borsh.array(borsh.u8(), 32, "note_hash"),
    borsh.bool("revoked"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_pad_1"),
    borsh.i64("created_at"),
    borsh.u64("version_slot"),
    borsh.array(borsh.u8(), 32, "_reserved"),
]);
//# sourceMappingURL=MakerAxe.js.map