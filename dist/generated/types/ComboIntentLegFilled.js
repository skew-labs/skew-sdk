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
exports.ComboIntentLegFilled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ComboIntentLegFilled {
    constructor(fields) {
        this.combo = fields.combo;
        this.buyer = fields.buyer;
        this.combo_id = fields.combo_id;
        this.leg_idx = fields.leg_idx;
        this.option = fields.option;
        this.premium_paid_micro = fields.premium_paid_micro;
        this.legs_filled_mask = fields.legs_filled_mask;
        this.filled_at = fields.filled_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("combo"),
            borsh.publicKey("buyer"),
            borsh.u64("combo_id"),
            borsh.u8("leg_idx"),
            borsh.publicKey("option"),
            borsh.u64("premium_paid_micro"),
            borsh.u8("legs_filled_mask"),
            borsh.i64("filled_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ComboIntentLegFilled({
            combo: obj.combo,
            buyer: obj.buyer,
            combo_id: obj.combo_id,
            leg_idx: obj.leg_idx,
            option: obj.option,
            premium_paid_micro: obj.premium_paid_micro,
            legs_filled_mask: obj.legs_filled_mask,
            filled_at: obj.filled_at,
        });
    }
    static toEncodable(fields) {
        return {
            combo: fields.combo,
            buyer: fields.buyer,
            combo_id: fields.combo_id,
            leg_idx: fields.leg_idx,
            option: fields.option,
            premium_paid_micro: fields.premium_paid_micro,
            legs_filled_mask: fields.legs_filled_mask,
            filled_at: fields.filled_at,
        };
    }
    toJSON() {
        return {
            combo: this.combo.toString(),
            buyer: this.buyer.toString(),
            combo_id: this.combo_id.toString(),
            leg_idx: this.leg_idx,
            option: this.option.toString(),
            premium_paid_micro: this.premium_paid_micro.toString(),
            legs_filled_mask: this.legs_filled_mask,
            filled_at: this.filled_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ComboIntentLegFilled({
            combo: new web3_js_1.PublicKey(obj.combo),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            combo_id: new bn_js_1.default(obj.combo_id),
            leg_idx: obj.leg_idx,
            option: new web3_js_1.PublicKey(obj.option),
            premium_paid_micro: new bn_js_1.default(obj.premium_paid_micro),
            legs_filled_mask: obj.legs_filled_mask,
            filled_at: new bn_js_1.default(obj.filled_at),
        });
    }
    toEncodable() {
        return ComboIntentLegFilled.toEncodable(this);
    }
}
exports.ComboIntentLegFilled = ComboIntentLegFilled;
//# sourceMappingURL=ComboIntentLegFilled.js.map