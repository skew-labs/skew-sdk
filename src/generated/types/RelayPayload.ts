import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RelayPayloadFields {
  relay_nonce: BN
  quote_expiry_ts: BN
  option_type: types.OptionTypeKind
  asset: number
  direction: number
  strike: BN
  expiry_ts: BN
  payoff_amount: BN
  settlement_decimals: number
  upper_bound: BN
  extra_param: number
  premium: BN
  settlement_mint: PublicKey
  buyer: PublicKey
}

export interface RelayPayloadJSON {
  relay_nonce: string
  quote_expiry_ts: string
  option_type: types.OptionTypeJSON
  asset: number
  direction: number
  strike: string
  expiry_ts: string
  payoff_amount: string
  settlement_decimals: number
  upper_bound: string
  extra_param: number
  premium: string
  settlement_mint: string
  buyer: string
}

export class RelayPayload {
  readonly relay_nonce: BN
  readonly quote_expiry_ts: BN
  readonly option_type: types.OptionTypeKind
  readonly asset: number
  readonly direction: number
  readonly strike: BN
  readonly expiry_ts: BN
  readonly payoff_amount: BN
  readonly settlement_decimals: number
  readonly upper_bound: BN
  readonly extra_param: number
  readonly premium: BN
  readonly settlement_mint: PublicKey
  readonly buyer: PublicKey

  constructor(fields: RelayPayloadFields) {
    this.relay_nonce = fields.relay_nonce
    this.quote_expiry_ts = fields.quote_expiry_ts
    this.option_type = fields.option_type
    this.asset = fields.asset
    this.direction = fields.direction
    this.strike = fields.strike
    this.expiry_ts = fields.expiry_ts
    this.payoff_amount = fields.payoff_amount
    this.settlement_decimals = fields.settlement_decimals
    this.upper_bound = fields.upper_bound
    this.extra_param = fields.extra_param
    this.premium = fields.premium
    this.settlement_mint = fields.settlement_mint
    this.buyer = fields.buyer
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("relay_nonce"),
        borsh.i64("quote_expiry_ts"),
        types.OptionType.layout("option_type"),
        borsh.u8("asset"),
        borsh.i8("direction"),
        borsh.u64("strike"),
        borsh.i64("expiry_ts"),
        borsh.u64("payoff_amount"),
        borsh.u8("settlement_decimals"),
        borsh.u64("upper_bound"),
        borsh.f64("extra_param"),
        borsh.u64("premium"),
        borsh.publicKey("settlement_mint"),
        borsh.publicKey("buyer"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RelayPayload({
      relay_nonce: obj.relay_nonce,
      quote_expiry_ts: obj.quote_expiry_ts,
      option_type: types.OptionType.fromDecoded(obj.option_type),
      asset: obj.asset,
      direction: obj.direction,
      strike: obj.strike,
      expiry_ts: obj.expiry_ts,
      payoff_amount: obj.payoff_amount,
      settlement_decimals: obj.settlement_decimals,
      upper_bound: obj.upper_bound,
      extra_param: obj.extra_param,
      premium: obj.premium,
      settlement_mint: obj.settlement_mint,
      buyer: obj.buyer,
    })
  }

  static toEncodable(fields: RelayPayloadFields) {
    return {
      relay_nonce: fields.relay_nonce,
      quote_expiry_ts: fields.quote_expiry_ts,
      option_type: fields.option_type.toEncodable(),
      asset: fields.asset,
      direction: fields.direction,
      strike: fields.strike,
      expiry_ts: fields.expiry_ts,
      payoff_amount: fields.payoff_amount,
      settlement_decimals: fields.settlement_decimals,
      upper_bound: fields.upper_bound,
      extra_param: fields.extra_param,
      premium: fields.premium,
      settlement_mint: fields.settlement_mint,
      buyer: fields.buyer,
    }
  }

  toJSON(): RelayPayloadJSON {
    return {
      relay_nonce: this.relay_nonce.toString(),
      quote_expiry_ts: this.quote_expiry_ts.toString(),
      option_type: this.option_type.toJSON(),
      asset: this.asset,
      direction: this.direction,
      strike: this.strike.toString(),
      expiry_ts: this.expiry_ts.toString(),
      payoff_amount: this.payoff_amount.toString(),
      settlement_decimals: this.settlement_decimals,
      upper_bound: this.upper_bound.toString(),
      extra_param: this.extra_param,
      premium: this.premium.toString(),
      settlement_mint: this.settlement_mint.toString(),
      buyer: this.buyer.toString(),
    }
  }

  static fromJSON(obj: RelayPayloadJSON): RelayPayload {
    return new RelayPayload({
      relay_nonce: new BN(obj.relay_nonce),
      quote_expiry_ts: new BN(obj.quote_expiry_ts),
      option_type: types.OptionType.fromJSON(obj.option_type),
      asset: obj.asset,
      direction: obj.direction,
      strike: new BN(obj.strike),
      expiry_ts: new BN(obj.expiry_ts),
      payoff_amount: new BN(obj.payoff_amount),
      settlement_decimals: obj.settlement_decimals,
      upper_bound: new BN(obj.upper_bound),
      extra_param: obj.extra_param,
      premium: new BN(obj.premium),
      settlement_mint: new PublicKey(obj.settlement_mint),
      buyer: new PublicKey(obj.buyer),
    })
  }

  toEncodable() {
    return RelayPayload.toEncodable(this)
  }
}
