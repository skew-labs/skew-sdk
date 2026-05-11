import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MicrostructureUpdatedFields {
  microstructure: PublicKey
  asset: number
  last_update_slot: BN
  spot_micro: BN
  bid_ask_spread_bps: number
  depth_100k_usd_micro: BN
  volume_24h_usd_micro: BN
  iv_bid_28d_micro: BN
  iv_ask_28d_micro: BN
}

export interface MicrostructureUpdatedJSON {
  microstructure: string
  asset: number
  last_update_slot: string
  spot_micro: string
  bid_ask_spread_bps: number
  depth_100k_usd_micro: string
  volume_24h_usd_micro: string
  iv_bid_28d_micro: string
  iv_ask_28d_micro: string
}

export class MicrostructureUpdated {
  readonly microstructure: PublicKey
  readonly asset: number
  readonly last_update_slot: BN
  readonly spot_micro: BN
  readonly bid_ask_spread_bps: number
  readonly depth_100k_usd_micro: BN
  readonly volume_24h_usd_micro: BN
  readonly iv_bid_28d_micro: BN
  readonly iv_ask_28d_micro: BN

  constructor(fields: MicrostructureUpdatedFields) {
    this.microstructure = fields.microstructure
    this.asset = fields.asset
    this.last_update_slot = fields.last_update_slot
    this.spot_micro = fields.spot_micro
    this.bid_ask_spread_bps = fields.bid_ask_spread_bps
    this.depth_100k_usd_micro = fields.depth_100k_usd_micro
    this.volume_24h_usd_micro = fields.volume_24h_usd_micro
    this.iv_bid_28d_micro = fields.iv_bid_28d_micro
    this.iv_ask_28d_micro = fields.iv_ask_28d_micro
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("microstructure"),
        borsh.u8("asset"),
        borsh.u64("last_update_slot"),
        borsh.u64("spot_micro"),
        borsh.u32("bid_ask_spread_bps"),
        borsh.u64("depth_100k_usd_micro"),
        borsh.u64("volume_24h_usd_micro"),
        borsh.u64("iv_bid_28d_micro"),
        borsh.u64("iv_ask_28d_micro"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MicrostructureUpdated({
      microstructure: obj.microstructure,
      asset: obj.asset,
      last_update_slot: obj.last_update_slot,
      spot_micro: obj.spot_micro,
      bid_ask_spread_bps: obj.bid_ask_spread_bps,
      depth_100k_usd_micro: obj.depth_100k_usd_micro,
      volume_24h_usd_micro: obj.volume_24h_usd_micro,
      iv_bid_28d_micro: obj.iv_bid_28d_micro,
      iv_ask_28d_micro: obj.iv_ask_28d_micro,
    })
  }

  static toEncodable(fields: MicrostructureUpdatedFields) {
    return {
      microstructure: fields.microstructure,
      asset: fields.asset,
      last_update_slot: fields.last_update_slot,
      spot_micro: fields.spot_micro,
      bid_ask_spread_bps: fields.bid_ask_spread_bps,
      depth_100k_usd_micro: fields.depth_100k_usd_micro,
      volume_24h_usd_micro: fields.volume_24h_usd_micro,
      iv_bid_28d_micro: fields.iv_bid_28d_micro,
      iv_ask_28d_micro: fields.iv_ask_28d_micro,
    }
  }

  toJSON(): MicrostructureUpdatedJSON {
    return {
      microstructure: this.microstructure.toString(),
      asset: this.asset,
      last_update_slot: this.last_update_slot.toString(),
      spot_micro: this.spot_micro.toString(),
      bid_ask_spread_bps: this.bid_ask_spread_bps,
      depth_100k_usd_micro: this.depth_100k_usd_micro.toString(),
      volume_24h_usd_micro: this.volume_24h_usd_micro.toString(),
      iv_bid_28d_micro: this.iv_bid_28d_micro.toString(),
      iv_ask_28d_micro: this.iv_ask_28d_micro.toString(),
    }
  }

  static fromJSON(obj: MicrostructureUpdatedJSON): MicrostructureUpdated {
    return new MicrostructureUpdated({
      microstructure: new PublicKey(obj.microstructure),
      asset: obj.asset,
      last_update_slot: new BN(obj.last_update_slot),
      spot_micro: new BN(obj.spot_micro),
      bid_ask_spread_bps: obj.bid_ask_spread_bps,
      depth_100k_usd_micro: new BN(obj.depth_100k_usd_micro),
      volume_24h_usd_micro: new BN(obj.volume_24h_usd_micro),
      iv_bid_28d_micro: new BN(obj.iv_bid_28d_micro),
      iv_ask_28d_micro: new BN(obj.iv_ask_28d_micro),
    })
  }

  toEncodable() {
    return MicrostructureUpdated.toEncodable(this)
  }
}
