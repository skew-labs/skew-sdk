import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface UpdateCrossAssetMatrixArgs {
    rho_p5_btc_eth_micro: number;
    rho_p5_btc_sol_micro: number;
    rho_p5_btc_xrp_micro: number;
    rho_p5_btc_hype_micro: number;
    rho_p5_eth_sol_micro: number;
    rho_p5_eth_xrp_micro: number;
    rho_p5_eth_hype_micro: number;
    rho_p5_sol_xrp_micro: number;
    rho_p5_sol_hype_micro: number;
    rho_p5_xrp_hype_micro: number;
    stress_btc_eth_micro: number;
    stress_btc_sol_micro: number;
    stress_btc_xrp_micro: number;
    stress_btc_hype_micro: number;
    stress_eth_sol_micro: number;
    stress_eth_xrp_micro: number;
    stress_eth_hype_micro: number;
    stress_sol_xrp_micro: number;
    stress_sol_hype_micro: number;
    stress_xrp_hype_micro: number;
    update_p5: boolean;
    update_stress: boolean;
}
export interface UpdateCrossAssetMatrixAccounts {
    authority: PublicKey;
    matrix: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function updateCrossAssetMatrix(args: UpdateCrossAssetMatrixArgs, accounts: UpdateCrossAssetMatrixAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateCrossAssetMatrix.d.ts.map