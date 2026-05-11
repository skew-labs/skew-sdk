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
exports.PoVSStateUpdated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class PoVSStateUpdated {
    constructor(fields) {
        this.povs_state = fields.povs_state;
        this.asset = fields.asset;
        this.last_update_slot = fields.last_update_slot;
        this.sigma_t_micro = fields.sigma_t_micro;
        this.sigma_inf_micro = fields.sigma_inf_micro;
        this.theta_d_micro = fields.theta_d_micro;
        this.vrp_rel_micro = fields.vrp_rel_micro;
        this.iv_micro = fields.iv_micro;
        this.xi_micro = fields.xi_micro;
        this.regime_indicator_micro = fields.regime_indicator_micro;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("povs_state"),
            borsh.u8("asset"),
            borsh.u64("last_update_slot"),
            borsh.u64("sigma_t_micro"),
            borsh.u64("sigma_inf_micro"),
            borsh.u64("theta_d_micro"),
            borsh.i64("vrp_rel_micro"),
            borsh.u64("iv_micro"),
            borsh.i64("xi_micro"),
            borsh.u64("regime_indicator_micro"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new PoVSStateUpdated({
            povs_state: obj.povs_state,
            asset: obj.asset,
            last_update_slot: obj.last_update_slot,
            sigma_t_micro: obj.sigma_t_micro,
            sigma_inf_micro: obj.sigma_inf_micro,
            theta_d_micro: obj.theta_d_micro,
            vrp_rel_micro: obj.vrp_rel_micro,
            iv_micro: obj.iv_micro,
            xi_micro: obj.xi_micro,
            regime_indicator_micro: obj.regime_indicator_micro,
        });
    }
    static toEncodable(fields) {
        return {
            povs_state: fields.povs_state,
            asset: fields.asset,
            last_update_slot: fields.last_update_slot,
            sigma_t_micro: fields.sigma_t_micro,
            sigma_inf_micro: fields.sigma_inf_micro,
            theta_d_micro: fields.theta_d_micro,
            vrp_rel_micro: fields.vrp_rel_micro,
            iv_micro: fields.iv_micro,
            xi_micro: fields.xi_micro,
            regime_indicator_micro: fields.regime_indicator_micro,
        };
    }
    toJSON() {
        return {
            povs_state: this.povs_state.toString(),
            asset: this.asset,
            last_update_slot: this.last_update_slot.toString(),
            sigma_t_micro: this.sigma_t_micro.toString(),
            sigma_inf_micro: this.sigma_inf_micro.toString(),
            theta_d_micro: this.theta_d_micro.toString(),
            vrp_rel_micro: this.vrp_rel_micro.toString(),
            iv_micro: this.iv_micro.toString(),
            xi_micro: this.xi_micro.toString(),
            regime_indicator_micro: this.regime_indicator_micro.toString(),
        };
    }
    static fromJSON(obj) {
        return new PoVSStateUpdated({
            povs_state: new web3_js_1.PublicKey(obj.povs_state),
            asset: obj.asset,
            last_update_slot: new bn_js_1.default(obj.last_update_slot),
            sigma_t_micro: new bn_js_1.default(obj.sigma_t_micro),
            sigma_inf_micro: new bn_js_1.default(obj.sigma_inf_micro),
            theta_d_micro: new bn_js_1.default(obj.theta_d_micro),
            vrp_rel_micro: new bn_js_1.default(obj.vrp_rel_micro),
            iv_micro: new bn_js_1.default(obj.iv_micro),
            xi_micro: new bn_js_1.default(obj.xi_micro),
            regime_indicator_micro: new bn_js_1.default(obj.regime_indicator_micro),
        });
    }
    toEncodable() {
        return PoVSStateUpdated.toEncodable(this);
    }
}
exports.PoVSStateUpdated = PoVSStateUpdated;
//# sourceMappingURL=PoVSStateUpdated.js.map