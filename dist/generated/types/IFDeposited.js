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
exports.IFDeposited = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const types = __importStar(require("../types")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class IFDeposited {
    constructor(fields) {
        this.insurance_fund = fields.insurance_fund;
        this.tier = fields.tier;
        this.amount = fields.amount;
        this.depositor = fields.depositor;
        this.is_sitg = fields.is_sitg;
        this.deposited_at = fields.deposited_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("insurance_fund"),
            types.IfTier.layout("tier"),
            borsh.u64("amount"),
            borsh.publicKey("depositor"),
            borsh.bool("is_sitg"),
            borsh.i64("deposited_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new IFDeposited({
            insurance_fund: obj.insurance_fund,
            tier: types.IfTier.fromDecoded(obj.tier),
            amount: obj.amount,
            depositor: obj.depositor,
            is_sitg: obj.is_sitg,
            deposited_at: obj.deposited_at,
        });
    }
    static toEncodable(fields) {
        return {
            insurance_fund: fields.insurance_fund,
            tier: fields.tier.toEncodable(),
            amount: fields.amount,
            depositor: fields.depositor,
            is_sitg: fields.is_sitg,
            deposited_at: fields.deposited_at,
        };
    }
    toJSON() {
        return {
            insurance_fund: this.insurance_fund.toString(),
            tier: this.tier.toJSON(),
            amount: this.amount.toString(),
            depositor: this.depositor.toString(),
            is_sitg: this.is_sitg,
            deposited_at: this.deposited_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new IFDeposited({
            insurance_fund: new web3_js_1.PublicKey(obj.insurance_fund),
            tier: types.IfTier.fromJSON(obj.tier),
            amount: new bn_js_1.default(obj.amount),
            depositor: new web3_js_1.PublicKey(obj.depositor),
            is_sitg: obj.is_sitg,
            deposited_at: new bn_js_1.default(obj.deposited_at),
        });
    }
    toEncodable() {
        return IFDeposited.toEncodable(this);
    }
}
exports.IFDeposited = IFDeposited;
//# sourceMappingURL=IFDeposited.js.map