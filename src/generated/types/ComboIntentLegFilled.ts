import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentLegFilledFields {
  combo: PublicKey
  buyer: PublicKey
  combo_id: BN
  leg_idx: number
  option: PublicKey
  premium_paid_micro: BN
  legs_filled_mask: number
  filled_at: BN
}

export interface ComboIntentLegFilledJSON {
  combo: string
  buyer: string
  combo_id: string
  leg_idx: number
  option: string
  premium_paid_micro: string
  legs_filled_mask: number
  filled_at: string
}

export class ComboIntentLegFilled {
  readonly combo: PublicKey
  readonly buyer: PublicKey
  readonly combo_id: BN
  readonly leg_idx: number
  readonly option: PublicKey
  readonly premium_paid_micro: BN
  readonly legs_filled_mask: number
  readonly filled_at: BN

  constructor(fields: ComboIntentLegFilledFields) {
    this.combo = fields.combo
    this.buyer = fields.buyer
    this.combo_id = fields.combo_id
    this.leg_idx = fields.leg_idx
    this.option = fields.option
    this.premium_paid_micro = fields.premium_paid_micro
    this.legs_filled_mask = fields.legs_filled_mask
    this.filled_at = fields.filled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("combo"),
        borsh.publicKey("buyer"),
        borsh.u64("combo_id"),
        borsh.u8("leg_idx"),
        borsh.publicKey("option"),
        borsh.u64("premium_paid_micro"),
        borsh.u8("legs_filled_mask"),
        borsh.i64("filled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentLegFilled({
      combo: obj.combo,
      buyer: obj.buyer,
      combo_id: obj.combo_id,
      leg_idx: obj.leg_idx,
      option: obj.option,
      premium_paid_micro: obj.premium_paid_micro,
      legs_filled_mask: obj.legs_filled_mask,
      filled_at: obj.filled_at,
    })
  }

  static toEncodable(fields: ComboIntentLegFilledFields) {
    return {
      combo: fields.combo,
      buyer: fields.buyer,
      combo_id: fields.combo_id,
      leg_idx: fields.leg_idx,
      option: fields.option,
      premium_paid_micro: fields.premium_paid_micro,
      legs_filled_mask: fields.legs_filled_mask,
      filled_at: fields.filled_at,
    }
  }

  toJSON(): ComboIntentLegFilledJSON {
    return {
      combo: this.combo.toString(),
      buyer: this.buyer.toString(),
      combo_id: this.combo_id.toString(),
      leg_idx: this.leg_idx,
      option: this.option.toString(),
      premium_paid_micro: this.premium_paid_micro.toString(),
      legs_filled_mask: this.legs_filled_mask,
      filled_at: this.filled_at.toString(),
    }
  }

  static fromJSON(obj: ComboIntentLegFilledJSON): ComboIntentLegFilled {
    return new ComboIntentLegFilled({
      combo: new PublicKey(obj.combo),
      buyer: new PublicKey(obj.buyer),
      combo_id: new BN(obj.combo_id),
      leg_idx: obj.leg_idx,
      option: new PublicKey(obj.option),
      premium_paid_micro: new BN(obj.premium_paid_micro),
      legs_filled_mask: obj.legs_filled_mask,
      filled_at: new BN(obj.filled_at),
    })
  }

  toEncodable() {
    return ComboIntentLegFilled.toEncodable(this)
  }
}
