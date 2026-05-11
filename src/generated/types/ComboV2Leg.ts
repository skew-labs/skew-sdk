import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboV2LegFields {
  option: PublicKey
  side: number
  filled: boolean
  _pad_0: Array<number>
  max_premium_micro: BN
  fill_premium_micro: BN
}

export interface ComboV2LegJSON {
  option: string
  side: number
  filled: boolean
  _pad_0: Array<number>
  max_premium_micro: string
  fill_premium_micro: string
}

export class ComboV2Leg {
  readonly option: PublicKey
  readonly side: number
  readonly filled: boolean
  readonly _pad_0: Array<number>
  readonly max_premium_micro: BN
  readonly fill_premium_micro: BN

  constructor(fields: ComboV2LegFields) {
    this.option = fields.option
    this.side = fields.side
    this.filled = fields.filled
    this._pad_0 = fields._pad_0
    this.max_premium_micro = fields.max_premium_micro
    this.fill_premium_micro = fields.fill_premium_micro
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.i8("side"),
        borsh.bool("filled"),
        borsh.array(borsh.u8(), 6, "_pad_0"),
        borsh.u64("max_premium_micro"),
        borsh.u64("fill_premium_micro"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboV2Leg({
      option: obj.option,
      side: obj.side,
      filled: obj.filled,
      _pad_0: obj._pad_0,
      max_premium_micro: obj.max_premium_micro,
      fill_premium_micro: obj.fill_premium_micro,
    })
  }

  static toEncodable(fields: ComboV2LegFields) {
    return {
      option: fields.option,
      side: fields.side,
      filled: fields.filled,
      _pad_0: fields._pad_0,
      max_premium_micro: fields.max_premium_micro,
      fill_premium_micro: fields.fill_premium_micro,
    }
  }

  toJSON(): ComboV2LegJSON {
    return {
      option: this.option.toString(),
      side: this.side,
      filled: this.filled,
      _pad_0: this._pad_0,
      max_premium_micro: this.max_premium_micro.toString(),
      fill_premium_micro: this.fill_premium_micro.toString(),
    }
  }

  static fromJSON(obj: ComboV2LegJSON): ComboV2Leg {
    return new ComboV2Leg({
      option: new PublicKey(obj.option),
      side: obj.side,
      filled: obj.filled,
      _pad_0: obj._pad_0,
      max_premium_micro: new BN(obj.max_premium_micro),
      fill_premium_micro: new BN(obj.fill_premium_micro),
    })
  }

  toEncodable() {
    return ComboV2Leg.toEncodable(this)
  }
}
