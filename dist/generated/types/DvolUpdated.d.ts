import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface DvolUpdatedFields {
    dvol_pda: PublicKey;
    asset: number;
    last_update_slot: BN;
    dvol_28d_micro: BN;
    dvol_90d_micro: BN;
    realized_var_28d_micro: BN;
}
export interface DvolUpdatedJSON {
    dvol_pda: string;
    asset: number;
    last_update_slot: string;
    dvol_28d_micro: string;
    dvol_90d_micro: string;
    realized_var_28d_micro: string;
}
export declare class DvolUpdated {
    readonly dvol_pda: PublicKey;
    readonly asset: number;
    readonly last_update_slot: BN;
    readonly dvol_28d_micro: BN;
    readonly dvol_90d_micro: BN;
    readonly realized_var_28d_micro: BN;
    constructor(fields: DvolUpdatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.DvolUpdated;
    static toEncodable(fields: DvolUpdatedFields): {
        dvol_pda: PublicKey;
        asset: number;
        last_update_slot: BN;
        dvol_28d_micro: BN;
        dvol_90d_micro: BN;
        realized_var_28d_micro: BN;
    };
    toJSON(): DvolUpdatedJSON;
    static fromJSON(obj: DvolUpdatedJSON): DvolUpdated;
    toEncodable(): {
        dvol_pda: PublicKey;
        asset: number;
        last_update_slot: BN;
        dvol_28d_micro: BN;
        dvol_90d_micro: BN;
        realized_var_28d_micro: BN;
    };
}
//# sourceMappingURL=DvolUpdated.d.ts.map