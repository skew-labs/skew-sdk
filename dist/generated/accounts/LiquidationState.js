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
exports.LiquidationState = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class LiquidationState {
    constructor(fields) {
        this.option = fields.option;
        this.defaulting_cm = fields.defaulting_cm;
        this.bump = fields.bump;
        this.liq_start_ts = fields.liq_start_ts;
        this.total_closed_bps = fields.total_closed_bps;
        this.finalized = fields.finalized;
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
        if (!data.slice(0, 8).equals(LiquidationState.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = LiquidationState.layout.decode(data.slice(8));
        return new LiquidationState({
            option: dec.option,
            defaulting_cm: dec.defaulting_cm,
            bump: dec.bump,
            liq_start_ts: dec.liq_start_ts,
            total_closed_bps: dec.total_closed_bps,
            finalized: dec.finalized,
        });
    }
    toJSON() {
        return {
            option: this.option.toString(),
            defaulting_cm: this.defaulting_cm.toString(),
            bump: this.bump,
            liq_start_ts: this.liq_start_ts.toString(),
            total_closed_bps: this.total_closed_bps,
            finalized: this.finalized,
        };
    }
    static fromJSON(obj) {
        return new LiquidationState({
            option: new web3_js_1.PublicKey(obj.option),
            defaulting_cm: new web3_js_1.PublicKey(obj.defaulting_cm),
            bump: obj.bump,
            liq_start_ts: new bn_js_1.default(obj.liq_start_ts),
            total_closed_bps: obj.total_closed_bps,
            finalized: obj.finalized,
        });
    }
}
exports.LiquidationState = LiquidationState;
LiquidationState.discriminator = Buffer.from([
    51, 3, 38, 175, 93, 144, 255, 172,
]);
LiquidationState.layout = borsh.struct([
    borsh.publicKey("option"),
    borsh.publicKey("defaulting_cm"),
    borsh.u8("bump"),
    borsh.i64("liq_start_ts"),
    borsh.u16("total_closed_bps"),
    borsh.bool("finalized"),
]);
//# sourceMappingURL=LiquidationState.js.map