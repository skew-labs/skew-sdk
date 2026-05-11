import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IsolatedVaultDrainedFields {
  vault: PublicKey
  user: PublicKey
  option: PublicKey
  drained_for_fee: BN
  drained_for_holder: BN
  new_usdc_micro: BN
  drained_at: BN
}

export interface IsolatedVaultDrainedJSON {
  vault: string
  user: string
  option: string
  drained_for_fee: string
  drained_for_holder: string
  new_usdc_micro: string
  drained_at: string
}

export class IsolatedVaultDrained {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly option: PublicKey
  readonly drained_for_fee: BN
  readonly drained_for_holder: BN
  readonly new_usdc_micro: BN
  readonly drained_at: BN

  constructor(fields: IsolatedVaultDrainedFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.option = fields.option
    this.drained_for_fee = fields.drained_for_fee
    this.drained_for_holder = fields.drained_for_holder
    this.new_usdc_micro = fields.new_usdc_micro
    this.drained_at = fields.drained_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.publicKey("option"),
        borsh.u64("drained_for_fee"),
        borsh.u64("drained_for_holder"),
        borsh.u64("new_usdc_micro"),
        borsh.i64("drained_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IsolatedVaultDrained({
      vault: obj.vault,
      user: obj.user,
      option: obj.option,
      drained_for_fee: obj.drained_for_fee,
      drained_for_holder: obj.drained_for_holder,
      new_usdc_micro: obj.new_usdc_micro,
      drained_at: obj.drained_at,
    })
  }

  static toEncodable(fields: IsolatedVaultDrainedFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      option: fields.option,
      drained_for_fee: fields.drained_for_fee,
      drained_for_holder: fields.drained_for_holder,
      new_usdc_micro: fields.new_usdc_micro,
      drained_at: fields.drained_at,
    }
  }

  toJSON(): IsolatedVaultDrainedJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      option: this.option.toString(),
      drained_for_fee: this.drained_for_fee.toString(),
      drained_for_holder: this.drained_for_holder.toString(),
      new_usdc_micro: this.new_usdc_micro.toString(),
      drained_at: this.drained_at.toString(),
    }
  }

  static fromJSON(obj: IsolatedVaultDrainedJSON): IsolatedVaultDrained {
    return new IsolatedVaultDrained({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      option: new PublicKey(obj.option),
      drained_for_fee: new BN(obj.drained_for_fee),
      drained_for_holder: new BN(obj.drained_for_holder),
      new_usdc_micro: new BN(obj.new_usdc_micro),
      drained_at: new BN(obj.drained_at),
    })
  }

  toEncodable() {
    return IsolatedVaultDrained.toEncodable(this)
  }
}
