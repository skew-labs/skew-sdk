import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboLegSpecFields {
    option: PublicKey;
    side: number;
    max_premium_micro: BN;
    _padding: Array<number>;
}
export interface ComboLegSpecJSON {
    option: string;
    side: number;
    max_premium_micro: string;
    _padding: Array<number>;
}
export declare class ComboLegSpec {
    readonly option: PublicKey;
    readonly side: number;
    readonly max_premium_micro: BN;
    readonly _padding: Array<number>;
    constructor(fields: ComboLegSpecFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.ComboLegSpec;
    static toEncodable(fields: ComboLegSpecFields): {
        option: PublicKey;
        side: number;
        max_premium_micro: BN;
        _padding: number[];
    };
    toJSON(): ComboLegSpecJSON;
    static fromJSON(obj: ComboLegSpecJSON): ComboLegSpec;
    toEncodable(): {
        option: PublicKey;
        side: number;
        max_premium_micro: BN;
        _padding: number[];
    };
}
//# sourceMappingURL=ComboLegSpec.d.ts.map