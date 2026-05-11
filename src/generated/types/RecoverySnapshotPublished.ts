import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoverySnapshotPublishedFields {
  recovery_state: PublicKey
  snapshot_oi_digest: Array<number>
  if_aggregate_balance_micro: BN
  residual_unfunded_loss_micro: BN
  snapshot_at_slot: BN
}

export interface RecoverySnapshotPublishedJSON {
  recovery_state: string
  snapshot_oi_digest: Array<number>
  if_aggregate_balance_micro: string
  residual_unfunded_loss_micro: string
  snapshot_at_slot: string
}

export class RecoverySnapshotPublished {
  readonly recovery_state: PublicKey
  readonly snapshot_oi_digest: Array<number>
  readonly if_aggregate_balance_micro: BN
  readonly residual_unfunded_loss_micro: BN
  readonly snapshot_at_slot: BN

  constructor(fields: RecoverySnapshotPublishedFields) {
    this.recovery_state = fields.recovery_state
    this.snapshot_oi_digest = fields.snapshot_oi_digest
    this.if_aggregate_balance_micro = fields.if_aggregate_balance_micro
    this.residual_unfunded_loss_micro = fields.residual_unfunded_loss_micro
    this.snapshot_at_slot = fields.snapshot_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recovery_state"),
        borsh.array(borsh.u8(), 32, "snapshot_oi_digest"),
        borsh.u64("if_aggregate_balance_micro"),
        borsh.u64("residual_unfunded_loss_micro"),
        borsh.u64("snapshot_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoverySnapshotPublished({
      recovery_state: obj.recovery_state,
      snapshot_oi_digest: obj.snapshot_oi_digest,
      if_aggregate_balance_micro: obj.if_aggregate_balance_micro,
      residual_unfunded_loss_micro: obj.residual_unfunded_loss_micro,
      snapshot_at_slot: obj.snapshot_at_slot,
    })
  }

  static toEncodable(fields: RecoverySnapshotPublishedFields) {
    return {
      recovery_state: fields.recovery_state,
      snapshot_oi_digest: fields.snapshot_oi_digest,
      if_aggregate_balance_micro: fields.if_aggregate_balance_micro,
      residual_unfunded_loss_micro: fields.residual_unfunded_loss_micro,
      snapshot_at_slot: fields.snapshot_at_slot,
    }
  }

  toJSON(): RecoverySnapshotPublishedJSON {
    return {
      recovery_state: this.recovery_state.toString(),
      snapshot_oi_digest: this.snapshot_oi_digest,
      if_aggregate_balance_micro: this.if_aggregate_balance_micro.toString(),
      residual_unfunded_loss_micro:
        this.residual_unfunded_loss_micro.toString(),
      snapshot_at_slot: this.snapshot_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: RecoverySnapshotPublishedJSON
  ): RecoverySnapshotPublished {
    return new RecoverySnapshotPublished({
      recovery_state: new PublicKey(obj.recovery_state),
      snapshot_oi_digest: obj.snapshot_oi_digest,
      if_aggregate_balance_micro: new BN(obj.if_aggregate_balance_micro),
      residual_unfunded_loss_micro: new BN(obj.residual_unfunded_loss_micro),
      snapshot_at_slot: new BN(obj.snapshot_at_slot),
    })
  }

  toEncodable() {
    return RecoverySnapshotPublished.toEncodable(this)
  }
}
