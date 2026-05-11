import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitNativeSolVaultAccounts {
    vault: PublicKey;
    user: PublicKey;
    wsol_mint: PublicKey;
    vault_ata: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
}
export declare function initNativeSolVault(accounts: InitNativeSolVaultAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initNativeSolVault.d.ts.map