import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentV2LegFilledFields {
  intent: PublicKey
  leg_index: number
  option: PublicKey
  side: number
  qty_micro: BN
  fill_premium_micro: BN
  filled_at: BN
}

export interface ComboIntentV2LegFilledJSON {
  intent: string
  leg_index: number
  option: string
  side: number
  qty_micro: string
  fill_premium_micro: string
  filled_at: string
}

export class ComboIntentV2LegFilled {
  readonly intent: PublicKey
  readonly leg_index: number
  readonly option: PublicKey
  readonly side: number
  readonly qty_micro: BN
  readonly fill_premium_micro: BN
  readonly filled_at: BN

  constructor(fields: ComboIntentV2LegFilledFields) {
    this.intent = fields.intent
    this.leg_index = fields.leg_index
    this.option = fields.option
    this.side = fields.side
    this.qty_micro = fields.qty_micro
    this.fill_premium_micro = fields.fill_premium_micro
    this.filled_at = fields.filled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("intent"),
        borsh.u8("leg_index"),
        borsh.publicKey("option"),
        borsh.i8("side"),
        borsh.u64("qty_micro"),
        borsh.u64("fill_premium_micro"),
        borsh.i64("filled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentV2LegFilled({
      intent: obj.intent,
      leg_index: obj.leg_index,
      option: obj.option,
      side: obj.side,
      qty_micro: obj.qty_micro,
      fill_premium_micro: obj.fill_premium_micro,
      filled_at: obj.filled_at,
    })
  }

  static toEncodable(fields: ComboIntentV2LegFilledFields) {
    return {
      intent: fields.intent,
      leg_index: fields.leg_index,
      option: fields.option,
      side: fields.side,
      qty_micro: fields.qty_micro,
      fill_premium_micro: fields.fill_premium_micro,
      filled_at: fields.filled_at,
    }
  }

  toJSON(): ComboIntentV2LegFilledJSON {
    return {
      intent: this.intent.toString(),
      leg_index: this.leg_index,
      option: this.option.toString(),
      side: this.side,
      qty_micro: this.qty_micro.toString(),
      fill_premium_micro: this.fill_premium_micro.toString(),
      filled_at: this.filled_at.toString(),
    }
  }

  static fromJSON(obj: ComboIntentV2LegFilledJSON): ComboIntentV2LegFilled {
    return new ComboIntentV2LegFilled({
      intent: new PublicKey(obj.intent),
      leg_index: obj.leg_index,
      option: new PublicKey(obj.option),
      side: obj.side,
      qty_micro: new BN(obj.qty_micro),
      fill_premium_micro: new BN(obj.fill_premium_micro),
      filled_at: new BN(obj.filled_at),
    })
  }

  toEncodable() {
    return ComboIntentV2LegFilled.toEncodable(this)
  }
}
