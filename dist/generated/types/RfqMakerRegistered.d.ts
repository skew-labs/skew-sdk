import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqMakerRegisteredFields {
    mm: PublicKey;
    deposit_lamports: BN;
    registered_at: BN;
}
export interface RfqMakerRegisteredJSON {
    mm: string;
    deposit_lamports: string;
    registered_at: string;
}
export declare class RfqMakerRegistered {
    readonly mm: PublicKey;
    readonly deposit_lamports: BN;
    readonly registered_at: BN;
    constructor(fields: RfqMakerRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqMakerRegistered;
    static toEncodable(fields: RfqMakerRegisteredFields): {
        mm: PublicKey;
        deposit_lamports: BN;
        registered_at: BN;
    };
    toJSON(): RfqMakerRegisteredJSON;
    static fromJSON(obj: RfqMakerRegisteredJSON): RfqMakerRegistered;
    toEncodable(): {
        mm: PublicKey;
        deposit_lamports: BN;
        registered_at: BN;
    };
}
//# sourceMappingURL=RfqMakerRegistered.d.ts.map