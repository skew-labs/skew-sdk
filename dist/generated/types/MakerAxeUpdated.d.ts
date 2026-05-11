import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MakerAxeUpdatedFields {
    axe: PublicKey;
    mm: PublicKey;
    axe_id: BN;
    version_slot: BN;
    asset: number;
    side: number;
    size_micro: BN;
    bid_premium_band_lo: BN;
    ask_premium_band_lo: BN;
    valid_until: BN;
    updated_at: BN;
}
export interface MakerAxeUpdatedJSON {
    axe: string;
    mm: string;
    axe_id: string;
    version_slot: string;
    asset: number;
    side: number;
    size_micro: string;
    bid_premium_band_lo: string;
    ask_premium_band_lo: string;
    valid_until: string;
    updated_at: string;
}
export declare class MakerAxeUpdated {
    readonly axe: PublicKey;
    readonly mm: PublicKey;
    readonly axe_id: BN;
    readonly version_slot: BN;
    readonly asset: number;
    readonly side: number;
    readonly size_micro: BN;
    readonly bid_premium_band_lo: BN;
    readonly ask_premium_band_lo: BN;
    readonly valid_until: BN;
    readonly updated_at: BN;
    constructor(fields: MakerAxeUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MakerAxeUpdated;
    static toEncodable(fields: MakerAxeUpdatedFields): {
        axe: PublicKey;
        mm: PublicKey;
        axe_id: BN;
        version_slot: BN;
        asset: number;
        side: number;
        size_micro: BN;
        bid_premium_band_lo: BN;
        ask_premium_band_lo: BN;
        valid_until: BN;
        updated_at: BN;
    };
    toJSON(): MakerAxeUpdatedJSON;
    static fromJSON(obj: MakerAxeUpdatedJSON): MakerAxeUpdated;
    toEncodable(): {
        axe: PublicKey;
        mm: PublicKey;
        axe_id: BN;
        version_slot: BN;
        asset: number;
        side: number;
        size_micro: BN;
        bid_premium_band_lo: BN;
        ask_premium_band_lo: BN;
        valid_until: BN;
        updated_at: BN;
    };
}
//# sourceMappingURL=MakerAxeUpdated.d.ts.map