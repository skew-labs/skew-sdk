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
exports.OptionMetadataRegistered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OptionMetadataRegistered {
    constructor(fields) {
        this.option = fields.option;
        this.metadata_pda = fields.metadata_pda;
        this.registered_at = fields.registered_at;
        this.registered_by = fields.registered_by;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("metadata_pda"),
            borsh.i64("registered_at"),
            borsh.publicKey("registered_by"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OptionMetadataRegistered({
            option: obj.option,
            metadata_pda: obj.metadata_pda,
            registered_at: obj.registered_at,
            registered_by: obj.registered_by,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            metadata_pda: fields.metadata_pda,
            registered_at: fields.registered_at,
            registered_by: fields.registered_by,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            metadata_pda: this.metadata_pda.toString(),
            registered_at: this.registered_at.toString(),
            registered_by: this.registered_by.toString(),
        };
    }
    static fromJSON(obj) {
        return new OptionMetadataRegistered({
            option: new web3_js_1.PublicKey(obj.option),
            metadata_pda: new web3_js_1.PublicKey(obj.metadata_pda),
            registered_at: new bn_js_1.default(obj.registered_at),
            registered_by: new web3_js_1.PublicKey(obj.registered_by),
        });
    }
    toEncodable() {
        return OptionMetadataRegistered.toEncodable(this);
    }
}
exports.OptionMetadataRegistered = OptionMetadataRegistered;
//# sourceMappingURL=OptionMetadataRegistered.js.map