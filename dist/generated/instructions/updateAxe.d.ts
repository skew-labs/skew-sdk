import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface UpdateAxeArgs {
    args: types.PublishAxeArgsFields;
}
export interface UpdateAxeAccounts {
    mm: PublicKey;
    axe: PublicKey;
}
export declare const layout: any;
export declare function updateAxe(args: UpdateAxeArgs, accounts: UpdateAxeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateAxe.d.ts.map