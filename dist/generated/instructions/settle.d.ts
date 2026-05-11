import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface SettleAccounts {
    option: PublicKey;
    caller: PublicKey;
    pyth_price: PublicKey;
    escrow_token_account: PublicKey;
    option_token_mint: PublicKey;
    current_holder_option_ata: PublicKey;
    payoff_token_account: PublicKey;
    creator_refund_token_account: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    token_program: PublicKey;
    creator_cm: PublicKey;
    position_registry: PublicKey;
    creator_cm_collateral_ata: PublicKey;
    swb_aggregator: PublicKey;
    fee_accumulator: PublicKey;
    fee_authority: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
    option_collateral_lock: PublicKey;
    lst_vault: PublicKey;
    lst_vault_ata: PublicKey;
    native_sol_vault: PublicKey;
    native_sol_vault_ata: PublicKey;
    holder_cm: PublicKey;
    holder_position_registry: PublicKey;
}
export declare function settle(accounts: SettleAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=settle.d.ts.map