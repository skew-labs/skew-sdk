import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionCreatedFields {
    option: PublicKey;
    creator: PublicKey;
    nonce: BN;
    option_type: types.OptionTypeKind;
    strike: BN;
    expiry_ts: BN;
    payoff_amount: BN;
    settlement_mint: PublicKey;
    created_at: BN;
}
export interface OptionCreatedJSON {
    option: string;
    creator: string;
    nonce: string;
    option_type: types.OptionTypeJSON;
    strike: string;
    expiry_ts: string;
    payoff_amount: string;
    settlement_mint: string;
    created_at: string;
}
export declare class OptionCreated {
    readonly option: PublicKey;
    readonly creator: PublicKey;
    readonly nonce: BN;
    readonly option_type: types.OptionTypeKind;
    readonly strike: BN;
    readonly expiry_ts: BN;
    readonly payoff_amount: BN;
    readonly settlement_mint: PublicKey;
    readonly created_at: BN;
    constructor(fields: OptionCreatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionCreated;
    static toEncodable(fields: OptionCreatedFields): {
        option: PublicKey;
        creator: PublicKey;
        nonce: BN;
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
        strike: BN;
        expiry_ts: BN;
        payoff_amount: BN;
        settlement_mint: PublicKey;
        created_at: BN;
    };
    toJSON(): OptionCreatedJSON;
    static fromJSON(obj: OptionCreatedJSON): OptionCreated;
    toEncodable(): {
        option: PublicKey;
        creator: PublicKey;
        nonce: BN;
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
        strike: BN;
        expiry_ts: BN;
        payoff_amount: BN;
        settlement_mint: PublicKey;
        created_at: BN;
    };
}
//# sourceMappingURL=OptionCreated.d.ts.map