import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface NativeSolVaultInitializedFields {
  vault: PublicKey
  user: PublicKey
  initialized_at: BN
}

export interface NativeSolVaultInitializedJSON {
  vault: string
  user: string
  initialized_at: string
}

export class NativeSolVaultInitialized {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly initialized_at: BN

  constructor(fields: NativeSolVaultInitializedFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.initialized_at = fields.initialized_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.i64("initialized_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new NativeSolVaultInitialized({
      vault: obj.vault,
      user: obj.user,
      initialized_at: obj.initialized_at,
    })
  }

  static toEncodable(fields: NativeSolVaultInitializedFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      initialized_at: fields.initialized_at,
    }
  }

  toJSON(): NativeSolVaultInitializedJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      initialized_at: this.initialized_at.toString(),
    }
  }

  static fromJSON(
    obj: NativeSolVaultInitializedJSON
  ): NativeSolVaultInitialized {
    return new NativeSolVaultInitialized({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      initialized_at: new BN(obj.initialized_at),
    })
  }

  toEncodable() {
    return NativeSolVaultInitialized.toEncodable(this)
  }
}
