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
exports.BuilderFeesWithdrawn = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class BuilderFeesWithdrawn {
    constructor(fields) {
        this.builder_code_pda = fields.builder_code_pda;
        this.builder = fields.builder;
        this.amount = fields.amount;
        this.remaining_accrued_micro = fields.remaining_accrued_micro;
        this.withdrawn_at = fields.withdrawn_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("builder_code_pda"),
            borsh.publicKey("builder"),
            borsh.u64("amount"),
            borsh.u64("remaining_accrued_micro"),
            borsh.i64("withdrawn_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BuilderFeesWithdrawn({
            builder_code_pda: obj.builder_code_pda,
            builder: obj.builder,
            amount: obj.amount,
            remaining_accrued_micro: obj.remaining_accrued_micro,
            withdrawn_at: obj.withdrawn_at,
        });
    }
    static toEncodable(fields) {
        return {
            builder_code_pda: fields.builder_code_pda,
            builder: fields.builder,
            amount: fields.amount,
            remaining_accrued_micro: fields.remaining_accrued_micro,
            withdrawn_at: fields.withdrawn_at,
        };
    }
    toJSON() {
        return {
            builder_code_pda: this.builder_code_pda.toString(),
            builder: this.builder.toString(),
            amount: this.amount.toString(),
            remaining_accrued_micro: this.remaining_accrued_micro.toString(),
            withdrawn_at: this.withdrawn_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new BuilderFeesWithdrawn({
            builder_code_pda: new web3_js_1.PublicKey(obj.builder_code_pda),
            builder: new web3_js_1.PublicKey(obj.builder),
            amount: new bn_js_1.default(obj.amount),
            remaining_accrued_micro: new bn_js_1.default(obj.remaining_accrued_micro),
            withdrawn_at: new bn_js_1.default(obj.withdrawn_at),
        });
    }
    toEncodable() {
        return BuilderFeesWithdrawn.toEncodable(this);
    }
}
exports.BuilderFeesWithdrawn = BuilderFeesWithdrawn;
//# sourceMappingURL=BuilderFeesWithdrawn.js.map