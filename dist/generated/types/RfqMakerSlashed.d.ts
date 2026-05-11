import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RfqMakerSlashedFields {
    registry: PublicKey;
    mm: PublicKey;
    slasher: PublicKey;
    forfeit_lamports: BN;
    slashed_at: BN;
}
export interface RfqMakerSlashedJSON {
    registry: string;
    mm: string;
    slasher: string;
    forfeit_lamports: string;
    slashed_at: string;
}
export declare class RfqMakerSlashed {
    readonly registry: PublicKey;
    readonly mm: PublicKey;
    readonly slasher: PublicKey;
    readonly forfeit_lamports: BN;
    readonly slashed_at: BN;
    constructor(fields: RfqMakerSlashedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RfqMakerSlashed;
    static toEncodable(fields: RfqMakerSlashedFields): {
        registry: PublicKey;
        mm: PublicKey;
        slasher: PublicKey;
        forfeit_lamports: BN;
        slashed_at: BN;
    };
    toJSON(): RfqMakerSlashedJSON;
    static fromJSON(obj: RfqMakerSlashedJSON): RfqMakerSlashed;
    toEncodable(): {
        registry: PublicKey;
        mm: PublicKey;
        slasher: PublicKey;
        forfeit_lamports: BN;
        slashed_at: BN;
    };
}
//# sourceMappingURL=RfqMakerSlashed.d.ts.map