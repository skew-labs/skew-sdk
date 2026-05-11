import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentCancelledFields {
    combo: PublicKey;
    buyer: PublicKey;
    combo_id: BN;
    refund: BN;
    cancelled_at: BN;
}
export interface ComboIntentCancelledJSON {
    combo: string;
    buyer: string;
    combo_id: string;
    refund: string;
    cancelled_at: string;
}
export declare class ComboIntentCancelled {
    readonly combo: PublicKey;
    readonly buyer: PublicKey;
    readonly combo_id: BN;
    readonly refund: BN;
    readonly cancelled_at: BN;
    constructor(fields: ComboIntentCancelledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentCancelled;
    static toEncodable(fields: ComboIntentCancelledFields): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        refund: BN;
        cancelled_at: BN;
    };
    toJSON(): ComboIntentCancelledJSON;
    static fromJSON(obj: ComboIntentCancelledJSON): ComboIntentCancelled;
    toEncodable(): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        refund: BN;
        cancelled_at: BN;
    };
}
//# sourceMappingURL=ComboIntentCancelled.d.ts.map