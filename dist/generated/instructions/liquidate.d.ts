import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface LiquidateArgs {
    close_factor_bps: number;
    min_expected_bonus_bps: number;
}
export interface LiquidateAccounts {
    liq_state: PublicKey;
    option: PublicKey;
    defaulting_cm: PublicKey;
    position_registry: PublicKey;
    insurance_fund: PublicKey;
    option_escrow: PublicKey;
    cm_escrow: PublicKey;
    if_escrow: PublicKey;
    liquidator_payout_ata: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    liquidator: PublicKey;
    system_program: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function liquidate(args: LiquidateArgs, accounts: LiquidateAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=liquidate.d.ts.map