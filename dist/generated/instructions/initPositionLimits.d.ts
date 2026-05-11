import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitPositionLimitsAccounts {
    authority: PublicKey;
    position_limits: PublicKey;
    system_program: PublicKey;
}
export declare function initPositionLimits(accounts: InitPositionLimitsAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initPositionLimits.d.ts.map