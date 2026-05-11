import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import * as types from "../types";
export interface EmergencyPauseExpiredFields {
    emergency_pubkey: PublicKey;
    cleared_by: PublicKey;
    expired_at_slot: BN;
}
export interface EmergencyPauseExpiredJSON {
    emergency_pubkey: string;
    cleared_by: string;
    expired_at_slot: string;
}
export declare class EmergencyPauseExpired {
    readonly emergency_pubkey: PublicKey;
    readonly cleared_by: PublicKey;
    readonly expired_at_slot: BN;
    constructor(fields: EmergencyPauseExpiredFields);
    static layout(property?: string): any;
    static fromDecoded(obj: any): types.EmergencyPauseExpired;
    static toEncodable(fields: EmergencyPauseExpiredFields): {
        emergency_pubkey: PublicKey;
        cleared_by: PublicKey;
        expired_at_slot: BN;
    };
    toJSON(): EmergencyPauseExpiredJSON;
    static fromJSON(obj: EmergencyPauseExpiredJSON): EmergencyPauseExpired;
    toEncodable(): {
        emergency_pubkey: PublicKey;
        cleared_by: PublicKey;
        expired_at_slot: BN;
    };
}
//# sourceMappingURL=EmergencyPauseExpired.d.ts.map