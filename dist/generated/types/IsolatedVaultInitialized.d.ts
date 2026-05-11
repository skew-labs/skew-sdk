import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface IsolatedVaultInitializedFields {
    vault: PublicKey;
    user: PublicKey;
    option: PublicKey;
    initialized_at: BN;
}
export interface IsolatedVaultInitializedJSON {
    vault: string;
    user: string;
    option: string;
    initialized_at: string;
}
export declare class IsolatedVaultInitialized {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly option: PublicKey;
    readonly initialized_at: BN;
    constructor(fields: IsolatedVaultInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IsolatedVaultInitialized;
    static toEncodable(fields: IsolatedVaultInitializedFields): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        initialized_at: BN;
    };
    toJSON(): IsolatedVaultInitializedJSON;
    static fromJSON(obj: IsolatedVaultInitializedJSON): IsolatedVaultInitialized;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        initialized_at: BN;
    };
}
//# sourceMappingURL=IsolatedVaultInitialized.d.ts.map