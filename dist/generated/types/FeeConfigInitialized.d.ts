import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface FeeConfigInitializedFields {
    fee_config_pda: PublicKey;
    maker_rebate_phase_bps: number;
    initialized_at: BN;
}
export interface FeeConfigInitializedJSON {
    fee_config_pda: string;
    maker_rebate_phase_bps: number;
    initialized_at: string;
}
export declare class FeeConfigInitialized {
    readonly fee_config_pda: PublicKey;
    readonly maker_rebate_phase_bps: number;
    readonly initialized_at: BN;
    constructor(fields: FeeConfigInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.FeeConfigInitialized;
    static toEncodable(fields: FeeConfigInitializedFields): {
        fee_config_pda: PublicKey;
        maker_rebate_phase_bps: number;
        initialized_at: BN;
    };
    toJSON(): FeeConfigInitializedJSON;
    static fromJSON(obj: FeeConfigInitializedJSON): FeeConfigInitialized;
    toEncodable(): {
        fee_config_pda: PublicKey;
        maker_rebate_phase_bps: number;
        initialized_at: BN;
    };
}
//# sourceMappingURL=FeeConfigInitialized.d.ts.map