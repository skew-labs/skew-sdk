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
exports.ClawbackExecuted = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class ClawbackExecuted {
    constructor(fields) {
        this.insurance_fund = fields.insurance_fund;
        this.winner_cm = fields.winner_cm;
        this.drain_amount = fields.drain_amount;
        this.pnl_proxy = fields.pnl_proxy;
        this.total_pnl_in_batch = fields.total_pnl_in_batch;
        this.executed_at = fields.executed_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("insurance_fund"),
            borsh.publicKey("winner_cm"),
            borsh.u64("drain_amount"),
            borsh.u64("pnl_proxy"),
            borsh.u64("total_pnl_in_batch"),
            borsh.i64("executed_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new ClawbackExecuted({
            insurance_fund: obj.insurance_fund,
            winner_cm: obj.winner_cm,
            drain_amount: obj.drain_amount,
            pnl_proxy: obj.pnl_proxy,
            total_pnl_in_batch: obj.total_pnl_in_batch,
            executed_at: obj.executed_at,
        });
    }
    static toEncodable(fields) {
        return {
            insurance_fund: fields.insurance_fund,
            winner_cm: fields.winner_cm,
            drain_amount: fields.drain_amount,
            pnl_proxy: fields.pnl_proxy,
            total_pnl_in_batch: fields.total_pnl_in_batch,
            executed_at: fields.executed_at,
        };
    }
    toJSON() {
        return {
            insurance_fund: this.insurance_fund.toString(),
            winner_cm: this.winner_cm.toString(),
            drain_amount: this.drain_amount.toString(),
            pnl_proxy: this.pnl_proxy.toString(),
            total_pnl_in_batch: this.total_pnl_in_batch.toString(),
            executed_at: this.executed_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new ClawbackExecuted({
            insurance_fund: new web3_js_1.PublicKey(obj.insurance_fund),
            winner_cm: new web3_js_1.PublicKey(obj.winner_cm),
            drain_amount: new bn_js_1.default(obj.drain_amount),
            pnl_proxy: new bn_js_1.default(obj.pnl_proxy),
            total_pnl_in_batch: new bn_js_1.default(obj.total_pnl_in_batch),
            executed_at: new bn_js_1.default(obj.executed_at),
        });
    }
    toEncodable() {
        return ClawbackExecuted.toEncodable(this);
    }
}
exports.ClawbackExecuted = ClawbackExecuted;
//# sourceMappingURL=ClawbackExecuted.js.map