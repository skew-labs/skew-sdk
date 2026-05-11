import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface UpdatePovsStateArgs {
    asset: number;
    sigma_t_micro: BN;
    sigma_inf_micro: BN;
    theta_d_micro: BN;
    vrp_rel_micro: BN;
    iv_micro: BN;
    p_max_micro: BN;
    xi_micro: BN;
    beta_micro: BN;
    var_99_micro: BN;
    es_999_micro: BN;
    regime_indicator_micro: BN;
}
export interface UpdatePovsStateAccounts {
    authority: PublicKey;
    povs_state: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function updatePovsState(args: UpdatePovsStateArgs, accounts: UpdatePovsStateAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updatePovsState.d.ts.map