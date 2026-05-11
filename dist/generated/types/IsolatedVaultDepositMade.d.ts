import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface IsolatedVaultDepositMadeFields {
    vault: PublicKey;
    user: PublicKey;
    option: PublicKey;
    amount: BN;
    new_usdc_micro: BN;
    deposited_at: BN;
}
export interface IsolatedVaultDepositMadeJSON {
    vault: string;
    user: string;
    option: string;
    amount: string;
    new_usdc_micro: string;
    deposited_at: string;
}
export declare class IsolatedVaultDepositMade {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly option: PublicKey;
    readonly amount: BN;
    readonly new_usdc_micro: BN;
    readonly deposited_at: BN;
    constructor(fields: IsolatedVaultDepositMadeFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IsolatedVaultDepositMade;
    static toEncodable(fields: IsolatedVaultDepositMadeFields): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        amount: BN;
        new_usdc_micro: BN;
        deposited_at: BN;
    };
    toJSON(): IsolatedVaultDepositMadeJSON;
    static fromJSON(obj: IsolatedVaultDepositMadeJSON): IsolatedVaultDepositMade;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        amount: BN;
        new_usdc_micro: BN;
        deposited_at: BN;
    };
}
//# sourceMappingURL=IsolatedVaultDepositMade.d.ts.map