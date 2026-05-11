import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentRegisteredFields {
    combo: PublicKey;
    buyer: PublicKey;
    combo_id: BN;
    n_legs: number;
    total_max_premium_micro: BN;
    expiry_ts: BN;
    created_at: BN;
}
export interface ComboIntentRegisteredJSON {
    combo: string;
    buyer: string;
    combo_id: string;
    n_legs: number;
    total_max_premium_micro: string;
    expiry_ts: string;
    created_at: string;
}
export declare class ComboIntentRegistered {
    readonly combo: PublicKey;
    readonly buyer: PublicKey;
    readonly combo_id: BN;
    readonly n_legs: number;
    readonly total_max_premium_micro: BN;
    readonly expiry_ts: BN;
    readonly created_at: BN;
    constructor(fields: ComboIntentRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentRegistered;
    static toEncodable(fields: ComboIntentRegisteredFields): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        n_legs: number;
        total_max_premium_micro: BN;
        expiry_ts: BN;
        created_at: BN;
    };
    toJSON(): ComboIntentRegisteredJSON;
    static fromJSON(obj: ComboIntentRegisteredJSON): ComboIntentRegistered;
    toEncodable(): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        n_legs: number;
        total_max_premium_micro: BN;
        expiry_ts: BN;
        created_at: BN;
    };
}
//# sourceMappingURL=ComboIntentRegistered.d.ts.map