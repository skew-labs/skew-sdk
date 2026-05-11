import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentFinalizedFields {
    combo: PublicKey;
    buyer: PublicKey;
    combo_id: BN;
    n_legs: number;
    total_premium_paid_micro: BN;
    residual_refund: BN;
    finalized_at: BN;
}
export interface ComboIntentFinalizedJSON {
    combo: string;
    buyer: string;
    combo_id: string;
    n_legs: number;
    total_premium_paid_micro: string;
    residual_refund: string;
    finalized_at: string;
}
export declare class ComboIntentFinalized {
    readonly combo: PublicKey;
    readonly buyer: PublicKey;
    readonly combo_id: BN;
    readonly n_legs: number;
    readonly total_premium_paid_micro: BN;
    readonly residual_refund: BN;
    readonly finalized_at: BN;
    constructor(fields: ComboIntentFinalizedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboIntentFinalized;
    static toEncodable(fields: ComboIntentFinalizedFields): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        n_legs: number;
        total_premium_paid_micro: BN;
        residual_refund: BN;
        finalized_at: BN;
    };
    toJSON(): ComboIntentFinalizedJSON;
    static fromJSON(obj: ComboIntentFinalizedJSON): ComboIntentFinalized;
    toEncodable(): {
        combo: PublicKey;
        buyer: PublicKey;
        combo_id: BN;
        n_legs: number;
        total_premium_paid_micro: BN;
        residual_refund: BN;
        finalized_at: BN;
    };
}
//# sourceMappingURL=ComboIntentFinalized.d.ts.map