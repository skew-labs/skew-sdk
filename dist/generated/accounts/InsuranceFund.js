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
exports.InsuranceFund = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class InsuranceFund {
    constructor(fields) {
        this.authority = fields.authority;
        this.bump = fields.bump;
        this.initialized_at = fields.initialized_at;
        this.tier3_protocol_sitg = fields.tier3_protocol_sitg;
        this.tier1_mutualized_pool = fields.tier1_mutualized_pool;
        this.tier2_mutualized_pool = fields.tier2_mutualized_pool;
        this.cross_mutualized_pool = fields.cross_mutualized_pool;
        this.total_cm_contributions = fields.total_cm_contributions;
        this.total_drained = fields.total_drained;
        this.default_event_count = fields.default_event_count;
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
        if (!data.slice(0, 8).equals(InsuranceFund.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = InsuranceFund.layout.decode(data.slice(8));
        return new InsuranceFund({
            authority: dec.authority,
            bump: dec.bump,
            initialized_at: dec.initialized_at,
            tier3_protocol_sitg: dec.tier3_protocol_sitg,
            tier1_mutualized_pool: dec.tier1_mutualized_pool,
            tier2_mutualized_pool: dec.tier2_mutualized_pool,
            cross_mutualized_pool: dec.cross_mutualized_pool,
            total_cm_contributions: dec.total_cm_contributions,
            total_drained: dec.total_drained,
            default_event_count: dec.default_event_count,
        });
    }
    toJSON() {
        return {
            authority: this.authority.toString(),
            bump: this.bump,
            initialized_at: this.initialized_at.toString(),
            tier3_protocol_sitg: this.tier3_protocol_sitg.toString(),
            tier1_mutualized_pool: this.tier1_mutualized_pool.toString(),
            tier2_mutualized_pool: this.tier2_mutualized_pool.toString(),
            cross_mutualized_pool: this.cross_mutualized_pool.toString(),
            total_cm_contributions: this.total_cm_contributions.toString(),
            total_drained: this.total_drained.toString(),
            default_event_count: this.default_event_count,
        };
    }
    static fromJSON(obj) {
        return new InsuranceFund({
            authority: new web3_js_1.PublicKey(obj.authority),
            bump: obj.bump,
            initialized_at: new bn_js_1.default(obj.initialized_at),
            tier3_protocol_sitg: new bn_js_1.default(obj.tier3_protocol_sitg),
            tier1_mutualized_pool: new bn_js_1.default(obj.tier1_mutualized_pool),
            tier2_mutualized_pool: new bn_js_1.default(obj.tier2_mutualized_pool),
            cross_mutualized_pool: new bn_js_1.default(obj.cross_mutualized_pool),
            total_cm_contributions: new bn_js_1.default(obj.total_cm_contributions),
            total_drained: new bn_js_1.default(obj.total_drained),
            default_event_count: obj.default_event_count,
        });
    }
}
exports.InsuranceFund = InsuranceFund;
InsuranceFund.discriminator = Buffer.from([
    43, 134, 170, 87, 102, 16, 142, 147,
]);
InsuranceFund.layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.i64("initialized_at"),
    borsh.u64("tier3_protocol_sitg"),
    borsh.u64("tier1_mutualized_pool"),
    borsh.u64("tier2_mutualized_pool"),
    borsh.u64("cross_mutualized_pool"),
    borsh.u64("total_cm_contributions"),
    borsh.u64("total_drained"),
    borsh.u32("default_event_count"),
]);
//# sourceMappingURL=InsuranceFund.js.map