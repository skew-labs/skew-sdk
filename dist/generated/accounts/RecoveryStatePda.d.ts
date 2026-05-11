import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface RecoveryStatePdaFields {
    active: boolean;
    bump: number;
    trigger_kind: number;
    snapshot_published: boolean;
    _pad_0: Array<number>;
    declared_at_slot: BN;
    declared_at_ts: BN;
    snapshot_at_slot: BN;
    snapshot_oi_digest: Array<number>;
    residual_unfunded_loss_micro: BN;
    vmgh_total_drained_micro: BN;
    vmgh_apply_count: number;
    tear_up_total_drained_micro: BN;
    tear_up_cycle_count: number;
    _pad_1: Array<number>;
    last_oi_digest: Array<number>;
    last_gain_digest: Array<number>;
    last_notional_digest: Array<number>;
    _reserved: Array<number>;
}
export interface RecoveryStatePdaJSON {
    active: boolean;
    bump: number;
    trigger_kind: number;
    snapshot_published: boolean;
    _pad_0: Array<number>;
    declared_at_slot: string;
    declared_at_ts: string;
    snapshot_at_slot: string;
    snapshot_oi_digest: Array<number>;
    residual_unfunded_loss_micro: string;
    vmgh_total_drained_micro: string;
    vmgh_apply_count: number;
    tear_up_total_drained_micro: string;
    tear_up_cycle_count: number;
    _pad_1: Array<number>;
    last_oi_digest: Array<number>;
    last_gain_digest: Array<number>;
    last_notional_digest: Array<number>;
    _reserved: Array<number>;
}
export declare class RecoveryStatePda {
    readonly active: boolean;
    readonly bump: number;
    readonly trigger_kind: number;
    readonly snapshot_published: boolean;
    readonly _pad_0: Array<number>;
    readonly declared_at_slot: BN;
    readonly declared_at_ts: BN;
    readonly snapshot_at_slot: BN;
    readonly snapshot_oi_digest: Array<number>;
    readonly residual_unfunded_loss_micro: BN;
    readonly vmgh_total_drained_micro: BN;
    readonly vmgh_apply_count: number;
    readonly tear_up_total_drained_micro: BN;
    readonly tear_up_cycle_count: number;
    readonly _pad_1: Array<number>;
    readonly last_oi_digest: Array<number>;
    readonly last_gain_digest: Array<number>;
    readonly last_notional_digest: Array<number>;
    readonly _reserved: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: RecoveryStatePdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<RecoveryStatePda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<RecoveryStatePda | null>>;
    static decode(data: Buffer): RecoveryStatePda;
    toJSON(): RecoveryStatePdaJSON;
    static fromJSON(obj: RecoveryStatePdaJSON): RecoveryStatePda;
}
//# sourceMappingURL=RecoveryStatePda.d.ts.map