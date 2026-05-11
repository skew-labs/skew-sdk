import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RegisterComboIntentV2Args {
    args: types.RegisterComboV2ArgsFields;
}
export interface RegisterComboIntentV2Accounts {
    buyer: PublicKey;
    intent: PublicKey;
    system_program: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function registerComboIntentV2(args: RegisterComboIntentV2Args, accounts: RegisterComboIntentV2Accounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerComboIntentV2.d.ts.map