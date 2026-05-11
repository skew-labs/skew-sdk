import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseFinalizedComboV2Accounts {
    buyer: PublicKey;
    intent: PublicKey;
}
export declare function closeFinalizedComboV2(accounts: CloseFinalizedComboV2Accounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeFinalizedComboV2.d.ts.map