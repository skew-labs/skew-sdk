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
exports.OptionCreated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OptionCreated {
    constructor(fields) {
        this.option = fields.option;
        this.creator = fields.creator;
        this.nonce = fields.nonce;
        this.option_type = fields.option_type;
        this.strike = fields.strike;
        this.expiry_ts = fields.expiry_ts;
        this.payoff_amount = fields.payoff_amount;
        this.settlement_mint = fields.settlement_mint;
        this.created_at = fields.created_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("creator"),
            borsh.u64("nonce"),
            types.OptionType.layout("option_type"),
            borsh.u64("strike"),
            borsh.i64("expiry_ts"),
            borsh.u64("payoff_amount"),
            borsh.publicKey("settlement_mint"),
            borsh.i64("created_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OptionCreated({
            option: obj.option,
            creator: obj.creator,
            nonce: obj.nonce,
            option_type: types.OptionType.fromDecoded(obj.option_type),
            strike: obj.strike,
            expiry_ts: obj.expiry_ts,
            payoff_amount: obj.payoff_amount,
            settlement_mint: obj.settlement_mint,
            created_at: obj.created_at,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            creator: fields.creator,
            nonce: fields.nonce,
            option_type: fields.option_type.toEncodable(),
            strike: fields.strike,
            expiry_ts: fields.expiry_ts,
            payoff_amount: fields.payoff_amount,
            settlement_mint: fields.settlement_mint,
            created_at: fields.created_at,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            creator: this.creator.toString(),
            nonce: this.nonce.toString(),
            option_type: this.option_type.toJSON(),
            strike: this.strike.toString(),
            expiry_ts: this.expiry_ts.toString(),
            payoff_amount: this.payoff_amount.toString(),
            settlement_mint: this.settlement_mint.toString(),
            created_at: this.created_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new OptionCreated({
            option: new web3_js_1.PublicKey(obj.option),
            creator: new web3_js_1.PublicKey(obj.creator),
            nonce: new bn_js_1.default(obj.nonce),
            option_type: types.OptionType.fromJSON(obj.option_type),
            strike: new bn_js_1.default(obj.strike),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            payoff_amount: new bn_js_1.default(obj.payoff_amount),
            settlement_mint: new web3_js_1.PublicKey(obj.settlement_mint),
            created_at: new bn_js_1.default(obj.created_at),
        });
    }
    toEncodable() {
        return OptionCreated.toEncodable(this);
    }
}
exports.OptionCreated = OptionCreated;
//# sourceMappingURL=OptionCreated.js.map