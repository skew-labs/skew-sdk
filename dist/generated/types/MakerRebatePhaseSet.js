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
exports.MakerRebatePhaseSet = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MakerRebatePhaseSet {
    constructor(fields) {
        this.fee_config_pda = fields.fee_config_pda;
        this.phase_bps_before = fields.phase_bps_before;
        this.phase_bps_after = fields.phase_bps_after;
        this.set_at = fields.set_at;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("fee_config_pda"),
            borsh.u16("phase_bps_before"),
            borsh.u16("phase_bps_after"),
            borsh.i64("set_at"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MakerRebatePhaseSet({
            fee_config_pda: obj.fee_config_pda,
            phase_bps_before: obj.phase_bps_before,
            phase_bps_after: obj.phase_bps_after,
            set_at: obj.set_at,
        });
    }
    static toEncodable(fields) {
        return {
            fee_config_pda: fields.fee_config_pda,
            phase_bps_before: fields.phase_bps_before,
            phase_bps_after: fields.phase_bps_after,
            set_at: fields.set_at,
        };
    }
    toJSON() {
        return {
            fee_config_pda: this.fee_config_pda.toString(),
            phase_bps_before: this.phase_bps_before,
            phase_bps_after: this.phase_bps_after,
            set_at: this.set_at.toString(),
        };
    }
    static fromJSON(obj) {
        return new MakerRebatePhaseSet({
            fee_config_pda: new web3_js_1.PublicKey(obj.fee_config_pda),
            phase_bps_before: obj.phase_bps_before,
            phase_bps_after: obj.phase_bps_after,
            set_at: new bn_js_1.default(obj.set_at),
        });
    }
    toEncodable() {
        return MakerRebatePhaseSet.toEncodable(this);
    }
}
exports.MakerRebatePhaseSet = MakerRebatePhaseSet;
//# sourceMappingURL=MakerRebatePhaseSet.js.map