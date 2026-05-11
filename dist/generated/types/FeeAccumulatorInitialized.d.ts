import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface FeeAccumulatorInitializedFields {
    fee_accumulator: PublicKey;
    settlement_mint: PublicKey;
    payer: PublicKey;
    initialized_at: BN;
}
export interface FeeAccumulatorInitializedJSON {
    fee_accumulator: string;
    settlement_mint: string;
    payer: string;
    initialized_at: string;
}
export declare class FeeAccumulatorInitialized {
    readonly fee_accumulator: PublicKey;
    readonly settlement_mint: PublicKey;
    readonly payer: PublicKey;
    readonly initialized_at: BN;
    constructor(fields: FeeAccumulatorInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FeeAccumulatorInitialized;
    static toEncodable(fields: FeeAccumulatorInitializedFields): {
        fee_accumulator: PublicKey;
        settlement_mint: PublicKey;
        payer: PublicKey;
        initialized_at: BN;
    };
    toJSON(): FeeAccumulatorInitializedJSON;
    static fromJSON(obj: FeeAccumulatorInitializedJSON): FeeAccumulatorInitialized;
    toEncodable(): {
        fee_accumulator: PublicKey;
        settlement_mint: PublicKey;
        payer: PublicKey;
        initialized_at: BN;
    };
}
//# sourceMappingURL=FeeAccumulatorInitialized.d.ts.map