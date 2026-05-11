import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SeriesMaxOiUpdatedFields {
  series: PublicKey
  asset: number
  strike: BN
  expiry_ts: BN
  option_type: number
  direction: number
  prev_max_oi: number
  new_max_oi: number
  current_oi: number
  updated_at: BN
  updated_by: PublicKey
}

export interface SeriesMaxOiUpdatedJSON {
  series: string
  asset: number
  strike: string
  expiry_ts: string
  option_type: number
  direction: number
  prev_max_oi: number
  new_max_oi: number
  current_oi: number
  updated_at: string
  updated_by: string
}

export class SeriesMaxOiUpdated {
  readonly series: PublicKey
  readonly asset: number
  readonly strike: BN
  readonly expiry_ts: BN
  readonly option_type: number
  readonly direction: number
  readonly prev_max_oi: number
  readonly new_max_oi: number
  readonly current_oi: number
  readonly updated_at: BN
  readonly updated_by: PublicKey

  constructor(fields: SeriesMaxOiUpdatedFields) {
    this.series = fields.series
    this.asset = fields.asset
    this.strike = fields.strike
    this.expiry_ts = fields.expiry_ts
    this.option_type = fields.option_type
    this.direction = fields.direction
    this.prev_max_oi = fields.prev_max_oi
    this.new_max_oi = fields.new_max_oi
    this.current_oi = fields.current_oi
    this.updated_at = fields.updated_at
    this.updated_by = fields.updated_by
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("series"),
        borsh.u8("asset"),
        borsh.u64("strike"),
        borsh.i64("expiry_ts"),
        borsh.u8("option_type"),
        borsh.i8("direction"),
        borsh.u32("prev_max_oi"),
        borsh.u32("new_max_oi"),
        borsh.u32("current_oi"),
        borsh.i64("updated_at"),
        borsh.publicKey("updated_by"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SeriesMaxOiUpdated({
      series: obj.series,
      asset: obj.asset,
      strike: obj.strike,
      expiry_ts: obj.expiry_ts,
      option_type: obj.option_type,
      direction: obj.direction,
      prev_max_oi: obj.prev_max_oi,
      new_max_oi: obj.new_max_oi,
      current_oi: obj.current_oi,
      updated_at: obj.updated_at,
      updated_by: obj.updated_by,
    })
  }

  static toEncodable(fields: SeriesMaxOiUpdatedFields) {
    return {
      series: fields.series,
      asset: fields.asset,
      strike: fields.strike,
      expiry_ts: fields.expiry_ts,
      option_type: fields.option_type,
      direction: fields.direction,
      prev_max_oi: fields.prev_max_oi,
      new_max_oi: fields.new_max_oi,
      current_oi: fields.current_oi,
      updated_at: fields.updated_at,
      updated_by: fields.updated_by,
    }
  }

  toJSON(): SeriesMaxOiUpdatedJSON {
    return {
      series: this.series.toString(),
      asset: this.asset,
      strike: this.strike.toString(),
      expiry_ts: this.expiry_ts.toString(),
      option_type: this.option_type,
      direction: this.direction,
      prev_max_oi: this.prev_max_oi,
      new_max_oi: this.new_max_oi,
      current_oi: this.current_oi,
      updated_at: this.updated_at.toString(),
      updated_by: this.updated_by.toString(),
    }
  }

  static fromJSON(obj: SeriesMaxOiUpdatedJSON): SeriesMaxOiUpdated {
    return new SeriesMaxOiUpdated({
      series: new PublicKey(obj.series),
      asset: obj.asset,
      strike: new BN(obj.strike),
      expiry_ts: new BN(obj.expiry_ts),
      option_type: obj.option_type,
      direction: obj.direction,
      prev_max_oi: obj.prev_max_oi,
      new_max_oi: obj.new_max_oi,
      current_oi: obj.current_oi,
      updated_at: new BN(obj.updated_at),
      updated_by: new PublicKey(obj.updated_by),
    })
  }

  toEncodable() {
    return SeriesMaxOiUpdated.toEncodable(this)
  }
}
