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
exports.RfqAuctionRegistered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RfqAuctionRegistered {
    constructor(fields) {
        this.auction = fields.auction;
        this.auction_id = fields.auction_id;
        this.buyer = fields.buyer;
        this.asset = fields.asset;
        this.strike_micro = fields.strike_micro;
        this.expiry_ts = fields.expiry_ts;
        this.option_type = fields.option_type;
        this.payoff_amount_micro = fields.payoff_amount_micro;
        this.max_premium_micro = fields.max_premium_micro;
        this.auction_open_slot = fields.auction_open_slot;
        this.auction_close_slot = fields.auction_close_slot;
        this.registered_at = fields.registered_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("auction"),
            borsh.u64("auction_id"),
            borsh.publicKey("buyer"),
            borsh.u8("asset"),
            borsh.u64("strike_micro"),
            borsh.i64("expiry_ts"),
            borsh.u8("option_type"),
            borsh.u64("payoff_amount_micro"),
            borsh.u64("max_premium_micro"),
            borsh.u64("auction_open_slot"),
            borsh.u64("auction_close_slot"),
            borsh.i64("registered_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RfqAuctionRegistered({
            auction: obj.auction,
            auction_id: obj.auction_id,
            buyer: obj.buyer,
            asset: obj.asset,
            strike_micro: obj.strike_micro,
            expiry_ts: obj.expiry_ts,
            option_type: obj.option_type,
            payoff_amount_micro: obj.payoff_amount_micro,
            max_premium_micro: obj.max_premium_micro,
            auction_open_slot: obj.auction_open_slot,
            auction_close_slot: obj.auction_close_slot,
            registered_at: obj.registered_at,
        });
    }
    static toEncodable(fields) {
        return {
            auction: fields.auction,
            auction_id: fields.auction_id,
            buyer: fields.buyer,
            asset: fields.asset,
            strike_micro: fields.strike_micro,
            expiry_ts: fields.expiry_ts,
            option_type: fields.option_type,
            payoff_amount_micro: fields.payoff_amount_micro,
            max_premium_micro: fields.max_premium_micro,
            auction_open_slot: fields.auction_open_slot,
            auction_close_slot: fields.auction_close_slot,
            registered_at: fields.registered_at,
        };
    }
    toJSON() {
        return {
            auction: this.auction.toString(),
            auction_id: this.auction_id.toString(),
            buyer: this.buyer.toString(),
            asset: this.asset,
            strike_micro: this.strike_micro.toString(),
            expiry_ts: this.expiry_ts.toString(),
            option_type: this.option_type,
            payoff_amount_micro: this.payoff_amount_micro.toString(),
            max_premium_micro: this.max_premium_micro.toString(),
            auction_open_slot: this.auction_open_slot.toString(),
            auction_close_slot: this.auction_close_slot.toString(),
            registered_at: this.registered_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new RfqAuctionRegistered({
            auction: new web3_js_1.PublicKey(obj.auction),
            auction_id: new bn_js_1.default(obj.auction_id),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            asset: obj.asset,
            strike_micro: new bn_js_1.default(obj.strike_micro),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            option_type: obj.option_type,
            payoff_amount_micro: new bn_js_1.default(obj.payoff_amount_micro),
            max_premium_micro: new bn_js_1.default(obj.max_premium_micro),
            auction_open_slot: new bn_js_1.default(obj.auction_open_slot),
            auction_close_slot: new bn_js_1.default(obj.auction_close_slot),
            registered_at: new bn_js_1.default(obj.registered_at),
        });
    }
    toEncodable() {
        return RfqAuctionRegistered.toEncodable(this);
    }
}
exports.RfqAuctionRegistered = RfqAuctionRegistered;
//# sourceMappingURL=RfqAuctionRegistered.js.map