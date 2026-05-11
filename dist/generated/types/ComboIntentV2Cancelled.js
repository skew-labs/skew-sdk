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
exports.ComboIntentV2Cancelled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ComboIntentV2Cancelled {
    constructor(fields) {
        this.intent = fields.intent;
        this.legs_filled = fields.legs_filled;
        this.refund_micro = fields.refund_micro;
        this.cancelled_at = fields.cancelled_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("intent"),
            borsh.u8("legs_filled"),
            borsh.u64("refund_micro"),
            borsh.i64("cancelled_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ComboIntentV2Cancelled({
            intent: obj.intent,
            legs_filled: obj.legs_filled,
            refund_micro: obj.refund_micro,
            cancelled_at: obj.cancelled_at,
        });
    }
    static toEncodable(fields) {
        return {
            intent: fields.intent,
            legs_filled: fields.legs_filled,
            refund_micro: fields.refund_micro,
            cancelled_at: fields.cancelled_at,
        };
    }
    toJSON() {
        return {
            intent: this.intent.toString(),
            legs_filled: this.legs_filled,
            refund_micro: this.refund_micro.toString(),
            cancelled_at: this.cancelled_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ComboIntentV2Cancelled({
            intent: new web3_js_1.PublicKey(obj.intent),
            legs_filled: obj.legs_filled,
            refund_micro: new bn_js_1.default(obj.refund_micro),
            cancelled_at: new bn_js_1.default(obj.cancelled_at),
        });
    }
    toEncodable() {
        return ComboIntentV2Cancelled.toEncodable(this);
    }
}
exports.ComboIntentV2Cancelled = ComboIntentV2Cancelled;
//# sourceMappingURL=ComboIntentV2Cancelled.js.map