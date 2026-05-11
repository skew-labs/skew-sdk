import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionDisputedFields {
  option: PublicKey
  creator: PublicKey
  disputed_at: BN
}

export interface OptionDisputedJSON {
  option: string
  creator: string
  disputed_at: string
}

export class OptionDisputed {
  readonly option: PublicKey
  readonly creator: PublicKey
  readonly disputed_at: BN

  constructor(fields: OptionDisputedFields) {
    this.option = fields.option
    this.creator = fields.creator
    this.disputed_at = fields.disputed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("creator"),
        borsh.i64("disputed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionDisputed({
      option: obj.option,
      creator: obj.creator,
      disputed_at: obj.disputed_at,
    })
  }

  static toEncodable(fields: OptionDisputedFields) {
    return {
      option: fields.option,
      creator: fields.creator,
      disputed_at: fields.disputed_at,
    }
  }

  toJSON(): OptionDisputedJSON {
    return {
      option: this.option.toString(),
      creator: this.creator.toString(),
      disputed_at: this.disputed_at.toString(),
    }
  }

  static fromJSON(obj: OptionDisputedJSON): OptionDisputed {
    return new OptionDisputed({
      option: new PublicKey(obj.option),
      creator: new PublicKey(obj.creator),
      disputed_at: new BN(obj.disputed_at),
    })
  }

  toEncodable() {
    return OptionDisputed.toEncodable(this)
  }
}
