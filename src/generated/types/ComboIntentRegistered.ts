import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ComboIntentRegisteredFields {
  combo: PublicKey
  buyer: PublicKey
  combo_id: BN
  n_legs: number
  total_max_premium_micro: BN
  expiry_ts: BN
  created_at: BN
}

export interface ComboIntentRegisteredJSON {
  combo: string
  buyer: string
  combo_id: string
  n_legs: number
  total_max_premium_micro: string
  expiry_ts: string
  created_at: string
}

export class ComboIntentRegistered {
  readonly combo: PublicKey
  readonly buyer: PublicKey
  readonly combo_id: BN
  readonly n_legs: number
  readonly total_max_premium_micro: BN
  readonly expiry_ts: BN
  readonly created_at: BN

  constructor(fields: ComboIntentRegisteredFields) {
    this.combo = fields.combo
    this.buyer = fields.buyer
    this.combo_id = fields.combo_id
    this.n_legs = fields.n_legs
    this.total_max_premium_micro = fields.total_max_premium_micro
    this.expiry_ts = fields.expiry_ts
    this.created_at = fields.created_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("combo"),
        borsh.publicKey("buyer"),
        borsh.u64("combo_id"),
        borsh.u8("n_legs"),
        borsh.u64("total_max_premium_micro"),
        borsh.i64("expiry_ts"),
        borsh.i64("created_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ComboIntentRegistered({
      combo: obj.combo,
      buyer: obj.buyer,
      combo_id: obj.combo_id,
      n_legs: obj.n_legs,
      total_max_premium_micro: obj.total_max_premium_micro,
      expiry_ts: obj.expiry_ts,
      created_at: obj.created_at,
    })
  }

  static toEncodable(fields: ComboIntentRegisteredFields) {
    return {
      combo: fields.combo,
      buyer: fields.buyer,
      combo_id: fields.combo_id,
      n_legs: fields.n_legs,
      total_max_premium_micro: fields.total_max_premium_micro,
      expiry_ts: fields.expiry_ts,
      created_at: fields.created_at,
    }
  }

  toJSON(): ComboIntentRegisteredJSON {
    return {
      combo: this.combo.toString(),
      buyer: this.buyer.toString(),
      combo_id: this.combo_id.toString(),
      n_legs: this.n_legs,
      total_max_premium_micro: this.total_max_premium_micro.toString(),
      expiry_ts: this.expiry_ts.toString(),
      created_at: this.created_at.toString(),
    }
  }

  static fromJSON(obj: ComboIntentRegisteredJSON): ComboIntentRegistered {
    return new ComboIntentRegistered({
      combo: new PublicKey(obj.combo),
      buyer: new PublicKey(obj.buyer),
      combo_id: new BN(obj.combo_id),
      n_legs: obj.n_legs,
      total_max_premium_micro: new BN(obj.total_max_premium_micro),
      expiry_ts: new BN(obj.expiry_ts),
      created_at: new BN(obj.created_at),
    })
  }

  toEncodable() {
    return ComboIntentRegistered.toEncodable(this)
  }
}
