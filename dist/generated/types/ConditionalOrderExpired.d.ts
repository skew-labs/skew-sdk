import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ConditionalOrderExpiredFields {
    order: PublicKey;
    authority: PublicKey;
    order_id: BN;
    expired_at: BN;
    cleanup_caller: PublicKey;
}
export interface ConditionalOrderExpiredJSON {
    order: string;
    authority: string;
    order_id: string;
    expired_at: string;
    cleanup_caller: string;
}
export declare class ConditionalOrderExpired {
    readonly order: PublicKey;
    readonly authority: PublicKey;
    readonly order_id: BN;
    readonly expired_at: BN;
    readonly cleanup_caller: PublicKey;
    constructor(fields: ConditionalOrderExpiredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ConditionalOrderExpired;
    static toEncodable(fields: ConditionalOrderExpiredFields): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        expired_at: BN;
        cleanup_caller: PublicKey;
    };
    toJSON(): ConditionalOrderExpiredJSON;
    static fromJSON(obj: ConditionalOrderExpiredJSON): ConditionalOrderExpired;
    toEncodable(): {
        order: PublicKey;
        authority: PublicKey;
        order_id: BN;
        expired_at: BN;
        cleanup_caller: PublicKey;
    };
}
//# sourceMappingURL=ConditionalOrderExpired.d.ts.map