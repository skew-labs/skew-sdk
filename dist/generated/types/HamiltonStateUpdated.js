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
exports.HamiltonStateUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class HamiltonStateUpdated {
    constructor(fields) {
        this.hamilton_state = fields.hamilton_state;
        this.asset = fields.asset;
        this.last_update_slot = fields.last_update_slot;
        this.pi_calm_micro = fields.pi_calm_micro;
        this.pi_stress_micro = fields.pi_stress_micro;
        this.consecutive_stress_days = fields.consecutive_stress_days;
        this.consecutive_calm_days = fields.consecutive_calm_days;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("hamilton_state"),
            borsh.u8("asset"),
            borsh.u64("last_update_slot"),
            borsh.u64("pi_calm_micro"),
            borsh.u64("pi_stress_micro"),
            borsh.u32("consecutive_stress_days"),
            borsh.u32("consecutive_calm_days"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new HamiltonStateUpdated({
            hamilton_state: obj.hamilton_state,
            asset: obj.asset,
            last_update_slot: obj.last_update_slot,
            pi_calm_micro: obj.pi_calm_micro,
            pi_stress_micro: obj.pi_stress_micro,
            consecutive_stress_days: obj.consecutive_stress_days,
            consecutive_calm_days: obj.consecutive_calm_days,
        });
    }
    static toEncodable(fields) {
        return {
            hamilton_state: fields.hamilton_state,
            asset: fields.asset,
            last_update_slot: fields.last_update_slot,
            pi_calm_micro: fields.pi_calm_micro,
            pi_stress_micro: fields.pi_stress_micro,
            consecutive_stress_days: fields.consecutive_stress_days,
            consecutive_calm_days: fields.consecutive_calm_days,
        };
    }
    toJSON() {
        return {
            hamilton_state: this.hamilton_state.toString(),
            asset: this.asset,
            last_update_slot: this.last_update_slot.toString(),
            pi_calm_micro: this.pi_calm_micro.toString(),
            pi_stress_micro: this.pi_stress_micro.toString(),
            consecutive_stress_days: this.consecutive_stress_days,
            consecutive_calm_days: this.consecutive_calm_days,
        };
    }
    static fromJSON(obj) {
        return new HamiltonStateUpdated({
            hamilton_state: new web3_js_1.PublicKey(obj.hamilton_state),
            asset: obj.asset,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            pi_calm_micro: new bn_js_1.default(obj.pi_calm_micro),
            pi_stress_micro: new bn_js_1.default(obj.pi_stress_micro),
            consecutive_stress_days: obj.consecutive_stress_days,
            consecutive_calm_days: obj.consecutive_calm_days,
        });
    }
    toEncodable() {
        return HamiltonStateUpdated.toEncodable(this);
    }
}
exports.HamiltonStateUpdated = HamiltonStateUpdated;
//# sourceMappingURL=HamiltonStateUpdated.js.map