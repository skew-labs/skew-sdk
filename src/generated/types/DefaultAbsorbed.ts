import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DefaultAbsorbedFields {
  defaulting_cm: PublicKey
  tier: number
  amount: BN
  remaining: BN
  absorbed_at: BN
}

export interface DefaultAbsorbedJSON {
  defaulting_cm: string
  tier: number
  amount: string
  remaining: string
  absorbed_at: string
}

export class DefaultAbsorbed {
  readonly defaulting_cm: PublicKey
  readonly tier: number
  readonly amount: BN
  readonly remaining: BN
  readonly absorbed_at: BN

  constructor(fields: DefaultAbsorbedFields) {
    this.defaulting_cm = fields.defaulting_cm
    this.tier = fields.tier
    this.amount = fields.amount
    this.remaining = fields.remaining
    this.absorbed_at = fields.absorbed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("defaulting_cm"),
        borsh.u8("tier"),
        borsh.u64("amount"),
        borsh.u64("remaining"),
        borsh.i64("absorbed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DefaultAbsorbed({
      defaulting_cm: obj.defaulting_cm,
      tier: obj.tier,
      amount: obj.amount,
      remaining: obj.remaining,
      absorbed_at: obj.absorbed_at,
    })
  }

  static toEncodable(fields: DefaultAbsorbedFields) {
    return {
      defaulting_cm: fields.defaulting_cm,
      tier: fields.tier,
      amount: fields.amount,
      remaining: fields.remaining,
      absorbed_at: fields.absorbed_at,
    }
  }

  toJSON(): DefaultAbsorbedJSON {
    return {
      defaulting_cm: this.defaulting_cm.toString(),
      tier: this.tier,
      amount: this.amount.toString(),
      remaining: this.remaining.toString(),
      absorbed_at: this.absorbed_at.toString(),
    }
  }

  static fromJSON(obj: DefaultAbsorbedJSON): DefaultAbsorbed {
    return new DefaultAbsorbed({
      defaulting_cm: new PublicKey(obj.defaulting_cm),
      tier: obj.tier,
      amount: new BN(obj.amount),
      remaining: new BN(obj.remaining),
      absorbed_at: new BN(obj.absorbed_at),
    })
  }

  toEncodable() {
    return DefaultAbsorbed.toEncodable(this)
  }
}
