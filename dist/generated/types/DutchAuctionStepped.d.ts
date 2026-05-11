import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface DutchAuctionSteppedFields {
    defaulting_cm: PublicKey;
    current_bonus_bps: number;
    liq_start_ts: BN;
    observed_at: BN;
}
export interface DutchAuctionSteppedJSON {
    defaulting_cm: string;
    current_bonus_bps: number;
    liq_start_ts: string;
    observed_at: string;
}
export declare class DutchAuctionStepped {
    readonly defaulting_cm: PublicKey;
    readonly current_bonus_bps: number;
    readonly liq_start_ts: BN;
    readonly observed_at: BN;
    constructor(fields: DutchAuctionSteppedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.DutchAuctionStepped;
    static toEncodable(fields: DutchAuctionSteppedFields): {
        defaulting_cm: PublicKey;
        current_bonus_bps: number;
        liq_start_ts: BN;
        observed_at: BN;
    };
    toJSON(): DutchAuctionSteppedJSON;
    static fromJSON(obj: DutchAuctionSteppedJSON): DutchAuctionStepped;
    toEncodable(): {
        defaulting_cm: PublicKey;
        current_bonus_bps: number;
        liq_start_ts: BN;
        observed_at: BN;
    };
}
//# sourceMappingURL=DutchAuctionStepped.d.ts.map