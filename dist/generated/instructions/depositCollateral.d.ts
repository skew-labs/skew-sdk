import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface DepositCollateralArgs {
    amount: BN;
}
export interface DepositCollateralAccounts {
    option: PublicKey;
    creator: PublicKey;
    creator_token_account: PublicKey;
    escrow_token_account: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function depositCollateral(args: DepositCollateralArgs, accounts: DepositCollateralAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=depositCollateral.d.ts.map