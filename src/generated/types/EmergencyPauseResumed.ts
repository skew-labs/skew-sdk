import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface EmergencyPauseResumedFields {
  emergency_pubkey: PublicKey
  authority: PublicKey
  resumed_at_slot: BN
}

export interface EmergencyPauseResumedJSON {
  emergency_pubkey: string
  authority: string
  resumed_at_slot: string
}

export class EmergencyPauseResumed {
  readonly emergency_pubkey: PublicKey
  readonly authority: PublicKey
  readonly resumed_at_slot: BN

  constructor(fields: EmergencyPauseResumedFields) {
    this.emergency_pubkey = fields.emergency_pubkey
    this.authority = fields.authority
    this.resumed_at_slot = fields.resumed_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("emergency_pubkey"),
        borsh.publicKey("authority"),
        borsh.u64("resumed_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new EmergencyPauseResumed({
      emergency_pubkey: obj.emergency_pubkey,
      authority: obj.authority,
      resumed_at_slot: obj.resumed_at_slot,
    })
  }

  static toEncodable(fields: EmergencyPauseResumedFields) {
    return {
      emergency_pubkey: fields.emergency_pubkey,
      authority: fields.authority,
      resumed_at_slot: fields.resumed_at_slot,
    }
  }

  toJSON(): EmergencyPauseResumedJSON {
    return {
      emergency_pubkey: this.emergency_pubkey.toString(),
      authority: this.authority.toString(),
      resumed_at_slot: this.resumed_at_slot.toString(),
    }
  }

  static fromJSON(obj: EmergencyPauseResumedJSON): EmergencyPauseResumed {
    return new EmergencyPauseResumed({
      emergency_pubkey: new PublicKey(obj.emergency_pubkey),
      authority: new PublicKey(obj.authority),
      resumed_at_slot: new BN(obj.resumed_at_slot),
    })
  }

  toEncodable() {
    return EmergencyPauseResumed.toEncodable(this)
  }
}
