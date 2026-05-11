import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionExpiredAbandonedFields {
    option: PublicKey;
    creator: PublicKey;
    refunded: BN;
    abandoned_at: BN;
}
export interface OptionExpiredAbandonedJSON {
    option: string;
    creator: string;
    refunded: string;
    abandoned_at: string;
}
export declare class OptionExpiredAbandoned {
    readonly option: PublicKey;
    readonly creator: PublicKey;
    readonly refunded: BN;
    readonly abandoned_at: BN;
    constructor(fields: OptionExpiredAbandonedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionExpiredAbandoned;
    static toEncodable(fields: OptionExpiredAbandonedFields): {
        option: PublicKey;
        creator: PublicKey;
        refunded: BN;
        abandoned_at: BN;
    };
    toJSON(): OptionExpiredAbandonedJSON;
    static fromJSON(obj: OptionExpiredAbandonedJSON): OptionExpiredAbandoned;
    toEncodable(): {
        option: PublicKey;
        creator: PublicKey;
        refunded: BN;
        abandoned_at: BN;
    };
}
//# sourceMappingURL=OptionExpiredAbandoned.d.ts.map