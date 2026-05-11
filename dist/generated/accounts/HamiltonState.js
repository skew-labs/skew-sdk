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
exports.HamiltonState = void 0;
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class HamiltonState {
    constructor(fields) {
        this.asset = fields.asset;
        this.bump = fields.bump;
        this.padding_0 = fields.padding_0;
        this.last_update_slot = fields.last_update_slot;
        this.pi_calm_micro = fields.pi_calm_micro;
        this.pi_stress_micro = fields.pi_stress_micro;
        this.mu_calm_micro = fields.mu_calm_micro;
        this.mu_stress_micro = fields.mu_stress_micro;
        this.sigma_calm_micro = fields.sigma_calm_micro;
        this.sigma_stress_micro = fields.sigma_stress_micro;
        this.p01_micro = fields.p01_micro;
        this.p10_micro = fields.p10_micro;
        this.consecutive_stress_days = fields.consecutive_stress_days;
        this.consecutive_calm_days = fields.consecutive_calm_days;
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
        if (!data.slice(0, 8).equals(HamiltonState.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = HamiltonState.layout.decode(data.slice(8));
        return new HamiltonState({
            asset: dec.asset,
            bump: dec.bump,
            padding_0: dec.padding_0,
            last_update_slot: dec.last_update_slot,
            pi_calm_micro: dec.pi_calm_micro,
            pi_stress_micro: dec.pi_stress_micro,
            mu_calm_micro: dec.mu_calm_micro,
            mu_stress_micro: dec.mu_stress_micro,
            sigma_calm_micro: dec.sigma_calm_micro,
            sigma_stress_micro: dec.sigma_stress_micro,
            p01_micro: dec.p01_micro,
            p10_micro: dec.p10_micro,
            consecutive_stress_days: dec.consecutive_stress_days,
            consecutive_calm_days: dec.consecutive_calm_days,
        });
    }
    toJSON() {
        return {
            asset: this.asset,
            bump: this.bump,
            padding_0: this.padding_0,
            last_update_slot: this.last_update_slot.toString(),
            pi_calm_micro: this.pi_calm_micro.toString(),
            pi_stress_micro: this.pi_stress_micro.toString(),
            mu_calm_micro: this.mu_calm_micro.toString(),
            mu_stress_micro: this.mu_stress_micro.toString(),
            sigma_calm_micro: this.sigma_calm_micro.toString(),
            sigma_stress_micro: this.sigma_stress_micro.toString(),
            p01_micro: this.p01_micro.toString(),
            p10_micro: this.p10_micro.toString(),
            consecutive_stress_days: this.consecutive_stress_days,
            consecutive_calm_days: this.consecutive_calm_days,
        };
    }
    static fromJSON(obj) {
        return new HamiltonState({
            asset: obj.asset,
            bump: obj.bump,
            padding_0: obj.padding_0,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            pi_calm_micro: new bn_js_1.default(obj.pi_calm_micro),
            pi_stress_micro: new bn_js_1.default(obj.pi_stress_micro),
            mu_calm_micro: new bn_js_1.default(obj.mu_calm_micro),
            mu_stress_micro: new bn_js_1.default(obj.mu_stress_micro),
            sigma_calm_micro: new bn_js_1.default(obj.sigma_calm_micro),
            sigma_stress_micro: new bn_js_1.default(obj.sigma_stress_micro),
            p01_micro: new bn_js_1.default(obj.p01_micro),
            p10_micro: new bn_js_1.default(obj.p10_micro),
            consecutive_stress_days: obj.consecutive_stress_days,
            consecutive_calm_days: obj.consecutive_calm_days,
        });
    }
}
exports.HamiltonState = HamiltonState;
HamiltonState.discriminator = Buffer.from([
    169, 66, 20, 93, 141, 5, 48, 238,
]);
HamiltonState.layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("pi_calm_micro"),
    borsh.u64("pi_stress_micro"),
    borsh.i64("mu_calm_micro"),
    borsh.i64("mu_stress_micro"),
    borsh.u64("sigma_calm_micro"),
    borsh.u64("sigma_stress_micro"),
    borsh.u64("p01_micro"),
    borsh.u64("p10_micro"),
    borsh.u32("consecutive_stress_days"),
    borsh.u32("consecutive_calm_days"),
]);
//# sourceMappingURL=HamiltonState.js.map