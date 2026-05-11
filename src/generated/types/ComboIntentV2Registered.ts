import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentV2RegisteredFields {
  intent: PublicKey
  buyer: PublicKey
  combo_id: BN
  leg_count: number
  total_max_premium_micro: BN
  expires_ts: BN
  registered_at: BN
}

export interface ComboIntentV2RegisteredJSON {
  intent: string
  buyer: string
  combo_id: string
  leg_count: number
  total_max_premium_micro: string
  expires_ts: string
  registered_at: string
}

export class ComboIntentV2Registered {
  readonly intent: PublicKey
  readonly buyer: PublicKey
  readonly combo_id: BN
  readonly leg_count: number
  readonly total_max_premium_micro: BN
  readonly expires_ts: BN
  readonly registered_at: BN

  constructor(fields: ComboIntentV2RegisteredFields) {
    this.intent = fields.intent
    this.buyer = fields.buyer
    this.combo_id = fields.combo_id
    this.leg_count = fields.leg_count
    this.total_max_premium_micro = fields.total_max_premium_micro
    this.expires_ts = fields.expires_ts
    this.registered_at = fields.registered_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("intent"),
        borsh.publicKey("buyer"),
        borsh.u64("combo_id"),
        borsh.u8("leg_count"),
        borsh.u64("total_max_premium_micro"),
        borsh.i64("expires_ts"),
        borsh.i64("registered_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentV2Registered({
      intent: obj.intent,
      buyer: obj.buyer,
      combo_id: obj.combo_id,
      leg_count: obj.leg_count,
      total_max_premium_micro: obj.total_max_premium_micro,
      expires_ts: obj.expires_ts,
      registered_at: obj.registered_at,
    })
  }

  static toEncodable(fields: ComboIntentV2RegisteredFields) {
    return {
      intent: fields.intent,
      buyer: fields.buyer,
      combo_id: fields.combo_id,
      leg_count: fields.leg_count,
      total_max_premium_micro: fields.total_max_premium_micro,
      expires_ts: fields.expires_ts,
      registered_at: fields.registered_at,
    }
  }

  toJSON(): ComboIntentV2RegisteredJSON {
    return {
      intent: this.intent.toString(),
      buyer: this.buyer.toString(),
      combo_id: this.combo_id.toString(),
      leg_count: this.leg_count,
      total_max_premium_micro: this.total_max_premium_micro.toString(),
      expires_ts: this.expires_ts.toString(),
      registered_at: this.registered_at.toString(),
    }
  }

  static fromJSON(obj: ComboIntentV2RegisteredJSON): ComboIntentV2Registered {
    return new ComboIntentV2Registered({
      intent: new PublicKey(obj.intent),
      buyer: new PublicKey(obj.buyer),
      combo_id: new BN(obj.combo_id),
      leg_count: obj.leg_count,
      total_max_premium_micro: new BN(obj.total_max_premium_micro),
      expires_ts: new BN(obj.expires_ts),
      registered_at: new BN(obj.registered_at),
    })
  }

  toEncodable() {
    return ComboIntentV2Registered.toEncodable(this)
  }
}
