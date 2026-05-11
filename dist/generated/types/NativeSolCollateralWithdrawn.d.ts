import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface NativeSolCollateralWithdrawnFields {
    vault: PublicKey;
    user: PublicKey;
    amount: BN;
    new_sol_qty: BN;
    withdrawn_at: BN;
}
export interface NativeSolCollateralWithdrawnJSON {
    vault: string;
    user: string;
    amount: string;
    new_sol_qty: string;
    withdrawn_at: string;
}
export declare class NativeSolCollateralWithdrawn {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly amount: BN;
    readonly new_sol_qty: BN;
    readonly withdrawn_at: BN;
    constructor(fields: NativeSolCollateralWithdrawnFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.NativeSolCollateralWithdrawn;
    static toEncodable(fields: NativeSolCollateralWithdrawnFields): {
        vault: PublicKey;
        user: PublicKey;
        amount: BN;
        new_sol_qty: BN;
        withdrawn_at: BN;
    };
    toJSON(): NativeSolCollateralWithdrawnJSON;
    static fromJSON(obj: NativeSolCollateralWithdrawnJSON): NativeSolCollateralWithdrawn;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        amount: BN;
        new_sol_qty: BN;
        withdrawn_at: BN;
    };
}
//# sourceMappingURL=NativeSolCollateralWithdrawn.d.ts.map