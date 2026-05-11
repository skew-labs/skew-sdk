import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterConditionalOrderArgsFields {
  order_id: BN
  kind: number
  trigger_oracle: PublicKey
  trigger_price_1e8: BN
  trigger_direction: number
  trigger_mode: number
  trigger_grace_slots: number
  action: number
  action_target: PublicKey
  action_min_premium_micro: BN
  action_max_premium_micro: BN
  action_max_slippage_bps: number
  valid_until_ts: BN
}

export interface RegisterConditionalOrderArgsJSON {
  order_id: string
  kind: number
  trigger_oracle: string
  trigger_price_1e8: string
  trigger_direction: number
  trigger_mode: number
  trigger_grace_slots: number
  action: number
  action_target: string
  action_min_premium_micro: string
  action_max_premium_micro: string
  action_max_slippage_bps: number
  valid_until_ts: string
}

export class RegisterConditionalOrderArgs {
  readonly order_id: BN
  readonly kind: number
  readonly trigger_oracle: PublicKey
  readonly trigger_price_1e8: BN
  readonly trigger_direction: number
  readonly trigger_mode: number
  readonly trigger_grace_slots: number
  readonly action: number
  readonly action_target: PublicKey
  readonly action_min_premium_micro: BN
  readonly action_max_premium_micro: BN
  readonly action_max_slippage_bps: number
  readonly valid_until_ts: BN

  constructor(fields: RegisterConditionalOrderArgsFields) {
    this.order_id = fields.order_id
    this.kind = fields.kind
    this.trigger_oracle = fields.trigger_oracle
    this.trigger_price_1e8 = fields.trigger_price_1e8
    this.trigger_direction = fields.trigger_direction
    this.trigger_mode = fields.trigger_mode
    this.trigger_grace_slots = fields.trigger_grace_slots
    this.action = fields.action
    this.action_target = fields.action_target
    this.action_min_premium_micro = fields.action_min_premium_micro
    this.action_max_premium_micro = fields.action_max_premium_micro
    this.action_max_slippage_bps = fields.action_max_slippage_bps
    this.valid_until_ts = fields.valid_until_ts
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("order_id"),
        borsh.u8("kind"),
        borsh.publicKey("trigger_oracle"),
        borsh.i64("trigger_price_1e8"),
        borsh.u8("trigger_direction"),
        borsh.u8("trigger_mode"),
        borsh.u32("trigger_grace_slots"),
        borsh.u8("action"),
        borsh.publicKey("action_target"),
        borsh.u64("action_min_premium_micro"),
        borsh.u64("action_max_premium_micro"),
        borsh.u16("action_max_slippage_bps"),
        borsh.i64("valid_until_ts"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterConditionalOrderArgs({
      order_id: obj.order_id,
      kind: obj.kind,
      trigger_oracle: obj.trigger_oracle,
      trigger_price_1e8: obj.trigger_price_1e8,
      trigger_direction: obj.trigger_direction,
      trigger_mode: obj.trigger_mode,
      trigger_grace_slots: obj.trigger_grace_slots,
      action: obj.action,
      action_target: obj.action_target,
      action_min_premium_micro: obj.action_min_premium_micro,
      action_max_premium_micro: obj.action_max_premium_micro,
      action_max_slippage_bps: obj.action_max_slippage_bps,
      valid_until_ts: obj.valid_until_ts,
    })
  }

  static toEncodable(fields: RegisterConditionalOrderArgsFields) {
    return {
      order_id: fields.order_id,
      kind: fields.kind,
      trigger_oracle: fields.trigger_oracle,
      trigger_price_1e8: fields.trigger_price_1e8,
      trigger_direction: fields.trigger_direction,
      trigger_mode: fields.trigger_mode,
      trigger_grace_slots: fields.trigger_grace_slots,
      action: fields.action,
      action_target: fields.action_target,
      action_min_premium_micro: fields.action_min_premium_micro,
      action_max_premium_micro: fields.action_max_premium_micro,
      action_max_slippage_bps: fields.action_max_slippage_bps,
      valid_until_ts: fields.valid_until_ts,
    }
  }

  toJSON(): RegisterConditionalOrderArgsJSON {
    return {
      order_id: this.order_id.toString(),
      kind: this.kind,
      trigger_oracle: this.trigger_oracle.toString(),
      trigger_price_1e8: this.trigger_price_1e8.toString(),
      trigger_direction: this.trigger_direction,
      trigger_mode: this.trigger_mode,
      trigger_grace_slots: this.trigger_grace_slots,
      action: this.action,
      action_target: this.action_target.toString(),
      action_min_premium_micro: this.action_min_premium_micro.toString(),
      action_max_premium_micro: this.action_max_premium_micro.toString(),
      action_max_slippage_bps: this.action_max_slippage_bps,
      valid_until_ts: this.valid_until_ts.toString(),
    }
  }

  static fromJSON(
    obj: RegisterConditionalOrderArgsJSON
  ): RegisterConditionalOrderArgs {
    return new RegisterConditionalOrderArgs({
      order_id: new BN(obj.order_id),
      kind: obj.kind,
      trigger_oracle: new PublicKey(obj.trigger_oracle),
      trigger_price_1e8: new BN(obj.trigger_price_1e8),
      trigger_direction: obj.trigger_direction,
      trigger_mode: obj.trigger_mode,
      trigger_grace_slots: obj.trigger_grace_slots,
      action: obj.action,
      action_target: new PublicKey(obj.action_target),
      action_min_premium_micro: new BN(obj.action_min_premium_micro),
      action_max_premium_micro: new BN(obj.action_max_premium_micro),
      action_max_slippage_bps: obj.action_max_slippage_bps,
      valid_until_ts: new BN(obj.valid_until_ts),
    })
  }

  toEncodable() {
    return RegisterConditionalOrderArgs.toEncodable(this)
  }
}
