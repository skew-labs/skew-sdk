import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ApplyCloseIsolatedActionAccounts {
    user: PublicKey;
    order: PublicKey;
    option: PublicKey;
    vault: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    user_ata: PublicKey;
    vault_escrow: PublicKey;
    token_program: PublicKey;
}
export declare function applyCloseIsolatedAction(accounts: ApplyCloseIsolatedActionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=applyCloseIsolatedAction.d.ts.map