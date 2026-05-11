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
exports.RegisterRfqAuctionArgs = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RegisterRfqAuctionArgs {
    constructor(fields) {
        this.auction_id = fields.auction_id;
        this.option_spec = new types.RfqOptionSpec({ ...fields.option_spec });
        this.max_premium_micro = fields.max_premium_micro;
        this.duration_slots = fields.duration_slots;
        this.is_block_trade = fields.is_block_trade;
        this.minimum_size_micro = fields.minimum_size_micro;
        this.eligible_maker_count = fields.eligible_maker_count;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("auction_id"),
            types.RfqOptionSpec.layout("option_spec"),
            borsh.u64("max_premium_micro"),
            borsh.u64("duration_slots"),
            borsh.bool("is_block_trade"),
            borsh.u64("minimum_size_micro"),
            borsh.u8("eligible_maker_count"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RegisterRfqAuctionArgs({
            auction_id: obj.auction_id,
            option_spec: types.RfqOptionSpec.fromDecoded(obj.option_spec),
            max_premium_micro: obj.max_premium_micro,
            duration_slots: obj.duration_slots,
            is_block_trade: obj.is_block_trade,
            minimum_size_micro: obj.minimum_size_micro,
            eligible_maker_count: obj.eligible_maker_count,
        });
    }
    static toEncodable(fields) {
        return {
            auction_id: fields.auction_id,
            option_spec: types.RfqOptionSpec.toEncodable(fields.option_spec),
            max_premium_micro: fields.max_premium_micro,
            duration_slots: fields.duration_slots,
            is_block_trade: fields.is_block_trade,
            minimum_size_micro: fields.minimum_size_micro,
            eligible_maker_count: fields.eligible_maker_count,
        };
    }
    toJSON() {
        return {
            auction_id: this.auction_id.toString(),
            option_spec: this.option_spec.toJSON(),
            max_premium_micro: this.max_premium_micro.toString(),
            duration_slots: this.duration_slots.toString(),
            is_block_trade: this.is_block_trade,
            minimum_size_micro: this.minimum_size_micro.toString(),
            eligible_maker_count: this.eligible_maker_count,
        };
    }
    static fromJSON(obj) {
        return new RegisterRfqAuctionArgs({
            auction_id: new bn_js_1.default(obj.auction_id),
            option_spec: types.RfqOptionSpec.fromJSON(obj.option_spec),
            max_premium_micro: new bn_js_1.default(obj.max_premium_micro),
            duration_slots: new bn_js_1.default(obj.duration_slots),
            is_block_trade: obj.is_block_trade,
            minimum_size_micro: new bn_js_1.default(obj.minimum_size_micro),
            eligible_maker_count: obj.eligible_maker_count,
        });
    }
    toEncodable() {
        return RegisterRfqAuctionArgs.toEncodable(this);
    }
}
exports.RegisterRfqAuctionArgs = RegisterRfqAuctionArgs;
//# sourceMappingURL=RegisterRfqAuctionArgs.js.map