import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MakerRebatePhaseSetFields {
  fee_config_pda: PublicKey
  phase_bps_before: number
  phase_bps_after: number
  set_at: BN
}

export interface MakerRebatePhaseSetJSON {
  fee_config_pda: string
  phase_bps_before: number
  phase_bps_after: number
  set_at: string
}

export class MakerRebatePhaseSet {
  readonly fee_config_pda: PublicKey
  readonly phase_bps_before: number
  readonly phase_bps_after: number
  readonly set_at: BN

  constructor(fields: MakerRebatePhaseSetFields) {
    this.fee_config_pda = fields.fee_config_pda
    this.phase_bps_before = fields.phase_bps_before
    this.phase_bps_after = fields.phase_bps_after
    this.set_at = fields.set_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("fee_config_pda"),
        borsh.u16("phase_bps_before"),
        borsh.u16("phase_bps_after"),
        borsh.i64("set_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MakerRebatePhaseSet({
      fee_config_pda: obj.fee_config_pda,
      phase_bps_before: obj.phase_bps_before,
      phase_bps_after: obj.phase_bps_after,
      set_at: obj.set_at,
    })
  }

  static toEncodable(fields: MakerRebatePhaseSetFields) {
    return {
      fee_config_pda: fields.fee_config_pda,
      phase_bps_before: fields.phase_bps_before,
      phase_bps_after: fields.phase_bps_after,
      set_at: fields.set_at,
    }
  }

  toJSON(): MakerRebatePhaseSetJSON {
    return {
      fee_config_pda: this.fee_config_pda.toString(),
      phase_bps_before: this.phase_bps_before,
      phase_bps_after: this.phase_bps_after,
      set_at: this.set_at.toString(),
    }
  }

  static fromJSON(obj: MakerRebatePhaseSetJSON): MakerRebatePhaseSet {
    return new MakerRebatePhaseSet({
      fee_config_pda: new PublicKey(obj.fee_config_pda),
      phase_bps_before: obj.phase_bps_before,
      phase_bps_after: obj.phase_bps_after,
      set_at: new BN(obj.set_at),
    })
  }

  toEncodable() {
    return MakerRebatePhaseSet.toEncodable(this)
  }
}
