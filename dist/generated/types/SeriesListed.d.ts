import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface SeriesListedFields {
    series_pda: PublicKey;
    asset: number;
    strike: BN;
    expiry_ts: BN;
    option_type: types.OptionTypeKind;
    direction: number;
    listed_at: BN;
}
export interface SeriesListedJSON {
    series_pda: string;
    asset: number;
    strike: string;
    expiry_ts: string;
    option_type: types.OptionTypeJSON;
    direction: number;
    listed_at: string;
}
export declare class SeriesListed {
    readonly series_pda: PublicKey;
    readonly asset: number;
    readonly strike: BN;
    readonly expiry_ts: BN;
    readonly option_type: types.OptionTypeKind;
    readonly direction: number;
    readonly listed_at: BN;
    constructor(fields: SeriesListedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SeriesListed;
    static toEncodable(fields: SeriesListedFields): {
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
        listed_at: BN;
    };
    toJSON(): SeriesListedJSON;
    static fromJSON(obj: SeriesListedJSON): SeriesListed;
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
        listed_at: BN;
    };
}
//# sourceMappingURL=SeriesListed.d.ts.map