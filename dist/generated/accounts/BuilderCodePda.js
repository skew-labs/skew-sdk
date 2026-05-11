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
exports.BuilderCodePda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class BuilderCodePda {
    constructor(fields) {
        this.builder = fields.builder;
        this.bump = fields.bump;
        this.registered_at = fields.registered_at;
        this.deposit_locked = fields.deposit_locked;
        this.volume_30d_routed_micro = fields.volume_30d_routed_micro;
        this.last_volume_update_ts = fields.last_volume_update_ts;
        this.fees_accrued_micro = fields.fees_accrued_micro;
        this.label = fields.label;
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
        if (!data.slice(0, 8).equals(BuilderCodePda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = BuilderCodePda.layout.decode(data.slice(8));
        return new BuilderCodePda({
            builder: dec.builder,
            bump: dec.bump,
            registered_at: dec.registered_at,
            deposit_locked: dec.deposit_locked,
            volume_30d_routed_micro: dec.volume_30d_routed_micro,
            last_volume_update_ts: dec.last_volume_update_ts,
            fees_accrued_micro: dec.fees_accrued_micro,
            label: dec.label,
        });
    }
    toJSON() {
        return {
            builder: this.builder.toString(),
            bump: this.bump,
            registered_at: this.registered_at.toString(),
            deposit_locked: this.deposit_locked.toString(),
            volume_30d_routed_micro: this.volume_30d_routed_micro.toString(),
            last_volume_update_ts: this.last_volume_update_ts.toString(),
            fees_accrued_micro: this.fees_accrued_micro.toString(),
            label: this.label,
        };
    }
    static fromJSON(obj) {
        return new BuilderCodePda({
            builder: new web3_js_1.PublicKey(obj.builder),
            bump: obj.bump,
            registered_at: new bn_js_1.default(obj.registered_at),
            deposit_locked: new bn_js_1.default(obj.deposit_locked),
            volume_30d_routed_micro: new bn_js_1.default(obj.volume_30d_routed_micro),
            last_volume_update_ts: new bn_js_1.default(obj.last_volume_update_ts),
            fees_accrued_micro: new bn_js_1.default(obj.fees_accrued_micro),
            label: obj.label,
        });
    }
}
exports.BuilderCodePda = BuilderCodePda;
BuilderCodePda.discriminator = Buffer.from([
    29, 146, 194, 24, 63, 34, 34, 195,
]);
BuilderCodePda.layout = borsh.struct([
    borsh.publicKey("builder"),
    borsh.u8("bump"),
    borsh.i64("registered_at"),
    borsh.u64("deposit_locked"),
    borsh.u64("volume_30d_routed_micro"),
    borsh.i64("last_volume_update_ts"),
    borsh.u64("fees_accrued_micro"),
    borsh.array(borsh.u8(), 32, "label"),
]);
//# sourceMappingURL=BuilderCodePda.js.map