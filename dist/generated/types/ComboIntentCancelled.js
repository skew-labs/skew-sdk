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
exports.ComboIntentCancelled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ComboIntentCancelled {
    constructor(fields) {
        this.combo = fields.combo;
        this.buyer = fields.buyer;
        this.combo_id = fields.combo_id;
        this.refund = fields.refund;
        this.cancelled_at = fields.cancelled_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("combo"),
            borsh.publicKey("buyer"),
            borsh.u64("combo_id"),
            borsh.u64("refund"),
            borsh.i64("cancelled_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ComboIntentCancelled({
            combo: obj.combo,
            buyer: obj.buyer,
            combo_id: obj.combo_id,
            refund: obj.refund,
            cancelled_at: obj.cancelled_at,
        });
    }
    static toEncodable(fields) {
        return {
            combo: fields.combo,
            buyer: fields.buyer,
            combo_id: fields.combo_id,
            refund: fields.refund,
            cancelled_at: fields.cancelled_at,
        };
    }
    toJSON() {
        return {
            combo: this.combo.toString(),
            buyer: this.buyer.toString(),
            combo_id: this.combo_id.toString(),
            refund: this.refund.toString(),
            cancelled_at: this.cancelled_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ComboIntentCancelled({
            combo: new web3_js_1.PublicKey(obj.combo),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            combo_id: new bn_js_1.default(obj.combo_id),
            refund: new bn_js_1.default(obj.refund),
            cancelled_at: new bn_js_1.default(obj.cancelled_at),
        });
    }
    toEncodable() {
        return ComboIntentCancelled.toEncodable(this);
    }
}
exports.ComboIntentCancelled = ComboIntentCancelled;
//# sourceMappingURL=ComboIntentCancelled.js.map