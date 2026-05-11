import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface EmergencyPauseActivatedFields {
  emergency_pubkey: PublicKey
  authority: PublicKey
  activated_at_slot: BN
}

export interface EmergencyPauseActivatedJSON {
  emergency_pubkey: string
  authority: string
  activated_at_slot: string
}

export class EmergencyPauseActivated {
  readonly emergency_pubkey: PublicKey
  readonly authority: PublicKey
  readonly activated_at_slot: BN

  constructor(fields: EmergencyPauseActivatedFields) {
    this.emergency_pubkey = fields.emergency_pubkey
    this.authority = fields.authority
    this.activated_at_slot = fields.activated_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("emergency_pubkey"),
        borsh.publicKey("authority"),
        borsh.u64("activated_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new EmergencyPauseActivated({
      emergency_pubkey: obj.emergency_pubkey,
      authority: obj.authority,
      activated_at_slot: obj.activated_at_slot,
    })
  }

  static toEncodable(fields: EmergencyPauseActivatedFields) {
    return {
      emergency_pubkey: fields.emergency_pubkey,
      authority: fields.authority,
      activated_at_slot: fields.activated_at_slot,
    }
  }

  toJSON(): EmergencyPauseActivatedJSON {
    return {
      emergency_pubkey: this.emergency_pubkey.toString(),
      authority: this.authority.toString(),
      activated_at_slot: this.activated_at_slot.toString(),
    }
  }

  static fromJSON(obj: EmergencyPauseActivatedJSON): EmergencyPauseActivated {
    return new EmergencyPauseActivated({
      emergency_pubkey: new PublicKey(obj.emergency_pubkey),
      authority: new PublicKey(obj.authority),
      activated_at_slot: new BN(obj.activated_at_slot),
    })
  }

  toEncodable() {
    return EmergencyPauseActivated.toEncodable(this)
  }
}
