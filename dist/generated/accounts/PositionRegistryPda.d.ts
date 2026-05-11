import { PublicKey, Connection } from "@solana/web3.js";
export interface PositionRegistryPdaFields {
    cm: PublicKey;
    authority: PublicKey;
    bump: number;
    count: number;
    padding: Array<number>;
    positions: Array<PublicKey>;
}
export interface PositionRegistryPdaJSON {
    cm: string;
    authority: string;
    bump: number;
    count: number;
    padding: Array<number>;
    positions: Array<string>;
}
export declare class PositionRegistryPda {
    readonly cm: PublicKey;
    readonly authority: PublicKey;
    readonly bump: number;
    readonly count: number;
    readonly padding: Array<number>;
    readonly positions: Array<PublicKey>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: PositionRegistryPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<PositionRegistryPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<PositionRegistryPda | null>>;
    static decode(data: Buffer): PositionRegistryPda;
    toJSON(): PositionRegistryPdaJSON;
    static fromJSON(obj: PositionRegistryPdaJSON): PositionRegistryPda;
}
//# sourceMappingURL=PositionRegistryPda.d.ts.map