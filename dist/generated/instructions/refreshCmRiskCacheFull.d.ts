import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RefreshCmRiskCacheFullArgs {
    current_spot: number;
}
export interface RefreshCmRiskCacheFullAccounts {
    caller: PublicKey;
    cm: PublicKey;
    cm_risk_cache: PublicKey;
    position_registry: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function refreshCmRiskCacheFull(args: RefreshCmRiskCacheFullArgs, accounts: RefreshCmRiskCacheFullAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=refreshCmRiskCacheFull.d.ts.map