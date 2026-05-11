import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RevokeAxeAccounts {
    mm: PublicKey;
    axe: PublicKey;
}
export declare function revokeAxe(accounts: RevokeAxeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=revokeAxe.d.ts.map