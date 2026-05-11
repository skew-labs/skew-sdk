import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CloseRfqAuctionAccounts {
    refund_target: PublicKey;
    auction: PublicKey;
    escrow_ata: PublicKey;
    token_program: PublicKey;
}
export declare function closeRfqAuction(accounts: CloseRfqAuctionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=closeRfqAuction.d.ts.map