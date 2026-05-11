import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecordMethodologyChangeArgs {
    kind: types.MethodologyChangeKindKind;
    notice_start_slot: BN;
    note: Array<number>;
}
export interface RecordMethodologyChangeAccounts {
    committee: PublicKey;
    decision: PublicKey;
    authority: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function recordMethodologyChange(args: RecordMethodologyChangeArgs, accounts: RecordMethodologyChangeAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=recordMethodologyChange.d.ts.map