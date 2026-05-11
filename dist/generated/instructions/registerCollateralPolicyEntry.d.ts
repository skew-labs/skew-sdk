import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterCollateralPolicyEntryArgs {
    mint: PublicKey;
    decimals: number;
    kind: number;
    oracle_feed: PublicKey;
    max_depeg_bps: number;
}
export interface RegisterCollateralPolicyEntryAccounts {
    authority: PublicKey;
    policy: PublicKey;
}
export declare const layout: any;
export declare function registerCollateralPolicyEntry(args: RegisterCollateralPolicyEntryArgs, accounts: RegisterCollateralPolicyEntryAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerCollateralPolicyEntry.d.ts.map