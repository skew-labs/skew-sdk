import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface SkewMetricsPdaFields {
    asset: number;
    bump: number;
    padding_0: Array<number>;
    last_update_slot: BN;
    atm_iv_28d_micro: BN;
    rr25_micro: BN;
    bf25_micro: BN;
    rr10_micro: BN;
    atm_slope_micro: BN;
    iv_per_tenor_micro: Array<BN>;
}
export interface SkewMetricsPdaJSON {
    asset: number;
    bump: number;
    padding_0: Array<number>;
    last_update_slot: string;
    atm_iv_28d_micro: string;
    rr25_micro: string;
    bf25_micro: string;
    rr10_micro: string;
    atm_slope_micro: string;
    iv_per_tenor_micro: Array<string>;
}
export declare class SkewMetricsPda {
    readonly asset: number;
    readonly bump: number;
    readonly padding_0: Array<number>;
    readonly last_update_slot: BN;
    readonly atm_iv_28d_micro: BN;
    readonly rr25_micro: BN;
    readonly bf25_micro: BN;
    readonly rr10_micro: BN;
    readonly atm_slope_micro: BN;
    readonly iv_per_tenor_micro: Array<BN>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: SkewMetricsPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<SkewMetricsPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<SkewMetricsPda | null>>;
    static decode(data: Buffer): SkewMetricsPda;
    toJSON(): SkewMetricsPdaJSON;
    static fromJSON(obj: SkewMetricsPdaJSON): SkewMetricsPda;
}
//# sourceMappingURL=SkewMetricsPda.d.ts.map