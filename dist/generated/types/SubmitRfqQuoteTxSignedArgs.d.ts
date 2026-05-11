import BN from "bn.js";
import * as types from "../types";
export interface SubmitRfqQuoteTxSignedArgsFields {
    premium_micro: BN;
    valid_until_slot: BN;
}
export interface SubmitRfqQuoteTxSignedArgsJSON {
    premium_micro: string;
    valid_until_slot: string;
}
export declare class SubmitRfqQuoteTxSignedArgs {
    readonly premium_micro: BN;
    readonly valid_until_slot: BN;
    constructor(fields: SubmitRfqQuoteTxSignedArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.SubmitRfqQuoteTxSignedArgs;
    static toEncodable(fields: SubmitRfqQuoteTxSignedArgsFields): {
        premium_micro: BN;
        valid_until_slot: BN;
    };
    toJSON(): SubmitRfqQuoteTxSignedArgsJSON;
    static fromJSON(obj: SubmitRfqQuoteTxSignedArgsJSON): SubmitRfqQuoteTxSignedArgs;
    toEncodable(): {
        premium_micro: BN;
        valid_until_slot: BN;
    };
}
//# sourceMappingURL=SubmitRfqQuoteTxSignedArgs.d.ts.map