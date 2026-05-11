import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface NativeSolVaultInitializedFields {
    vault: PublicKey;
    user: PublicKey;
    initialized_at: BN;
}
export interface NativeSolVaultInitializedJSON {
    vault: string;
    user: string;
    initialized_at: string;
}
export declare class NativeSolVaultInitialized {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly initialized_at: BN;
    constructor(fields: NativeSolVaultInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.NativeSolVaultInitialized;
    static toEncodable(fields: NativeSolVaultInitializedFields): {
        vault: PublicKey;
        user: PublicKey;
        initialized_at: BN;
    };
    toJSON(): NativeSolVaultInitializedJSON;
    static fromJSON(obj: NativeSolVaultInitializedJSON): NativeSolVaultInitialized;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        initialized_at: BN;
    };
}
//# sourceMappingURL=NativeSolVaultInitialized.d.ts.map