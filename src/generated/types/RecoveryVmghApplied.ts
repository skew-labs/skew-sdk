import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoveryVmghAppliedFields {
  recovery_state: PublicKey
  haircut_bps: number
  drained_micro: BN
  cumulative_drained_micro: BN
  apply_count: number
  gain_snapshot_digest: Array<number>
  applied_at_slot: BN
}

export interface RecoveryVmghAppliedJSON {
  recovery_state: string
  haircut_bps: number
  drained_micro: string
  cumulative_drained_micro: string
  apply_count: number
  gain_snapshot_digest: Array<number>
  applied_at_slot: string
}

export class RecoveryVmghApplied {
  readonly recovery_state: PublicKey
  readonly haircut_bps: number
  readonly drained_micro: BN
  readonly cumulative_drained_micro: BN
  readonly apply_count: number
  readonly gain_snapshot_digest: Array<number>
  readonly applied_at_slot: BN

  constructor(fields: RecoveryVmghAppliedFields) {
    this.recovery_state = fields.recovery_state
    this.haircut_bps = fields.haircut_bps
    this.drained_micro = fields.drained_micro
    this.cumulative_drained_micro = fields.cumulative_drained_micro
    this.apply_count = fields.apply_count
    this.gain_snapshot_digest = fields.gain_snapshot_digest
    this.applied_at_slot = fields.applied_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recovery_state"),
        borsh.u16("haircut_bps"),
        borsh.u64("drained_micro"),
        borsh.u64("cumulative_drained_micro"),
        borsh.u32("apply_count"),
        borsh.array(borsh.u8(), 32, "gain_snapshot_digest"),
        borsh.u64("applied_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoveryVmghApplied({
      recovery_state: obj.recovery_state,
      haircut_bps: obj.haircut_bps,
      drained_micro: obj.drained_micro,
      cumulative_drained_micro: obj.cumulative_drained_micro,
      apply_count: obj.apply_count,
      gain_snapshot_digest: obj.gain_snapshot_digest,
      applied_at_slot: obj.applied_at_slot,
    })
  }

  static toEncodable(fields: RecoveryVmghAppliedFields) {
    return {
      recovery_state: fields.recovery_state,
      haircut_bps: fields.haircut_bps,
      drained_micro: fields.drained_micro,
      cumulative_drained_micro: fields.cumulative_drained_micro,
      apply_count: fields.apply_count,
      gain_snapshot_digest: fields.gain_snapshot_digest,
      applied_at_slot: fields.applied_at_slot,
    }
  }

  toJSON(): RecoveryVmghAppliedJSON {
    return {
      recovery_state: this.recovery_state.toString(),
      haircut_bps: this.haircut_bps,
      drained_micro: this.drained_micro.toString(),
      cumulative_drained_micro: this.cumulative_drained_micro.toString(),
      apply_count: this.apply_count,
      gain_snapshot_digest: this.gain_snapshot_digest,
      applied_at_slot: this.applied_at_slot.toString(),
    }
  }

  static fromJSON(obj: RecoveryVmghAppliedJSON): RecoveryVmghApplied {
    return new RecoveryVmghApplied({
      recovery_state: new PublicKey(obj.recovery_state),
      haircut_bps: obj.haircut_bps,
      drained_micro: new BN(obj.drained_micro),
      cumulative_drained_micro: new BN(obj.cumulative_drained_micro),
      apply_count: obj.apply_count,
      gain_snapshot_digest: obj.gain_snapshot_digest,
      applied_at_slot: new BN(obj.applied_at_slot),
    })
  }

  toEncodable() {
    return RecoveryVmghApplied.toEncodable(this)
  }
}
