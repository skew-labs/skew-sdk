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
exports.ComboIntentV2LegFilled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ComboIntentV2LegFilled {
    constructor(fields) {
        this.intent = fields.intent;
        this.leg_index = fields.leg_index;
        this.option = fields.option;
        this.side = fields.side;
        this.qty_micro = fields.qty_micro;
        this.fill_premium_micro = fields.fill_premium_micro;
        this.filled_at = fields.filled_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("intent"),
            borsh.u8("leg_index"),
            borsh.publicKey("option"),
            borsh.i8("side"),
            borsh.u64("qty_micro"),
            borsh.u64("fill_premium_micro"),
            borsh.i64("filled_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ComboIntentV2LegFilled({
            intent: obj.intent,
            leg_index: obj.leg_index,
            option: obj.option,
            side: obj.side,
            qty_micro: obj.qty_micro,
            fill_premium_micro: obj.fill_premium_micro,
            filled_at: obj.filled_at,
        });
    }
    static toEncodable(fields) {
        return {
            intent: fields.intent,
            leg_index: fields.leg_index,
            option: fields.option,
            side: fields.side,
            qty_micro: fields.qty_micro,
            fill_premium_micro: fields.fill_premium_micro,
            filled_at: fields.filled_at,
        };
    }
    toJSON() {
        return {
            intent: this.intent.toString(),
            leg_index: this.leg_index,
            option: this.option.toString(),
            side: this.side,
            qty_micro: this.qty_micro.toString(),
            fill_premium_micro: this.fill_premium_micro.toString(),
            filled_at: this.filled_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ComboIntentV2LegFilled({
            intent: new web3_js_1.PublicKey(obj.intent),
            leg_index: obj.leg_index,
            option: new web3_js_1.PublicKey(obj.option),
            side: obj.side,
            qty_micro: new bn_js_1.default(obj.qty_micro),
            fill_premium_micro: new bn_js_1.default(obj.fill_premium_micro),
            filled_at: new bn_js_1.default(obj.filled_at),
        });
    }
    toEncodable() {
        return ComboIntentV2LegFilled.toEncodable(this);
    }
}
exports.ComboIntentV2LegFilled = ComboIntentV2LegFilled;
//# sourceMappingURL=ComboIntentV2LegFilled.js.map