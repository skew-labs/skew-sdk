import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface CompressPositionsArgs {
    legs: Array<types.CompressionLegFields>;
}
export interface CompressPositionsAccounts {
    authority: PublicKey;
    cm: PublicKey;
}
export declare const layout: any;
export declare function compressPositions(args: CompressPositionsArgs, accounts: CompressPositionsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=compressPositions.d.ts.map