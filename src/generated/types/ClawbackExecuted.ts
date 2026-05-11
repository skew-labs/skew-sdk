import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ClawbackExecutedFields {
  insurance_fund: PublicKey
  winner_cm: PublicKey
  drain_amount: BN
  pnl_proxy: BN
  total_pnl_in_batch: BN
  executed_at: BN
}

export interface ClawbackExecutedJSON {
  insurance_fund: string
  winner_cm: string
  drain_amount: string
  pnl_proxy: string
  total_pnl_in_batch: string
  executed_at: string
}

export class ClawbackExecuted {
  readonly insurance_fund: PublicKey
  readonly winner_cm: PublicKey
  readonly drain_amount: BN
  readonly pnl_proxy: BN
  readonly total_pnl_in_batch: BN
  readonly executed_at: BN

  constructor(fields: ClawbackExecutedFields) {
    this.insurance_fund = fields.insurance_fund
    this.winner_cm = fields.winner_cm
    this.drain_amount = fields.drain_amount
    this.pnl_proxy = fields.pnl_proxy
    this.total_pnl_in_batch = fields.total_pnl_in_batch
    this.executed_at = fields.executed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("insurance_fund"),
        borsh.publicKey("winner_cm"),
        borsh.u64("drain_amount"),
        borsh.u64("pnl_proxy"),
        borsh.u64("total_pnl_in_batch"),
        borsh.i64("executed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ClawbackExecuted({
      insurance_fund: obj.insurance_fund,
      winner_cm: obj.winner_cm,
      drain_amount: obj.drain_amount,
      pnl_proxy: obj.pnl_proxy,
      total_pnl_in_batch: obj.total_pnl_in_batch,
      executed_at: obj.executed_at,
    })
  }

  static toEncodable(fields: ClawbackExecutedFields) {
    return {
      insurance_fund: fields.insurance_fund,
      winner_cm: fields.winner_cm,
      drain_amount: fields.drain_amount,
      pnl_proxy: fields.pnl_proxy,
      total_pnl_in_batch: fields.total_pnl_in_batch,
      executed_at: fields.executed_at,
    }
  }

  toJSON(): ClawbackExecutedJSON {
    return {
      insurance_fund: this.insurance_fund.toString(),
      winner_cm: this.winner_cm.toString(),
      drain_amount: this.drain_amount.toString(),
      pnl_proxy: this.pnl_proxy.toString(),
      total_pnl_in_batch: this.total_pnl_in_batch.toString(),
      executed_at: this.executed_at.toString(),
    }
  }

  static fromJSON(obj: ClawbackExecutedJSON): ClawbackExecuted {
    return new ClawbackExecuted({
      insurance_fund: new PublicKey(obj.insurance_fund),
      winner_cm: new PublicKey(obj.winner_cm),
      drain_amount: new BN(obj.drain_amount),
      pnl_proxy: new BN(obj.pnl_proxy),
      total_pnl_in_batch: new BN(obj.total_pnl_in_batch),
      executed_at: new BN(obj.executed_at),
    })
  }

  toEncodable() {
    return ClawbackExecuted.toEncodable(this)
  }
}
