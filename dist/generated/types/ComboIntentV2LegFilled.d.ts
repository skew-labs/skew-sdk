import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentV2LegFilledFields {
    intent: PublicKey;
    leg_index: number;
    option: PublicKey;
    side: number;
    qty_micro: BN;
    fill_premium_micro: BN;
    filled_at: BN;
}
export interface ComboIntentV2LegFilledJSON {
    intent: string;
    leg_index: number;
    option: string;
    side: number;
    qty_micro: string;
    fill_premium_micro: string;
    filled_at: string;
}
export declare class ComboIntentV2LegFilled {
    readonly intent: PublicKey;
    readonly leg_index: number;
    readonly option: PublicKey;
    readonly side: number;
    readonly qty_micro: BN;
    readonly fill_premium_micro: BN;
    readonly filled_at: BN;
    constructor(fields: ComboIntentV2LegFilledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentV2LegFilled;
    static toEncodable(fields: ComboIntentV2LegFilledFields): {
        intent: PublicKey;
        leg_index: number;
        option: PublicKey;
        side: number;
        qty_micro: BN;
        fill_premium_micro: BN;
        filled_at: BN;
    };
    toJSON(): ComboIntentV2LegFilledJSON;
    static fromJSON(obj: ComboIntentV2LegFilledJSON): ComboIntentV2LegFilled;
    toEncodable(): {
        intent: PublicKey;
        leg_index: number;
        option: PublicKey;
        side: number;
        qty_micro: BN;
        fill_premium_micro: BN;
        filled_at: BN;
    };
}
//# sourceMappingURL=ComboIntentV2LegFilled.d.ts.map