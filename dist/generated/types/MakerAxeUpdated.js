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
exports.MakerAxeUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MakerAxeUpdated {
    constructor(fields) {
        this.axe = fields.axe;
        this.mm = fields.mm;
        this.axe_id = fields.axe_id;
        this.version_slot = fields.version_slot;
        this.asset = fields.asset;
        this.side = fields.side;
        this.size_micro = fields.size_micro;
        this.bid_premium_band_lo = fields.bid_premium_band_lo;
        this.ask_premium_band_lo = fields.ask_premium_band_lo;
        this.valid_until = fields.valid_until;
        this.updated_at = fields.updated_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("axe"),
            borsh.publicKey("mm"),
            borsh.u64("axe_id"),
            borsh.u64("version_slot"),
            borsh.u8("asset"),
            borsh.i8("side"),
            borsh.u64("size_micro"),
            borsh.u64("bid_premium_band_lo"),
            borsh.u64("ask_premium_band_lo"),
            borsh.i64("valid_until"),
            borsh.i64("updated_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MakerAxeUpdated({
            axe: obj.axe,
            mm: obj.mm,
            axe_id: obj.axe_id,
            version_slot: obj.version_slot,
            asset: obj.asset,
            side: obj.side,
            size_micro: obj.size_micro,
            bid_premium_band_lo: obj.bid_premium_band_lo,
            ask_premium_band_lo: obj.ask_premium_band_lo,
            valid_until: obj.valid_until,
            updated_at: obj.updated_at,
        });
    }
    static toEncodable(fields) {
        return {
            axe: fields.axe,
            mm: fields.mm,
            axe_id: fields.axe_id,
            version_slot: fields.version_slot,
            asset: fields.asset,
            side: fields.side,
            size_micro: fields.size_micro,
            bid_premium_band_lo: fields.bid_premium_band_lo,
            ask_premium_band_lo: fields.ask_premium_band_lo,
            valid_until: fields.valid_until,
            updated_at: fields.updated_at,
        };
    }
    toJSON() {
        return {
            axe: this.axe.toString(),
            mm: this.mm.toString(),
            axe_id: this.axe_id.toString(),
            version_slot: this.version_slot.toString(),
            asset: this.asset,
            side: this.side,
            size_micro: this.size_micro.toString(),
            bid_premium_band_lo: this.bid_premium_band_lo.toString(),
            ask_premium_band_lo: this.ask_premium_band_lo.toString(),
            valid_until: this.valid_until.toString(),
            updated_at: this.updated_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new MakerAxeUpdated({
            axe: new web3_js_1.PublicKey(obj.axe),
            mm: new web3_js_1.PublicKey(obj.mm),
            axe_id: new bn_js_1.default(obj.axe_id),
            version_slot: new bn_js_1.default(obj.version_slot),
            asset: obj.asset,
            side: obj.side,
            size_micro: new bn_js_1.default(obj.size_micro),
            bid_premium_band_lo: new bn_js_1.default(obj.bid_premium_band_lo),
            ask_premium_band_lo: new bn_js_1.default(obj.ask_premium_band_lo),
            valid_until: new bn_js_1.default(obj.valid_until),
            updated_at: new bn_js_1.default(obj.updated_at),
        });
    }
    toEncodable() {
        return MakerAxeUpdated.toEncodable(this);
    }
}
exports.MakerAxeUpdated = MakerAxeUpdated;
//# sourceMappingURL=MakerAxeUpdated.js.map