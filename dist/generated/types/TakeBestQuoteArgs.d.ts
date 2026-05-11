import BN from "bn.js";
import * as types from "../types";
export interface TakeBestQuoteArgsFields {
    expected_premium_micro: BN;
}
export interface TakeBestQuoteArgsJSON {
    expected_premium_micro: string;
}
export declare class TakeBestQuoteArgs {
    readonly expected_premium_micro: BN;
    constructor(fields: TakeBestQuoteArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TakeBestQuoteArgs;
    static toEncodable(fields: TakeBestQuoteArgsFields): {
        expected_premium_micro: BN;
    };
    toJSON(): TakeBestQuoteArgsJSON;
    static fromJSON(obj: TakeBestQuoteArgsJSON): TakeBestQuoteArgs;
    toEncodable(): {
        expected_premium_micro: BN;
    };
}
//# sourceMappingURL=TakeBestQuoteArgs.d.ts.map