import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface LiquidationHolderUnresolvedFields {
    option: PublicKey;
    holder: PublicKey;
    liquidator: PublicKey;
    residual_collateral_micro: BN;
    liquidated_at: BN;
}
export interface LiquidationHolderUnresolvedJSON {
    option: string;
    holder: string;
    liquidator: string;
    residual_collateral_micro: string;
    liquidated_at: string;
}
export declare class LiquidationHolderUnresolved {
    readonly option: PublicKey;
    readonly holder: PublicKey;
    readonly liquidator: PublicKey;
    readonly residual_collateral_micro: BN;
    readonly liquidated_at: BN;
    constructor(fields: LiquidationHolderUnresolvedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.LiquidationHolderUnresolved;
    static toEncodable(fields: LiquidationHolderUnresolvedFields): {
        option: PublicKey;
        holder: PublicKey;
        liquidator: PublicKey;
        residual_collateral_micro: BN;
        liquidated_at: BN;
    };
    toJSON(): LiquidationHolderUnresolvedJSON;
    static fromJSON(obj: LiquidationHolderUnresolvedJSON): LiquidationHolderUnresolved;
    toEncodable(): {
        option: PublicKey;
        holder: PublicKey;
        liquidator: PublicKey;
        residual_collateral_micro: BN;
        liquidated_at: BN;
    };
}
//# sourceMappingURL=LiquidationHolderUnresolved.d.ts.map