import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface WithdrawLstCollateralArgs {
    amount: BN;
}
export interface WithdrawLstCollateralAccounts {
    vault: PublicKey;
    user: PublicKey;
    lst_mint: PublicKey;
    user_lst_ata: PublicKey;
    vault_ata: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function withdrawLstCollateral(args: WithdrawLstCollateralArgs, accounts: WithdrawLstCollateralAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=withdrawLstCollateral.d.ts.map