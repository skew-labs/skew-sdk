import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface LiquidationExecutedFields {
  option: PublicKey
  defaulting_cm: PublicKey
  liquidator: PublicKey
  close_factor_bps: number
  bonus_bps: number
  payout: BN
  remaining_equity: BN
  executed_at: BN
}

export interface LiquidationExecutedJSON {
  option: string
  defaulting_cm: string
  liquidator: string
  close_factor_bps: number
  bonus_bps: number
  payout: string
  remaining_equity: string
  executed_at: string
}

export class LiquidationExecuted {
  readonly option: PublicKey
  readonly defaulting_cm: PublicKey
  readonly liquidator: PublicKey
  readonly close_factor_bps: number
  readonly bonus_bps: number
  readonly payout: BN
  readonly remaining_equity: BN
  readonly executed_at: BN

  constructor(fields: LiquidationExecutedFields) {
    this.option = fields.option
    this.defaulting_cm = fields.defaulting_cm
    this.liquidator = fields.liquidator
    this.close_factor_bps = fields.close_factor_bps
    this.bonus_bps = fields.bonus_bps
    this.payout = fields.payout
    this.remaining_equity = fields.remaining_equity
    this.executed_at = fields.executed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("option"),
        borsh.publicKey("defaulting_cm"),
        borsh.publicKey("liquidator"),
        borsh.u16("close_factor_bps"),
        borsh.u16("bonus_bps"),
        borsh.u64("payout"),
        borsh.u64("remaining_equity"),
        borsh.i64("executed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new LiquidationExecuted({
      option: obj.option,
      defaulting_cm: obj.defaulting_cm,
      liquidator: obj.liquidator,
      close_factor_bps: obj.close_factor_bps,
      bonus_bps: obj.bonus_bps,
      payout: obj.payout,
      remaining_equity: obj.remaining_equity,
      executed_at: obj.executed_at,
    })
  }

  static toEncodable(fields: LiquidationExecutedFields) {
    return {
      option: fields.option,
      defaulting_cm: fields.defaulting_cm,
      liquidator: fields.liquidator,
      close_factor_bps: fields.close_factor_bps,
      bonus_bps: fields.bonus_bps,
      payout: fields.payout,
      remaining_equity: fields.remaining_equity,
      executed_at: fields.executed_at,
    }
  }

  toJSON(): LiquidationExecutedJSON {
    return {
      option: this.option.toString(),
      defaulting_cm: this.defaulting_cm.toString(),
      liquidator: this.liquidator.toString(),
      close_factor_bps: this.close_factor_bps,
      bonus_bps: this.bonus_bps,
      payout: this.payout.toString(),
      remaining_equity: this.remaining_equity.toString(),
      executed_at: this.executed_at.toString(),
    }
  }

  static fromJSON(obj: LiquidationExecutedJSON): LiquidationExecuted {
    return new LiquidationExecuted({
      option: new PublicKey(obj.option),
      defaulting_cm: new PublicKey(obj.defaulting_cm),
      liquidator: new PublicKey(obj.liquidator),
      close_factor_bps: obj.close_factor_bps,
      bonus_bps: obj.bonus_bps,
      payout: new BN(obj.payout),
      remaining_equity: new BN(obj.remaining_equity),
      executed_at: new BN(obj.executed_at),
    })
  }

  toEncodable() {
    return LiquidationExecuted.toEncodable(this)
  }
}
