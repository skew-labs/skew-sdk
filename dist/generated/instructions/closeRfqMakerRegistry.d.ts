import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseRfqMakerRegistryAccounts {
    mm: PublicKey;
    registry: PublicKey;
}
export declare function closeRfqMakerRegistry(accounts: CloseRfqMakerRegistryAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeRfqMakerRegistry.d.ts.map