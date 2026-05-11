import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface BuilderCodePdaFields {
    builder: PublicKey;
    bump: number;
    registered_at: BN;
    deposit_locked: BN;
    volume_30d_routed_micro: BN;
    last_volume_update_ts: BN;
    fees_accrued_micro: BN;
    label: Array<number>;
}
export interface BuilderCodePdaJSON {
    builder: string;
    bump: number;
    registered_at: string;
    deposit_locked: string;
    volume_30d_routed_micro: string;
    last_volume_update_ts: string;
    fees_accrued_micro: string;
    label: Array<number>;
}
export declare class BuilderCodePda {
    readonly builder: PublicKey;
    readonly bump: number;
    readonly registered_at: BN;
    readonly deposit_locked: BN;
    readonly volume_30d_routed_micro: BN;
    readonly last_volume_update_ts: BN;
    readonly fees_accrued_micro: BN;
    readonly label: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: BuilderCodePdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<BuilderCodePda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<BuilderCodePda | null>>;
    static decode(data: Buffer): BuilderCodePda;
    toJSON(): BuilderCodePdaJSON;
    static fromJSON(obj: BuilderCodePdaJSON): BuilderCodePda;
}
//# sourceMappingURL=BuilderCodePda.d.ts.map