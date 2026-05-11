import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IsolatedVaultDepositMadeFields {
  vault: PublicKey
  user: PublicKey
  option: PublicKey
  amount: BN
  new_usdc_micro: BN
  deposited_at: BN
}

export interface IsolatedVaultDepositMadeJSON {
  vault: string
  user: string
  option: string
  amount: string
  new_usdc_micro: string
  deposited_at: string
}

export class IsolatedVaultDepositMade {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly option: PublicKey
  readonly amount: BN
  readonly new_usdc_micro: BN
  readonly deposited_at: BN

  constructor(fields: IsolatedVaultDepositMadeFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.option = fields.option
    this.amount = fields.amount
    this.new_usdc_micro = fields.new_usdc_micro
    this.deposited_at = fields.deposited_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.publicKey("option"),
        borsh.u64("amount"),
        borsh.u64("new_usdc_micro"),
        borsh.i64("deposited_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IsolatedVaultDepositMade({
      vault: obj.vault,
      user: obj.user,
      option: obj.option,
      amount: obj.amount,
      new_usdc_micro: obj.new_usdc_micro,
      deposited_at: obj.deposited_at,
    })
  }

  static toEncodable(fields: IsolatedVaultDepositMadeFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      option: fields.option,
      amount: fields.amount,
      new_usdc_micro: fields.new_usdc_micro,
      deposited_at: fields.deposited_at,
    }
  }

  toJSON(): IsolatedVaultDepositMadeJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      option: this.option.toString(),
      amount: this.amount.toString(),
      new_usdc_micro: this.new_usdc_micro.toString(),
      deposited_at: this.deposited_at.toString(),
    }
  }

  static fromJSON(obj: IsolatedVaultDepositMadeJSON): IsolatedVaultDepositMade {
    return new IsolatedVaultDepositMade({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      option: new PublicKey(obj.option),
      amount: new BN(obj.amount),
      new_usdc_micro: new BN(obj.new_usdc_micro),
      deposited_at: new BN(obj.deposited_at),
    })
  }

  toEncodable() {
    return IsolatedVaultDepositMade.toEncodable(this)
  }
}
