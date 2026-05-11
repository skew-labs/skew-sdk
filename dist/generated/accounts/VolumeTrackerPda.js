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
exports.VolumeTrackerPda = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class VolumeTrackerPda {
    constructor(fields) {
        this.authority = fields.authority;
        this.bump = fields.bump;
        this.volume_30d_micro = fields.volume_30d_micro;
        this.equity_micro = fields.equity_micro;
        this.last_update_ts = fields.last_update_ts;
        this.current_vip_tier = fields.current_vip_tier;
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
        if (!data.slice(0, 8).equals(VolumeTrackerPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = VolumeTrackerPda.layout.decode(data.slice(8));
        return new VolumeTrackerPda({
            authority: dec.authority,
            bump: dec.bump,
            volume_30d_micro: dec.volume_30d_micro,
            equity_micro: dec.equity_micro,
            last_update_ts: dec.last_update_ts,
            current_vip_tier: dec.current_vip_tier,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            bump: this.bump,
            volume_30d_micro: this.volume_30d_micro.toString(),
            equity_micro: this.equity_micro.toString(),
            last_update_ts: this.last_update_ts.toString(),
            current_vip_tier: this.current_vip_tier,
        };
    }
    static fromJSON(obj) {
        return new VolumeTrackerPda({
            authority: new web3_js_1.PublicKey(obj.authority),
            bump: obj.bump,
            volume_30d_micro: new bn_js_1.default(obj.volume_30d_micro),
            equity_micro: new bn_js_1.default(obj.equity_micro),
            last_update_ts: new bn_js_1.default(obj.last_update_ts),
            current_vip_tier: obj.current_vip_tier,
        });
    }
}
exports.VolumeTrackerPda = VolumeTrackerPda;
VolumeTrackerPda.discriminator = Buffer.from([
    230, 232, 138, 113, 40, 219, 168, 85,
]);
VolumeTrackerPda.layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.u64("volume_30d_micro"),
    borsh.u64("equity_micro"),
    borsh.i64("last_update_ts"),
    borsh.u8("current_vip_tier"),
]);
//# sourceMappingURL=VolumeTrackerPda.js.map