import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface LstCollateralWithdrawnFields {
    vault: PublicKey;
    user: PublicKey;
    lst_mint: PublicKey;
    amount: BN;
    new_lst_qty: BN;
    withdrawn_at: BN;
}
export interface LstCollateralWithdrawnJSON {
    vault: string;
    user: string;
    lst_mint: string;
    amount: string;
    new_lst_qty: string;
    withdrawn_at: string;
}
export declare class LstCollateralWithdrawn {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly lst_mint: PublicKey;
    readonly amount: BN;
    readonly new_lst_qty: BN;
    readonly withdrawn_at: BN;
    constructor(fields: LstCollateralWithdrawnFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LstCollateralWithdrawn;
    static toEncodable(fields: LstCollateralWithdrawnFields): {
        vault: PublicKey;
        user: PublicKey;
        lst_mint: PublicKey;
        amount: BN;
        new_lst_qty: BN;
        withdrawn_at: BN;
    };
    toJSON(): LstCollateralWithdrawnJSON;
    static fromJSON(obj: LstCollateralWithdrawnJSON): LstCollateralWithdrawn;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        lst_mint: PublicKey;
        amount: BN;
        new_lst_qty: BN;
        withdrawn_at: BN;
    };
}
//# sourceMappingURL=LstCollateralWithdrawn.d.ts.map