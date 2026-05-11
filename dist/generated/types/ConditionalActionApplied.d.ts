import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ConditionalActionAppliedFields {
    order: PublicKey;
    order_id: BN;
    action: number;
    action_target: PublicKey;
    amount_settled_micro: BN;
    applied_at: BN;
}
export interface ConditionalActionAppliedJSON {
    order: string;
    order_id: string;
    action: number;
    action_target: string;
    amount_settled_micro: string;
    applied_at: string;
}
export declare class ConditionalActionApplied {
    readonly order: PublicKey;
    readonly order_id: BN;
    readonly action: number;
    readonly action_target: PublicKey;
    readonly amount_settled_micro: BN;
    readonly applied_at: BN;
    constructor(fields: ConditionalActionAppliedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ConditionalActionApplied;
    static toEncodable(fields: ConditionalActionAppliedFields): {
        order: PublicKey;
        order_id: BN;
        action: number;
        action_target: PublicKey;
        amount_settled_micro: BN;
        applied_at: BN;
    };
    toJSON(): ConditionalActionAppliedJSON;
    static fromJSON(obj: ConditionalActionAppliedJSON): ConditionalActionApplied;
    toEncodable(): {
        order: PublicKey;
        order_id: BN;
        action: number;
        action_target: PublicKey;
        amount_settled_micro: BN;
        applied_at: BN;
    };
}
//# sourceMappingURL=ConditionalActionApplied.d.ts.map