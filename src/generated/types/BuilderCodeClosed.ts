import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BuilderCodeClosedFields {
  builder_code_pda: PublicKey
  builder: PublicKey
  deposit_refunded: BN
  final_volume_30d_routed_micro: BN
  closed_at: BN
}

export interface BuilderCodeClosedJSON {
  builder_code_pda: string
  builder: string
  deposit_refunded: string
  final_volume_30d_routed_micro: string
  closed_at: string
}

export class BuilderCodeClosed {
  readonly builder_code_pda: PublicKey
  readonly builder: PublicKey
  readonly deposit_refunded: BN
  readonly final_volume_30d_routed_micro: BN
  readonly closed_at: BN

  constructor(fields: BuilderCodeClosedFields) {
    this.builder_code_pda = fields.builder_code_pda
    this.builder = fields.builder
    this.deposit_refunded = fields.deposit_refunded
    this.final_volume_30d_routed_micro = fields.final_volume_30d_routed_micro
    this.closed_at = fields.closed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("builder_code_pda"),
        borsh.publicKey("builder"),
        borsh.u64("deposit_refunded"),
        borsh.u64("final_volume_30d_routed_micro"),
        borsh.i64("closed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new BuilderCodeClosed({
      builder_code_pda: obj.builder_code_pda,
      builder: obj.builder,
      deposit_refunded: obj.deposit_refunded,
      final_volume_30d_routed_micro: obj.final_volume_30d_routed_micro,
      closed_at: obj.closed_at,
    })
  }

  static toEncodable(fields: BuilderCodeClosedFields) {
    return {
      builder_code_pda: fields.builder_code_pda,
      builder: fields.builder,
      deposit_refunded: fields.deposit_refunded,
      final_volume_30d_routed_micro: fields.final_volume_30d_routed_micro,
      closed_at: fields.closed_at,
    }
  }

  toJSON(): BuilderCodeClosedJSON {
    return {
      builder_code_pda: this.builder_code_pda.toString(),
      builder: this.builder.toString(),
      deposit_refunded: this.deposit_refunded.toString(),
      final_volume_30d_routed_micro:
        this.final_volume_30d_routed_micro.toString(),
      closed_at: this.closed_at.toString(),
    }
  }

  static fromJSON(obj: BuilderCodeClosedJSON): BuilderCodeClosed {
    return new BuilderCodeClosed({
      builder_code_pda: new PublicKey(obj.builder_code_pda),
      builder: new PublicKey(obj.builder),
      deposit_refunded: new BN(obj.deposit_refunded),
      final_volume_30d_routed_micro: new BN(obj.final_volume_30d_routed_micro),
      closed_at: new BN(obj.closed_at),
    })
  }

  toEncodable() {
    return BuilderCodeClosed.toEncodable(this)
  }
}
