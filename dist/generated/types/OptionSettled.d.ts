import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionSettledFields {
    option: PublicKey;
    settled_price: BN;
    payoff_to_holder: boolean;
    collateral: BN;
    settled_at: BN;
}
export interface OptionSettledJSON {
    option: string;
    settled_price: string;
    payoff_to_holder: boolean;
    collateral: string;
    settled_at: string;
}
export declare class OptionSettled {
    readonly option: PublicKey;
    readonly settled_price: BN;
    readonly payoff_to_holder: boolean;
    readonly collateral: BN;
    readonly settled_at: BN;
    constructor(fields: OptionSettledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionSettled;
    static toEncodable(fields: OptionSettledFields): {
        option: PublicKey;
        settled_price: BN;
        payoff_to_holder: boolean;
        collateral: BN;
        settled_at: BN;
    };
    toJSON(): OptionSettledJSON;
    static fromJSON(obj: OptionSettledJSON): OptionSettled;
    toEncodable(): {
        option: PublicKey;
        settled_price: BN;
        payoff_to_holder: boolean;
        collateral: BN;
        settled_at: BN;
    };
}
//# sourceMappingURL=OptionSettled.d.ts.map