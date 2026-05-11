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
exports.LstVault = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class LstVault {
    constructor(fields) {
        this.user = fields.user;
        this.lst_mint = fields.lst_mint;
        this.lst_qty = fields.lst_qty;
        this.locked_qty = fields.locked_qty;
        this.last_er_update_slot = fields.last_er_update_slot;
        this.bump = fields.bump;
        this.tier_locked_qty = fields.tier_locked_qty;
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
        if (!data.slice(0, 8).equals(LstVault.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = LstVault.layout.decode(data.slice(8));
        return new LstVault({
            user: dec.user,
            lst_mint: dec.lst_mint,
            lst_qty: dec.lst_qty,
            locked_qty: dec.locked_qty,
            last_er_update_slot: dec.last_er_update_slot,
            bump: dec.bump,
            tier_locked_qty: dec.tier_locked_qty,
        });
    }
    toJSON() {
        return {
            user: this.user.toString(),
            lst_mint: this.lst_mint.toString(),
            lst_qty: this.lst_qty.toString(),
            locked_qty: this.locked_qty.toString(),
            last_er_update_slot: this.last_er_update_slot.toString(),
            bump: this.bump,
            tier_locked_qty: this.tier_locked_qty.toString(),
        };
    }
    static fromJSON(obj) {
        return new LstVault({
            user: new web3_js_1.PublicKey(obj.user),
            lst_mint: new web3_js_1.PublicKey(obj.lst_mint),
            lst_qty: new bn_js_1.default(obj.lst_qty),
            locked_qty: new bn_js_1.default(obj.locked_qty),
            last_er_update_slot: new bn_js_1.default(obj.last_er_update_slot),
            bump: obj.bump,
            tier_locked_qty: new bn_js_1.default(obj.tier_locked_qty),
        });
    }
}
exports.LstVault = LstVault;
LstVault.discriminator = Buffer.from([
    182, 228, 179, 101, 201, 139, 29, 84,
]);
LstVault.layout = borsh.struct([
    borsh.publicKey("user"),
    borsh.publicKey("lst_mint"),
    borsh.u64("lst_qty"),
    borsh.u64("locked_qty"),
    borsh.u64("last_er_update_slot"),
    borsh.u8("bump"),
    borsh.u64("tier_locked_qty"),
]);
//# sourceMappingURL=LstVault.js.map