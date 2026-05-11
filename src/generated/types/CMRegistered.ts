import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CMRegisteredFields {
  cm: PublicKey
  authority: PublicKey
  initial_collateral: BN
  registered_at: BN
}

export interface CMRegisteredJSON {
  cm: string
  authority: string
  initial_collateral: string
  registered_at: string
}

export class CMRegistered {
  readonly cm: PublicKey
  readonly authority: PublicKey
  readonly initial_collateral: BN
  readonly registered_at: BN

  constructor(fields: CMRegisteredFields) {
    this.cm = fields.cm
    this.authority = fields.authority
    this.initial_collateral = fields.initial_collateral
    this.registered_at = fields.registered_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("cm"),
        borsh.publicKey("authority"),
        borsh.u64("initial_collateral"),
        borsh.i64("registered_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CMRegistered({
      cm: obj.cm,
      authority: obj.authority,
      initial_collateral: obj.initial_collateral,
      registered_at: obj.registered_at,
    })
  }

  static toEncodable(fields: CMRegisteredFields) {
    return {
      cm: fields.cm,
      authority: fields.authority,
      initial_collateral: fields.initial_collateral,
      registered_at: fields.registered_at,
    }
  }

  toJSON(): CMRegisteredJSON {
    return {
      cm: this.cm.toString(),
      authority: this.authority.toString(),
      initial_collateral: this.initial_collateral.toString(),
      registered_at: this.registered_at.toString(),
    }
  }

  static fromJSON(obj: CMRegisteredJSON): CMRegistered {
    return new CMRegistered({
      cm: new PublicKey(obj.cm),
      authority: new PublicKey(obj.authority),
      initial_collateral: new BN(obj.initial_collateral),
      registered_at: new BN(obj.registered_at),
    })
  }

  toEncodable() {
    return CMRegistered.toEncodable(this)
  }
}
