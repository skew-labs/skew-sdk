import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface WithdrawBuilderFeesArgs {
    amount: BN;
}
export interface WithdrawBuilderFeesAccounts {
    builder_code: PublicKey;
    builder: PublicKey;
    builder_token_account: PublicKey;
    builder_escrow: PublicKey;
    fee_authority: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function withdrawBuilderFees(args: WithdrawBuilderFeesArgs, accounts: WithdrawBuilderFeesAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=withdrawBuilderFees.d.ts.map