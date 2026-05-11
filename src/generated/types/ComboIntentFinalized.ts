import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentFinalizedFields {
  combo: PublicKey
  buyer: PublicKey
  combo_id: BN
  n_legs: number
  total_premium_paid_micro: BN
  residual_refund: BN
  finalized_at: BN
}

export interface ComboIntentFinalizedJSON {
  combo: string
  buyer: string
  combo_id: string
  n_legs: number
  total_premium_paid_micro: string
  residual_refund: string
  finalized_at: string
}

export class ComboIntentFinalized {
  readonly combo: PublicKey
  readonly buyer: PublicKey
  readonly combo_id: BN
  readonly n_legs: number
  readonly total_premium_paid_micro: BN
  readonly residual_refund: BN
  readonly finalized_at: BN

  constructor(fields: ComboIntentFinalizedFields) {
    this.combo = fields.combo
    this.buyer = fields.buyer
    this.combo_id = fields.combo_id
    this.n_legs = fields.n_legs
    this.total_premium_paid_micro = fields.total_premium_paid_micro
    this.residual_refund = fields.residual_refund
    this.finalized_at = fields.finalized_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("combo"),
        borsh.publicKey("buyer"),
        borsh.u64("combo_id"),
        borsh.u8("n_legs"),
        borsh.u64("total_premium_paid_micro"),
        borsh.u64("residual_refund"),
        borsh.i64("finalized_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentFinalized({
      combo: obj.combo,
      buyer: obj.buyer,
      combo_id: obj.combo_id,
      n_legs: obj.n_legs,
      total_premium_paid_micro: obj.total_premium_paid_micro,
      residual_refund: obj.residual_refund,
      finalized_at: obj.finalized_at,
    })
  }

  static toEncodable(fields: ComboIntentFinalizedFields) {
    return {
      combo: fields.combo,
      buyer: fields.buyer,
      combo_id: fields.combo_id,
      n_legs: fields.n_legs,
      total_premium_paid_micro: fields.total_premium_paid_micro,
      residual_refund: fields.residual_refund,
      finalized_at: fields.finalized_at,
    }
  }

  toJSON(): ComboIntentFinalizedJSON {
    return {
      combo: this.combo.toString(),
      buyer: this.buyer.toString(),
      combo_id: this.combo_id.toString(),
      n_legs: this.n_legs,
      total_premium_paid_micro: this.total_premium_paid_micro.toString(),
      residual_refund: this.residual_refund.toString(),
      finalized_at: this.finalized_at.toString(),
    }
  }

  static fromJSON(obj: ComboIntentFinalizedJSON): ComboIntentFinalized {
    return new ComboIntentFinalized({
      combo: new PublicKey(obj.combo),
      buyer: new PublicKey(obj.buyer),
      combo_id: new BN(obj.combo_id),
      n_legs: obj.n_legs,
      total_premium_paid_micro: new BN(obj.total_premium_paid_micro),
      residual_refund: new BN(obj.residual_refund),
      finalized_at: new BN(obj.finalized_at),
    })
  }

  toEncodable() {
    return ComboIntentFinalized.toEncodable(this)
  }
}
