import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface GovernanceProposeArgs {
    action: types.AdminActionKind;
    signed_at_slot: BN;
}
export interface GovernanceProposeAccounts {
    governance: PublicKey;
    proposal: PublicKey;
    proposer: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function governancePropose(args: GovernanceProposeArgs, accounts: GovernanceProposeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=governancePropose.d.ts.map