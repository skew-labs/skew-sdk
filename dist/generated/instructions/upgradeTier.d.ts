import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface UpgradeTierArgs {
    target_rank: number;
}
export interface UpgradeTierAccounts {
    cm: PublicKey;
    authority: PublicKey;
    lst_vault: PublicKey;
    stake_pool: PublicKey;
    sol_usd_pyth: PublicKey;
}
export declare const layout: any;
export declare function upgradeTier(args: UpgradeTierArgs, accounts: UpgradeTierAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=upgradeTier.d.ts.map