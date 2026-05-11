import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface MethodologyDecisionPdaFields {
    id: BN;
    recorded_at_slot: BN;
    notice_start_slot: BN;
    kind: types.MethodologyChangeKindKind;
    padding_0: Array<number>;
    note: Array<number>;
    bump: number;
    padding_1: Array<number>;
}
export interface MethodologyDecisionPdaJSON {
    id: string;
    recorded_at_slot: string;
    notice_start_slot: string;
    kind: types.MethodologyChangeKindJSON;
    padding_0: Array<number>;
    note: Array<number>;
    bump: number;
    padding_1: Array<number>;
}
export declare class MethodologyDecisionPda {
    readonly id: BN;
    readonly recorded_at_slot: BN;
    readonly notice_start_slot: BN;
    readonly kind: types.MethodologyChangeKindKind;
    readonly padding_0: Array<number>;
    readonly note: Array<number>;
    readonly bump: number;
    readonly padding_1: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: MethodologyDecisionPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<MethodologyDecisionPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<MethodologyDecisionPda | null>>;
    static decode(data: Buffer): MethodologyDecisionPda;
    toJSON(): MethodologyDecisionPdaJSON;
    static fromJSON(obj: MethodologyDecisionPdaJSON): MethodologyDecisionPda;
}
//# sourceMappingURL=MethodologyDecisionPda.d.ts.map