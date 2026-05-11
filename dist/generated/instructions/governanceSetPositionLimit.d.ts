import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface GovernanceSetPositionLimitArgs {
    asset_idx: number;
    new_limit_usd_micro: BN;
}
export interface GovernanceSetPositionLimitAccounts {
    authority: PublicKey;
    position_limits: PublicKey;
}
export declare const layout: any;
export declare function governanceSetPositionLimit(args: GovernanceSetPositionLimitArgs, accounts: GovernanceSetPositionLimitAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=governanceSetPositionLimit.d.ts.map