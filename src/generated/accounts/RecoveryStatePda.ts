import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RecoveryStatePdaFields {
  active: boolean
  bump: number
  trigger_kind: number
  snapshot_published: boolean
  _pad_0: Array<number>
  declared_at_slot: BN
  declared_at_ts: BN
  snapshot_at_slot: BN
  snapshot_oi_digest: Array<number>
  residual_unfunded_loss_micro: BN
  vmgh_total_drained_micro: BN
  vmgh_apply_count: number
  tear_up_total_drained_micro: BN
  tear_up_cycle_count: number
  _pad_1: Array<number>
  last_oi_digest: Array<number>
  last_gain_digest: Array<number>
  last_notional_digest: Array<number>
  _reserved: Array<number>
}

export interface RecoveryStatePdaJSON {
  active: boolean
  bump: number
  trigger_kind: number
  snapshot_published: boolean
  _pad_0: Array<number>
  declared_at_slot: string
  declared_at_ts: string
  snapshot_at_slot: string
  snapshot_oi_digest: Array<number>
  residual_unfunded_loss_micro: string
  vmgh_total_drained_micro: string
  vmgh_apply_count: number
  tear_up_total_drained_micro: string
  tear_up_cycle_count: number
  _pad_1: Array<number>
  last_oi_digest: Array<number>
  last_gain_digest: Array<number>
  last_notional_digest: Array<number>
  _reserved: Array<number>
}

