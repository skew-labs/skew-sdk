import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface OptionCollateralLockPdaFields {
    option: PublicKey;
    writer: PublicKey;
    collateral_kind: number;
    vault: PublicKey;
    mint: PublicKey;
    locked_qty: BN;
    released_qty: BN;
    locked_value_usd_micro_at_fill: BN;
    er_at_fill: BN;
    sol_usd_at_fill: BN;
    haircut_bps: number;
    state: number;
    bump: number;
    padding: Array<number>;
}
export interface OptionCollateralLockPdaJSON {
    option: string;
    writer: string;
    collateral_kind: number;
    vault: string;
    mint: string;
    locked_qty: string;
    released_qty: string;
    locked_value_usd_micro_at_fill: string;
    er_at_fill: string;
    sol_usd_at_fill: string;
    haircut_bps: number;
    state: number;
    bump: number;
    padding: Array<number>;
}
export declare class OptionCollateralLockPda {
    readonly option: PublicKey;
    readonly writer: PublicKey;
    readonly collateral_kind: number;
    readonly vault: PublicKey;
    readonly mint: PublicKey;
    readonly locked_qty: BN;
    readonly released_qty: BN;
    readonly locked_value_usd_micro_at_fill: BN;
    readonly er_at_fill: BN;
    readonly sol_usd_at_fill: BN;
    readonly haircut_bps: number;
    readonly state: number;
    readonly bump: number;
    readonly padding: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: OptionCollateralLockPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<OptionCollateralLockPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<OptionCollateralLockPda | null>>;
    static decode(data: Buffer): OptionCollateralLockPda;
    toJSON(): OptionCollateralLockPdaJSON;
    static fromJSON(obj: OptionCollateralLockPdaJSON): OptionCollateralLockPda;
}
//# sourceMappingURL=OptionCollateralLockPda.d.ts.map