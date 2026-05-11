import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface RecoveryPartialTearUpArgs {
    tear_up_bps: number;
    terminated_notional_micro: BN;
    notional_snapshot_digest: Array<number>;
}
export interface RecoveryPartialTearUpAccounts {
    authority: PublicKey;
    recovery_state: PublicKey;
}
export declare const layout: any;
export declare function recoveryPartialTearUp(args: RecoveryPartialTearUpArgs, accounts: RecoveryPartialTearUpAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=recoveryPartialTearUp.d.ts.map