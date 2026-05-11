import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseExpiredAccounts {
    option: PublicKey;
    caller: PublicKey;
    creator: PublicKey;
    escrow_token_account: PublicKey;
    creator_token_account: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
}
export declare function closeExpired(accounts: CloseExpiredAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeExpired.d.ts.map