import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SubmitRfqQuoteTxSignedArgsFields {
  premium_micro: BN
  valid_until_slot: BN
}

export interface SubmitRfqQuoteTxSignedArgsJSON {
  premium_micro: string
  valid_until_slot: string
}

export class SubmitRfqQuoteTxSignedArgs {
  readonly premium_micro: BN
  readonly valid_until_slot: BN

  constructor(fields: SubmitRfqQuoteTxSignedArgsFields) {
    this.premium_micro = fields.premium_micro
    this.valid_until_slot = fields.valid_until_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u64("premium_micro"), borsh.u64("valid_until_slot")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SubmitRfqQuoteTxSignedArgs({
      premium_micro: obj.premium_micro,
      valid_until_slot: obj.valid_until_slot,
    })
  }

  static toEncodable(fields: SubmitRfqQuoteTxSignedArgsFields) {
    return {
      premium_micro: fields.premium_micro,
      valid_until_slot: fields.valid_until_slot,
    }
  }

  toJSON(): SubmitRfqQuoteTxSignedArgsJSON {
    return {
      premium_micro: this.premium_micro.toString(),
      valid_until_slot: this.valid_until_slot.toString(),
    }
  }

  static fromJSON(
    obj: SubmitRfqQuoteTxSignedArgsJSON
  ): SubmitRfqQuoteTxSignedArgs {
    return new SubmitRfqQuoteTxSignedArgs({
      premium_micro: new BN(obj.premium_micro),
      valid_until_slot: new BN(obj.valid_until_slot),
    })
  }

  toEncodable() {
    return SubmitRfqQuoteTxSignedArgs.toEncodable(this)
  }
}
