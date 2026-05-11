import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitFeeConfigAccounts {
    fee_config: PublicKey;
    authority: PublicKey;
    system_program: PublicKey;
}
export declare function initFeeConfig(accounts: InitFeeConfigAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initFeeConfig.d.ts.map