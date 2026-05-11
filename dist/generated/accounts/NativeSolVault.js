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
exports.NativeSolVault = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class NativeSolVault {
    constructor(fields) {
        this.user = fields.user;
        this.sol_qty = fields.sol_qty;
        this.locked_qty = fields.locked_qty;
        this.last_update_slot = fields.last_update_slot;
        this.bump = fields.bump;
    }
    static async fetch(c, address, programId = programId_1.PROGRAM_ID) {
        const info = await c.getAccountInfo(address);
        if (info === null) {
            return null;
        }
        if (!info.owner.equals(programId)) {
            throw new Error("account doesn't belong to this program");
        }
        return this.decode(info.data);
    }
    static async fetchMultiple(c, addresses, programId = programId_1.PROGRAM_ID) {
        const infos = await c.getMultipleAccountsInfo(addresses);
        return infos.map((info) => {
            if (info === null) {
                return null;
            }
            if (!info.owner.equals(programId)) {
                throw new Error("account doesn't belong to this program");
            }
            return this.decode(info.data);
        });
    }
    static decode(data) {
        if (!data.slice(0, 8).equals(NativeSolVault.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = NativeSolVault.layout.decode(data.slice(8));
        return new NativeSolVault({
            user: dec.user,
            sol_qty: dec.sol_qty,
            locked_qty: dec.locked_qty,
            last_update_slot: dec.last_update_slot,
            bump: dec.bump,
        });
    }
    toJSON() {
        return {
            user: this.user.toString(),
            sol_qty: this.sol_qty.toString(),
            locked_qty: this.locked_qty.toString(),
            last_update_slot: this.last_update_slot.toString(),
            bump: this.bump,
        };
    }
    static fromJSON(obj) {
        return new NativeSolVault({
            user: new web3_js_1.PublicKey(obj.user),
            sol_qty: new bn_js_1.default(obj.sol_qty),
            locked_qty: new bn_js_1.default(obj.locked_qty),
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            bump: obj.bump,
        });
    }
}
exports.NativeSolVault = NativeSolVault;
NativeSolVault.discriminator = Buffer.from([
    117, 146, 121, 164, 23, 219, 228, 240,
]);
NativeSolVault.layout = borsh.struct([
    borsh.publicKey("user"),
    borsh.u64("sol_qty"),
    borsh.u64("locked_qty"),
    borsh.u64("last_update_slot"),
    borsh.u8("bump"),
]);
//# sourceMappingURL=NativeSolVault.js.map