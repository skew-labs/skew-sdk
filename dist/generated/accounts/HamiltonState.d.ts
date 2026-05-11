import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface HamiltonStateFields {
    asset: number;
    bump: number;
    padding_0: Array<number>;
    last_update_slot: BN;
    pi_calm_micro: BN;
    pi_stress_micro: BN;
    mu_calm_micro: BN;
    mu_stress_micro: BN;
    sigma_calm_micro: BN;
    sigma_stress_micro: BN;
    p01_micro: BN;
    p10_micro: BN;
    consecutive_stress_days: number;
    consecutive_calm_days: number;
}
export interface HamiltonStateJSON {
    asset: number;
    bump: number;
    padding_0: Array<number>;
    last_update_slot: string;
    pi_calm_micro: string;
    pi_stress_micro: string;
    mu_calm_micro: string;
    mu_stress_micro: string;
    sigma_calm_micro: string;
    sigma_stress_micro: string;
    p01_micro: string;
    p10_micro: string;
    consecutive_stress_days: number;
    consecutive_calm_days: number;
}
export declare class HamiltonState {
    readonly asset: number;
    readonly bump: number;
    readonly padding_0: Array<number>;
    readonly last_update_slot: BN;
    readonly pi_calm_micro: BN;
    readonly pi_stress_micro: BN;
    readonly mu_calm_micro: BN;
    readonly mu_stress_micro: BN;
    readonly sigma_calm_micro: BN;
    readonly sigma_stress_micro: BN;
    readonly p01_micro: BN;
    readonly p10_micro: BN;
    readonly consecutive_stress_days: number;
    readonly consecutive_calm_days: number;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: HamiltonStateFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<HamiltonState | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<HamiltonState | null>>;
    static decode(data: Buffer): HamiltonState;
    toJSON(): HamiltonStateJSON;
    static fromJSON(obj: HamiltonStateJSON): HamiltonState;
}
//# sourceMappingURL=HamiltonState.d.ts.map