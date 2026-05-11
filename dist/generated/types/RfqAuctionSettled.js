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
exports.RfqAuctionSettled = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RfqAuctionSettled {
    constructor(fields) {
        this.auction = fields.auction;
        this.winner_mm = fields.winner_mm;
        this.winning_premium_micro = fields.winning_premium_micro;
        this.refund_to_buyer_micro = fields.refund_to_buyer_micro;
        this.settled_at = fields.settled_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("auction"),
            borsh.publicKey("winner_mm"),
            borsh.u64("winning_premium_micro"),
            borsh.u64("refund_to_buyer_micro"),
            borsh.i64("settled_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RfqAuctionSettled({
            auction: obj.auction,
            winner_mm: obj.winner_mm,
            winning_premium_micro: obj.winning_premium_micro,
            refund_to_buyer_micro: obj.refund_to_buyer_micro,
            settled_at: obj.settled_at,
        });
    }
    static toEncodable(fields) {
        return {
            auction: fields.auction,
            winner_mm: fields.winner_mm,
            winning_premium_micro: fields.winning_premium_micro,
            refund_to_buyer_micro: fields.refund_to_buyer_micro,
            settled_at: fields.settled_at,
        };
    }
    toJSON() {
        return {
            auction: this.auction.toString(),
            winner_mm: this.winner_mm.toString(),
            winning_premium_micro: this.winning_premium_micro.toString(),
            refund_to_buyer_micro: this.refund_to_buyer_micro.toString(),
            settled_at: this.settled_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new RfqAuctionSettled({
            auction: new web3_js_1.PublicKey(obj.auction),
            winner_mm: new web3_js_1.PublicKey(obj.winner_mm),
            winning_premium_micro: new bn_js_1.default(obj.winning_premium_micro),
            refund_to_buyer_micro: new bn_js_1.default(obj.refund_to_buyer_micro),
            settled_at: new bn_js_1.default(obj.settled_at),
        });
    }
    toEncodable() {
        return RfqAuctionSettled.toEncodable(this);
    }
}
exports.RfqAuctionSettled = RfqAuctionSettled;
//# sourceMappingURL=RfqAuctionSettled.js.map