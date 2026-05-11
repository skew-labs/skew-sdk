import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface SeriesDelistedFields {
    series_pda: PublicKey;
    asset: number;
    strike: BN;
    expiry_ts: BN;
    option_type: types.OptionTypeKind;
    direction: number;
    cumulative_fill_count: number;
    delisted_at: BN;
}
export interface SeriesDelistedJSON {
    series_pda: string;
    asset: number;
    strike: string;
    expiry_ts: string;
    option_type: types.OptionTypeJSON;
    direction: number;
    cumulative_fill_count: number;
    delisted_at: string;
}
export declare class SeriesDelisted {
    readonly series_pda: PublicKey;
    readonly asset: number;
    readonly strike: BN;
    readonly expiry_ts: BN;
    readonly option_type: types.OptionTypeKind;
    readonly direction: number;
    readonly cumulative_fill_count: number;
    readonly delisted_at: BN;
    constructor(fields: SeriesDelistedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SeriesDelisted;
    static toEncodable(fields: SeriesDelistedFields): {
        series_pda: PublicKey;
        asset: number;
        strike: BN;
        expiry_ts: BN;
        option_type: {
            Vanilla: {};
        } | {
            Digital: {};
        } | {
            CappedVanilla: {};
        } | {
            RangeAccrual: {};
        } | {
            VanillaInverse: {};
        } | {
            DigitalInverse: {};
        };
        direction: number;
        cumulative_fill_count: number;
        delisted_at: BN;
    };
    toJSON(): SeriesDelistedJSON;
    static fromJSON(obj: SeriesDelistedJSON): SeriesDelisted;
    toEncodable(): {
        series_pda: PublicKey;
        asset: number;
        strike: BN;
        expiry_ts: BN;
        option_type: {
            Vanilla: {};
        } | {
            Digital: {};
        } | {
            CappedVanilla: {};
        } | {
            RangeAccrual: {};
        } | {
            VanillaInverse: {};
        } | {
            DigitalInverse: {};
        };
        direction: number;
        cumulative_fill_count: number;
        delisted_at: BN;
    };
}
//# sourceMappingURL=SeriesDelisted.d.ts.map