import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IFDepositedFields {
  insurance_fund: PublicKey
  tier: types.IfTierKind
  amount: BN
  depositor: PublicKey
  is_sitg: boolean
  deposited_at: BN
}

export interface IFDepositedJSON {
  insurance_fund: string
  tier: types.IfTierJSON
  amount: string
  depositor: string
  is_sitg: boolean
  deposited_at: string
}

export class IFDeposited {
  readonly insurance_fund: PublicKey
  readonly tier: types.IfTierKind
  readonly amount: BN
  readonly depositor: PublicKey
  readonly is_sitg: boolean
  readonly deposited_at: BN

  constructor(fields: IFDepositedFields) {
    this.insurance_fund = fields.insurance_fund
    this.tier = fields.tier
    this.amount = fields.amount
    this.depositor = fields.depositor
    this.is_sitg = fields.is_sitg
    this.deposited_at = fields.deposited_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("insurance_fund"),
        types.IfTier.layout("tier"),
        borsh.u64("amount"),
        borsh.publicKey("depositor"),
        borsh.bool("is_sitg"),
        borsh.i64("deposited_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IFDeposited({
      insurance_fund: obj.insurance_fund,
      tier: types.IfTier.fromDecoded(obj.tier),
      amount: obj.amount,
      depositor: obj.depositor,
      is_sitg: obj.is_sitg,
      deposited_at: obj.deposited_at,
    })
  }

  static toEncodable(fields: IFDepositedFields) {
    return {
      insurance_fund: fields.insurance_fund,
      tier: fields.tier.toEncodable(),
      amount: fields.amount,
      depositor: fields.depositor,
      is_sitg: fields.is_sitg,
      deposited_at: fields.deposited_at,
    }
  }

  toJSON(): IFDepositedJSON {
    return {
      insurance_fund: this.insurance_fund.toString(),
      tier: this.tier.toJSON(),
      amount: this.amount.toString(),
      depositor: this.depositor.toString(),
      is_sitg: this.is_sitg,
      deposited_at: this.deposited_at.toString(),
    }
  }

  static fromJSON(obj: IFDepositedJSON): IFDeposited {
    return new IFDeposited({
      insurance_fund: new PublicKey(obj.insurance_fund),
      tier: types.IfTier.fromJSON(obj.tier),
      amount: new BN(obj.amount),
      depositor: new PublicKey(obj.depositor),
      is_sitg: obj.is_sitg,
      deposited_at: new BN(obj.deposited_at),
    })
  }

  toEncodable() {
    return IFDeposited.toEncodable(this)
  }
}
