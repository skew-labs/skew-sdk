import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LiquidationBufferCheckedFields {
  option: PublicKey
  defaulting_cm: PublicKey
  close_factor_bps: number
  health_after_bps: BN
  buffer_margin_micro: BN
  checked_at: BN
}

export interface LiquidationBufferCheckedJSON {
  option: string
  defaulting_cm: string
  close_factor_bps: number
  health_after_bps: string
  buffer_margin_micro: string
  checked_at: string
}

export class LiquidationBufferChecked {
  readonly option: PublicKey
  readonly defaulting_cm: PublicKey
  readonly close_factor_bps: number
  readonly health_after_bps: BN
  readonly buffer_margin_micro: BN
  readonly checked_at: BN

  constructor(fields: LiquidationBufferCheckedFields) {
    this.option = fields.option
    this.defaulting_cm = fields.defaulting_cm
    this.close_factor_bps = fields.close_factor_bps
    this.health_after_bps = fields.health_after_bps
    this.buffer_margin_micro = fields.buffer_margin_micro
    this.checked_at = fields.checked_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("defaulting_cm"),
        borsh.u16("close_factor_bps"),
        borsh.u64("health_after_bps"),
        borsh.i64("buffer_margin_micro"),
        borsh.i64("checked_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new LiquidationBufferChecked({
      option: obj.option,
      defaulting_cm: obj.defaulting_cm,
      close_factor_bps: obj.close_factor_bps,
      health_after_bps: obj.health_after_bps,
      buffer_margin_micro: obj.buffer_margin_micro,
      checked_at: obj.checked_at,
    })
  }

  static toEncodable(fields: LiquidationBufferCheckedFields) {
    return {
      option: fields.option,
      defaulting_cm: fields.defaulting_cm,
      close_factor_bps: fields.close_factor_bps,
      health_after_bps: fields.health_after_bps,
      buffer_margin_micro: fields.buffer_margin_micro,
      checked_at: fields.checked_at,
    }
  }

  toJSON(): LiquidationBufferCheckedJSON {
    return {
      option: this.option.toString(),
      defaulting_cm: this.defaulting_cm.toString(),
      close_factor_bps: this.close_factor_bps,
      health_after_bps: this.health_after_bps.toString(),
      buffer_margin_micro: this.buffer_margin_micro.toString(),
      checked_at: this.checked_at.toString(),
    }
  }

  static fromJSON(obj: LiquidationBufferCheckedJSON): LiquidationBufferChecked {
    return new LiquidationBufferChecked({
      option: new PublicKey(obj.option),
      defaulting_cm: new PublicKey(obj.defaulting_cm),
      close_factor_bps: obj.close_factor_bps,
      health_after_bps: new BN(obj.health_after_bps),
      buffer_margin_micro: new BN(obj.buffer_margin_micro),
      checked_at: new BN(obj.checked_at),
    })
  }

  toEncodable() {
    return LiquidationBufferChecked.toEncodable(this)
  }
}
