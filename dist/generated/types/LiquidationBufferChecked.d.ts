import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface LiquidationBufferCheckedFields {
    option: PublicKey;
    defaulting_cm: PublicKey;
    close_factor_bps: number;
    health_after_bps: BN;
    buffer_margin_micro: BN;
    checked_at: BN;
}
export interface LiquidationBufferCheckedJSON {
    option: string;
    defaulting_cm: string;
    close_factor_bps: number;
    health_after_bps: string;
    buffer_margin_micro: string;
    checked_at: string;
}
export declare class LiquidationBufferChecked {
    readonly option: PublicKey;
    readonly defaulting_cm: PublicKey;
    readonly close_factor_bps: number;
    readonly health_after_bps: BN;
    readonly buffer_margin_micro: BN;
    readonly checked_at: BN;
    constructor(fields: LiquidationBufferCheckedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LiquidationBufferChecked;
    static toEncodable(fields: LiquidationBufferCheckedFields): {
        option: PublicKey;
        defaulting_cm: PublicKey;
        close_factor_bps: number;
        health_after_bps: BN;
        buffer_margin_micro: BN;
        checked_at: BN;
    };
    toJSON(): LiquidationBufferCheckedJSON;
    static fromJSON(obj: LiquidationBufferCheckedJSON): LiquidationBufferChecked;
    toEncodable(): {
        option: PublicKey;
        defaulting_cm: PublicKey;
        close_factor_bps: number;
        health_after_bps: BN;
        buffer_margin_micro: BN;
        checked_at: BN;
    };
}
//# sourceMappingURL=LiquidationBufferChecked.d.ts.map