import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoveryTriggerDeclaredFields {
  recovery_state: PublicKey
  trigger_kind: number
  emergency_active: boolean
  declared_at_slot: BN
  declared_at_ts: BN
}

export interface RecoveryTriggerDeclaredJSON {
  recovery_state: string
  trigger_kind: number
  emergency_active: boolean
  declared_at_slot: string
  declared_at_ts: string
}

export class RecoveryTriggerDeclared {
  readonly recovery_state: PublicKey
  readonly trigger_kind: number
  readonly emergency_active: boolean
  readonly declared_at_slot: BN
  readonly declared_at_ts: BN

  constructor(fields: RecoveryTriggerDeclaredFields) {
    this.recovery_state = fields.recovery_state
    this.trigger_kind = fields.trigger_kind
    this.emergency_active = fields.emergency_active
    this.declared_at_slot = fields.declared_at_slot
    this.declared_at_ts = fields.declared_at_ts
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recovery_state"),
        borsh.u8("trigger_kind"),
        borsh.bool("emergency_active"),
        borsh.u64("declared_at_slot"),
        borsh.i64("declared_at_ts"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoveryTriggerDeclared({
      recovery_state: obj.recovery_state,
      trigger_kind: obj.trigger_kind,
      emergency_active: obj.emergency_active,
      declared_at_slot: obj.declared_at_slot,
      declared_at_ts: obj.declared_at_ts,
    })
  }

  static toEncodable(fields: RecoveryTriggerDeclaredFields) {
    return {
      recovery_state: fields.recovery_state,
      trigger_kind: fields.trigger_kind,
      emergency_active: fields.emergency_active,
      declared_at_slot: fields.declared_at_slot,
      declared_at_ts: fields.declared_at_ts,
    }
  }

  toJSON(): RecoveryTriggerDeclaredJSON {
    return {
      recovery_state: this.recovery_state.toString(),
      trigger_kind: this.trigger_kind,
      emergency_active: this.emergency_active,
      declared_at_slot: this.declared_at_slot.toString(),
      declared_at_ts: this.declared_at_ts.toString(),
    }
  }

  static fromJSON(obj: RecoveryTriggerDeclaredJSON): RecoveryTriggerDeclared {
    return new RecoveryTriggerDeclared({
      recovery_state: new PublicKey(obj.recovery_state),
      trigger_kind: obj.trigger_kind,
      emergency_active: obj.emergency_active,
      declared_at_slot: new BN(obj.declared_at_slot),
      declared_at_ts: new BN(obj.declared_at_ts),
    })
  }

  toEncodable() {
    return RecoveryTriggerDeclared.toEncodable(this)
  }
}
