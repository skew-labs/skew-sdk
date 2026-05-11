import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MakerAxeFields {
  mm: PublicKey
  axe_id: BN
  asset: number
  side: number
  option_type_mask: number
  _pad_0: Array<number>
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
  note_hash: Array<number>
  revoked: boolean
  bump: number
  _pad_1: Array<number>
  created_at: BN
  version_slot: BN
  _reserved: Array<number>
}

export interface MakerAxeJSON {
  mm: string
  axe_id: string
  asset: number
  side: number
  option_type_mask: number
  _pad_0: Array<number>
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
  note_hash: Array<number>
  revoked: boolean
  bump: number
  _pad_1: Array<number>
  created_at: string
  version_slot: string
  _reserved: Array<number>
}

export class MakerAxe {
  readonly mm: PublicKey
  readonly axe_id: BN
  readonly asset: number
  readonly side: number
  readonly option_type_mask: number
  readonly _pad_0: Array<number>
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
  readonly note_hash: Array<number>
  readonly revoked: boolean
  readonly bump: number
  readonly _pad_1: Array<number>
  readonly created_at: BN
  readonly version_slot: BN
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    43, 128, 182, 133, 98, 105, 172, 174,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("mm"),
    borsh.u64("axe_id"),
    borsh.u8("asset"),
    borsh.i8("side"),
    borsh.u16("option_type_mask"),
    borsh.array(borsh.u8(), 4, "_pad_0"),
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
    borsh.array(borsh.u8(), 32, "note_hash"),
    borsh.bool("revoked"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_pad_1"),
    borsh.i64("created_at"),
    borsh.u64("version_slot"),
    borsh.array(borsh.u8(), 32, "_reserved"),
  ])

  constructor(fields: MakerAxeFields) {
    this.mm = fields.mm
    this.axe_id = fields.axe_id
    this.asset = fields.asset
    this.side = fields.side
    this.option_type_mask = fields.option_type_mask
    this._pad_0 = fields._pad_0
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
    this.note_hash = fields.note_hash
    this.revoked = fields.revoked
    this.bump = fields.bump
    this._pad_1 = fields._pad_1
    this.created_at = fields.created_at
    this.version_slot = fields.version_slot
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<MakerAxe | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(programId)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[],
    programId: PublicKey = PROGRAM_ID
  ): Promise<Array<MakerAxe | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(programId)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): MakerAxe {
    if (!data.slice(0, 8).equals(MakerAxe.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = MakerAxe.layout.decode(data.slice(8))

    return new MakerAxe({
      mm: dec.mm,
      axe_id: dec.axe_id,
      asset: dec.asset,
      side: dec.side,
      option_type_mask: dec.option_type_mask,
      _pad_0: dec._pad_0,
      strike_band_lo: dec.strike_band_lo,
      strike_band_hi: dec.strike_band_hi,
      expiry_band_lo: dec.expiry_band_lo,
      expiry_band_hi: dec.expiry_band_hi,
      size_micro: dec.size_micro,
      bid_premium_band_lo: dec.bid_premium_band_lo,
      bid_premium_band_hi: dec.bid_premium_band_hi,
      ask_premium_band_lo: dec.ask_premium_band_lo,
      ask_premium_band_hi: dec.ask_premium_band_hi,
      valid_until: dec.valid_until,
      note_hash: dec.note_hash,
      revoked: dec.revoked,
      bump: dec.bump,
      _pad_1: dec._pad_1,
      created_at: dec.created_at,
      version_slot: dec.version_slot,
      _reserved: dec._reserved,
    })
  }

  toJSON(): MakerAxeJSON {
    return {
      mm: this.mm.toString(),
      axe_id: this.axe_id.toString(),
      asset: this.asset,
      side: this.side,
      option_type_mask: this.option_type_mask,
      _pad_0: this._pad_0,
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
      note_hash: this.note_hash,
      revoked: this.revoked,
      bump: this.bump,
      _pad_1: this._pad_1,
      created_at: this.created_at.toString(),
      version_slot: this.version_slot.toString(),
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: MakerAxeJSON): MakerAxe {
    return new MakerAxe({
      mm: new PublicKey(obj.mm),
      axe_id: new BN(obj.axe_id),
      asset: obj.asset,
      side: obj.side,
      option_type_mask: obj.option_type_mask,
      _pad_0: obj._pad_0,
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
      note_hash: obj.note_hash,
      revoked: obj.revoked,
      bump: obj.bump,
      _pad_1: obj._pad_1,
      created_at: new BN(obj.created_at),
      version_slot: new BN(obj.version_slot),
      _reserved: obj._reserved,
    })
  }
}
