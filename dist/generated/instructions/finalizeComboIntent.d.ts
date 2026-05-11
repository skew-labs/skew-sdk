import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface FinalizeComboIntentAccounts {
    buyer: PublicKey;
    combo: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    buyer_ata: PublicKey;
    combo_escrow: PublicKey;
    token_program: PublicKey;
    governance: PublicKey;
}
export declare function finalizeComboIntent(accounts: FinalizeComboIntentAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=finalizeComboIntent.d.ts.map