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
exports.FeeWithdrawn = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class FeeWithdrawn {
    constructor(fields) {
        this.recipient = fields.recipient;
        this.settlement_mint = fields.settlement_mint;
        this.amount = fields.amount;
        this.withdrawn_at = fields.withdrawn_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("recipient"),
            borsh.publicKey("settlement_mint"),
            borsh.u64("amount"),
            borsh.i64("withdrawn_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new FeeWithdrawn({
            recipient: obj.recipient,
            settlement_mint: obj.settlement_mint,
            amount: obj.amount,
            withdrawn_at: obj.withdrawn_at,
        });
    }
    static toEncodable(fields) {
        return {
            recipient: fields.recipient,
            settlement_mint: fields.settlement_mint,
            amount: fields.amount,
            withdrawn_at: fields.withdrawn_at,
        };
    }
    toJSON() {
        return {
            recipient: this.recipient.toString(),
            settlement_mint: this.settlement_mint.toString(),
            amount: this.amount.toString(),
            withdrawn_at: this.withdrawn_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new FeeWithdrawn({
            recipient: new web3_js_1.PublicKey(obj.recipient),
            settlement_mint: new web3_js_1.PublicKey(obj.settlement_mint),
            amount: new bn_js_1.default(obj.amount),
            withdrawn_at: new bn_js_1.default(obj.withdrawn_at),
        });
    }
    toEncodable() {
        return FeeWithdrawn.toEncodable(this);
    }
}
exports.FeeWithdrawn = FeeWithdrawn;
//# sourceMappingURL=FeeWithdrawn.js.map