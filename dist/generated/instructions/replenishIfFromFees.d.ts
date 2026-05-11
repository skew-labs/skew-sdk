import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import BN from "bn.js";
export interface ReplenishIfFromFeesArgs {
    amount: BN;
}
export interface ReplenishIfFromFeesAccounts {
    insurance_fund: PublicKey;
    fee_accumulator: PublicKey;
    fee_authority: PublicKey;
    if_escrow: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    authority: PublicKey;
    token_program: PublicKey;
}
export declare const layout: any;
export declare function replenishIfFromFees(args: ReplenishIfFromFeesArgs, accounts: ReplenishIfFromFeesAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=replenishIfFromFees.d.ts.map