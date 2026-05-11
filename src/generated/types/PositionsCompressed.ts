import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PositionsCompressedFields {
  cm: PublicKey
  n_legs_compressed: number
  gross_notional_before: BN
  gross_notional_after: BN
  freed_im_micro: BN
  compressed_at: BN
}

export interface PositionsCompressedJSON {
  cm: string
  n_legs_compressed: number
  gross_notional_before: string
  gross_notional_after: string
  freed_im_micro: string
  compressed_at: string
}

export class PositionsCompressed {
  readonly cm: PublicKey
  readonly n_legs_compressed: number
  readonly gross_notional_before: BN
  readonly gross_notional_after: BN
  readonly freed_im_micro: BN
  readonly compressed_at: BN

  constructor(fields: PositionsCompressedFields) {
    this.cm = fields.cm
    this.n_legs_compressed = fields.n_legs_compressed
    this.gross_notional_before = fields.gross_notional_before
    this.gross_notional_after = fields.gross_notional_after
    this.freed_im_micro = fields.freed_im_micro
    this.compressed_at = fields.compressed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("cm"),
        borsh.u32("n_legs_compressed"),
        borsh.u64("gross_notional_before"),
        borsh.u64("gross_notional_after"),
        borsh.u64("freed_im_micro"),
        borsh.i64("compressed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new PositionsCompressed({
      cm: obj.cm,
      n_legs_compressed: obj.n_legs_compressed,
      gross_notional_before: obj.gross_notional_before,
      gross_notional_after: obj.gross_notional_after,
      freed_im_micro: obj.freed_im_micro,
      compressed_at: obj.compressed_at,
    })
  }

  static toEncodable(fields: PositionsCompressedFields) {
    return {
      cm: fields.cm,
      n_legs_compressed: fields.n_legs_compressed,
      gross_notional_before: fields.gross_notional_before,
      gross_notional_after: fields.gross_notional_after,
      freed_im_micro: fields.freed_im_micro,
      compressed_at: fields.compressed_at,
    }
  }

  toJSON(): PositionsCompressedJSON {
    return {
      cm: this.cm.toString(),
      n_legs_compressed: this.n_legs_compressed,
      gross_notional_before: this.gross_notional_before.toString(),
      gross_notional_after: this.gross_notional_after.toString(),
      freed_im_micro: this.freed_im_micro.toString(),
      compressed_at: this.compressed_at.toString(),
    }
  }

  static fromJSON(obj: PositionsCompressedJSON): PositionsCompressed {
    return new PositionsCompressed({
      cm: new PublicKey(obj.cm),
      n_legs_compressed: obj.n_legs_compressed,
      gross_notional_before: new BN(obj.gross_notional_before),
      gross_notional_after: new BN(obj.gross_notional_after),
      freed_im_micro: new BN(obj.freed_im_micro),
      compressed_at: new BN(obj.compressed_at),
    })
  }

  toEncodable() {
    return PositionsCompressed.toEncodable(this)
  }
}
