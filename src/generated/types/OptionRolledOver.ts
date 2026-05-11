import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OptionRolledOverFields {
  old_option: PublicKey
  new_option: PublicKey
  creator: PublicKey
  new_expiry_ts: BN
  new_strike: BN
  new_payoff_amount: BN
  collateral_carried: BN
  rolled_at: BN
}

export interface OptionRolledOverJSON {
  old_option: string
  new_option: string
  creator: string
  new_expiry_ts: string
  new_strike: string
  new_payoff_amount: string
  collateral_carried: string
  rolled_at: string
}

export class OptionRolledOver {
  readonly old_option: PublicKey
  readonly new_option: PublicKey
  readonly creator: PublicKey
  readonly new_expiry_ts: BN
  readonly new_strike: BN
  readonly new_payoff_amount: BN
  readonly collateral_carried: BN
  readonly rolled_at: BN

  constructor(fields: OptionRolledOverFields) {
    this.old_option = fields.old_option
    this.new_option = fields.new_option
    this.creator = fields.creator
    this.new_expiry_ts = fields.new_expiry_ts
    this.new_strike = fields.new_strike
    this.new_payoff_amount = fields.new_payoff_amount
    this.collateral_carried = fields.collateral_carried
    this.rolled_at = fields.rolled_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("old_option"),
        borsh.publicKey("new_option"),
        borsh.publicKey("creator"),
        borsh.i64("new_expiry_ts"),
        borsh.u64("new_strike"),
        borsh.u64("new_payoff_amount"),
        borsh.u64("collateral_carried"),
        borsh.i64("rolled_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OptionRolledOver({
      old_option: obj.old_option,
      new_option: obj.new_option,
      creator: obj.creator,
      new_expiry_ts: obj.new_expiry_ts,
      new_strike: obj.new_strike,
      new_payoff_amount: obj.new_payoff_amount,
      collateral_carried: obj.collateral_carried,
      rolled_at: obj.rolled_at,
    })
  }

  static toEncodable(fields: OptionRolledOverFields) {
    return {
      old_option: fields.old_option,
      new_option: fields.new_option,
      creator: fields.creator,
      new_expiry_ts: fields.new_expiry_ts,
      new_strike: fields.new_strike,
      new_payoff_amount: fields.new_payoff_amount,
      collateral_carried: fields.collateral_carried,
      rolled_at: fields.rolled_at,
    }
  }

  toJSON(): OptionRolledOverJSON {
    return {
      old_option: this.old_option.toString(),
      new_option: this.new_option.toString(),
      creator: this.creator.toString(),
      new_expiry_ts: this.new_expiry_ts.toString(),
      new_strike: this.new_strike.toString(),
      new_payoff_amount: this.new_payoff_amount.toString(),
      collateral_carried: this.collateral_carried.toString(),
      rolled_at: this.rolled_at.toString(),
    }
  }

  static fromJSON(obj: OptionRolledOverJSON): OptionRolledOver {
    return new OptionRolledOver({
      old_option: new PublicKey(obj.old_option),
      new_option: new PublicKey(obj.new_option),
      creator: new PublicKey(obj.creator),
      new_expiry_ts: new BN(obj.new_expiry_ts),
      new_strike: new BN(obj.new_strike),
      new_payoff_amount: new BN(obj.new_payoff_amount),
      collateral_carried: new BN(obj.collateral_carried),
      rolled_at: new BN(obj.rolled_at),
    })
  }

  toEncodable() {
    return OptionRolledOver.toEncodable(this)
  }
}
