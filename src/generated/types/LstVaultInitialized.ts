import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LstVaultInitializedFields {
  vault: PublicKey
  user: PublicKey
  lst_mint: PublicKey
  initialized_at: BN
}

export interface LstVaultInitializedJSON {
  vault: string
  user: string
  lst_mint: string
  initialized_at: string
}

export class LstVaultInitialized {
  readonly vault: PublicKey
  readonly user: PublicKey
  readonly lst_mint: PublicKey
  readonly initialized_at: BN

  constructor(fields: LstVaultInitializedFields) {
    this.vault = fields.vault
    this.user = fields.user
    this.lst_mint = fields.lst_mint
    this.initialized_at = fields.initialized_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("vault"),
        borsh.publicKey("user"),
        borsh.publicKey("lst_mint"),
        borsh.i64("initialized_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new LstVaultInitialized({
      vault: obj.vault,
      user: obj.user,
      lst_mint: obj.lst_mint,
      initialized_at: obj.initialized_at,
    })
  }

  static toEncodable(fields: LstVaultInitializedFields) {
    return {
      vault: fields.vault,
      user: fields.user,
      lst_mint: fields.lst_mint,
      initialized_at: fields.initialized_at,
    }
  }

  toJSON(): LstVaultInitializedJSON {
    return {
      vault: this.vault.toString(),
      user: this.user.toString(),
      lst_mint: this.lst_mint.toString(),
      initialized_at: this.initialized_at.toString(),
    }
  }

  static fromJSON(obj: LstVaultInitializedJSON): LstVaultInitialized {
    return new LstVaultInitialized({
      vault: new PublicKey(obj.vault),
      user: new PublicKey(obj.user),
      lst_mint: new PublicKey(obj.lst_mint),
      initialized_at: new BN(obj.initialized_at),
    })
  }

  toEncodable() {
    return LstVaultInitialized.toEncodable(this)
  }
}
