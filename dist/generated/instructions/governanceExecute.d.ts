import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface GovernanceExecuteArgs {
    proposal_id: BN;
}
export interface GovernanceExecuteAccounts {
    governance: PublicKey;
    proposal: PublicKey;
    caller: PublicKey;
}
export declare const layout: any;
export declare function governanceExecute(args: GovernanceExecuteArgs, accounts: GovernanceExecuteAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=governanceExecute.d.ts.map