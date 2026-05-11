import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitCollateralPolicyAccounts {
    authority: PublicKey;
    policy: PublicKey;
    system_program: PublicKey;
}
export declare function initCollateralPolicy(accounts: InitCollateralPolicyAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initCollateralPolicy.d.ts.map