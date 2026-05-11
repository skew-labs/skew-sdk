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
exports.FeeConfigPda = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class FeeConfigPda {
    constructor(fields) {
        this.bump = fields.bump;
        this.padding_0 = fields.padding_0;
        this.maker_rebate_phase_bps = fields.maker_rebate_phase_bps;
        this.padding_1 = fields.padding_1;
        this.last_phase_change_ts = fields.last_phase_change_ts;
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
        if (!data.slice(0, 8).equals(FeeConfigPda.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = FeeConfigPda.layout.decode(data.slice(8));
        return new FeeConfigPda({
            bump: dec.bump,
            padding_0: dec.padding_0,
            maker_rebate_phase_bps: dec.maker_rebate_phase_bps,
            padding_1: dec.padding_1,
            last_phase_change_ts: dec.last_phase_change_ts,
        });
    }
    toJSON() {
        return {
            bump: this.bump,
            padding_0: this.padding_0,
            maker_rebate_phase_bps: this.maker_rebate_phase_bps,
            padding_1: this.padding_1,
            last_phase_change_ts: this.last_phase_change_ts.toString(),
        };
    }
    static fromJSON(obj) {
        return new FeeConfigPda({
            bump: obj.bump,
            padding_0: obj.padding_0,
            maker_rebate_phase_bps: obj.maker_rebate_phase_bps,
            padding_1: obj.padding_1,
            last_phase_change_ts: new bn_js_1.default(obj.last_phase_change_ts),
        });
    }
}
exports.FeeConfigPda = FeeConfigPda;
FeeConfigPda.discriminator = Buffer.from([
    241, 139, 111, 30, 22, 79, 75, 130,
]);
FeeConfigPda.layout = borsh.struct([
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u16("maker_rebate_phase_bps"),
    borsh.array(borsh.u8(), 6, "padding_1"),
    borsh.i64("last_phase_change_ts"),
]);
//# sourceMappingURL=FeeConfigPda.js.map