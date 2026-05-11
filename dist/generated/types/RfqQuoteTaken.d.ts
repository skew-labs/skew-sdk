import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqQuoteTakenFields {
    auction: PublicKey;
    buyer: PublicKey;
    mm: PublicKey;
    premium_micro: BN;
    refund_to_buyer_micro: BN;
    slot: BN;
    taken_at: BN;
}
export interface RfqQuoteTakenJSON {
    auction: string;
    buyer: string;
    mm: string;
    premium_micro: string;
    refund_to_buyer_micro: string;
    slot: string;
    taken_at: string;
}
export declare class RfqQuoteTaken {
    readonly auction: PublicKey;
    readonly buyer: PublicKey;
    readonly mm: PublicKey;
    readonly premium_micro: BN;
    readonly refund_to_buyer_micro: BN;
    readonly slot: BN;
    readonly taken_at: BN;
    constructor(fields: RfqQuoteTakenFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqQuoteTaken;
    static toEncodable(fields: RfqQuoteTakenFields): {
        auction: PublicKey;
        buyer: PublicKey;
        mm: PublicKey;
        premium_micro: BN;
        refund_to_buyer_micro: BN;
        slot: BN;
        taken_at: BN;
    };
    toJSON(): RfqQuoteTakenJSON;
    static fromJSON(obj: RfqQuoteTakenJSON): RfqQuoteTaken;
    toEncodable(): {
        auction: PublicKey;
        buyer: PublicKey;
        mm: PublicKey;
        premium_micro: BN;
        refund_to_buyer_micro: BN;
        slot: BN;
        taken_at: BN;
    };
}
//# sourceMappingURL=RfqQuoteTaken.d.ts.map