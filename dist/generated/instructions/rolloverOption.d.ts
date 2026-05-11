import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface RolloverOptionArgs {
    new_nonce: BN;
    new_expiry_ts: BN;
    new_strike: BN;
    new_payoff_amount: BN;
}
export interface RolloverOptionAccounts {
    creator: PublicKey;
    old_option: PublicKey;
    new_option: PublicKey;
    old_escrow: PublicKey;
    new_escrow: PublicKey;
    collateral_mint: PublicKey;
    collateral_policy: PublicKey;
    pyth_price: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
    governance: PublicKey;
    swb_aggregator: PublicKey;
}
export declare const layout: any;
export declare function rolloverOption(args: RolloverOptionArgs, accounts: RolloverOptionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=rolloverOption.d.ts.map