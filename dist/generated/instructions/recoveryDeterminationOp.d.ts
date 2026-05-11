import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryDeterminationOpArgs {
    op: types.RecoveryDeterminationOpKindKind;
    determination_id: BN;
}
export interface RecoveryDeterminationOpAccounts {
    determination: PublicKey;
    signer: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function recoveryDeterminationOp(args: RecoveryDeterminationOpArgs, accounts: RecoveryDeterminationOpAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=recoveryDeterminationOp.d.ts.map