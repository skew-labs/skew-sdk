import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryDeclareTriggerArgs {
    trigger_kind: types.RecoveryTriggerKindKind;
    protocol_fee_balance_micro: BN;
}
export interface RecoveryDeclareTriggerAccounts {
    authority: PublicKey;
    recovery_state: PublicKey;
    insurance_fund: PublicKey;
    committee: PublicKey;
    emergency: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function recoveryDeclareTrigger(args: RecoveryDeclareTriggerArgs, accounts: RecoveryDeclareTriggerAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=recoveryDeclareTrigger.d.ts.map