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
exports.RecoveryTearUpAppliedToCm = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class RecoveryTearUpAppliedToCm {
    constructor(fields) {
        this.recovery_state = fields.recovery_state;
        this.clearing_member = fields.clearing_member;
        this.tear_up_bps = fields.tear_up_bps;
        this.gross_notional_before = fields.gross_notional_before;
        this.gross_notional_after = fields.gross_notional_after;
        this.net_notional_long_before = fields.net_notional_long_before;
        this.net_notional_long_after = fields.net_notional_long_after;
        this.net_notional_short_before = fields.net_notional_short_before;
        this.net_notional_short_after = fields.net_notional_short_after;
        this.applied_at_slot = fields.applied_at_slot;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("recovery_state"),
            borsh.publicKey("clearing_member"),
            borsh.u16("tear_up_bps"),
            borsh.u64("gross_notional_before"),
            borsh.u64("gross_notional_after"),
            borsh.u64("net_notional_long_before"),
            borsh.u64("net_notional_long_after"),
            borsh.u64("net_notional_short_before"),
            borsh.u64("net_notional_short_after"),
            borsh.u64("applied_at_slot"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new RecoveryTearUpAppliedToCm({
            recovery_state: obj.recovery_state,
            clearing_member: obj.clearing_member,
            tear_up_bps: obj.tear_up_bps,
            gross_notional_before: obj.gross_notional_before,
            gross_notional_after: obj.gross_notional_after,
            net_notional_long_before: obj.net_notional_long_before,
            net_notional_long_after: obj.net_notional_long_after,
            net_notional_short_before: obj.net_notional_short_before,
            net_notional_short_after: obj.net_notional_short_after,
            applied_at_slot: obj.applied_at_slot,
        });
    }
    static toEncodable(fields) {
        return {
            recovery_state: fields.recovery_state,
            clearing_member: fields.clearing_member,
            tear_up_bps: fields.tear_up_bps,
            gross_notional_before: fields.gross_notional_before,
            gross_notional_after: fields.gross_notional_after,
            net_notional_long_before: fields.net_notional_long_before,
            net_notional_long_after: fields.net_notional_long_after,
            net_notional_short_before: fields.net_notional_short_before,
            net_notional_short_after: fields.net_notional_short_after,
            applied_at_slot: fields.applied_at_slot,
        };
    }
    toJSON() {
        return {
            recovery_state: this.recovery_state.toString(),
            clearing_member: this.clearing_member.toString(),
            tear_up_bps: this.tear_up_bps,
            gross_notional_before: this.gross_notional_before.toString(),
            gross_notional_after: this.gross_notional_after.toString(),
            net_notional_long_before: this.net_notional_long_before.toString(),
            net_notional_long_after: this.net_notional_long_after.toString(),
            net_notional_short_before: this.net_notional_short_before.toString(),
            net_notional_short_after: this.net_notional_short_after.toString(),
            applied_at_slot: this.applied_at_slot.toString(),
        };
    }
    static fromJSON(obj) {
        return new RecoveryTearUpAppliedToCm({
            recovery_state: new web3_js_1.PublicKey(obj.recovery_state),
            clearing_member: new web3_js_1.PublicKey(obj.clearing_member),
            tear_up_bps: obj.tear_up_bps,
            gross_notional_before: new bn_js_1.default(obj.gross_notional_before),
            gross_notional_after: new bn_js_1.default(obj.gross_notional_after),
            net_notional_long_before: new bn_js_1.default(obj.net_notional_long_before),
            net_notional_long_after: new bn_js_1.default(obj.net_notional_long_after),
            net_notional_short_before: new bn_js_1.default(obj.net_notional_short_before),
            net_notional_short_after: new bn_js_1.default(obj.net_notional_short_after),
            applied_at_slot: new bn_js_1.default(obj.applied_at_slot),
        });
    }
    toEncodable() {
        return RecoveryTearUpAppliedToCm.toEncodable(this);
    }
}
exports.RecoveryTearUpAppliedToCm = RecoveryTearUpAppliedToCm;
//# sourceMappingURL=RecoveryTearUpAppliedToCm.js.map