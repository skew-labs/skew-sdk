import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface RfqMakerRegistryPdaFields {
  mm: PublicKey
  deposit_lamports: BN
  success_count: number
  fail_count: number
  slashable: boolean
  bump: number
  _padding_0: Array<number>
  registered_at: BN
  quote_off: boolean
  identity_mode: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
  mmp_window_start_ts: BN
  mmp_window_fill_count: number
  mmp_window_premium_micro: BN
  mmp_window_notional_micro: BN
  _reserved: Array<number>
  last_quote_slot: BN
  quotes_in_current_slot: number
}

export interface RfqMakerRegistryPdaJSON {
  mm: string
  deposit_lamports: string
  success_count: number
  fail_count: number
  slashable: boolean
  bump: number
  _padding_0: Array<number>
  registered_at: string
  quote_off: boolean
  identity_mode: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
  mmp_window_start_ts: string
  mmp_window_fill_count: number
  mmp_window_premium_micro: string
  mmp_window_notional_micro: string
  _reserved: Array<number>
  last_quote_slot: string
  quotes_in_current_slot: number
}

export class RfqMakerRegistryPda {
  readonly mm: PublicKey
  readonly deposit_lamports: BN
  readonly success_count: number
  readonly fail_count: number
  readonly slashable: boolean
  readonly bump: number
  readonly _padding_0: Array<number>
  readonly registered_at: BN
  readonly quote_off: boolean
  readonly identity_mode: number
  readonly margin_mode: number
  readonly risk_scope_asset: number
  readonly collateral_scope: number
  readonly mmp_window_start_ts: BN
  readonly mmp_window_fill_count: number
  readonly mmp_window_premium_micro: BN
  readonly mmp_window_notional_micro: BN
  readonly _reserved: Array<number>
  readonly last_quote_slot: BN
  readonly quotes_in_current_slot: number

  static readonly discriminator = Buffer.from([
    13, 250, 217, 42, 250, 56, 162, 221,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("mm"),
    borsh.u64("deposit_lamports"),
    borsh.u32("success_count"),
    borsh.u32("fail_count"),
    borsh.bool("slashable"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_padding_0"),
    borsh.i64("registered_at"),
    borsh.bool("quote_off"),
    borsh.u8("identity_mode"),
    borsh.u8("margin_mode"),
    borsh.u8("risk_scope_asset"),
    borsh.u8("collateral_scope"),
    borsh.i64("mmp_window_start_ts"),
    borsh.u16("mmp_window_fill_count"),
    borsh.u64("mmp_window_premium_micro"),
    borsh.u64("mmp_window_notional_micro"),
    borsh.array(borsh.u8(), 1, "_reserved"),
    borsh.u64("last_quote_slot"),
    borsh.u32("quotes_in_current_slot"),
  ])

  constructor(fields: RfqMakerRegistryPdaFields) {
    this.mm = fields.mm
    this.deposit_lamports = fields.deposit_lamports
    this.success_count = fields.success_count
    this.fail_count = fields.fail_count
    this.slashable = fields.slashable
    this.bump = fields.bump
    this._padding_0 = fields._padding_0
    this.registered_at = fields.registered_at
    this.quote_off = fields.quote_off
    this.identity_mode = fields.identity_mode
    this.margin_mode = fields.margin_mode
    this.risk_scope_asset = fields.risk_scope_asset
    this.collateral_scope = fields.collateral_scope
    this.mmp_window_start_ts = fields.mmp_window_start_ts
    this.mmp_window_fill_count = fields.mmp_window_fill_count
    this.mmp_window_premium_micro = fields.mmp_window_premium_micro
    this.mmp_window_notional_micro = fields.mmp_window_notional_micro
    this._reserved = fields._reserved
    this.last_quote_slot = fields.last_quote_slot
    this.quotes_in_current_slot = fields.quotes_in_current_slot
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<RfqMakerRegistryPda | null> {
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
  ): Promise<Array<RfqMakerRegistryPda | null>> {
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

  static decode(data: Buffer): RfqMakerRegistryPda {
    if (!data.slice(0, 8).equals(RfqMakerRegistryPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = RfqMakerRegistryPda.layout.decode(data.slice(8))

    return new RfqMakerRegistryPda({
      mm: dec.mm,
      deposit_lamports: dec.deposit_lamports,
      success_count: dec.success_count,
      fail_count: dec.fail_count,
      slashable: dec.slashable,
      bump: dec.bump,
      _padding_0: dec._padding_0,
      registered_at: dec.registered_at,
      quote_off: dec.quote_off,
      identity_mode: dec.identity_mode,
      margin_mode: dec.margin_mode,
      risk_scope_asset: dec.risk_scope_asset,
      collateral_scope: dec.collateral_scope,
      mmp_window_start_ts: dec.mmp_window_start_ts,
      mmp_window_fill_count: dec.mmp_window_fill_count,
      mmp_window_premium_micro: dec.mmp_window_premium_micro,
      mmp_window_notional_micro: dec.mmp_window_notional_micro,
      _reserved: dec._reserved,
      last_quote_slot: dec.last_quote_slot,
      quotes_in_current_slot: dec.quotes_in_current_slot,
    })
  }

  toJSON(): RfqMakerRegistryPdaJSON {
    return {
      mm: this.mm.toString(),
      deposit_lamports: this.deposit_lamports.toString(),
      success_count: this.success_count,
      fail_count: this.fail_count,
      slashable: this.slashable,
      bump: this.bump,
      _padding_0: this._padding_0,
      registered_at: this.registered_at.toString(),
      quote_off: this.quote_off,
      identity_mode: this.identity_mode,
      margin_mode: this.margin_mode,
      risk_scope_asset: this.risk_scope_asset,
      collateral_scope: this.collateral_scope,
      mmp_window_start_ts: this.mmp_window_start_ts.toString(),
      mmp_window_fill_count: this.mmp_window_fill_count,
      mmp_window_premium_micro: this.mmp_window_premium_micro.toString(),
      mmp_window_notional_micro: this.mmp_window_notional_micro.toString(),
      _reserved: this._reserved,
      last_quote_slot: this.last_quote_slot.toString(),
      quotes_in_current_slot: this.quotes_in_current_slot,
    }
  }

  static fromJSON(obj: RfqMakerRegistryPdaJSON): RfqMakerRegistryPda {
    return new RfqMakerRegistryPda({
      mm: new PublicKey(obj.mm),
      deposit_lamports: new BN(obj.deposit_lamports),
      success_count: obj.success_count,
      fail_count: obj.fail_count,
      slashable: obj.slashable,
      bump: obj.bump,
      _padding_0: obj._padding_0,
      registered_at: new BN(obj.registered_at),
      quote_off: obj.quote_off,
      identity_mode: obj.identity_mode,
      margin_mode: obj.margin_mode,
      risk_scope_asset: obj.risk_scope_asset,
      collateral_scope: obj.collateral_scope,
      mmp_window_start_ts: new BN(obj.mmp_window_start_ts),
      mmp_window_fill_count: obj.mmp_window_fill_count,
      mmp_window_premium_micro: new BN(obj.mmp_window_premium_micro),
      mmp_window_notional_micro: new BN(obj.mmp_window_notional_micro),
      _reserved: obj._reserved,
      last_quote_slot: new BN(obj.last_quote_slot),
      quotes_in_current_slot: obj.quotes_in_current_slot,
    })
  }
}
