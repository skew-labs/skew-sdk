import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface PublishAxeArgs {
    args: types.PublishAxeArgsFields;
}
export interface PublishAxeAccounts {
    mm: PublicKey;
    axe: PublicKey;
    insurance_fund: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function publishAxe(args: PublishAxeArgs, accounts: PublishAxeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=publishAxe.d.ts.map