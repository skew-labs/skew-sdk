import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ConditionalOrderTriggeredFields {
  order: PublicKey
  authority: PublicKey
  order_id: BN
  action: number
  action_target: PublicKey
  triggered_at_slot: BN
  oracle_price_micro: BN
  threshold_micro: BN
  keeper: PublicKey
}

export interface ConditionalOrderTriggeredJSON {
  order: string
  authority: string
  order_id: string
  action: number
  action_target: string
  triggered_at_slot: string
  oracle_price_micro: string
  threshold_micro: string
  keeper: string
}

export class ConditionalOrderTriggered {
  readonly order: PublicKey
  readonly authority: PublicKey
  readonly order_id: BN
  readonly action: number
  readonly action_target: PublicKey
  readonly triggered_at_slot: BN
  readonly oracle_price_micro: BN
  readonly threshold_micro: BN
  readonly keeper: PublicKey

  constructor(fields: ConditionalOrderTriggeredFields) {
    this.order = fields.order
    this.authority = fields.authority
    this.order_id = fields.order_id
    this.action = fields.action
    this.action_target = fields.action_target
    this.triggered_at_slot = fields.triggered_at_slot
    this.oracle_price_micro = fields.oracle_price_micro
    this.threshold_micro = fields.threshold_micro
    this.keeper = fields.keeper
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("order"),
        borsh.publicKey("authority"),
        borsh.u64("order_id"),
        borsh.u8("action"),
        borsh.publicKey("action_target"),
        borsh.u64("triggered_at_slot"),
        borsh.i64("oracle_price_micro"),
        borsh.i64("threshold_micro"),
        borsh.publicKey("keeper"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ConditionalOrderTriggered({
      order: obj.order,
      authority: obj.authority,
      order_id: obj.order_id,
      action: obj.action,
      action_target: obj.action_target,
      triggered_at_slot: obj.triggered_at_slot,
      oracle_price_micro: obj.oracle_price_micro,
      threshold_micro: obj.threshold_micro,
      keeper: obj.keeper,
    })
  }

  static toEncodable(fields: ConditionalOrderTriggeredFields) {
    return {
      order: fields.order,
      authority: fields.authority,
      order_id: fields.order_id,
      action: fields.action,
      action_target: fields.action_target,
      triggered_at_slot: fields.triggered_at_slot,
      oracle_price_micro: fields.oracle_price_micro,
      threshold_micro: fields.threshold_micro,
      keeper: fields.keeper,
    }
  }

  toJSON(): ConditionalOrderTriggeredJSON {
    return {
      order: this.order.toString(),
      authority: this.authority.toString(),
      order_id: this.order_id.toString(),
      action: this.action,
      action_target: this.action_target.toString(),
      triggered_at_slot: this.triggered_at_slot.toString(),
      oracle_price_micro: this.oracle_price_micro.toString(),
      threshold_micro: this.threshold_micro.toString(),
      keeper: this.keeper.toString(),
    }
  }

  static fromJSON(
    obj: ConditionalOrderTriggeredJSON
  ): ConditionalOrderTriggered {
    return new ConditionalOrderTriggered({
      order: new PublicKey(obj.order),
      authority: new PublicKey(obj.authority),
      order_id: new BN(obj.order_id),
      action: obj.action,
      action_target: new PublicKey(obj.action_target),
      triggered_at_slot: new BN(obj.triggered_at_slot),
      oracle_price_micro: new BN(obj.oracle_price_micro),
      threshold_micro: new BN(obj.threshold_micro),
      keeper: new PublicKey(obj.keeper),
    })
  }

  toEncodable() {
    return ConditionalOrderTriggered.toEncodable(this)
  }
}
