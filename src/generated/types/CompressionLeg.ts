import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CompressionLegFields {
  qty_micro: BN
}

export interface CompressionLegJSON {
  qty_micro: string
}

export class CompressionLeg {
  readonly qty_micro: BN

  constructor(fields: CompressionLegFields) {
    this.qty_micro = fields.qty_micro
  }

  static layout(property?: string) {
    return borsh.struct([borsh.i64("qty_micro")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CompressionLeg({
      qty_micro: obj.qty_micro,
    })
  }

  static toEncodable(fields: CompressionLegFields) {
    return {
      qty_micro: fields.qty_micro,
    }
  }

  toJSON(): CompressionLegJSON {
    return {
      qty_micro: this.qty_micro.toString(),
    }
  }

  static fromJSON(obj: CompressionLegJSON): CompressionLeg {
    return new CompressionLeg({
      qty_micro: new BN(obj.qty_micro),
    })
  }

  toEncodable() {
    return CompressionLeg.toEncodable(this)
  }
}
