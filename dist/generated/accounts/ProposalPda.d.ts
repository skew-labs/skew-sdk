import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface ProposalPdaFields {
    id: BN;
    queued_at_slot: BN;
    executed_at_slot: BN;
    approvals_bitmap: number;
    executed: boolean;
    padding_0: Array<number>;
    action: types.AdminActionKind;
    bump: number;
    padding_1: Array<number>;
}
export interface ProposalPdaJSON {
    id: string;
    queued_at_slot: string;
    executed_at_slot: string;
    approvals_bitmap: number;
    executed: boolean;
    padding_0: Array<number>;
    action: types.AdminActionJSON;
    bump: number;
    padding_1: Array<number>;
}
export declare class ProposalPda {
    readonly id: BN;
    readonly queued_at_slot: BN;
    readonly executed_at_slot: BN;
    readonly approvals_bitmap: number;
    readonly executed: boolean;
    readonly padding_0: Array<number>;
    readonly action: types.AdminActionKind;
    readonly bump: number;
    readonly padding_1: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: ProposalPdaFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<ProposalPda | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<ProposalPda | null>>;
    static decode(data: Buffer): ProposalPda;
    toJSON(): ProposalPdaJSON;
    static fromJSON(obj: ProposalPdaJSON): ProposalPda;
}
//# sourceMappingURL=ProposalPda.d.ts.map