import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BuilderFeesWithdrawnFields {
  builder_code_pda: PublicKey
  builder: PublicKey
  amount: BN
  remaining_accrued_micro: BN
  withdrawn_at: BN
}

export interface BuilderFeesWithdrawnJSON {
  builder_code_pda: string
  builder: string
  amount: string
  remaining_accrued_micro: string
  withdrawn_at: string
}

export class BuilderFeesWithdrawn {
  readonly builder_code_pda: PublicKey
  readonly builder: PublicKey
  readonly amount: BN
  readonly remaining_accrued_micro: BN
  readonly withdrawn_at: BN

  constructor(fields: BuilderFeesWithdrawnFields) {
    this.builder_code_pda = fields.builder_code_pda
    this.builder = fields.builder
    this.amount = fields.amount
    this.remaining_accrued_micro = fields.remaining_accrued_micro
    this.withdrawn_at = fields.withdrawn_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("builder_code_pda"),
        borsh.publicKey("builder"),
        borsh.u64("amount"),
        borsh.u64("remaining_accrued_micro"),
        borsh.i64("withdrawn_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new BuilderFeesWithdrawn({
      builder_code_pda: obj.builder_code_pda,
      builder: obj.builder,
      amount: obj.amount,
      remaining_accrued_micro: obj.remaining_accrued_micro,
      withdrawn_at: obj.withdrawn_at,
    })
  }

  static toEncodable(fields: BuilderFeesWithdrawnFields) {
    return {
      builder_code_pda: fields.builder_code_pda,
      builder: fields.builder,
      amount: fields.amount,
      remaining_accrued_micro: fields.remaining_accrued_micro,
      withdrawn_at: fields.withdrawn_at,
    }
  }

  toJSON(): BuilderFeesWithdrawnJSON {
    return {
      builder_code_pda: this.builder_code_pda.toString(),
      builder: this.builder.toString(),
      amount: this.amount.toString(),
      remaining_accrued_micro: this.remaining_accrued_micro.toString(),
      withdrawn_at: this.withdrawn_at.toString(),
    }
  }

  static fromJSON(obj: BuilderFeesWithdrawnJSON): BuilderFeesWithdrawn {
    return new BuilderFeesWithdrawn({
      builder_code_pda: new PublicKey(obj.builder_code_pda),
      builder: new PublicKey(obj.builder),
      amount: new BN(obj.amount),
      remaining_accrued_micro: new BN(obj.remaining_accrued_micro),
      withdrawn_at: new BN(obj.withdrawn_at),
    })
  }

  toEncodable() {
    return BuilderFeesWithdrawn.toEncodable(this)
  }
}
