import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoverySnapshotPublishedFields {
    recovery_state: PublicKey;
    snapshot_oi_digest: Array<number>;
    if_aggregate_balance_micro: BN;
    residual_unfunded_loss_micro: BN;
    snapshot_at_slot: BN;
}
export interface RecoverySnapshotPublishedJSON {
    recovery_state: string;
    snapshot_oi_digest: Array<number>;
    if_aggregate_balance_micro: string;
    residual_unfunded_loss_micro: string;
    snapshot_at_slot: string;
}
export declare class RecoverySnapshotPublished {
    readonly recovery_state: PublicKey;
    readonly snapshot_oi_digest: Array<number>;
    readonly if_aggregate_balance_micro: BN;
    readonly residual_unfunded_loss_micro: BN;
    readonly snapshot_at_slot: BN;
    constructor(fields: RecoverySnapshotPublishedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoverySnapshotPublished;
    static toEncodable(fields: RecoverySnapshotPublishedFields): {
        recovery_state: PublicKey;
        snapshot_oi_digest: number[];
        if_aggregate_balance_micro: BN;
        residual_unfunded_loss_micro: BN;
        snapshot_at_slot: BN;
    };
    toJSON(): RecoverySnapshotPublishedJSON;
    static fromJSON(obj: RecoverySnapshotPublishedJSON): RecoverySnapshotPublished;
    toEncodable(): {
        recovery_state: PublicKey;
        snapshot_oi_digest: number[];
        if_aggregate_balance_micro: BN;
        residual_unfunded_loss_micro: BN;
        snapshot_at_slot: BN;
    };
}
//# sourceMappingURL=RecoverySnapshotPublished.d.ts.map