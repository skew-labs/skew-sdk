import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface BuilderFeesWithdrawnFields {
    builder_code_pda: PublicKey;
    builder: PublicKey;
    amount: BN;
    remaining_accrued_micro: BN;
    withdrawn_at: BN;
}
export interface BuilderFeesWithdrawnJSON {
    builder_code_pda: string;
    builder: string;
    amount: string;
    remaining_accrued_micro: string;
    withdrawn_at: string;
}
export declare class BuilderFeesWithdrawn {
    readonly builder_code_pda: PublicKey;
    readonly builder: PublicKey;
    readonly amount: BN;
    readonly remaining_accrued_micro: BN;
    readonly withdrawn_at: BN;
    constructor(fields: BuilderFeesWithdrawnFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.BuilderFeesWithdrawn;
    static toEncodable(fields: BuilderFeesWithdrawnFields): {
        builder_code_pda: PublicKey;
        builder: PublicKey;
        amount: BN;
        remaining_accrued_micro: BN;
        withdrawn_at: BN;
    };
    toJSON(): BuilderFeesWithdrawnJSON;
    static fromJSON(obj: BuilderFeesWithdrawnJSON): BuilderFeesWithdrawn;
    toEncodable(): {
        builder_code_pda: PublicKey;
        builder: PublicKey;
        amount: BN;
        remaining_accrued_micro: BN;
        withdrawn_at: BN;
    };
}
//# sourceMappingURL=BuilderFeesWithdrawn.d.ts.map