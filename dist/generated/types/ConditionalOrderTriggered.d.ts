import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ConditionalOrderTriggeredFields {
    order: PublicKey;
    authority: PublicKey;
    order_id: BN;
    action: number;
    action_target: PublicKey;
    triggered_at_slot: BN;
    oracle_price_micro: BN;
    threshold_micro: BN;
    keeper: PublicKey;
}
export interface ConditionalOrderTriggeredJSON {
    order: string;
    authority: string;
    order_id: string;
    action: number;
    action_target: string;
    triggered_at_slot: string;
    oracle_price_micro: string;
    threshold_micro: string;
    keeper: string;
}
export declare class ConditionalOrderTriggered {
    readonly order: PublicKey;
    readonly authority: PublicKey;
    readonly order_id: BN;
    readonly action: number;
    readonly action_target: PublicKey;
    readonly triggered_at_slot: BN;
    readonly oracle_price_micro: BN;
    readonly threshold_micro: BN;
    readonly keeper: PublicKey;
    constructor(fields: ConditionalOrderTriggeredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ConditionalOrderTriggered;
    static toEncodable(fields: ConditionalOrderTriggeredFields): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        action: number;
        action_target: PublicKey;
        triggered_at_slot: BN;
        oracle_price_micro: BN;
        threshold_micro: BN;
        keeper: PublicKey;
    };
    toJSON(): ConditionalOrderTriggeredJSON;
    static fromJSON(obj: ConditionalOrderTriggeredJSON): ConditionalOrderTriggered;
    toEncodable(): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        action: number;
        action_target: PublicKey;
        triggered_at_slot: BN;
        oracle_price_micro: BN;
        threshold_micro: BN;
        keeper: PublicKey;
    };
}
//# sourceMappingURL=ConditionalOrderTriggered.d.ts.map