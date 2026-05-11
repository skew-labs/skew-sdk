import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface WithdrawFeesArgs {
    amount: BN;
}
export interface WithdrawFeesAccounts {
    authority: PublicKey;
    fee_accumulator: PublicKey;
    fee_authority: PublicKey;
    recipient: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function withdrawFees(args: WithdrawFeesArgs, accounts: WithdrawFeesAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=withdrawFees.d.ts.map