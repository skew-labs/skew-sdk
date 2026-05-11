import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface FeeWithdrawnFields {
  recipient: PublicKey
  settlement_mint: PublicKey
  amount: BN
  withdrawn_at: BN
}

export interface FeeWithdrawnJSON {
  recipient: string
  settlement_mint: string
  amount: string
  withdrawn_at: string
}

export class FeeWithdrawn {
  readonly recipient: PublicKey
  readonly settlement_mint: PublicKey
  readonly amount: BN
  readonly withdrawn_at: BN

  constructor(fields: FeeWithdrawnFields) {
    this.recipient = fields.recipient
    this.settlement_mint = fields.settlement_mint
    this.amount = fields.amount
    this.withdrawn_at = fields.withdrawn_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("recipient"),
        borsh.publicKey("settlement_mint"),
        borsh.u64("amount"),
        borsh.i64("withdrawn_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new FeeWithdrawn({
      recipient: obj.recipient,
      settlement_mint: obj.settlement_mint,
      amount: obj.amount,
      withdrawn_at: obj.withdrawn_at,
    })
  }

  static toEncodable(fields: FeeWithdrawnFields) {
    return {
      recipient: fields.recipient,
      settlement_mint: fields.settlement_mint,
      amount: fields.amount,
      withdrawn_at: fields.withdrawn_at,
    }
  }

  toJSON(): FeeWithdrawnJSON {
    return {
      recipient: this.recipient.toString(),
      settlement_mint: this.settlement_mint.toString(),
      amount: this.amount.toString(),
      withdrawn_at: this.withdrawn_at.toString(),
    }
  }

  static fromJSON(obj: FeeWithdrawnJSON): FeeWithdrawn {
    return new FeeWithdrawn({
      recipient: new PublicKey(obj.recipient),
      settlement_mint: new PublicKey(obj.settlement_mint),
      amount: new BN(obj.amount),
      withdrawn_at: new BN(obj.withdrawn_at),
    })
  }

  toEncodable() {
    return FeeWithdrawn.toEncodable(this)
  }
}
