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
exports.DutchAuctionStepped = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class DutchAuctionStepped {
    constructor(fields) {
        this.defaulting_cm = fields.defaulting_cm;
        this.current_bonus_bps = fields.current_bonus_bps;
        this.liq_start_ts = fields.liq_start_ts;
        this.observed_at = fields.observed_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("defaulting_cm"),
            borsh.u16("current_bonus_bps"),
            borsh.i64("liq_start_ts"),
            borsh.i64("observed_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new DutchAuctionStepped({
            defaulting_cm: obj.defaulting_cm,
            current_bonus_bps: obj.current_bonus_bps,
            liq_start_ts: obj.liq_start_ts,
            observed_at: obj.observed_at,
        });
    }
    static toEncodable(fields) {
        return {
            defaulting_cm: fields.defaulting_cm,
            current_bonus_bps: fields.current_bonus_bps,
            liq_start_ts: fields.liq_start_ts,
            observed_at: fields.observed_at,
        };
    }
    toJSON() {
        return {
            defaulting_cm: this.defaulting_cm.toString(),
            current_bonus_bps: this.current_bonus_bps,
            liq_start_ts: this.liq_start_ts.toString(),
            observed_at: this.observed_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new DutchAuctionStepped({
            defaulting_cm: new web3_js_1.PublicKey(obj.defaulting_cm),
            current_bonus_bps: obj.current_bonus_bps,
            liq_start_ts: new bn_js_1.default(obj.liq_start_ts),
            observed_at: new bn_js_1.default(obj.observed_at),
        });
    }
    toEncodable() {
        return DutchAuctionStepped.toEncodable(this);
    }
}
exports.DutchAuctionStepped = DutchAuctionStepped;
//# sourceMappingURL=DutchAuctionStepped.js.map