import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionBoughtFields {
  option: PublicKey
  holder: PublicKey
  premium: BN
  option_token_mint: PublicKey
  metadata: PublicKey
}

export interface OptionBoughtJSON {
  option: string
  holder: string
  premium: string
  option_token_mint: string
  metadata: string
}

export class OptionBought {
  readonly option: PublicKey
  readonly holder: PublicKey
  readonly premium: BN
  readonly option_token_mint: PublicKey
  readonly metadata: PublicKey

  constructor(fields: OptionBoughtFields) {
    this.option = fields.option
    this.holder = fields.holder
    this.premium = fields.premium
    this.option_token_mint = fields.option_token_mint
    this.metadata = fields.metadata
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("holder"),
        borsh.u64("premium"),
        borsh.publicKey("option_token_mint"),
        borsh.publicKey("metadata"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionBought({
      option: obj.option,
      holder: obj.holder,
      premium: obj.premium,
      option_token_mint: obj.option_token_mint,
      metadata: obj.metadata,
    })
  }

  static toEncodable(fields: OptionBoughtFields) {
    return {
      option: fields.option,
      holder: fields.holder,
      premium: fields.premium,
      option_token_mint: fields.option_token_mint,
      metadata: fields.metadata,
    }
  }

  toJSON(): OptionBoughtJSON {
    return {
      option: this.option.toString(),
      holder: this.holder.toString(),
      premium: this.premium.toString(),
      option_token_mint: this.option_token_mint.toString(),
      metadata: this.metadata.toString(),
    }
  }

  static fromJSON(obj: OptionBoughtJSON): OptionBought {
    return new OptionBought({
      option: new PublicKey(obj.option),
      holder: new PublicKey(obj.holder),
      premium: new BN(obj.premium),
      option_token_mint: new PublicKey(obj.option_token_mint),
      metadata: new PublicKey(obj.metadata),
    })
  }

  toEncodable() {
    return OptionBought.toEncodable(this)
  }
}
