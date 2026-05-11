import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IsolatedVaultInitializedFields {
  vault: PublicKey
  user: PublicKey
  option: PublicKey
  initialized_at: BN
}

export interface IsolatedVaultInitializedJSON {
  vault: string
  user: string
  option: string
  initialized_at: string
}

export class IsolatedVaultInitialized {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly option: PublicKey
  readonly initialized_at: BN

  constructor(fields: IsolatedVaultInitializedFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.option = fields.option
    this.initialized_at = fields.initialized_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.publicKey("option"),
        borsh.i64("initialized_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IsolatedVaultInitialized({
      vault: obj.vault,
      user: obj.user,
      option: obj.option,
      initialized_at: obj.initialized_at,
    })
  }

  static toEncodable(fields: IsolatedVaultInitializedFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      option: fields.option,
      initialized_at: fields.initialized_at,
    }
  }

  toJSON(): IsolatedVaultInitializedJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      option: this.option.toString(),
      initialized_at: this.initialized_at.toString(),
    }
  }

  static fromJSON(obj: IsolatedVaultInitializedJSON): IsolatedVaultInitialized {
    return new IsolatedVaultInitialized({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      option: new PublicKey(obj.option),
      initialized_at: new BN(obj.initialized_at),
    })
  }

  toEncodable() {
    return IsolatedVaultInitialized.toEncodable(this)
  }
}
