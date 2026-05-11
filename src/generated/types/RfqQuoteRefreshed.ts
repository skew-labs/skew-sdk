import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqQuoteRefreshedFields {
  auction: PublicKey
  mm: PublicKey
  premium_micro: BN
  valid_until_slot: BN
  posted_slot: BN
}

export interface RfqQuoteRefreshedJSON {
  auction: string
  mm: string
  premium_micro: string
  valid_until_slot: string
  posted_slot: string
}

export class RfqQuoteRefreshed {
  readonly auction: PublicKey
  readonly mm: PublicKey
  readonly premium_micro: BN
  readonly valid_until_slot: BN
  readonly posted_slot: BN

  constructor(fields: RfqQuoteRefreshedFields) {
    this.auction = fields.auction
    this.mm = fields.mm
    this.premium_micro = fields.premium_micro
    this.valid_until_slot = fields.valid_until_slot
    this.posted_slot = fields.posted_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("auction"),
        borsh.publicKey("mm"),
        borsh.u64("premium_micro"),
        borsh.u64("valid_until_slot"),
        borsh.u64("posted_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqQuoteRefreshed({
      auction: obj.auction,
      mm: obj.mm,
      premium_micro: obj.premium_micro,
      valid_until_slot: obj.valid_until_slot,
      posted_slot: obj.posted_slot,
    })
  }

  static toEncodable(fields: RfqQuoteRefreshedFields) {
    return {
      auction: fields.auction,
      mm: fields.mm,
      premium_micro: fields.premium_micro,
      valid_until_slot: fields.valid_until_slot,
      posted_slot: fields.posted_slot,
    }
  }

  toJSON(): RfqQuoteRefreshedJSON {
    return {
      auction: this.auction.toString(),
      mm: this.mm.toString(),
      premium_micro: this.premium_micro.toString(),
      valid_until_slot: this.valid_until_slot.toString(),
      posted_slot: this.posted_slot.toString(),
    }
  }

  static fromJSON(obj: RfqQuoteRefreshedJSON): RfqQuoteRefreshed {
    return new RfqQuoteRefreshed({
      auction: new PublicKey(obj.auction),
      mm: new PublicKey(obj.mm),
      premium_micro: new BN(obj.premium_micro),
      valid_until_slot: new BN(obj.valid_until_slot),
      posted_slot: new BN(obj.posted_slot),
    })
  }

  toEncodable() {
    return RfqQuoteRefreshed.toEncodable(this)
  }
}
