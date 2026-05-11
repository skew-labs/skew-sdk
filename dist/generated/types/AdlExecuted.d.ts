import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface AdlExecutedFields {
    insurance_fund: PublicKey;
    winner_cm: PublicKey;
    drain_amount: BN;
    remaining_target: BN;
    executed_at: BN;
}
export interface AdlExecutedJSON {
    insurance_fund: string;
    winner_cm: string;
    drain_amount: string;
    remaining_target: string;
    executed_at: string;
}
export declare class AdlExecuted {
    readonly insurance_fund: PublicKey;
    readonly winner_cm: PublicKey;
    readonly drain_amount: BN;
    readonly remaining_target: BN;
    readonly executed_at: BN;
    constructor(fields: AdlExecutedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.AdlExecuted;
    static toEncodable(fields: AdlExecutedFields): {
        insurance_fund: PublicKey;
        winner_cm: PublicKey;
        drain_amount: BN;
        remaining_target: BN;
        executed_at: BN;
    };
    toJSON(): AdlExecutedJSON;
    static fromJSON(obj: AdlExecutedJSON): AdlExecuted;
    toEncodable(): {
        insurance_fund: PublicKey;
        winner_cm: PublicKey;
        drain_amount: BN;
        remaining_target: BN;
        executed_at: BN;
    };
}
//# sourceMappingURL=AdlExecuted.d.ts.map