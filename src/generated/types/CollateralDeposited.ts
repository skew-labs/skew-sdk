import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollateralDepositedFields {
  option: PublicKey
  creator: PublicKey
  amount: BN
}

export interface CollateralDepositedJSON {
  option: string
  creator: string
  amount: string
}

export class CollateralDeposited {
  readonly option: PublicKey
  readonly creator: PublicKey
  readonly amount: BN

  constructor(fields: CollateralDepositedFields) {
    this.option = fields.option
    this.creator = fields.creator
    this.amount = fields.amount
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("creator"),
        borsh.u64("amount"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CollateralDeposited({
      option: obj.option,
      creator: obj.creator,
      amount: obj.amount,
    })
  }

  static toEncodable(fields: CollateralDepositedFields) {
    return {
      option: fields.option,
      creator: fields.creator,
      amount: fields.amount,
    }
  }

  toJSON(): CollateralDepositedJSON {
    return {
      option: this.option.toString(),
      creator: this.creator.toString(),
      amount: this.amount.toString(),
    }
  }

  static fromJSON(obj: CollateralDepositedJSON): CollateralDeposited {
    return new CollateralDeposited({
      option: new PublicKey(obj.option),
      creator: new PublicKey(obj.creator),
      amount: new BN(obj.amount),
    })
  }

  toEncodable() {
    return CollateralDeposited.toEncodable(this)
  }
}
