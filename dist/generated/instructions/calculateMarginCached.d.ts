import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CalculateMarginCachedArgs {
    current_spot: number;
}
export interface CalculateMarginCachedAccounts {
    caller: PublicKey;
    cm: PublicKey;
    cm_risk_cache: PublicKey;
    position_registry: PublicKey;
}
export declare const layout: any;
export declare function calculateMarginCached(args: CalculateMarginCachedArgs, accounts: CalculateMarginCachedAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=calculateMarginCached.d.ts.map