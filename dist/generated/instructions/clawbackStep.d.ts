import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface ClawbackStepArgs {
    target_loss_micro: BN;
}
export interface ClawbackStepAccounts {
    insurance_fund: PublicKey;
    if_escrow: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    authority: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function clawbackStep(args: ClawbackStepArgs, accounts: ClawbackStepAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=clawbackStep.d.ts.map