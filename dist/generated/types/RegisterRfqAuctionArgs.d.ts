import BN from "bn.js";
import * as types from "../types";
export interface RegisterRfqAuctionArgsFields {
    auction_id: BN;
    option_spec: types.RfqOptionSpecFields;
    max_premium_micro: BN;
    duration_slots: BN;
    is_block_trade: boolean;
    minimum_size_micro: BN;
    eligible_maker_count: number;
}
export interface RegisterRfqAuctionArgsJSON {
    auction_id: string;
    option_spec: types.RfqOptionSpecJSON;
    max_premium_micro: string;
    duration_slots: string;
    is_block_trade: boolean;
    minimum_size_micro: string;
    eligible_maker_count: number;
}
export declare class RegisterRfqAuctionArgs {
    readonly auction_id: BN;
    readonly option_spec: types.RfqOptionSpec;
    readonly max_premium_micro: BN;
    readonly duration_slots: BN;
    readonly is_block_trade: boolean;
    readonly minimum_size_micro: BN;
    readonly eligible_maker_count: number;
    constructor(fields: RegisterRfqAuctionArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RegisterRfqAuctionArgs;
    static toEncodable(fields: RegisterRfqAuctionArgsFields): {
        auction_id: BN;
        option_spec: {
            asset: number;
            option_type: number;
            direction: number;
            _pad_0: number[];
            strike: BN;
            expiry_ts: BN;
            payoff_amount_micro: BN;
            upper_bound: BN;
        };
        max_premium_micro: BN;
        duration_slots: BN;
        is_block_trade: boolean;
        minimum_size_micro: BN;
        eligible_maker_count: number;
    };
    toJSON(): RegisterRfqAuctionArgsJSON;
    static fromJSON(obj: RegisterRfqAuctionArgsJSON): RegisterRfqAuctionArgs;
    toEncodable(): {
        auction_id: BN;
        option_spec: {
            asset: number;
            option_type: number;
            direction: number;
            _pad_0: number[];
            strike: BN;
            expiry_ts: BN;
            payoff_amount_micro: BN;
            upper_bound: BN;
        };
        max_premium_micro: BN;
        duration_slots: BN;
        is_block_trade: boolean;
        minimum_size_micro: BN;
        eligible_maker_count: number;
    };
}
//# sourceMappingURL=RegisterRfqAuctionArgs.d.ts.map