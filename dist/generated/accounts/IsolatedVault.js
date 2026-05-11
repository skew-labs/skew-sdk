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
exports.IsolatedVault = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class IsolatedVault {
    constructor(fields) {
        this.user = fields.user;
        this.option = fields.option;
        this.usdc_micro = fields.usdc_micro;
        this.locked_micro = fields.locked_micro;
        this.realized_pnl_micro = fields.realized_pnl_micro;
        this.bump = fields.bump;
        this._padding = fields._padding;
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
        if (!data.slice(0, 8).equals(IsolatedVault.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = IsolatedVault.layout.decode(data.slice(8));
        return new IsolatedVault({
            user: dec.user,
            option: dec.option,
            usdc_micro: dec.usdc_micro,
            locked_micro: dec.locked_micro,
            realized_pnl_micro: dec.realized_pnl_micro,
            bump: dec.bump,
            _padding: dec._padding,
        });
    }
    toJSON() {
        return {
            user: this.user.toString(),
            option: this.option.toString(),
            usdc_micro: this.usdc_micro.toString(),
            locked_micro: this.locked_micro.toString(),
            realized_pnl_micro: this.realized_pnl_micro.toString(),
            bump: this.bump,
            _padding: this._padding,
        };
    }
    static fromJSON(obj) {
        return new IsolatedVault({
            user: new web3_js_1.PublicKey(obj.user),
            option: new web3_js_1.PublicKey(obj.option),
            usdc_micro: new bn_js_1.default(obj.usdc_micro),
            locked_micro: new bn_js_1.default(obj.locked_micro),
            realized_pnl_micro: new bn_js_1.default(obj.realized_pnl_micro),
            bump: obj.bump,
            _padding: obj._padding,
        });
    }
}
exports.IsolatedVault = IsolatedVault;
IsolatedVault.discriminator = Buffer.from([
    151, 84, 249, 205, 196, 167, 216, 176,
]);
IsolatedVault.layout = borsh.struct([
    borsh.publicKey("user"),
    borsh.publicKey("option"),
    borsh.u64("usdc_micro"),
    borsh.u64("locked_micro"),
    borsh.i64("realized_pnl_micro"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "_padding"),
]);
//# sourceMappingURL=IsolatedVault.js.map