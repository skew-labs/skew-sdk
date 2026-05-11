import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface IsolatedVaultDrainedFields {
    vault: PublicKey;
    user: PublicKey;
    option: PublicKey;
    drained_for_fee: BN;
    drained_for_holder: BN;
    new_usdc_micro: BN;
    drained_at: BN;
}
export interface IsolatedVaultDrainedJSON {
    vault: string;
    user: string;
    option: string;
    drained_for_fee: string;
    drained_for_holder: string;
    new_usdc_micro: string;
    drained_at: string;
}
export declare class IsolatedVaultDrained {
    readonly vault: PublicKey;
    readonly user: PublicKey;
    readonly option: PublicKey;
    readonly drained_for_fee: BN;
    readonly drained_for_holder: BN;
    readonly new_usdc_micro: BN;
    readonly drained_at: BN;
    constructor(fields: IsolatedVaultDrainedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.IsolatedVaultDrained;
    static toEncodable(fields: IsolatedVaultDrainedFields): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        drained_for_fee: BN;
        drained_for_holder: BN;
        new_usdc_micro: BN;
        drained_at: BN;
    };
    toJSON(): IsolatedVaultDrainedJSON;
    static fromJSON(obj: IsolatedVaultDrainedJSON): IsolatedVaultDrained;
    toEncodable(): {
        vault: PublicKey;
        user: PublicKey;
        option: PublicKey;
        drained_for_fee: BN;
        drained_for_holder: BN;
        new_usdc_micro: BN;
        drained_at: BN;
    };
}
//# sourceMappingURL=IsolatedVaultDrained.d.ts.map