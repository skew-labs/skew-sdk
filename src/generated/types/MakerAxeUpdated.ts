import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MakerAxeUpdatedFields {
  axe: PublicKey
  mm: PublicKey
  axe_id: BN
  version_slot: BN
  asset: number
  side: number
  size_micro: BN
  bid_premium_band_lo: BN
  ask_premium_band_lo: BN
  valid_until: BN
  updated_at: BN
}

export interface MakerAxeUpdatedJSON {
  axe: string
  mm: string
  axe_id: string
  version_slot: string
  asset: number
  side: number
  size_micro: string
  bid_premium_band_lo: string
  ask_premium_band_lo: string
  valid_until: string
  updated_at: string
}

export class MakerAxeUpdated {
  readonly axe: PublicKey
  readonly mm: PublicKey
  readonly axe_id: BN
  readonly version_slot: BN
  readonly asset: number
  readonly side: number
  readonly size_micro: BN
  readonly bid_premium_band_lo: BN
  readonly ask_premium_band_lo: BN
  readonly valid_until: BN
  readonly updated_at: BN

  constructor(fields: MakerAxeUpdatedFields) {
    this.axe = fields.axe
    this.mm = fields.mm
    this.axe_id = fields.axe_id
    this.version_slot = fields.version_slot
    this.asset = fields.asset
    this.side = fields.side
    this.size_micro = fields.size_micro
    this.bid_premium_band_lo = fields.bid_premium_band_lo
    this.ask_premium_band_lo = fields.ask_premium_band_lo
    this.valid_until = fields.valid_until
    this.updated_at = fields.updated_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("axe"),
        borsh.publicKey("mm"),
        borsh.u64("axe_id"),
        borsh.u64("version_slot"),
        borsh.u8("asset"),
        borsh.i8("side"),
        borsh.u64("size_micro"),
        borsh.u64("bid_premium_band_lo"),
        borsh.u64("ask_premium_band_lo"),
        borsh.i64("valid_until"),
        borsh.i64("updated_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MakerAxeUpdated({
      axe: obj.axe,
      mm: obj.mm,
      axe_id: obj.axe_id,
      version_slot: obj.version_slot,
      asset: obj.asset,
      side: obj.side,
      size_micro: obj.size_micro,
      bid_premium_band_lo: obj.bid_premium_band_lo,
      ask_premium_band_lo: obj.ask_premium_band_lo,
      valid_until: obj.valid_until,
      updated_at: obj.updated_at,
    })
  }

  static toEncodable(fields: MakerAxeUpdatedFields) {
    return {
      axe: fields.axe,
      mm: fields.mm,
      axe_id: fields.axe_id,
      version_slot: fields.version_slot,
      asset: fields.asset,
      side: fields.side,
      size_micro: fields.size_micro,
      bid_premium_band_lo: fields.bid_premium_band_lo,
      ask_premium_band_lo: fields.ask_premium_band_lo,
      valid_until: fields.valid_until,
      updated_at: fields.updated_at,
    }
  }

  toJSON(): MakerAxeUpdatedJSON {
    return {
      axe: this.axe.toString(),
      mm: this.mm.toString(),
      axe_id: this.axe_id.toString(),
      version_slot: this.version_slot.toString(),
      asset: this.asset,
      side: this.side,
      size_micro: this.size_micro.toString(),
      bid_premium_band_lo: this.bid_premium_band_lo.toString(),
      ask_premium_band_lo: this.ask_premium_band_lo.toString(),
      valid_until: this.valid_until.toString(),
      updated_at: this.updated_at.toString(),
    }
  }

  static fromJSON(obj: MakerAxeUpdatedJSON): MakerAxeUpdated {
    return new MakerAxeUpdated({
      axe: new PublicKey(obj.axe),
      mm: new PublicKey(obj.mm),
      axe_id: new BN(obj.axe_id),
      version_slot: new BN(obj.version_slot),
      asset: obj.asset,
      side: obj.side,
      size_micro: new BN(obj.size_micro),
      bid_premium_band_lo: new BN(obj.bid_premium_band_lo),
      ask_premium_band_lo: new BN(obj.ask_premium_band_lo),
      valid_until: new BN(obj.valid_until),
      updated_at: new BN(obj.updated_at),
    })
  }

  toEncodable() {
    return MakerAxeUpdated.toEncodable(this)
  }
}
