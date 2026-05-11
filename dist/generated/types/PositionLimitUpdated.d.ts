import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface PositionLimitUpdatedFields {
    asset_idx: number;
    prev_limit_usd_micro: BN;
    new_limit_usd_micro: BN;
    updated_at: BN;
    updated_by: PublicKey;
}
export interface PositionLimitUpdatedJSON {
    asset_idx: number;
    prev_limit_usd_micro: string;
    new_limit_usd_micro: string;
    updated_at: string;
    updated_by: string;
}
export declare class PositionLimitUpdated {
    readonly asset_idx: number;
    readonly prev_limit_usd_micro: BN;
    readonly new_limit_usd_micro: BN;
    readonly updated_at: BN;
    readonly updated_by: PublicKey;
    constructor(fields: PositionLimitUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.PositionLimitUpdated;
    static toEncodable(fields: PositionLimitUpdatedFields): {
        asset_idx: number;
        prev_limit_usd_micro: BN;
        new_limit_usd_micro: BN;
        updated_at: BN;
        updated_by: PublicKey;
    };
    toJSON(): PositionLimitUpdatedJSON;
    static fromJSON(obj: PositionLimitUpdatedJSON): PositionLimitUpdated;
    toEncodable(): {
        asset_idx: number;
        prev_limit_usd_micro: BN;
        new_limit_usd_micro: BN;
        updated_at: BN;
        updated_by: PublicKey;
    };
}
//# sourceMappingURL=PositionLimitUpdated.d.ts.map