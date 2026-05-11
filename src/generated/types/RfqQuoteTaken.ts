import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqQuoteTakenFields {
  auction: PublicKey
  buyer: PublicKey
  mm: PublicKey
  premium_micro: BN
  refund_to_buyer_micro: BN
  slot: BN
  taken_at: BN
}

export interface RfqQuoteTakenJSON {
  auction: string
  buyer: string
  mm: string
  premium_micro: string
  refund_to_buyer_micro: string
  slot: string
  taken_at: string
}

export class RfqQuoteTaken {
  readonly auction: PublicKey
  readonly buyer: PublicKey
  readonly mm: PublicKey
  readonly premium_micro: BN
  readonly refund_to_buyer_micro: BN
  readonly slot: BN
  readonly taken_at: BN

  constructor(fields: RfqQuoteTakenFields) {
    this.auction = fields.auction
    this.buyer = fields.buyer
    this.mm = fields.mm
    this.premium_micro = fields.premium_micro
    this.refund_to_buyer_micro = fields.refund_to_buyer_micro
    this.slot = fields.slot
    this.taken_at = fields.taken_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("auction"),
        borsh.publicKey("buyer"),
        borsh.publicKey("mm"),
        borsh.u64("premium_micro"),
        borsh.u64("refund_to_buyer_micro"),
        borsh.u64("slot"),
        borsh.i64("taken_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqQuoteTaken({
      auction: obj.auction,
      buyer: obj.buyer,
      mm: obj.mm,
      premium_micro: obj.premium_micro,
      refund_to_buyer_micro: obj.refund_to_buyer_micro,
      slot: obj.slot,
      taken_at: obj.taken_at,
    })
  }

  static toEncodable(fields: RfqQuoteTakenFields) {
    return {
      auction: fields.auction,
      buyer: fields.buyer,
      mm: fields.mm,
      premium_micro: fields.premium_micro,
      refund_to_buyer_micro: fields.refund_to_buyer_micro,
      slot: fields.slot,
      taken_at: fields.taken_at,
    }
  }

  toJSON(): RfqQuoteTakenJSON {
    return {
      auction: this.auction.toString(),
      buyer: this.buyer.toString(),
      mm: this.mm.toString(),
      premium_micro: this.premium_micro.toString(),
      refund_to_buyer_micro: this.refund_to_buyer_micro.toString(),
      slot: this.slot.toString(),
      taken_at: this.taken_at.toString(),
    }
  }

  static fromJSON(obj: RfqQuoteTakenJSON): RfqQuoteTaken {
    return new RfqQuoteTaken({
      auction: new PublicKey(obj.auction),
      buyer: new PublicKey(obj.buyer),
      mm: new PublicKey(obj.mm),
      premium_micro: new BN(obj.premium_micro),
      refund_to_buyer_micro: new BN(obj.refund_to_buyer_micro),
      slot: new BN(obj.slot),
      taken_at: new BN(obj.taken_at),
    })
  }

  toEncodable() {
    return RfqQuoteTaken.toEncodable(this)
  }
}
