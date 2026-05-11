import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentV2CleanedFields {
  intent: PublicKey
  legs_filled: number
  refund_micro: BN
  cleaned_at: BN
  cleanup_caller: PublicKey
}

export interface ComboIntentV2CleanedJSON {
  intent: string
  legs_filled: number
  refund_micro: string
  cleaned_at: string
  cleanup_caller: string
}

export class ComboIntentV2Cleaned {
  readonly intent: PublicKey
  readonly legs_filled: number
  readonly refund_micro: BN
  readonly cleaned_at: BN
  readonly cleanup_caller: PublicKey

  constructor(fields: ComboIntentV2CleanedFields) {
    this.intent = fields.intent
    this.legs_filled = fields.legs_filled
    this.refund_micro = fields.refund_micro
    this.cleaned_at = fields.cleaned_at
    this.cleanup_caller = fields.cleanup_caller
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("intent"),
        borsh.u8("legs_filled"),
        borsh.u64("refund_micro"),
        borsh.i64("cleaned_at"),
        borsh.publicKey("cleanup_caller"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentV2Cleaned({
      intent: obj.intent,
      legs_filled: obj.legs_filled,
      refund_micro: obj.refund_micro,
      cleaned_at: obj.cleaned_at,
      cleanup_caller: obj.cleanup_caller,
    })
  }

  static toEncodable(fields: ComboIntentV2CleanedFields) {
    return {
      intent: fields.intent,
      legs_filled: fields.legs_filled,
      refund_micro: fields.refund_micro,
      cleaned_at: fields.cleaned_at,
      cleanup_caller: fields.cleanup_caller,
    }
  }

  toJSON(): ComboIntentV2CleanedJSON {
    return {
      intent: this.intent.toString(),
      legs_filled: this.legs_filled,
      refund_micro: this.refund_micro.toString(),
      cleaned_at: this.cleaned_at.toString(),
      cleanup_caller: this.cleanup_caller.toString(),
    }
  }

  static fromJSON(obj: ComboIntentV2CleanedJSON): ComboIntentV2Cleaned {
    return new ComboIntentV2Cleaned({
      intent: new PublicKey(obj.intent),
      legs_filled: obj.legs_filled,
      refund_micro: new BN(obj.refund_micro),
      cleaned_at: new BN(obj.cleaned_at),
      cleanup_caller: new PublicKey(obj.cleanup_caller),
    })
  }

  toEncodable() {
    return ComboIntentV2Cleaned.toEncodable(this)
  }
}
