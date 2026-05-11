import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LstCollateralWithdrawnFields {
  vault: PublicKey
  user: PublicKey
  lst_mint: PublicKey
  amount: BN
  new_lst_qty: BN
  withdrawn_at: BN
}

export interface LstCollateralWithdrawnJSON {
  vault: string
  user: string
  lst_mint: string
  amount: string
  new_lst_qty: string
  withdrawn_at: string
}

export class LstCollateralWithdrawn {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly lst_mint: PublicKey
  readonly amount: BN
  readonly new_lst_qty: BN
  readonly withdrawn_at: BN

  constructor(fields: LstCollateralWithdrawnFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.lst_mint = fields.lst_mint
    this.amount = fields.amount
    this.new_lst_qty = fields.new_lst_qty
    this.withdrawn_at = fields.withdrawn_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.publicKey("lst_mint"),
        borsh.u64("amount"),
        borsh.u64("new_lst_qty"),
        borsh.i64("withdrawn_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new LstCollateralWithdrawn({
      vault: obj.vault,
      user: obj.user,
      lst_mint: obj.lst_mint,
      amount: obj.amount,
      new_lst_qty: obj.new_lst_qty,
      withdrawn_at: obj.withdrawn_at,
    })
  }

  static toEncodable(fields: LstCollateralWithdrawnFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      lst_mint: fields.lst_mint,
      amount: fields.amount,
      new_lst_qty: fields.new_lst_qty,
      withdrawn_at: fields.withdrawn_at,
    }
  }

  toJSON(): LstCollateralWithdrawnJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      lst_mint: this.lst_mint.toString(),
      amount: this.amount.toString(),
      new_lst_qty: this.new_lst_qty.toString(),
      withdrawn_at: this.withdrawn_at.toString(),
    }
  }

  static fromJSON(obj: LstCollateralWithdrawnJSON): LstCollateralWithdrawn {
    return new LstCollateralWithdrawn({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      lst_mint: new PublicKey(obj.lst_mint),
      amount: new BN(obj.amount),
      new_lst_qty: new BN(obj.new_lst_qty),
      withdrawn_at: new BN(obj.withdrawn_at),
    })
  }

  toEncodable() {
    return LstCollateralWithdrawn.toEncodable(this)
  }
}
