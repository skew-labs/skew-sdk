import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseBuilderCodeAccounts {
    builder_code: PublicKey;
    builder: PublicKey;
    builder_token_account: PublicKey;
    builder_escrow: PublicKey;
    fee_authority: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
}
export declare function closeBuilderCode(accounts: CloseBuilderCodeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeBuilderCode.d.ts.map