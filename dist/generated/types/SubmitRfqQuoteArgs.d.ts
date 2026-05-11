import BN from "bn.js";
import * as types from "../types";
export interface SubmitRfqQuoteArgsFields {
    premium_micro: BN;
    maker_signature: Array<number>;
    valid_until_slot: BN;
}
export interface SubmitRfqQuoteArgsJSON {
    premium_micro: string;
    maker_signature: Array<number>;
    valid_until_slot: string;
}
export declare class SubmitRfqQuoteArgs {
    readonly premium_micro: BN;
    readonly maker_signature: Array<number>;
    readonly valid_until_slot: BN;
    constructor(fields: SubmitRfqQuoteArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SubmitRfqQuoteArgs;
    static toEncodable(fields: SubmitRfqQuoteArgsFields): {
        premium_micro: BN;
        maker_signature: number[];
        valid_until_slot: BN;
    };
    toJSON(): SubmitRfqQuoteArgsJSON;
    static fromJSON(obj: SubmitRfqQuoteArgsJSON): SubmitRfqQuoteArgs;
    toEncodable(): {
        premium_micro: BN;
        maker_signature: number[];
        valid_until_slot: BN;
    };
}
//# sourceMappingURL=SubmitRfqQuoteArgs.d.ts.map