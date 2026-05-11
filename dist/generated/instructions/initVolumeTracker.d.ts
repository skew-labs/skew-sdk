import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitVolumeTrackerAccounts {
    volume_tracker: PublicKey;
    authority: PublicKey;
    system_program: PublicKey;
}
export declare function initVolumeTracker(accounts: InitVolumeTrackerAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initVolumeTracker.d.ts.map