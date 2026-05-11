import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MicrostructurePDAFields {
  asset: number
  padding_0: Array<number>
  last_update_slot: BN
  spot_micro: BN
  bid_ask_spread_bps: number
  padding_1: Array<number>
  depth_100k_usd_micro: BN
  volume_24h_usd_micro: BN
  iv_bid_28d_micro: BN
  iv_ask_28d_micro: BN
}

export interface MicrostructurePDAJSON {
  asset: number
  padding_0: Array<number>
  last_update_slot: string
  spot_micro: string
  bid_ask_spread_bps: number
  padding_1: Array<number>
  depth_100k_usd_micro: string
  volume_24h_usd_micro: string
  iv_bid_28d_micro: string
  iv_ask_28d_micro: string
}

export class MicrostructurePDA {
  readonly asset: number
  readonly padding_0: Array<number>
  readonly last_update_slot: BN
  readonly spot_micro: BN
  readonly bid_ask_spread_bps: number
  readonly padding_1: Array<number>
  readonly depth_100k_usd_micro: BN
  readonly volume_24h_usd_micro: BN
  readonly iv_bid_28d_micro: BN
  readonly iv_ask_28d_micro: BN

  static readonly discriminator = Buffer.from([
    112, 24, 15, 7, 108, 153, 240, 45,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("asset"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("spot_micro"),
    borsh.u32("bid_ask_spread_bps"),
    borsh.array(borsh.u8(), 4, "padding_1"),
    borsh.u64("depth_100k_usd_micro"),
    borsh.u64("volume_24h_usd_micro"),
    borsh.u64("iv_bid_28d_micro"),
    borsh.u64("iv_ask_28d_micro"),
  ])

  constructor(fields: MicrostructurePDAFields) {
    this.asset = fields.asset
    this.padding_0 = fields.padding_0
    this.last_update_slot = fields.last_update_slot
    this.spot_micro = fields.spot_micro
    this.bid_ask_spread_bps = fields.bid_ask_spread_bps
    this.padding_1 = fields.padding_1
    this.depth_100k_usd_micro = fields.depth_100k_usd_micro
    this.volume_24h_usd_micro = fields.volume_24h_usd_micro
    this.iv_bid_28d_micro = fields.iv_bid_28d_micro
    this.iv_ask_28d_micro = fields.iv_ask_28d_micro
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<MicrostructurePDA | null> {
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
  ): Promise<Array<MicrostructurePDA | null>> {
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

  static decode(data: Buffer): MicrostructurePDA {
    if (!data.slice(0, 8).equals(MicrostructurePDA.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = MicrostructurePDA.layout.decode(data.slice(8))

    return new MicrostructurePDA({
      asset: dec.asset,
      padding_0: dec.padding_0,
      last_update_slot: dec.last_update_slot,
      spot_micro: dec.spot_micro,
      bid_ask_spread_bps: dec.bid_ask_spread_bps,
      padding_1: dec.padding_1,
      depth_100k_usd_micro: dec.depth_100k_usd_micro,
      volume_24h_usd_micro: dec.volume_24h_usd_micro,
      iv_bid_28d_micro: dec.iv_bid_28d_micro,
      iv_ask_28d_micro: dec.iv_ask_28d_micro,
    })
  }

  toJSON(): MicrostructurePDAJSON {
    return {
      asset: this.asset,
      padding_0: this.padding_0,
      last_update_slot: this.last_update_slot.toString(),
      spot_micro: this.spot_micro.toString(),
      bid_ask_spread_bps: this.bid_ask_spread_bps,
      padding_1: this.padding_1,
      depth_100k_usd_micro: this.depth_100k_usd_micro.toString(),
      volume_24h_usd_micro: this.volume_24h_usd_micro.toString(),
      iv_bid_28d_micro: this.iv_bid_28d_micro.toString(),
      iv_ask_28d_micro: this.iv_ask_28d_micro.toString(),
    }
  }

  static fromJSON(obj: MicrostructurePDAJSON): MicrostructurePDA {
    return new MicrostructurePDA({
      asset: obj.asset,
      padding_0: obj.padding_0,
      last_update_slot: new BN(obj.last_update_slot),
      spot_micro: new BN(obj.spot_micro),
      bid_ask_spread_bps: obj.bid_ask_spread_bps,
      padding_1: obj.padding_1,
      depth_100k_usd_micro: new BN(obj.depth_100k_usd_micro),
      volume_24h_usd_micro: new BN(obj.volume_24h_usd_micro),
      iv_bid_28d_micro: new BN(obj.iv_bid_28d_micro),
      iv_ask_28d_micro: new BN(obj.iv_ask_28d_micro),
    })
  }
}
