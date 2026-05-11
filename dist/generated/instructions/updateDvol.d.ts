import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface UpdateDvolArgs {
    asset: number;
    dvol_28d_micro: BN;
    dvol_90d_micro: BN;
    realized_var_28d_micro: BN;
}
export interface UpdateDvolAccounts {
    dvol_pda: PublicKey;
    authority: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
}
export declare const layout: any;
export declare function updateDvol(args: UpdateDvolArgs, accounts: UpdateDvolAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateDvol.d.ts.map