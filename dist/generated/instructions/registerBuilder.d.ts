import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterBuilderArgs {
    label: Array<number>;
}
export interface RegisterBuilderAccounts {
    builder_code: PublicKey;
    builder: PublicKey;
    builder_token_account: PublicKey;
    builder_escrow: PublicKey;
    fee_authority: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
}
export declare const layout: any;
export declare function registerBuilder(args: RegisterBuilderArgs, accounts: RegisterBuilderAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerBuilder.d.ts.map