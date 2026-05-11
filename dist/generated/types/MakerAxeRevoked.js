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
exports.MakerAxeRevoked = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MakerAxeRevoked {
    constructor(fields) {
        this.axe = fields.axe;
        this.mm = fields.mm;
        this.axe_id = fields.axe_id;
        this.slot = fields.slot;
        this.revoked_at = fields.revoked_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("axe"),
            borsh.publicKey("mm"),
            borsh.u64("axe_id"),
            borsh.u64("slot"),
            borsh.i64("revoked_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MakerAxeRevoked({
            axe: obj.axe,
            mm: obj.mm,
            axe_id: obj.axe_id,
            slot: obj.slot,
            revoked_at: obj.revoked_at,
        });
    }
    static toEncodable(fields) {
        return {
            axe: fields.axe,
            mm: fields.mm,
            axe_id: fields.axe_id,
            slot: fields.slot,
            revoked_at: fields.revoked_at,
        };
    }
    toJSON() {
        return {
            axe: this.axe.toString(),
            mm: this.mm.toString(),
            axe_id: this.axe_id.toString(),
            slot: this.slot.toString(),
            revoked_at: this.revoked_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new MakerAxeRevoked({
            axe: new web3_js_1.PublicKey(obj.axe),
            mm: new web3_js_1.PublicKey(obj.mm),
            axe_id: new bn_js_1.default(obj.axe_id),
            slot: new bn_js_1.default(obj.slot),
            revoked_at: new bn_js_1.default(obj.revoked_at),
        });
    }
    toEncodable() {
        return MakerAxeRevoked.toEncodable(this);
    }
}
exports.MakerAxeRevoked = MakerAxeRevoked;
//# sourceMappingURL=MakerAxeRevoked.js.map