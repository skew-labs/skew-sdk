import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryTriggerDeclaredFields {
    recovery_state: PublicKey;
    trigger_kind: number;
    emergency_active: boolean;
    declared_at_slot: BN;
    declared_at_ts: BN;
}
export interface RecoveryTriggerDeclaredJSON {
    recovery_state: string;
    trigger_kind: number;
    emergency_active: boolean;
    declared_at_slot: string;
    declared_at_ts: string;
}
export declare class RecoveryTriggerDeclared {
    readonly recovery_state: PublicKey;
    readonly trigger_kind: number;
    readonly emergency_active: boolean;
    readonly declared_at_slot: BN;
    readonly declared_at_ts: BN;
    constructor(fields: RecoveryTriggerDeclaredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoveryTriggerDeclared;
    static toEncodable(fields: RecoveryTriggerDeclaredFields): {
        recovery_state: PublicKey;
        trigger_kind: number;
        emergency_active: boolean;
        declared_at_slot: BN;
        declared_at_ts: BN;
    };
    toJSON(): RecoveryTriggerDeclaredJSON;
    static fromJSON(obj: RecoveryTriggerDeclaredJSON): RecoveryTriggerDeclared;
    toEncodable(): {
        recovery_state: PublicKey;
        trigger_kind: number;
        emergency_active: boolean;
        declared_at_slot: BN;
        declared_at_ts: BN;
    };
}
//# sourceMappingURL=RecoveryTriggerDeclared.d.ts.map