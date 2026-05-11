import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ApplySellViaRfqActionAccounts {
    user: PublicKey;
    order: PublicKey;
}
export declare function applySellViaRfqAction(accounts: ApplySellViaRfqActionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=applySellViaRfqAction.d.ts.map