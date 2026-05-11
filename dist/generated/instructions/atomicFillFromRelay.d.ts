import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface AtomicFillFromRelayArgs {
    payload: types.RelayPayloadFields;
}
export interface AtomicFillFromRelayAccounts {
    option: PublicKey;
    seller_cm: PublicKey;
    rfq_maker_registry: PublicKey;
    position_registry: PublicKey;
    buyer: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    buyer_premium_ata: PublicKey;
    seller_premium_ata: PublicKey;
    fee_accumulator: PublicKey;
    fee_authority: PublicKey;
    seller_collateral_ata: PublicKey;
    option_escrow: PublicKey;
    option_collateral_lock: PublicKey;
    series_listing: PublicKey;
    option_token_mint: PublicKey;
    buyer_option_token_ata: PublicKey;
    pyth_price: PublicKey;
    swb_aggregator: PublicKey;
    instructions_sysvar: PublicKey;
    system_program: PublicKey;
    token_program: PublicKey;
    associated_token_program: PublicKey;
    governance: PublicKey;
    buyer_volume_tracker: PublicKey;
    seller_volume_tracker: PublicKey;
    fee_config: PublicKey;
    builder_code: PublicKey;
    builder_escrow: PublicKey;
    lst_vault: PublicKey;
    lst_vault_ata: PublicKey;
    jitosol_stake_pool: PublicKey;
    native_sol_vault: PublicKey;
    native_sol_vault_ata: PublicKey;
}
export declare const layout: any;
export declare function atomicFillFromRelay(args: AtomicFillFromRelayArgs, accounts: AtomicFillFromRelayAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=atomicFillFromRelay.d.ts.map