import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface DefaultWaterfallDrainArgs {
    tier4_slot: types.IfTierKind;
    loss: BN;
}
export interface DefaultWaterfallDrainAccounts {
    insurance_fund: PublicKey;
    defaulting_cm: PublicKey;
    authority: PublicKey;
}
export declare const layout: any;
export declare function defaultWaterfallDrain(args: DefaultWaterfallDrainArgs, accounts: DefaultWaterfallDrainAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=defaultWaterfallDrain.d.ts.map