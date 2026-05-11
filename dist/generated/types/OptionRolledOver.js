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
exports.OptionRolledOver = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OptionRolledOver {
    constructor(fields) {
        this.old_option = fields.old_option;
        this.new_option = fields.new_option;
        this.creator = fields.creator;
        this.new_expiry_ts = fields.new_expiry_ts;
        this.new_strike = fields.new_strike;
        this.new_payoff_amount = fields.new_payoff_amount;
        this.collateral_carried = fields.collateral_carried;
        this.rolled_at = fields.rolled_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("old_option"),
            borsh.publicKey("new_option"),
            borsh.publicKey("creator"),
            borsh.i64("new_expiry_ts"),
            borsh.u64("new_strike"),
            borsh.u64("new_payoff_amount"),
            borsh.u64("collateral_carried"),
            borsh.i64("rolled_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OptionRolledOver({
            old_option: obj.old_option,
            new_option: obj.new_option,
            creator: obj.creator,
            new_expiry_ts: obj.new_expiry_ts,
            new_strike: obj.new_strike,
            new_payoff_amount: obj.new_payoff_amount,
            collateral_carried: obj.collateral_carried,
            rolled_at: obj.rolled_at,
        });
    }
    static toEncodable(fields) {
        return {
            old_option: fields.old_option,
            new_option: fields.new_option,
            creator: fields.creator,
            new_expiry_ts: fields.new_expiry_ts,
            new_strike: fields.new_strike,
            new_payoff_amount: fields.new_payoff_amount,
            collateral_carried: fields.collateral_carried,
            rolled_at: fields.rolled_at,
        };
    }
    toJSON() {
        return {
            old_option: this.old_option.toString(),
            new_option: this.new_option.toString(),
            creator: this.creator.toString(),
            new_expiry_ts: this.new_expiry_ts.toString(),
            new_strike: this.new_strike.toString(),
            new_payoff_amount: this.new_payoff_amount.toString(),
            collateral_carried: this.collateral_carried.toString(),
            rolled_at: this.rolled_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new OptionRolledOver({
            old_option: new web3_js_1.PublicKey(obj.old_option),
            new_option: new web3_js_1.PublicKey(obj.new_option),
            creator: new web3_js_1.PublicKey(obj.creator),
            new_expiry_ts: new bn_js_1.default(obj.new_expiry_ts),
            new_strike: new bn_js_1.default(obj.new_strike),
            new_payoff_amount: new bn_js_1.default(obj.new_payoff_amount),
            collateral_carried: new bn_js_1.default(obj.collateral_carried),
            rolled_at: new bn_js_1.default(obj.rolled_at),
        });
    }
    toEncodable() {
        return OptionRolledOver.toEncodable(this);
    }
}
exports.OptionRolledOver = OptionRolledOver;
//# sourceMappingURL=OptionRolledOver.js.map