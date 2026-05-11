import { TransactionInstruction, PublicKey } from "@solana/web3.js";
export interface FinalizeRfqAuctionAccounts {
    caller: PublicKey;
    auction: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    escrow_ata: PublicKey;
    buyer_usdc_ata: PublicKey;
    token_program: PublicKey;
    governance: PublicKey;
}
export declare function finalizeRfqAuction(accounts: FinalizeRfqAuctionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=finalizeRfqAuction.d.ts.map