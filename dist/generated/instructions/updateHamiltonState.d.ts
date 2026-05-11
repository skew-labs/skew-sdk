import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface UpdateHamiltonStateArgs {
    asset: number;
    pi_calm_micro: BN;
    pi_stress_micro: BN;
    mu_calm_micro: BN;
    mu_stress_micro: BN;
    sigma_calm_micro: BN;
    sigma_stress_micro: BN;
    p01_micro: BN;
    p10_micro: BN;
    consecutive_stress_days: number;
    consecutive_calm_days: number;
}
export interface UpdateHamiltonStateAccounts {
    authority: PublicKey;
    hamilton_state: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function updateHamiltonState(args: UpdateHamiltonStateArgs, accounts: UpdateHamiltonStateAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateHamiltonState.d.ts.map