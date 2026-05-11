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
exports.ComboIntentRegistered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ComboIntentRegistered {
    constructor(fields) {
        this.combo = fields.combo;
        this.buyer = fields.buyer;
        this.combo_id = fields.combo_id;
        this.n_legs = fields.n_legs;
        this.total_max_premium_micro = fields.total_max_premium_micro;
        this.expiry_ts = fields.expiry_ts;
        this.created_at = fields.created_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("combo"),
            borsh.publicKey("buyer"),
            borsh.u64("combo_id"),
            borsh.u8("n_legs"),
            borsh.u64("total_max_premium_micro"),
            borsh.i64("expiry_ts"),
            borsh.i64("created_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ComboIntentRegistered({
            combo: obj.combo,
            buyer: obj.buyer,
            combo_id: obj.combo_id,
            n_legs: obj.n_legs,
            total_max_premium_micro: obj.total_max_premium_micro,
            expiry_ts: obj.expiry_ts,
            created_at: obj.created_at,
        });
    }
    static toEncodable(fields) {
        return {
            combo: fields.combo,
            buyer: fields.buyer,
            combo_id: fields.combo_id,
            n_legs: fields.n_legs,
            total_max_premium_micro: fields.total_max_premium_micro,
            expiry_ts: fields.expiry_ts,
            created_at: fields.created_at,
        };
    }
    toJSON() {
        return {
            combo: this.combo.toString(),
            buyer: this.buyer.toString(),
            combo_id: this.combo_id.toString(),
            n_legs: this.n_legs,
            total_max_premium_micro: this.total_max_premium_micro.toString(),
            expiry_ts: this.expiry_ts.toString(),
            created_at: this.created_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ComboIntentRegistered({
            combo: new web3_js_1.PublicKey(obj.combo),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            combo_id: new bn_js_1.default(obj.combo_id),
            n_legs: obj.n_legs,
            total_max_premium_micro: new bn_js_1.default(obj.total_max_premium_micro),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            created_at: new bn_js_1.default(obj.created_at),
        });
    }
    toEncodable() {
        return ComboIntentRegistered.toEncodable(this);
    }
}
exports.ComboIntentRegistered = ComboIntentRegistered;
//# sourceMappingURL=ComboIntentRegistered.js.map