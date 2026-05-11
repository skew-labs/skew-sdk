import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface DelistSeriesAccounts {
    caller: PublicKey;
    series: PublicKey;
}
export declare function delistSeries(accounts: DelistSeriesAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=delistSeries.d.ts.map