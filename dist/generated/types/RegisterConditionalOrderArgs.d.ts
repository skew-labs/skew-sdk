import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RegisterConditionalOrderArgsFields {
    order_id: BN;
    kind: number;
    trigger_oracle: PublicKey;
    trigger_price_1e8: BN;
    trigger_direction: number;
    trigger_mode: number;
    trigger_grace_slots: number;
    action: number;
    action_target: PublicKey;
    action_min_premium_micro: BN;
    action_max_premium_micro: BN;
    action_max_slippage_bps: number;
    valid_until_ts: BN;
}
export interface RegisterConditionalOrderArgsJSON {
    order_id: string;
    kind: number;
    trigger_oracle: string;
    trigger_price_1e8: string;
    trigger_direction: number;
    trigger_mode: number;
    trigger_grace_slots: number;
    action: number;
    action_target: string;
    action_min_premium_micro: string;
    action_max_premium_micro: string;
    action_max_slippage_bps: number;
    valid_until_ts: string;
}
export declare class RegisterConditionalOrderArgs {
    readonly order_id: BN;
    readonly kind: number;
    readonly trigger_oracle: PublicKey;
    readonly trigger_price_1e8: BN;
    readonly trigger_direction: number;
    readonly trigger_mode: number;
    readonly trigger_grace_slots: number;
    readonly action: number;
    readonly action_target: PublicKey;
    readonly action_min_premium_micro: BN;
    readonly action_max_premium_micro: BN;
    readonly action_max_slippage_bps: number;
    readonly valid_until_ts: BN;
    constructor(fields: RegisterConditionalOrderArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RegisterConditionalOrderArgs;
    static toEncodable(fields: RegisterConditionalOrderArgsFields): {
        order_id: BN;
        kind: number;
        trigger_oracle: PublicKey;
        trigger_price_1e8: BN;
        trigger_direction: number;
        trigger_mode: number;
        trigger_grace_slots: number;
        action: number;
        action_target: PublicKey;
        action_min_premium_micro: BN;
        action_max_premium_micro: BN;
        action_max_slippage_bps: number;
        valid_until_ts: BN;
    };
    toJSON(): RegisterConditionalOrderArgsJSON;
    static fromJSON(obj: RegisterConditionalOrderArgsJSON): RegisterConditionalOrderArgs;
    toEncodable(): {
        order_id: BN;
        kind: number;
        trigger_oracle: PublicKey;
        trigger_price_1e8: BN;
        trigger_direction: number;
        trigger_mode: number;
        trigger_grace_slots: number;
        action: number;
        action_target: PublicKey;
        action_min_premium_micro: BN;
        action_max_premium_micro: BN;
        action_max_slippage_bps: number;
        valid_until_ts: BN;
    };
}
//# sourceMappingURL=RegisterConditionalOrderArgs.d.ts.map