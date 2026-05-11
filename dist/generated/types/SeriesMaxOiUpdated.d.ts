import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface SeriesMaxOiUpdatedFields {
    series: PublicKey;
    asset: number;
    strike: BN;
    expiry_ts: BN;
    option_type: number;
    direction: number;
    prev_max_oi: number;
    new_max_oi: number;
    current_oi: number;
    updated_at: BN;
    updated_by: PublicKey;
}
export interface SeriesMaxOiUpdatedJSON {
    series: string;
    asset: number;
    strike: string;
    expiry_ts: string;
    option_type: number;
    direction: number;
    prev_max_oi: number;
    new_max_oi: number;
    current_oi: number;
    updated_at: string;
    updated_by: string;
}
export declare class SeriesMaxOiUpdated {
    readonly series: PublicKey;
    readonly asset: number;
    readonly strike: BN;
    readonly expiry_ts: BN;
    readonly option_type: number;
    readonly direction: number;
    readonly prev_max_oi: number;
    readonly new_max_oi: number;
    readonly current_oi: number;
    readonly updated_at: BN;
    readonly updated_by: PublicKey;
    constructor(fields: SeriesMaxOiUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SeriesMaxOiUpdated;
    static toEncodable(fields: SeriesMaxOiUpdatedFields): {
        series: PublicKey;
        asset: number;
        strike: BN;
        expiry_ts: BN;
        option_type: number;
        direction: number;
        prev_max_oi: number;
        new_max_oi: number;
        current_oi: number;
        updated_at: BN;
        updated_by: PublicKey;
    };
    toJSON(): SeriesMaxOiUpdatedJSON;
    static fromJSON(obj: SeriesMaxOiUpdatedJSON): SeriesMaxOiUpdated;
    toEncodable(): {
        series: PublicKey;
        asset: number;
        strike: BN;
        expiry_ts: BN;
        option_type: number;
        direction: number;
        prev_max_oi: number;
        new_max_oi: number;
        current_oi: number;
        updated_at: BN;
        updated_by: PublicKey;
    };
}
//# sourceMappingURL=SeriesMaxOiUpdated.d.ts.map