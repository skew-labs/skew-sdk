import BN from "bn.js";
import * as types from "../types";
export interface PublishAxeArgsFields {
    axe_id: BN;
    asset: number;
    side: number;
    option_type_mask: number;
    strike_band_lo: BN;
    strike_band_hi: BN;
    expiry_band_lo: BN;
    expiry_band_hi: BN;
    size_micro: BN;
    bid_premium_band_lo: BN;
    bid_premium_band_hi: BN;
    ask_premium_band_lo: BN;
    ask_premium_band_hi: BN;
    valid_until: BN;
    note_hash: Array<number>;
}
export interface PublishAxeArgsJSON {
    axe_id: string;
    asset: number;
    side: number;
    option_type_mask: number;
    strike_band_lo: string;
    strike_band_hi: string;
    expiry_band_lo: string;
    expiry_band_hi: string;
    size_micro: string;
    bid_premium_band_lo: string;
    bid_premium_band_hi: string;
    ask_premium_band_lo: string;
    ask_premium_band_hi: string;
    valid_until: string;
    note_hash: Array<number>;
}
export declare class PublishAxeArgs {
    readonly axe_id: BN;
    readonly asset: number;
    readonly side: number;
    readonly option_type_mask: number;
    readonly strike_band_lo: BN;
    readonly strike_band_hi: BN;
    readonly expiry_band_lo: BN;
    readonly expiry_band_hi: BN;
    readonly size_micro: BN;
    readonly bid_premium_band_lo: BN;
    readonly bid_premium_band_hi: BN;
    readonly ask_premium_band_lo: BN;
    readonly ask_premium_band_hi: BN;
    readonly valid_until: BN;
    readonly note_hash: Array<number>;
    constructor(fields: PublishAxeArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PublishAxeArgs;
    static toEncodable(fields: PublishAxeArgsFields): {
        axe_id: BN;
        asset: number;
        side: number;
        option_type_mask: number;
        strike_band_lo: BN;
        strike_band_hi: BN;
        expiry_band_lo: BN;
        expiry_band_hi: BN;
        size_micro: BN;
        bid_premium_band_lo: BN;
        bid_premium_band_hi: BN;
        ask_premium_band_lo: BN;
        ask_premium_band_hi: BN;
        valid_until: BN;
        note_hash: number[];
    };
    toJSON(): PublishAxeArgsJSON;
    static fromJSON(obj: PublishAxeArgsJSON): PublishAxeArgs;
    toEncodable(): {
        axe_id: BN;
        asset: number;
        side: number;
        option_type_mask: number;
        strike_band_lo: BN;
        strike_band_hi: BN;
        expiry_band_lo: BN;
        expiry_band_hi: BN;
        size_micro: BN;
        bid_premium_band_lo: BN;
        bid_premium_band_hi: BN;
        ask_premium_band_lo: BN;
        ask_premium_band_hi: BN;
        valid_until: BN;
        note_hash: number[];
    };
}
//# sourceMappingURL=PublishAxeArgs.d.ts.map