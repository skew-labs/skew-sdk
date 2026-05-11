import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface FeeWithdrawnFields {
    recipient: PublicKey;
    settlement_mint: PublicKey;
    amount: BN;
    withdrawn_at: BN;
}
export interface FeeWithdrawnJSON {
    recipient: string;
    settlement_mint: string;
    amount: string;
    withdrawn_at: string;
}
export declare class FeeWithdrawn {
    readonly recipient: PublicKey;
    readonly settlement_mint: PublicKey;
    readonly amount: BN;
    readonly withdrawn_at: BN;
    constructor(fields: FeeWithdrawnFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FeeWithdrawn;
    static toEncodable(fields: FeeWithdrawnFields): {
        recipient: PublicKey;
        settlement_mint: PublicKey;
        amount: BN;
        withdrawn_at: BN;
    };
    toJSON(): FeeWithdrawnJSON;
    static fromJSON(obj: FeeWithdrawnJSON): FeeWithdrawn;
    toEncodable(): {
        recipient: PublicKey;
        settlement_mint: PublicKey;
        amount: BN;
        withdrawn_at: BN;
    };
}
//# sourceMappingURL=FeeWithdrawn.d.ts.map