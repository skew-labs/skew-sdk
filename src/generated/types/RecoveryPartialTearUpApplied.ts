import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoveryPartialTearUpAppliedFields {
  recovery_state: PublicKey
  tear_up_bps: number
  terminated_notional_micro: BN
  cumulative_terminated_micro: BN
  cycle_count: number
  notional_snapshot_digest: Array<number>
  applied_at_slot: BN
}

export interface RecoveryPartialTearUpAppliedJSON {
  recovery_state: string
  tear_up_bps: number
  terminated_notional_micro: string
  cumulative_terminated_micro: string
  cycle_count: number
  notional_snapshot_digest: Array<number>
  applied_at_slot: string
}

export class RecoveryPartialTearUpApplied {
  readonly recovery_state: PublicKey
  readonly tear_up_bps: number
  readonly terminated_notional_micro: BN
  readonly cumulative_terminated_micro: BN
  readonly cycle_count: number
  readonly notional_snapshot_digest: Array<number>
  readonly applied_at_slot: BN

  constructor(fields: RecoveryPartialTearUpAppliedFields) {
    this.recovery_state = fields.recovery_state
    this.tear_up_bps = fields.tear_up_bps
    this.terminated_notional_micro = fields.terminated_notional_micro
    this.cumulative_terminated_micro = fields.cumulative_terminated_micro
    this.cycle_count = fields.cycle_count
    this.notional_snapshot_digest = fields.notional_snapshot_digest
    this.applied_at_slot = fields.applied_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recovery_state"),
        borsh.u16("tear_up_bps"),
        borsh.u64("terminated_notional_micro"),
        borsh.u64("cumulative_terminated_micro"),
        borsh.u32("cycle_count"),
        borsh.array(borsh.u8(), 32, "notional_snapshot_digest"),
        borsh.u64("applied_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoveryPartialTearUpApplied({
      recovery_state: obj.recovery_state,
      tear_up_bps: obj.tear_up_bps,
      terminated_notional_micro: obj.terminated_notional_micro,
      cumulative_terminated_micro: obj.cumulative_terminated_micro,
      cycle_count: obj.cycle_count,
      notional_snapshot_digest: obj.notional_snapshot_digest,
      applied_at_slot: obj.applied_at_slot,
    })
  }

  static toEncodable(fields: RecoveryPartialTearUpAppliedFields) {
    return {
      recovery_state: fields.recovery_state,
      tear_up_bps: fields.tear_up_bps,
      terminated_notional_micro: fields.terminated_notional_micro,
      cumulative_terminated_micro: fields.cumulative_terminated_micro,
      cycle_count: fields.cycle_count,
      notional_snapshot_digest: fields.notional_snapshot_digest,
      applied_at_slot: fields.applied_at_slot,
    }
  }

  toJSON(): RecoveryPartialTearUpAppliedJSON {
    return {
      recovery_state: this.recovery_state.toString(),
      tear_up_bps: this.tear_up_bps,
      terminated_notional_micro: this.terminated_notional_micro.toString(),
      cumulative_terminated_micro: this.cumulative_terminated_micro.toString(),
      cycle_count: this.cycle_count,
      notional_snapshot_digest: this.notional_snapshot_digest,
      applied_at_slot: this.applied_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: RecoveryPartialTearUpAppliedJSON
  ): RecoveryPartialTearUpApplied {
    return new RecoveryPartialTearUpApplied({
      recovery_state: new PublicKey(obj.recovery_state),
      tear_up_bps: obj.tear_up_bps,
      terminated_notional_micro: new BN(obj.terminated_notional_micro),
      cumulative_terminated_micro: new BN(obj.cumulative_terminated_micro),
      cycle_count: obj.cycle_count,
      notional_snapshot_digest: obj.notional_snapshot_digest,
      applied_at_slot: new BN(obj.applied_at_slot),
    })
  }

  toEncodable() {
    return RecoveryPartialTearUpApplied.toEncodable(this)
  }
}
