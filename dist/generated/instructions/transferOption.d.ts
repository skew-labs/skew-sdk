import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface TransferOptionAccounts {
    option: PublicKey;
    current_holder: PublicKey;
    current_holder_option_ata: PublicKey;
    new_holder: PublicKey;
    new_holder_option_ata: PublicKey;
    option_token_mint: PublicKey;
    system_program: PublicKey;
    token_program: PublicKey;
    associated_token_program: PublicKey;
}
export declare function transferOption(accounts: TransferOptionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=transferOption.d.ts.map