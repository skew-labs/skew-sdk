import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface SetMakerRiskConfigArgs {
    args: types.SetMakerRiskConfigArgsFields;
}
export interface SetMakerRiskConfigAccounts {
    mm: PublicKey;
    registry: PublicKey;
}
export declare const layout: any;
export declare function setMakerRiskConfig(args: SetMakerRiskConfigArgs, accounts: SetMakerRiskConfigAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=setMakerRiskConfig.d.ts.map