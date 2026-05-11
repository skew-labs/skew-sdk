import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CollateralPolicyEntryFields {
    mint: PublicKey;
    decimals: number;
    kind: number;
    oracle_feed: PublicKey;
    max_depeg_bps: number;
    padding: Array<number>;
}
export interface CollateralPolicyEntryJSON {
    mint: string;
    decimals: number;
    kind: number;
    oracle_feed: string;
    max_depeg_bps: number;
    padding: Array<number>;
}
export declare class CollateralPolicyEntry {
    readonly mint: PublicKey;
    readonly decimals: number;
    readonly kind: number;
    readonly oracle_feed: PublicKey;
    readonly max_depeg_bps: number;
    readonly padding: Array<number>;
    constructor(fields: CollateralPolicyEntryFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CollateralPolicyEntry;
    static toEncodable(fields: CollateralPolicyEntryFields): {
        mint: PublicKey;
        decimals: number;
        kind: number;
        oracle_feed: PublicKey;
        max_depeg_bps: number;
        padding: number[];
    };
    toJSON(): CollateralPolicyEntryJSON;
    static fromJSON(obj: CollateralPolicyEntryJSON): CollateralPolicyEntry;
    toEncodable(): {
        mint: PublicKey;
        decimals: number;
        kind: number;
        oracle_feed: PublicKey;
        max_depeg_bps: number;
        padding: number[];
    };
}
//# sourceMappingURL=CollateralPolicyEntry.d.ts.map