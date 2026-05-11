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
exports.SkewMetricsPda = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class SkewMetricsPda {
    constructor(fields) {
        this.asset = fields.asset;
        this.bump = fields.bump;
        this.padding_0 = fields.padding_0;
        this.last_update_slot = fields.last_update_slot;
        this.atm_iv_28d_micro = fields.atm_iv_28d_micro;
        this.rr25_micro = fields.rr25_micro;
        this.bf25_micro = fields.bf25_micro;
        this.rr10_micro = fields.rr10_micro;
        this.atm_slope_micro = fields.atm_slope_micro;
        this.iv_per_tenor_micro = fields.iv_per_tenor_micro;
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
        if (!data.slice(0, 8).equals(SkewMetricsPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = SkewMetricsPda.layout.decode(data.slice(8));
        return new SkewMetricsPda({
            asset: dec.asset,
            bump: dec.bump,
            padding_0: dec.padding_0,
            last_update_slot: dec.last_update_slot,
            atm_iv_28d_micro: dec.atm_iv_28d_micro,
            rr25_micro: dec.rr25_micro,
            bf25_micro: dec.bf25_micro,
            rr10_micro: dec.rr10_micro,
            atm_slope_micro: dec.atm_slope_micro,
            iv_per_tenor_micro: dec.iv_per_tenor_micro,
        });
    }
    toJSON() {
        return {
            asset: this.asset,
            bump: this.bump,
            padding_0: this.padding_0,
            last_update_slot: this.last_update_slot.toString(),
            atm_iv_28d_micro: this.atm_iv_28d_micro.toString(),
            rr25_micro: this.rr25_micro.toString(),
            bf25_micro: this.bf25_micro.toString(),
            rr10_micro: this.rr10_micro.toString(),
            atm_slope_micro: this.atm_slope_micro.toString(),
            iv_per_tenor_micro: this.iv_per_tenor_micro.map((item) => item.toString()),
        };
    }
    static fromJSON(obj) {
        return new SkewMetricsPda({
            asset: obj.asset,
            bump: obj.bump,
            padding_0: obj.padding_0,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            atm_iv_28d_micro: new bn_js_1.default(obj.atm_iv_28d_micro),
            rr25_micro: new bn_js_1.default(obj.rr25_micro),
            bf25_micro: new bn_js_1.default(obj.bf25_micro),
            rr10_micro: new bn_js_1.default(obj.rr10_micro),
            atm_slope_micro: new bn_js_1.default(obj.atm_slope_micro),
            iv_per_tenor_micro: obj.iv_per_tenor_micro.map((item) => new bn_js_1.default(item)),
        });
    }
}
exports.SkewMetricsPda = SkewMetricsPda;
SkewMetricsPda.discriminator = Buffer.from([
    37, 127, 134, 33, 42, 193, 50, 109,
]);
SkewMetricsPda.layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("atm_iv_28d_micro"),
    borsh.i64("rr25_micro"),
    borsh.i64("bf25_micro"),
    borsh.i64("rr10_micro"),
    borsh.i64("atm_slope_micro"),
    borsh.array(borsh.u64(), 8, "iv_per_tenor_micro"),
]);
//# sourceMappingURL=SkewMetricsPda.js.map