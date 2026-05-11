import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface InitPositionRegistryAccounts {
    cm: PublicKey;
    position_registry: PublicKey;
    authority: PublicKey;
    system_program: PublicKey;
}
export declare function initPositionRegistry(accounts: InitPositionRegistryAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=initPositionRegistry.d.ts.map