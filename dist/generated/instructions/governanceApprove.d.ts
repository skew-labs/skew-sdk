import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface GovernanceApproveArgs {
    signed_at_slot: BN;
}
export interface GovernanceApproveAccounts {
    governance: PublicKey;
    proposal: PublicKey;
    member: PublicKey;
}
export declare const layout: any;
export declare function governanceApprove(args: GovernanceApproveArgs, accounts: GovernanceApproveAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=governanceApprove.d.ts.map