import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboLegSpecFields {
  option: PublicKey
  side: number
  max_premium_micro: BN
  _padding: Array<number>
}

export interface ComboLegSpecJSON {
  option: string
  side: number
  max_premium_micro: string
  _padding: Array<number>
}

export class ComboLegSpec {
  readonly option: PublicKey
  readonly side: number
  readonly max_premium_micro: BN
  readonly _padding: Array<number>

  constructor(fields: ComboLegSpecFields) {
    this.option = fields.option
    this.side = fields.side
    this.max_premium_micro = fields.max_premium_micro
    this._padding = fields._padding
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.i8("side"),
        borsh.u64("max_premium_micro"),
        borsh.array(borsh.u8(), 7, "_padding"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboLegSpec({
      option: obj.option,
      side: obj.side,
      max_premium_micro: obj.max_premium_micro,
      _padding: obj._padding,
    })
  }

  static toEncodable(fields: ComboLegSpecFields) {
    return {
      option: fields.option,
      side: fields.side,
      max_premium_micro: fields.max_premium_micro,
      _padding: fields._padding,
    }
  }

  toJSON(): ComboLegSpecJSON {
    return {
      option: this.option.toString(),
      side: this.side,
      max_premium_micro: this.max_premium_micro.toString(),
      _padding: this._padding,
    }
  }

  static fromJSON(obj: ComboLegSpecJSON): ComboLegSpec {
    return new ComboLegSpec({
      option: new PublicKey(obj.option),
      side: obj.side,
      max_premium_micro: new BN(obj.max_premium_micro),
      _padding: obj._padding,
    })
  }

  toEncodable() {
    return ComboLegSpec.toEncodable(this)
  }
}
