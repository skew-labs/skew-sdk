import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface DowngradeTierArgs {
    target_rank: number;
}
export interface DowngradeTierAccounts {
    cm: PublicKey;
    authority: PublicKey;
    lst_vault: PublicKey;
}
export declare const layout: any;
export declare function downgradeTier(args: DowngradeTierArgs, accounts: DowngradeTierAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=downgradeTier.d.ts.map