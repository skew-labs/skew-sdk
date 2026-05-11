import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface WithdrawNativeSolCollateralArgs {
    amount: BN;
}
export interface WithdrawNativeSolCollateralAccounts {
    vault: PublicKey;
    user: PublicKey;
    wsol_mint: PublicKey;
    user_wsol_ata: PublicKey;
    vault_ata: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function withdrawNativeSolCollateral(args: WithdrawNativeSolCollateralArgs, accounts: WithdrawNativeSolCollateralAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=withdrawNativeSolCollateral.d.ts.map