import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface OptionRolledOverFields {
    old_option: PublicKey;
    new_option: PublicKey;
    creator: PublicKey;
    new_expiry_ts: BN;
    new_strike: BN;
    new_payoff_amount: BN;
    collateral_carried: BN;
    rolled_at: BN;
}
export interface OptionRolledOverJSON {
    old_option: string;
    new_option: string;
    creator: string;
    new_expiry_ts: string;
    new_strike: string;
    new_payoff_amount: string;
    collateral_carried: string;
    rolled_at: string;
}
export declare class OptionRolledOver {
    readonly old_option: PublicKey;
    readonly new_option: PublicKey;
    readonly creator: PublicKey;
    readonly new_expiry_ts: BN;
    readonly new_strike: BN;
    readonly new_payoff_amount: BN;
    readonly collateral_carried: BN;
    readonly rolled_at: BN;
    constructor(fields: OptionRolledOverFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.OptionRolledOver;
    static toEncodable(fields: OptionRolledOverFields): {
        old_option: PublicKey;
        new_option: PublicKey;
        creator: PublicKey;
        new_expiry_ts: BN;
        new_strike: BN;
        new_payoff_amount: BN;
        collateral_carried: BN;
        rolled_at: BN;
    };
    toJSON(): OptionRolledOverJSON;
    static fromJSON(obj: OptionRolledOverJSON): OptionRolledOver;
    toEncodable(): {
        old_option: PublicKey;
        new_option: PublicKey;
        creator: PublicKey;
        new_expiry_ts: BN;
        new_strike: BN;
        new_payoff_amount: BN;
        collateral_carried: BN;
        rolled_at: BN;
    };
}
//# sourceMappingURL=OptionRolledOver.d.ts.map