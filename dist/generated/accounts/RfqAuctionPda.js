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
exports.RfqAuctionPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class RfqAuctionPda {
    constructor(fields) {
        this.auction_id = fields.auction_id;
        this.buyer = fields.buyer;
        this.option_spec = new types.RfqOptionSpec({ ...fields.option_spec });
        this.max_premium_micro = fields.max_premium_micro;
        this.auction_open_slot = fields.auction_open_slot;
        this.auction_close_slot = fields.auction_close_slot;
        this.best_quote = new types.RfqQuote({ ...fields.best_quote });
        this.state = fields.state;
        this.bump = fields.bump;
        this._padding_0 = fields._padding_0;
        this.created_at = fields.created_at;
        this.is_block_trade = fields.is_block_trade;
        this.block_minimum_size_micro = fields.block_minimum_size_micro;
        this._reserved = fields._reserved;
    }
    static async fetch(c, address, programId = programId_1.PROGRAM_ID) {
        const info = await c.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(c, addresses, programId = programId_1.PROGRAM_ID) {
        const infos = await c.getMultipleAccountsInfo(addresses);
        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(RfqAuctionPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = RfqAuctionPda.layout.decode(data.slice(8));
        return new RfqAuctionPda({
            auction_id: dec.auction_id,
            buyer: dec.buyer,
            option_spec: types.RfqOptionSpec.fromDecoded(dec.option_spec),
            max_premium_micro: dec.max_premium_micro,
            auction_open_slot: dec.auction_open_slot,
            auction_close_slot: dec.auction_close_slot,
            best_quote: types.RfqQuote.fromDecoded(dec.best_quote),
            state: dec.state,
            bump: dec.bump,
            _padding_0: dec._padding_0,
            created_at: dec.created_at,
            is_block_trade: dec.is_block_trade,
            block_minimum_size_micro: dec.block_minimum_size_micro,
            _reserved: dec._reserved,
        });
    }
    toJSON() {
        return {
            auction_id: this.auction_id.toString(),
            buyer: this.buyer.toString(),
            option_spec: this.option_spec.toJSON(),
            max_premium_micro: this.max_premium_micro.toString(),
            auction_open_slot: this.auction_open_slot.toString(),
            auction_close_slot: this.auction_close_slot.toString(),
            best_quote: this.best_quote.toJSON(),
            state: this.state,
            bump: this.bump,
            _padding_0: this._padding_0,
            created_at: this.created_at.toString(),
            is_block_trade: this.is_block_trade,
            block_minimum_size_micro: this.block_minimum_size_micro.toString(),
            _reserved: this._reserved,
        };
    }
    static fromJSON(obj) {
        return new RfqAuctionPda({
            auction_id: new bn_js_1.default(obj.auction_id),
            buyer: new web3_js_1.PublicKey(obj.buyer),
            option_spec: types.RfqOptionSpec.fromJSON(obj.option_spec),
            max_premium_micro: new bn_js_1.default(obj.max_premium_micro),
            auction_open_slot: new bn_js_1.default(obj.auction_open_slot),
            auction_close_slot: new bn_js_1.default(obj.auction_close_slot),
            best_quote: types.RfqQuote.fromJSON(obj.best_quote),
            state: obj.state,
            bump: obj.bump,
            _padding_0: obj._padding_0,
            created_at: new bn_js_1.default(obj.created_at),
            is_block_trade: obj.is_block_trade,
            block_minimum_size_micro: new bn_js_1.default(obj.block_minimum_size_micro),
            _reserved: obj._reserved,
        });
    }
}
exports.RfqAuctionPda = RfqAuctionPda;
RfqAuctionPda.discriminator = Buffer.from([
    126, 144, 41, 183, 184, 86, 59, 68,
]);
RfqAuctionPda.layout = borsh.struct([
    borsh.u64("auction_id"),
    borsh.publicKey("buyer"),
    types.RfqOptionSpec.layout("option_spec"),
    borsh.u64("max_premium_micro"),
    borsh.u64("auction_open_slot"),
    borsh.u64("auction_close_slot"),
    types.RfqQuote.layout("best_quote"),
    borsh.u8("state"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_padding_0"),
    borsh.i64("created_at"),
    borsh.u8("is_block_trade"),
    borsh.u64("block_minimum_size_micro"),
    borsh.array(borsh.u8(), 55, "_reserved"),
]);
//# sourceMappingURL=RfqAuctionPda.js.map