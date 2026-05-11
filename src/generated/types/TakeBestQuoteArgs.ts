import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TakeBestQuoteArgsFields {
  expected_premium_micro: BN
}

export interface TakeBestQuoteArgsJSON {
  expected_premium_micro: string
}

export class TakeBestQuoteArgs {
  readonly expected_premium_micro: BN

  constructor(fields: TakeBestQuoteArgsFields) {
    this.expected_premium_micro = fields.expected_premium_micro
  }

  static layout(property?: string) {
    return borsh.struct([borsh.u64("expected_premium_micro")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TakeBestQuoteArgs({
      expected_premium_micro: obj.expected_premium_micro,
    })
  }

  static toEncodable(fields: TakeBestQuoteArgsFields) {
    return {
      expected_premium_micro: fields.expected_premium_micro,
    }
  }

  toJSON(): TakeBestQuoteArgsJSON {
    return {
      expected_premium_micro: this.expected_premium_micro.toString(),
    }
  }

  static fromJSON(obj: TakeBestQuoteArgsJSON): TakeBestQuoteArgs {
    return new TakeBestQuoteArgs({
      expected_premium_micro: new BN(obj.expected_premium_micro),
    })
  }

  toEncodable() {
    return TakeBestQuoteArgs.toEncodable(this)
  }
}
