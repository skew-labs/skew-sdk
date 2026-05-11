import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SeriesListingPdaFields {
  asset: number
  option_type: types.OptionTypeKind
  direction: number
  status: number
  _padding_a: Array<number>
  strike: BN
  expiry_ts: BN
  last_fill_price_micro: BN
  last_fill_at: BN
  total_oi_count: number
  cumulative_fill_count: number
  max_oi_count: number
  listed_at: BN
  bump: number
  _padding_b: Array<number>
}

export interface SeriesListingPdaJSON {
  asset: number
  option_type: types.OptionTypeJSON
  direction: number
  status: number
  _padding_a: Array<number>
  strike: string
  expiry_ts: string
  last_fill_price_micro: string
  last_fill_at: string
  total_oi_count: number
  cumulative_fill_count: number
  max_oi_count: number
  listed_at: string
  bump: number
  _padding_b: Array<number>
}

export class SeriesListingPda {
  readonly asset: number
  readonly option_type: types.OptionTypeKind
  readonly direction: number
  readonly status: number
  readonly _padding_a: Array<number>
  readonly strike: BN
  readonly expiry_ts: BN
  readonly last_fill_price_micro: BN
  readonly last_fill_at: BN
  readonly total_oi_count: number
  readonly cumulative_fill_count: number
  readonly max_oi_count: number
  readonly listed_at: BN
  readonly bump: number
  readonly _padding_b: Array<number>

  static readonly discriminator = Buffer.from([
    50, 23, 32, 98, 25, 203, 138, 104,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("asset"),
    types.OptionType.layout("option_type"),
    borsh.i8("direction"),
    borsh.u8("status"),
    borsh.array(borsh.u8(), 4, "_padding_a"),
    borsh.u64("strike"),
    borsh.i64("expiry_ts"),
    borsh.u64("last_fill_price_micro"),
    borsh.i64("last_fill_at"),
    borsh.u32("total_oi_count"),
    borsh.u32("cumulative_fill_count"),
    borsh.u32("max_oi_count"),
    borsh.i64("listed_at"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 3, "_padding_b"),
  ])

  constructor(fields: SeriesListingPdaFields) {
    this.asset = fields.asset
    this.option_type = fields.option_type
    this.direction = fields.direction
    this.status = fields.status
    this._padding_a = fields._padding_a
    this.strike = fields.strike
    this.expiry_ts = fields.expiry_ts
    this.last_fill_price_micro = fields.last_fill_price_micro
    this.last_fill_at = fields.last_fill_at
    this.total_oi_count = fields.total_oi_count
    this.cumulative_fill_count = fields.cumulative_fill_count
    this.max_oi_count = fields.max_oi_count
    this.listed_at = fields.listed_at
    this.bump = fields.bump
    this._padding_b = fields._padding_b
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<SeriesListingPda | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<SeriesListingPda | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): SeriesListingPda {
    if (!data.slice(0, 8).equals(SeriesListingPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SeriesListingPda.layout.decode(data.slice(8))

    return new SeriesListingPda({
      asset: dec.asset,
      option_type: types.OptionType.fromDecoded(dec.option_type),
      direction: dec.direction,
      status: dec.status,
      _padding_a: dec._padding_a,
      strike: dec.strike,
      expiry_ts: dec.expiry_ts,
      last_fill_price_micro: dec.last_fill_price_micro,
      last_fill_at: dec.last_fill_at,
      total_oi_count: dec.total_oi_count,
      cumulative_fill_count: dec.cumulative_fill_count,
      max_oi_count: dec.max_oi_count,
      listed_at: dec.listed_at,
      bump: dec.bump,
      _padding_b: dec._padding_b,
    })
  }

  toJSON(): SeriesListingPdaJSON {
    return {
      asset: this.asset,
      option_type: this.option_type.toJSON(),
      direction: this.direction,
      status: this.status,
      _padding_a: this._padding_a,
      strike: this.strike.toString(),
      expiry_ts: this.expiry_ts.toString(),
      last_fill_price_micro: this.last_fill_price_micro.toString(),
      last_fill_at: this.last_fill_at.toString(),
      total_oi_count: this.total_oi_count,
      cumulative_fill_count: this.cumulative_fill_count,
      max_oi_count: this.max_oi_count,
      listed_at: this.listed_at.toString(),
      bump: this.bump,
      _padding_b: this._padding_b,
    }
  }

  static fromJSON(obj: SeriesListingPdaJSON): SeriesListingPda {
    return new SeriesListingPda({
      asset: obj.asset,
      option_type: types.OptionType.fromJSON(obj.option_type),
      direction: obj.direction,
      status: obj.status,
      _padding_a: obj._padding_a,
      strike: new BN(obj.strike),
      expiry_ts: new BN(obj.expiry_ts),
      last_fill_price_micro: new BN(obj.last_fill_price_micro),
      last_fill_at: new BN(obj.last_fill_at),
      total_oi_count: obj.total_oi_count,
      cumulative_fill_count: obj.cumulative_fill_count,
      max_oi_count: obj.max_oi_count,
      listed_at: new BN(obj.listed_at),
      bump: obj.bump,
      _padding_b: obj._padding_b,
    })
  }
}
