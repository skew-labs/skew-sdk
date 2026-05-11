import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ConditionalActionAppliedFields {
  order: PublicKey
  order_id: BN
  action: number
  action_target: PublicKey
  amount_settled_micro: BN
  applied_at: BN
}

export interface ConditionalActionAppliedJSON {
  order: string
  order_id: string
  action: number
  action_target: string
  amount_settled_micro: string
  applied_at: string
}

export class ConditionalActionApplied {
  readonly order: PublicKey
  readonly order_id: BN
  readonly action: number
  readonly action_target: PublicKey
  readonly amount_settled_micro: BN
  readonly applied_at: BN

  constructor(fields: ConditionalActionAppliedFields) {
    this.order = fields.order
    this.order_id = fields.order_id
    this.action = fields.action
    this.action_target = fields.action_target
    this.amount_settled_micro = fields.amount_settled_micro
    this.applied_at = fields.applied_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("order"),
        borsh.u64("order_id"),
        borsh.u8("action"),
        borsh.publicKey("action_target"),
        borsh.u64("amount_settled_micro"),
        borsh.i64("applied_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ConditionalActionApplied({
      order: obj.order,
      order_id: obj.order_id,
      action: obj.action,
      action_target: obj.action_target,
      amount_settled_micro: obj.amount_settled_micro,
      applied_at: obj.applied_at,
    })
  }

  static toEncodable(fields: ConditionalActionAppliedFields) {
    return {
      order: fields.order,
      order_id: fields.order_id,
      action: fields.action,
      action_target: fields.action_target,
      amount_settled_micro: fields.amount_settled_micro,
      applied_at: fields.applied_at,
    }
  }

  toJSON(): ConditionalActionAppliedJSON {
    return {
      order: this.order.toString(),
      order_id: this.order_id.toString(),
      action: this.action,
      action_target: this.action_target.toString(),
      amount_settled_micro: this.amount_settled_micro.toString(),
      applied_at: this.applied_at.toString(),
    }
  }

  static fromJSON(obj: ConditionalActionAppliedJSON): ConditionalActionApplied {
    return new ConditionalActionApplied({
      order: new PublicKey(obj.order),
      order_id: new BN(obj.order_id),
      action: obj.action,
      action_target: new PublicKey(obj.action_target),
      amount_settled_micro: new BN(obj.amount_settled_micro),
      applied_at: new BN(obj.applied_at),
    })
  }

  toEncodable() {
    return ConditionalActionApplied.toEncodable(this)
  }
}
