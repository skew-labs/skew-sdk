import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ListSeriesArgs {
    asset: number;
    strike: BN;
    expiry_ts: BN;
    option_type: types.OptionTypeKind;
    direction: number;
}
export interface ListSeriesAccounts {
    caller: PublicKey;
    series: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function listSeries(args: ListSeriesArgs, accounts: ListSeriesAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=listSeries.d.ts.map