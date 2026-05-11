import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CleanupExpiredConditionalOrderAccounts {
    authority: PublicKey;
    caller: PublicKey;
    order: PublicKey;
}
export declare function cleanupExpiredConditionalOrder(accounts: CleanupExpiredConditionalOrderAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cleanupExpiredConditionalOrder.d.ts.map