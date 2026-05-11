import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NativeSolCollateralWithdrawnFields {
  vault: PublicKey
  user: PublicKey
  amount: BN
  new_sol_qty: BN
  withdrawn_at: BN
}

export interface NativeSolCollateralWithdrawnJSON {
  vault: string
  user: string
  amount: string
  new_sol_qty: string
  withdrawn_at: string
}

export class NativeSolCollateralWithdrawn {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly amount: BN
  readonly new_sol_qty: BN
  readonly withdrawn_at: BN

  constructor(fields: NativeSolCollateralWithdrawnFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.amount = fields.amount
    this.new_sol_qty = fields.new_sol_qty
    this.withdrawn_at = fields.withdrawn_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.u64("amount"),
        borsh.u64("new_sol_qty"),
        borsh.i64("withdrawn_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new NativeSolCollateralWithdrawn({
      vault: obj.vault,
      user: obj.user,
      amount: obj.amount,
      new_sol_qty: obj.new_sol_qty,
      withdrawn_at: obj.withdrawn_at,
    })
  }

  static toEncodable(fields: NativeSolCollateralWithdrawnFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      amount: fields.amount,
      new_sol_qty: fields.new_sol_qty,
      withdrawn_at: fields.withdrawn_at,
    }
  }

  toJSON(): NativeSolCollateralWithdrawnJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      amount: this.amount.toString(),
      new_sol_qty: this.new_sol_qty.toString(),
      withdrawn_at: this.withdrawn_at.toString(),
    }
  }

  static fromJSON(
    obj: NativeSolCollateralWithdrawnJSON
  ): NativeSolCollateralWithdrawn {
    return new NativeSolCollateralWithdrawn({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      amount: new BN(obj.amount),
      new_sol_qty: new BN(obj.new_sol_qty),
      withdrawn_at: new BN(obj.withdrawn_at),
    })
  }

  toEncodable() {
    return NativeSolCollateralWithdrawn.toEncodable(this)
  }
}
