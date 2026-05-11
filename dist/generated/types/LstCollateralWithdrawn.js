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
exports.LstCollateralWithdrawn = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class LstCollateralWithdrawn {
    constructor(fields) {
        this.vault = fields.vault;
        this.user = fields.user;
        this.lst_mint = fields.lst_mint;
        this.amount = fields.amount;
        this.new_lst_qty = fields.new_lst_qty;
        this.withdrawn_at = fields.withdrawn_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("vault"),
            borsh.publicKey("user"),
            borsh.publicKey("lst_mint"),
            borsh.u64("amount"),
            borsh.u64("new_lst_qty"),
            borsh.i64("withdrawn_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new LstCollateralWithdrawn({
            vault: obj.vault,
            user: obj.user,
            lst_mint: obj.lst_mint,
            amount: obj.amount,
            new_lst_qty: obj.new_lst_qty,
            withdrawn_at: obj.withdrawn_at,
        });
    }
    static toEncodable(fields) {
        return {
            vault: fields.vault,
            user: fields.user,
            lst_mint: fields.lst_mint,
            amount: fields.amount,
            new_lst_qty: fields.new_lst_qty,
            withdrawn_at: fields.withdrawn_at,
        };
    }
    toJSON() {
        return {
            vault: this.vault.toString(),
            user: this.user.toString(),
            lst_mint: this.lst_mint.toString(),
            amount: this.amount.toString(),
            new_lst_qty: this.new_lst_qty.toString(),
            withdrawn_at: this.withdrawn_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new LstCollateralWithdrawn({
            vault: new web3_js_1.PublicKey(obj.vault),
            user: new web3_js_1.PublicKey(obj.user),
            lst_mint: new web3_js_1.PublicKey(obj.lst_mint),
            amount: new bn_js_1.default(obj.amount),
            new_lst_qty: new bn_js_1.default(obj.new_lst_qty),
            withdrawn_at: new bn_js_1.default(obj.withdrawn_at),
        });
    }
    toEncodable() {
        return LstCollateralWithdrawn.toEncodable(this);
    }
}
exports.LstCollateralWithdrawn = LstCollateralWithdrawn;
//# sourceMappingURL=LstCollateralWithdrawn.js.map