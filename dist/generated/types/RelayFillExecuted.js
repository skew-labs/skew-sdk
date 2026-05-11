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
exports.RelayFillExecuted = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RelayFillExecuted {
    constructor(fields) {
        this.option = fields.option;
        this.buyer = fields.buyer;
        this.seller_cm = fields.seller_cm;
        this.relay_nonce = fields.relay_nonce;
        this.premium = fields.premium;
        this.fee = fields.fee;
        this.collateral_locked = fields.collateral_locked;
        this.quote_expiry_ts = fields.quote_expiry_ts;
        this.filled_at = fields.filled_at;
        this.buyer_sig = fields.buyer_sig;
        this.cm_sig = fields.cm_sig;
        this.digest = fields.digest;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("buyer"),
            borsh.publicKey("seller_cm"),
            borsh.u64("relay_nonce"),
            borsh.u64("premium"),
            borsh.u64("fee"),
            borsh.u64("collateral_locked"),
            borsh.i64("quote_expiry_ts"),
            borsh.i64("filled_at"),
            borsh.array(borsh.u8(), 64, "buyer_sig"),
            borsh.array(borsh.u8(), 64, "cm_sig"),
            borsh.array(borsh.u8(), 32, "digest"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RelayFillExecuted({
            option: obj.option,
            buyer: obj.buyer,
            seller_cm: obj.seller_cm,
            relay_nonce: obj.relay_nonce,
            premium: obj.premium,
            fee: obj.fee,
            collateral_locked: obj.collateral_locked,
            quote_expiry_ts: obj.quote_expiry_ts,
            filled_at: obj.filled_at,
            buyer_sig: obj.buyer_sig,
            cm_sig: obj.cm_sig,
            digest: obj.digest,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            buyer: fields.buyer,
            seller_cm: fields.seller_cm,
            relay_nonce: fields.relay_nonce,
            premium: fields.premium,
            fee: fields.fee,
            collateral_locked: fields.collateral_locked,
            quote_expiry_ts: fields.quote_expiry_ts,
            filled_at: fields.filled_at,
            buyer_sig: fields.buyer_sig,
            cm_sig: fields.cm_sig,
            digest: fields.digest,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            buyer: this.buyer.toString(),
            seller_cm: this.seller_cm.toString(),
            relay_nonce: this.relay_nonce.toString(),
            premium: this.premium.toString(),
            fee: this.fee.toString(),
            collateral_locked: this.collateral_locked.toString(),
            quote_expiry_ts: this.quote_expiry_ts.toString(),
            filled_at: this.filled_at.toString(),
            buyer_sig: this.buyer_sig,
            cm_sig: this.cm_sig,
            digest: this.digest,
        };
    }
    static fromJSON(obj) {
        return new RelayFillExecuted({
            option: new web3_js_1.PublicKey(obj.option),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            seller_cm: new web3_js_1.PublicKey(obj.seller_cm),
            relay_nonce: new bn_js_1.default(obj.relay_nonce),
            premium: new bn_js_1.default(obj.premium),
            fee: new bn_js_1.default(obj.fee),
            collateral_locked: new bn_js_1.default(obj.collateral_locked),
            quote_expiry_ts: new bn_js_1.default(obj.quote_expiry_ts),
            filled_at: new bn_js_1.default(obj.filled_at),
            buyer_sig: obj.buyer_sig,
            cm_sig: obj.cm_sig,
            digest: obj.digest,
        });
    }
    toEncodable() {
        return RelayFillExecuted.toEncodable(this);
    }
}
exports.RelayFillExecuted = RelayFillExecuted;
//# sourceMappingURL=RelayFillExecuted.js.map