import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface DepositLstCollateralArgs {
    amount: BN;
}
export interface DepositLstCollateralAccounts {
    vault: PublicKey;
    user: PublicKey;
    lst_mint: PublicKey;
    user_lst_ata: PublicKey;
    vault_ata: PublicKey;
    stake_pool: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function depositLstCollateral(args: DepositLstCollateralArgs, accounts: DepositLstCollateralAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=depositLstCollateral.d.ts.map