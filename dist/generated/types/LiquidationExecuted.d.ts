import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface LiquidationExecutedFields {
    option: PublicKey;
    defaulting_cm: PublicKey;
    liquidator: PublicKey;
    close_factor_bps: number;
    bonus_bps: number;
    payout: BN;
    remaining_equity: BN;
    executed_at: BN;
}
export interface LiquidationExecutedJSON {
    option: string;
    defaulting_cm: string;
    liquidator: string;
    close_factor_bps: number;
    bonus_bps: number;
    payout: string;
    remaining_equity: string;
    executed_at: string;
}
export declare class LiquidationExecuted {
    readonly option: PublicKey;
    readonly defaulting_cm: PublicKey;
    readonly liquidator: PublicKey;
    readonly close_factor_bps: number;
    readonly bonus_bps: number;
    readonly payout: BN;
    readonly remaining_equity: BN;
    readonly executed_at: BN;
    constructor(fields: LiquidationExecutedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LiquidationExecuted;
    static toEncodable(fields: LiquidationExecutedFields): {
        option: PublicKey;
        defaulting_cm: PublicKey;
        liquidator: PublicKey;
        close_factor_bps: number;
        bonus_bps: number;
        payout: BN;
        remaining_equity: BN;
        executed_at: BN;
    };
    toJSON(): LiquidationExecutedJSON;
    static fromJSON(obj: LiquidationExecutedJSON): LiquidationExecuted;
    toEncodable(): {
        option: PublicKey;
        defaulting_cm: PublicKey;
        liquidator: PublicKey;
        close_factor_bps: number;
        bonus_bps: number;
        payout: BN;
        remaining_equity: BN;
        executed_at: BN;
    };
}
//# sourceMappingURL=LiquidationExecuted.d.ts.map