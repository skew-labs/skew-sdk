import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionBoughtFields {
    option: PublicKey;
    holder: PublicKey;
    premium: BN;
    option_token_mint: PublicKey;
    metadata: PublicKey;
}
export interface OptionBoughtJSON {
    option: string;
    holder: string;
    premium: string;
    option_token_mint: string;
    metadata: string;
}
export declare class OptionBought {
    readonly option: PublicKey;
    readonly holder: PublicKey;
    readonly premium: BN;
    readonly option_token_mint: PublicKey;
    readonly metadata: PublicKey;
    constructor(fields: OptionBoughtFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionBought;
    static toEncodable(fields: OptionBoughtFields): {
        option: PublicKey;
        holder: PublicKey;
        premium: BN;
        option_token_mint: PublicKey;
        metadata: PublicKey;
    };
    toJSON(): OptionBoughtJSON;
    static fromJSON(obj: OptionBoughtJSON): OptionBought;
    toEncodable(): {
        option: PublicKey;
        holder: PublicKey;
        premium: BN;
        option_token_mint: PublicKey;
        metadata: PublicKey;
    };
}
//# sourceMappingURL=OptionBought.d.ts.map