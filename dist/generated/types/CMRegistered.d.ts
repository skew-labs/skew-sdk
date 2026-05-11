import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CMRegisteredFields {
    cm: PublicKey;
    authority: PublicKey;
    initial_collateral: BN;
    registered_at: BN;
}
export interface CMRegisteredJSON {
    cm: string;
    authority: string;
    initial_collateral: string;
    registered_at: string;
}
export declare class CMRegistered {
    readonly cm: PublicKey;
    readonly authority: PublicKey;
    readonly initial_collateral: BN;
    readonly registered_at: BN;
    constructor(fields: CMRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CMRegistered;
    static toEncodable(fields: CMRegisteredFields): {
        cm: PublicKey;
        authority: PublicKey;
        initial_collateral: BN;
        registered_at: BN;
    };
    toJSON(): CMRegisteredJSON;
    static fromJSON(obj: CMRegisteredJSON): CMRegistered;
    toEncodable(): {
        cm: PublicKey;
        authority: PublicKey;
        initial_collateral: BN;
        registered_at: BN;
    };
}
//# sourceMappingURL=CMRegistered.d.ts.map