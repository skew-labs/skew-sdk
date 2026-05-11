import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface SkewMetricsPdaFields {
  asset: number
  bump: number
  padding_0: Array<number>
  last_update_slot: BN
  atm_iv_28d_micro: BN
  rr25_micro: BN
  bf25_micro: BN
  rr10_micro: BN
  atm_slope_micro: BN
  iv_per_tenor_micro: Array<BN>
}

export interface SkewMetricsPdaJSON {
  asset: number
  bump: number
  padding_0: Array<number>
  last_update_slot: string
  atm_iv_28d_micro: string
  rr25_micro: string
  bf25_micro: string
  rr10_micro: string
  atm_slope_micro: string
  iv_per_tenor_micro: Array<string>
}

export class SkewMetricsPda {
  readonly asset: number
  readonly bump: number
  readonly padding_0: Array<number>
  readonly last_update_slot: BN
  readonly atm_iv_28d_micro: BN
  readonly rr25_micro: BN
  readonly bf25_micro: BN
  readonly rr10_micro: BN
  readonly atm_slope_micro: BN
  readonly iv_per_tenor_micro: Array<BN>

  static readonly discriminator = Buffer.from([
    37, 127, 134, 33, 42, 193, 50, 109,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("atm_iv_28d_micro"),
    borsh.i64("rr25_micro"),
    borsh.i64("bf25_micro"),
    borsh.i64("rr10_micro"),
    borsh.i64("atm_slope_micro"),
    borsh.array(borsh.u64(), 8, "iv_per_tenor_micro"),
  ])

  constructor(fields: SkewMetricsPdaFields) {
    this.asset = fields.asset
    this.bump = fields.bump
    this.padding_0 = fields.padding_0
    this.last_update_slot = fields.last_update_slot
    this.atm_iv_28d_micro = fields.atm_iv_28d_micro
    this.rr25_micro = fields.rr25_micro
    this.bf25_micro = fields.bf25_micro
    this.rr10_micro = fields.rr10_micro
    this.atm_slope_micro = fields.atm_slope_micro
    this.iv_per_tenor_micro = fields.iv_per_tenor_micro
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<SkewMetricsPda | null> {
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
  ): Promise<Array<SkewMetricsPda | null>> {
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

  static decode(data: Buffer): SkewMetricsPda {
    if (!data.slice(0, 8).equals(SkewMetricsPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = SkewMetricsPda.layout.decode(data.slice(8))

    return new SkewMetricsPda({
      asset: dec.asset,
      bump: dec.bump,
      padding_0: dec.padding_0,
      last_update_slot: dec.last_update_slot,
      atm_iv_28d_micro: dec.atm_iv_28d_micro,
      rr25_micro: dec.rr25_micro,
      bf25_micro: dec.bf25_micro,
      rr10_micro: dec.rr10_micro,
      atm_slope_micro: dec.atm_slope_micro,
      iv_per_tenor_micro: dec.iv_per_tenor_micro,
    })
  }

  toJSON(): SkewMetricsPdaJSON {
    return {
      asset: this.asset,
      bump: this.bump,
      padding_0: this.padding_0,
      last_update_slot: this.last_update_slot.toString(),
      atm_iv_28d_micro: this.atm_iv_28d_micro.toString(),
      rr25_micro: this.rr25_micro.toString(),
      bf25_micro: this.bf25_micro.toString(),
      rr10_micro: this.rr10_micro.toString(),
      atm_slope_micro: this.atm_slope_micro.toString(),
      iv_per_tenor_micro: this.iv_per_tenor_micro.map((item) =>
        item.toString()
      ),
    }
  }

  static fromJSON(obj: SkewMetricsPdaJSON): SkewMetricsPda {
    return new SkewMetricsPda({
      asset: obj.asset,
      bump: obj.bump,
      padding_0: obj.padding_0,
      last_update_slot: new BN(obj.last_update_slot),
      atm_iv_28d_micro: new BN(obj.atm_iv_28d_micro),
      rr25_micro: new BN(obj.rr25_micro),
      bf25_micro: new BN(obj.bf25_micro),
      rr10_micro: new BN(obj.rr10_micro),
      atm_slope_micro: new BN(obj.atm_slope_micro),
      iv_per_tenor_micro: obj.iv_per_tenor_micro.map((item) => new BN(item)),
    })
  }
}
