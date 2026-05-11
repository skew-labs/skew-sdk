import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitEmergencyPauseAccounts {
    authority: PublicKey;
    emergency: PublicKey;
    system_program: PublicKey;
}
export declare function initEmergencyPause(accounts: InitEmergencyPauseAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initEmergencyPause.d.ts.map