import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface AdlExecutedFields {
  insurance_fund: PublicKey
  winner_cm: PublicKey
  drain_amount: BN
  remaining_target: BN
  executed_at: BN
}

export interface AdlExecutedJSON {
  insurance_fund: string
  winner_cm: string
  drain_amount: string
  remaining_target: string
  executed_at: string
}

export class AdlExecuted {
  readonly insurance_fund: PublicKey
  readonly winner_cm: PublicKey
  readonly drain_amount: BN
  readonly remaining_target: BN
  readonly executed_at: BN

  constructor(fields: AdlExecutedFields) {
    this.insurance_fund = fields.insurance_fund
    this.winner_cm = fields.winner_cm
    this.drain_amount = fields.drain_amount
    this.remaining_target = fields.remaining_target
    this.executed_at = fields.executed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("insurance_fund"),
        borsh.publicKey("winner_cm"),
        borsh.u64("drain_amount"),
        borsh.u64("remaining_target"),
        borsh.i64("executed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new AdlExecuted({
      insurance_fund: obj.insurance_fund,
      winner_cm: obj.winner_cm,
      drain_amount: obj.drain_amount,
      remaining_target: obj.remaining_target,
      executed_at: obj.executed_at,
    })
  }

  static toEncodable(fields: AdlExecutedFields) {
    return {
      insurance_fund: fields.insurance_fund,
      winner_cm: fields.winner_cm,
      drain_amount: fields.drain_amount,
      remaining_target: fields.remaining_target,
      executed_at: fields.executed_at,
    }
  }

  toJSON(): AdlExecutedJSON {
    return {
      insurance_fund: this.insurance_fund.toString(),
      winner_cm: this.winner_cm.toString(),
      drain_amount: this.drain_amount.toString(),
      remaining_target: this.remaining_target.toString(),
      executed_at: this.executed_at.toString(),
    }
  }

  static fromJSON(obj: AdlExecutedJSON): AdlExecuted {
    return new AdlExecuted({
      insurance_fund: new PublicKey(obj.insurance_fund),
      winner_cm: new PublicKey(obj.winner_cm),
      drain_amount: new BN(obj.drain_amount),
      remaining_target: new BN(obj.remaining_target),
      executed_at: new BN(obj.executed_at),
    })
  }

  toEncodable() {
    return AdlExecuted.toEncodable(this)
  }
}
