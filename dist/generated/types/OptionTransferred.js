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
exports.OptionTransferred = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class OptionTransferred {
    constructor(fields) {
        this.option = fields.option;
        this.from = fields.from;
        this.to = fields.to;
        this.transferred_at = fields.transferred_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("option"),
            borsh.publicKey("from"),
            borsh.publicKey("to"),
            borsh.i64("transferred_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new OptionTransferred({
            option: obj.option,
            from: obj.from,
            to: obj.to,
            transferred_at: obj.transferred_at,
        });
    }
    static toEncodable(fields) {
        return {
            option: fields.option,
            from: fields.from,
            to: fields.to,
            transferred_at: fields.transferred_at,
        };
    }
    toJSON() {
        return {
            option: this.option.toString(),
            from: this.from.toString(),
            to: this.to.toString(),
            transferred_at: this.transferred_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new OptionTransferred({
            option: new web3_js_1.PublicKey(obj.option),
            from: new web3_js_1.PublicKey(obj.from),
            to: new web3_js_1.PublicKey(obj.to),
            transferred_at: new bn_js_1.default(obj.transferred_at),
        });
    }
    toEncodable() {
        return OptionTransferred.toEncodable(this);
    }
}
exports.OptionTransferred = OptionTransferred;
//# sourceMappingURL=OptionTransferred.js.map