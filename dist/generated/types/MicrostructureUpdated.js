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
exports.MicrostructureUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MicrostructureUpdated {
    constructor(fields) {
        this.microstructure = fields.microstructure;
        this.asset = fields.asset;
        this.last_update_slot = fields.last_update_slot;
        this.spot_micro = fields.spot_micro;
        this.bid_ask_spread_bps = fields.bid_ask_spread_bps;
        this.depth_100k_usd_micro = fields.depth_100k_usd_micro;
        this.volume_24h_usd_micro = fields.volume_24h_usd_micro;
        this.iv_bid_28d_micro = fields.iv_bid_28d_micro;
        this.iv_ask_28d_micro = fields.iv_ask_28d_micro;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("microstructure"),
            borsh.u8("asset"),
            borsh.u64("last_update_slot"),
            borsh.u64("spot_micro"),
            borsh.u32("bid_ask_spread_bps"),
            borsh.u64("depth_100k_usd_micro"),
            borsh.u64("volume_24h_usd_micro"),
            borsh.u64("iv_bid_28d_micro"),
            borsh.u64("iv_ask_28d_micro"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MicrostructureUpdated({
            microstructure: obj.microstructure,
            asset: obj.asset,
            last_update_slot: obj.last_update_slot,
            spot_micro: obj.spot_micro,
            bid_ask_spread_bps: obj.bid_ask_spread_bps,
            depth_100k_usd_micro: obj.depth_100k_usd_micro,
            volume_24h_usd_micro: obj.volume_24h_usd_micro,
            iv_bid_28d_micro: obj.iv_bid_28d_micro,
            iv_ask_28d_micro: obj.iv_ask_28d_micro,
        });
    }
    static toEncodable(fields) {
        return {
            microstructure: fields.microstructure,
            asset: fields.asset,
            last_update_slot: fields.last_update_slot,
            spot_micro: fields.spot_micro,
            bid_ask_spread_bps: fields.bid_ask_spread_bps,
            depth_100k_usd_micro: fields.depth_100k_usd_micro,
            volume_24h_usd_micro: fields.volume_24h_usd_micro,
            iv_bid_28d_micro: fields.iv_bid_28d_micro,
            iv_ask_28d_micro: fields.iv_ask_28d_micro,
        };
    }
    toJSON() {
        return {
            microstructure: this.microstructure.toString(),
            asset: this.asset,
            last_update_slot: this.last_update_slot.toString(),
            spot_micro: this.spot_micro.toString(),
            bid_ask_spread_bps: this.bid_ask_spread_bps,
            depth_100k_usd_micro: this.depth_100k_usd_micro.toString(),
            volume_24h_usd_micro: this.volume_24h_usd_micro.toString(),
            iv_bid_28d_micro: this.iv_bid_28d_micro.toString(),
            iv_ask_28d_micro: this.iv_ask_28d_micro.toString(),
        };
    }
    static fromJSON(obj) {
        return new MicrostructureUpdated({
            microstructure: new web3_js_1.PublicKey(obj.microstructure),
            asset: obj.asset,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            spot_micro: new bn_js_1.default(obj.spot_micro),
            bid_ask_spread_bps: obj.bid_ask_spread_bps,
            depth_100k_usd_micro: new bn_js_1.default(obj.depth_100k_usd_micro),
            volume_24h_usd_micro: new bn_js_1.default(obj.volume_24h_usd_micro),
            iv_bid_28d_micro: new bn_js_1.default(obj.iv_bid_28d_micro),
            iv_ask_28d_micro: new bn_js_1.default(obj.iv_ask_28d_micro),
        });
    }
    toEncodable() {
        return MicrostructureUpdated.toEncodable(this);
    }
}
exports.MicrostructureUpdated = MicrostructureUpdated;
//# sourceMappingURL=MicrostructureUpdated.js.map