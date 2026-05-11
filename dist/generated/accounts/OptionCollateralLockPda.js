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
exports.OptionCollateralLockPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class OptionCollateralLockPda {
    constructor(fields) {
        this.option = fields.option;
        this.writer = fields.writer;
        this.collateral_kind = fields.collateral_kind;
        this.vault = fields.vault;
        this.mint = fields.mint;
        this.locked_qty = fields.locked_qty;
        this.released_qty = fields.released_qty;
        this.locked_value_usd_micro_at_fill = fields.locked_value_usd_micro_at_fill;
        this.er_at_fill = fields.er_at_fill;
        this.sol_usd_at_fill = fields.sol_usd_at_fill;
        this.haircut_bps = fields.haircut_bps;
        this.state = fields.state;
        this.bump = fields.bump;
        this.padding = fields.padding;
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
        if (!data.slice(0, 8).equals(OptionCollateralLockPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = OptionCollateralLockPda.layout.decode(data.slice(8));
        return new OptionCollateralLockPda({
            option: dec.option,
            writer: dec.writer,
            collateral_kind: dec.collateral_kind,
            vault: dec.vault,
            mint: dec.mint,
            locked_qty: dec.locked_qty,
            released_qty: dec.released_qty,
            locked_value_usd_micro_at_fill: dec.locked_value_usd_micro_at_fill,
            er_at_fill: dec.er_at_fill,
            sol_usd_at_fill: dec.sol_usd_at_fill,
            haircut_bps: dec.haircut_bps,
            state: dec.state,
            bump: dec.bump,
            padding: dec.padding,
        });
    }
    toJSON() {
        return {
            option: this.option.toString(),
            writer: this.writer.toString(),
            collateral_kind: this.collateral_kind,
            vault: this.vault.toString(),
            mint: this.mint.toString(),
            locked_qty: this.locked_qty.toString(),
            released_qty: this.released_qty.toString(),
            locked_value_usd_micro_at_fill: this.locked_value_usd_micro_at_fill.toString(),
            er_at_fill: this.er_at_fill.toString(),
            sol_usd_at_fill: this.sol_usd_at_fill.toString(),
            haircut_bps: this.haircut_bps,
            state: this.state,
            bump: this.bump,
            padding: this.padding,
        };
    }
    static fromJSON(obj) {
        return new OptionCollateralLockPda({
            option: new web3_js_1.PublicKey(obj.option),
            writer: new web3_js_1.PublicKey(obj.writer),
            collateral_kind: obj.collateral_kind,
            vault: new web3_js_1.PublicKey(obj.vault),
            mint: new web3_js_1.PublicKey(obj.mint),
            locked_qty: new bn_js_1.default(obj.locked_qty),
            released_qty: new bn_js_1.default(obj.released_qty),
            locked_value_usd_micro_at_fill: new bn_js_1.default(obj.locked_value_usd_micro_at_fill),
            er_at_fill: new bn_js_1.default(obj.er_at_fill),
            sol_usd_at_fill: new bn_js_1.default(obj.sol_usd_at_fill),
            haircut_bps: obj.haircut_bps,
            state: obj.state,
            bump: obj.bump,
            padding: obj.padding,
        });
    }
}
exports.OptionCollateralLockPda = OptionCollateralLockPda;
OptionCollateralLockPda.discriminator = Buffer.from([
    110, 149, 91, 6, 91, 91, 92, 141,
]);
OptionCollateralLockPda.layout = borsh.struct([
    borsh.publicKey("option"),
    borsh.publicKey("writer"),
    borsh.u8("collateral_kind"),
    borsh.publicKey("vault"),
    borsh.publicKey("mint"),
    borsh.u64("locked_qty"),
    borsh.u64("released_qty"),
    borsh.u64("locked_value_usd_micro_at_fill"),
    borsh.u64("er_at_fill"),
    borsh.u64("sol_usd_at_fill"),
    borsh.u16("haircut_bps"),
    borsh.u8("state"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding"),
]);
//# sourceMappingURL=OptionCollateralLockPda.js.map