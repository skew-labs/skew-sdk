import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface DepositNativeSolCollateralArgs {
    amount: BN;
}
export interface DepositNativeSolCollateralAccounts {
    vault: PublicKey;
    user: PublicKey;
    wsol_mint: PublicKey;
    user_wsol_ata: PublicKey;
    vault_ata: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function depositNativeSolCollateral(args: DepositNativeSolCollateralArgs, accounts: DepositNativeSolCollateralAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=depositNativeSolCollateral.d.ts.map