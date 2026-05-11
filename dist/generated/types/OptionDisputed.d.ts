import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionDisputedFields {
    option: PublicKey;
    creator: PublicKey;
    disputed_at: BN;
}
export interface OptionDisputedJSON {
    option: string;
    creator: string;
    disputed_at: string;
}
export declare class OptionDisputed {
    readonly option: PublicKey;
    readonly creator: PublicKey;
    readonly disputed_at: BN;
    constructor(fields: OptionDisputedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionDisputed;
    static toEncodable(fields: OptionDisputedFields): {
        option: PublicKey;
        creator: PublicKey;
        disputed_at: BN;
    };
    toJSON(): OptionDisputedJSON;
    static fromJSON(obj: OptionDisputedJSON): OptionDisputed;
    toEncodable(): {
        option: PublicKey;
        creator: PublicKey;
        disputed_at: BN;
    };
}
//# sourceMappingURL=OptionDisputed.d.ts.map