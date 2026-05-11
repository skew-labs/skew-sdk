import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface IFDepositedFields {
    insurance_fund: PublicKey;
    tier: types.IfTierKind;
    amount: BN;
    depositor: PublicKey;
    is_sitg: boolean;
    deposited_at: BN;
}
export interface IFDepositedJSON {
    insurance_fund: string;
    tier: types.IfTierJSON;
    amount: string;
    depositor: string;
    is_sitg: boolean;
    deposited_at: string;
}
export declare class IFDeposited {
    readonly insurance_fund: PublicKey;
    readonly tier: types.IfTierKind;
    readonly amount: BN;
    readonly depositor: PublicKey;
    readonly is_sitg: boolean;
    readonly deposited_at: BN;
    constructor(fields: IFDepositedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IFDeposited;
    static toEncodable(fields: IFDepositedFields): {
        insurance_fund: PublicKey;
        tier: {
            Tier1: {};
        } | {
            Tier2: {};
        } | {
            Cross: {};
        };
        amount: BN;
        depositor: PublicKey;
        is_sitg: boolean;
        deposited_at: BN;
    };
    toJSON(): IFDepositedJSON;
    static fromJSON(obj: IFDepositedJSON): IFDeposited;
    toEncodable(): {
        insurance_fund: PublicKey;
        tier: {
            Tier1: {};
        } | {
            Tier2: {};
        } | {
            Cross: {};
        };
        amount: BN;
        depositor: PublicKey;
        is_sitg: boolean;
        deposited_at: BN;
    };
}
//# sourceMappingURL=IFDeposited.d.ts.map