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
exports.RfqQuoteTaken = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RfqQuoteTaken {
    constructor(fields) {
        this.auction = fields.auction;
        this.buyer = fields.buyer;
        this.mm = fields.mm;
        this.premium_micro = fields.premium_micro;
        this.refund_to_buyer_micro = fields.refund_to_buyer_micro;
        this.slot = fields.slot;
        this.taken_at = fields.taken_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("auction"),
            borsh.publicKey("buyer"),
            borsh.publicKey("mm"),
            borsh.u64("premium_micro"),
            borsh.u64("refund_to_buyer_micro"),
            borsh.u64("slot"),
            borsh.i64("taken_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RfqQuoteTaken({
            auction: obj.auction,
            buyer: obj.buyer,
            mm: obj.mm,
            premium_micro: obj.premium_micro,
            refund_to_buyer_micro: obj.refund_to_buyer_micro,
            slot: obj.slot,
            taken_at: obj.taken_at,
        });
    }
    static toEncodable(fields) {
        return {
            auction: fields.auction,
            buyer: fields.buyer,
            mm: fields.mm,
            premium_micro: fields.premium_micro,
            refund_to_buyer_micro: fields.refund_to_buyer_micro,
            slot: fields.slot,
            taken_at: fields.taken_at,
        };
    }
    toJSON() {
        return {
            auction: this.auction.toString(),
            buyer: this.buyer.toString(),
            mm: this.mm.toString(),
            premium_micro: this.premium_micro.toString(),
            refund_to_buyer_micro: this.refund_to_buyer_micro.toString(),
            slot: this.slot.toString(),
            taken_at: this.taken_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new RfqQuoteTaken({
            auction: new web3_js_1.PublicKey(obj.auction),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            mm: new web3_js_1.PublicKey(obj.mm),
            premium_micro: new bn_js_1.default(obj.premium_micro),
            refund_to_buyer_micro: new bn_js_1.default(obj.refund_to_buyer_micro),
            slot: new bn_js_1.default(obj.slot),
            taken_at: new bn_js_1.default(obj.taken_at),
        });
    }
    toEncodable() {
        return RfqQuoteTaken.toEncodable(this);
    }
}
exports.RfqQuoteTaken = RfqQuoteTaken;
//# sourceMappingURL=RfqQuoteTaken.js.map