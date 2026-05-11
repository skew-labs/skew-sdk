import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ConditionalOrderRegisteredFields {
  order: PublicKey
  authority: PublicKey
  order_id: BN
  kind: number
  trigger_mode: number
  trigger_direction: number
  trigger_price_1e8: BN
  action: number
  action_target: PublicKey
  valid_until_ts: BN
  registered_at: BN
}

export interface ConditionalOrderRegisteredJSON {
  order: string
  authority: string
  order_id: string
  kind: number
  trigger_mode: number
  trigger_direction: number
  trigger_price_1e8: string
  action: number
  action_target: string
  valid_until_ts: string
  registered_at: string
}

export class ConditionalOrderRegistered {
  readonly order: PublicKey
  readonly authority: PublicKey
  readonly order_id: BN
  readonly kind: number
  readonly trigger_mode: number
  readonly trigger_direction: number
  readonly trigger_price_1e8: BN
  readonly action: number
  readonly action_target: PublicKey
  readonly valid_until_ts: BN
  readonly registered_at: BN

  constructor(fields: ConditionalOrderRegisteredFields) {
    this.order = fields.order
    this.authority = fields.authority
    this.order_id = fields.order_id
    this.kind = fields.kind
    this.trigger_mode = fields.trigger_mode
    this.trigger_direction = fields.trigger_direction
    this.trigger_price_1e8 = fields.trigger_price_1e8
    this.action = fields.action
    this.action_target = fields.action_target
    this.valid_until_ts = fields.valid_until_ts
    this.registered_at = fields.registered_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("order"),
        borsh.publicKey("authority"),
        borsh.u64("order_id"),
        borsh.u8("kind"),
        borsh.u8("trigger_mode"),
        borsh.u8("trigger_direction"),
        borsh.i64("trigger_price_1e8"),
        borsh.u8("action"),
        borsh.publicKey("action_target"),
        borsh.i64("valid_until_ts"),
        borsh.i64("registered_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ConditionalOrderRegistered({
      order: obj.order,
      authority: obj.authority,
      order_id: obj.order_id,
      kind: obj.kind,
      trigger_mode: obj.trigger_mode,
      trigger_direction: obj.trigger_direction,
      trigger_price_1e8: obj.trigger_price_1e8,
      action: obj.action,
      action_target: obj.action_target,
      valid_until_ts: obj.valid_until_ts,
      registered_at: obj.registered_at,
    })
  }

  static toEncodable(fields: ConditionalOrderRegisteredFields) {
    return {
      order: fields.order,
      authority: fields.authority,
      order_id: fields.order_id,
      kind: fields.kind,
      trigger_mode: fields.trigger_mode,
      trigger_direction: fields.trigger_direction,
      trigger_price_1e8: fields.trigger_price_1e8,
      action: fields.action,
      action_target: fields.action_target,
      valid_until_ts: fields.valid_until_ts,
      registered_at: fields.registered_at,
    }
  }

  toJSON(): ConditionalOrderRegisteredJSON {
    return {
      order: this.order.toString(),
      authority: this.authority.toString(),
      order_id: this.order_id.toString(),
      kind: this.kind,
      trigger_mode: this.trigger_mode,
      trigger_direction: this.trigger_direction,
      trigger_price_1e8: this.trigger_price_1e8.toString(),
      action: this.action,
      action_target: this.action_target.toString(),
      valid_until_ts: this.valid_until_ts.toString(),
      registered_at: this.registered_at.toString(),
    }
  }

  static fromJSON(
    obj: ConditionalOrderRegisteredJSON
  ): ConditionalOrderRegistered {
    return new ConditionalOrderRegistered({
      order: new PublicKey(obj.order),
      authority: new PublicKey(obj.authority),
      order_id: new BN(obj.order_id),
      kind: obj.kind,
      trigger_mode: obj.trigger_mode,
      trigger_direction: obj.trigger_direction,
      trigger_price_1e8: new BN(obj.trigger_price_1e8),
      action: obj.action,
      action_target: new PublicKey(obj.action_target),
      valid_until_ts: new BN(obj.valid_until_ts),
      registered_at: new BN(obj.registered_at),
    })
  }

  toEncodable() {
    return ConditionalOrderRegistered.toEncodable(this)
  }
}
