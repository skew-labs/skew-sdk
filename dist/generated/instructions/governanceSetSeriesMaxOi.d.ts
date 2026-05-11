import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface GovernanceSetSeriesMaxOiArgs {
    max_oi_count: number;
}
export interface GovernanceSetSeriesMaxOiAccounts {
    authority: PublicKey;
    series: PublicKey;
}
export declare const layout: any;
export declare function governanceSetSeriesMaxOi(args: GovernanceSetSeriesMaxOiArgs, accounts: GovernanceSetSeriesMaxOiAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=governanceSetSeriesMaxOi.d.ts.map