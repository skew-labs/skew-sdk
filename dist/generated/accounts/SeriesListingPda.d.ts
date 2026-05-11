import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface SeriesListingPdaFields {
    asset: number;
    option_type: types.OptionTypeKind;
    direction: number;
    status: number;
    _padding_a: Array<number>;
    strike: BN;
    expiry_ts: BN;
    last_fill_price_micro: BN;
    last_fill_at: BN;
    total_oi_count: number;
    cumulative_fill_count: number;
    max_oi_count: number;
    listed_at: BN;
    bump: number;
    _padding_b: Array<number>;
}
export interface SeriesListingPdaJSON {
    asset: number;
    option_type: types.OptionTypeJSON;
    direction: number;
    status: number;
    _padding_a: Array<number>;
    strike: string;
    expiry_ts: string;
    last_fill_price_micro: string;
    last_fill_at: string;
    total_oi_count: number;
    cumulative_fill_count: number;
    max_oi_count: number;
    listed_at: string;
    bump: number;
    _padding_b: Array<number>;
}
export declare class SeriesListingPda {
    readonly asset: number;
    readonly option_type: types.OptionTypeKind;
    readonly direction: number;
    readonly status: number;
    readonly _padding_a: Array<number>;
    readonly strike: BN;
    readonly expiry_ts: BN;
    readonly last_fill_price_micro: BN;
    readonly last_fill_at: BN;
    readonly total_oi_count: number;
    readonly cumulative_fill_count: number;
    readonly max_oi_count: number;
    readonly listed_at: BN;
    readonly bump: number;
    readonly _padding_b: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: SeriesListingPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<SeriesListingPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<SeriesListingPda | null>>;
    static decode(data: Buffer): SeriesListingPda;
    toJSON(): SeriesListingPdaJSON;
    static fromJSON(obj: SeriesListingPdaJSON): SeriesListingPda;
}
//# sourceMappingURL=SeriesListingPda.d.ts.map