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
exports.RecoveryVmghDrainExecuted = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoveryVmghDrainExecuted {
    constructor(fields) {
        this.recovery_state = fields.recovery_state;
        this.fee_accumulator = fields.fee_accumulator;
        this.drained_vault = fields.drained_vault;
        this.mint = fields.mint;
        this.haircut_bps = fields.haircut_bps;
        this.fee_accumulator_balance_before = fields.fee_accumulator_balance_before;
        this.actual_transferred_micro = fields.actual_transferred_micro;
        this.applied_at_slot = fields.applied_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("recovery_state"),
            borsh.publicKey("fee_accumulator"),
            borsh.publicKey("drained_vault"),
            borsh.publicKey("mint"),
            borsh.u16("haircut_bps"),
            borsh.u64("fee_accumulator_balance_before"),
            borsh.u64("actual_transferred_micro"),
            borsh.u64("applied_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoveryVmghDrainExecuted({
            recovery_state: obj.recovery_state,
            fee_accumulator: obj.fee_accumulator,
            drained_vault: obj.drained_vault,
            mint: obj.mint,
            haircut_bps: obj.haircut_bps,
            fee_accumulator_balance_before: obj.fee_accumulator_balance_before,
            actual_transferred_micro: obj.actual_transferred_micro,
            applied_at_slot: obj.applied_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            recovery_state: fields.recovery_state,
            fee_accumulator: fields.fee_accumulator,
            drained_vault: fields.drained_vault,
            mint: fields.mint,
            haircut_bps: fields.haircut_bps,
            fee_accumulator_balance_before: fields.fee_accumulator_balance_before,
            actual_transferred_micro: fields.actual_transferred_micro,
            applied_at_slot: fields.applied_at_slot,
        };
    }
    toJSON() {
        return {
            recovery_state: this.recovery_state.toString(),
            fee_accumulator: this.fee_accumulator.toString(),
            drained_vault: this.drained_vault.toString(),
            mint: this.mint.toString(),
            haircut_bps: this.haircut_bps,
            fee_accumulator_balance_before: this.fee_accumulator_balance_before.toString(),
            actual_transferred_micro: this.actual_transferred_micro.toString(),
            applied_at_slot: this.applied_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new RecoveryVmghDrainExecuted({
            recovery_state: new web3_js_1.PublicKey(obj.recovery_state),
            fee_accumulator: new web3_js_1.PublicKey(obj.fee_accumulator),
            drained_vault: new web3_js_1.PublicKey(obj.drained_vault),
            mint: new web3_js_1.PublicKey(obj.mint),
            haircut_bps: obj.haircut_bps,
            fee_accumulator_balance_before: new bn_js_1.default(obj.fee_accumulator_balance_before),
            actual_transferred_micro: new bn_js_1.default(obj.actual_transferred_micro),
            applied_at_slot: new bn_js_1.default(obj.applied_at_slot),
        });
    }
    toEncodable() {
        return RecoveryVmghDrainExecuted.toEncodable(this);
    }
}
exports.RecoveryVmghDrainExecuted = RecoveryVmghDrainExecuted;
//# sourceMappingURL=RecoveryVmghDrainExecuted.js.map