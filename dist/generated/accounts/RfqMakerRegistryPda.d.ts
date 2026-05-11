import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface RfqMakerRegistryPdaFields {
    mm: PublicKey;
    deposit_lamports: BN;
    success_count: number;
    fail_count: number;
    slashable: boolean;
    bump: number;
    _padding_0: Array<number>;
    registered_at: BN;
    quote_off: boolean;
    identity_mode: number;
    margin_mode: number;
    risk_scope_asset: number;
    collateral_scope: number;
    mmp_window_start_ts: BN;
    mmp_window_fill_count: number;
    mmp_window_premium_micro: BN;
    mmp_window_notional_micro: BN;
    _reserved: Array<number>;
    last_quote_slot: BN;
    quotes_in_current_slot: number;
}
export interface RfqMakerRegistryPdaJSON {
    mm: string;
    deposit_lamports: string;
    success_count: number;
    fail_count: number;
    slashable: boolean;
    bump: number;
    _padding_0: Array<number>;
    registered_at: string;
    quote_off: boolean;
    identity_mode: number;
    margin_mode: number;
    risk_scope_asset: number;
    collateral_scope: number;
    mmp_window_start_ts: string;
    mmp_window_fill_count: number;
    mmp_window_premium_micro: string;
    mmp_window_notional_micro: string;
    _reserved: Array<number>;
    last_quote_slot: string;
    quotes_in_current_slot: number;
}
export declare class RfqMakerRegistryPda {
    readonly mm: PublicKey;
    readonly deposit_lamports: BN;
    readonly success_count: number;
    readonly fail_count: number;
    readonly slashable: boolean;
    readonly bump: number;
    readonly _padding_0: Array<number>;
    readonly registered_at: BN;
    readonly quote_off: boolean;
    readonly identity_mode: number;
    readonly margin_mode: number;
    readonly risk_scope_asset: number;
    readonly collateral_scope: number;
    readonly mmp_window_start_ts: BN;
    readonly mmp_window_fill_count: number;
    readonly mmp_window_premium_micro: BN;
    readonly mmp_window_notional_micro: BN;
    readonly _reserved: Array<number>;
    readonly last_quote_slot: BN;
    readonly quotes_in_current_slot: number;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: RfqMakerRegistryPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<RfqMakerRegistryPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<RfqMakerRegistryPda | null>>;
    static decode(data: Buffer): RfqMakerRegistryPda;
    toJSON(): RfqMakerRegistryPdaJSON;
    static fromJSON(obj: RfqMakerRegistryPdaJSON): RfqMakerRegistryPda;
}
//# sourceMappingURL=RfqMakerRegistryPda.d.ts.map