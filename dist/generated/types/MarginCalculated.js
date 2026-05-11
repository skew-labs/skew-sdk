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
exports.MarginCalculated = void 0;
const web3_js_1 = require("@solana/web3.js"); // eslint-disable-line @typescript-eslint/no-unused-vars
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh"));
class MarginCalculated {
    constructor(fields) {
        this.cm = fields.cm;
        this.owner = fields.owner;
        this.max_loss_usdc = fields.max_loss_usdc;
        this.position_count = fields.position_count;
        this.calculated_at = fields.calculated_at;
        this.base_im_micro = fields.base_im_micro;
        this.scan_risk_micro = fields.scan_risk_micro;
        this.boundary_micro = fields.boundary_micro;
        this.l_a_applied_bps = fields.l_a_applied_bps;
        this.c_p_applied_bps = fields.c_p_applied_bps;
        this.tail_addon_micro = fields.tail_addon_micro;
        this.icc_credit_micro = fields.icc_credit_micro;
        this.portfolio_delta_dollar_micro = fields.portfolio_delta_dollar_micro;
        this.portfolio_gamma_dollar_micro = fields.portfolio_gamma_dollar_micro;
        this.portfolio_vega_dollar_micro = fields.portfolio_vega_dollar_micro;
        this.portfolio_theta_day_micro = fields.portfolio_theta_day_micro;
    }
    static layout(property) {
        return borsh.struct([
            borsh.publicKey("cm"),
            borsh.publicKey("owner"),
            borsh.u64("max_loss_usdc"),
            borsh.u8("position_count"),
            borsh.i64("calculated_at"),
            borsh.u64("base_im_micro"),
            borsh.u64("scan_risk_micro"),
            borsh.u64("boundary_micro"),
            borsh.u16("l_a_applied_bps"),
            borsh.u16("c_p_applied_bps"),
            borsh.u64("tail_addon_micro"),
            borsh.u64("icc_credit_micro"),
            borsh.i64("portfolio_delta_dollar_micro"),
            borsh.i64("portfolio_gamma_dollar_micro"),
            borsh.i64("portfolio_vega_dollar_micro"),
            borsh.i64("portfolio_theta_day_micro"),
        ], property);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromDecoded(obj) {
        return new MarginCalculated({
            cm: obj.cm,
            owner: obj.owner,
            max_loss_usdc: obj.max_loss_usdc,
            position_count: obj.position_count,
            calculated_at: obj.calculated_at,
            base_im_micro: obj.base_im_micro,
            scan_risk_micro: obj.scan_risk_micro,
            boundary_micro: obj.boundary_micro,
            l_a_applied_bps: obj.l_a_applied_bps,
            c_p_applied_bps: obj.c_p_applied_bps,
            tail_addon_micro: obj.tail_addon_micro,
            icc_credit_micro: obj.icc_credit_micro,
            portfolio_delta_dollar_micro: obj.portfolio_delta_dollar_micro,
            portfolio_gamma_dollar_micro: obj.portfolio_gamma_dollar_micro,
            portfolio_vega_dollar_micro: obj.portfolio_vega_dollar_micro,
            portfolio_theta_day_micro: obj.portfolio_theta_day_micro,
        });
    }
    static toEncodable(fields) {
        return {
            cm: fields.cm,
            owner: fields.owner,
            max_loss_usdc: fields.max_loss_usdc,
            position_count: fields.position_count,
            calculated_at: fields.calculated_at,
            base_im_micro: fields.base_im_micro,
            scan_risk_micro: fields.scan_risk_micro,
            boundary_micro: fields.boundary_micro,
            l_a_applied_bps: fields.l_a_applied_bps,
            c_p_applied_bps: fields.c_p_applied_bps,
            tail_addon_micro: fields.tail_addon_micro,
            icc_credit_micro: fields.icc_credit_micro,
            portfolio_delta_dollar_micro: fields.portfolio_delta_dollar_micro,
            portfolio_gamma_dollar_micro: fields.portfolio_gamma_dollar_micro,
            portfolio_vega_dollar_micro: fields.portfolio_vega_dollar_micro,
            portfolio_theta_day_micro: fields.portfolio_theta_day_micro,
        };
    }
    toJSON() {
        return {
            cm: this.cm.toString(),
            owner: this.owner.toString(),
            max_loss_usdc: this.max_loss_usdc.toString(),
            position_count: this.position_count,
            calculated_at: this.calculated_at.toString(),
            base_im_micro: this.base_im_micro.toString(),
            scan_risk_micro: this.scan_risk_micro.toString(),
            boundary_micro: this.boundary_micro.toString(),
            l_a_applied_bps: this.l_a_applied_bps,
            c_p_applied_bps: this.c_p_applied_bps,
            tail_addon_micro: this.tail_addon_micro.toString(),
            icc_credit_micro: this.icc_credit_micro.toString(),
            portfolio_delta_dollar_micro: this.portfolio_delta_dollar_micro.toString(),
            portfolio_gamma_dollar_micro: this.portfolio_gamma_dollar_micro.toString(),
            portfolio_vega_dollar_micro: this.portfolio_vega_dollar_micro.toString(),
            portfolio_theta_day_micro: this.portfolio_theta_day_micro.toString(),
        };
    }
    static fromJSON(obj) {
        return new MarginCalculated({
            cm: new web3_js_1.PublicKey(obj.cm),
            owner: new web3_js_1.PublicKey(obj.owner),
            max_loss_usdc: new bn_js_1.default(obj.max_loss_usdc),
            position_count: obj.position_count,
            calculated_at: new bn_js_1.default(obj.calculated_at),
            base_im_micro: new bn_js_1.default(obj.base_im_micro),
            scan_risk_micro: new bn_js_1.default(obj.scan_risk_micro),
            boundary_micro: new bn_js_1.default(obj.boundary_micro),
            l_a_applied_bps: obj.l_a_applied_bps,
            c_p_applied_bps: obj.c_p_applied_bps,
            tail_addon_micro: new bn_js_1.default(obj.tail_addon_micro),
            icc_credit_micro: new bn_js_1.default(obj.icc_credit_micro),
            portfolio_delta_dollar_micro: new bn_js_1.default(obj.portfolio_delta_dollar_micro),
            portfolio_gamma_dollar_micro: new bn_js_1.default(obj.portfolio_gamma_dollar_micro),
            portfolio_vega_dollar_micro: new bn_js_1.default(obj.portfolio_vega_dollar_micro),
            portfolio_theta_day_micro: new bn_js_1.default(obj.portfolio_theta_day_micro),
        });
    }
    toEncodable() {
        return MarginCalculated.toEncodable(this);
    }
}
exports.MarginCalculated = MarginCalculated;
//# sourceMappingURL=MarginCalculated.js.map