import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface RecoveryApplyVmghArgs {
    haircut_bps: number;
    drained_micro: BN;
    gain_snapshot_digest: Array<number>;
}
export interface RecoveryApplyVmghAccounts {
    authority: PublicKey;
    recovery_state: PublicKey;
    fee_accumulator: PublicKey;
    drained_vault: PublicKey;
    fee_authority: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function recoveryApplyVmgh(args: RecoveryApplyVmghArgs, accounts: RecoveryApplyVmghAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=recoveryApplyVmgh.d.ts.map