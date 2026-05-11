import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ConditionalGracePendingFields {
  order: PublicKey
  first_observed_slot: BN
  grace_slots_required: number
}

export interface ConditionalGracePendingJSON {
  order: string
  first_observed_slot: string
  grace_slots_required: number
}

export class ConditionalGracePending {
  readonly order: PublicKey
  readonly first_observed_slot: BN
  readonly grace_slots_required: number

  constructor(fields: ConditionalGracePendingFields) {
    this.order = fields.order
    this.first_observed_slot = fields.first_observed_slot
    this.grace_slots_required = fields.grace_slots_required
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("order"),
        borsh.u64("first_observed_slot"),
        borsh.u32("grace_slots_required"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ConditionalGracePending({
      order: obj.order,
      first_observed_slot: obj.first_observed_slot,
      grace_slots_required: obj.grace_slots_required,
    })
  }

  static toEncodable(fields: ConditionalGracePendingFields) {
    return {
      order: fields.order,
      first_observed_slot: fields.first_observed_slot,
      grace_slots_required: fields.grace_slots_required,
    }
  }

  toJSON(): ConditionalGracePendingJSON {
    return {
      order: this.order.toString(),
      first_observed_slot: this.first_observed_slot.toString(),
      grace_slots_required: this.grace_slots_required,
    }
  }

  static fromJSON(obj: ConditionalGracePendingJSON): ConditionalGracePending {
    return new ConditionalGracePending({
      order: new PublicKey(obj.order),
      first_observed_slot: new BN(obj.first_observed_slot),
      grace_slots_required: obj.grace_slots_required,
    })
  }

  toEncodable() {
    return ConditionalGracePending.toEncodable(this)
  }
}
