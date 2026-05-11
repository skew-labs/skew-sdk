import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface MethodologyCommitteePdaFields {
    members: Array<PublicKey>;
    independent_flags: Array<boolean>;
    member_count: number;
    padding_0: Array<number>;
    last_meeting_slot: BN;
    next_decision_id: BN;
    bump: number;
    padding_1: Array<number>;
    _reserved: Array<number>;
}
export interface MethodologyCommitteePdaJSON {
    members: Array<string>;
    independent_flags: Array<boolean>;
    member_count: number;
    padding_0: Array<number>;
    last_meeting_slot: string;
    next_decision_id: string;
    bump: number;
    padding_1: Array<number>;
    _reserved: Array<number>;
}
export declare class MethodologyCommitteePda {
    readonly members: Array<PublicKey>;
    readonly independent_flags: Array<boolean>;
    readonly member_count: number;
    readonly padding_0: Array<number>;
    readonly last_meeting_slot: BN;
    readonly next_decision_id: BN;
    readonly bump: number;
    readonly padding_1: Array<number>;
    readonly _reserved: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: MethodologyCommitteePdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<MethodologyCommitteePda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<MethodologyCommitteePda | null>>;
    static decode(data: Buffer): MethodologyCommitteePda;
    toJSON(): MethodologyCommitteePdaJSON;
    static fromJSON(obj: MethodologyCommitteePdaJSON): MethodologyCommitteePda;
}
//# sourceMappingURL=MethodologyCommitteePda.d.ts.map