import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqMakerSlashedFields {
  registry: PublicKey
  mm: PublicKey
  slasher: PublicKey
  forfeit_lamports: BN
  slashed_at: BN
}

export interface RfqMakerSlashedJSON {
  registry: string
  mm: string
  slasher: string
  forfeit_lamports: string
  slashed_at: string
}

export class RfqMakerSlashed {
  readonly registry: PublicKey
  readonly mm: PublicKey
  readonly slasher: PublicKey
  readonly forfeit_lamports: BN
  readonly slashed_at: BN

  constructor(fields: RfqMakerSlashedFields) {
    this.registry = fields.registry
    this.mm = fields.mm
    this.slasher = fields.slasher
    this.forfeit_lamports = fields.forfeit_lamports
    this.slashed_at = fields.slashed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("registry"),
        borsh.publicKey("mm"),
        borsh.publicKey("slasher"),
        borsh.u64("forfeit_lamports"),
        borsh.i64("slashed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqMakerSlashed({
      registry: obj.registry,
      mm: obj.mm,
      slasher: obj.slasher,
      forfeit_lamports: obj.forfeit_lamports,
      slashed_at: obj.slashed_at,
    })
  }

  static toEncodable(fields: RfqMakerSlashedFields) {
    return {
      registry: fields.registry,
      mm: fields.mm,
      slasher: fields.slasher,
      forfeit_lamports: fields.forfeit_lamports,
      slashed_at: fields.slashed_at,
    }
  }

  toJSON(): RfqMakerSlashedJSON {
    return {
      registry: this.registry.toString(),
      mm: this.mm.toString(),
      slasher: this.slasher.toString(),
      forfeit_lamports: this.forfeit_lamports.toString(),
      slashed_at: this.slashed_at.toString(),
    }
  }

  static fromJSON(obj: RfqMakerSlashedJSON): RfqMakerSlashed {
    return new RfqMakerSlashed({
      registry: new PublicKey(obj.registry),
      mm: new PublicKey(obj.mm),
      slasher: new PublicKey(obj.slasher),
      forfeit_lamports: new BN(obj.forfeit_lamports),
      slashed_at: new BN(obj.slashed_at),
    })
  }

  toEncodable() {
    return RfqMakerSlashed.toEncodable(this)
  }
}
