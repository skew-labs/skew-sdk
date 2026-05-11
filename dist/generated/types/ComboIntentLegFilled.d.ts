import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentLegFilledFields {
    combo: PublicKey;
    buyer: PublicKey;
    combo_id: BN;
    leg_idx: number;
    option: PublicKey;
    premium_paid_micro: BN;
    legs_filled_mask: number;
    filled_at: BN;
}
export interface ComboIntentLegFilledJSON {
    combo: string;
    buyer: string;
    combo_id: string;
    leg_idx: number;
    option: string;
    premium_paid_micro: string;
    legs_filled_mask: number;
    filled_at: string;
}
export declare class ComboIntentLegFilled {
    readonly combo: PublicKey;
    readonly buyer: PublicKey;
    readonly combo_id: BN;
    readonly leg_idx: number;
    readonly option: PublicKey;
    readonly premium_paid_micro: BN;
    readonly legs_filled_mask: number;
    readonly filled_at: BN;
    constructor(fields: ComboIntentLegFilledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentLegFilled;
    static toEncodable(fields: ComboIntentLegFilledFields): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        leg_idx: number;
        option: PublicKey;
        premium_paid_micro: BN;
        legs_filled_mask: number;
        filled_at: BN;
    };
    toJSON(): ComboIntentLegFilledJSON;
    static fromJSON(obj: ComboIntentLegFilledJSON): ComboIntentLegFilled;
    toEncodable(): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        leg_idx: number;
        option: PublicKey;
        premium_paid_micro: BN;
        legs_filled_mask: number;
        filled_at: BN;
    };
}
//# sourceMappingURL=ComboIntentLegFilled.d.ts.map