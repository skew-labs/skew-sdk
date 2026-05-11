import { PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface OcoLinkedCancelledFields {
    triggered_order: PublicKey;
    cancelled_order: PublicKey;
}
export interface OcoLinkedCancelledJSON {
    triggered_order: string;
    cancelled_order: string;
}
export declare class OcoLinkedCancelled {
    readonly triggered_order: PublicKey;
    readonly cancelled_order: PublicKey;
    constructor(fields: OcoLinkedCancelledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OcoLinkedCancelled;
    static toEncodable(fields: OcoLinkedCancelledFields): {
        triggered_order: PublicKey;
        cancelled_order: PublicKey;
    };
    toJSON(): OcoLinkedCancelledJSON;
    static fromJSON(obj: OcoLinkedCancelledJSON): OcoLinkedCancelled;
    toEncodable(): {
        triggered_order: PublicKey;
        cancelled_order: PublicKey;
    };
}
//# sourceMappingURL=OcoLinkedCancelled.d.ts.map