import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CallVariationMarginCachedAccounts {
    keeper: PublicKey;
    cm: PublicKey;
    cm_risk_cache: PublicKey;
    position_registry: PublicKey;
}
export declare function callVariationMarginCached(accounts: CallVariationMarginCachedAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=callVariationMarginCached.d.ts.map