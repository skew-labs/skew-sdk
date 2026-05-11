import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface RegisterOptionMetadataAccounts {
    caller: PublicKey;
    option: PublicKey;
    option_token_mint: PublicKey;
    metadata_pda: PublicKey;
    mpl_token_metadata_program: PublicKey;
    system_program: PublicKey;
    token_program: PublicKey;
    rent: PublicKey;
}
export declare function registerOptionMetadata(accounts: RegisterOptionMetadataAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerOptionMetadata.d.ts.map