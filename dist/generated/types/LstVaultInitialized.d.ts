import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface LstVaultInitializedFields {
    vault: PublicKey;
    user: PublicKey;
    lst_mint: PublicKey;
    initialized_at: BN;
}
export interface LstVaultInitializedJSON {
    vault: string;
    user: string;
    lst_mint: string;
    initialized_at: string;
}
export declare class LstVaultInitialized {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly lst_mint: PublicKey;
    readonly initialized_at: BN;
    constructor(fields: LstVaultInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LstVaultInitialized;
    static toEncodable(fields: LstVaultInitializedFields): {
        vault: PublicKey;
        user: PublicKey;
        lst_mint: PublicKey;
        initialized_at: BN;
    };
    toJSON(): LstVaultInitializedJSON;
    static fromJSON(obj: LstVaultInitializedJSON): LstVaultInitialized;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        lst_mint: PublicKey;
        initialized_at: BN;
    };
}
//# sourceMappingURL=LstVaultInitialized.d.ts.map