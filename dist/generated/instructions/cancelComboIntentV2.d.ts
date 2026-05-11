import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CancelComboIntentV2Accounts {
    buyer: PublicKey;
    intent: PublicKey;
}
export declare function cancelComboIntentV2(accounts: CancelComboIntentV2Accounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cancelComboIntentV2.d.ts.map