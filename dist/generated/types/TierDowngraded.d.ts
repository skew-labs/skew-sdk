import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface TierDowngradedFields {
    cm: PublicKey;
    authority: PublicKey;
    from_tier: number;
    to_tier: number;
    new_lockup_collateral: BN;
    released_collateral: BN;
    downgraded_at: BN;
}
export interface TierDowngradedJSON {
    cm: string;
    authority: string;
    from_tier: number;
    to_tier: number;
    new_lockup_collateral: string;
    released_collateral: string;
    downgraded_at: string;
}
export declare class TierDowngraded {
    readonly cm: PublicKey;
    readonly authority: PublicKey;
    readonly from_tier: number;
    readonly to_tier: number;
    readonly new_lockup_collateral: BN;
    readonly released_collateral: BN;
    readonly downgraded_at: BN;
    constructor(fields: TierDowngradedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TierDowngraded;
    static toEncodable(fields: TierDowngradedFields): {
        cm: PublicKey;
        authority: PublicKey;
        from_tier: number;
        to_tier: number;
        new_lockup_collateral: BN;
        released_collateral: BN;
        downgraded_at: BN;
    };
    toJSON(): TierDowngradedJSON;
    static fromJSON(obj: TierDowngradedJSON): TierDowngraded;
    toEncodable(): {
        cm: PublicKey;
        authority: PublicKey;
        from_tier: number;
        to_tier: number;
        new_lockup_collateral: BN;
        released_collateral: BN;
        downgraded_at: BN;
    };
}
//# sourceMappingURL=TierDowngraded.d.ts.map