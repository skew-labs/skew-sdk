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
exports.CmRiskCacheV1 = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js")); // eslint-disable-line @typescript-eslint/no-unused-vars
const borsh = __importStar(require("@coral-xyz/borsh")); // eslint-disable-line @typescript-eslint/no-unused-vars
const programId_1 = require("../programId");
class CmRiskCacheV1 {
    constructor(fields) {
        this.cm = fields.cm;
        this.authority = fields.authority;
        this.registry_hash = fields.registry_hash;
        this.registry_count = fields.registry_count;
        this.dirty = fields.dirty;
        this.dirty_reason = fields.dirty_reason;
        this.bump = fields.bump;
        this.model_version = fields.model_version;
        this.l_a_applied_bps = fields.l_a_applied_bps;
        this.c_p_applied_bps = fields.c_p_applied_bps;
        this.stress_active = fields.stress_active;
        this.padding0 = fields.padding0;
        this.risk_epoch = fields.risk_epoch;
        this.snapshot_slot = fields.snapshot_slot;
        this.snapshot_ts = fields.snapshot_ts;
        this.cached_im_micro = fields.cached_im_micro;
        this.cached_mm_micro = fields.cached_mm_micro;
        this.free_collateral_micro = fields.free_collateral_micro;
        this.base_im_micro = fields.base_im_micro;
        this.scan_risk_micro = fields.scan_risk_micro;
        this.boundary_micro = fields.boundary_micro;
        this.tail_addon_micro = fields.tail_addon_micro;
        this.icc_credit_micro = fields.icc_credit_micro;
        this.wrong_way_addon_micro = fields.wrong_way_addon_micro;
        this.yield_rho_addon_micro = fields.yield_rho_addon_micro;
        this.standard_im_micro = fields.standard_im_micro;
        this.tier_candidate_micro = fields.tier_candidate_micro;
        this.m_signed = fields.m_signed;
        this.v0_signed = fields.v0_signed;
        this.delta_dollar_per_asset = fields.delta_dollar_per_asset;
        this.gamma_dollar_per_asset = fields.gamma_dollar_per_asset;
        this.vega_dollar_per_asset = fields.vega_dollar_per_asset;
        this.theta_day_per_asset = fields.theta_day_per_asset;
        this.g_p_sq_per_asset = fields.g_p_sq_per_asset;
        this.volga_dollar_per_asset = fields.volga_dollar_per_asset;
        this.vanna_dollar_per_asset = fields.vanna_dollar_per_asset;
        this.short_vega_per_asset = fields.short_vega_per_asset;
        this.notional_per_asset = fields.notional_per_asset;
        this.short_notional_per_asset = fields.short_notional_per_asset;
        this.short_vega_total = fields.short_vega_total;
        this.gross_vega_total = fields.gross_vega_total;
        this.max_strike_vega = fields.max_strike_vega;
        this.povs_xi = fields.povs_xi;
        this.povs_var_99 = fields.povs_var_99;
        this.povs_es_999 = fields.povs_es_999;
        this.povs_found_mask = fields.povs_found_mask;
        this.hamilton_pi_stress = fields.hamilton_pi_stress;
        this.hamilton_found_mask = fields.hamilton_found_mask;
        this.reserved = fields.reserved;
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
        if (!data.slice(0, 8).equals(CmRiskCacheV1.discriminator)) {
            throw new Error("invalid account discriminator");
        }
        const dec = CmRiskCacheV1.layout.decode(data.slice(8));
        return new CmRiskCacheV1({
            cm: dec.cm,
            authority: dec.authority,
            registry_hash: dec.registry_hash,
            registry_count: dec.registry_count,
            dirty: dec.dirty,
            dirty_reason: dec.dirty_reason,
            bump: dec.bump,
            model_version: dec.model_version,
            l_a_applied_bps: dec.l_a_applied_bps,
            c_p_applied_bps: dec.c_p_applied_bps,
            stress_active: dec.stress_active,
            padding0: dec.padding0,
            risk_epoch: dec.risk_epoch,
            snapshot_slot: dec.snapshot_slot,
            snapshot_ts: dec.snapshot_ts,
            cached_im_micro: dec.cached_im_micro,
            cached_mm_micro: dec.cached_mm_micro,
            free_collateral_micro: dec.free_collateral_micro,
            base_im_micro: dec.base_im_micro,
            scan_risk_micro: dec.scan_risk_micro,
            boundary_micro: dec.boundary_micro,
            tail_addon_micro: dec.tail_addon_micro,
            icc_credit_micro: dec.icc_credit_micro,
            wrong_way_addon_micro: dec.wrong_way_addon_micro,
            yield_rho_addon_micro: dec.yield_rho_addon_micro,
            standard_im_micro: dec.standard_im_micro,
            tier_candidate_micro: dec.tier_candidate_micro,
            m_signed: dec.m_signed,
            v0_signed: dec.v0_signed,
            delta_dollar_per_asset: dec.delta_dollar_per_asset,
            gamma_dollar_per_asset: dec.gamma_dollar_per_asset,
            vega_dollar_per_asset: dec.vega_dollar_per_asset,
            theta_day_per_asset: dec.theta_day_per_asset,
            g_p_sq_per_asset: dec.g_p_sq_per_asset,
            volga_dollar_per_asset: dec.volga_dollar_per_asset,
            vanna_dollar_per_asset: dec.vanna_dollar_per_asset,
            short_vega_per_asset: dec.short_vega_per_asset,
            notional_per_asset: dec.notional_per_asset,
            short_notional_per_asset: dec.short_notional_per_asset,
            short_vega_total: dec.short_vega_total,
            gross_vega_total: dec.gross_vega_total,
            max_strike_vega: dec.max_strike_vega,
            povs_xi: dec.povs_xi,
            povs_var_99: dec.povs_var_99,
            povs_es_999: dec.povs_es_999,
            povs_found_mask: dec.povs_found_mask,
            hamilton_pi_stress: dec.hamilton_pi_stress,
            hamilton_found_mask: dec.hamilton_found_mask,
            reserved: dec.reserved,
        });
    }
    toJSON() {
        return {
            cm: this.cm.toString(),
            authority: this.authority.toString(),
            registry_hash: this.registry_hash,
            registry_count: this.registry_count,
            dirty: this.dirty,
            dirty_reason: this.dirty_reason,
            bump: this.bump,
            model_version: this.model_version,
            l_a_applied_bps: this.l_a_applied_bps,
            c_p_applied_bps: this.c_p_applied_bps,
            stress_active: this.stress_active,
            padding0: this.padding0,
            risk_epoch: this.risk_epoch.toString(),
            snapshot_slot: this.snapshot_slot.toString(),
            snapshot_ts: this.snapshot_ts.toString(),
            cached_im_micro: this.cached_im_micro.toString(),
            cached_mm_micro: this.cached_mm_micro.toString(),
            free_collateral_micro: this.free_collateral_micro.toString(),
            base_im_micro: this.base_im_micro.toString(),
            scan_risk_micro: this.scan_risk_micro.toString(),
            boundary_micro: this.boundary_micro.toString(),
            tail_addon_micro: this.tail_addon_micro.toString(),
            icc_credit_micro: this.icc_credit_micro.toString(),
            wrong_way_addon_micro: this.wrong_way_addon_micro.toString(),
            yield_rho_addon_micro: this.yield_rho_addon_micro.toString(),
            standard_im_micro: this.standard_im_micro.toString(),
            tier_candidate_micro: this.tier_candidate_micro.toString(),
            m_signed: this.m_signed,
            v0_signed: this.v0_signed,
            delta_dollar_per_asset: this.delta_dollar_per_asset,
            gamma_dollar_per_asset: this.gamma_dollar_per_asset,
            vega_dollar_per_asset: this.vega_dollar_per_asset,
            theta_day_per_asset: this.theta_day_per_asset,
            g_p_sq_per_asset: this.g_p_sq_per_asset,
            volga_dollar_per_asset: this.volga_dollar_per_asset,
            vanna_dollar_per_asset: this.vanna_dollar_per_asset,
            short_vega_per_asset: this.short_vega_per_asset,
            notional_per_asset: this.notional_per_asset,
            short_notional_per_asset: this.short_notional_per_asset,
            short_vega_total: this.short_vega_total,
            gross_vega_total: this.gross_vega_total,
            max_strike_vega: this.max_strike_vega,
            povs_xi: this.povs_xi.map((item) => item.toString()),
            povs_var_99: this.povs_var_99.map((item) => item.toString()),
            povs_es_999: this.povs_es_999.map((item) => item.toString()),
            povs_found_mask: this.povs_found_mask,
            hamilton_pi_stress: this.hamilton_pi_stress.map((item) => item.toString()),
            hamilton_found_mask: this.hamilton_found_mask,
            reserved: this.reserved,
        };
    }
    static fromJSON(obj) {
        return new CmRiskCacheV1({
            cm: new web3_js_1.PublicKey(obj.cm),
            authority: new web3_js_1.PublicKey(obj.authority),
            registry_hash: obj.registry_hash,
            registry_count: obj.registry_count,
            dirty: obj.dirty,
            dirty_reason: obj.dirty_reason,
            bump: obj.bump,
            model_version: obj.model_version,
            l_a_applied_bps: obj.l_a_applied_bps,
            c_p_applied_bps: obj.c_p_applied_bps,
            stress_active: obj.stress_active,
            padding0: obj.padding0,
            risk_epoch: new bn_js_1.default(obj.risk_epoch),
            snapshot_slot: new bn_js_1.default(obj.snapshot_slot),
            snapshot_ts: new bn_js_1.default(obj.snapshot_ts),
            cached_im_micro: new bn_js_1.default(obj.cached_im_micro),
            cached_mm_micro: new bn_js_1.default(obj.cached_mm_micro),
            free_collateral_micro: new bn_js_1.default(obj.free_collateral_micro),
            base_im_micro: new bn_js_1.default(obj.base_im_micro),
            scan_risk_micro: new bn_js_1.default(obj.scan_risk_micro),
            boundary_micro: new bn_js_1.default(obj.boundary_micro),
            tail_addon_micro: new bn_js_1.default(obj.tail_addon_micro),
            icc_credit_micro: new bn_js_1.default(obj.icc_credit_micro),
            wrong_way_addon_micro: new bn_js_1.default(obj.wrong_way_addon_micro),
            yield_rho_addon_micro: new bn_js_1.default(obj.yield_rho_addon_micro),
            standard_im_micro: new bn_js_1.default(obj.standard_im_micro),
            tier_candidate_micro: new bn_js_1.default(obj.tier_candidate_micro),
            m_signed: obj.m_signed,
            v0_signed: obj.v0_signed,
            delta_dollar_per_asset: obj.delta_dollar_per_asset,
            gamma_dollar_per_asset: obj.gamma_dollar_per_asset,
            vega_dollar_per_asset: obj.vega_dollar_per_asset,
            theta_day_per_asset: obj.theta_day_per_asset,
            g_p_sq_per_asset: obj.g_p_sq_per_asset,
            volga_dollar_per_asset: obj.volga_dollar_per_asset,
            vanna_dollar_per_asset: obj.vanna_dollar_per_asset,
            short_vega_per_asset: obj.short_vega_per_asset,
            notional_per_asset: obj.notional_per_asset,
            short_notional_per_asset: obj.short_notional_per_asset,
            short_vega_total: obj.short_vega_total,
            gross_vega_total: obj.gross_vega_total,
            max_strike_vega: obj.max_strike_vega,
            povs_xi: obj.povs_xi.map((item) => new bn_js_1.default(item)),
            povs_var_99: obj.povs_var_99.map((item) => new bn_js_1.default(item)),
            povs_es_999: obj.povs_es_999.map((item) => new bn_js_1.default(item)),
            povs_found_mask: obj.povs_found_mask,
            hamilton_pi_stress: obj.hamilton_pi_stress.map((item) => new bn_js_1.default(item)),
            hamilton_found_mask: obj.hamilton_found_mask,
            reserved: obj.reserved,
        });
    }
}
exports.CmRiskCacheV1 = CmRiskCacheV1;
CmRiskCacheV1.discriminator = Buffer.from([
    143, 254, 193, 133, 232, 249, 187, 250,
]);
CmRiskCacheV1.layout = borsh.struct([
    borsh.publicKey("cm"),
    borsh.publicKey("authority"),
    borsh.array(borsh.u8(), 32, "registry_hash"),
    borsh.u8("registry_count"),
    borsh.u8("dirty"),
    borsh.u8("dirty_reason"),
    borsh.u8("bump"),
    borsh.u16("model_version"),
    borsh.u16("l_a_applied_bps"),
    borsh.u16("c_p_applied_bps"),
    borsh.u8("stress_active"),
    borsh.u8("padding0"),
    borsh.u64("risk_epoch"),
    borsh.u64("snapshot_slot"),
    borsh.i64("snapshot_ts"),
    borsh.u64("cached_im_micro"),
    borsh.u64("cached_mm_micro"),
    borsh.u64("free_collateral_micro"),
    borsh.u64("base_im_micro"),
    borsh.u64("scan_risk_micro"),
    borsh.u64("boundary_micro"),
    borsh.u64("tail_addon_micro"),
    borsh.u64("icc_credit_micro"),
    borsh.u64("wrong_way_addon_micro"),
    borsh.u64("yield_rho_addon_micro"),
    borsh.u64("standard_im_micro"),
    borsh.u64("tier_candidate_micro"),
    borsh.f64("m_signed"),
    borsh.f64("v0_signed"),
    borsh.array(borsh.f64(), 5, "delta_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "gamma_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "vega_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "theta_day_per_asset"),
    borsh.array(borsh.f64(), 5, "g_p_sq_per_asset"),
    borsh.array(borsh.f64(), 5, "volga_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "vanna_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "short_vega_per_asset"),
    borsh.array(borsh.f64(), 5, "notional_per_asset"),
    borsh.array(borsh.f64(), 5, "short_notional_per_asset"),
    borsh.f64("short_vega_total"),
    borsh.f64("gross_vega_total"),
    borsh.f64("max_strike_vega"),
    borsh.array(borsh.i64(), 5, "povs_xi"),
    borsh.array(borsh.u64(), 5, "povs_var_99"),
    borsh.array(borsh.u64(), 5, "povs_es_999"),
    borsh.u8("povs_found_mask"),
    borsh.array(borsh.u64(), 5, "hamilton_pi_stress"),
    borsh.u8("hamilton_found_mask"),
    borsh.array(borsh.u8(), 63, "reserved"),
]);
//# sourceMappingURL=CmRiskCacheV1.js.map