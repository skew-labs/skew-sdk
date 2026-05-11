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
exports.MicrostructurePDA = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class MicrostructurePDA {
    constructor(fields) {
        this.asset = fields.asset;
        this.padding_0 = fields.padding_0;
        this.last_update_slot = fields.last_update_slot;
        this.spot_micro = fields.spot_micro;
        this.bid_ask_spread_bps = fields.bid_ask_spread_bps;
        this.padding_1 = fields.padding_1;
        this.depth_100k_usd_micro = fields.depth_100k_usd_micro;
        this.volume_24h_usd_micro = fields.volume_24h_usd_micro;
        this.iv_bid_28d_micro = fields.iv_bid_28d_micro;
        this.iv_ask_28d_micro = fields.iv_ask_28d_micro;
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
        if (!data.slice(0, 8).equals(MicrostructurePDA.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = MicrostructurePDA.layout.decode(data.slice(8));
        return new MicrostructurePDA({
            asset: dec.asset,
            padding_0: dec.padding_0,
            last_update_slot: dec.last_update_slot,
            spot_micro: dec.spot_micro,
            bid_ask_spread_bps: dec.bid_ask_spread_bps,
            padding_1: dec.padding_1,
            depth_100k_usd_micro: dec.depth_100k_usd_micro,
            volume_24h_usd_micro: dec.volume_24h_usd_micro,
            iv_bid_28d_micro: dec.iv_bid_28d_micro,
            iv_ask_28d_micro: dec.iv_ask_28d_micro,
        });
    }
    toJSON() {
        return {
            asset: this.asset,
            padding_0: this.padding_0,
            last_update_slot: this.last_update_slot.toString(),
            spot_micro: this.spot_micro.toString(),
            bid_ask_spread_bps: this.bid_ask_spread_bps,
            padding_1: this.padding_1,
            depth_100k_usd_micro: this.depth_100k_usd_micro.toString(),
            volume_24h_usd_micro: this.volume_24h_usd_micro.toString(),
            iv_bid_28d_micro: this.iv_bid_28d_micro.toString(),
            iv_ask_28d_micro: this.iv_ask_28d_micro.toString(),
        };
    }
    static fromJSON(obj) {
        return new MicrostructurePDA({
            asset: obj.asset,
            padding_0: obj.padding_0,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            spot_micro: new bn_js_1.default(obj.spot_micro),
            bid_ask_spread_bps: obj.bid_ask_spread_bps,
            padding_1: obj.padding_1,
            depth_100k_usd_micro: new bn_js_1.default(obj.depth_100k_usd_micro),
            volume_24h_usd_micro: new bn_js_1.default(obj.volume_24h_usd_micro),
            iv_bid_28d_micro: new bn_js_1.default(obj.iv_bid_28d_micro),
            iv_ask_28d_micro: new bn_js_1.default(obj.iv_ask_28d_micro),
        });
    }
}
exports.MicrostructurePDA = MicrostructurePDA;
MicrostructurePDA.discriminator = Buffer.from([
    112, 24, 15, 7, 108, 153, 240, 45,
]);
MicrostructurePDA.layout = borsh.struct([
    borsh.u8("asset"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("spot_micro"),
    borsh.u32("bid_ask_spread_bps"),
    borsh.array(borsh.u8(), 4, "padding_1"),
    borsh.u64("depth_100k_usd_micro"),
    borsh.u64("volume_24h_usd_micro"),
    borsh.u64("iv_bid_28d_micro"),
    borsh.u64("iv_ask_28d_micro"),
]);
//# sourceMappingURL=MicrostructurePDA.js.map