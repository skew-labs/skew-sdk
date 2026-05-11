import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MakerAxeRevokedFields {
    axe: PublicKey;
    mm: PublicKey;
    axe_id: BN;
    slot: BN;
    revoked_at: BN;
}
export interface MakerAxeRevokedJSON {
    axe: string;
    mm: string;
    axe_id: string;
    slot: string;
    revoked_at: string;
}
export declare class MakerAxeRevoked {
    readonly axe: PublicKey;
    readonly mm: PublicKey;
    readonly axe_id: BN;
    readonly slot: BN;
    readonly revoked_at: BN;
    constructor(fields: MakerAxeRevokedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MakerAxeRevoked;
    static toEncodable(fields: MakerAxeRevokedFields): {
        axe: PublicKey;
        mm: PublicKey;
        axe_id: BN;
        slot: BN;
        revoked_at: BN;
    };
    toJSON(): MakerAxeRevokedJSON;
    static fromJSON(obj: MakerAxeRevokedJSON): MakerAxeRevoked;
    toEncodable(): {
        axe: PublicKey;
        mm: PublicKey;
        axe_id: BN;
        slot: BN;
        revoked_at: BN;
    };
}
//# sourceMappingURL=MakerAxeRevoked.d.ts.map