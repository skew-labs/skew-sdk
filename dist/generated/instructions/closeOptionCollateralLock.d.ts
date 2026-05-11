import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseOptionCollateralLockAccounts {
    lock: PublicKey;
    caller: PublicKey;
    refund: PublicKey;
}
export declare function closeOptionCollateralLock(accounts: CloseOptionCollateralLockAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeOptionCollateralLock.d.ts.map