import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RegisterConditionalOrderArgs {
    args: types.RegisterConditionalOrderArgsFields;
}
export interface RegisterConditionalOrderAccounts {
    authority: PublicKey;
    order: PublicKey;
    action_target: PublicKey;
    system_program: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function registerConditionalOrder(args: RegisterConditionalOrderArgs, accounts: RegisterConditionalOrderAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerConditionalOrder.d.ts.map