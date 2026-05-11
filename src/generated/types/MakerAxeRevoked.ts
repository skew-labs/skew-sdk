import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MakerAxeRevokedFields {
  axe: PublicKey
  mm: PublicKey
  axe_id: BN
  slot: BN
  revoked_at: BN
}

export interface MakerAxeRevokedJSON {
  axe: string
  mm: string
  axe_id: string
  slot: string
  revoked_at: string
}

export class MakerAxeRevoked {
  readonly axe: PublicKey
  readonly mm: PublicKey
  readonly axe_id: BN
  readonly slot: BN
  readonly revoked_at: BN

  constructor(fields: MakerAxeRevokedFields) {
    this.axe = fields.axe
    this.mm = fields.mm
    this.axe_id = fields.axe_id
    this.slot = fields.slot
    this.revoked_at = fields.revoked_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("axe"),
        borsh.publicKey("mm"),
        borsh.u64("axe_id"),
        borsh.u64("slot"),
        borsh.i64("revoked_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MakerAxeRevoked({
      axe: obj.axe,
      mm: obj.mm,
      axe_id: obj.axe_id,
      slot: obj.slot,
      revoked_at: obj.revoked_at,
    })
  }

  static toEncodable(fields: MakerAxeRevokedFields) {
    return {
      axe: fields.axe,
      mm: fields.mm,
      axe_id: fields.axe_id,
      slot: fields.slot,
      revoked_at: fields.revoked_at,
    }
  }

  toJSON(): MakerAxeRevokedJSON {
    return {
      axe: this.axe.toString(),
      mm: this.mm.toString(),
      axe_id: this.axe_id.toString(),
      slot: this.slot.toString(),
      revoked_at: this.revoked_at.toString(),
    }
  }

  static fromJSON(obj: MakerAxeRevokedJSON): MakerAxeRevoked {
    return new MakerAxeRevoked({
      axe: new PublicKey(obj.axe),
      mm: new PublicKey(obj.mm),
      axe_id: new BN(obj.axe_id),
      slot: new BN(obj.slot),
      revoked_at: new BN(obj.revoked_at),
    })
  }

  toEncodable() {
    return MakerAxeRevoked.toEncodable(this)
  }
}
