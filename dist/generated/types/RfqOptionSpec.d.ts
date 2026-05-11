import BN from "bn.js";
import * as types from "../types";
export interface RfqOptionSpecFields {
    asset: number;
    option_type: number;
    direction: number;
    _pad_0: Array<number>;
    strike: BN;
    expiry_ts: BN;
    payoff_amount_micro: BN;
    upper_bound: BN;
}
export interface RfqOptionSpecJSON {
    asset: number;
    option_type: number;
    direction: number;
    _pad_0: Array<number>;
    strike: string;
    expiry_ts: string;
    payoff_amount_micro: string;
    upper_bound: string;
}
export declare class RfqOptionSpec {
    readonly asset: number;
    readonly option_type: number;
    readonly direction: number;
    readonly _pad_0: Array<number>;
    readonly strike: BN;
    readonly expiry_ts: BN;
    readonly payoff_amount_micro: BN;
    readonly upper_bound: BN;
    constructor(fields: RfqOptionSpecFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqOptionSpec;
    static toEncodable(fields: RfqOptionSpecFields): {
        asset: number;
        option_type: number;
        direction: number;
        _pad_0: number[];
        strike: BN;
        expiry_ts: BN;
        payoff_amount_micro: BN;
        upper_bound: BN;
    };
    toJSON(): RfqOptionSpecJSON;
    static fromJSON(obj: RfqOptionSpecJSON): RfqOptionSpec;
    toEncodable(): {
        asset: number;
        option_type: number;
        direction: number;
        _pad_0: number[];
        strike: BN;
        expiry_ts: BN;
        payoff_amount_micro: BN;
        upper_bound: BN;
    };
}
//# sourceMappingURL=RfqOptionSpec.d.ts.map