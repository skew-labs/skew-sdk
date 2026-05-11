import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionCancelledFields {
    option: PublicKey;
    creator: PublicKey;
    refunded: BN;
    cancelled_at: BN;
}
export interface OptionCancelledJSON {
    option: string;
    creator: string;
    refunded: string;
    cancelled_at: string;
}
export declare class OptionCancelled {
    readonly option: PublicKey;
    readonly creator: PublicKey;
    readonly refunded: BN;
    readonly cancelled_at: BN;
    constructor(fields: OptionCancelledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionCancelled;
    static toEncodable(fields: OptionCancelledFields): {
        option: PublicKey;
        creator: PublicKey;
        refunded: BN;
        cancelled_at: BN;
    };
    toJSON(): OptionCancelledJSON;
    static fromJSON(obj: OptionCancelledJSON): OptionCancelled;
    toEncodable(): {
        option: PublicKey;
        creator: PublicKey;
        refunded: BN;
        cancelled_at: BN;
    };
}
//# sourceMappingURL=OptionCancelled.d.ts.map