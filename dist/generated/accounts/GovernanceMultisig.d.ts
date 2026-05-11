import { PublicKey, Connection } from "@solana/web3.js";
import BN from "bn.js";
export interface GovernanceMultisigFields {
    members: Array<PublicKey>;
    threshold: number;
    padding_0: Array<number>;
    last_rotation_slot: BN;
    next_proposal_id: BN;
    paused: boolean;
    bump: number;
    padding_1: Array<number>;
}
export interface GovernanceMultisigJSON {
    members: Array<string>;
    threshold: number;
    padding_0: Array<number>;
    last_rotation_slot: string;
    next_proposal_id: string;
    paused: boolean;
    bump: number;
    padding_1: Array<number>;
}
export declare class GovernanceMultisig {
    readonly members: Array<PublicKey>;
    readonly threshold: number;
    readonly padding_0: Array<number>;
    readonly last_rotation_slot: BN;
    readonly next_proposal_id: BN;
    readonly paused: boolean;
    readonly bump: number;
    readonly padding_1: Array<number>;
    static readonly discriminator: Buffer<ArrayBuffer>;
    static readonly layout: any;
    constructor(fields: GovernanceMultisigFields);
    static fetch(c: Connection, address: PublicKey, programId?: PublicKey): Promise<GovernanceMultisig | null>;
    static fetchMultiple(c: Connection, addresses: PublicKey[], programId?: PublicKey): Promise<Array<GovernanceMultisig | null>>;
    static decode(data: Buffer): GovernanceMultisig;
    toJSON(): GovernanceMultisigJSON;
    static fromJSON(obj: GovernanceMultisigJSON): GovernanceMultisig;
}
//# sourceMappingURL=GovernanceMultisig.d.ts.map