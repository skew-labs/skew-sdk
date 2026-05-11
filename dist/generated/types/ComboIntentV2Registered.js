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
exports.ComboIntentV2Registered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ComboIntentV2Registered {
    constructor(fields) {
        this.intent = fields.intent;
        this.buyer = fields.buyer;
        this.combo_id = fields.combo_id;
        this.leg_count = fields.leg_count;
        this.total_max_premium_micro = fields.total_max_premium_micro;
        this.expires_ts = fields.expires_ts;
        this.registered_at = fields.registered_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("intent"),
            borsh.publicKey("buyer"),
            borsh.u64("combo_id"),
            borsh.u8("leg_count"),
            borsh.u64("total_max_premium_micro"),
            borsh.i64("expires_ts"),
            borsh.i64("registered_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ComboIntentV2Registered({
            intent: obj.intent,
            buyer: obj.buyer,
            combo_id: obj.combo_id,
            leg_count: obj.leg_count,
            total_max_premium_micro: obj.total_max_premium_micro,
            expires_ts: obj.expires_ts,
            registered_at: obj.registered_at,
        });
    }
    static toEncodable(fields) {
        return {
            intent: fields.intent,
            buyer: fields.buyer,
            combo_id: fields.combo_id,
            leg_count: fields.leg_count,
            total_max_premium_micro: fields.total_max_premium_micro,
            expires_ts: fields.expires_ts,
            registered_at: fields.registered_at,
        };
    }
    toJSON() {
        return {
            intent: this.intent.toString(),
            buyer: this.buyer.toString(),
            combo_id: this.combo_id.toString(),
            leg_count: this.leg_count,
            total_max_premium_micro: this.total_max_premium_micro.toString(),
            expires_ts: this.expires_ts.toString(),
            registered_at: this.registered_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ComboIntentV2Registered({
            intent: new web3_js_1.PublicKey(obj.intent),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            combo_id: new bn_js_1.default(obj.combo_id),
            leg_count: obj.leg_count,
            total_max_premium_micro: new bn_js_1.default(obj.total_max_premium_micro),
            expires_ts: new bn_js_1.default(obj.expires_ts),
            registered_at: new bn_js_1.default(obj.registered_at),
        });
    }
    toEncodable() {
        return ComboIntentV2Registered.toEncodable(this);
    }
}
exports.ComboIntentV2Registered = ComboIntentV2Registered;
//# sourceMappingURL=ComboIntentV2Registered.js.map