import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoveryVmghDrainExecutedFields {
  recovery_state: PublicKey
  fee_accumulator: PublicKey
  drained_vault: PublicKey
  mint: PublicKey
  haircut_bps: number
  fee_accumulator_balance_before: BN
  actual_transferred_micro: BN
  applied_at_slot: BN
}

export interface RecoveryVmghDrainExecutedJSON {
  recovery_state: string
  fee_accumulator: string
  drained_vault: string
  mint: string
  haircut_bps: number
  fee_accumulator_balance_before: string
  actual_transferred_micro: string
  applied_at_slot: string
}

export class RecoveryVmghDrainExecuted {
  readonly recovery_state: PublicKey
  readonly fee_accumulator: PublicKey
  readonly drained_vault: PublicKey
  readonly mint: PublicKey
  readonly haircut_bps: number
  readonly fee_accumulator_balance_before: BN
  readonly actual_transferred_micro: BN
  readonly applied_at_slot: BN

  constructor(fields: RecoveryVmghDrainExecutedFields) {
    this.recovery_state = fields.recovery_state
    this.fee_accumulator = fields.fee_accumulator
    this.drained_vault = fields.drained_vault
    this.mint = fields.mint
    this.haircut_bps = fields.haircut_bps
    this.fee_accumulator_balance_before = fields.fee_accumulator_balance_before
    this.actual_transferred_micro = fields.actual_transferred_micro
    this.applied_at_slot = fields.applied_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recovery_state"),
        borsh.publicKey("fee_accumulator"),
        borsh.publicKey("drained_vault"),
        borsh.publicKey("mint"),
        borsh.u16("haircut_bps"),
        borsh.u64("fee_accumulator_balance_before"),
        borsh.u64("actual_transferred_micro"),
        borsh.u64("applied_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoveryVmghDrainExecuted({
      recovery_state: obj.recovery_state,
      fee_accumulator: obj.fee_accumulator,
      drained_vault: obj.drained_vault,
      mint: obj.mint,
      haircut_bps: obj.haircut_bps,
      fee_accumulator_balance_before: obj.fee_accumulator_balance_before,
      actual_transferred_micro: obj.actual_transferred_micro,
      applied_at_slot: obj.applied_at_slot,
    })
  }

  static toEncodable(fields: RecoveryVmghDrainExecutedFields) {
    return {
      recovery_state: fields.recovery_state,
      fee_accumulator: fields.fee_accumulator,
      drained_vault: fields.drained_vault,
      mint: fields.mint,
      haircut_bps: fields.haircut_bps,
      fee_accumulator_balance_before: fields.fee_accumulator_balance_before,
      actual_transferred_micro: fields.actual_transferred_micro,
      applied_at_slot: fields.applied_at_slot,
    }
  }

  toJSON(): RecoveryVmghDrainExecutedJSON {
    return {
      recovery_state: this.recovery_state.toString(),
      fee_accumulator: this.fee_accumulator.toString(),
      drained_vault: this.drained_vault.toString(),
      mint: this.mint.toString(),
      haircut_bps: this.haircut_bps,
      fee_accumulator_balance_before:
        this.fee_accumulator_balance_before.toString(),
      actual_transferred_micro: this.actual_transferred_micro.toString(),
      applied_at_slot: this.applied_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: RecoveryVmghDrainExecutedJSON
  ): RecoveryVmghDrainExecuted {
    return new RecoveryVmghDrainExecuted({
      recovery_state: new PublicKey(obj.recovery_state),
      fee_accumulator: new PublicKey(obj.fee_accumulator),
      drained_vault: new PublicKey(obj.drained_vault),
      mint: new PublicKey(obj.mint),
      haircut_bps: obj.haircut_bps,
      fee_accumulator_balance_before: new BN(
        obj.fee_accumulator_balance_before
      ),
      actual_transferred_micro: new BN(obj.actual_transferred_micro),
      applied_at_slot: new BN(obj.applied_at_slot),
    })
  }

  toEncodable() {
    return RecoveryVmghDrainExecuted.toEncodable(this)
  }
}
