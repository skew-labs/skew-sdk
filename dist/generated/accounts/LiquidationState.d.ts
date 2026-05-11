import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface LiquidationStateFields {
    option: PublicKey;
    defaulting_cm: PublicKey;
    bump: number;
    liq_start_ts: BN;
    total_closed_bps: number;
    finalized: boolean;
}
export interface LiquidationStateJSON {
    option: string;
    defaulting_cm: string;
    bump: number;
    liq_start_ts: string;
    total_closed_bps: number;
    finalized: boolean;
}
export declare class LiquidationState {
    readonly option: PublicKey;
    readonly defaulting_cm: PublicKey;
    readonly bump: number;
    readonly liq_start_ts: BN;
    readonly total_closed_bps: number;
    readonly finalized: boolean;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: LiquidationStateFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<LiquidationState | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<LiquidationState | null>>;
    static decode(data: Buffer): LiquidationState;
    toJSON(): LiquidationStateJSON;
    static fromJSON(obj: LiquidationStateJSON): LiquidationState;
}
//# sourceMappingURL=LiquidationState.d.ts.map