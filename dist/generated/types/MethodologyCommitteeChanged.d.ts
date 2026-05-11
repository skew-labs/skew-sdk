import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MethodologyCommitteeChangedFields {
    committee: PublicKey;
    proposal: PublicKey;
    op: number;
    target: PublicKey;
    member_count: number;
    independent_count: number;
    executed_at_slot: BN;
}
export interface MethodologyCommitteeChangedJSON {
    committee: string;
    proposal: string;
    op: number;
    target: string;
    member_count: number;
    independent_count: number;
    executed_at_slot: string;
}
export declare class MethodologyCommitteeChanged {
    readonly committee: PublicKey;
    readonly proposal: PublicKey;
    readonly op: number;
    readonly target: PublicKey;
    readonly member_count: number;
    readonly independent_count: number;
    readonly executed_at_slot: BN;
    constructor(fields: MethodologyCommitteeChangedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MethodologyCommitteeChanged;
    static toEncodable(fields: MethodologyCommitteeChangedFields): {
        committee: PublicKey;
        proposal: PublicKey;
        op: number;
        target: PublicKey;
        member_count: number;
        independent_count: number;
        executed_at_slot: BN;
    };
    toJSON(): MethodologyCommitteeChangedJSON;
    static fromJSON(obj: MethodologyCommitteeChangedJSON): MethodologyCommitteeChanged;
    toEncodable(): {
        committee: PublicKey;
        proposal: PublicKey;
        op: number;
        target: PublicKey;
        member_count: number;
        independent_count: number;
        executed_at_slot: BN;
    };
}
//# sourceMappingURL=MethodologyCommitteeChanged.d.ts.map