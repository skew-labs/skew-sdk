import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ConditionalOrderPdaFields {
  authority: PublicKey
  order_id: BN
  kind: number
  trigger_mode: number
  trigger_direction: number
  action: number
  state: number
  bump: number
  _padding_0: Array<number>
  trigger_oracle: PublicKey
  trigger_price_1e8: BN
  trigger_grace_slots: number
  trigger_count: number
  triggered_at_slot: BN
  action_target: PublicKey
  action_min_premium_micro: BN
  action_max_premium_micro: BN
  action_max_slippage_bps: number
  _padding_1: Array<number>
  linked_order: PublicKey
  valid_until_ts: BN
  created_at: BN
  triggered_action_slot: BN
  _reserved: Array<number>
}

export interface ConditionalOrderPdaJSON {
  authority: string
  order_id: string
  kind: number
  trigger_mode: number
  trigger_direction: number
  action: number
  state: number
  bump: number
  _padding_0: Array<number>
  trigger_oracle: string
  trigger_price_1e8: string
  trigger_grace_slots: number
  trigger_count: number
  triggered_at_slot: string
  action_target: string
  action_min_premium_micro: string
  action_max_premium_micro: string
  action_max_slippage_bps: number
  _padding_1: Array<number>
  linked_order: string
  valid_until_ts: string
  created_at: string
  triggered_action_slot: string
  _reserved: Array<number>
}

