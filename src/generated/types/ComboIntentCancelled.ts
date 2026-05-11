import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentCancelledFields {
  combo: PublicKey
  buyer: PublicKey
  combo_id: BN
  refund: BN
  cancelled_at: BN
}

export interface ComboIntentCancelledJSON {
  combo: string
  buyer: string
  combo_id: string
  refund: string
  cancelled_at: string
}

export class ComboIntentCancelled {
  readonly combo: PublicKey
  readonly buyer: PublicKey
  readonly combo_id: BN
  readonly refund: BN
  readonly cancelled_at: BN

  constructor(fields: ComboIntentCancelledFields) {
    this.combo = fields.combo
    this.buyer = fields.buyer
    this.combo_id = fields.combo_id
    this.refund = fields.refund
    this.cancelled_at = fields.cancelled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("combo"),
        borsh.publicKey("buyer"),
        borsh.u64("combo_id"),
        borsh.u64("refund"),
        borsh.i64("cancelled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentCancelled({
      combo: obj.combo,
      buyer: obj.buyer,
      combo_id: obj.combo_id,
      refund: obj.refund,
      cancelled_at: obj.cancelled_at,
    })
  }

  static toEncodable(fields: ComboIntentCancelledFields) {
    return {
      combo: fields.combo,
      buyer: fields.buyer,
      combo_id: fields.combo_id,
      refund: fields.refund,
      cancelled_at: fields.cancelled_at,
    }
  }

  toJSON(): ComboIntentCancelledJSON {
    return {
      combo: this.combo.toString(),
      buyer: this.buyer.toString(),
      combo_id: this.combo_id.toString(),
      refund: this.refund.toString(),
      cancelled_at: this.cancelled_at.toString(),
    }
  }

  static fromJSON(obj: ComboIntentCancelledJSON): ComboIntentCancelled {
    return new ComboIntentCancelled({
      combo: new PublicKey(obj.combo),
      buyer: new PublicKey(obj.buyer),
      combo_id: new BN(obj.combo_id),
      refund: new BN(obj.refund),
      cancelled_at: new BN(obj.cancelled_at),
    })
  }

  toEncodable() {
    return ComboIntentCancelled.toEncodable(this)
  }
}
