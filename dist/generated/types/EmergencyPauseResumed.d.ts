import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface EmergencyPauseResumedFields {
    emergency_pubkey: PublicKey;
    authority: PublicKey;
    resumed_at_slot: BN;
}
export interface EmergencyPauseResumedJSON {
    emergency_pubkey: string;
    authority: string;
    resumed_at_slot: string;
}
export declare class EmergencyPauseResumed {
    readonly emergency_pubkey: PublicKey;
    readonly authority: PublicKey;
    readonly resumed_at_slot: BN;
    constructor(fields: EmergencyPauseResumedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.EmergencyPauseResumed;
    static toEncodable(fields: EmergencyPauseResumedFields): {
        emergency_pubkey: PublicKey;
        authority: PublicKey;
        resumed_at_slot: BN;
    };
    toJSON(): EmergencyPauseResumedJSON;
    static fromJSON(obj: EmergencyPauseResumedJSON): EmergencyPauseResumed;
    toEncodable(): {
        emergency_pubkey: PublicKey;
        authority: PublicKey;
        resumed_at_slot: BN;
    };
}
//# sourceMappingURL=EmergencyPauseResumed.d.ts.map