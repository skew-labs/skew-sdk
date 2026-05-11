import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionAdminSettledFields {
    option: PublicKey;
    admin_price: BN;
    payoff_to_holder: boolean;
    collateral: BN;
    settled_at: BN;
}
export interface OptionAdminSettledJSON {
    option: string;
    admin_price: string;
    payoff_to_holder: boolean;
    collateral: string;
    settled_at: string;
}
export declare class OptionAdminSettled {
    readonly option: PublicKey;
    readonly admin_price: BN;
    readonly payoff_to_holder: boolean;
    readonly collateral: BN;
    readonly settled_at: BN;
    constructor(fields: OptionAdminSettledFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionAdminSettled;
    static toEncodable(fields: OptionAdminSettledFields): {
        option: PublicKey;
        admin_price: BN;
        payoff_to_holder: boolean;
        collateral: BN;
        settled_at: BN;
    };
    toJSON(): OptionAdminSettledJSON;
    static fromJSON(obj: OptionAdminSettledJSON): OptionAdminSettled;
    toEncodable(): {
        option: PublicKey;
        admin_price: BN;
        payoff_to_holder: boolean;
        collateral: BN;
        settled_at: BN;
    };
}
//# sourceMappingURL=OptionAdminSettled.d.ts.map