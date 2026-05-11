import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqAuctionSettledFields {
    auction: PublicKey;
    winner_mm: PublicKey;
    winning_premium_micro: BN;
    refund_to_buyer_micro: BN;
    settled_at: BN;
}
export interface RfqAuctionSettledJSON {
    auction: string;
    winner_mm: string;
    winning_premium_micro: string;
    refund_to_buyer_micro: string;
    settled_at: string;
}
export declare class RfqAuctionSettled {
    readonly auction: PublicKey;
    readonly winner_mm: PublicKey;
    readonly winning_premium_micro: BN;
    readonly refund_to_buyer_micro: BN;
    readonly settled_at: BN;
    constructor(fields: RfqAuctionSettledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqAuctionSettled;
    static toEncodable(fields: RfqAuctionSettledFields): {
        auction: PublicKey;
        winner_mm: PublicKey;
        winning_premium_micro: BN;
        refund_to_buyer_micro: BN;
        settled_at: BN;
    };
    toJSON(): RfqAuctionSettledJSON;
    static fromJSON(obj: RfqAuctionSettledJSON): RfqAuctionSettled;
    toEncodable(): {
        auction: PublicKey;
        winner_mm: PublicKey;
        winning_premium_micro: BN;
        refund_to_buyer_micro: BN;
        settled_at: BN;
    };
}
//# sourceMappingURL=RfqAuctionSettled.d.ts.map