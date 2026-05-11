import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface PositionLimitsPdaFields {
    bump: number;
    _padding_0: Array<number>;
    per_asset_short_limit_usd_micro: Array<BN>;
    last_updated_at: BN;
    _reserved: Array<number>;
}
export interface PositionLimitsPdaJSON {
    bump: number;
    _padding_0: Array<number>;
    per_asset_short_limit_usd_micro: Array<string>;
    last_updated_at: string;
    _reserved: Array<number>;
}
export declare class PositionLimitsPda {
    readonly bump: number;
    readonly _padding_0: Array<number>;
    readonly per_asset_short_limit_usd_micro: Array<BN>;
    readonly last_updated_at: BN;
    readonly _reserved: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: PositionLimitsPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PositionLimitsPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PositionLimitsPda | null>>;
    static decode(data: Buffer): PositionLimitsPda;
    toJSON(): PositionLimitsPdaJSON;
    static fromJSON(obj: PositionLimitsPdaJSON): PositionLimitsPda;
}
//# sourceMappingURL=PositionLimitsPda.d.ts.map