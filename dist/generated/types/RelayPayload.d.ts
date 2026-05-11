import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RelayPayloadFields {
    relay_nonce: BN;
    quote_expiry_ts: BN;
    option_type: types.OptionTypeKind;
    asset: number;
    direction: number;
    strike: BN;
    expiry_ts: BN;
    payoff_amount: BN;
    settlement_decimals: number;
    upper_bound: BN;
    extra_param: number;
    premium: BN;
    settlement_mint: PublicKey;
    buyer: PublicKey;
}
export interface RelayPayloadJSON {
    relay_nonce: string;
    quote_expiry_ts: string;
    option_type: types.OptionTypeJSON;
    asset: number;
    direction: number;
    strike: string;
    expiry_ts: string;
    payoff_amount: string;
    settlement_decimals: number;
    upper_bound: string;
    extra_param: number;
    premium: string;
    settlement_mint: string;
    buyer: string;
}
export declare class RelayPayload {
    readonly relay_nonce: BN;
    readonly quote_expiry_ts: BN;
    readonly option_type: types.OptionTypeKind;
    readonly asset: number;
    readonly direction: number;
    readonly strike: BN;
    readonly expiry_ts: BN;
    readonly payoff_amount: BN;
    readonly settlement_decimals: number;
    readonly upper_bound: BN;
    readonly extra_param: number;
    readonly premium: BN;
    readonly settlement_mint: PublicKey;
    readonly buyer: PublicKey;
    constructor(fields: RelayPayloadFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RelayPayload;
    static toEncodable(fields: RelayPayloadFields): {
        relay_nonce: BN;
        quote_expiry_ts: BN;
        option_type: {
            Vanilla: {};
        } | {
            Digital: {};
        } | {
            CappedVanilla: {};
        } | {
            RangeAccrual: {};
        } | {
            VanillaInverse: {};
        } | {
            DigitalInverse: {};
        };
        asset: number;
        direction: number;
        strike: BN;
        expiry_ts: BN;
        payoff_amount: BN;
        settlement_decimals: number;
        upper_bound: BN;
        extra_param: number;
        premium: BN;
        settlement_mint: PublicKey;
        buyer: PublicKey;
    };
    toJSON(): RelayPayloadJSON;
    static fromJSON(obj: RelayPayloadJSON): RelayPayload;
    toEncodable(): {
        relay_nonce: BN;
        quote_expiry_ts: BN;
        option_type: {
            Vanilla: {};
        } | {
            Digital: {};
        } | {
            CappedVanilla: {};
        } | {
            RangeAccrual: {};
        } | {
            VanillaInverse: {};
        } | {
            DigitalInverse: {};
        };
        asset: number;
        direction: number;
        strike: BN;
        expiry_ts: BN;
        payoff_amount: BN;
        settlement_decimals: number;
        upper_bound: BN;
        extra_param: number;
        premium: BN;
        settlement_mint: PublicKey;
        buyer: PublicKey;
    };
}
//# sourceMappingURL=RelayPayload.d.ts.map