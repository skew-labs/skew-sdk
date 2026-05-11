import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CancelComboIntentAccounts {
    buyer: PublicKey;
    combo: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    buyer_ata: PublicKey;
    combo_escrow: PublicKey;
    token_program: PublicKey;
}
export declare function cancelComboIntent(accounts: CancelComboIntentAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cancelComboIntent.d.ts.map