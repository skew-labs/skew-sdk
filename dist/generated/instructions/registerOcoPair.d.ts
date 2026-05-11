import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RegisterOcoPairArgs {
    stop_loss: types.RegisterConditionalOrderArgsFields;
    take_profit: types.RegisterConditionalOrderArgsFields;
}
export interface RegisterOcoPairAccounts {
    authority: PublicKey;
    order_a: PublicKey;
    order_b: PublicKey;
    action_target: PublicKey;
    system_program: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function registerOcoPair(args: RegisterOcoPairArgs, accounts: RegisterOcoPairAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerOcoPair.d.ts.map