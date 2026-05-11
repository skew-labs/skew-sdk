import BN from "bn.js";
import * as types from "../types";
export interface CompressionLegFields {
    qty_micro: BN;
}
export interface CompressionLegJSON {
    qty_micro: string;
}
export declare class CompressionLeg {
    readonly qty_micro: BN;
    constructor(fields: CompressionLegFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CompressionLeg;
    static toEncodable(fields: CompressionLegFields): {
        qty_micro: BN;
    };
    toJSON(): CompressionLegJSON;
    static fromJSON(obj: CompressionLegJSON): CompressionLeg;
    toEncodable(): {
        qty_micro: BN;
    };
}
//# sourceMappingURL=CompressionLeg.d.ts.map