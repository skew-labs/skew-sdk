import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface EmergencyPausePdaFields {
    active: boolean;
    bump: number;
    _pad_0: Array<number>;
    started_at_slot: BN;
    started_by: PublicKey;
    _reserved: Array<number>;
}
export interface EmergencyPausePdaJSON {
    active: boolean;
    bump: number;
    _pad_0: Array<number>;
    started_at_slot: string;
    started_by: string;
    _reserved: Array<number>;
}
export declare class EmergencyPausePda {
    readonly active: boolean;
    readonly bump: number;
    readonly _pad_0: Array<number>;
    readonly started_at_slot: BN;
    readonly started_by: PublicKey;
    readonly _reserved: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: EmergencyPausePdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<EmergencyPausePda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<EmergencyPausePda | null>>;
    static decode(data: Buffer): EmergencyPausePda;
    toJSON(): EmergencyPausePdaJSON;
    static fromJSON(obj: EmergencyPausePdaJSON): EmergencyPausePda;
}
//# sourceMappingURL=EmergencyPausePda.d.ts.map