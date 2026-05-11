import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface TakeBestQuoteArgs {
    args: types.TakeBestQuoteArgsFields;
}
export interface TakeBestQuoteAccounts {
    buyer: PublicKey;
    auction: PublicKey;
    usdc_mint: PublicKey;
    escrow_ata: PublicKey;
    buyer_usdc_ata: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function takeBestQuote(args: TakeBestQuoteArgs, accounts: TakeBestQuoteAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=takeBestQuote.d.ts.map