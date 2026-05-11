import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqAuctionRegisteredFields {
  auction: PublicKey
  auction_id: BN
  buyer: PublicKey
  asset: number
  strike_micro: BN
  expiry_ts: BN
  option_type: number
  payoff_amount_micro: BN
  max_premium_micro: BN
  auction_open_slot: BN
  auction_close_slot: BN
  registered_at: BN
}

export interface RfqAuctionRegisteredJSON {
  auction: string
  auction_id: string
  buyer: string
  asset: number
  strike_micro: string
  expiry_ts: string
  option_type: number
  payoff_amount_micro: string
  max_premium_micro: string
  auction_open_slot: string
  auction_close_slot: string
  registered_at: string
}

export class RfqAuctionRegistered {
  readonly auction: PublicKey
  readonly auction_id: BN
  readonly buyer: PublicKey
  readonly asset: number
  readonly strike_micro: BN
  readonly expiry_ts: BN
  readonly option_type: number
  readonly payoff_amount_micro: BN
  readonly max_premium_micro: BN
  readonly auction_open_slot: BN
  readonly auction_close_slot: BN
  readonly registered_at: BN

  constructor(fields: RfqAuctionRegisteredFields) {
    this.auction = fields.auction
    this.auction_id = fields.auction_id
    this.buyer = fields.buyer
    this.asset = fields.asset
    this.strike_micro = fields.strike_micro
    this.expiry_ts = fields.expiry_ts
    this.option_type = fields.option_type
    this.payoff_amount_micro = fields.payoff_amount_micro
    this.max_premium_micro = fields.max_premium_micro
    this.auction_open_slot = fields.auction_open_slot
    this.auction_close_slot = fields.auction_close_slot
    this.registered_at = fields.registered_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("auction"),
        borsh.u64("auction_id"),
        borsh.publicKey("buyer"),
        borsh.u8("asset"),
        borsh.u64("strike_micro"),
        borsh.i64("expiry_ts"),
        borsh.u8("option_type"),
        borsh.u64("payoff_amount_micro"),
        borsh.u64("max_premium_micro"),
        borsh.u64("auction_open_slot"),
        borsh.u64("auction_close_slot"),
        borsh.i64("registered_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqAuctionRegistered({
      auction: obj.auction,
      auction_id: obj.auction_id,
      buyer: obj.buyer,
      asset: obj.asset,
      strike_micro: obj.strike_micro,
      expiry_ts: obj.expiry_ts,
      option_type: obj.option_type,
      payoff_amount_micro: obj.payoff_amount_micro,
      max_premium_micro: obj.max_premium_micro,
      auction_open_slot: obj.auction_open_slot,
      auction_close_slot: obj.auction_close_slot,
      registered_at: obj.registered_at,
    })
  }

  static toEncodable(fields: RfqAuctionRegisteredFields) {
    return {
      auction: fields.auction,
      auction_id: fields.auction_id,
      buyer: fields.buyer,
      asset: fields.asset,
      strike_micro: fields.strike_micro,
      expiry_ts: fields.expiry_ts,
      option_type: fields.option_type,
      payoff_amount_micro: fields.payoff_amount_micro,
      max_premium_micro: fields.max_premium_micro,
      auction_open_slot: fields.auction_open_slot,
      auction_close_slot: fields.auction_close_slot,
      registered_at: fields.registered_at,
    }
  }

  toJSON(): RfqAuctionRegisteredJSON {
    return {
      auction: this.auction.toString(),
      auction_id: this.auction_id.toString(),
      buyer: this.buyer.toString(),
      asset: this.asset,
      strike_micro: this.strike_micro.toString(),
      expiry_ts: this.expiry_ts.toString(),
      option_type: this.option_type,
      payoff_amount_micro: this.payoff_amount_micro.toString(),
      max_premium_micro: this.max_premium_micro.toString(),
      auction_open_slot: this.auction_open_slot.toString(),
      auction_close_slot: this.auction_close_slot.toString(),
      registered_at: this.registered_at.toString(),
    }
  }

  static fromJSON(obj: RfqAuctionRegisteredJSON): RfqAuctionRegistered {
    return new RfqAuctionRegistered({
      auction: new PublicKey(obj.auction),
      auction_id: new BN(obj.auction_id),
      buyer: new PublicKey(obj.buyer),
      asset: obj.asset,
      strike_micro: new BN(obj.strike_micro),
      expiry_ts: new BN(obj.expiry_ts),
      option_type: obj.option_type,
      payoff_amount_micro: new BN(obj.payoff_amount_micro),
      max_premium_micro: new BN(obj.max_premium_micro),
      auction_open_slot: new BN(obj.auction_open_slot),
      auction_close_slot: new BN(obj.auction_close_slot),
      registered_at: new BN(obj.registered_at),
    })
  }

  toEncodable() {
    return RfqAuctionRegistered.toEncodable(this)
  }
}
