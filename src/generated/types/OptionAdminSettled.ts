import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionAdminSettledFields {
  option: PublicKey
  admin_price: BN
  payoff_to_holder: boolean
  collateral: BN
  settled_at: BN
}

export interface OptionAdminSettledJSON {
  option: string
  admin_price: string
  payoff_to_holder: boolean
  collateral: string
  settled_at: string
}

export class OptionAdminSettled {
  readonly option: PublicKey
  readonly admin_price: BN
  readonly payoff_to_holder: boolean
  readonly collateral: BN
  readonly settled_at: BN

  constructor(fields: OptionAdminSettledFields) {
    this.option = fields.option
    this.admin_price = fields.admin_price
    this.payoff_to_holder = fields.payoff_to_holder
    this.collateral = fields.collateral
    this.settled_at = fields.settled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.i64("admin_price"),
        borsh.bool("payoff_to_holder"),
        borsh.u64("collateral"),
        borsh.i64("settled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionAdminSettled({
      option: obj.option,
      admin_price: obj.admin_price,
      payoff_to_holder: obj.payoff_to_holder,
      collateral: obj.collateral,
      settled_at: obj.settled_at,
    })
  }

  static toEncodable(fields: OptionAdminSettledFields) {
    return {
      option: fields.option,
      admin_price: fields.admin_price,
      payoff_to_holder: fields.payoff_to_holder,
      collateral: fields.collateral,
      settled_at: fields.settled_at,
    }
  }

  toJSON(): OptionAdminSettledJSON {
    return {
      option: this.option.toString(),
      admin_price: this.admin_price.toString(),
      payoff_to_holder: this.payoff_to_holder,
      collateral: this.collateral.toString(),
      settled_at: this.settled_at.toString(),
    }
  }

  static fromJSON(obj: OptionAdminSettledJSON): OptionAdminSettled {
    return new OptionAdminSettled({
      option: new PublicKey(obj.option),
      admin_price: new BN(obj.admin_price),
      payoff_to_holder: obj.payoff_to_holder,
      collateral: new BN(obj.collateral),
      settled_at: new BN(obj.settled_at),
    })
  }

  toEncodable() {
    return OptionAdminSettled.toEncodable(this)
  }
}
