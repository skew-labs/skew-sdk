import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CalculateMarginArgs {
    current_spot: number;
}
export interface CalculateMarginAccounts {
    caller: PublicKey;
    cm: PublicKey;
}
export declare const layout: any;
export declare function calculateMargin(args: CalculateMarginArgs, accounts: CalculateMarginAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=calculateMargin.d.ts.map