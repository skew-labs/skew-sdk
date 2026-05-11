import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface RebalancePmLockArgs {
    max_release_amount: BN;
}
export interface RebalancePmLockAccounts {
    caller: PublicKey;
    cm: PublicKey;
    position_registry: PublicKey;
    option: PublicKey;
    settlement_mint: PublicKey;
    option_escrow: PublicKey;
    cm_escrow: PublicKey;
    option_collateral_lock: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function rebalancePmLock(args: RebalancePmLockArgs, accounts: RebalancePmLockAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=rebalancePmLock.d.ts.map