import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface EmergencyPauseActivatedFields {
    emergency_pubkey: PublicKey;
    authority: PublicKey;
    activated_at_slot: BN;
}
export interface EmergencyPauseActivatedJSON {
    emergency_pubkey: string;
    authority: string;
    activated_at_slot: string;
}
export declare class EmergencyPauseActivated {
    readonly emergency_pubkey: PublicKey;
    readonly authority: PublicKey;
    readonly activated_at_slot: BN;
    constructor(fields: EmergencyPauseActivatedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.EmergencyPauseActivated;
    static toEncodable(fields: EmergencyPauseActivatedFields): {
        emergency_pubkey: PublicKey;
        authority: PublicKey;
        activated_at_slot: BN;
    };
    toJSON(): EmergencyPauseActivatedJSON;
    static fromJSON(obj: EmergencyPauseActivatedJSON): EmergencyPauseActivated;
    toEncodable(): {
        emergency_pubkey: PublicKey;
        authority: PublicKey;
        activated_at_slot: BN;
    };
}
//# sourceMappingURL=EmergencyPauseActivated.d.ts.map