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
exports.CrossAssetMatrix = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class CrossAssetMatrix {
    constructor(fields) {
        this.last_fit_slot = fields.last_fit_slot;
        this.icc_rho_p5_micro = fields.icc_rho_p5_micro;
        this.stress_rho_micro = fields.stress_rho_micro;
        this.last_pearson_slot = fields.last_pearson_slot;
        this.last_stress_slot = fields.last_stress_slot;
        this.bump = fields.bump;
        this.padding_0 = fields.padding_0;
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
        if (!data.slice(0, 8).equals(CrossAssetMatrix.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CrossAssetMatrix.layout.decode(data.slice(8));
        return new CrossAssetMatrix({
            last_fit_slot: dec.last_fit_slot,
            icc_rho_p5_micro: dec.icc_rho_p5_micro,
            stress_rho_micro: dec.stress_rho_micro,
            last_pearson_slot: dec.last_pearson_slot,
            last_stress_slot: dec.last_stress_slot,
            bump: dec.bump,
            padding_0: dec.padding_0,
        });
    }
    toJSON() {
        return {
            last_fit_slot: this.last_fit_slot.toString(),
            icc_rho_p5_micro: this.icc_rho_p5_micro,
            stress_rho_micro: this.stress_rho_micro,
            last_pearson_slot: this.last_pearson_slot.toString(),
            last_stress_slot: this.last_stress_slot.toString(),
            bump: this.bump,
            padding_0: this.padding_0,
        };
    }
    static fromJSON(obj) {
        return new CrossAssetMatrix({
            last_fit_slot: new bn_js_1.default(obj.last_fit_slot),
            icc_rho_p5_micro: obj.icc_rho_p5_micro,
            stress_rho_micro: obj.stress_rho_micro,
            last_pearson_slot: new bn_js_1.default(obj.last_pearson_slot),
            last_stress_slot: new bn_js_1.default(obj.last_stress_slot),
            bump: obj.bump,
            padding_0: obj.padding_0,
        });
    }
}
exports.CrossAssetMatrix = CrossAssetMatrix;
CrossAssetMatrix.discriminator = Buffer.from([
    17, 56, 96, 160, 80, 61, 246, 149,
]);
CrossAssetMatrix.layout = borsh.struct([
    borsh.u64("last_fit_slot"),
    borsh.array(borsh.u32(), 10, "icc_rho_p5_micro"),
    borsh.array(borsh.u32(), 10, "stress_rho_micro"),
    borsh.u64("last_pearson_slot"),
    borsh.u64("last_stress_slot"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_0"),
]);
//# sourceMappingURL=CrossAssetMatrix.js.map