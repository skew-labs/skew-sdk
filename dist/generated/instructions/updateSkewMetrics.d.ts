import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface UpdateSkewMetricsArgs {
    asset: number;
    atm_iv_28d_micro: BN;
    rr25_micro: BN;
    bf25_micro: BN;
    rr10_micro: BN;
    atm_slope_micro: BN;
    iv_7d_micro: BN;
    iv_14d_micro: BN;
    iv_21d_micro: BN;
    iv_28d_micro: BN;
    iv_60d_micro: BN;
    iv_90d_micro: BN;
    iv_180d_micro: BN;
    iv_365d_micro: BN;
}
export interface UpdateSkewMetricsAccounts {
    authority: PublicKey;
    skew_metrics: PublicKey;
    system_program: PublicKey;
}
export declare const layout: any;
export declare function updateSkewMetrics(args: UpdateSkewMetricsArgs, accounts: UpdateSkewMetricsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=updateSkewMetrics.d.ts.map