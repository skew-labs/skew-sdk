import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ClawbackExecutedFields {
    insurance_fund: PublicKey;
    winner_cm: PublicKey;
    drain_amount: BN;
    pnl_proxy: BN;
    total_pnl_in_batch: BN;
    executed_at: BN;
}
export interface ClawbackExecutedJSON {
    insurance_fund: string;
    winner_cm: string;
    drain_amount: string;
    pnl_proxy: string;
    total_pnl_in_batch: string;
    executed_at: string;
}
export declare class ClawbackExecuted {
    readonly insurance_fund: PublicKey;
    readonly winner_cm: PublicKey;
    readonly drain_amount: BN;
    readonly pnl_proxy: BN;
    readonly total_pnl_in_batch: BN;
    readonly executed_at: BN;
    constructor(fields: ClawbackExecutedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ClawbackExecuted;
    static toEncodable(fields: ClawbackExecutedFields): {
        insurance_fund: PublicKey;
        winner_cm: PublicKey;
        drain_amount: BN;
        pnl_proxy: BN;
        total_pnl_in_batch: BN;
        executed_at: BN;
    };
    toJSON(): ClawbackExecutedJSON;
    static fromJSON(obj: ClawbackExecutedJSON): ClawbackExecuted;
    toEncodable(): {
        insurance_fund: PublicKey;
        winner_cm: PublicKey;
        drain_amount: BN;
        pnl_proxy: BN;
        total_pnl_in_batch: BN;
        executed_at: BN;
    };
}
//# sourceMappingURL=ClawbackExecuted.d.ts.map