import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionMetadataRegisteredFields {
    option: PublicKey;
    metadata_pda: PublicKey;
    registered_at: BN;
    registered_by: PublicKey;
}
export interface OptionMetadataRegisteredJSON {
    option: string;
    metadata_pda: string;
    registered_at: string;
    registered_by: string;
}
export declare class OptionMetadataRegistered {
    readonly option: PublicKey;
    readonly metadata_pda: PublicKey;
    readonly registered_at: BN;
    readonly registered_by: PublicKey;
    constructor(fields: OptionMetadataRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionMetadataRegistered;
    static toEncodable(fields: OptionMetadataRegisteredFields): {
        option: PublicKey;
        metadata_pda: PublicKey;
        registered_at: BN;
        registered_by: PublicKey;
    };
    toJSON(): OptionMetadataRegisteredJSON;
    static fromJSON(obj: OptionMetadataRegisteredJSON): OptionMetadataRegistered;
    toEncodable(): {
        option: PublicKey;
        metadata_pda: PublicKey;
        registered_at: BN;
        registered_by: PublicKey;
    };
}
//# sourceMappingURL=OptionMetadataRegistered.d.ts.map