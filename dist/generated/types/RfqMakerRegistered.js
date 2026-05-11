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
exports.RfqMakerRegistered = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RfqMakerRegistered {
    constructor(fields) {
        this.mm = fields.mm;
        this.deposit_lamports = fields.deposit_lamports;
        this.registered_at = fields.registered_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("mm"),
            borsh.u64("deposit_lamports"),
            borsh.i64("registered_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RfqMakerRegistered({
            mm: obj.mm,
            deposit_lamports: obj.deposit_lamports,
            registered_at: obj.registered_at,
        });
    }
    static toEncodable(fields) {
        return {
            mm: fields.mm,
            deposit_lamports: fields.deposit_lamports,
            registered_at: fields.registered_at,
        };
    }
    toJSON() {
        return {
            mm: this.mm.toString(),
            deposit_lamports: this.deposit_lamports.toString(),
            registered_at: this.registered_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new RfqMakerRegistered({
            mm: new web3_js_1.PublicKey(obj.mm),
            deposit_lamports: new bn_js_1.default(obj.deposit_lamports),
            registered_at: new bn_js_1.default(obj.registered_at),
        });
    }
    toEncodable() {
        return RfqMakerRegistered.toEncodable(this);
    }
}
exports.RfqMakerRegistered = RfqMakerRegistered;
//# sourceMappingURL=RfqMakerRegistered.js.map