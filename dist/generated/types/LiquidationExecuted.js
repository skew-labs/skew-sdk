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
exports.LiquidationExecuted = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class LiquidationExecuted {
    constructor(fields) {
        this.option = fields.option;
        this.defaulting_cm = fields.defaulting_cm;
        this.liquidator = fields.liquidator;
        this.close_factor_bps = fields.close_factor_bps;
        this.bonus_bps = fields.bonus_bps;
        this.payout = fields.payout;
        this.remaining_equity = fields.remaining_equity;
        this.executed_at = fields.executed_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("defaulting_cm"),
            borsh.publicKey("liquidator"),
            borsh.u16("close_factor_bps"),
            borsh.u16("bonus_bps"),
            borsh.u64("payout"),
            borsh.u64("remaining_equity"),
            borsh.i64("executed_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LiquidationExecuted({
            option: obj.option,
            defaulting_cm: obj.defaulting_cm,
            liquidator: obj.liquidator,
            close_factor_bps: obj.close_factor_bps,
            bonus_bps: obj.bonus_bps,
            payout: obj.payout,
            remaining_equity: obj.remaining_equity,
            executed_at: obj.executed_at,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            defaulting_cm: fields.defaulting_cm,
            liquidator: fields.liquidator,
            close_factor_bps: fields.close_factor_bps,
            bonus_bps: fields.bonus_bps,
            payout: fields.payout,
            remaining_equity: fields.remaining_equity,
            executed_at: fields.executed_at,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            defaulting_cm: this.defaulting_cm.toString(),
            liquidator: this.liquidator.toString(),
            close_factor_bps: this.close_factor_bps,
            bonus_bps: this.bonus_bps,
            payout: this.payout.toString(),
            remaining_equity: this.remaining_equity.toString(),
            executed_at: this.executed_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new LiquidationExecuted({
            option: new web3_js_1.PublicKey(obj.option),
            defaulting_cm: new web3_js_1.PublicKey(obj.defaulting_cm),
            liquidator: new web3_js_1.PublicKey(obj.liquidator),
            close_factor_bps: obj.close_factor_bps,
            bonus_bps: obj.bonus_bps,
            payout: new bn_js_1.default(obj.payout),
            remaining_equity: new bn_js_1.default(obj.remaining_equity),
            executed_at: new bn_js_1.default(obj.executed_at),
        });
    }
    toEncodable() {
        return LiquidationExecuted.toEncodable(this);
    }
}
exports.LiquidationExecuted = LiquidationExecuted;
//# sourceMappingURL=LiquidationExecuted.js.map