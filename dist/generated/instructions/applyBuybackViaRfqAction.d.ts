import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ApplyBuybackViaRfqActionAccounts {
    user: PublicKey;
    order: PublicKey;
}
export declare function applyBuybackViaRfqAction(accounts: ApplyBuybackViaRfqActionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=applyBuybackViaRfqAction.d.ts.map