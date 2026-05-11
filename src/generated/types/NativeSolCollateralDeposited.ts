import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NativeSolCollateralDepositedFields {
  vault: PublicKey
  user: PublicKey
  amount: BN
  new_sol_qty: BN
  deposited_at: BN
}

export interface NativeSolCollateralDepositedJSON {
  vault: string
  user: string
  amount: string
  new_sol_qty: string
  deposited_at: string
}

export class NativeSolCollateralDeposited {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly amount: BN
  readonly new_sol_qty: BN
  readonly deposited_at: BN

  constructor(fields: NativeSolCollateralDepositedFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.amount = fields.amount
    this.new_sol_qty = fields.new_sol_qty
    this.deposited_at = fields.deposited_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.u64("amount"),
        borsh.u64("new_sol_qty"),
        borsh.i64("deposited_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new NativeSolCollateralDeposited({
      vault: obj.vault,
      user: obj.user,
      amount: obj.amount,
      new_sol_qty: obj.new_sol_qty,
      deposited_at: obj.deposited_at,
    })
  }

  static toEncodable(fields: NativeSolCollateralDepositedFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      amount: fields.amount,
      new_sol_qty: fields.new_sol_qty,
      deposited_at: fields.deposited_at,
    }
  }

  toJSON(): NativeSolCollateralDepositedJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      amount: this.amount.toString(),
      new_sol_qty: this.new_sol_qty.toString(),
      deposited_at: this.deposited_at.toString(),
    }
  }

  static fromJSON(
    obj: NativeSolCollateralDepositedJSON
  ): NativeSolCollateralDeposited {
    return new NativeSolCollateralDeposited({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      amount: new BN(obj.amount),
      new_sol_qty: new BN(obj.new_sol_qty),
      deposited_at: new BN(obj.deposited_at),
    })
  }

  toEncodable() {
    return NativeSolCollateralDeposited.toEncodable(this)
  }
}
