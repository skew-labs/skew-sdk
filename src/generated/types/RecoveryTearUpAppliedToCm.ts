import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoveryTearUpAppliedToCmFields {
  recovery_state: PublicKey
  clearing_member: PublicKey
  tear_up_bps: number
  gross_notional_before: BN
  gross_notional_after: BN
  net_notional_long_before: BN
  net_notional_long_after: BN
  net_notional_short_before: BN
  net_notional_short_after: BN
  applied_at_slot: BN
}

export interface RecoveryTearUpAppliedToCmJSON {
  recovery_state: string
  clearing_member: string
  tear_up_bps: number
  gross_notional_before: string
  gross_notional_after: string
  net_notional_long_before: string
  net_notional_long_after: string
  net_notional_short_before: string
  net_notional_short_after: string
  applied_at_slot: string
}

export class RecoveryTearUpAppliedToCm {
  readonly recovery_state: PublicKey
  readonly clearing_member: PublicKey
  readonly tear_up_bps: number
  readonly gross_notional_before: BN
  readonly gross_notional_after: BN
  readonly net_notional_long_before: BN
  readonly net_notional_long_after: BN
  readonly net_notional_short_before: BN
  readonly net_notional_short_after: BN
  readonly applied_at_slot: BN

  constructor(fields: RecoveryTearUpAppliedToCmFields) {
    this.recovery_state = fields.recovery_state
    this.clearing_member = fields.clearing_member
    this.tear_up_bps = fields.tear_up_bps
    this.gross_notional_before = fields.gross_notional_before
    this.gross_notional_after = fields.gross_notional_after
    this.net_notional_long_before = fields.net_notional_long_before
    this.net_notional_long_after = fields.net_notional_long_after
    this.net_notional_short_before = fields.net_notional_short_before
    this.net_notional_short_after = fields.net_notional_short_after
    this.applied_at_slot = fields.applied_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recovery_state"),
        borsh.publicKey("clearing_member"),
        borsh.u16("tear_up_bps"),
        borsh.u64("gross_notional_before"),
        borsh.u64("gross_notional_after"),
        borsh.u64("net_notional_long_before"),
        borsh.u64("net_notional_long_after"),
        borsh.u64("net_notional_short_before"),
        borsh.u64("net_notional_short_after"),
        borsh.u64("applied_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoveryTearUpAppliedToCm({
      recovery_state: obj.recovery_state,
      clearing_member: obj.clearing_member,
      tear_up_bps: obj.tear_up_bps,
      gross_notional_before: obj.gross_notional_before,
      gross_notional_after: obj.gross_notional_after,
      net_notional_long_before: obj.net_notional_long_before,
      net_notional_long_after: obj.net_notional_long_after,
      net_notional_short_before: obj.net_notional_short_before,
      net_notional_short_after: obj.net_notional_short_after,
      applied_at_slot: obj.applied_at_slot,
    })
  }

  static toEncodable(fields: RecoveryTearUpAppliedToCmFields) {
    return {
      recovery_state: fields.recovery_state,
      clearing_member: fields.clearing_member,
      tear_up_bps: fields.tear_up_bps,
      gross_notional_before: fields.gross_notional_before,
      gross_notional_after: fields.gross_notional_after,
      net_notional_long_before: fields.net_notional_long_before,
      net_notional_long_after: fields.net_notional_long_after,
      net_notional_short_before: fields.net_notional_short_before,
      net_notional_short_after: fields.net_notional_short_after,
      applied_at_slot: fields.applied_at_slot,
    }
  }

  toJSON(): RecoveryTearUpAppliedToCmJSON {
    return {
      recovery_state: this.recovery_state.toString(),
      clearing_member: this.clearing_member.toString(),
      tear_up_bps: this.tear_up_bps,
      gross_notional_before: this.gross_notional_before.toString(),
      gross_notional_after: this.gross_notional_after.toString(),
      net_notional_long_before: this.net_notional_long_before.toString(),
      net_notional_long_after: this.net_notional_long_after.toString(),
      net_notional_short_before: this.net_notional_short_before.toString(),
      net_notional_short_after: this.net_notional_short_after.toString(),
      applied_at_slot: this.applied_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: RecoveryTearUpAppliedToCmJSON
  ): RecoveryTearUpAppliedToCm {
    return new RecoveryTearUpAppliedToCm({
      recovery_state: new PublicKey(obj.recovery_state),
      clearing_member: new PublicKey(obj.clearing_member),
      tear_up_bps: obj.tear_up_bps,
      gross_notional_before: new BN(obj.gross_notional_before),
      gross_notional_after: new BN(obj.gross_notional_after),
      net_notional_long_before: new BN(obj.net_notional_long_before),
      net_notional_long_after: new BN(obj.net_notional_long_after),
      net_notional_short_before: new BN(obj.net_notional_short_before),
      net_notional_short_after: new BN(obj.net_notional_short_after),
      applied_at_slot: new BN(obj.applied_at_slot),
    })
  }

  toEncodable() {
    return RecoveryTearUpAppliedToCm.toEncodable(this)
  }
}
