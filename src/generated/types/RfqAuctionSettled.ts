import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqAuctionSettledFields {
  auction: PublicKey
  winner_mm: PublicKey
  winning_premium_micro: BN
  refund_to_buyer_micro: BN
  settled_at: BN
}

export interface RfqAuctionSettledJSON {
  auction: string
  winner_mm: string
  winning_premium_micro: string
  refund_to_buyer_micro: string
  settled_at: string
}

export class RfqAuctionSettled {
  readonly auction: PublicKey
  readonly winner_mm: PublicKey
  readonly winning_premium_micro: BN
  readonly refund_to_buyer_micro: BN
  readonly settled_at: BN

  constructor(fields: RfqAuctionSettledFields) {
    this.auction = fields.auction
    this.winner_mm = fields.winner_mm
    this.winning_premium_micro = fields.winning_premium_micro
    this.refund_to_buyer_micro = fields.refund_to_buyer_micro
    this.settled_at = fields.settled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("auction"),
        borsh.publicKey("winner_mm"),
        borsh.u64("winning_premium_micro"),
        borsh.u64("refund_to_buyer_micro"),
        borsh.i64("settled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqAuctionSettled({
      auction: obj.auction,
      winner_mm: obj.winner_mm,
      winning_premium_micro: obj.winning_premium_micro,
      refund_to_buyer_micro: obj.refund_to_buyer_micro,
      settled_at: obj.settled_at,
    })
  }

  static toEncodable(fields: RfqAuctionSettledFields) {
    return {
      auction: fields.auction,
      winner_mm: fields.winner_mm,
      winning_premium_micro: fields.winning_premium_micro,
      refund_to_buyer_micro: fields.refund_to_buyer_micro,
      settled_at: fields.settled_at,
    }
  }

  toJSON(): RfqAuctionSettledJSON {
    return {
      auction: this.auction.toString(),
      winner_mm: this.winner_mm.toString(),
      winning_premium_micro: this.winning_premium_micro.toString(),
      refund_to_buyer_micro: this.refund_to_buyer_micro.toString(),
      settled_at: this.settled_at.toString(),
    }
  }

  static fromJSON(obj: RfqAuctionSettledJSON): RfqAuctionSettled {
    return new RfqAuctionSettled({
      auction: new PublicKey(obj.auction),
      winner_mm: new PublicKey(obj.winner_mm),
      winning_premium_micro: new BN(obj.winning_premium_micro),
      refund_to_buyer_micro: new BN(obj.refund_to_buyer_micro),
      settled_at: new BN(obj.settled_at),
    })
  }

  toEncodable() {
    return RfqAuctionSettled.toEncodable(this)
  }
}
