import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ConditionalOrderRegisteredFields {
    order: PublicKey;
    authority: PublicKey;
    order_id: BN;
    kind: number;
    trigger_mode: number;
    trigger_direction: number;
    trigger_price_1e8: BN;
    action: number;
    action_target: PublicKey;
    valid_until_ts: BN;
    registered_at: BN;
}
export interface ConditionalOrderRegisteredJSON {
    order: string;
    authority: string;
    order_id: string;
    kind: number;
    trigger_mode: number;
    trigger_direction: number;
    trigger_price_1e8: string;
    action: number;
    action_target: string;
    valid_until_ts: string;
    registered_at: string;
}
export declare class ConditionalOrderRegistered {
    readonly order: PublicKey;
    readonly authority: PublicKey;
    readonly order_id: BN;
    readonly kind: number;
    readonly trigger_mode: number;
    readonly trigger_direction: number;
    readonly trigger_price_1e8: BN;
    readonly action: number;
    readonly action_target: PublicKey;
    readonly valid_until_ts: BN;
    readonly registered_at: BN;
    constructor(fields: ConditionalOrderRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ConditionalOrderRegistered;
    static toEncodable(fields: ConditionalOrderRegisteredFields): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        kind: number;
        trigger_mode: number;
        trigger_direction: number;
        trigger_price_1e8: BN;
        action: number;
        action_target: PublicKey;
        valid_until_ts: BN;
        registered_at: BN;
    };
    toJSON(): ConditionalOrderRegisteredJSON;
    static fromJSON(obj: ConditionalOrderRegisteredJSON): ConditionalOrderRegistered;
    toEncodable(): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        kind: number;
        trigger_mode: number;
        trigger_direction: number;
        trigger_price_1e8: BN;
        action: number;
        action_target: PublicKey;
        valid_until_ts: BN;
        registered_at: BN;
    };
}
//# sourceMappingURL=ConditionalOrderRegistered.d.ts.map