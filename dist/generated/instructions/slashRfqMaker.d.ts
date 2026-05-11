import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface SlashRfqMakerAccounts {
    slasher: PublicKey;
    registry: PublicKey;
}
export declare function slashRfqMaker(accounts: SlashRfqMakerAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=slashRfqMaker.d.ts.map