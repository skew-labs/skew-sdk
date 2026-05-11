import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface CancelRfqAuctionAccounts {
    buyer: PublicKey;
    auction: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    escrow_ata: PublicKey;
    buyer_usdc_ata: PublicKey;
    token_program: PublicKey;
}
export declare function cancelRfqAuction(accounts: CancelRfqAuctionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=cancelRfqAuction.d.ts.map