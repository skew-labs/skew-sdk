import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface UntrackHeldPositionAccounts {
    holder: PublicKey;
    cm: PublicKey;
    position_registry: PublicKey;
    option: PublicKey;
    option_token_mint: PublicKey;
    holder_option_ata: PublicKey;
}
export declare function untrackHeldPosition(accounts: UntrackHeldPositionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=untrackHeldPosition.d.ts.map