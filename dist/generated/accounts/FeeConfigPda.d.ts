import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface FeeConfigPdaFields {
    bump: number;
    padding_0: Array<number>;
    maker_rebate_phase_bps: number;
    padding_1: Array<number>;
    last_phase_change_ts: BN;
}
export interface FeeConfigPdaJSON {
    bump: number;
    padding_0: Array<number>;
    maker_rebate_phase_bps: number;
    padding_1: Array<number>;
    last_phase_change_ts: string;
}
export declare class FeeConfigPda {
    readonly bump: number;
    readonly padding_0: Array<number>;
    readonly maker_rebate_phase_bps: number;
    readonly padding_1: Array<number>;
    readonly last_phase_change_ts: BN;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: FeeConfigPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<FeeConfigPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<FeeConfigPda | null>>;
    static decode(data: Buffer): FeeConfigPda;
    toJSON(): FeeConfigPdaJSON;
    static fromJSON(obj: FeeConfigPdaJSON): FeeConfigPda;
}
//# sourceMappingURL=FeeConfigPda.d.ts.map