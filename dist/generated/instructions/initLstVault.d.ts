import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitLstVaultAccounts {
    vault: PublicKey;
    user: PublicKey;
    lst_mint: PublicKey;
    vault_ata: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
}
export declare function initLstVault(accounts: InitLstVaultAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initLstVault.d.ts.map