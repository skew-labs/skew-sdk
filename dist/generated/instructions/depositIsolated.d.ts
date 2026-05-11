import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface DepositIsolatedArgs {
    amount: BN;
}
export interface DepositIsolatedAccounts {
    user: PublicKey;
    vault: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    user_ata: PublicKey;
    vault_escrow: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function depositIsolated(args: DepositIsolatedArgs, accounts: DepositIsolatedAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=depositIsolated.d.ts.map