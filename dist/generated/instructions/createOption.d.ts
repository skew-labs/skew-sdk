import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CreateOptionArgs {
    nonce: BN;
    option_type: types.OptionTypeKind;
    asset: number;
    direction: number;
    strike: BN;
    expiry_ts: BN;
    payoff_amount: BN;
    settlement_decimals: number;
    upper_bound: BN;
    extra_param: number;
    spot_at_creation: BN;
    sigma_at_creation: number;
}
export interface CreateOptionAccounts {
    option: PublicKey;
    creator: PublicKey;
    underlying_feed: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    system_program: PublicKey;
    metadata_pda: PublicKey;
    mpl_token_metadata_program: PublicKey;
    rent: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function createOption(args: CreateOptionArgs, accounts: CreateOptionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=createOption.d.ts.map