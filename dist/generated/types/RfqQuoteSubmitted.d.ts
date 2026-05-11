import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqQuoteSubmittedFields {
    auction: PublicKey;
    mm: PublicKey;
    premium_micro: BN;
    valid_until_slot: BN;
    posted_slot: BN;
    is_new_best: boolean;
}
export interface RfqQuoteSubmittedJSON {
    auction: string;
    mm: string;
    premium_micro: string;
    valid_until_slot: string;
    posted_slot: string;
    is_new_best: boolean;
}
export declare class RfqQuoteSubmitted {
    readonly auction: PublicKey;
    readonly mm: PublicKey;
    readonly premium_micro: BN;
    readonly valid_until_slot: BN;
    readonly posted_slot: BN;
    readonly is_new_best: boolean;
    constructor(fields: RfqQuoteSubmittedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqQuoteSubmitted;
    static toEncodable(fields: RfqQuoteSubmittedFields): {
        auction: PublicKey;
        mm: PublicKey;
        premium_micro: BN;
        valid_until_slot: BN;
        posted_slot: BN;
        is_new_best: boolean;
    };
    toJSON(): RfqQuoteSubmittedJSON;
    static fromJSON(obj: RfqQuoteSubmittedJSON): RfqQuoteSubmitted;
    toEncodable(): {
        auction: PublicKey;
        mm: PublicKey;
        premium_micro: BN;
        valid_until_slot: BN;
        posted_slot: BN;
        is_new_best: boolean;
    };
}
//# sourceMappingURL=RfqQuoteSubmitted.d.ts.map