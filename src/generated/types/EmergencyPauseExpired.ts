import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface EmergencyPauseExpiredFields {
  emergency_pubkey: PublicKey
  cleared_by: PublicKey
  expired_at_slot: BN
}

export interface EmergencyPauseExpiredJSON {
  emergency_pubkey: string
  cleared_by: string
  expired_at_slot: string
}

export class EmergencyPauseExpired {
  readonly emergency_pubkey: PublicKey
  readonly cleared_by: PublicKey
  readonly expired_at_slot: BN

  constructor(fields: EmergencyPauseExpiredFields) {
    this.emergency_pubkey = fields.emergency_pubkey
    this.cleared_by = fields.cleared_by
    this.expired_at_slot = fields.expired_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("emergency_pubkey"),
        borsh.publicKey("cleared_by"),
        borsh.u64("expired_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new EmergencyPauseExpired({
      emergency_pubkey: obj.emergency_pubkey,
      cleared_by: obj.cleared_by,
      expired_at_slot: obj.expired_at_slot,
    })
  }

  static toEncodable(fields: EmergencyPauseExpiredFields) {
    return {
      emergency_pubkey: fields.emergency_pubkey,
      cleared_by: fields.cleared_by,
      expired_at_slot: fields.expired_at_slot,
    }
  }

  toJSON(): EmergencyPauseExpiredJSON {
    return {
      emergency_pubkey: this.emergency_pubkey.toString(),
      cleared_by: this.cleared_by.toString(),
      expired_at_slot: this.expired_at_slot.toString(),
    }
  }

  static fromJSON(obj: EmergencyPauseExpiredJSON): EmergencyPauseExpired {
    return new EmergencyPauseExpired({
      emergency_pubkey: new PublicKey(obj.emergency_pubkey),
      cleared_by: new PublicKey(obj.cleared_by),
      expired_at_slot: new BN(obj.expired_at_slot),
    })
  }

  toEncodable() {
    return EmergencyPauseExpired.toEncodable(this)
  }
}
