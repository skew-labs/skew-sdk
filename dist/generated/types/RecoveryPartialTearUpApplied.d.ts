import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryPartialTearUpAppliedFields {
    recovery_state: PublicKey;
    tear_up_bps: number;
    terminated_notional_micro: BN;
    cumulative_terminated_micro: BN;
    cycle_count: number;
    notional_snapshot_digest: Array<number>;
    applied_at_slot: BN;
}
export interface RecoveryPartialTearUpAppliedJSON {
    recovery_state: string;
    tear_up_bps: number;
    terminated_notional_micro: string;
    cumulative_terminated_micro: string;
    cycle_count: number;
    notional_snapshot_digest: Array<number>;
    applied_at_slot: string;
}
export declare class RecoveryPartialTearUpApplied {
    readonly recovery_state: PublicKey;
    readonly tear_up_bps: number;
    readonly terminated_notional_micro: BN;
    readonly cumulative_terminated_micro: BN;
    readonly cycle_count: number;
    readonly notional_snapshot_digest: Array<number>;
    readonly applied_at_slot: BN;
    constructor(fields: RecoveryPartialTearUpAppliedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoveryPartialTearUpApplied;
    static toEncodable(fields: RecoveryPartialTearUpAppliedFields): {
        recovery_state: PublicKey;
        tear_up_bps: number;
        terminated_notional_micro: BN;
        cumulative_terminated_micro: BN;
        cycle_count: number;
        notional_snapshot_digest: number[];
        applied_at_slot: BN;
    };
    toJSON(): RecoveryPartialTearUpAppliedJSON;
    static fromJSON(obj: RecoveryPartialTearUpAppliedJSON): RecoveryPartialTearUpApplied;
    toEncodable(): {
        recovery_state: PublicKey;
        tear_up_bps: number;
        terminated_notional_micro: BN;
        cumulative_terminated_micro: BN;
        cycle_count: number;
        notional_snapshot_digest: number[];
        applied_at_slot: BN;
    };
}
//# sourceMappingURL=RecoveryPartialTearUpApplied.d.ts.map