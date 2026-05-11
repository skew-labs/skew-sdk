import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface InsuranceFundFields {
    authority: PublicKey;
    bump: number;
    initialized_at: BN;
    tier3_protocol_sitg: BN;
    tier1_mutualized_pool: BN;
    tier2_mutualized_pool: BN;
    cross_mutualized_pool: BN;
    total_cm_contributions: BN;
    total_drained: BN;
    default_event_count: number;
}
export interface InsuranceFundJSON {
    authority: string;
    bump: number;
    initialized_at: string;
    tier3_protocol_sitg: string;
    tier1_mutualized_pool: string;
    tier2_mutualized_pool: string;
    cross_mutualized_pool: string;
    total_cm_contributions: string;
    total_drained: string;
    default_event_count: number;
}
export declare class InsuranceFund {
    readonly authority: PublicKey;
    readonly bump: number;
    readonly initialized_at: BN;
    readonly tier3_protocol_sitg: BN;
    readonly tier1_mutualized_pool: BN;
    readonly tier2_mutualized_pool: BN;
    readonly cross_mutualized_pool: BN;
    readonly total_cm_contributions: BN;
    readonly total_drained: BN;
    readonly default_event_count: number;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: InsuranceFundFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<InsuranceFund | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<InsuranceFund | null>>;
    static decode(data: Buffer): InsuranceFund;
    toJSON(): InsuranceFundJSON;
    static fromJSON(obj: InsuranceFundJSON): InsuranceFund;
}
//# sourceMappingURL=InsuranceFund.d.ts.map