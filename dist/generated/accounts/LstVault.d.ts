import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface LstVaultFields {
    user: PublicKey;
    lst_mint: PublicKey;
    lst_qty: BN;
    locked_qty: BN;
    last_er_update_slot: BN;
    bump: number;
    tier_locked_qty: BN;
}
export interface LstVaultJSON {
    user: string;
    lst_mint: string;
    lst_qty: string;
    locked_qty: string;
    last_er_update_slot: string;
    bump: number;
    tier_locked_qty: string;
}
export declare class LstVault {
    readonly user: PublicKey;
    readonly lst_mint: PublicKey;
    readonly lst_qty: BN;
    readonly locked_qty: BN;
    readonly last_er_update_slot: BN;
    readonly bump: number;
    readonly tier_locked_qty: BN;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: LstVaultFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<LstVault | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<LstVault | null>>;
    static decode(data: Buffer): LstVault;
    toJSON(): LstVaultJSON;
    static fromJSON(obj: LstVaultJSON): LstVault;
}
//# sourceMappingURL=LstVault.d.ts.map