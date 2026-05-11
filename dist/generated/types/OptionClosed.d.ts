import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionClosedFields {
    option: PublicKey;
    creator: PublicKey;
    refunded: BN;
    closed_at: BN;
}
export interface OptionClosedJSON {
    option: string;
    creator: string;
    refunded: string;
    closed_at: string;
}
export declare class OptionClosed {
    readonly option: PublicKey;
    readonly creator: PublicKey;
    readonly refunded: BN;
    readonly closed_at: BN;
    constructor(fields: OptionClosedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionClosed;
    static toEncodable(fields: OptionClosedFields): {
        option: PublicKey;
        creator: PublicKey;
        refunded: BN;
        closed_at: BN;
    };
    toJSON(): OptionClosedJSON;
    static fromJSON(obj: OptionClosedJSON): OptionClosed;
    toEncodable(): {
        option: PublicKey;
        creator: PublicKey;
        refunded: BN;
        closed_at: BN;
    };
}
//# sourceMappingURL=OptionClosed.d.ts.map