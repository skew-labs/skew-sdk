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
exports.OptionBought = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OptionBought {
    constructor(fields) {
        this.option = fields.option;
        this.holder = fields.holder;
        this.premium = fields.premium;
        this.option_token_mint = fields.option_token_mint;
        this.metadata = fields.metadata;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("holder"),
            borsh.u64("premium"),
            borsh.publicKey("option_token_mint"),
            borsh.publicKey("metadata"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OptionBought({
            option: obj.option,
            holder: obj.holder,
            premium: obj.premium,
            option_token_mint: obj.option_token_mint,
            metadata: obj.metadata,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            holder: fields.holder,
            premium: fields.premium,
            option_token_mint: fields.option_token_mint,
            metadata: fields.metadata,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            holder: this.holder.toString(),
            premium: this.premium.toString(),
            option_token_mint: this.option_token_mint.toString(),
            metadata: this.metadata.toString(),
        };
    }
    static fromJSON(obj) {
        return new OptionBought({
            option: new web3_js_1.PublicKey(obj.option),
            holder: new web3_js_1.PublicKey(obj.holder),
            premium: new bn_js_1.default(obj.premium),
            option_token_mint: new web3_js_1.PublicKey(obj.option_token_mint),
            metadata: new web3_js_1.PublicKey(obj.metadata),
        });
    }
    toEncodable() {
        return OptionBought.toEncodable(this);
    }
}
exports.OptionBought = OptionBought;
//# sourceMappingURL=OptionBought.js.map