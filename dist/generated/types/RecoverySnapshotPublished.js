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
exports.RecoverySnapshotPublished = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoverySnapshotPublished {
    constructor(fields) {
        this.recovery_state = fields.recovery_state;
        this.snapshot_oi_digest = fields.snapshot_oi_digest;
        this.if_aggregate_balance_micro = fields.if_aggregate_balance_micro;
        this.residual_unfunded_loss_micro = fields.residual_unfunded_loss_micro;
        this.snapshot_at_slot = fields.snapshot_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("recovery_state"),
            borsh.array(borsh.u8(), 32, "snapshot_oi_digest"),
            borsh.u64("if_aggregate_balance_micro"),
            borsh.u64("residual_unfunded_loss_micro"),
            borsh.u64("snapshot_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoverySnapshotPublished({
            recovery_state: obj.recovery_state,
            snapshot_oi_digest: obj.snapshot_oi_digest,
            if_aggregate_balance_micro: obj.if_aggregate_balance_micro,
            residual_unfunded_loss_micro: obj.residual_unfunded_loss_micro,
            snapshot_at_slot: obj.snapshot_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            recovery_state: fields.recovery_state,
            snapshot_oi_digest: fields.snapshot_oi_digest,
            if_aggregate_balance_micro: fields.if_aggregate_balance_micro,
            residual_unfunded_loss_micro: fields.residual_unfunded_loss_micro,
            snapshot_at_slot: fields.snapshot_at_slot,
        };
    }
    toJSON() {
        return {
            recovery_state: this.recovery_state.toString(),
            snapshot_oi_digest: this.snapshot_oi_digest,
            if_aggregate_balance_micro: this.if_aggregate_balance_micro.toString(),
            residual_unfunded_loss_micro: this.residual_unfunded_loss_micro.toString(),
            snapshot_at_slot: this.snapshot_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new RecoverySnapshotPublished({
            recovery_state: new web3_js_1.PublicKey(obj.recovery_state),
            snapshot_oi_digest: obj.snapshot_oi_digest,
            if_aggregate_balance_micro: new bn_js_1.default(obj.if_aggregate_balance_micro),
            residual_unfunded_loss_micro: new bn_js_1.default(obj.residual_unfunded_loss_micro),
            snapshot_at_slot: new bn_js_1.default(obj.snapshot_at_slot),
        });
    }
    toEncodable() {
        return RecoverySnapshotPublished.toEncodable(this);
    }
}
exports.RecoverySnapshotPublished = RecoverySnapshotPublished;
//# sourceMappingURL=RecoverySnapshotPublished.js.map