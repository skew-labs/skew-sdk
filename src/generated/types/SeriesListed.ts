import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SeriesListedFields {
  series_pda: PublicKey
  asset: number
  strike: BN
  expiry_ts: BN
  option_type: types.OptionTypeKind
  direction: number
  listed_at: BN
}

export interface SeriesListedJSON {
  series_pda: string
  asset: number
  strike: string
  expiry_ts: string
  option_type: types.OptionTypeJSON
  direction: number
  listed_at: string
}

export class SeriesListed {
  readonly series_pda: PublicKey
  readonly asset: number
  readonly strike: BN
  readonly expiry_ts: BN
  readonly option_type: types.OptionTypeKind
  readonly direction: number
  readonly listed_at: BN

  constructor(fields: SeriesListedFields) {
    this.series_pda = fields.series_pda
    this.asset = fields.asset
    this.strike = fields.strike
    this.expiry_ts = fields.expiry_ts
    this.option_type = fields.option_type
    this.direction = fields.direction
    this.listed_at = fields.listed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("series_pda"),
        borsh.u8("asset"),
        borsh.u64("strike"),
        borsh.i64("expiry_ts"),
        types.OptionType.layout("option_type"),
        borsh.i8("direction"),
        borsh.i64("listed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SeriesListed({
      series_pda: obj.series_pda,
      asset: obj.asset,
      strike: obj.strike,
      expiry_ts: obj.expiry_ts,
      option_type: types.OptionType.fromDecoded(obj.option_type),
      direction: obj.direction,
      listed_at: obj.listed_at,
    })
  }

  static toEncodable(fields: SeriesListedFields) {
    return {
      series_pda: fields.series_pda,
      asset: fields.asset,
      strike: fields.strike,
      expiry_ts: fields.expiry_ts,
      option_type: fields.option_type.toEncodable(),
      direction: fields.direction,
      listed_at: fields.listed_at,
    }
  }

  toJSON(): SeriesListedJSON {
    return {
      series_pda: this.series_pda.toString(),
      asset: this.asset,
      strike: this.strike.toString(),
      expiry_ts: this.expiry_ts.toString(),
      option_type: this.option_type.toJSON(),
      direction: this.direction,
      listed_at: this.listed_at.toString(),
    }
  }

  static fromJSON(obj: SeriesListedJSON): SeriesListed {
    return new SeriesListed({
      series_pda: new PublicKey(obj.series_pda),
      asset: obj.asset,
      strike: new BN(obj.strike),
      expiry_ts: new BN(obj.expiry_ts),
      option_type: types.OptionType.fromJSON(obj.option_type),
      direction: obj.direction,
      listed_at: new BN(obj.listed_at),
    })
  }

  toEncodable() {
    return SeriesListed.toEncodable(this)
  }
}
