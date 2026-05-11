import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MethodologyCommitteeProposalQueuedFields {
    proposal: PublicKey;
    committee: PublicKey;
    op: number;
    target: PublicKey;
    independent: boolean;
    queued_at_slot: BN;
}
export interface MethodologyCommitteeProposalQueuedJSON {
    proposal: string;
    committee: string;
    op: number;
    target: string;
    independent: boolean;
    queued_at_slot: string;
}
export declare class MethodologyCommitteeProposalQueued {
    readonly proposal: PublicKey;
    readonly committee: PublicKey;
    readonly op: number;
    readonly target: PublicKey;
    readonly independent: boolean;
    readonly queued_at_slot: BN;
    constructor(fields: MethodologyCommitteeProposalQueuedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.MethodologyCommitteeProposalQueued;
    static toEncodable(fields: MethodologyCommitteeProposalQueuedFields): {
        proposal: PublicKey;
        committee: PublicKey;
        op: number;
        target: PublicKey;
        independent: boolean;
        queued_at_slot: BN;
    };
    toJSON(): MethodologyCommitteeProposalQueuedJSON;
    static fromJSON(obj: MethodologyCommitteeProposalQueuedJSON): MethodologyCommitteeProposalQueued;
    toEncodable(): {
        proposal: PublicKey;
        committee: PublicKey;
        op: number;
        target: PublicKey;
        independent: boolean;
        queued_at_slot: BN;
    };
}
//# sourceMappingURL=MethodologyCommitteeProposalQueued.d.ts.map