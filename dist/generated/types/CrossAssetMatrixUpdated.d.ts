import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CrossAssetMatrixUpdatedFields {
    matrix: PublicKey;
    last_update_slot: BN;
    rho_p5_bps: Array<number>;
}
export interface CrossAssetMatrixUpdatedJSON {
    matrix: string;
    last_update_slot: string;
    rho_p5_bps: Array<number>;
}
export declare class CrossAssetMatrixUpdated {
    readonly matrix: PublicKey;
    readonly last_update_slot: BN;
    readonly rho_p5_bps: Array<number>;
    constructor(fields: CrossAssetMatrixUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CrossAssetMatrixUpdated;
    static toEncodable(fields: CrossAssetMatrixUpdatedFields): {
        matrix: PublicKey;
        last_update_slot: BN;
        rho_p5_bps: number[];
    };
    toJSON(): CrossAssetMatrixUpdatedJSON;
    static fromJSON(obj: CrossAssetMatrixUpdatedJSON): CrossAssetMatrixUpdated;
    toEncodable(): {
        matrix: PublicKey;
        last_update_slot: BN;
        rho_p5_bps: number[];
    };
}
//# sourceMappingURL=CrossAssetMatrixUpdated.d.ts.map