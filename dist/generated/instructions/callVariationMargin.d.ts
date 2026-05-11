import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CallVariationMarginAccounts {
    keeper: PublicKey;
    cm: PublicKey;
}
export declare function callVariationMargin(accounts: CallVariationMarginAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=callVariationMargin.d.ts.map