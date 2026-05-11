import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface MarkCmRiskCacheDirtyArgs {
    dirty_reason: number;
}
export interface MarkCmRiskCacheDirtyAccounts {
    caller: PublicKey;
    cm: PublicKey;
    cm_risk_cache: PublicKey;
}
export declare const layout: any;
export declare function markCmRiskCacheDirty(args: MarkCmRiskCacheDirtyArgs, accounts: MarkCmRiskCacheDirtyAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=markCmRiskCacheDirty.d.ts.map