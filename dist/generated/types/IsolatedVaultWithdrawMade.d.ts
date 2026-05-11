import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface IsolatedVaultWithdrawMadeFields {
    vault: PublicKey;
    user: PublicKey;
    option: PublicKey;
    amount: BN;
    new_usdc_micro: BN;
    withdrawn_at: BN;
}
export interface IsolatedVaultWithdrawMadeJSON {
    vault: string;
    user: string;
    option: string;
    amount: string;
    new_usdc_micro: string;
    withdrawn_at: string;
}
export declare class IsolatedVaultWithdrawMade {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly option: PublicKey;
    readonly amount: BN;
    readonly new_usdc_micro: BN;
    readonly withdrawn_at: BN;
    constructor(fields: IsolatedVaultWithdrawMadeFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IsolatedVaultWithdrawMade;
    static toEncodable(fields: IsolatedVaultWithdrawMadeFields): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        amount: BN;
        new_usdc_micro: BN;
        withdrawn_at: BN;
    };
    toJSON(): IsolatedVaultWithdrawMadeJSON;
    static fromJSON(obj: IsolatedVaultWithdrawMadeJSON): IsolatedVaultWithdrawMade;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        amount: BN;
        new_usdc_micro: BN;
        withdrawn_at: BN;
    };
}
//# sourceMappingURL=IsolatedVaultWithdrawMade.d.ts.map