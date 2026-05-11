import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RelayFillExecutedFields {
    option: PublicKey;
    buyer: PublicKey;
    seller_cm: PublicKey;
    relay_nonce: BN;
    premium: BN;
    fee: BN;
    collateral_locked: BN;
    quote_expiry_ts: BN;
    filled_at: BN;
    buyer_sig: Array<number>;
    cm_sig: Array<number>;
    digest: Array<number>;
}
export interface RelayFillExecutedJSON {
    option: string;
    buyer: string;
    seller_cm: string;
    relay_nonce: string;
    premium: string;
    fee: string;
    collateral_locked: string;
    quote_expiry_ts: string;
    filled_at: string;
    buyer_sig: Array<number>;
    cm_sig: Array<number>;
    digest: Array<number>;
}
export declare class RelayFillExecuted {
    readonly option: PublicKey;
    readonly buyer: PublicKey;
    readonly seller_cm: PublicKey;
    readonly relay_nonce: BN;
    readonly premium: BN;
    readonly fee: BN;
    readonly collateral_locked: BN;
    readonly quote_expiry_ts: BN;
    readonly filled_at: BN;
    readonly buyer_sig: Array<number>;
    readonly cm_sig: Array<number>;
    readonly digest: Array<number>;
    constructor(fields: RelayFillExecutedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RelayFillExecuted;
    static toEncodable(fields: RelayFillExecutedFields): {
        option: PublicKey;
        buyer: PublicKey;
        seller_cm: PublicKey;
        relay_nonce: BN;
        premium: BN;
        fee: BN;
        collateral_locked: BN;
        quote_expiry_ts: BN;
        filled_at: BN;
        buyer_sig: number[];
        cm_sig: number[];
        digest: number[];
    };
    toJSON(): RelayFillExecutedJSON;
    static fromJSON(obj: RelayFillExecutedJSON): RelayFillExecuted;
    toEncodable(): {
        option: PublicKey;
        buyer: PublicKey;
        seller_cm: PublicKey;
        relay_nonce: BN;
        premium: BN;
        fee: BN;
        collateral_locked: BN;
        quote_expiry_ts: BN;
        filled_at: BN;
        buyer_sig: number[];
        cm_sig: number[];
        digest: number[];
    };
}
//# sourceMappingURL=RelayFillExecuted.d.ts.map