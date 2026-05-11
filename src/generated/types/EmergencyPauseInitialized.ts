import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface EmergencyPauseInitializedFields {
  emergency_pubkey: PublicKey
  authority: PublicKey
  initialized_at_slot: BN
}

export interface EmergencyPauseInitializedJSON {
  emergency_pubkey: string
  authority: string
  initialized_at_slot: string
}

export class EmergencyPauseInitialized {
  readonly emergency_pubkey: PublicKey
  readonly authority: PublicKey
  readonly initialized_at_slot: BN

  constructor(fields: EmergencyPauseInitializedFields) {
    this.emergency_pubkey = fields.emergency_pubkey
    this.authority = fields.authority
    this.initialized_at_slot = fields.initialized_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("emergency_pubkey"),
        borsh.publicKey("authority"),
        borsh.u64("initialized_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new EmergencyPauseInitialized({
      emergency_pubkey: obj.emergency_pubkey,
      authority: obj.authority,
      initialized_at_slot: obj.initialized_at_slot,
    })
  }

  static toEncodable(fields: EmergencyPauseInitializedFields) {
    return {
      emergency_pubkey: fields.emergency_pubkey,
      authority: fields.authority,
      initialized_at_slot: fields.initialized_at_slot,
    }
  }

  toJSON(): EmergencyPauseInitializedJSON {
    return {
      emergency_pubkey: this.emergency_pubkey.toString(),
      authority: this.authority.toString(),
      initialized_at_slot: this.initialized_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: EmergencyPauseInitializedJSON
  ): EmergencyPauseInitialized {
    return new EmergencyPauseInitialized({
      emergency_pubkey: new PublicKey(obj.emergency_pubkey),
      authority: new PublicKey(obj.authority),
      initialized_at_slot: new BN(obj.initialized_at_slot),
    })
  }

  toEncodable() {
    return EmergencyPauseInitialized.toEncodable(this)
  }
}
