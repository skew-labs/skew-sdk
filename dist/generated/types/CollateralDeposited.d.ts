import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface CollateralDepositedFields {
    option: PublicKey;
    creator: PublicKey;
    amount: BN;
}
export interface CollateralDepositedJSON {
    option: string;
    creator: string;
    amount: string;
}
export declare class CollateralDeposited {
    readonly option: PublicKey;
    readonly creator: PublicKey;
    readonly amount: BN;
    constructor(fields: CollateralDepositedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.CollateralDeposited;
    static toEncodable(fields: CollateralDepositedFields): {
        option: PublicKey;
        creator: PublicKey;
        amount: BN;
    };
    toJSON(): CollateralDepositedJSON;
    static fromJSON(obj: CollateralDepositedJSON): CollateralDeposited;
    toEncodable(): {
        option: PublicKey;
        creator: PublicKey;
        amount: BN;
    };
}
//# sourceMappingURL=CollateralDeposited.d.ts.map