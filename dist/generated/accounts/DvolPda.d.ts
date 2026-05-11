import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface DvolPdaFields {
    asset: number;
    bump: number;
    _padding_0: Array<number>;
    last_update_slot: BN;
    dvol_28d_micro: BN;
    dvol_90d_micro: BN;
    realized_var_28d_micro: BN;
}
export interface DvolPdaJSON {
    asset: number;
    bump: number;
    _padding_0: Array<number>;
    last_update_slot: string;
    dvol_28d_micro: string;
    dvol_90d_micro: string;
    realized_var_28d_micro: string;
}
export declare class DvolPda {
    readonly asset: number;
    readonly bump: number;
    readonly _padding_0: Array<number>;
    readonly last_update_slot: BN;
    readonly dvol_28d_micro: BN;
    readonly dvol_90d_micro: BN;
    readonly realized_var_28d_micro: BN;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: DvolPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<DvolPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<DvolPda | null>>;
    static decode(data: Buffer): DvolPda;
    toJSON(): DvolPdaJSON;
    static fromJSON(obj: DvolPdaJSON): DvolPda;
}
//# sourceMappingURL=DvolPda.d.ts.map