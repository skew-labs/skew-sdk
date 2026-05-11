import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface BuyOptionArgs {
    premium: BN;
}
export interface BuyOptionAccounts {
    option: PublicKey;
    buyer: PublicKey;
    premium_from: PublicKey;
    premium_to: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    option_token_mint: PublicKey;
    option_token_to: PublicKey;
    system_program: PublicKey;
    token_program: PublicKey;
    associated_token_program: PublicKey;
    rent: PublicKey;
    metadata_pda: PublicKey;
    mpl_token_metadata_program: PublicKey;
    fee_accumulator: PublicKey;
    fee_authority: PublicKey;
    sigma_iv_pda: PublicKey;
    governance: PublicKey;
    buyer_volume_tracker: PublicKey;
    fee_config: PublicKey;
}
export declare const layout: any;
export declare function buyOption(args: BuyOptionArgs, accounts: BuyOptionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=buyOption.d.ts.map