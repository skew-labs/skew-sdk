import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MicrostructureUpdatedFields {
    microstructure: PublicKey;
    asset: number;
    last_update_slot: BN;
    spot_micro: BN;
    bid_ask_spread_bps: number;
    depth_100k_usd_micro: BN;
    volume_24h_usd_micro: BN;
    iv_bid_28d_micro: BN;
    iv_ask_28d_micro: BN;
}
export interface MicrostructureUpdatedJSON {
    microstructure: string;
    asset: number;
    last_update_slot: string;
    spot_micro: string;
    bid_ask_spread_bps: number;
    depth_100k_usd_micro: string;
    volume_24h_usd_micro: string;
    iv_bid_28d_micro: string;
    iv_ask_28d_micro: string;
}
export declare class MicrostructureUpdated {
    readonly microstructure: PublicKey;
    readonly asset: number;
    readonly last_update_slot: BN;
    readonly spot_micro: BN;
    readonly bid_ask_spread_bps: number;
    readonly depth_100k_usd_micro: BN;
    readonly volume_24h_usd_micro: BN;
    readonly iv_bid_28d_micro: BN;
    readonly iv_ask_28d_micro: BN;
    constructor(fields: MicrostructureUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MicrostructureUpdated;
    static toEncodable(fields: MicrostructureUpdatedFields): {
        microstructure: PublicKey;
        asset: number;
        last_update_slot: BN;
        spot_micro: BN;
        bid_ask_spread_bps: number;
        depth_100k_usd_micro: BN;
        volume_24h_usd_micro: BN;
        iv_bid_28d_micro: BN;
        iv_ask_28d_micro: BN;
    };
    toJSON(): MicrostructureUpdatedJSON;
    static fromJSON(obj: MicrostructureUpdatedJSON): MicrostructureUpdated;
    toEncodable(): {
        microstructure: PublicKey;
        asset: number;
        last_update_slot: BN;
        spot_micro: BN;
        bid_ask_spread_bps: number;
        depth_100k_usd_micro: BN;
        volume_24h_usd_micro: BN;
        iv_bid_28d_micro: BN;
        iv_ask_28d_micro: BN;
    };
}
//# sourceMappingURL=MicrostructureUpdated.d.ts.map