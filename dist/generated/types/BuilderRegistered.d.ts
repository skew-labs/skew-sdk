import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface BuilderRegisteredFields {
    builder_code_pda: PublicKey;
    builder: PublicKey;
    deposit_locked: BN;
    label: Array<number>;
    registered_at: BN;
}
export interface BuilderRegisteredJSON {
    builder_code_pda: string;
    builder: string;
    deposit_locked: string;
    label: Array<number>;
    registered_at: string;
}
export declare class BuilderRegistered {
    readonly builder_code_pda: PublicKey;
    readonly builder: PublicKey;
    readonly deposit_locked: BN;
    readonly label: Array<number>;
    readonly registered_at: BN;
    constructor(fields: BuilderRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BuilderRegistered;
    static toEncodable(fields: BuilderRegisteredFields): {
        builder_code_pda: PublicKey;
        builder: PublicKey;
        deposit_locked: BN;
        label: number[];
        registered_at: BN;
    };
    toJSON(): BuilderRegisteredJSON;
    static fromJSON(obj: BuilderRegisteredJSON): BuilderRegistered;
    toEncodable(): {
        builder_code_pda: PublicKey;
        builder: PublicKey;
        deposit_locked: BN;
        label: number[];
        registered_at: BN;
    };
}
//# sourceMappingURL=BuilderRegistered.d.ts.map