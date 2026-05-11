import { TransactionInstruction, PublicKey } from "@solana/web3.js";
import * as types from "../types";
export interface RegisterRfqAuctionArgs {
    args: types.RegisterRfqAuctionArgsFields;
}
export interface RegisterRfqAuctionAccounts {
    buyer: PublicKey;
    auction: PublicKey;
    usdc_mint: PublicKey;
    collateral_policy: PublicKey;
    buyer_usdc_ata: PublicKey;
    escrow_ata: PublicKey;
    token_program: PublicKey;
    system_program: PublicKey;
    rent: PublicKey;
    governance: PublicKey;
}
export declare const layout: any;
export declare function registerRfqAuction(args: RegisterRfqAuctionArgs, accounts: RegisterRfqAuctionAccounts, programId?: PublicKey): TransactionInstruction;
//# sourceMappingURL=registerRfqAuction.d.ts.map