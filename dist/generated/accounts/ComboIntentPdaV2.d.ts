import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentPdaV2Fields {
    buyer: PublicKey;
    combo_id: BN;
    status: number;
    leg_count: number;
    legs_filled: number;
    bump: number;
    _padding_0: Array<number>;
    total_max_premium_micro: BN;
    total_realised_premium_micro: BN;
    expires_ts: BN;
    created_at: BN;
    legs: Array<types.ComboV2LegFields>;
    _reserved: Array<number>;
}
export interface ComboIntentPdaV2JSON {
    buyer: string;
    combo_id: string;
    status: number;
    leg_count: number;
    legs_filled: number;
    bump: number;
    _padding_0: Array<number>;
    total_max_premium_micro: string;
    total_realised_premium_micro: string;
    expires_ts: string;
    created_at: string;
    legs: Array<types.ComboV2LegJSON>;
    _reserved: Array<number>;
}
export declare class ComboIntentPdaV2 {
    readonly buyer: PublicKey;
    readonly combo_id: BN;
    readonly status: number;
    readonly leg_count: number;
    readonly legs_filled: number;
    readonly bump: number;
    readonly _padding_0: Array<number>;
    readonly total_max_premium_micro: BN;
    readonly total_realised_premium_micro: BN;
    readonly expires_ts: BN;
    readonly created_at: BN;
    readonly legs: Array<types.ComboV2Leg>;
    readonly _reserved: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: ComboIntentPdaV2Fields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ComboIntentPdaV2 | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ComboIntentPdaV2 | null>>;
    static decode(data: Buffer): ComboIntentPdaV2;
    toJSON(): ComboIntentPdaV2JSON;
    static fromJSON(obj: ComboIntentPdaV2JSON): ComboIntentPdaV2;
}
//# sourceMappingURL=ComboIntentPdaV2.d.ts.map