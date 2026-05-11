import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface EmergencyPauseInitializedFields {
    emergency_pubkey: PublicKey;
    authority: PublicKey;
    initialized_at_slot: BN;
}
export interface EmergencyPauseInitializedJSON {
    emergency_pubkey: string;
    authority: string;
    initialized_at_slot: string;
}
export declare class EmergencyPauseInitialized {
    readonly emergency_pubkey: PublicKey;
    readonly authority: PublicKey;
    readonly initialized_at_slot: BN;
    constructor(fields: EmergencyPauseInitializedFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.EmergencyPauseInitialized;
    static toEncodable(fields: EmergencyPauseInitializedFields): {
        emergency_pubkey: PublicKey;
        authority: PublicKey;
        initialized_at_slot: BN;
    };
    toJSON(): EmergencyPauseInitializedJSON;
    static fromJSON(obj: EmergencyPauseInitializedJSON): EmergencyPauseInitialized;
    toEncodable(): {
        emergency_pubkey: PublicKey;
        authority: PublicKey;
        initialized_at_slot: BN;
    };
}
//# sourceMappingURL=EmergencyPauseInitialized.d.ts.map