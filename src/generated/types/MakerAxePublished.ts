import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MakerAxePublishedFields {
  axe: PublicKey
  mm: PublicKey
  axe_id: BN
  asset: number
  side: number
  option_type_mask: number
  strike_band_lo: BN
  strike_band_hi: BN
  expiry_band_lo: BN
  expiry_band_hi: BN
  size_micro: BN
  bid_premium_band_lo: BN
  bid_premium_band_hi: BN
  ask_premium_band_lo: BN
  ask_premium_band_hi: BN
  valid_until: BN
  created_at: BN
}

export interface MakerAxePublishedJSON {
  axe: string
  mm: string
  axe_id: string
  asset: number
  side: number
  option_type_mask: number
  strike_band_lo: string
  strike_band_hi: string
  expiry_band_lo: string
  expiry_band_hi: string
  size_micro: string
  bid_premium_band_lo: string
  bid_premium_band_hi: string
  ask_premium_band_lo: string
  ask_premium_band_hi: string
  valid_until: string
  created_at: string
}

export class MakerAxePublished {
  readonly axe: PublicKey
  readonly mm: PublicKey
  readonly axe_id: BN
  readonly asset: number
  readonly side: number
  readonly option_type_mask: number
  readonly strike_band_lo: BN
  readonly strike_band_hi: BN
  readonly expiry_band_lo: BN
  readonly expiry_band_hi: BN
  readonly size_micro: BN
  readonly bid_premium_band_lo: BN
  readonly bid_premium_band_hi: BN
  readonly ask_premium_band_lo: BN
  readonly ask_premium_band_hi: BN
  readonly valid_until: BN
  readonly created_at: BN

  constructor(fields: MakerAxePublishedFields) {
    this.axe = fields.axe
    this.mm = fields.mm
    this.axe_id = fields.axe_id
    this.asset = fields.asset
    this.side = fields.side
    this.option_type_mask = fields.option_type_mask
    this.strike_band_lo = fields.strike_band_lo
    this.strike_band_hi = fields.strike_band_hi
    this.expiry_band_lo = fields.expiry_band_lo
    this.expiry_band_hi = fields.expiry_band_hi
    this.size_micro = fields.size_micro
    this.bid_premium_band_lo = fields.bid_premium_band_lo
    this.bid_premium_band_hi = fields.bid_premium_band_hi
    this.ask_premium_band_lo = fields.ask_premium_band_lo
    this.ask_premium_band_hi = fields.ask_premium_band_hi
    this.valid_until = fields.valid_until
    this.created_at = fields.created_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("axe"),
        borsh.publicKey("mm"),
        borsh.u64("axe_id"),
        borsh.u8("asset"),
        borsh.i8("side"),
        borsh.u16("option_type_mask"),
        borsh.u64("strike_band_lo"),
        borsh.u64("strike_band_hi"),
        borsh.i64("expiry_band_lo"),
        borsh.i64("expiry_band_hi"),
        borsh.u64("size_micro"),
        borsh.u64("bid_premium_band_lo"),
        borsh.u64("bid_premium_band_hi"),
        borsh.u64("ask_premium_band_lo"),
        borsh.u64("ask_premium_band_hi"),
        borsh.i64("valid_until"),
        borsh.i64("created_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MakerAxePublished({
      axe: obj.axe,
      mm: obj.mm,
      axe_id: obj.axe_id,
      asset: obj.asset,
      side: obj.side,
      option_type_mask: obj.option_type_mask,
      strike_band_lo: obj.strike_band_lo,
      strike_band_hi: obj.strike_band_hi,
      expiry_band_lo: obj.expiry_band_lo,
      expiry_band_hi: obj.expiry_band_hi,
      size_micro: obj.size_micro,
      bid_premium_band_lo: obj.bid_premium_band_lo,
      bid_premium_band_hi: obj.bid_premium_band_hi,
      ask_premium_band_lo: obj.ask_premium_band_lo,
      ask_premium_band_hi: obj.ask_premium_band_hi,
      valid_until: obj.valid_until,
      created_at: obj.created_at,
    })
  }

  static toEncodable(fields: MakerAxePublishedFields) {
    return {
      axe: fields.axe,
      mm: fields.mm,
      axe_id: fields.axe_id,
      asset: fields.asset,
      side: fields.side,
      option_type_mask: fields.option_type_mask,
      strike_band_lo: fields.strike_band_lo,
      strike_band_hi: fields.strike_band_hi,
      expiry_band_lo: fields.expiry_band_lo,
      expiry_band_hi: fields.expiry_band_hi,
      size_micro: fields.size_micro,
      bid_premium_band_lo: fields.bid_premium_band_lo,
      bid_premium_band_hi: fields.bid_premium_band_hi,
      ask_premium_band_lo: fields.ask_premium_band_lo,
      ask_premium_band_hi: fields.ask_premium_band_hi,
      valid_until: fields.valid_until,
      created_at: fields.created_at,
    }
  }

  toJSON(): MakerAxePublishedJSON {
    return {
      axe: this.axe.toString(),
      mm: this.mm.toString(),
      axe_id: this.axe_id.toString(),
      asset: this.asset,
      side: this.side,
      option_type_mask: this.option_type_mask,
      strike_band_lo: this.strike_band_lo.toString(),
      strike_band_hi: this.strike_band_hi.toString(),
      expiry_band_lo: this.expiry_band_lo.toString(),
      expiry_band_hi: this.expiry_band_hi.toString(),
      size_micro: this.size_micro.toString(),
      bid_premium_band_lo: this.bid_premium_band_lo.toString(),
      bid_premium_band_hi: this.bid_premium_band_hi.toString(),
      ask_premium_band_lo: this.ask_premium_band_lo.toString(),
      ask_premium_band_hi: this.ask_premium_band_hi.toString(),
      valid_until: this.valid_until.toString(),
      created_at: this.created_at.toString(),
    }
  }

  static fromJSON(obj: MakerAxePublishedJSON): MakerAxePublished {
    return new MakerAxePublished({
      axe: new PublicKey(obj.axe),
      mm: new PublicKey(obj.mm),
      axe_id: new BN(obj.axe_id),
      asset: obj.asset,
      side: obj.side,
      option_type_mask: obj.option_type_mask,
      strike_band_lo: new BN(obj.strike_band_lo),
      strike_band_hi: new BN(obj.strike_band_hi),
      expiry_band_lo: new BN(obj.expiry_band_lo),
      expiry_band_hi: new BN(obj.expiry_band_hi),
      size_micro: new BN(obj.size_micro),
      bid_premium_band_lo: new BN(obj.bid_premium_band_lo),
      bid_premium_band_hi: new BN(obj.bid_premium_band_hi),
      ask_premium_band_lo: new BN(obj.ask_premium_band_lo),
      ask_premium_band_hi: new BN(obj.ask_premium_band_hi),
      valid_until: new BN(obj.valid_until),
      created_at: new BN(obj.created_at),
    })
  }

  toEncodable() {
    return MakerAxePublished.toEncodable(this)
  }
}
