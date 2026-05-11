import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionCreatedFields {
  option: PublicKey
  creator: PublicKey
  nonce: BN
  option_type: types.OptionTypeKind
  strike: BN
  expiry_ts: BN
  payoff_amount: BN
  settlement_mint: PublicKey
  created_at: BN
}

export interface OptionCreatedJSON {
  option: string
  creator: string
  nonce: string
  option_type: types.OptionTypeJSON
  strike: string
  expiry_ts: string
  payoff_amount: string
  settlement_mint: string
  created_at: string
}

export class OptionCreated {
  readonly option: PublicKey
  readonly creator: PublicKey
  readonly nonce: BN
  readonly option_type: types.OptionTypeKind
  readonly strike: BN
  readonly expiry_ts: BN
  readonly payoff_amount: BN
  readonly settlement_mint: PublicKey
  readonly created_at: BN

  constructor(fields: OptionCreatedFields) {
    this.option = fields.option
    this.creator = fields.creator
    this.nonce = fields.nonce
    this.option_type = fields.option_type
    this.strike = fields.strike
    this.expiry_ts = fields.expiry_ts
    this.payoff_amount = fields.payoff_amount
    this.settlement_mint = fields.settlement_mint
    this.created_at = fields.created_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("creator"),
        borsh.u64("nonce"),
        types.OptionType.layout("option_type"),
        borsh.u64("strike"),
        borsh.i64("expiry_ts"),
        borsh.u64("payoff_amount"),
        borsh.publicKey("settlement_mint"),
        borsh.i64("created_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionCreated({
      option: obj.option,
      creator: obj.creator,
      nonce: obj.nonce,
      option_type: types.OptionType.fromDecoded(obj.option_type),
      strike: obj.strike,
      expiry_ts: obj.expiry_ts,
      payoff_amount: obj.payoff_amount,
      settlement_mint: obj.settlement_mint,
      created_at: obj.created_at,
    })
  }

  static toEncodable(fields: OptionCreatedFields) {
    return {
      option: fields.option,
      creator: fields.creator,
      nonce: fields.nonce,
      option_type: fields.option_type.toEncodable(),
      strike: fields.strike,
      expiry_ts: fields.expiry_ts,
      payoff_amount: fields.payoff_amount,
      settlement_mint: fields.settlement_mint,
      created_at: fields.created_at,
    }
  }

  toJSON(): OptionCreatedJSON {
    return {
      option: this.option.toString(),
      creator: this.creator.toString(),
      nonce: this.nonce.toString(),
      option_type: this.option_type.toJSON(),
      strike: this.strike.toString(),
      expiry_ts: this.expiry_ts.toString(),
      payoff_amount: this.payoff_amount.toString(),
      settlement_mint: this.settlement_mint.toString(),
      created_at: this.created_at.toString(),
    }
  }

  static fromJSON(obj: OptionCreatedJSON): OptionCreated {
    return new OptionCreated({
      option: new PublicKey(obj.option),
      creator: new PublicKey(obj.creator),
      nonce: new BN(obj.nonce),
      option_type: types.OptionType.fromJSON(obj.option_type),
      strike: new BN(obj.strike),
      expiry_ts: new BN(obj.expiry_ts),
      payoff_amount: new BN(obj.payoff_amount),
      settlement_mint: new PublicKey(obj.settlement_mint),
      created_at: new BN(obj.created_at),
    })
  }

  toEncodable() {
    return OptionCreated.toEncodable(this)
  }
}
