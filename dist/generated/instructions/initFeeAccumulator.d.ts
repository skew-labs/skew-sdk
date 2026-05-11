import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitFeeAccumulatorAccounts {
    payer: PublicKey;
    fee_accumulator: PublicKey;
    fee_authority: PublicKey;
    settlement_mint: PublicKey;
    collateral_policy: PublicKey;
    system_program: PublicKey;
    token_program: PublicKey;
    rent: PublicKey;
}
export declare function initFeeAccumulator(accounts: InitFeeAccumulatorAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initFeeAccumulator.d.ts.map