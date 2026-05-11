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
exports.RecoveryVmghApplied = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoveryVmghApplied {
    constructor(fields) {
        this.recovery_state = fields.recovery_state;
        this.haircut_bps = fields.haircut_bps;
        this.drained_micro = fields.drained_micro;
        this.cumulative_drained_micro = fields.cumulative_drained_micro;
        this.apply_count = fields.apply_count;
        this.gain_snapshot_digest = fields.gain_snapshot_digest;
        this.applied_at_slot = fields.applied_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("recovery_state"),
            borsh.u16("haircut_bps"),
            borsh.u64("drained_micro"),
            borsh.u64("cumulative_drained_micro"),
            borsh.u32("apply_count"),
            borsh.array(borsh.u8(), 32, "gain_snapshot_digest"),
            borsh.u64("applied_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoveryVmghApplied({
            recovery_state: obj.recovery_state,
            haircut_bps: obj.haircut_bps,
            drained_micro: obj.drained_micro,
            cumulative_drained_micro: obj.cumulative_drained_micro,
            apply_count: obj.apply_count,
            gain_snapshot_digest: obj.gain_snapshot_digest,
            applied_at_slot: obj.applied_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            recovery_state: fields.recovery_state,
            haircut_bps: fields.haircut_bps,
            drained_micro: fields.drained_micro,
            cumulative_drained_micro: fields.cumulative_drained_micro,
            apply_count: fields.apply_count,
            gain_snapshot_digest: fields.gain_snapshot_digest,
            applied_at_slot: fields.applied_at_slot,
        };
    }
    toJSON() {
        return {
            recovery_state: this.recovery_state.toString(),
            haircut_bps: this.haircut_bps,
            drained_micro: this.drained_micro.toString(),
            cumulative_drained_micro: this.cumulative_drained_micro.toString(),
            apply_count: this.apply_count,
            gain_snapshot_digest: this.gain_snapshot_digest,
            applied_at_slot: this.applied_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new RecoveryVmghApplied({
            recovery_state: new web3_js_1.PublicKey(obj.recovery_state),
            haircut_bps: obj.haircut_bps,
            drained_micro: new bn_js_1.default(obj.drained_micro),
            cumulative_drained_micro: new bn_js_1.default(obj.cumulative_drained_micro),
            apply_count: obj.apply_count,
            gain_snapshot_digest: obj.gain_snapshot_digest,
            applied_at_slot: new bn_js_1.default(obj.applied_at_slot),
        });
    }
    toEncodable() {
        return RecoveryVmghApplied.toEncodable(this);
    }
}
exports.RecoveryVmghApplied = RecoveryVmghApplied;
//# sourceMappingURL=RecoveryVmghApplied.js.map