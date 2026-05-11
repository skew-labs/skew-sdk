import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ConditionalOrderExpiredFields {
  order: PublicKey
  authority: PublicKey
  order_id: BN
  expired_at: BN
  cleanup_caller: PublicKey
}

export interface ConditionalOrderExpiredJSON {
  order: string
  authority: string
  order_id: string
  expired_at: string
  cleanup_caller: string
}

export class ConditionalOrderExpired {
  readonly order: PublicKey
  readonly authority: PublicKey
  readonly order_id: BN
  readonly expired_at: BN
  readonly cleanup_caller: PublicKey

  constructor(fields: ConditionalOrderExpiredFields) {
    this.order = fields.order
    this.authority = fields.authority
    this.order_id = fields.order_id
    this.expired_at = fields.expired_at
    this.cleanup_caller = fields.cleanup_caller
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("order"),
        borsh.publicKey("authority"),
        borsh.u64("order_id"),
        borsh.i64("expired_at"),
        borsh.publicKey("cleanup_caller"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ConditionalOrderExpired({
      order: obj.order,
      authority: obj.authority,
      order_id: obj.order_id,
      expired_at: obj.expired_at,
      cleanup_caller: obj.cleanup_caller,
    })
  }

  static toEncodable(fields: ConditionalOrderExpiredFields) {
    return {
      order: fields.order,
      authority: fields.authority,
      order_id: fields.order_id,
      expired_at: fields.expired_at,
      cleanup_caller: fields.cleanup_caller,
    }
  }

  toJSON(): ConditionalOrderExpiredJSON {
    return {
      order: this.order.toString(),
      authority: this.authority.toString(),
      order_id: this.order_id.toString(),
      expired_at: this.expired_at.toString(),
      cleanup_caller: this.cleanup_caller.toString(),
    }
  }

  static fromJSON(obj: ConditionalOrderExpiredJSON): ConditionalOrderExpired {
    return new ConditionalOrderExpired({
      order: new PublicKey(obj.order),
      authority: new PublicKey(obj.authority),
      order_id: new BN(obj.order_id),
      expired_at: new BN(obj.expired_at),
      cleanup_caller: new PublicKey(obj.cleanup_caller),
    })
  }

  toEncodable() {
    return ConditionalOrderExpired.toEncodable(this)
  }
}
