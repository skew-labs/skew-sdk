import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqAuctionRegisteredFields {
    auction: PublicKey;
    auction_id: BN;
    buyer: PublicKey;
    asset: number;
    strike_micro: BN;
    expiry_ts: BN;
    option_type: number;
    payoff_amount_micro: BN;
    max_premium_micro: BN;
    auction_open_slot: BN;
    auction_close_slot: BN;
    registered_at: BN;
}
export interface RfqAuctionRegisteredJSON {
    auction: string;
    auction_id: string;
    buyer: string;
    asset: number;
    strike_micro: string;
    expiry_ts: string;
    option_type: number;
    payoff_amount_micro: string;
    max_premium_micro: string;
    auction_open_slot: string;
    auction_close_slot: string;
    registered_at: string;
}
export declare class RfqAuctionRegistered {
    readonly auction: PublicKey;
    readonly auction_id: BN;
    readonly buyer: PublicKey;
    readonly asset: number;
    readonly strike_micro: BN;
    readonly expiry_ts: BN;
    readonly option_type: number;
    readonly payoff_amount_micro: BN;
    readonly max_premium_micro: BN;
    readonly auction_open_slot: BN;
    readonly auction_close_slot: BN;
    readonly registered_at: BN;
    constructor(fields: RfqAuctionRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqAuctionRegistered;
    static toEncodable(fields: RfqAuctionRegisteredFields): {
        auction: PublicKey;
        auction_id: BN;
        buyer: PublicKey;
        asset: number;
        strike_micro: BN;
        expiry_ts: BN;
        option_type: number;
        payoff_amount_micro: BN;
        max_premium_micro: BN;
        auction_open_slot: BN;
        auction_close_slot: BN;
        registered_at: BN;
    };
    toJSON(): RfqAuctionRegisteredJSON;
    static fromJSON(obj: RfqAuctionRegisteredJSON): RfqAuctionRegistered;
    toEncodable(): {
        auction: PublicKey;
        auction_id: BN;
        buyer: PublicKey;
        asset: number;
        strike_micro: BN;
        expiry_ts: BN;
        option_type: number;
        payoff_amount_micro: BN;
        max_premium_micro: BN;
        auction_open_slot: BN;
        auction_close_slot: BN;
        registered_at: BN;
    };
}
//# sourceMappingURL=RfqAuctionRegistered.d.ts.map