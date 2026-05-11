import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface AdlStepArgs {
    target_loss_micro: BN;
}
export interface AdlStepAccounts {
    insurance_fund: PublicKey;
    if_escrow: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    authority: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function adlStep(args: AdlStepArgs, accounts: AdlStepAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=adlStep.d.ts.map