export class RecoveryStatePda {
  readonly active: boolean
  readonly bump: number
  readonly trigger_kind: number
  readonly snapshot_published: boolean
  readonly _pad_0: Array<number>
  readonly declared_at_slot: BN
  readonly declared_at_ts: BN
  readonly snapshot_at_slot: BN
  readonly snapshot_oi_digest: Array<number>
  readonly residual_unfunded_loss_micro: BN
  readonly vmgh_total_drained_micro: BN
  readonly vmgh_apply_count: number
  readonly tear_up_total_drained_micro: BN
  readonly tear_up_cycle_count: number
  readonly _pad_1: Array<number>
  readonly last_oi_digest: Array<number>
  readonly last_gain_digest: Array<number>
  readonly last_notional_digest: Array<number>
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    15, 44, 91, 146, 14, 208, 140, 15,
  ])

  static readonly layout = borsh.struct([
    borsh.bool("active"),
    borsh.u8("bump"),
    borsh.u8("trigger_kind"),
    borsh.bool("snapshot_published"),
    borsh.array(borsh.u8(), 4, "_pad_0"),
    borsh.u64("declared_at_slot"),
    borsh.i64("declared_at_ts"),
    borsh.u64("snapshot_at_slot"),
    borsh.array(borsh.u8(), 32, "snapshot_oi_digest"),
    borsh.u64("residual_unfunded_loss_micro"),
    borsh.u64("vmgh_total_drained_micro"),
    borsh.u32("vmgh_apply_count"),
    borsh.u64("tear_up_total_drained_micro"),
    borsh.u32("tear_up_cycle_count"),
    borsh.array(borsh.u8(), 4, "_pad_1"),
    borsh.array(borsh.u8(), 32, "last_oi_digest"),
    borsh.array(borsh.u8(), 32, "last_gain_digest"),
    borsh.array(borsh.u8(), 32, "last_notional_digest"),
    borsh.array(borsh.u8(), 64, "_reserved"),
  ])

  constructor(fields: RecoveryStatePdaFields) {
    this.active = fields.active
    this.bump = fields.bump
    this.trigger_kind = fields.trigger_kind
    this.snapshot_published = fields.snapshot_published
    this._pad_0 = fields._pad_0
    this.declared_at_slot = fields.declared_at_slot
    this.declared_at_ts = fields.declared_at_ts
    this.snapshot_at_slot = fields.snapshot_at_slot
    this.snapshot_oi_digest = fields.snapshot_oi_digest
    this.residual_unfunded_loss_micro = fields.residual_unfunded_loss_micro
    this.vmgh_total_drained_micro = fields.vmgh_total_drained_micro
    this.vmgh_apply_count = fields.vmgh_apply_count
    this.tear_up_total_drained_micro = fields.tear_up_total_drained_micro
    this.tear_up_cycle_count = fields.tear_up_cycle_count
    this._pad_1 = fields._pad_1
    this.last_oi_digest = fields.last_oi_digest
    this.last_gain_digest = fields.last_gain_digest
    this.last_notional_digest = fields.last_notional_digest
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<RecoveryStatePda | null> {
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
  ): Promise<Array<RecoveryStatePda | null>> {
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

  static decode(data: Buffer): RecoveryStatePda {
    if (!data.slice(0, 8).equals(RecoveryStatePda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = RecoveryStatePda.layout.decode(data.slice(8))

    return new RecoveryStatePda({
      active: dec.active,
      bump: dec.bump,
      trigger_kind: dec.trigger_kind,
      snapshot_published: dec.snapshot_published,
      _pad_0: dec._pad_0,
      declared_at_slot: dec.declared_at_slot,
      declared_at_ts: dec.declared_at_ts,
      snapshot_at_slot: dec.snapshot_at_slot,
      snapshot_oi_digest: dec.snapshot_oi_digest,
      residual_unfunded_loss_micro: dec.residual_unfunded_loss_micro,
      vmgh_total_drained_micro: dec.vmgh_total_drained_micro,
      vmgh_apply_count: dec.vmgh_apply_count,
      tear_up_total_drained_micro: dec.tear_up_total_drained_micro,
      tear_up_cycle_count: dec.tear_up_cycle_count,
      _pad_1: dec._pad_1,
      last_oi_digest: dec.last_oi_digest,
      last_gain_digest: dec.last_gain_digest,
      last_notional_digest: dec.last_notional_digest,
      _reserved: dec._reserved,
    })
  }

  toJSON(): RecoveryStatePdaJSON {
    return {
      active: this.active,
      bump: this.bump,
      trigger_kind: this.trigger_kind,
      snapshot_published: this.snapshot_published,
      _pad_0: this._pad_0,
      declared_at_slot: this.declared_at_slot.toString(),
      declared_at_ts: this.declared_at_ts.toString(),
      snapshot_at_slot: this.snapshot_at_slot.toString(),
      snapshot_oi_digest: this.snapshot_oi_digest,
      residual_unfunded_loss_micro:
        this.residual_unfunded_loss_micro.toString(),
      vmgh_total_drained_micro: this.vmgh_total_drained_micro.toString(),
      vmgh_apply_count: this.vmgh_apply_count,
      tear_up_total_drained_micro: this.tear_up_total_drained_micro.toString(),
      tear_up_cycle_count: this.tear_up_cycle_count,
      _pad_1: this._pad_1,
      last_oi_digest: this.last_oi_digest,
      last_gain_digest: this.last_gain_digest,
      last_notional_digest: this.last_notional_digest,
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: RecoveryStatePdaJSON): RecoveryStatePda {
    return new RecoveryStatePda({
      active: obj.active,
      bump: obj.bump,
      trigger_kind: obj.trigger_kind,
      snapshot_published: obj.snapshot_published,
      _pad_0: obj._pad_0,
      declared_at_slot: new BN(obj.declared_at_slot),
      declared_at_ts: new BN(obj.declared_at_ts),
      snapshot_at_slot: new BN(obj.snapshot_at_slot),
      snapshot_oi_digest: obj.snapshot_oi_digest,
      residual_unfunded_loss_micro: new BN(obj.residual_unfunded_loss_micro),
      vmgh_total_drained_micro: new BN(obj.vmgh_total_drained_micro),
      vmgh_apply_count: obj.vmgh_apply_count,
      tear_up_total_drained_micro: new BN(obj.tear_up_total_drained_micro),
      tear_up_cycle_count: obj.tear_up_cycle_count,
      _pad_1: obj._pad_1,
      last_oi_digest: obj.last_oi_digest,
      last_gain_digest: obj.last_gain_digest,
      last_notional_digest: obj.last_notional_digest,
      _reserved: obj._reserved,
    })
  }
}
