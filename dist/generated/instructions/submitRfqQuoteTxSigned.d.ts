import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface SubmitRfqQuoteTxSignedArgs {
    args: types.SubmitRfqQuoteTxSignedArgsFields;
}
export interface SubmitRfqQuoteTxSignedAccounts {
    mm: PublicKey;
    registry: PublicKey;
    auction: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function submitRfqQuoteTxSigned(args: SubmitRfqQuoteTxSignedArgs, accounts: SubmitRfqQuoteTxSignedAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=submitRfqQuoteTxSigned.d.ts.map