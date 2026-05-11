import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface VolumeTrackerInitializedFields {
    volume_tracker_pda: PublicKey;
    authority: PublicKey;
    initialized_at: BN;
}
export interface VolumeTrackerInitializedJSON {
    volume_tracker_pda: string;
    authority: string;
    initialized_at: string;
}
export declare class VolumeTrackerInitialized {
    readonly volume_tracker_pda: PublicKey;
    readonly authority: PublicKey;
    readonly initialized_at: BN;
    constructor(fields: VolumeTrackerInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.VolumeTrackerInitialized;
    static toEncodable(fields: VolumeTrackerInitializedFields): {
        volume_tracker_pda: PublicKey;
        authority: PublicKey;
        initialized_at: BN;
    };
    toJSON(): VolumeTrackerInitializedJSON;
    static fromJSON(obj: VolumeTrackerInitializedJSON): VolumeTrackerInitialized;
    toEncodable(): {
        volume_tracker_pda: PublicKey;
        authority: PublicKey;
        initialized_at: BN;
    };
}
//# sourceMappingURL=VolumeTrackerInitialized.d.ts.map