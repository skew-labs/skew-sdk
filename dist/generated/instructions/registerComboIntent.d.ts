import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface RegisterComboIntentArgs {
    combo_id: BN;
    n_legs: number;
    leg_options: Array<PublicKey>;
    leg_sides: Array<number>;
    leg_max_premiums: Array<BN>;
    total_max_premium_micro: BN;
    expiry_ts: BN;
}
export interface RegisterComboIntentAccounts {
    buyer: PublicKey;
    combo: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    buyer_ata: PublicKey;
    combo_escrow: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function registerComboIntent(args: RegisterComboIntentArgs, accounts: RegisterComboIntentAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerComboIntent.d.ts.map