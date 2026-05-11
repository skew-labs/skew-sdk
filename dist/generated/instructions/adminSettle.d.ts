import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface AdminSettleArgs {
    price: BN;
}
export interface AdminSettleAccounts {
    option: PublicKey;
    authority: PublicKey;
    escrow_token_account: PublicKey;
    payoff_token_account: PublicKey;
    creator_refund_token_account: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
    creator_cm: PublicKey;
    position_registry: PublicKey;
    option_token_mint: PublicKey;
    current_holder_option_ata: PublicKey;
    cm_escrow_token_account: PublicKey;
    option_collateral_lock: PublicKey;
    lst_vault: PublicKey;
    lst_vault_ata: PublicKey;
    native_sol_vault: PublicKey;
    native_sol_vault_ata: PublicKey;
}
export declare const layout: any;
export declare function adminSettle(args: AdminSettleArgs, accounts: AdminSettleAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=adminSettle.d.ts.map