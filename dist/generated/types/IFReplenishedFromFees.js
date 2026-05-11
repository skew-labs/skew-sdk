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
exports.IFReplenishedFromFees = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class IFReplenishedFromFees {
    constructor(fields) {
        this.insurance_fund = fields.insurance_fund;
        this.amount = fields.amount;
        this.new_tier3_balance = fields.new_tier3_balance;
        this.replenished_at = fields.replenished_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("insurance_fund"),
            borsh.u64("amount"),
            borsh.u64("new_tier3_balance"),
            borsh.i64("replenished_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new IFReplenishedFromFees({
            insurance_fund: obj.insurance_fund,
            amount: obj.amount,
            new_tier3_balance: obj.new_tier3_balance,
            replenished_at: obj.replenished_at,
        });
    }
    static toEncodable(fields) {
        return {
            insurance_fund: fields.insurance_fund,
            amount: fields.amount,
            new_tier3_balance: fields.new_tier3_balance,
            replenished_at: fields.replenished_at,
        };
    }
    toJSON() {
        return {
            insurance_fund: this.insurance_fund.toString(),
            amount: this.amount.toString(),
            new_tier3_balance: this.new_tier3_balance.toString(),
            replenished_at: this.replenished_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new IFReplenishedFromFees({
            insurance_fund: new web3_js_1.PublicKey(obj.insurance_fund),
            amount: new bn_js_1.default(obj.amount),
            new_tier3_balance: new bn_js_1.default(obj.new_tier3_balance),
            replenished_at: new bn_js_1.default(obj.replenished_at),
        });
    }
    toEncodable() {
        return IFReplenishedFromFees.toEncodable(this);
    }
}
exports.IFReplenishedFromFees = IFReplenishedFromFees;
//# sourceMappingURL=IFReplenishedFromFees.js.map