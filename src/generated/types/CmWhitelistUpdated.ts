import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CmWhitelistUpdatedFields {
  cm: PublicKey
  authority: PublicKey
  whitelist_count: number
  replace_all: boolean
  updated_at: BN
}

export interface CmWhitelistUpdatedJSON {
  cm: string
  authority: string
  whitelist_count: number
  replace_all: boolean
  updated_at: string
}

export class CmWhitelistUpdated {
  readonly cm: PublicKey
  readonly authority: PublicKey
  readonly whitelist_count: number
  readonly replace_all: boolean
  readonly updated_at: BN

  constructor(fields: CmWhitelistUpdatedFields) {
    this.cm = fields.cm
    this.authority = fields.authority
    this.whitelist_count = fields.whitelist_count
    this.replace_all = fields.replace_all
    this.updated_at = fields.updated_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("cm"),
        borsh.publicKey("authority"),
        borsh.u8("whitelist_count"),
        borsh.bool("replace_all"),
        borsh.i64("updated_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CmWhitelistUpdated({
      cm: obj.cm,
      authority: obj.authority,
      whitelist_count: obj.whitelist_count,
      replace_all: obj.replace_all,
      updated_at: obj.updated_at,
    })
  }

  static toEncodable(fields: CmWhitelistUpdatedFields) {
    return {
      cm: fields.cm,
      authority: fields.authority,
      whitelist_count: fields.whitelist_count,
      replace_all: fields.replace_all,
      updated_at: fields.updated_at,
    }
  }

  toJSON(): CmWhitelistUpdatedJSON {
    return {
      cm: this.cm.toString(),
      authority: this.authority.toString(),
      whitelist_count: this.whitelist_count,
      replace_all: this.replace_all,
      updated_at: this.updated_at.toString(),
    }
  }

  static fromJSON(obj: CmWhitelistUpdatedJSON): CmWhitelistUpdated {
    return new CmWhitelistUpdated({
      cm: new PublicKey(obj.cm),
      authority: new PublicKey(obj.authority),
      whitelist_count: obj.whitelist_count,
      replace_all: obj.replace_all,
      updated_at: new BN(obj.updated_at),
    })
  }

  toEncodable() {
    return CmWhitelistUpdated.toEncodable(this)
  }
}
