import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryVmghAppliedFields {
    recovery_state: PublicKey;
    haircut_bps: number;
    drained_micro: BN;
    cumulative_drained_micro: BN;
    apply_count: number;
    gain_snapshot_digest: Array<number>;
    applied_at_slot: BN;
}
export interface RecoveryVmghAppliedJSON {
    recovery_state: string;
    haircut_bps: number;
    drained_micro: string;
    cumulative_drained_micro: string;
    apply_count: number;
    gain_snapshot_digest: Array<number>;
    applied_at_slot: string;
}
export declare class RecoveryVmghApplied {
    readonly recovery_state: PublicKey;
    readonly haircut_bps: number;
    readonly drained_micro: BN;
    readonly cumulative_drained_micro: BN;
    readonly apply_count: number;
    readonly gain_snapshot_digest: Array<number>;
    readonly applied_at_slot: BN;
    constructor(fields: RecoveryVmghAppliedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoveryVmghApplied;
    static toEncodable(fields: RecoveryVmghAppliedFields): {
        recovery_state: PublicKey;
        haircut_bps: number;
        drained_micro: BN;
        cumulative_drained_micro: BN;
        apply_count: number;
        gain_snapshot_digest: number[];
        applied_at_slot: BN;
    };
    toJSON(): RecoveryVmghAppliedJSON;
    static fromJSON(obj: RecoveryVmghAppliedJSON): RecoveryVmghApplied;
    toEncodable(): {
        recovery_state: PublicKey;
        haircut_bps: number;
        drained_micro: BN;
        cumulative_drained_micro: BN;
        apply_count: number;
        gain_snapshot_digest: number[];
        applied_at_slot: BN;
    };
}
//# sourceMappingURL=RecoveryVmghApplied.d.ts.map