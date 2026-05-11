import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CmSetWhitelistArgs {
    new_entries: Array<PublicKey>;
    replace_all: boolean;
}
export interface CmSetWhitelistAccounts {
    authority: PublicKey;
    cm: PublicKey;
}
export declare const layout: any;
export declare function cmSetWhitelist(args: CmSetWhitelistArgs, accounts: CmSetWhitelistAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cmSetWhitelist.d.ts.map