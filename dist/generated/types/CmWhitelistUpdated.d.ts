import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CmWhitelistUpdatedFields {
    cm: PublicKey;
    authority: PublicKey;
    whitelist_count: number;
    replace_all: boolean;
    updated_at: BN;
}
export interface CmWhitelistUpdatedJSON {
    cm: string;
    authority: string;
    whitelist_count: number;
    replace_all: boolean;
    updated_at: string;
}
export declare class CmWhitelistUpdated {
    readonly cm: PublicKey;
    readonly authority: PublicKey;
    readonly whitelist_count: number;
    readonly replace_all: boolean;
    readonly updated_at: BN;
    constructor(fields: CmWhitelistUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CmWhitelistUpdated;
    static toEncodable(fields: CmWhitelistUpdatedFields): {
        cm: PublicKey;
        authority: PublicKey;
        whitelist_count: number;
        replace_all: boolean;
        updated_at: BN;
    };
    toJSON(): CmWhitelistUpdatedJSON;
    static fromJSON(obj: CmWhitelistUpdatedJSON): CmWhitelistUpdated;
    toEncodable(): {
        cm: PublicKey;
        authority: PublicKey;
        whitelist_count: number;
        replace_all: boolean;
        updated_at: BN;
    };
}
//# sourceMappingURL=CmWhitelistUpdated.d.ts.map