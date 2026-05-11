import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryTearUpAppliedToCmFields {
    recovery_state: PublicKey;
    clearing_member: PublicKey;
    tear_up_bps: number;
    gross_notional_before: BN;
    gross_notional_after: BN;
    net_notional_long_before: BN;
    net_notional_long_after: BN;
    net_notional_short_before: BN;
    net_notional_short_after: BN;
    applied_at_slot: BN;
}
export interface RecoveryTearUpAppliedToCmJSON {
    recovery_state: string;
    clearing_member: string;
    tear_up_bps: number;
    gross_notional_before: string;
    gross_notional_after: string;
    net_notional_long_before: string;
    net_notional_long_after: string;
    net_notional_short_before: string;
    net_notional_short_after: string;
    applied_at_slot: string;
}
export declare class RecoveryTearUpAppliedToCm {
    readonly recovery_state: PublicKey;
    readonly clearing_member: PublicKey;
    readonly tear_up_bps: number;
    readonly gross_notional_before: BN;
    readonly gross_notional_after: BN;
    readonly net_notional_long_before: BN;
    readonly net_notional_long_after: BN;
    readonly net_notional_short_before: BN;
    readonly net_notional_short_after: BN;
    readonly applied_at_slot: BN;
    constructor(fields: RecoveryTearUpAppliedToCmFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoveryTearUpAppliedToCm;
    static toEncodable(fields: RecoveryTearUpAppliedToCmFields): {
        recovery_state: PublicKey;
        clearing_member: PublicKey;
        tear_up_bps: number;
        gross_notional_before: BN;
        gross_notional_after: BN;
        net_notional_long_before: BN;
        net_notional_long_after: BN;
        net_notional_short_before: BN;
        net_notional_short_after: BN;
        applied_at_slot: BN;
    };
    toJSON(): RecoveryTearUpAppliedToCmJSON;
    static fromJSON(obj: RecoveryTearUpAppliedToCmJSON): RecoveryTearUpAppliedToCm;
    toEncodable(): {
        recovery_state: PublicKey;
        clearing_member: PublicKey;
        tear_up_bps: number;
        gross_notional_before: BN;
        gross_notional_after: BN;
        net_notional_long_before: BN;
        net_notional_long_after: BN;
        net_notional_short_before: BN;
        net_notional_short_after: BN;
        applied_at_slot: BN;
    };
}
//# sourceMappingURL=RecoveryTearUpAppliedToCm.d.ts.map