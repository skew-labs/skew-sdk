import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface MarkDisputedAccounts {
    option: PublicKey;
    caller: PublicKey;
}
export declare function markDisputed(accounts: MarkDisputedAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=markDisputed.d.ts.map