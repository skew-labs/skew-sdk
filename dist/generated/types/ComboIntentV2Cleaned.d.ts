import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentV2CleanedFields {
    intent: PublicKey;
    legs_filled: number;
    refund_micro: BN;
    cleaned_at: BN;
    cleanup_caller: PublicKey;
}
export interface ComboIntentV2CleanedJSON {
    intent: string;
    legs_filled: number;
    refund_micro: string;
    cleaned_at: string;
    cleanup_caller: string;
}
export declare class ComboIntentV2Cleaned {
    readonly intent: PublicKey;
    readonly legs_filled: number;
    readonly refund_micro: BN;
    readonly cleaned_at: BN;
    readonly cleanup_caller: PublicKey;
    constructor(fields: ComboIntentV2CleanedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentV2Cleaned;
    static toEncodable(fields: ComboIntentV2CleanedFields): {
        intent: PublicKey;
        legs_filled: number;
        refund_micro: BN;
        cleaned_at: BN;
        cleanup_caller: PublicKey;
    };
    toJSON(): ComboIntentV2CleanedJSON;
    static fromJSON(obj: ComboIntentV2CleanedJSON): ComboIntentV2Cleaned;
    toEncodable(): {
        intent: PublicKey;
        legs_filled: number;
        refund_micro: BN;
        cleaned_at: BN;
        cleanup_caller: PublicKey;
    };
}
//# sourceMappingURL=ComboIntentV2Cleaned.d.ts.map