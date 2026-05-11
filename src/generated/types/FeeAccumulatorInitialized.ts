import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FeeAccumulatorInitializedFields {
  fee_accumulator: PublicKey
  settlement_mint: PublicKey
  payer: PublicKey
  initialized_at: BN
}

export interface FeeAccumulatorInitializedJSON {
  fee_accumulator: string
  settlement_mint: string
  payer: string
  initialized_at: string
}

export class FeeAccumulatorInitialized {
  readonly fee_accumulator: PublicKey
  readonly settlement_mint: PublicKey
  readonly payer: PublicKey
  readonly initialized_at: BN

  constructor(fields: FeeAccumulatorInitializedFields) {
    this.fee_accumulator = fields.fee_accumulator
    this.settlement_mint = fields.settlement_mint
    this.payer = fields.payer
    this.initialized_at = fields.initialized_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("fee_accumulator"),
        borsh.publicKey("settlement_mint"),
        borsh.publicKey("payer"),
        borsh.i64("initialized_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FeeAccumulatorInitialized({
      fee_accumulator: obj.fee_accumulator,
      settlement_mint: obj.settlement_mint,
      payer: obj.payer,
      initialized_at: obj.initialized_at,
    })
  }

  static toEncodable(fields: FeeAccumulatorInitializedFields) {
    return {
      fee_accumulator: fields.fee_accumulator,
      settlement_mint: fields.settlement_mint,
      payer: fields.payer,
      initialized_at: fields.initialized_at,
    }
  }

  toJSON(): FeeAccumulatorInitializedJSON {
    return {
      fee_accumulator: this.fee_accumulator.toString(),
      settlement_mint: this.settlement_mint.toString(),
      payer: this.payer.toString(),
      initialized_at: this.initialized_at.toString(),
    }
  }

  static fromJSON(
    obj: FeeAccumulatorInitializedJSON
  ): FeeAccumulatorInitialized {
    return new FeeAccumulatorInitialized({
      fee_accumulator: new PublicKey(obj.fee_accumulator),
      settlement_mint: new PublicKey(obj.settlement_mint),
      payer: new PublicKey(obj.payer),
      initialized_at: new BN(obj.initialized_at),
    })
  }

  toEncodable() {
    return FeeAccumulatorInitialized.toEncodable(this)
  }
}
