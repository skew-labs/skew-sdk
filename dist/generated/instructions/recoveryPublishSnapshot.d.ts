import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface RecoveryPublishSnapshotArgs {
    snapshot_oi_digest: Array<number>;
    residual_unfunded_loss_micro: BN;
}
export interface RecoveryPublishSnapshotAccounts {
    authority: PublicKey;
    recovery_state: PublicKey;
    insurance_fund: PublicKey;
    emergency: PublicKey;
}
export declare const layout: any;
export declare function recoveryPublishSnapshot(args: RecoveryPublishSnapshotArgs, accounts: RecoveryPublishSnapshotAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=recoveryPublishSnapshot.d.ts.map