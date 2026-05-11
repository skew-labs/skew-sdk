import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MethodologyChangeRecordedFields {
    committee: PublicKey;
    decision: PublicKey;
    id: BN;
    kind: number;
    recorded_at_slot: BN;
    notice_start_slot: BN;
}
export interface MethodologyChangeRecordedJSON {
    committee: string;
    decision: string;
    id: string;
    kind: number;
    recorded_at_slot: string;
    notice_start_slot: string;
}
export declare class MethodologyChangeRecorded {
    readonly committee: PublicKey;
    readonly decision: PublicKey;
    readonly id: BN;
    readonly kind: number;
    readonly recorded_at_slot: BN;
    readonly notice_start_slot: BN;
    constructor(fields: MethodologyChangeRecordedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MethodologyChangeRecorded;
    static toEncodable(fields: MethodologyChangeRecordedFields): {
        committee: PublicKey;
        decision: PublicKey;
        id: BN;
        kind: number;
        recorded_at_slot: BN;
        notice_start_slot: BN;
    };
    toJSON(): MethodologyChangeRecordedJSON;
    static fromJSON(obj: MethodologyChangeRecordedJSON): MethodologyChangeRecorded;
    toEncodable(): {
        committee: PublicKey;
        decision: PublicKey;
        id: BN;
        kind: number;
        recorded_at_slot: BN;
        notice_start_slot: BN;
    };
}
//# sourceMappingURL=MethodologyChangeRecorded.d.ts.map