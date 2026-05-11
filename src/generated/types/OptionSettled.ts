import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionSettledFields {
  option: PublicKey
  settled_price: BN
  payoff_to_holder: boolean
  collateral: BN
  settled_at: BN
}

export interface OptionSettledJSON {
  option: string
  settled_price: string
  payoff_to_holder: boolean
  collateral: string
  settled_at: string
}

export class OptionSettled {
  readonly option: PublicKey
  readonly settled_price: BN
  readonly payoff_to_holder: boolean
  readonly collateral: BN
  readonly settled_at: BN

  constructor(fields: OptionSettledFields) {
    this.option = fields.option
    this.settled_price = fields.settled_price
    this.payoff_to_holder = fields.payoff_to_holder
    this.collateral = fields.collateral
    this.settled_at = fields.settled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.i64("settled_price"),
        borsh.bool("payoff_to_holder"),
        borsh.u64("collateral"),
        borsh.i64("settled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionSettled({
      option: obj.option,
      settled_price: obj.settled_price,
      payoff_to_holder: obj.payoff_to_holder,
      collateral: obj.collateral,
      settled_at: obj.settled_at,
    })
  }

  static toEncodable(fields: OptionSettledFields) {
    return {
      option: fields.option,
      settled_price: fields.settled_price,
      payoff_to_holder: fields.payoff_to_holder,
      collateral: fields.collateral,
      settled_at: fields.settled_at,
    }
  }

  toJSON(): OptionSettledJSON {
    return {
      option: this.option.toString(),
      settled_price: this.settled_price.toString(),
      payoff_to_holder: this.payoff_to_holder,
      collateral: this.collateral.toString(),
      settled_at: this.settled_at.toString(),
    }
  }

  static fromJSON(obj: OptionSettledJSON): OptionSettled {
    return new OptionSettled({
      option: new PublicKey(obj.option),
      settled_price: new BN(obj.settled_price),
      payoff_to_holder: obj.payoff_to_holder,
      collateral: new BN(obj.collateral),
      settled_at: new BN(obj.settled_at),
    })
  }

  toEncodable() {
    return OptionSettled.toEncodable(this)
  }
}
