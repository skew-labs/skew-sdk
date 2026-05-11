import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentV2CancelledFields {
  intent: PublicKey
  legs_filled: number
  refund_micro: BN
  cancelled_at: BN
}

export interface ComboIntentV2CancelledJSON {
  intent: string
  legs_filled: number
  refund_micro: string
  cancelled_at: string
}

export class ComboIntentV2Cancelled {
  readonly intent: PublicKey
  readonly legs_filled: number
  readonly refund_micro: BN
  readonly cancelled_at: BN

  constructor(fields: ComboIntentV2CancelledFields) {
    this.intent = fields.intent
    this.legs_filled = fields.legs_filled
    this.refund_micro = fields.refund_micro
    this.cancelled_at = fields.cancelled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("intent"),
        borsh.u8("legs_filled"),
        borsh.u64("refund_micro"),
        borsh.i64("cancelled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentV2Cancelled({
      intent: obj.intent,
      legs_filled: obj.legs_filled,
      refund_micro: obj.refund_micro,
      cancelled_at: obj.cancelled_at,
    })
  }

  static toEncodable(fields: ComboIntentV2CancelledFields) {
    return {
      intent: fields.intent,
      legs_filled: fields.legs_filled,
      refund_micro: fields.refund_micro,
      cancelled_at: fields.cancelled_at,
    }
  }

  toJSON(): ComboIntentV2CancelledJSON {
    return {
      intent: this.intent.toString(),
      legs_filled: this.legs_filled,
      refund_micro: this.refund_micro.toString(),
      cancelled_at: this.cancelled_at.toString(),
    }
  }

  static fromJSON(obj: ComboIntentV2CancelledJSON): ComboIntentV2Cancelled {
    return new ComboIntentV2Cancelled({
      intent: new PublicKey(obj.intent),
      legs_filled: obj.legs_filled,
      refund_micro: new BN(obj.refund_micro),
      cancelled_at: new BN(obj.cancelled_at),
    })
  }

  toEncodable() {
    return ComboIntentV2Cancelled.toEncodable(this)
  }
}
