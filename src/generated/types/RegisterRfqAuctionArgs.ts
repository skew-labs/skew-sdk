import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterRfqAuctionArgsFields {
  auction_id: BN
  option_spec: types.RfqOptionSpecFields
  max_premium_micro: BN
  duration_slots: BN
  is_block_trade: boolean
  minimum_size_micro: BN
  eligible_maker_count: number
}

export interface RegisterRfqAuctionArgsJSON {
  auction_id: string
  option_spec: types.RfqOptionSpecJSON
  max_premium_micro: string
  duration_slots: string
  is_block_trade: boolean
  minimum_size_micro: string
  eligible_maker_count: number
}

export class RegisterRfqAuctionArgs {
  readonly auction_id: BN
  readonly option_spec: types.RfqOptionSpec
  readonly max_premium_micro: BN
  readonly duration_slots: BN
  readonly is_block_trade: boolean
  readonly minimum_size_micro: BN
  readonly eligible_maker_count: number

  constructor(fields: RegisterRfqAuctionArgsFields) {
    this.auction_id = fields.auction_id
    this.option_spec = new types.RfqOptionSpec({ ...fields.option_spec })
    this.max_premium_micro = fields.max_premium_micro
    this.duration_slots = fields.duration_slots
    this.is_block_trade = fields.is_block_trade
    this.minimum_size_micro = fields.minimum_size_micro
    this.eligible_maker_count = fields.eligible_maker_count
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("auction_id"),
        types.RfqOptionSpec.layout("option_spec"),
        borsh.u64("max_premium_micro"),
        borsh.u64("duration_slots"),
        borsh.bool("is_block_trade"),
        borsh.u64("minimum_size_micro"),
        borsh.u8("eligible_maker_count"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterRfqAuctionArgs({
      auction_id: obj.auction_id,
      option_spec: types.RfqOptionSpec.fromDecoded(obj.option_spec),
      max_premium_micro: obj.max_premium_micro,
      duration_slots: obj.duration_slots,
      is_block_trade: obj.is_block_trade,
      minimum_size_micro: obj.minimum_size_micro,
      eligible_maker_count: obj.eligible_maker_count,
    })
  }

  static toEncodable(fields: RegisterRfqAuctionArgsFields) {
    return {
      auction_id: fields.auction_id,
      option_spec: types.RfqOptionSpec.toEncodable(fields.option_spec),
      max_premium_micro: fields.max_premium_micro,
      duration_slots: fields.duration_slots,
      is_block_trade: fields.is_block_trade,
      minimum_size_micro: fields.minimum_size_micro,
      eligible_maker_count: fields.eligible_maker_count,
    }
  }

  toJSON(): RegisterRfqAuctionArgsJSON {
    return {
      auction_id: this.auction_id.toString(),
      option_spec: this.option_spec.toJSON(),
      max_premium_micro: this.max_premium_micro.toString(),
      duration_slots: this.duration_slots.toString(),
      is_block_trade: this.is_block_trade,
      minimum_size_micro: this.minimum_size_micro.toString(),
      eligible_maker_count: this.eligible_maker_count,
    }
  }

  static fromJSON(obj: RegisterRfqAuctionArgsJSON): RegisterRfqAuctionArgs {
    return new RegisterRfqAuctionArgs({
      auction_id: new BN(obj.auction_id),
      option_spec: types.RfqOptionSpec.fromJSON(obj.option_spec),
      max_premium_micro: new BN(obj.max_premium_micro),
      duration_slots: new BN(obj.duration_slots),
      is_block_trade: obj.is_block_trade,
      minimum_size_micro: new BN(obj.minimum_size_micro),
      eligible_maker_count: obj.eligible_maker_count,
    })
  }

  toEncodable() {
    return RegisterRfqAuctionArgs.toEncodable(this)
  }
}
