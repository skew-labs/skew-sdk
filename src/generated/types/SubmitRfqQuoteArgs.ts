import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SubmitRfqQuoteArgsFields {
  premium_micro: BN
  maker_signature: Array<number>
  valid_until_slot: BN
}

export interface SubmitRfqQuoteArgsJSON {
  premium_micro: string
  maker_signature: Array<number>
  valid_until_slot: string
}

export class SubmitRfqQuoteArgs {
  readonly premium_micro: BN
  readonly maker_signature: Array<number>
  readonly valid_until_slot: BN

  constructor(fields: SubmitRfqQuoteArgsFields) {
    this.premium_micro = fields.premium_micro
    this.maker_signature = fields.maker_signature
    this.valid_until_slot = fields.valid_until_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("premium_micro"),
        borsh.array(borsh.u8(), 64, "maker_signature"),
        borsh.u64("valid_until_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SubmitRfqQuoteArgs({
      premium_micro: obj.premium_micro,
      maker_signature: obj.maker_signature,
      valid_until_slot: obj.valid_until_slot,
    })
  }

  static toEncodable(fields: SubmitRfqQuoteArgsFields) {
    return {
      premium_micro: fields.premium_micro,
      maker_signature: fields.maker_signature,
      valid_until_slot: fields.valid_until_slot,
    }
  }

  toJSON(): SubmitRfqQuoteArgsJSON {
    return {
      premium_micro: this.premium_micro.toString(),
      maker_signature: this.maker_signature,
      valid_until_slot: this.valid_until_slot.toString(),
    }
  }

  static fromJSON(obj: SubmitRfqQuoteArgsJSON): SubmitRfqQuoteArgs {
    return new SubmitRfqQuoteArgs({
      premium_micro: new BN(obj.premium_micro),
      maker_signature: obj.maker_signature,
      valid_until_slot: new BN(obj.valid_until_slot),
    })
  }

  toEncodable() {
    return SubmitRfqQuoteArgs.toEncodable(this)
  }
}
