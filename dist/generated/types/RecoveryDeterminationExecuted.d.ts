import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface RecoveryDeterminationExecutedFields {
    determination: PublicKey;
    id: BN;
    approval_count: number;
    executed_at_slot: BN;
}
export interface RecoveryDeterminationExecutedJSON {
    determination: string;
    id: string;
    approval_count: number;
    executed_at_slot: string;
}
export declare class RecoveryDeterminationExecuted {
    readonly determination: PublicKey;
    readonly id: BN;
    readonly approval_count: number;
    readonly executed_at_slot: BN;
    constructor(fields: RecoveryDeterminationExecutedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.RecoveryDeterminationExecuted;
    static toEncodable(fields: RecoveryDeterminationExecutedFields): {
        determination: PublicKey;
        id: BN;
        approval_count: number;
        executed_at_slot: BN;
    };
    toJSON(): RecoveryDeterminationExecutedJSON;
    static fromJSON(obj: RecoveryDeterminationExecutedJSON): RecoveryDeterminationExecuted;
    toEncodable(): {
        determination: PublicKey;
        id: BN;
        approval_count: number;
        executed_at_slot: BN;
    };
}
//# sourceMappingURL=RecoveryDeterminationExecuted.d.ts.map