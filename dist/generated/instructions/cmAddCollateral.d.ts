import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface CmAddCollateralArgs {
    amount: BN;
}
export interface CmAddCollateralAccounts {
    cm: PublicKey;
    authority: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    authority_usdc_ata: PublicKey;
    cm_escrow: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function cmAddCollateral(args: CmAddCollateralArgs, accounts: CmAddCollateralAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cmAddCollateral.d.ts.map