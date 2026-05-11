import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ConditionalGracePendingFields {
    order: PublicKey;
    first_observed_slot: BN;
    grace_slots_required: number;
}
export interface ConditionalGracePendingJSON {
    order: string;
    first_observed_slot: string;
    grace_slots_required: number;
}
export declare class ConditionalGracePending {
    readonly order: PublicKey;
    readonly first_observed_slot: BN;
    readonly grace_slots_required: number;
    constructor(fields: ConditionalGracePendingFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ConditionalGracePending;
    static toEncodable(fields: ConditionalGracePendingFields): {
        order: PublicKey;
        first_observed_slot: BN;
        grace_slots_required: number;
    };
    toJSON(): ConditionalGracePendingJSON;
    static fromJSON(obj: ConditionalGracePendingJSON): ConditionalGracePending;
    toEncodable(): {
        order: PublicKey;
        first_observed_slot: BN;
        grace_slots_required: number;
    };
}
//# sourceMappingURL=ConditionalGracePending.d.ts.map