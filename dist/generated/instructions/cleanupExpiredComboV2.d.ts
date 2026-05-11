import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CleanupExpiredComboV2Accounts {
    buyer: PublicKey;
    caller: PublicKey;
    intent: PublicKey;
}
export declare function cleanupExpiredComboV2(accounts: CleanupExpiredComboV2Accounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cleanupExpiredComboV2.d.ts.map