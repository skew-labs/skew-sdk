import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqOptionSpecFields {
  asset: number
  option_type: number
  direction: number
  _pad_0: Array<number>
  strike: BN
  expiry_ts: BN
  payoff_amount_micro: BN
  upper_bound: BN
}

export interface RfqOptionSpecJSON {
  asset: number
  option_type: number
  direction: number
  _pad_0: Array<number>
  strike: string
  expiry_ts: string
  payoff_amount_micro: string
  upper_bound: string
}

export class RfqOptionSpec {
  readonly asset: number
  readonly option_type: number
  readonly direction: number
  readonly _pad_0: Array<number>
  readonly strike: BN
  readonly expiry_ts: BN
  readonly payoff_amount_micro: BN
  readonly upper_bound: BN

  constructor(fields: RfqOptionSpecFields) {
    this.asset = fields.asset
    this.option_type = fields.option_type
    this.direction = fields.direction
    this._pad_0 = fields._pad_0
    this.strike = fields.strike
    this.expiry_ts = fields.expiry_ts
    this.payoff_amount_micro = fields.payoff_amount_micro
    this.upper_bound = fields.upper_bound
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("asset"),
        borsh.u8("option_type"),
        borsh.i8("direction"),
        borsh.array(borsh.u8(), 5, "_pad_0"),
        borsh.u64("strike"),
        borsh.i64("expiry_ts"),
        borsh.u64("payoff_amount_micro"),
        borsh.u64("upper_bound"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqOptionSpec({
      asset: obj.asset,
      option_type: obj.option_type,
      direction: obj.direction,
      _pad_0: obj._pad_0,
      strike: obj.strike,
      expiry_ts: obj.expiry_ts,
      payoff_amount_micro: obj.payoff_amount_micro,
      upper_bound: obj.upper_bound,
    })
  }

  static toEncodable(fields: RfqOptionSpecFields) {
    return {
      asset: fields.asset,
      option_type: fields.option_type,
      direction: fields.direction,
      _pad_0: fields._pad_0,
      strike: fields.strike,
      expiry_ts: fields.expiry_ts,
      payoff_amount_micro: fields.payoff_amount_micro,
      upper_bound: fields.upper_bound,
    }
  }

  toJSON(): RfqOptionSpecJSON {
    return {
      asset: this.asset,
      option_type: this.option_type,
      direction: this.direction,
      _pad_0: this._pad_0,
      strike: this.strike.toString(),
      expiry_ts: this.expiry_ts.toString(),
      payoff_amount_micro: this.payoff_amount_micro.toString(),
      upper_bound: this.upper_bound.toString(),
    }
  }

  static fromJSON(obj: RfqOptionSpecJSON): RfqOptionSpec {
    return new RfqOptionSpec({
      asset: obj.asset,
      option_type: obj.option_type,
      direction: obj.direction,
      _pad_0: obj._pad_0,
      strike: new BN(obj.strike),
      expiry_ts: new BN(obj.expiry_ts),
      payoff_amount_micro: new BN(obj.payoff_amount_micro),
      upper_bound: new BN(obj.upper_bound),
    })
  }

  toEncodable() {
    return RfqOptionSpec.toEncodable(this)
  }
}
