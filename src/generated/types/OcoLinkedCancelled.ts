import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface OcoLinkedCancelledFields {
  triggered_order: PublicKey
  cancelled_order: PublicKey
}

export interface OcoLinkedCancelledJSON {
  triggered_order: string
  cancelled_order: string
}

export class OcoLinkedCancelled {
  readonly triggered_order: PublicKey
  readonly cancelled_order: PublicKey

  constructor(fields: OcoLinkedCancelledFields) {
    this.triggered_order = fields.triggered_order
    this.cancelled_order = fields.cancelled_order
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.publicKey("triggered_order"), borsh.publicKey("cancelled_order")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new OcoLinkedCancelled({
      triggered_order: obj.triggered_order,
      cancelled_order: obj.cancelled_order,
    })
  }

  static toEncodable(fields: OcoLinkedCancelledFields) {
    return {
      triggered_order: fields.triggered_order,
      cancelled_order: fields.cancelled_order,
    }
  }

  toJSON(): OcoLinkedCancelledJSON {
    return {
      triggered_order: this.triggered_order.toString(),
      cancelled_order: this.cancelled_order.toString(),
    }
  }

  static fromJSON(obj: OcoLinkedCancelledJSON): OcoLinkedCancelled {
    return new OcoLinkedCancelled({
      triggered_order: new PublicKey(obj.triggered_order),
      cancelled_order: new PublicKey(obj.cancelled_order),
    })
  }

  toEncodable() {
    return OcoLinkedCancelled.toEncodable(this)
  }
}
