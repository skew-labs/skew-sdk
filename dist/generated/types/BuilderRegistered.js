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
exports.BuilderRegistered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class BuilderRegistered {
    constructor(fields) {
        this.builder_code_pda = fields.builder_code_pda;
        this.builder = fields.builder;
        this.deposit_locked = fields.deposit_locked;
        this.label = fields.label;
        this.registered_at = fields.registered_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("builder_code_pda"),
            borsh.publicKey("builder"),
            borsh.u64("deposit_locked"),
            borsh.array(borsh.u8(), 32, "label"),
            borsh.i64("registered_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new BuilderRegistered({
            builder_code_pda: obj.builder_code_pda,
            builder: obj.builder,
            deposit_locked: obj.deposit_locked,
            label: obj.label,
            registered_at: obj.registered_at,
        });
    }
    static toEncodable(fields) {
        return {
            builder_code_pda: fields.builder_code_pda,
            builder: fields.builder,
            deposit_locked: fields.deposit_locked,
            label: fields.label,
            registered_at: fields.registered_at,
        };
    }
    toJSON() {
        return {
            builder_code_pda: this.builder_code_pda.toString(),
            builder: this.builder.toString(),
            deposit_locked: this.deposit_locked.toString(),
            label: this.label,
            registered_at: this.registered_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new BuilderRegistered({
            builder_code_pda: new web3_js_1.PublicKey(obj.builder_code_pda),
            builder: new web3_js_1.PublicKey(obj.builder),
            deposit_locked: new bn_js_1.default(obj.deposit_locked),
            label: obj.label,
            registered_at: new bn_js_1.default(obj.registered_at),
        });
    }
    toEncodable() {
        return BuilderRegistered.toEncodable(this);
    }
}
exports.BuilderRegistered = BuilderRegistered;
//# sourceMappingURL=BuilderRegistered.js.map