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
exports.FeeAccumulatorInitialized = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class FeeAccumulatorInitialized {
    constructor(fields) {
        this.fee_accumulator = fields.fee_accumulator;
        this.settlement_mint = fields.settlement_mint;
        this.payer = fields.payer;
        this.initialized_at = fields.initialized_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("fee_accumulator"),
            borsh.publicKey("settlement_mint"),
            borsh.publicKey("payer"),
            borsh.i64("initialized_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FeeAccumulatorInitialized({
            fee_accumulator: obj.fee_accumulator,
            settlement_mint: obj.settlement_mint,
            payer: obj.payer,
            initialized_at: obj.initialized_at,
        });
    }
    static toEncodable(fields) {
        return {
            fee_accumulator: fields.fee_accumulator,
            settlement_mint: fields.settlement_mint,
            payer: fields.payer,
            initialized_at: fields.initialized_at,
        };
    }
    toJSON() {
        return {
            fee_accumulator: this.fee_accumulator.toString(),
            settlement_mint: this.settlement_mint.toString(),
            payer: this.payer.toString(),
            initialized_at: this.initialized_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new FeeAccumulatorInitialized({
            fee_accumulator: new web3_js_1.PublicKey(obj.fee_accumulator),
            settlement_mint: new web3_js_1.PublicKey(obj.settlement_mint),
            payer: new web3_js_1.PublicKey(obj.payer),
            initialized_at: new bn_js_1.default(obj.initialized_at),
        });
    }
    toEncodable() {
        return FeeAccumulatorInitialized.toEncodable(this);
    }
}
exports.FeeAccumulatorInitialized = FeeAccumulatorInitialized;
//# sourceMappingURL=FeeAccumulatorInitialized.js.map