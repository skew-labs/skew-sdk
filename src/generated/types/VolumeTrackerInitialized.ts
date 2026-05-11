import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface VolumeTrackerInitializedFields {
  volume_tracker_pda: PublicKey
  authority: PublicKey
  initialized_at: BN
}

export interface VolumeTrackerInitializedJSON {
  volume_tracker_pda: string
  authority: string
  initialized_at: string
}

export class VolumeTrackerInitialized {
  readonly volume_tracker_pda: PublicKey
  readonly authority: PublicKey
  readonly initialized_at: BN

  constructor(fields: VolumeTrackerInitializedFields) {
    this.volume_tracker_pda = fields.volume_tracker_pda
    this.authority = fields.authority
    this.initialized_at = fields.initialized_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("volume_tracker_pda"),
        borsh.publicKey("authority"),
        borsh.i64("initialized_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new VolumeTrackerInitialized({
      volume_tracker_pda: obj.volume_tracker_pda,
      authority: obj.authority,
      initialized_at: obj.initialized_at,
    })
  }

  static toEncodable(fields: VolumeTrackerInitializedFields) {
    return {
      volume_tracker_pda: fields.volume_tracker_pda,
      authority: fields.authority,
      initialized_at: fields.initialized_at,
    }
  }

  toJSON(): VolumeTrackerInitializedJSON {
    return {
      volume_tracker_pda: this.volume_tracker_pda.toString(),
      authority: this.authority.toString(),
      initialized_at: this.initialized_at.toString(),
    }
  }

  static fromJSON(obj: VolumeTrackerInitializedJSON): VolumeTrackerInitialized {
    return new VolumeTrackerInitialized({
      volume_tracker_pda: new PublicKey(obj.volume_tracker_pda),
      authority: new PublicKey(obj.authority),
      initialized_at: new BN(obj.initialized_at),
    })
  }

  toEncodable() {
    return VolumeTrackerInitialized.toEncodable(this)
  }
}
