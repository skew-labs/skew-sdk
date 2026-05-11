import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface ExpireAbandonedAccounts {
    option: PublicKey;
    caller: PublicKey;
    escrow_token_account: PublicKey;
    creator_refund_token_account: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
}
export declare function expireAbandoned(accounts: ExpireAbandonedAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=expireAbandoned.d.ts.map