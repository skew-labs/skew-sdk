import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface MicrostructurePDAFields {
    asset: number;
    padding_0: Array<number>;
    last_update_slot: BN;
    spot_micro: BN;
    bid_ask_spread_bps: number;
    padding_1: Array<number>;
    depth_100k_usd_micro: BN;
    volume_24h_usd_micro: BN;
    iv_bid_28d_micro: BN;
    iv_ask_28d_micro: BN;
}
export interface MicrostructurePDAJSON {
    asset: number;
    padding_0: Array<number>;
    last_update_slot: string;
    spot_micro: string;
    bid_ask_spread_bps: number;
    padding_1: Array<number>;
    depth_100k_usd_micro: string;
    volume_24h_usd_micro: string;
    iv_bid_28d_micro: string;
    iv_ask_28d_micro: string;
}
export declare class MicrostructurePDA {
    readonly asset: number;
    readonly padding_0: Array<number>;
    readonly last_update_slot: BN;
    readonly spot_micro: BN;
    readonly bid_ask_spread_bps: number;
    readonly padding_1: Array<number>;
    readonly depth_100k_usd_micro: BN;
    readonly volume_24h_usd_micro: BN;
    readonly iv_bid_28d_micro: BN;
    readonly iv_ask_28d_micro: BN;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: MicrostructurePDAFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<MicrostructurePDA | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<MicrostructurePDA | null>>;
    static decode(data: Buffer): MicrostructurePDA;
    toJSON(): MicrostructurePDAJSON;
    static fromJSON(obj: MicrostructurePDAJSON): MicrostructurePDA;
}
//# sourceMappingURL=MicrostructurePDA.d.ts.map