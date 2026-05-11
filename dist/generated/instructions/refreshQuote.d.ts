import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RefreshQuoteArgs {
    args: types.SubmitRfqQuoteArgsFields;
}
export interface RefreshQuoteAccounts {
    mm: PublicKey;
    registry: PublicKey;
    auction: PublicKey;
    ix_sysvar: PublicKey;
}
export declare const layout: any;
export declare function refreshQuote(args: RefreshQuoteArgs, accounts: RefreshQuoteAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=refreshQuote.d.ts.map