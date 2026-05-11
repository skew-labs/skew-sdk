import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitCmRiskCacheAccounts {
    payer: PublicKey;
    cm: PublicKey;
    cm_risk_cache: PublicKey;
    system_program: PublicKey;
}
export declare function initCmRiskCache(accounts: InitCmRiskCacheAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initCmRiskCache.d.ts.map