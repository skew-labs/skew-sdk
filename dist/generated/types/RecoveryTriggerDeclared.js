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
exports.RecoveryTriggerDeclared = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoveryTriggerDeclared {
    constructor(fields) {
        this.recovery_state = fields.recovery_state;
        this.trigger_kind = fields.trigger_kind;
        this.emergency_active = fields.emergency_active;
        this.declared_at_slot = fields.declared_at_slot;
        this.declared_at_ts = fields.declared_at_ts;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("recovery_state"),
            borsh.u8("trigger_kind"),
            borsh.bool("emergency_active"),
            borsh.u64("declared_at_slot"),
            borsh.i64("declared_at_ts"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoveryTriggerDeclared({
            recovery_state: obj.recovery_state,
            trigger_kind: obj.trigger_kind,
            emergency_active: obj.emergency_active,
            declared_at_slot: obj.declared_at_slot,
            declared_at_ts: obj.declared_at_ts,
        });
    }
    static toEncodable(fields) {
        return {
            recovery_state: fields.recovery_state,
            trigger_kind: fields.trigger_kind,
            emergency_active: fields.emergency_active,
            declared_at_slot: fields.declared_at_slot,
            declared_at_ts: fields.declared_at_ts,
        };
    }
    toJSON() {
        return {
            recovery_state: this.recovery_state.toString(),
            trigger_kind: this.trigger_kind,
            emergency_active: this.emergency_active,
            declared_at_slot: this.declared_at_slot.toString(),
            declared_at_ts: this.declared_at_ts.toString(),
        };
    }
    static fromJSON(obj) {
        return new RecoveryTriggerDeclared({
            recovery_state: new web3_js_1.PublicKey(obj.recovery_state),
            trigger_kind: obj.trigger_kind,
            emergency_active: obj.emergency_active,
            declared_at_slot: new bn_js_1.default(obj.declared_at_slot),
            declared_at_ts: new bn_js_1.default(obj.declared_at_ts),
        });
    }
    toEncodable() {
        return RecoveryTriggerDeclared.toEncodable(this);
    }
}
exports.RecoveryTriggerDeclared = RecoveryTriggerDeclared;
//# sourceMappingURL=RecoveryTriggerDeclared.js.map