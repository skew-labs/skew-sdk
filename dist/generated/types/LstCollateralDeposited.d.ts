import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface LstCollateralDepositedFields {
    vault: PublicKey;
    user: PublicKey;
    lst_mint: PublicKey;
    amount: BN;
    new_lst_qty: BN;
    deposited_at: BN;
}
export interface LstCollateralDepositedJSON {
    vault: string;
    user: string;
    lst_mint: string;
    amount: string;
    new_lst_qty: string;
    deposited_at: string;
}
export declare class LstCollateralDeposited {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly lst_mint: PublicKey;
    readonly amount: BN;
    readonly new_lst_qty: BN;
    readonly deposited_at: BN;
    constructor(fields: LstCollateralDepositedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LstCollateralDeposited;
    static toEncodable(fields: LstCollateralDepositedFields): {
        vault: PublicKey;
        user: PublicKey;
        lst_mint: PublicKey;
        amount: BN;
        new_lst_qty: BN;
        deposited_at: BN;
    };
    toJSON(): LstCollateralDepositedJSON;
    static fromJSON(obj: LstCollateralDepositedJSON): LstCollateralDeposited;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        lst_mint: PublicKey;
        amount: BN;
        new_lst_qty: BN;
        deposited_at: BN;
    };
}
//# sourceMappingURL=LstCollateralDeposited.d.ts.map