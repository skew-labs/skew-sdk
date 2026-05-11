import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface VolumeTrackerPdaFields {
    authority: PublicKey;
    bump: number;
    volume_30d_micro: BN;
    equity_micro: BN;
    last_update_ts: BN;
    current_vip_tier: number;
}
export interface VolumeTrackerPdaJSON {
    authority: string;
    bump: number;
    volume_30d_micro: string;
    equity_micro: string;
    last_update_ts: string;
    current_vip_tier: number;
}
export declare class VolumeTrackerPda {
    readonly authority: PublicKey;
    readonly bump: number;
    readonly volume_30d_micro: BN;
    readonly equity_micro: BN;
    readonly last_update_ts: BN;
    readonly current_vip_tier: number;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: VolumeTrackerPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<VolumeTrackerPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<VolumeTrackerPda | null>>;
    static decode(data: Buffer): VolumeTrackerPda;
    toJSON(): VolumeTrackerPdaJSON;
    static fromJSON(obj: VolumeTrackerPdaJSON): VolumeTrackerPda;
}
//# sourceMappingURL=VolumeTrackerPda.d.ts.map