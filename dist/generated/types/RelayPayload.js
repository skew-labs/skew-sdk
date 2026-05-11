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
exports.RelayPayload = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RelayPayload {
    constructor(fields) {
        this.relay_nonce = fields.relay_nonce;
        this.quote_expiry_ts = fields.quote_expiry_ts;
        this.option_type = fields.option_type;
        this.asset = fields.asset;
        this.direction = fields.direction;
        this.strike = fields.strike;
        this.expiry_ts = fields.expiry_ts;
        this.payoff_amount = fields.payoff_amount;
        this.settlement_decimals = fields.settlement_decimals;
        this.upper_bound = fields.upper_bound;
        this.extra_param = fields.extra_param;
        this.premium = fields.premium;
        this.settlement_mint = fields.settlement_mint;
        this.buyer = fields.buyer;
    }
    static layout(property) {
        return borsh.struct([
            borsh.u64("relay_nonce"),
            borsh.i64("quote_expiry_ts"),
            types.OptionType.layout("option_type"),
            borsh.u8("asset"),
            borsh.i8("direction"),
            borsh.u64("strike"),
            borsh.i64("expiry_ts"),
            borsh.u64("payoff_amount"),
            borsh.u8("settlement_decimals"),
            borsh.u64("upper_bound"),
            borsh.f64("extra_param"),
            borsh.u64("premium"),
            borsh.publicKey("settlement_mint"),
            borsh.publicKey("buyer"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RelayPayload({
            relay_nonce: obj.relay_nonce,
            quote_expiry_ts: obj.quote_expiry_ts,
            option_type: types.OptionType.fromDecoded(obj.option_type),
            asset: obj.asset,
            direction: obj.direction,
            strike: obj.strike,
            expiry_ts: obj.expiry_ts,
            payoff_amount: obj.payoff_amount,
            settlement_decimals: obj.settlement_decimals,
            upper_bound: obj.upper_bound,
            extra_param: obj.extra_param,
            premium: obj.premium,
            settlement_mint: obj.settlement_mint,
            buyer: obj.buyer,
        });
    }
    static toEncodable(fields) {
        return {
            relay_nonce: fields.relay_nonce,
            quote_expiry_ts: fields.quote_expiry_ts,
            option_type: fields.option_type.toEncodable(),
            asset: fields.asset,
            direction: fields.direction,
            strike: fields.strike,
            expiry_ts: fields.expiry_ts,
            payoff_amount: fields.payoff_amount,
            settlement_decimals: fields.settlement_decimals,
            upper_bound: fields.upper_bound,
            extra_param: fields.extra_param,
            premium: fields.premium,
            settlement_mint: fields.settlement_mint,
            buyer: fields.buyer,
        };
    }
    toJSON() {
        return {
            relay_nonce: this.relay_nonce.toString(),
            quote_expiry_ts: this.quote_expiry_ts.toString(),
            option_type: this.option_type.toJSON(),
            asset: this.asset,
            direction: this.direction,
            strike: this.strike.toString(),
            expiry_ts: this.expiry_ts.toString(),
            payoff_amount: this.payoff_amount.toString(),
            settlement_decimals: this.settlement_decimals,
            upper_bound: this.upper_bound.toString(),
            extra_param: this.extra_param,
            premium: this.premium.toString(),
            settlement_mint: this.settlement_mint.toString(),
            buyer: this.buyer.toString(),
        };
    }
    static fromJSON(obj) {
        return new RelayPayload({
            relay_nonce: new bn_js_1.default(obj.relay_nonce),
            quote_expiry_ts: new bn_js_1.default(obj.quote_expiry_ts),
            option_type: types.OptionType.fromJSON(obj.option_type),
            asset: obj.asset,
            direction: obj.direction,
            strike: new bn_js_1.default(obj.strike),
            expiry_ts: new bn_js_1.default(obj.expiry_ts),
            payoff_amount: new bn_js_1.default(obj.payoff_amount),
            settlement_decimals: obj.settlement_decimals,
            upper_bound: new bn_js_1.default(obj.upper_bound),
            extra_param: obj.extra_param,
            premium: new bn_js_1.default(obj.premium),
            settlement_mint: new web3_js_1.PublicKey(obj.settlement_mint),
            buyer: new web3_js_1.PublicKey(obj.buyer),
        });
    }
    toEncodable() {
        return RelayPayload.toEncodable(this);
    }
}
exports.RelayPayload = RelayPayload;
//# sourceMappingURL=RelayPayload.js.map