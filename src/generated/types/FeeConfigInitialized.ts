import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FeeConfigInitializedFields {
  fee_config_pda: PublicKey
  maker_rebate_phase_bps: number
  initialized_at: BN
}

export interface FeeConfigInitializedJSON {
  fee_config_pda: string
  maker_rebate_phase_bps: number
  initialized_at: string
}

export class FeeConfigInitialized {
  readonly fee_config_pda: PublicKey
  readonly maker_rebate_phase_bps: number
  readonly initialized_at: BN

  constructor(fields: FeeConfigInitializedFields) {
    this.fee_config_pda = fields.fee_config_pda
    this.maker_rebate_phase_bps = fields.maker_rebate_phase_bps
    this.initialized_at = fields.initialized_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("fee_config_pda"),
        borsh.u16("maker_rebate_phase_bps"),
        borsh.i64("initialized_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FeeConfigInitialized({
      fee_config_pda: obj.fee_config_pda,
      maker_rebate_phase_bps: obj.maker_rebate_phase_bps,
      initialized_at: obj.initialized_at,
    })
  }

  static toEncodable(fields: FeeConfigInitializedFields) {
    return {
      fee_config_pda: fields.fee_config_pda,
      maker_rebate_phase_bps: fields.maker_rebate_phase_bps,
      initialized_at: fields.initialized_at,
    }
  }

  toJSON(): FeeConfigInitializedJSON {
    return {
      fee_config_pda: this.fee_config_pda.toString(),
      maker_rebate_phase_bps: this.maker_rebate_phase_bps,
      initialized_at: this.initialized_at.toString(),
    }
  }

  static fromJSON(obj: FeeConfigInitializedJSON): FeeConfigInitialized {
    return new FeeConfigInitialized({
      fee_config_pda: new PublicKey(obj.fee_config_pda),
      maker_rebate_phase_bps: obj.maker_rebate_phase_bps,
      initialized_at: new BN(obj.initialized_at),
    })
  }

  toEncodable() {
    return FeeConfigInitialized.toEncodable(this)
  }
}
