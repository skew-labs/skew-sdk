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
exports.MakerAxePublished = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MakerAxePublished {
    constructor(fields) {
        this.axe = fields.axe;
        this.mm = fields.mm;
        this.axe_id = fields.axe_id;
        this.asset = fields.asset;
        this.side = fields.side;
        this.option_type_mask = fields.option_type_mask;
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
        this.created_at = fields.created_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("axe"),
            borsh.publicKey("mm"),
            borsh.u64("axe_id"),
            borsh.u8("asset"),
            borsh.i8("side"),
            borsh.u16("option_type_mask"),
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
            borsh.i64("created_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MakerAxePublished({
            axe: obj.axe,
            mm: obj.mm,
            axe_id: obj.axe_id,
            asset: obj.asset,
            side: obj.side,
            option_type_mask: obj.option_type_mask,
            strike_band_lo: obj.strike_band_lo,
            strike_band_hi: obj.strike_band_hi,
            expiry_band_lo: obj.expiry_band_lo,
            expiry_band_hi: obj.expiry_band_hi,
            size_micro: obj.size_micro,
            bid_premium_band_lo: obj.bid_premium_band_lo,
            bid_premium_band_hi: obj.bid_premium_band_hi,
            ask_premium_band_lo: obj.ask_premium_band_lo,
            ask_premium_band_hi: obj.ask_premium_band_hi,
            valid_until: obj.valid_until,
            created_at: obj.created_at,
        });
    }
    static toEncodable(fields) {
        return {
            axe: fields.axe,
            mm: fields.mm,
            axe_id: fields.axe_id,
            asset: fields.asset,
            side: fields.side,
            option_type_mask: fields.option_type_mask,
            strike_band_lo: fields.strike_band_lo,
            strike_band_hi: fields.strike_band_hi,
            expiry_band_lo: fields.expiry_band_lo,
            expiry_band_hi: fields.expiry_band_hi,
            size_micro: fields.size_micro,
            bid_premium_band_lo: fields.bid_premium_band_lo,
            bid_premium_band_hi: fields.bid_premium_band_hi,
            ask_premium_band_lo: fields.ask_premium_band_lo,
            ask_premium_band_hi: fields.ask_premium_band_hi,
            valid_until: fields.valid_until,
            created_at: fields.created_at,
        };
    }
    toJSON() {
        return {
            axe: this.axe.toString(),
            mm: this.mm.toString(),
            axe_id: this.axe_id.toString(),
            asset: this.asset,
            side: this.side,
            option_type_mask: this.option_type_mask,
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
            created_at: this.created_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new MakerAxePublished({
            axe: new web3_js_1.PublicKey(obj.axe),
            mm: new web3_js_1.PublicKey(obj.mm),
            axe_id: new bn_js_1.default(obj.axe_id),
            asset: obj.asset,
            side: obj.side,
            option_type_mask: obj.option_type_mask,
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
            created_at: new bn_js_1.default(obj.created_at),
        });
    }
    toEncodable() {
        return MakerAxePublished.toEncodable(this);
    }
}
exports.MakerAxePublished = MakerAxePublished;
//# sourceMappingURL=MakerAxePublished.js.map