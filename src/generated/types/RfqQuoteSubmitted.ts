import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqQuoteSubmittedFields {
  auction: PublicKey
  mm: PublicKey
  premium_micro: BN
  valid_until_slot: BN
  posted_slot: BN
  is_new_best: boolean
}

export interface RfqQuoteSubmittedJSON {
  auction: string
  mm: string
  premium_micro: string
  valid_until_slot: string
  posted_slot: string
  is_new_best: boolean
}

export class RfqQuoteSubmitted {
  readonly auction: PublicKey
  readonly mm: PublicKey
  readonly premium_micro: BN
  readonly valid_until_slot: BN
  readonly posted_slot: BN
  readonly is_new_best: boolean

  constructor(fields: RfqQuoteSubmittedFields) {
    this.auction = fields.auction
    this.mm = fields.mm
    this.premium_micro = fields.premium_micro
    this.valid_until_slot = fields.valid_until_slot
    this.posted_slot = fields.posted_slot
    this.is_new_best = fields.is_new_best
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("auction"),
        borsh.publicKey("mm"),
        borsh.u64("premium_micro"),
        borsh.u64("valid_until_slot"),
        borsh.u64("posted_slot"),
        borsh.bool("is_new_best"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqQuoteSubmitted({
      auction: obj.auction,
      mm: obj.mm,
      premium_micro: obj.premium_micro,
      valid_until_slot: obj.valid_until_slot,
      posted_slot: obj.posted_slot,
      is_new_best: obj.is_new_best,
    })
  }

  static toEncodable(fields: RfqQuoteSubmittedFields) {
    return {
      auction: fields.auction,
      mm: fields.mm,
      premium_micro: fields.premium_micro,
      valid_until_slot: fields.valid_until_slot,
      posted_slot: fields.posted_slot,
      is_new_best: fields.is_new_best,
    }
  }

  toJSON(): RfqQuoteSubmittedJSON {
    return {
      auction: this.auction.toString(),
      mm: this.mm.toString(),
      premium_micro: this.premium_micro.toString(),
      valid_until_slot: this.valid_until_slot.toString(),
      posted_slot: this.posted_slot.toString(),
      is_new_best: this.is_new_best,
    }
  }

  static fromJSON(obj: RfqQuoteSubmittedJSON): RfqQuoteSubmitted {
    return new RfqQuoteSubmitted({
      auction: new PublicKey(obj.auction),
      mm: new PublicKey(obj.mm),
      premium_micro: new BN(obj.premium_micro),
      valid_until_slot: new BN(obj.valid_until_slot),
      posted_slot: new BN(obj.posted_slot),
      is_new_best: obj.is_new_best,
    })
  }

  toEncodable() {
    return RfqQuoteSubmitted.toEncodable(this)
  }
}
