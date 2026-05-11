import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterRfqMakerAccounts {
    mm: PublicKey;
    registry: PublicKey;
    system_program: PublicKey;
}
export declare function registerRfqMaker(accounts: RegisterRfqMakerAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerRfqMaker.d.ts.map