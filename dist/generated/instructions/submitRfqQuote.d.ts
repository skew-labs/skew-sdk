import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface SubmitRfqQuoteArgs {
    args: types.SubmitRfqQuoteArgsFields;
}
export interface SubmitRfqQuoteAccounts {
    mm: PublicKey;
    registry: PublicKey;
    auction: PublicKey;
    ix_sysvar: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function submitRfqQuote(args: SubmitRfqQuoteArgs, accounts: SubmitRfqQuoteAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=submitRfqQuote.d.ts.map