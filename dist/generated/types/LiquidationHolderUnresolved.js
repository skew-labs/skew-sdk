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
exports.LiquidationHolderUnresolved = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class LiquidationHolderUnresolved {
    constructor(fields) {
        this.option = fields.option;
        this.holder = fields.holder;
        this.liquidator = fields.liquidator;
        this.residual_collateral_micro = fields.residual_collateral_micro;
        this.liquidated_at = fields.liquidated_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("holder"),
            borsh.publicKey("liquidator"),
            borsh.u64("residual_collateral_micro"),
            borsh.i64("liquidated_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LiquidationHolderUnresolved({
            option: obj.option,
            holder: obj.holder,
            liquidator: obj.liquidator,
            residual_collateral_micro: obj.residual_collateral_micro,
            liquidated_at: obj.liquidated_at,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            holder: fields.holder,
            liquidator: fields.liquidator,
            residual_collateral_micro: fields.residual_collateral_micro,
            liquidated_at: fields.liquidated_at,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            holder: this.holder.toString(),
            liquidator: this.liquidator.toString(),
            residual_collateral_micro: this.residual_collateral_micro.toString(),
            liquidated_at: this.liquidated_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new LiquidationHolderUnresolved({
            option: new web3_js_1.PublicKey(obj.option),
            holder: new web3_js_1.PublicKey(obj.holder),
            liquidator: new web3_js_1.PublicKey(obj.liquidator),
            residual_collateral_micro: new bn_js_1.default(obj.residual_collateral_micro),
            liquidated_at: new bn_js_1.default(obj.liquidated_at),
        });
    }
    toEncodable() {
        return LiquidationHolderUnresolved.toEncodable(this);
    }
}
exports.LiquidationHolderUnresolved = LiquidationHolderUnresolved;
//# sourceMappingURL=LiquidationHolderUnresolved.js.map