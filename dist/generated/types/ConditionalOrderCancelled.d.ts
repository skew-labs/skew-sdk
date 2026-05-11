import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ConditionalOrderCancelledFields {
    order: PublicKey;
    authority: PublicKey;
    order_id: BN;
    cancelled_at: BN;
    was_oco_pair: boolean;
    linked_order: PublicKey;
}
export interface ConditionalOrderCancelledJSON {
    order: string;
    authority: string;
    order_id: string;
    cancelled_at: string;
    was_oco_pair: boolean;
    linked_order: string;
}
export declare class ConditionalOrderCancelled {
    readonly order: PublicKey;
    readonly authority: PublicKey;
    readonly order_id: BN;
    readonly cancelled_at: BN;
    readonly was_oco_pair: boolean;
    readonly linked_order: PublicKey;
    constructor(fields: ConditionalOrderCancelledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ConditionalOrderCancelled;
    static toEncodable(fields: ConditionalOrderCancelledFields): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        cancelled_at: BN;
        was_oco_pair: boolean;
        linked_order: PublicKey;
    };
    toJSON(): ConditionalOrderCancelledJSON;
    static fromJSON(obj: ConditionalOrderCancelledJSON): ConditionalOrderCancelled;
    toEncodable(): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        cancelled_at: BN;
        was_oco_pair: boolean;
        linked_order: PublicKey;
    };
}
//# sourceMappingURL=ConditionalOrderCancelled.d.ts.map