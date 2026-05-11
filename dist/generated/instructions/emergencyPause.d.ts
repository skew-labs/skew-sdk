import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface EmergencyPauseAccounts {
    authority: PublicKey;
    emergency: PublicKey;
    governance: PublicKey;
}
export declare function emergencyPause(accounts: EmergencyPauseAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=emergencyPause.d.ts.map