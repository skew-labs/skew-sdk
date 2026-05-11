import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseSigmaIvAccounts {
    sigma_iv_pda: PublicKey;
    authority: PublicKey;
}
export declare function closeSigmaIv(accounts: CloseSigmaIvAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeSigmaIv.d.ts.map