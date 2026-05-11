import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MarginCalculatedFields {
    cm: PublicKey;
    owner: PublicKey;
    max_loss_usdc: BN;
    position_count: number;
    calculated_at: BN;
    base_im_micro: BN;
    scan_risk_micro: BN;
    boundary_micro: BN;
    l_a_applied_bps: number;
    c_p_applied_bps: number;
    tail_addon_micro: BN;
    icc_credit_micro: BN;
    portfolio_delta_dollar_micro: BN;
    portfolio_gamma_dollar_micro: BN;
    portfolio_vega_dollar_micro: BN;
    portfolio_theta_day_micro: BN;
}
export interface MarginCalculatedJSON {
    cm: string;
    owner: string;
    max_loss_usdc: string;
    position_count: number;
    calculated_at: string;
    base_im_micro: string;
    scan_risk_micro: string;
    boundary_micro: string;
    l_a_applied_bps: number;
    c_p_applied_bps: number;
    tail_addon_micro: string;
    icc_credit_micro: string;
    portfolio_delta_dollar_micro: string;
    portfolio_gamma_dollar_micro: string;
    portfolio_vega_dollar_micro: string;
    portfolio_theta_day_micro: string;
}
export declare class MarginCalculated {
    readonly cm: PublicKey;
    readonly owner: PublicKey;
    readonly max_loss_usdc: BN;
    readonly position_count: number;
    readonly calculated_at: BN;
    readonly base_im_micro: BN;
    readonly scan_risk_micro: BN;
    readonly boundary_micro: BN;
    readonly l_a_applied_bps: number;
    readonly c_p_applied_bps: number;
    readonly tail_addon_micro: BN;
    readonly icc_credit_micro: BN;
    readonly portfolio_delta_dollar_micro: BN;
    readonly portfolio_gamma_dollar_micro: BN;
    readonly portfolio_vega_dollar_micro: BN;
    readonly portfolio_theta_day_micro: BN;
    constructor(fields: MarginCalculatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MarginCalculated;
    static toEncodable(fields: MarginCalculatedFields): {
        cm: PublicKey;
        owner: PublicKey;
        max_loss_usdc: BN;
        position_count: number;
        calculated_at: BN;
        base_im_micro: BN;
        scan_risk_micro: BN;
        boundary_micro: BN;
        l_a_applied_bps: number;
        c_p_applied_bps: number;
        tail_addon_micro: BN;
        icc_credit_micro: BN;
        portfolio_delta_dollar_micro: BN;
        portfolio_gamma_dollar_micro: BN;
        portfolio_vega_dollar_micro: BN;
        portfolio_theta_day_micro: BN;
    };
    toJSON(): MarginCalculatedJSON;
    static fromJSON(obj: MarginCalculatedJSON): MarginCalculated;
    toEncodable(): {
        cm: PublicKey;
        owner: PublicKey;
        max_loss_usdc: BN;
        position_count: number;
        calculated_at: BN;
        base_im_micro: BN;
        scan_risk_micro: BN;
        boundary_micro: BN;
        l_a_applied_bps: number;
        c_p_applied_bps: number;
        tail_addon_micro: BN;
        icc_credit_micro: BN;
        portfolio_delta_dollar_micro: BN;
        portfolio_gamma_dollar_micro: BN;
        portfolio_vega_dollar_micro: BN;
        portfolio_theta_day_micro: BN;
    };
}
//# sourceMappingURL=MarginCalculated.d.ts.map