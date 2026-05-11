import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RfqAuctionPdaFields {
  auction_id: BN
  buyer: PublicKey
  option_spec: types.RfqOptionSpecFields
  max_premium_micro: BN
  auction_open_slot: BN
  auction_close_slot: BN
  best_quote: types.RfqQuoteFields
  state: number
  bump: number
  _padding_0: Array<number>
  created_at: BN
  is_block_trade: number
  block_minimum_size_micro: BN
  _reserved: Array<number>
}

export interface RfqAuctionPdaJSON {
  auction_id: string
  buyer: string
  option_spec: types.RfqOptionSpecJSON
  max_premium_micro: string
  auction_open_slot: string
  auction_close_slot: string
  best_quote: types.RfqQuoteJSON
  state: number
  bump: number
  _padding_0: Array<number>
  created_at: string
  is_block_trade: number
  block_minimum_size_micro: string
  _reserved: Array<number>
}

export class RfqAuctionPda {
  readonly auction_id: BN
  readonly buyer: PublicKey
  readonly option_spec: types.RfqOptionSpec
  readonly max_premium_micro: BN
  readonly auction_open_slot: BN
  readonly auction_close_slot: BN
  readonly best_quote: types.RfqQuote
  readonly state: number
  readonly bump: number
  readonly _padding_0: Array<number>
  readonly created_at: BN
  readonly is_block_trade: number
  readonly block_minimum_size_micro: BN
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    126, 144, 41, 183, 184, 86, 59, 68,
  ])

  static readonly layout = borsh.struct([
    borsh.u64("auction_id"),
    borsh.publicKey("buyer"),
    types.RfqOptionSpec.layout("option_spec"),
    borsh.u64("max_premium_micro"),
    borsh.u64("auction_open_slot"),
    borsh.u64("auction_close_slot"),
    types.RfqQuote.layout("best_quote"),
    borsh.u8("state"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_padding_0"),
    borsh.i64("created_at"),
    borsh.u8("is_block_trade"),
    borsh.u64("block_minimum_size_micro"),
    borsh.array(borsh.u8(), 55, "_reserved"),
  ])

  constructor(fields: RfqAuctionPdaFields) {
    this.auction_id = fields.auction_id
    this.buyer = fields.buyer
    this.option_spec = new types.RfqOptionSpec({ ...fields.option_spec })
    this.max_premium_micro = fields.max_premium_micro
    this.auction_open_slot = fields.auction_open_slot
    this.auction_close_slot = fields.auction_close_slot
    this.best_quote = new types.RfqQuote({ ...fields.best_quote })
    this.state = fields.state
    this.bump = fields.bump
    this._padding_0 = fields._padding_0
    this.created_at = fields.created_at
    this.is_block_trade = fields.is_block_trade
    this.block_minimum_size_micro = fields.block_minimum_size_micro
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<RfqAuctionPda | null> {
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
  ): Promise<Array<RfqAuctionPda | null>> {
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

  static decode(data: Buffer): RfqAuctionPda {
    if (!data.slice(0, 8).equals(RfqAuctionPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = RfqAuctionPda.layout.decode(data.slice(8))

    return new RfqAuctionPda({
      auction_id: dec.auction_id,
      buyer: dec.buyer,
      option_spec: types.RfqOptionSpec.fromDecoded(dec.option_spec),
      max_premium_micro: dec.max_premium_micro,
      auction_open_slot: dec.auction_open_slot,
      auction_close_slot: dec.auction_close_slot,
      best_quote: types.RfqQuote.fromDecoded(dec.best_quote),
      state: dec.state,
      bump: dec.bump,
      _padding_0: dec._padding_0,
      created_at: dec.created_at,
      is_block_trade: dec.is_block_trade,
      block_minimum_size_micro: dec.block_minimum_size_micro,
      _reserved: dec._reserved,
    })
  }

  toJSON(): RfqAuctionPdaJSON {
    return {
      auction_id: this.auction_id.toString(),
      buyer: this.buyer.toString(),
      option_spec: this.option_spec.toJSON(),
      max_premium_micro: this.max_premium_micro.toString(),
      auction_open_slot: this.auction_open_slot.toString(),
      auction_close_slot: this.auction_close_slot.toString(),
      best_quote: this.best_quote.toJSON(),
      state: this.state,
      bump: this.bump,
      _padding_0: this._padding_0,
      created_at: this.created_at.toString(),
      is_block_trade: this.is_block_trade,
      block_minimum_size_micro: this.block_minimum_size_micro.toString(),
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: RfqAuctionPdaJSON): RfqAuctionPda {
    return new RfqAuctionPda({
      auction_id: new BN(obj.auction_id),
      buyer: new PublicKey(obj.buyer),
      option_spec: types.RfqOptionSpec.fromJSON(obj.option_spec),
      max_premium_micro: new BN(obj.max_premium_micro),
      auction_open_slot: new BN(obj.auction_open_slot),
      auction_close_slot: new BN(obj.auction_close_slot),
      best_quote: types.RfqQuote.fromJSON(obj.best_quote),
      state: obj.state,
      bump: obj.bump,
      _padding_0: obj._padding_0,
      created_at: new BN(obj.created_at),
      is_block_trade: obj.is_block_trade,
      block_minimum_size_micro: new BN(obj.block_minimum_size_micro),
      _reserved: obj._reserved,
    })
  }
}
