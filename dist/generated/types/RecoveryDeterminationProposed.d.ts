import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryDeterminationProposedFields {
    determination: PublicKey;
    committee: PublicKey;
    id: BN;
    trigger_kind: number;
    proposal_digest: Array<number>;
    proposed_at_slot: BN;
}
export interface RecoveryDeterminationProposedJSON {
    determination: string;
    committee: string;
    id: string;
    trigger_kind: number;
    proposal_digest: Array<number>;
    proposed_at_slot: string;
}
export declare class RecoveryDeterminationProposed {
    readonly determination: PublicKey;
    readonly committee: PublicKey;
    readonly id: BN;
    readonly trigger_kind: number;
    readonly proposal_digest: Array<number>;
    readonly proposed_at_slot: BN;
    constructor(fields: RecoveryDeterminationProposedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoveryDeterminationProposed;
    static toEncodable(fields: RecoveryDeterminationProposedFields): {
        determination: PublicKey;
        committee: PublicKey;
        id: BN;
        trigger_kind: number;
        proposal_digest: number[];
        proposed_at_slot: BN;
    };
    toJSON(): RecoveryDeterminationProposedJSON;
    static fromJSON(obj: RecoveryDeterminationProposedJSON): RecoveryDeterminationProposed;
    toEncodable(): {
        determination: PublicKey;
        committee: PublicKey;
        id: BN;
        trigger_kind: number;
        proposal_digest: number[];
        proposed_at_slot: BN;
    };
}
//# sourceMappingURL=RecoveryDeterminationProposed.d.ts.map