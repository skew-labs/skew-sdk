import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RfqMakerReallocV2Accounts {
    mm: PublicKey;
    registry: PublicKey;
    system_program: PublicKey;
}
export declare function rfqMakerReallocV2(accounts: RfqMakerReallocV2Accounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=rfqMakerReallocV2.d.ts.map