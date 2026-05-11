import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionTransferredFields {
  option: PublicKey
  from: PublicKey
  to: PublicKey
  transferred_at: BN
}

export interface OptionTransferredJSON {
  option: string
  from: string
  to: string
  transferred_at: string
}

export class OptionTransferred {
  readonly option: PublicKey
  readonly from: PublicKey
  readonly to: PublicKey
  readonly transferred_at: BN

  constructor(fields: OptionTransferredFields) {
    this.option = fields.option
    this.from = fields.from
    this.to = fields.to
    this.transferred_at = fields.transferred_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("from"),
        borsh.publicKey("to"),
        borsh.i64("transferred_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionTransferred({
      option: obj.option,
      from: obj.from,
      to: obj.to,
      transferred_at: obj.transferred_at,
    })
  }

  static toEncodable(fields: OptionTransferredFields) {
    return {
      option: fields.option,
      from: fields.from,
      to: fields.to,
      transferred_at: fields.transferred_at,
    }
  }

  toJSON(): OptionTransferredJSON {
    return {
      option: this.option.toString(),
      from: this.from.toString(),
      to: this.to.toString(),
      transferred_at: this.transferred_at.toString(),
    }
  }

  static fromJSON(obj: OptionTransferredJSON): OptionTransferred {
    return new OptionTransferred({
      option: new PublicKey(obj.option),
      from: new PublicKey(obj.from),
      to: new PublicKey(obj.to),
      transferred_at: new BN(obj.transferred_at),
    })
  }

  toEncodable() {
    return OptionTransferred.toEncodable(this)
  }
}
