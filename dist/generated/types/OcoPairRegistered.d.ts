import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OcoPairRegisteredFields {
    authority: PublicKey;
    order_a: PublicKey;
    order_b: PublicKey;
    action_target: PublicKey;
    registered_at: BN;
}
export interface OcoPairRegisteredJSON {
    authority: string;
    order_a: string;
    order_b: string;
    action_target: string;
    registered_at: string;
}
export declare class OcoPairRegistered {
    readonly authority: PublicKey;
    readonly order_a: PublicKey;
    readonly order_b: PublicKey;
    readonly action_target: PublicKey;
    readonly registered_at: BN;
    constructor(fields: OcoPairRegisteredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OcoPairRegistered;
    static toEncodable(fields: OcoPairRegisteredFields): {
        authority: PublicKey;
        order_a: PublicKey;
        order_b: PublicKey;
        action_target: PublicKey;
        registered_at: BN;
    };
    toJSON(): OcoPairRegisteredJSON;
    static fromJSON(obj: OcoPairRegisteredJSON): OcoPairRegistered;
    toEncodable(): {
        authority: PublicKey;
        order_a: PublicKey;
        order_b: PublicKey;
        action_target: PublicKey;
        registered_at: BN;
    };
}
//# sourceMappingURL=OcoPairRegistered.d.ts.map