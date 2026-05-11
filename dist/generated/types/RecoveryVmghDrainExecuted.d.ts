import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryVmghDrainExecutedFields {
    recovery_state: PublicKey;
    fee_accumulator: PublicKey;
    drained_vault: PublicKey;
    mint: PublicKey;
    haircut_bps: number;
    fee_accumulator_balance_before: BN;
    actual_transferred_micro: BN;
    applied_at_slot: BN;
}
export interface RecoveryVmghDrainExecutedJSON {
    recovery_state: string;
    fee_accumulator: string;
    drained_vault: string;
    mint: string;
    haircut_bps: number;
    fee_accumulator_balance_before: string;
    actual_transferred_micro: string;
    applied_at_slot: string;
}
export declare class RecoveryVmghDrainExecuted {
    readonly recovery_state: PublicKey;
    readonly fee_accumulator: PublicKey;
    readonly drained_vault: PublicKey;
    readonly mint: PublicKey;
    readonly haircut_bps: number;
    readonly fee_accumulator_balance_before: BN;
    readonly actual_transferred_micro: BN;
    readonly applied_at_slot: BN;
    constructor(fields: RecoveryVmghDrainExecutedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoveryVmghDrainExecuted;
    static toEncodable(fields: RecoveryVmghDrainExecutedFields): {
        recovery_state: PublicKey;
        fee_accumulator: PublicKey;
        drained_vault: PublicKey;
        mint: PublicKey;
        haircut_bps: number;
        fee_accumulator_balance_before: BN;
        actual_transferred_micro: BN;
        applied_at_slot: BN;
    };
    toJSON(): RecoveryVmghDrainExecutedJSON;
    static fromJSON(obj: RecoveryVmghDrainExecutedJSON): RecoveryVmghDrainExecuted;
    toEncodable(): {
        recovery_state: PublicKey;
        fee_accumulator: PublicKey;
        drained_vault: PublicKey;
        mint: PublicKey;
        haircut_bps: number;
        fee_accumulator_balance_before: BN;
        actual_transferred_micro: BN;
        applied_at_slot: BN;
    };
}
//# sourceMappingURL=RecoveryVmghDrainExecuted.d.ts.map