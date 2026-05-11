import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqAuctionCancelledFields {
  auction: PublicKey
  cancelled_by: string
  refund_micro: BN
  cancelled_at: BN
}

export interface RfqAuctionCancelledJSON {
  auction: string
  cancelled_by: string
  refund_micro: string
  cancelled_at: string
}

export class RfqAuctionCancelled {
  readonly auction: PublicKey
  readonly cancelled_by: string
  readonly refund_micro: BN
  readonly cancelled_at: BN

  constructor(fields: RfqAuctionCancelledFields) {
    this.auction = fields.auction
    this.cancelled_by = fields.cancelled_by
    this.refund_micro = fields.refund_micro
    this.cancelled_at = fields.cancelled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("auction"),
        borsh.str("cancelled_by"),
        borsh.u64("refund_micro"),
        borsh.i64("cancelled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqAuctionCancelled({
      auction: obj.auction,
      cancelled_by: obj.cancelled_by,
      refund_micro: obj.refund_micro,
      cancelled_at: obj.cancelled_at,
    })
  }

  static toEncodable(fields: RfqAuctionCancelledFields) {
    return {
      auction: fields.auction,
      cancelled_by: fields.cancelled_by,
      refund_micro: fields.refund_micro,
      cancelled_at: fields.cancelled_at,
    }
  }

  toJSON(): RfqAuctionCancelledJSON {
    return {
      auction: this.auction.toString(),
      cancelled_by: this.cancelled_by,
      refund_micro: this.refund_micro.toString(),
      cancelled_at: this.cancelled_at.toString(),
    }
  }

  static fromJSON(obj: RfqAuctionCancelledJSON): RfqAuctionCancelled {
    return new RfqAuctionCancelled({
      auction: new PublicKey(obj.auction),
      cancelled_by: obj.cancelled_by,
      refund_micro: new BN(obj.refund_micro),
      cancelled_at: new BN(obj.cancelled_at),
    })
  }

  toEncodable() {
    return RfqAuctionCancelled.toEncodable(this)
  }
}
