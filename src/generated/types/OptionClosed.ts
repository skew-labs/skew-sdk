import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionClosedFields {
  option: PublicKey
  creator: PublicKey
  refunded: BN
  closed_at: BN
}

export interface OptionClosedJSON {
  option: string
  creator: string
  refunded: string
  closed_at: string
}

export class OptionClosed {
  readonly option: PublicKey
  readonly creator: PublicKey
  readonly refunded: BN
  readonly closed_at: BN

  constructor(fields: OptionClosedFields) {
    this.option = fields.option
    this.creator = fields.creator
    this.refunded = fields.refunded
    this.closed_at = fields.closed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("creator"),
        borsh.u64("refunded"),
        borsh.i64("closed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionClosed({
      option: obj.option,
      creator: obj.creator,
      refunded: obj.refunded,
      closed_at: obj.closed_at,
    })
  }

  static toEncodable(fields: OptionClosedFields) {
    return {
      option: fields.option,
      creator: fields.creator,
      refunded: fields.refunded,
      closed_at: fields.closed_at,
    }
  }

  toJSON(): OptionClosedJSON {
    return {
      option: this.option.toString(),
      creator: this.creator.toString(),
      refunded: this.refunded.toString(),
      closed_at: this.closed_at.toString(),
    }
  }

  static fromJSON(obj: OptionClosedJSON): OptionClosed {
    return new OptionClosed({
      option: new PublicKey(obj.option),
      creator: new PublicKey(obj.creator),
      refunded: new BN(obj.refunded),
      closed_at: new BN(obj.closed_at),
    })
  }

  toEncodable() {
    return OptionClosed.toEncodable(this)
  }
}
