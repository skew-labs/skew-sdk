import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface TierUpgradedFields {
    cm: PublicKey;
    authority: PublicKey;
    from_tier: number;
    to_tier: number;
    new_lockup_collateral: BN;
    tier_locked_until: BN;
    upgraded_at: BN;
}
export interface TierUpgradedJSON {
    cm: string;
    authority: string;
    from_tier: number;
    to_tier: number;
    new_lockup_collateral: string;
    tier_locked_until: string;
    upgraded_at: string;
}
export declare class TierUpgraded {
    readonly cm: PublicKey;
    readonly authority: PublicKey;
    readonly from_tier: number;
    readonly to_tier: number;
    readonly new_lockup_collateral: BN;
    readonly tier_locked_until: BN;
    readonly upgraded_at: BN;
    constructor(fields: TierUpgradedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.TierUpgraded;
    static toEncodable(fields: TierUpgradedFields): {
        cm: PublicKey;
        authority: PublicKey;
        from_tier: number;
        to_tier: number;
        new_lockup_collateral: BN;
        tier_locked_until: BN;
        upgraded_at: BN;
    };
    toJSON(): TierUpgradedJSON;
    static fromJSON(obj: TierUpgradedJSON): TierUpgraded;
    toEncodable(): {
        cm: PublicKey;
        authority: PublicKey;
        from_tier: number;
        to_tier: number;
        new_lockup_collateral: BN;
        tier_locked_until: BN;
        upgraded_at: BN;
    };
}
//# sourceMappingURL=TierUpgraded.d.ts.map