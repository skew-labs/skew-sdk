import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PoVSStateUpdatedFields {
    povs_state: PublicKey;
    asset: number;
    last_update_slot: BN;
    sigma_t_micro: BN;
    sigma_inf_micro: BN;
    theta_d_micro: BN;
    vrp_rel_micro: BN;
    iv_micro: BN;
    xi_micro: BN;
    regime_indicator_micro: BN;
}
export interface PoVSStateUpdatedJSON {
    povs_state: string;
    asset: number;
    last_update_slot: string;
    sigma_t_micro: string;
    sigma_inf_micro: string;
    theta_d_micro: string;
    vrp_rel_micro: string;
    iv_micro: string;
    xi_micro: string;
    regime_indicator_micro: string;
}
export declare class PoVSStateUpdated {
    readonly povs_state: PublicKey;
    readonly asset: number;
    readonly last_update_slot: BN;
    readonly sigma_t_micro: BN;
    readonly sigma_inf_micro: BN;
    readonly theta_d_micro: BN;
    readonly vrp_rel_micro: BN;
    readonly iv_micro: BN;
    readonly xi_micro: BN;
    readonly regime_indicator_micro: BN;
    constructor(fields: PoVSStateUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PoVSStateUpdated;
    static toEncodable(fields: PoVSStateUpdatedFields): {
        povs_state: PublicKey;
        asset: number;
        last_update_slot: BN;
        sigma_t_micro: BN;
        sigma_inf_micro: BN;
        theta_d_micro: BN;
        vrp_rel_micro: BN;
        iv_micro: BN;
        xi_micro: BN;
        regime_indicator_micro: BN;
    };
    toJSON(): PoVSStateUpdatedJSON;
    static fromJSON(obj: PoVSStateUpdatedJSON): PoVSStateUpdated;
    toEncodable(): {
        povs_state: PublicKey;
        asset: number;
        last_update_slot: BN;
        sigma_t_micro: BN;
        sigma_inf_micro: BN;
        theta_d_micro: BN;
        vrp_rel_micro: BN;
        iv_micro: BN;
        xi_micro: BN;
        regime_indicator_micro: BN;
    };
}
//# sourceMappingURL=PoVSStateUpdated.d.ts.map