export class ConditionalOrderPda {
  readonly authority: PublicKey
  readonly order_id: BN
  readonly kind: number
  readonly trigger_mode: number
  readonly trigger_direction: number
  readonly action: number
  readonly state: number
  readonly bump: number
  readonly _padding_0: Array<number>
  readonly trigger_oracle: PublicKey
  readonly trigger_price_1e8: BN
  readonly trigger_grace_slots: number
  readonly trigger_count: number
  readonly triggered_at_slot: BN
  readonly action_target: PublicKey
  readonly action_min_premium_micro: BN
  readonly action_max_premium_micro: BN
  readonly action_max_slippage_bps: number
  readonly _padding_1: Array<number>
  readonly linked_order: PublicKey
  readonly valid_until_ts: BN
  readonly created_at: BN
  readonly triggered_action_slot: BN
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    49, 221, 55, 189, 244, 42, 111, 130,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u64("order_id"),
    borsh.u8("kind"),
    borsh.u8("trigger_mode"),
    borsh.u8("trigger_direction"),
    borsh.u8("action"),
    borsh.u8("state"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 2, "_padding_0"),
    borsh.publicKey("trigger_oracle"),
    borsh.i64("trigger_price_1e8"),
    borsh.u32("trigger_grace_slots"),
    borsh.u32("trigger_count"),
    borsh.u64("triggered_at_slot"),
    borsh.publicKey("action_target"),
    borsh.u64("action_min_premium_micro"),
    borsh.u64("action_max_premium_micro"),
    borsh.u16("action_max_slippage_bps"),
    borsh.array(borsh.u8(), 6, "_padding_1"),
    borsh.publicKey("linked_order"),
    borsh.i64("valid_until_ts"),
    borsh.i64("created_at"),
    borsh.u64("triggered_action_slot"),
    borsh.array(borsh.u8(), 64, "_reserved"),
  ])

  constructor(fields: ConditionalOrderPdaFields) {
    this.authority = fields.authority
    this.order_id = fields.order_id
    this.kind = fields.kind
    this.trigger_mode = fields.trigger_mode
    this.trigger_direction = fields.trigger_direction
    this.action = fields.action
    this.state = fields.state
    this.bump = fields.bump
    this._padding_0 = fields._padding_0
    this.trigger_oracle = fields.trigger_oracle
    this.trigger_price_1e8 = fields.trigger_price_1e8
    this.trigger_grace_slots = fields.trigger_grace_slots
    this.trigger_count = fields.trigger_count
    this.triggered_at_slot = fields.triggered_at_slot
    this.action_target = fields.action_target
    this.action_min_premium_micro = fields.action_min_premium_micro
    this.action_max_premium_micro = fields.action_max_premium_micro
    this.action_max_slippage_bps = fields.action_max_slippage_bps
    this._padding_1 = fields._padding_1
    this.linked_order = fields.linked_order
    this.valid_until_ts = fields.valid_until_ts
    this.created_at = fields.created_at
    this.triggered_action_slot = fields.triggered_action_slot
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ConditionalOrderPda | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<ConditionalOrderPda | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): ConditionalOrderPda {
    if (!data.slice(0, 8).equals(ConditionalOrderPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ConditionalOrderPda.layout.decode(data.slice(8))

    return new ConditionalOrderPda({
      authority: dec.authority,
      order_id: dec.order_id,
      kind: dec.kind,
      trigger_mode: dec.trigger_mode,
      trigger_direction: dec.trigger_direction,
      action: dec.action,
      state: dec.state,
      bump: dec.bump,
      _padding_0: dec._padding_0,
      trigger_oracle: dec.trigger_oracle,
      trigger_price_1e8: dec.trigger_price_1e8,
      trigger_grace_slots: dec.trigger_grace_slots,
      trigger_count: dec.trigger_count,
      triggered_at_slot: dec.triggered_at_slot,
      action_target: dec.action_target,
      action_min_premium_micro: dec.action_min_premium_micro,
      action_max_premium_micro: dec.action_max_premium_micro,
      action_max_slippage_bps: dec.action_max_slippage_bps,
      _padding_1: dec._padding_1,
      linked_order: dec.linked_order,
      valid_until_ts: dec.valid_until_ts,
      created_at: dec.created_at,
      triggered_action_slot: dec.triggered_action_slot,
      _reserved: dec._reserved,
    })
  }

  toJSON(): ConditionalOrderPdaJSON {
    return {
      authority: this.authority.toString(),
      order_id: this.order_id.toString(),
      kind: this.kind,
      trigger_mode: this.trigger_mode,
      trigger_direction: this.trigger_direction,
      action: this.action,
      state: this.state,
      bump: this.bump,
      _padding_0: this._padding_0,
      trigger_oracle: this.trigger_oracle.toString(),
      trigger_price_1e8: this.trigger_price_1e8.toString(),
      trigger_grace_slots: this.trigger_grace_slots,
      trigger_count: this.trigger_count,
      triggered_at_slot: this.triggered_at_slot.toString(),
      action_target: this.action_target.toString(),
      action_min_premium_micro: this.action_min_premium_micro.toString(),
      action_max_premium_micro: this.action_max_premium_micro.toString(),
      action_max_slippage_bps: this.action_max_slippage_bps,
      _padding_1: this._padding_1,
      linked_order: this.linked_order.toString(),
      valid_until_ts: this.valid_until_ts.toString(),
      created_at: this.created_at.toString(),
      triggered_action_slot: this.triggered_action_slot.toString(),
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: ConditionalOrderPdaJSON): ConditionalOrderPda {
    return new ConditionalOrderPda({
      authority: new PublicKey(obj.authority),
      order_id: new BN(obj.order_id),
      kind: obj.kind,
      trigger_mode: obj.trigger_mode,
      trigger_direction: obj.trigger_direction,
      action: obj.action,
      state: obj.state,
      bump: obj.bump,
      _padding_0: obj._padding_0,
      trigger_oracle: new PublicKey(obj.trigger_oracle),
      trigger_price_1e8: new BN(obj.trigger_price_1e8),
      trigger_grace_slots: obj.trigger_grace_slots,
      trigger_count: obj.trigger_count,
      triggered_at_slot: new BN(obj.triggered_at_slot),
      action_target: new PublicKey(obj.action_target),
      action_min_premium_micro: new BN(obj.action_min_premium_micro),
      action_max_premium_micro: new BN(obj.action_max_premium_micro),
      action_max_slippage_bps: obj.action_max_slippage_bps,
      _padding_1: obj._padding_1,
      linked_order: new PublicKey(obj.linked_order),
      valid_until_ts: new BN(obj.valid_until_ts),
      created_at: new BN(obj.created_at),
      triggered_action_slot: new BN(obj.triggered_action_slot),
      _reserved: obj._reserved,
    })
  }
}
