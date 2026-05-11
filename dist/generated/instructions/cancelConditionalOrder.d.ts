import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CancelConditionalOrderAccounts {
    authority: PublicKey;
    order: PublicKey;
}
export declare function cancelConditionalOrder(accounts: CancelConditionalOrderAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cancelConditionalOrder.d.ts.map