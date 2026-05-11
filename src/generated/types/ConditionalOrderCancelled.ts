import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ConditionalOrderCancelledFields {
  order: PublicKey
  authority: PublicKey
  order_id: BN
  cancelled_at: BN
  was_oco_pair: boolean
  linked_order: PublicKey
}

export interface ConditionalOrderCancelledJSON {
  order: string
  authority: string
  order_id: string
  cancelled_at: string
  was_oco_pair: boolean
  linked_order: string
}

export class ConditionalOrderCancelled {
  readonly order: PublicKey
  readonly authority: PublicKey
  readonly order_id: BN
  readonly cancelled_at: BN
  readonly was_oco_pair: boolean
  readonly linked_order: PublicKey

  constructor(fields: ConditionalOrderCancelledFields) {
    this.order = fields.order
    this.authority = fields.authority
    this.order_id = fields.order_id
    this.cancelled_at = fields.cancelled_at
    this.was_oco_pair = fields.was_oco_pair
    this.linked_order = fields.linked_order
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("order"),
        borsh.publicKey("authority"),
        borsh.u64("order_id"),
        borsh.i64("cancelled_at"),
        borsh.bool("was_oco_pair"),
        borsh.publicKey("linked_order"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ConditionalOrderCancelled({
      order: obj.order,
      authority: obj.authority,
      order_id: obj.order_id,
      cancelled_at: obj.cancelled_at,
      was_oco_pair: obj.was_oco_pair,
      linked_order: obj.linked_order,
    })
  }

  static toEncodable(fields: ConditionalOrderCancelledFields) {
    return {
      order: fields.order,
      authority: fields.authority,
      order_id: fields.order_id,
      cancelled_at: fields.cancelled_at,
      was_oco_pair: fields.was_oco_pair,
      linked_order: fields.linked_order,
    }
  }

  toJSON(): ConditionalOrderCancelledJSON {
    return {
      order: this.order.toString(),
      authority: this.authority.toString(),
      order_id: this.order_id.toString(),
      cancelled_at: this.cancelled_at.toString(),
      was_oco_pair: this.was_oco_pair,
      linked_order: this.linked_order.toString(),
    }
  }

  static fromJSON(
    obj: ConditionalOrderCancelledJSON
  ): ConditionalOrderCancelled {
    return new ConditionalOrderCancelled({
      order: new PublicKey(obj.order),
      authority: new PublicKey(obj.authority),
      order_id: new BN(obj.order_id),
      cancelled_at: new BN(obj.cancelled_at),
      was_oco_pair: obj.was_oco_pair,
      linked_order: new PublicKey(obj.linked_order),
    })
  }

  toEncodable() {
    return ConditionalOrderCancelled.toEncodable(this)
  }
}
