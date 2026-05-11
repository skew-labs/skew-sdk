import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoveryDeterminationExecutedFields {
  determination: PublicKey
  id: BN
  approval_count: number
  executed_at_slot: BN
}

export interface RecoveryDeterminationExecutedJSON {
  determination: string
  id: string
  approval_count: number
  executed_at_slot: string
}

export class RecoveryDeterminationExecuted {
  readonly determination: PublicKey
  readonly id: BN
  readonly approval_count: number
  readonly executed_at_slot: BN

  constructor(fields: RecoveryDeterminationExecutedFields) {
    this.determination = fields.determination
    this.id = fields.id
    this.approval_count = fields.approval_count
    this.executed_at_slot = fields.executed_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("determination"),
        borsh.u64("id"),
        borsh.u8("approval_count"),
        borsh.u64("executed_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoveryDeterminationExecuted({
      determination: obj.determination,
      id: obj.id,
      approval_count: obj.approval_count,
      executed_at_slot: obj.executed_at_slot,
    })
  }

  static toEncodable(fields: RecoveryDeterminationExecutedFields) {
    return {
      determination: fields.determination,
      id: fields.id,
      approval_count: fields.approval_count,
      executed_at_slot: fields.executed_at_slot,
    }
  }

  toJSON(): RecoveryDeterminationExecutedJSON {
    return {
      determination: this.determination.toString(),
      id: this.id.toString(),
      approval_count: this.approval_count,
      executed_at_slot: this.executed_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: RecoveryDeterminationExecutedJSON
  ): RecoveryDeterminationExecuted {
    return new RecoveryDeterminationExecuted({
      determination: new PublicKey(obj.determination),
      id: new BN(obj.id),
      approval_count: obj.approval_count,
      executed_at_slot: new BN(obj.executed_at_slot),
    })
  }

  toEncodable() {
    return RecoveryDeterminationExecuted.toEncodable(this)
  }
}
