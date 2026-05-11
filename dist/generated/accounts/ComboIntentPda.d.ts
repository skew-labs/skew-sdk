import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ComboIntentPdaFields {
    buyer: PublicKey;
    combo_id: BN;
    n_legs: number;
    legs_filled_mask: number;
    status: types.ComboStatusKind;
    bump: number;
    _padding_0: Array<number>;
    total_max_premium_micro: BN;
    total_premium_paid_micro: BN;
    expiry_ts: BN;
    created_at: BN;
    legs: Array<types.ComboLegSpecFields>;
}
export interface ComboIntentPdaJSON {
    buyer: string;
    combo_id: string;
    n_legs: number;
    legs_filled_mask: number;
    status: types.ComboStatusJSON;
    bump: number;
    _padding_0: Array<number>;
    total_max_premium_micro: string;
    total_premium_paid_micro: string;
    expiry_ts: string;
    created_at: string;
    legs: Array<types.ComboLegSpecJSON>;
}
export declare class ComboIntentPda {
    readonly buyer: PublicKey;
    readonly combo_id: BN;
    readonly n_legs: number;
    readonly legs_filled_mask: number;
    readonly status: types.ComboStatusKind;
    readonly bump: number;
    readonly _padding_0: Array<number>;
    readonly total_max_premium_micro: BN;
    readonly total_premium_paid_micro: BN;
    readonly expiry_ts: BN;
    readonly created_at: BN;
    readonly legs: Array<types.ComboLegSpec>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: ComboIntentPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ComboIntentPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ComboIntentPda | null>>;
    static decode(data: Buffer): ComboIntentPda;
    toJSON(): ComboIntentPdaJSON;
    static fromJSON(obj: ComboIntentPdaJSON): ComboIntentPda;
}
//# sourceMappingURL=ComboIntentPda.d.ts.map