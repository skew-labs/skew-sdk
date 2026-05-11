import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface BuilderRegisteredFields {
  builder_code_pda: PublicKey
  builder: PublicKey
  deposit_locked: BN
  label: Array<number>
  registered_at: BN
}

export interface BuilderRegisteredJSON {
  builder_code_pda: string
  builder: string
  deposit_locked: string
  label: Array<number>
  registered_at: string
}

export class BuilderRegistered {
  readonly builder_code_pda: PublicKey
  readonly builder: PublicKey
  readonly deposit_locked: BN
  readonly label: Array<number>
  readonly registered_at: BN

  constructor(fields: BuilderRegisteredFields) {
    this.builder_code_pda = fields.builder_code_pda
    this.builder = fields.builder
    this.deposit_locked = fields.deposit_locked
    this.label = fields.label
    this.registered_at = fields.registered_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("builder_code_pda"),
        borsh.publicKey("builder"),
        borsh.u64("deposit_locked"),
        borsh.array(borsh.u8(), 32, "label"),
        borsh.i64("registered_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new BuilderRegistered({
      builder_code_pda: obj.builder_code_pda,
      builder: obj.builder,
      deposit_locked: obj.deposit_locked,
      label: obj.label,
      registered_at: obj.registered_at,
    })
  }

  static toEncodable(fields: BuilderRegisteredFields) {
    return {
      builder_code_pda: fields.builder_code_pda,
      builder: fields.builder,
      deposit_locked: fields.deposit_locked,
      label: fields.label,
      registered_at: fields.registered_at,
    }
  }

  toJSON(): BuilderRegisteredJSON {
    return {
      builder_code_pda: this.builder_code_pda.toString(),
      builder: this.builder.toString(),
      deposit_locked: this.deposit_locked.toString(),
      label: this.label,
      registered_at: this.registered_at.toString(),
    }
  }

  static fromJSON(obj: BuilderRegisteredJSON): BuilderRegistered {
    return new BuilderRegistered({
      builder_code_pda: new PublicKey(obj.builder_code_pda),
      builder: new PublicKey(obj.builder),
      deposit_locked: new BN(obj.deposit_locked),
      label: obj.label,
      registered_at: new BN(obj.registered_at),
    })
  }

  toEncodable() {
    return BuilderRegistered.toEncodable(this)
  }
}
