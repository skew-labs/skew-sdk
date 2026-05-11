import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface CmWithdrawCollateralArgs {
    amount: BN;
}
export interface CmWithdrawCollateralAccounts {
    cm: PublicKey;
    authority: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    authority_usdc_ata: PublicKey;
    cm_escrow: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function cmWithdrawCollateral(args: CmWithdrawCollateralArgs, accounts: CmWithdrawCollateralAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cmWithdrawCollateral.d.ts.map