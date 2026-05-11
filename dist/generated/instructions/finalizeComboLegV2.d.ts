import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface FinalizeComboLegV2Args {
    leg_index: number;
    realised_premium_micro: BN;
}
export interface FinalizeComboLegV2Accounts {
    caller: PublicKey;
    intent: PublicKey;
    option: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function finalizeComboLegV2(args: FinalizeComboLegV2Args, accounts: FinalizeComboLegV2Accounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=finalizeComboLegV2.d.ts.map