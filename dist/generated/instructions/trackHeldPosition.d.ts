import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface TrackHeldPositionAccounts {
    holder: PublicKey;
    cm: PublicKey;
    position_registry: PublicKey;
    option: PublicKey;
    option_token_mint: PublicKey;
    holder_option_ata: PublicKey;
}
export declare function trackHeldPosition(accounts: TrackHeldPositionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=trackHeldPosition.d.ts.map