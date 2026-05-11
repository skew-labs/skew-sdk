import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CmReallocV2Accounts {
    authority: PublicKey;
    cm: PublicKey;
    system_program: PublicKey;
}
export declare function cmReallocV2(accounts: CmReallocV2Accounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cmReallocV2.d.ts.map