import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface NativeSolVaultFields {
    user: PublicKey;
    sol_qty: BN;
    locked_qty: BN;
    last_update_slot: BN;
    bump: number;
}
export interface NativeSolVaultJSON {
    user: string;
    sol_qty: string;
    locked_qty: string;
    last_update_slot: string;
    bump: number;
}
export declare class NativeSolVault {
    readonly user: PublicKey;
    readonly sol_qty: BN;
    readonly locked_qty: BN;
    readonly last_update_slot: BN;
    readonly bump: number;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: NativeSolVaultFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<NativeSolVault | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<NativeSolVault | null>>;
    static decode(data: Buffer): NativeSolVault;
    toJSON(): NativeSolVaultJSON;
    static fromJSON(obj: NativeSolVaultJSON): NativeSolVault;
}
//# sourceMappingURL=NativeSolVault.d.ts.map