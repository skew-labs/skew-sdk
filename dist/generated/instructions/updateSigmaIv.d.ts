import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface UpdateSigmaIvArgs {
    btc_long: number;
    btc_short: number;
    eth_long: number;
    eth_short: number;
    sol_long: number;
    sol_short: number;
    xrp_long: number;
    xrp_short: number;
    hype_long: number;
    hype_short: number;
    update_short: boolean;
    update_long: boolean;
}
export interface UpdateSigmaIvAccounts {
    authority: PublicKey;
    sigma_iv_pda: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function updateSigmaIv(args: UpdateSigmaIvArgs, accounts: UpdateSigmaIvAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateSigmaIv.d.ts.map