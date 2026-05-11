import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqAuctionCancelledFields {
    auction: PublicKey;
    cancelled_by: string;
    refund_micro: BN;
    cancelled_at: BN;
}
export interface RfqAuctionCancelledJSON {
    auction: string;
    cancelled_by: string;
    refund_micro: string;
    cancelled_at: string;
}
export declare class RfqAuctionCancelled {
    readonly auction: PublicKey;
    readonly cancelled_by: string;
    readonly refund_micro: BN;
    readonly cancelled_at: BN;
    constructor(fields: RfqAuctionCancelledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqAuctionCancelled;
    static toEncodable(fields: RfqAuctionCancelledFields): {
        auction: PublicKey;
        cancelled_by: string;
        refund_micro: BN;
        cancelled_at: BN;
    };
    toJSON(): RfqAuctionCancelledJSON;
    static fromJSON(obj: RfqAuctionCancelledJSON): RfqAuctionCancelled;
    toEncodable(): {
        auction: PublicKey;
        cancelled_by: string;
        refund_micro: BN;
        cancelled_at: BN;
    };
}
//# sourceMappingURL=RfqAuctionCancelled.d.ts.map