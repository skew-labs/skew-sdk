import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MakerRiskConfigUpdatedFields {
    registry: PublicKey;
    mm: PublicKey;
    quote_off: boolean;
    identity_mode: number;
    margin_mode: number;
    risk_scope_asset: number;
    collateral_scope: number;
    updated_at: BN;
}
export interface MakerRiskConfigUpdatedJSON {
    registry: string;
    mm: string;
    quote_off: boolean;
    identity_mode: number;
    margin_mode: number;
    risk_scope_asset: number;
    collateral_scope: number;
    updated_at: string;
}
export declare class MakerRiskConfigUpdated {
    readonly registry: PublicKey;
    readonly mm: PublicKey;
    readonly quote_off: boolean;
    readonly identity_mode: number;
    readonly margin_mode: number;
    readonly risk_scope_asset: number;
    readonly collateral_scope: number;
    readonly updated_at: BN;
    constructor(fields: MakerRiskConfigUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MakerRiskConfigUpdated;
    static toEncodable(fields: MakerRiskConfigUpdatedFields): {
        registry: PublicKey;
        mm: PublicKey;
        quote_off: boolean;
        identity_mode: number;
        margin_mode: number;
        risk_scope_asset: number;
        collateral_scope: number;
        updated_at: BN;
    };
    toJSON(): MakerRiskConfigUpdatedJSON;
    static fromJSON(obj: MakerRiskConfigUpdatedJSON): MakerRiskConfigUpdated;
    toEncodable(): {
        registry: PublicKey;
        mm: PublicKey;
        quote_off: boolean;
        identity_mode: number;
        margin_mode: number;
        risk_scope_asset: number;
        collateral_scope: number;
        updated_at: BN;
    };
}
//# sourceMappingURL=MakerRiskConfigUpdated.d.ts.map