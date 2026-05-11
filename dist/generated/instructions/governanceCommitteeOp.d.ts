import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface GovernanceCommitteeOpArgs {
    op: types.GovernanceCommitteeOpKindKind;
    change_id: BN;
    op_kind: types.CommitteeMemberOpKind;
    target: PublicKey;
    independent: boolean;
    signed_at_slot: BN;
}
export interface GovernanceCommitteeOpAccounts {
    governance: PublicKey;
    committee: PublicKey;
    proposal: PublicKey;
    signer: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function governanceCommitteeOp(args: GovernanceCommitteeOpArgs, accounts: GovernanceCommitteeOpAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=governanceCommitteeOp.d.ts.map