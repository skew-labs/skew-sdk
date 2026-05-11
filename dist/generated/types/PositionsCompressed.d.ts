import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PositionsCompressedFields {
    cm: PublicKey;
    n_legs_compressed: number;
    gross_notional_before: BN;
    gross_notional_after: BN;
    freed_im_micro: BN;
    compressed_at: BN;
}
export interface PositionsCompressedJSON {
    cm: string;
    n_legs_compressed: number;
    gross_notional_before: string;
    gross_notional_after: string;
    freed_im_micro: string;
    compressed_at: string;
}
export declare class PositionsCompressed {
    readonly cm: PublicKey;
    readonly n_legs_compressed: number;
    readonly gross_notional_before: BN;
    readonly gross_notional_after: BN;
    readonly freed_im_micro: BN;
    readonly compressed_at: BN;
    constructor(fields: PositionsCompressedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PositionsCompressed;
    static toEncodable(fields: PositionsCompressedFields): {
        cm: PublicKey;
        n_legs_compressed: number;
        gross_notional_before: BN;
        gross_notional_after: BN;
        freed_im_micro: BN;
        compressed_at: BN;
    };
    toJSON(): PositionsCompressedJSON;
    static fromJSON(obj: PositionsCompressedJSON): PositionsCompressed;
    toEncodable(): {
        cm: PublicKey;
        n_legs_compressed: number;
        gross_notional_before: BN;
        gross_notional_after: BN;
        freed_im_micro: BN;
        compressed_at: BN;
    };
}
//# sourceMappingURL=PositionsCompressed.d.ts.map