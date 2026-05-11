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
exports.RfqMakerSlashed = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RfqMakerSlashed {
    constructor(fields) {
        this.registry = fields.registry;
        this.mm = fields.mm;
        this.slasher = fields.slasher;
        this.forfeit_lamports = fields.forfeit_lamports;
        this.slashed_at = fields.slashed_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("registry"),
            borsh.publicKey("mm"),
            borsh.publicKey("slasher"),
            borsh.u64("forfeit_lamports"),
            borsh.i64("slashed_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RfqMakerSlashed({
            registry: obj.registry,
            mm: obj.mm,
            slasher: obj.slasher,
            forfeit_lamports: obj.forfeit_lamports,
            slashed_at: obj.slashed_at,
        });
    }
    static toEncodable(fields) {
        return {
            registry: fields.registry,
            mm: fields.mm,
            slasher: fields.slasher,
            forfeit_lamports: fields.forfeit_lamports,
            slashed_at: fields.slashed_at,
        };
    }
    toJSON() {
        return {
            registry: this.registry.toString(),
            mm: this.mm.toString(),
            slasher: this.slasher.toString(),
            forfeit_lamports: this.forfeit_lamports.toString(),
            slashed_at: this.slashed_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new RfqMakerSlashed({
            registry: new web3_js_1.PublicKey(obj.registry),
            mm: new web3_js_1.PublicKey(obj.mm),
            slasher: new web3_js_1.PublicKey(obj.slasher),
            forfeit_lamports: new bn_js_1.default(obj.forfeit_lamports),
            slashed_at: new bn_js_1.default(obj.slashed_at),
        });
    }
    toEncodable() {
        return RfqMakerSlashed.toEncodable(this);
    }
}
exports.RfqMakerSlashed = RfqMakerSlashed;
//# sourceMappingURL=RfqMakerSlashed.js.map