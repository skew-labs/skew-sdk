import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface HamiltonStateUpdatedFields {
    hamilton_state: PublicKey;
    asset: number;
    last_update_slot: BN;
    pi_calm_micro: BN;
    pi_stress_micro: BN;
    consecutive_stress_days: number;
    consecutive_calm_days: number;
}
export interface HamiltonStateUpdatedJSON {
    hamilton_state: string;
    asset: number;
    last_update_slot: string;
    pi_calm_micro: string;
    pi_stress_micro: string;
    consecutive_stress_days: number;
    consecutive_calm_days: number;
}
export declare class HamiltonStateUpdated {
    readonly hamilton_state: PublicKey;
    readonly asset: number;
    readonly last_update_slot: BN;
    readonly pi_calm_micro: BN;
    readonly pi_stress_micro: BN;
    readonly consecutive_stress_days: number;
    readonly consecutive_calm_days: number;
    constructor(fields: HamiltonStateUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.HamiltonStateUpdated;
    static toEncodable(fields: HamiltonStateUpdatedFields): {
        hamilton_state: PublicKey;
        asset: number;
        last_update_slot: BN;
        pi_calm_micro: BN;
        pi_stress_micro: BN;
        consecutive_stress_days: number;
        consecutive_calm_days: number;
    };
    toJSON(): HamiltonStateUpdatedJSON;
    static fromJSON(obj: HamiltonStateUpdatedJSON): HamiltonStateUpdated;
    toEncodable(): {
        hamilton_state: PublicKey;
        asset: number;
        last_update_slot: BN;
        pi_calm_micro: BN;
        pi_stress_micro: BN;
        consecutive_stress_days: number;
        consecutive_calm_days: number;
    };
}
//# sourceMappingURL=HamiltonStateUpdated.d.ts.map