import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface EmergencyResumeAccounts {
    authority: PublicKey;
    emergency: PublicKey;
    governance: PublicKey;
}
export declare function emergencyResume(accounts: EmergencyResumeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=emergencyResume.d.ts.map