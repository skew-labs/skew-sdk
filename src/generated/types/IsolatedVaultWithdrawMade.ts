import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IsolatedVaultWithdrawMadeFields {
  vault: PublicKey
  user: PublicKey
  option: PublicKey
  amount: BN
  new_usdc_micro: BN
  withdrawn_at: BN
}

export interface IsolatedVaultWithdrawMadeJSON {
  vault: string
  user: string
  option: string
  amount: string
  new_usdc_micro: string
  withdrawn_at: string
}

export class IsolatedVaultWithdrawMade {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly option: PublicKey
  readonly amount: BN
  readonly new_usdc_micro: BN
  readonly withdrawn_at: BN

  constructor(fields: IsolatedVaultWithdrawMadeFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.option = fields.option
    this.amount = fields.amount
    this.new_usdc_micro = fields.new_usdc_micro
    this.withdrawn_at = fields.withdrawn_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.publicKey("option"),
        borsh.u64("amount"),
        borsh.u64("new_usdc_micro"),
        borsh.i64("withdrawn_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IsolatedVaultWithdrawMade({
      vault: obj.vault,
      user: obj.user,
      option: obj.option,
      amount: obj.amount,
      new_usdc_micro: obj.new_usdc_micro,
      withdrawn_at: obj.withdrawn_at,
    })
  }

  static toEncodable(fields: IsolatedVaultWithdrawMadeFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      option: fields.option,
      amount: fields.amount,
      new_usdc_micro: fields.new_usdc_micro,
      withdrawn_at: fields.withdrawn_at,
    }
  }

  toJSON(): IsolatedVaultWithdrawMadeJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      option: this.option.toString(),
      amount: this.amount.toString(),
      new_usdc_micro: this.new_usdc_micro.toString(),
      withdrawn_at: this.withdrawn_at.toString(),
    }
  }

  static fromJSON(
    obj: IsolatedVaultWithdrawMadeJSON
  ): IsolatedVaultWithdrawMade {
    return new IsolatedVaultWithdrawMade({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      option: new PublicKey(obj.option),
      amount: new BN(obj.amount),
      new_usdc_micro: new BN(obj.new_usdc_micro),
      withdrawn_at: new BN(obj.withdrawn_at),
    })
  }

  toEncodable() {
    return IsolatedVaultWithdrawMade.toEncodable(this)
  }
}
