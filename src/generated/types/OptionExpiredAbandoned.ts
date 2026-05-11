import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionExpiredAbandonedFields {
  option: PublicKey
  creator: PublicKey
  refunded: BN
  abandoned_at: BN
}

export interface OptionExpiredAbandonedJSON {
  option: string
  creator: string
  refunded: string
  abandoned_at: string
}

export class OptionExpiredAbandoned {
  readonly option: PublicKey
  readonly creator: PublicKey
  readonly refunded: BN
  readonly abandoned_at: BN

  constructor(fields: OptionExpiredAbandonedFields) {
    this.option = fields.option
    this.creator = fields.creator
    this.refunded = fields.refunded
    this.abandoned_at = fields.abandoned_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("creator"),
        borsh.u64("refunded"),
        borsh.i64("abandoned_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionExpiredAbandoned({
      option: obj.option,
      creator: obj.creator,
      refunded: obj.refunded,
      abandoned_at: obj.abandoned_at,
    })
  }

  static toEncodable(fields: OptionExpiredAbandonedFields) {
    return {
      option: fields.option,
      creator: fields.creator,
      refunded: fields.refunded,
      abandoned_at: fields.abandoned_at,
    }
  }

  toJSON(): OptionExpiredAbandonedJSON {
    return {
      option: this.option.toString(),
      creator: this.creator.toString(),
      refunded: this.refunded.toString(),
      abandoned_at: this.abandoned_at.toString(),
    }
  }

  static fromJSON(obj: OptionExpiredAbandonedJSON): OptionExpiredAbandoned {
    return new OptionExpiredAbandoned({
      option: new PublicKey(obj.option),
      creator: new PublicKey(obj.creator),
      refunded: new BN(obj.refunded),
      abandoned_at: new BN(obj.abandoned_at),
    })
  }

  toEncodable() {
    return OptionExpiredAbandoned.toEncodable(this)
  }
}
