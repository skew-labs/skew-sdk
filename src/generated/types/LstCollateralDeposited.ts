import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LstCollateralDepositedFields {
  vault: PublicKey
  user: PublicKey
  lst_mint: PublicKey
  amount: BN
  new_lst_qty: BN
  deposited_at: BN
}

export interface LstCollateralDepositedJSON {
  vault: string
  user: string
  lst_mint: string
  amount: string
  new_lst_qty: string
  deposited_at: string
}

export class LstCollateralDeposited {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly lst_mint: PublicKey
  readonly amount: BN
  readonly new_lst_qty: BN
  readonly deposited_at: BN

  constructor(fields: LstCollateralDepositedFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.lst_mint = fields.lst_mint
    this.amount = fields.amount
    this.new_lst_qty = fields.new_lst_qty
    this.deposited_at = fields.deposited_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.publicKey("lst_mint"),
        borsh.u64("amount"),
        borsh.u64("new_lst_qty"),
        borsh.i64("deposited_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new LstCollateralDeposited({
      vault: obj.vault,
      user: obj.user,
      lst_mint: obj.lst_mint,
      amount: obj.amount,
      new_lst_qty: obj.new_lst_qty,
      deposited_at: obj.deposited_at,
    })
  }

  static toEncodable(fields: LstCollateralDepositedFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      lst_mint: fields.lst_mint,
      amount: fields.amount,
      new_lst_qty: fields.new_lst_qty,
      deposited_at: fields.deposited_at,
    }
  }

  toJSON(): LstCollateralDepositedJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      lst_mint: this.lst_mint.toString(),
      amount: this.amount.toString(),
      new_lst_qty: this.new_lst_qty.toString(),
      deposited_at: this.deposited_at.toString(),
    }
  }

  static fromJSON(obj: LstCollateralDepositedJSON): LstCollateralDeposited {
    return new LstCollateralDeposited({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      lst_mint: new PublicKey(obj.lst_mint),
      amount: new BN(obj.amount),
      new_lst_qty: new BN(obj.new_lst_qty),
      deposited_at: new BN(obj.deposited_at),
    })
  }

  toEncodable() {
    return LstCollateralDeposited.toEncodable(this)
  }
}
