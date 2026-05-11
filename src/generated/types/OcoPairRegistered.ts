import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OcoPairRegisteredFields {
  authority: PublicKey
  order_a: PublicKey
  order_b: PublicKey
  action_target: PublicKey
  registered_at: BN
}

export interface OcoPairRegisteredJSON {
  authority: string
  order_a: string
  order_b: string
  action_target: string
  registered_at: string
}

export class OcoPairRegistered {
  readonly authority: PublicKey
  readonly order_a: PublicKey
  readonly order_b: PublicKey
  readonly action_target: PublicKey
  readonly registered_at: BN

  constructor(fields: OcoPairRegisteredFields) {
    this.authority = fields.authority
    this.order_a = fields.order_a
    this.order_b = fields.order_b
    this.action_target = fields.action_target
    this.registered_at = fields.registered_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("authority"),
        borsh.publicKey("order_a"),
        borsh.publicKey("order_b"),
        borsh.publicKey("action_target"),
        borsh.i64("registered_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OcoPairRegistered({
      authority: obj.authority,
      order_a: obj.order_a,
      order_b: obj.order_b,
      action_target: obj.action_target,
      registered_at: obj.registered_at,
    })
  }

  static toEncodable(fields: OcoPairRegisteredFields) {
    return {
      authority: fields.authority,
      order_a: fields.order_a,
      order_b: fields.order_b,
      action_target: fields.action_target,
      registered_at: fields.registered_at,
    }
  }

  toJSON(): OcoPairRegisteredJSON {
    return {
      authority: this.authority.toString(),
      order_a: this.order_a.toString(),
      order_b: this.order_b.toString(),
      action_target: this.action_target.toString(),
      registered_at: this.registered_at.toString(),
    }
  }

  static fromJSON(obj: OcoPairRegisteredJSON): OcoPairRegistered {
    return new OcoPairRegistered({
      authority: new PublicKey(obj.authority),
      order_a: new PublicKey(obj.order_a),
      order_b: new PublicKey(obj.order_b),
      action_target: new PublicKey(obj.action_target),
      registered_at: new BN(obj.registered_at),
    })
  }

  toEncodable() {
    return OcoPairRegistered.toEncodable(this)
  }
}
