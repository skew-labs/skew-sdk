import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ApplyEarlyExerciseActionAccounts {
    user: PublicKey;
    order: PublicKey;
}
export declare function applyEarlyExerciseAction(accounts: ApplyEarlyExerciseActionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=applyEarlyExerciseAction.d.ts.map