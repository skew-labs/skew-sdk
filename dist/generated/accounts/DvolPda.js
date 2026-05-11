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
exports.DvolPda = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class DvolPda {
    constructor(fields) {
        this.asset = fields.asset;
        this.bump = fields.bump;
        this._padding_0 = fields._padding_0;
        this.last_update_slot = fields.last_update_slot;
        this.dvol_28d_micro = fields.dvol_28d_micro;
        this.dvol_90d_micro = fields.dvol_90d_micro;
        this.realized_var_28d_micro = fields.realized_var_28d_micro;
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
        if (!data.slice(0, 8).equals(DvolPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = DvolPda.layout.decode(data.slice(8));
        return new DvolPda({
            asset: dec.asset,
            bump: dec.bump,
            _padding_0: dec._padding_0,
            last_update_slot: dec.last_update_slot,
            dvol_28d_micro: dec.dvol_28d_micro,
            dvol_90d_micro: dec.dvol_90d_micro,
            realized_var_28d_micro: dec.realized_var_28d_micro,
        });
    }
    toJSON() {
        return {
            asset: this.asset,
            bump: this.bump,
            _padding_0: this._padding_0,
            last_update_slot: this.last_update_slot.toString(),
            dvol_28d_micro: this.dvol_28d_micro.toString(),
            dvol_90d_micro: this.dvol_90d_micro.toString(),
            realized_var_28d_micro: this.realized_var_28d_micro.toString(),
        };
    }
    static fromJSON(obj) {
        return new DvolPda({
            asset: obj.asset,
            bump: obj.bump,
            _padding_0: obj._padding_0,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            dvol_28d_micro: new bn_js_1.default(obj.dvol_28d_micro),
            dvol_90d_micro: new bn_js_1.default(obj.dvol_90d_micro),
            realized_var_28d_micro: new bn_js_1.default(obj.realized_var_28d_micro),
        });
    }
}
exports.DvolPda = DvolPda;
DvolPda.discriminator = Buffer.from([
    232, 75, 152, 143, 101, 75, 38, 142,
]);
DvolPda.layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("dvol_28d_micro"),
    borsh.u64("dvol_90d_micro"),
    borsh.u64("realized_var_28d_micro"),
]);
//# sourceMappingURL=DvolPda.js.map