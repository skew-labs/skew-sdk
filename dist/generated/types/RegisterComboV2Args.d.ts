import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RegisterComboV2ArgsFields {
    combo_id: BN;
    leg_count: number;
    legs: Array<types.ComboV2LegFields>;
    total_max_premium_micro: BN;
    expires_ts: BN;
}
export interface RegisterComboV2ArgsJSON {
    combo_id: string;
    leg_count: number;
    legs: Array<types.ComboV2LegJSON>;
    total_max_premium_micro: string;
    expires_ts: string;
}
export declare class RegisterComboV2Args {
    readonly combo_id: BN;
    readonly leg_count: number;
    readonly legs: Array<types.ComboV2Leg>;
    readonly total_max_premium_micro: BN;
    readonly expires_ts: BN;
    constructor(fields: RegisterComboV2ArgsFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RegisterComboV2Args;
    static toEncodable(fields: RegisterComboV2ArgsFields): {
        combo_id: BN;
        leg_count: number;
        legs: {
            option: PublicKey;
            side: number;
            filled: boolean;
            _pad_0: number[];
            max_premium_micro: BN;
            fill_premium_micro: BN;
        }[];
        total_max_premium_micro: BN;
        expires_ts: BN;
    };
    toJSON(): RegisterComboV2ArgsJSON;
    static fromJSON(obj: RegisterComboV2ArgsJSON): RegisterComboV2Args;
    toEncodable(): {
        combo_id: BN;
        leg_count: number;
        legs: {
            option: PublicKey;
            side: number;
            filled: boolean;
            _pad_0: number[];
            max_premium_micro: BN;
            fill_premium_micro: BN;
        }[];
        total_max_premium_micro: BN;
        expires_ts: BN;
    };
}
//# sourceMappingURL=RegisterComboV2Args.d.ts.map