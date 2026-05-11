import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MethodologyCommitteeInitializedFields {
    committee: PublicKey;
    member_count: number;
    independent_count: number;
    initialised_at_slot: BN;
}
export interface MethodologyCommitteeInitializedJSON {
    committee: string;
    member_count: number;
    independent_count: number;
    initialised_at_slot: string;
}
export declare class MethodologyCommitteeInitialized {
    readonly committee: PublicKey;
    readonly member_count: number;
    readonly independent_count: number;
    readonly initialised_at_slot: BN;
    constructor(fields: MethodologyCommitteeInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MethodologyCommitteeInitialized;
    static toEncodable(fields: MethodologyCommitteeInitializedFields): {
        committee: PublicKey;
        member_count: number;
        independent_count: number;
        initialised_at_slot: BN;
    };
    toJSON(): MethodologyCommitteeInitializedJSON;
    static fromJSON(obj: MethodologyCommitteeInitializedJSON): MethodologyCommitteeInitialized;
    toEncodable(): {
        committee: PublicKey;
        member_count: number;
        independent_count: number;
        initialised_at_slot: BN;
    };
}
//# sourceMappingURL=MethodologyCommitteeInitialized.d.ts.map