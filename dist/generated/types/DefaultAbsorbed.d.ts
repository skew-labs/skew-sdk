import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface DefaultAbsorbedFields {
    defaulting_cm: PublicKey;
    tier: number;
    amount: BN;
    remaining: BN;
    absorbed_at: BN;
}
export interface DefaultAbsorbedJSON {
    defaulting_cm: string;
    tier: number;
    amount: string;
    remaining: string;
    absorbed_at: string;
}
export declare class DefaultAbsorbed {
    readonly defaulting_cm: PublicKey;
    readonly tier: number;
    readonly amount: BN;
    readonly remaining: BN;
    readonly absorbed_at: BN;
    constructor(fields: DefaultAbsorbedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.DefaultAbsorbed;
    static toEncodable(fields: DefaultAbsorbedFields): {
        defaulting_cm: PublicKey;
        tier: number;
        amount: BN;
        remaining: BN;
        absorbed_at: BN;
    };
    toJSON(): DefaultAbsorbedJSON;
    static fromJSON(obj: DefaultAbsorbedJSON): DefaultAbsorbed;
    toEncodable(): {
        defaulting_cm: PublicKey;
        tier: number;
        amount: BN;
        remaining: BN;
        absorbed_at: BN;
    };
}
//# sourceMappingURL=DefaultAbsorbed.d.ts.map