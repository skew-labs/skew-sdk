import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface NativeSolCollateralDepositedFields {
    vault: PublicKey;
    user: PublicKey;
    amount: BN;
    new_sol_qty: BN;
    deposited_at: BN;
}
export interface NativeSolCollateralDepositedJSON {
    vault: string;
    user: string;
    amount: string;
    new_sol_qty: string;
    deposited_at: string;
}
export declare class NativeSolCollateralDeposited {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly amount: BN;
    readonly new_sol_qty: BN;
    readonly deposited_at: BN;
    constructor(fields: NativeSolCollateralDepositedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.NativeSolCollateralDeposited;
    static toEncodable(fields: NativeSolCollateralDepositedFields): {
        vault: PublicKey;
        user: PublicKey;
        amount: BN;
        new_sol_qty: BN;
        deposited_at: BN;
    };
    toJSON(): NativeSolCollateralDepositedJSON;
    static fromJSON(obj: NativeSolCollateralDepositedJSON): NativeSolCollateralDeposited;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        amount: BN;
        new_sol_qty: BN;
        deposited_at: BN;
    };
}
//# sourceMappingURL=NativeSolCollateralDeposited.d.ts.map