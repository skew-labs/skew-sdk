import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IFReplenishedFromFeesFields {
  insurance_fund: PublicKey
  amount: BN
  new_tier3_balance: BN
  replenished_at: BN
}

export interface IFReplenishedFromFeesJSON {
  insurance_fund: string
  amount: string
  new_tier3_balance: string
  replenished_at: string
}

export class IFReplenishedFromFees {
  readonly insurance_fund: PublicKey
  readonly amount: BN
  readonly new_tier3_balance: BN
  readonly replenished_at: BN

  constructor(fields: IFReplenishedFromFeesFields) {
    this.insurance_fund = fields.insurance_fund
    this.amount = fields.amount
    this.new_tier3_balance = fields.new_tier3_balance
    this.replenished_at = fields.replenished_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("insurance_fund"),
        borsh.u64("amount"),
        borsh.u64("new_tier3_balance"),
        borsh.i64("replenished_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IFReplenishedFromFees({
      insurance_fund: obj.insurance_fund,
      amount: obj.amount,
      new_tier3_balance: obj.new_tier3_balance,
      replenished_at: obj.replenished_at,
    })
  }

  static toEncodable(fields: IFReplenishedFromFeesFields) {
    return {
      insurance_fund: fields.insurance_fund,
      amount: fields.amount,
      new_tier3_balance: fields.new_tier3_balance,
      replenished_at: fields.replenished_at,
    }
  }

  toJSON(): IFReplenishedFromFeesJSON {
    return {
      insurance_fund: this.insurance_fund.toString(),
      amount: this.amount.toString(),
      new_tier3_balance: this.new_tier3_balance.toString(),
      replenished_at: this.replenished_at.toString(),
    }
  }

  static fromJSON(obj: IFReplenishedFromFeesJSON): IFReplenishedFromFees {
    return new IFReplenishedFromFees({
      insurance_fund: new PublicKey(obj.insurance_fund),
      amount: new BN(obj.amount),
      new_tier3_balance: new BN(obj.new_tier3_balance),
      replenished_at: new BN(obj.replenished_at),
    })
  }

  toEncodable() {
    return IFReplenishedFromFees.toEncodable(this)
  }
}
