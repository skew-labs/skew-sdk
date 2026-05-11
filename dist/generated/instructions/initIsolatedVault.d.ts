import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitIsolatedVaultAccounts {
    user: PublicKey;
    option: PublicKey;
    vault: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    vault_escrow: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
}
export declare function initIsolatedVault(accounts: InitIsolatedVaultAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initIsolatedVault.d.ts.map