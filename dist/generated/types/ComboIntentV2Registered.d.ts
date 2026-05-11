import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentV2RegisteredFields {
    intent: PublicKey;
    buyer: PublicKey;
    combo_id: BN;
    leg_count: number;
    total_max_premium_micro: BN;
    expires_ts: BN;
    registered_at: BN;
}
export interface ComboIntentV2RegisteredJSON {
    intent: string;
    buyer: string;
    combo_id: string;
    leg_count: number;
    total_max_premium_micro: string;
    expires_ts: string;
    registered_at: string;
}
export declare class ComboIntentV2Registered {
    readonly intent: PublicKey;
    readonly buyer: PublicKey;
    readonly combo_id: BN;
    readonly leg_count: number;
    readonly total_max_premium_micro: BN;
    readonly expires_ts: BN;
    readonly registered_at: BN;
    constructor(fields: ComboIntentV2RegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentV2Registered;
    static toEncodable(fields: ComboIntentV2RegisteredFields): {
        intent: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        leg_count: number;
        total_max_premium_micro: BN;
        expires_ts: BN;
        registered_at: BN;
    };
    toJSON(): ComboIntentV2RegisteredJSON;
    static fromJSON(obj: ComboIntentV2RegisteredJSON): ComboIntentV2Registered;
    toEncodable(): {
        intent: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        leg_count: number;
        total_max_premium_micro: BN;
        expires_ts: BN;
        registered_at: BN;
    };
}
//# sourceMappingURL=ComboIntentV2Registered.d.ts.map