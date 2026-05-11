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
exports.BuilderCodeClosed = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class BuilderCodeClosed {
    constructor(fields) {
        this.builder_code_pda = fields.builder_code_pda;
        this.builder = fields.builder;
        this.deposit_refunded = fields.deposit_refunded;
        this.final_volume_30d_routed_micro = fields.final_volume_30d_routed_micro;
        this.closed_at = fields.closed_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("builder_code_pda"),
            borsh.publicKey("builder"),
            borsh.u64("deposit_refunded"),
            borsh.u64("final_volume_30d_routed_micro"),
            borsh.i64("closed_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BuilderCodeClosed({
            builder_code_pda: obj.builder_code_pda,
            builder: obj.builder,
            deposit_refunded: obj.deposit_refunded,
            final_volume_30d_routed_micro: obj.final_volume_30d_routed_micro,
            closed_at: obj.closed_at,
        });
    }
    static toEncodable(fields) {
        return {
            builder_code_pda: fields.builder_code_pda,
            builder: fields.builder,
            deposit_refunded: fields.deposit_refunded,
            final_volume_30d_routed_micro: fields.final_volume_30d_routed_micro,
            closed_at: fields.closed_at,
        };
    }
    toJSON() {
        return {
            builder_code_pda: this.builder_code_pda.toString(),
            builder: this.builder.toString(),
            deposit_refunded: this.deposit_refunded.toString(),
            final_volume_30d_routed_micro: this.final_volume_30d_routed_micro.toString(),
            closed_at: this.closed_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new BuilderCodeClosed({
            builder_code_pda: new web3_js_1.PublicKey(obj.builder_code_pda),
            builder: new web3_js_1.PublicKey(obj.builder),
            deposit_refunded: new bn_js_1.default(obj.deposit_refunded),
            final_volume_30d_routed_micro: new bn_js_1.default(obj.final_volume_30d_routed_micro),
            closed_at: new bn_js_1.default(obj.closed_at),
        });
    }
    toEncodable() {
        return BuilderCodeClosed.toEncodable(this);
    }
}
exports.BuilderCodeClosed = BuilderCodeClosed;
//# sourceMappingURL=BuilderCodeClosed.js.map