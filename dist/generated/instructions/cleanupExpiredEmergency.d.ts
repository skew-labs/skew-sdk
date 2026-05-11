import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CleanupExpiredEmergencyAccounts {
    caller: PublicKey;
    emergency: PublicKey;
}
export declare function cleanupExpiredEmergency(accounts: CleanupExpiredEmergencyAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cleanupExpiredEmergency.d.ts.map