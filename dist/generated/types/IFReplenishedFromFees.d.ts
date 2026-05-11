import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface IFReplenishedFromFeesFields {
    insurance_fund: PublicKey;
    amount: BN;
    new_tier3_balance: BN;
    replenished_at: BN;
}
export interface IFReplenishedFromFeesJSON {
    insurance_fund: string;
    amount: string;
    new_tier3_balance: string;
    replenished_at: string;
}
export declare class IFReplenishedFromFees {
    readonly insurance_fund: PublicKey;
    readonly amount: BN;
    readonly new_tier3_balance: BN;
    readonly replenished_at: BN;
    constructor(fields: IFReplenishedFromFeesFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IFReplenishedFromFees;
    static toEncodable(fields: IFReplenishedFromFeesFields): {
        insurance_fund: PublicKey;
        amount: BN;
        new_tier3_balance: BN;
        replenished_at: BN;
    };
    toJSON(): IFReplenishedFromFeesJSON;
    static fromJSON(obj: IFReplenishedFromFeesJSON): IFReplenishedFromFees;
    toEncodable(): {
        insurance_fund: PublicKey;
        amount: BN;
        new_tier3_balance: BN;
        replenished_at: BN;
    };
}
//# sourceMappingURL=IFReplenishedFromFees.d.ts.map