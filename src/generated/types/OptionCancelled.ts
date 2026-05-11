import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionCancelledFields {
  option: PublicKey
  creator: PublicKey
  refunded: BN
  cancelled_at: BN
}

export interface OptionCancelledJSON {
  option: string
  creator: string
  refunded: string
  cancelled_at: string
}

export class OptionCancelled {
  readonly option: PublicKey
  readonly creator: PublicKey
  readonly refunded: BN
  readonly cancelled_at: BN

  constructor(fields: OptionCancelledFields) {
    this.option = fields.option
    this.creator = fields.creator
    this.refunded = fields.refunded
    this.cancelled_at = fields.cancelled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("creator"),
        borsh.u64("refunded"),
        borsh.i64("cancelled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionCancelled({
      option: obj.option,
      creator: obj.creator,
      refunded: obj.refunded,
      cancelled_at: obj.cancelled_at,
    })
  }

  static toEncodable(fields: OptionCancelledFields) {
    return {
      option: fields.option,
      creator: fields.creator,
      refunded: fields.refunded,
      cancelled_at: fields.cancelled_at,
    }
  }

  toJSON(): OptionCancelledJSON {
    return {
      option: this.option.toString(),
      creator: this.creator.toString(),
      refunded: this.refunded.toString(),
      cancelled_at: this.cancelled_at.toString(),
    }
  }

  static fromJSON(obj: OptionCancelledJSON): OptionCancelled {
    return new OptionCancelled({
      option: new PublicKey(obj.option),
      creator: new PublicKey(obj.creator),
      refunded: new BN(obj.refunded),
      cancelled_at: new BN(obj.cancelled_at),
    })
  }

  toEncodable() {
    return OptionCancelled.toEncodable(this)
  }
}
