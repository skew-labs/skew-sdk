import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PositionLimitsPdaFields {
  bump: number
  _padding_0: Array<number>
  per_asset_short_limit_usd_micro: Array<BN>
  last_updated_at: BN
  _reserved: Array<number>
}

export interface PositionLimitsPdaJSON {
  bump: number
  _padding_0: Array<number>
  per_asset_short_limit_usd_micro: Array<string>
  last_updated_at: string
  _reserved: Array<number>
}

export class PositionLimitsPda {
  readonly bump: number
  readonly _padding_0: Array<number>
  readonly per_asset_short_limit_usd_micro: Array<BN>
  readonly last_updated_at: BN
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    135, 246, 73, 200, 208, 55, 147, 122,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "_padding_0"),
    borsh.array(borsh.u64(), 5, "per_asset_short_limit_usd_micro"),
    borsh.i64("last_updated_at"),
    borsh.array(borsh.u8(), 32, "_reserved"),
  ])

  constructor(fields: PositionLimitsPdaFields) {
    this.bump = fields.bump
    this._padding_0 = fields._padding_0
    this.per_asset_short_limit_usd_micro =
      fields.per_asset_short_limit_usd_micro
    this.last_updated_at = fields.last_updated_at
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PositionLimitsPda | null> {
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
  ): Promise<Array<PositionLimitsPda | null>> {
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

  static decode(data: Buffer): PositionLimitsPda {
    if (!data.slice(0, 8).equals(PositionLimitsPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PositionLimitsPda.layout.decode(data.slice(8))

    return new PositionLimitsPda({
      bump: dec.bump,
      _padding_0: dec._padding_0,
      per_asset_short_limit_usd_micro: dec.per_asset_short_limit_usd_micro,
      last_updated_at: dec.last_updated_at,
      _reserved: dec._reserved,
    })
  }

  toJSON(): PositionLimitsPdaJSON {
    return {
      bump: this.bump,
      _padding_0: this._padding_0,
      per_asset_short_limit_usd_micro: this.per_asset_short_limit_usd_micro.map(
        (item) => item.toString()
      ),
      last_updated_at: this.last_updated_at.toString(),
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: PositionLimitsPdaJSON): PositionLimitsPda {
    return new PositionLimitsPda({
      bump: obj.bump,
      _padding_0: obj._padding_0,
      per_asset_short_limit_usd_micro: obj.per_asset_short_limit_usd_micro.map(
        (item) => new BN(item)
      ),
      last_updated_at: new BN(obj.last_updated_at),
      _reserved: obj._reserved,
    })
  }
}
