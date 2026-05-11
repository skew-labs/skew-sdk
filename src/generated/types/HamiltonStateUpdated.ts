import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface HamiltonStateUpdatedFields {
  hamilton_state: PublicKey
  asset: number
  last_update_slot: BN
  pi_calm_micro: BN
  pi_stress_micro: BN
  consecutive_stress_days: number
  consecutive_calm_days: number
}

export interface HamiltonStateUpdatedJSON {
  hamilton_state: string
  asset: number
  last_update_slot: string
  pi_calm_micro: string
  pi_stress_micro: string
  consecutive_stress_days: number
  consecutive_calm_days: number
}

export class HamiltonStateUpdated {
  readonly hamilton_state: PublicKey
  readonly asset: number
  readonly last_update_slot: BN
  readonly pi_calm_micro: BN
  readonly pi_stress_micro: BN
  readonly consecutive_stress_days: number
  readonly consecutive_calm_days: number

  constructor(fields: HamiltonStateUpdatedFields) {
    this.hamilton_state = fields.hamilton_state
    this.asset = fields.asset
    this.last_update_slot = fields.last_update_slot
    this.pi_calm_micro = fields.pi_calm_micro
    this.pi_stress_micro = fields.pi_stress_micro
    this.consecutive_stress_days = fields.consecutive_stress_days
    this.consecutive_calm_days = fields.consecutive_calm_days
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("hamilton_state"),
        borsh.u8("asset"),
        borsh.u64("last_update_slot"),
        borsh.u64("pi_calm_micro"),
        borsh.u64("pi_stress_micro"),
        borsh.u32("consecutive_stress_days"),
        borsh.u32("consecutive_calm_days"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new HamiltonStateUpdated({
      hamilton_state: obj.hamilton_state,
      asset: obj.asset,
      last_update_slot: obj.last_update_slot,
      pi_calm_micro: obj.pi_calm_micro,
      pi_stress_micro: obj.pi_stress_micro,
      consecutive_stress_days: obj.consecutive_stress_days,
      consecutive_calm_days: obj.consecutive_calm_days,
    })
  }

  static toEncodable(fields: HamiltonStateUpdatedFields) {
    return {
      hamilton_state: fields.hamilton_state,
      asset: fields.asset,
      last_update_slot: fields.last_update_slot,
      pi_calm_micro: fields.pi_calm_micro,
      pi_stress_micro: fields.pi_stress_micro,
      consecutive_stress_days: fields.consecutive_stress_days,
      consecutive_calm_days: fields.consecutive_calm_days,
    }
  }

  toJSON(): HamiltonStateUpdatedJSON {
    return {
      hamilton_state: this.hamilton_state.toString(),
      asset: this.asset,
      last_update_slot: this.last_update_slot.toString(),
      pi_calm_micro: this.pi_calm_micro.toString(),
      pi_stress_micro: this.pi_stress_micro.toString(),
      consecutive_stress_days: this.consecutive_stress_days,
      consecutive_calm_days: this.consecutive_calm_days,
    }
  }

  static fromJSON(obj: HamiltonStateUpdatedJSON): HamiltonStateUpdated {
    return new HamiltonStateUpdated({
      hamilton_state: new PublicKey(obj.hamilton_state),
      asset: obj.asset,
      last_update_slot: new BN(obj.last_update_slot),
      pi_calm_micro: new BN(obj.pi_calm_micro),
      pi_stress_micro: new BN(obj.pi_stress_micro),
      consecutive_stress_days: obj.consecutive_stress_days,
      consecutive_calm_days: obj.consecutive_calm_days,
    })
  }

  toEncodable() {
    return HamiltonStateUpdated.toEncodable(this)
  }
}
