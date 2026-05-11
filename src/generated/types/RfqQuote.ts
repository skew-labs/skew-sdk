import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqQuoteFields {
  mm: PublicKey
  premium_micro: BN
  maker_signature: Array<number>
  valid_until_slot: BN
  posted_slot: BN
}

export interface RfqQuoteJSON {
  mm: string
  premium_micro: string
  maker_signature: Array<number>
  valid_until_slot: string
  posted_slot: string
}

export class RfqQuote {
  readonly mm: PublicKey
  readonly premium_micro: BN
  readonly maker_signature: Array<number>
  readonly valid_until_slot: BN
  readonly posted_slot: BN

  constructor(fields: RfqQuoteFields) {
    this.mm = fields.mm
    this.premium_micro = fields.premium_micro
    this.maker_signature = fields.maker_signature
    this.valid_until_slot = fields.valid_until_slot
    this.posted_slot = fields.posted_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("mm"),
        borsh.u64("premium_micro"),
        borsh.array(borsh.u8(), 64, "maker_signature"),
        borsh.u64("valid_until_slot"),
        borsh.u64("posted_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqQuote({
      mm: obj.mm,
      premium_micro: obj.premium_micro,
      maker_signature: obj.maker_signature,
      valid_until_slot: obj.valid_until_slot,
      posted_slot: obj.posted_slot,
    })
  }

  static toEncodable(fields: RfqQuoteFields) {
    return {
      mm: fields.mm,
      premium_micro: fields.premium_micro,
      maker_signature: fields.maker_signature,
      valid_until_slot: fields.valid_until_slot,
      posted_slot: fields.posted_slot,
    }
  }

  toJSON(): RfqQuoteJSON {
    return {
      mm: this.mm.toString(),
      premium_micro: this.premium_micro.toString(),
      maker_signature: this.maker_signature,
      valid_until_slot: this.valid_until_slot.toString(),
      posted_slot: this.posted_slot.toString(),
    }
  }

  static fromJSON(obj: RfqQuoteJSON): RfqQuote {
    return new RfqQuote({
      mm: new PublicKey(obj.mm),
      premium_micro: new BN(obj.premium_micro),
      maker_signature: obj.maker_signature,
      valid_until_slot: new BN(obj.valid_until_slot),
      posted_slot: new BN(obj.posted_slot),
    })
  }

  toEncodable() {
    return RfqQuote.toEncodable(this)
  }
}
