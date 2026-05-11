import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CancelOptionAccounts {
    option: PublicKey;
    creator: PublicKey;
    escrow_token_account: PublicKey;
    creator_token_account: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
}
export declare function cancelOption(accounts: CancelOptionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cancelOption.d.ts.map