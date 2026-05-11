import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionMetadataRegisteredFields {
  option: PublicKey
  metadata_pda: PublicKey
  registered_at: BN
  registered_by: PublicKey
}

export interface OptionMetadataRegisteredJSON {
  option: string
  metadata_pda: string
  registered_at: string
  registered_by: string
}

export class OptionMetadataRegistered {
  readonly option: PublicKey
  readonly metadata_pda: PublicKey
  readonly registered_at: BN
  readonly registered_by: PublicKey

  constructor(fields: OptionMetadataRegisteredFields) {
    this.option = fields.option
    this.metadata_pda = fields.metadata_pda
    this.registered_at = fields.registered_at
    this.registered_by = fields.registered_by
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("metadata_pda"),
        borsh.i64("registered_at"),
        borsh.publicKey("registered_by"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionMetadataRegistered({
      option: obj.option,
      metadata_pda: obj.metadata_pda,
      registered_at: obj.registered_at,
      registered_by: obj.registered_by,
    })
  }

  static toEncodable(fields: OptionMetadataRegisteredFields) {
    return {
      option: fields.option,
      metadata_pda: fields.metadata_pda,
      registered_at: fields.registered_at,
      registered_by: fields.registered_by,
    }
  }

  toJSON(): OptionMetadataRegisteredJSON {
    return {
      option: this.option.toString(),
      metadata_pda: this.metadata_pda.toString(),
      registered_at: this.registered_at.toString(),
      registered_by: this.registered_by.toString(),
    }
  }

  static fromJSON(obj: OptionMetadataRegisteredJSON): OptionMetadataRegistered {
    return new OptionMetadataRegistered({
      option: new PublicKey(obj.option),
      metadata_pda: new PublicKey(obj.metadata_pda),
      registered_at: new BN(obj.registered_at),
      registered_by: new PublicKey(obj.registered_by),
    })
  }

  toEncodable() {
    return OptionMetadataRegistered.toEncodable(this)
  }
}
