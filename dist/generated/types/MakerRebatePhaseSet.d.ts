import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MakerRebatePhaseSetFields {
    fee_config_pda: PublicKey;
    phase_bps_before: number;
    phase_bps_after: number;
    set_at: BN;
}
export interface MakerRebatePhaseSetJSON {
    fee_config_pda: string;
    phase_bps_before: number;
    phase_bps_after: number;
    set_at: string;
}
export declare class MakerRebatePhaseSet {
    readonly fee_config_pda: PublicKey;
    readonly phase_bps_before: number;
    readonly phase_bps_after: number;
    readonly set_at: BN;
    constructor(fields: MakerRebatePhaseSetFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MakerRebatePhaseSet;
    static toEncodable(fields: MakerRebatePhaseSetFields): {
        fee_config_pda: PublicKey;
        phase_bps_before: number;
        phase_bps_after: number;
        set_at: BN;
    };
    toJSON(): MakerRebatePhaseSetJSON;
    static fromJSON(obj: MakerRebatePhaseSetJSON): MakerRebatePhaseSet;
    toEncodable(): {
        fee_config_pda: PublicKey;
        phase_bps_before: number;
        phase_bps_after: number;
        set_at: BN;
    };
}
//# sourceMappingURL=MakerRebatePhaseSet.d.ts.map