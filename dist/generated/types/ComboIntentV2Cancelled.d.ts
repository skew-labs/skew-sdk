import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentV2CancelledFields {
    intent: PublicKey;
    legs_filled: number;
    refund_micro: BN;
    cancelled_at: BN;
}
export interface ComboIntentV2CancelledJSON {
    intent: string;
    legs_filled: number;
    refund_micro: string;
    cancelled_at: string;
}
export declare class ComboIntentV2Cancelled {
    readonly intent: PublicKey;
    readonly legs_filled: number;
    readonly refund_micro: BN;
    readonly cancelled_at: BN;
    constructor(fields: ComboIntentV2CancelledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentV2Cancelled;
    static toEncodable(fields: ComboIntentV2CancelledFields): {
        intent: PublicKey;
        legs_filled: number;
        refund_micro: BN;
        cancelled_at: BN;
    };
    toJSON(): ComboIntentV2CancelledJSON;
    static fromJSON(obj: ComboIntentV2CancelledJSON): ComboIntentV2Cancelled;
    toEncodable(): {
        intent: PublicKey;
        legs_filled: number;
        refund_micro: BN;
        cancelled_at: BN;
    };
}
//# sourceMappingURL=ComboIntentV2Cancelled.d.ts.map