import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface WithdrawIsolatedArgs {
    amount: BN;
}
export interface WithdrawIsolatedAccounts {
    user: PublicKey;
    vault: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    user_ata: PublicKey;
    vault_escrow: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function withdrawIsolated(args: WithdrawIsolatedArgs, accounts: WithdrawIsolatedAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=withdrawIsolated.d.ts.map