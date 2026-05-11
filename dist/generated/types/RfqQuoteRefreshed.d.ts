import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqQuoteRefreshedFields {
    auction: PublicKey;
    mm: PublicKey;
    premium_micro: BN;
    valid_until_slot: BN;
    posted_slot: BN;
}
export interface RfqQuoteRefreshedJSON {
    auction: string;
    mm: string;
    premium_micro: string;
    valid_until_slot: string;
    posted_slot: string;
}
export declare class RfqQuoteRefreshed {
    readonly auction: PublicKey;
    readonly mm: PublicKey;
    readonly premium_micro: BN;
    readonly valid_until_slot: BN;
    readonly posted_slot: BN;
    constructor(fields: RfqQuoteRefreshedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqQuoteRefreshed;
    static toEncodable(fields: RfqQuoteRefreshedFields): {
        auction: PublicKey;
        mm: PublicKey;
        premium_micro: BN;
        valid_until_slot: BN;
        posted_slot: BN;
    };
    toJSON(): RfqQuoteRefreshedJSON;
    static fromJSON(obj: RfqQuoteRefreshedJSON): RfqQuoteRefreshed;
    toEncodable(): {
        auction: PublicKey;
        mm: PublicKey;
        premium_micro: BN;
        valid_until_slot: BN;
        posted_slot: BN;
    };
}
//# sourceMappingURL=RfqQuoteRefreshed.d.ts.map