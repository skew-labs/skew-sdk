import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface CrossAssetMatrixFields {
    last_fit_slot: BN;
    icc_rho_p5_micro: Array<number>;
    stress_rho_micro: Array<number>;
    last_pearson_slot: BN;
    last_stress_slot: BN;
    bump: number;
    padding_0: Array<number>;
}
export interface CrossAssetMatrixJSON {
    last_fit_slot: string;
    icc_rho_p5_micro: Array<number>;
    stress_rho_micro: Array<number>;
    last_pearson_slot: string;
    last_stress_slot: string;
    bump: number;
    padding_0: Array<number>;
}
export declare class CrossAssetMatrix {
    readonly last_fit_slot: BN;
    readonly icc_rho_p5_micro: Array<number>;
    readonly stress_rho_micro: Array<number>;
    readonly last_pearson_slot: BN;
    readonly last_stress_slot: BN;
    readonly bump: number;
    readonly padding_0: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: CrossAssetMatrixFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<CrossAssetMatrix | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<CrossAssetMatrix | null>>;
    static decode(data: Buffer): CrossAssetMatrix;
    toJSON(): CrossAssetMatrixJSON;
    static fromJSON(obj: CrossAssetMatrixJSON): CrossAssetMatrix;
}
//# sourceMappingURL=CrossAssetMatrix.d.ts.map