import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqQuoteFields {
    mm: PublicKey;
    premium_micro: BN;
    maker_signature: Array<number>;
    valid_until_slot: BN;
    posted_slot: BN;
}
export interface RfqQuoteJSON {
    mm: string;
    premium_micro: string;
    maker_signature: Array<number>;
    valid_until_slot: string;
    posted_slot: string;
}
export declare class RfqQuote {
    readonly mm: PublicKey;
    readonly premium_micro: BN;
    readonly maker_signature: Array<number>;
    readonly valid_until_slot: BN;
    readonly posted_slot: BN;
    constructor(fields: RfqQuoteFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqQuote;
    static toEncodable(fields: RfqQuoteFields): {
        mm: PublicKey;
        premium_micro: BN;
        maker_signature: number[];
        valid_until_slot: BN;
        posted_slot: BN;
    };
    toJSON(): RfqQuoteJSON;
    static fromJSON(obj: RfqQuoteJSON): RfqQuote;
    toEncodable(): {
        mm: PublicKey;
        premium_micro: BN;
        maker_signature: number[];
        valid_until_slot: BN;
        posted_slot: BN;
    };
}
//# sourceMappingURL=RfqQuote.d.ts.map