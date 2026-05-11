import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboV2LegFields {
    option: PublicKey;
    side: number;
    filled: boolean;
    _pad_0: Array<number>;
    max_premium_micro: BN;
    fill_premium_micro: BN;
}
export interface ComboV2LegJSON {
    option: string;
    side: number;
    filled: boolean;
    _pad_0: Array<number>;
    max_premium_micro: string;
    fill_premium_micro: string;
}
export declare class ComboV2Leg {
    readonly option: PublicKey;
    readonly side: number;
    readonly filled: boolean;
    readonly _pad_0: Array<number>;
    readonly max_premium_micro: BN;
    readonly fill_premium_micro: BN;
    constructor(fields: ComboV2LegFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboV2Leg;
    static toEncodable(fields: ComboV2LegFields): {
        option: PublicKey;
        side: number;
        filled: boolean;
        _pad_0: number[];
        max_premium_micro: BN;
        fill_premium_micro: BN;
    };
    toJSON(): ComboV2LegJSON;
    static fromJSON(obj: ComboV2LegJSON): ComboV2Leg;
    toEncodable(): {
        option: PublicKey;
        side: number;
        filled: boolean;
        _pad_0: number[];
        max_premium_micro: BN;
        fill_premium_micro: BN;
    };
}
//# sourceMappingURL=ComboV2Leg.d.ts.map