import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitInsuranceFundAccounts {
    insurance_fund: PublicKey;
    authority: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    if_escrow: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
}
export declare function initInsuranceFund(accounts: InitInsuranceFundAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initInsuranceFund.d.ts.map