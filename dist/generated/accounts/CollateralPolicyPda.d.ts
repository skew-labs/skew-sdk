import { PublicKey, Connection } from "@solana/web3.js";
import * as types from "../types";
export interface CollateralPolicyPdaFields {
    bump: number;
    entry_count: number;
    padding: Array<number>;
    entries: Array<types.CollateralPolicyEntryFields>;
}
export interface CollateralPolicyPdaJSON {
    bump: number;
    entry_count: number;
    padding: Array<number>;
    entries: Array<types.CollateralPolicyEntryJSON>;
}
export declare class CollateralPolicyPda {
    readonly bump: number;
    readonly entry_count: number;
    readonly padding: Array<number>;
    readonly entries: Array<types.CollateralPolicyEntry>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: CollateralPolicyPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<CollateralPolicyPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<CollateralPolicyPda | null>>;
    static decode(data: Buffer): CollateralPolicyPda;
    toJSON(): CollateralPolicyPdaJSON;
    static fromJSON(obj: CollateralPolicyPdaJSON): CollateralPolicyPda;
}
//# sourceMappingURL=CollateralPolicyPda.d.ts.map