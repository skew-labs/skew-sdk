import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ClearingMemberAccountFields {
  authority: PublicKey
  bump: number
  registered_at: BN
  collateral: BN
  if_contribution: BN
  net_notional_long: BN
  net_notional_short: BN
  positions_count: number
  last_margin_check: BN
  under_liquidation: boolean
  kyc_passed: boolean
  last_im_micro: BN
  tier: types.VerifiedTierKind
  tier_locked_until: BN
  tier_lockup_collateral: BN
  withdraw_24h_total_micro: BN
  last_withdraw_window_start_ts: BN
  total_pm_locked_micro: BN
  whitelist_count: number
  _whitelist_padding: Array<number>
  whitelist: Array<PublicKey>
}

export interface ClearingMemberAccountJSON {
  authority: string
  bump: number
  registered_at: string
  collateral: string
  if_contribution: string
  net_notional_long: string
  net_notional_short: string
  positions_count: number
  last_margin_check: string
  under_liquidation: boolean
  kyc_passed: boolean
  last_im_micro: string
  tier: types.VerifiedTierJSON
  tier_locked_until: string
  tier_lockup_collateral: string
  withdraw_24h_total_micro: string
  last_withdraw_window_start_ts: string
  total_pm_locked_micro: string
  whitelist_count: number
  _whitelist_padding: Array<number>
  whitelist: Array<string>
}

export class ClearingMemberAccount {
  readonly authority: PublicKey
  readonly bump: number
  readonly registered_at: BN
  readonly collateral: BN
  readonly if_contribution: BN
  readonly net_notional_long: BN
  readonly net_notional_short: BN
  readonly positions_count: number
  readonly last_margin_check: BN
  readonly under_liquidation: boolean
  readonly kyc_passed: boolean
  readonly last_im_micro: BN
  readonly tier: types.VerifiedTierKind
  readonly tier_locked_until: BN
  readonly tier_lockup_collateral: BN
  readonly withdraw_24h_total_micro: BN
  readonly last_withdraw_window_start_ts: BN
  readonly total_pm_locked_micro: BN
  readonly whitelist_count: number
  readonly _whitelist_padding: Array<number>
  readonly whitelist: Array<PublicKey>

  static readonly discriminator = Buffer.from([177, 40, 5, 45, 64, 70, 177, 95])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.i64("registered_at"),
    borsh.u64("collateral"),
    borsh.u64("if_contribution"),
    borsh.u64("net_notional_long"),
    borsh.u64("net_notional_short"),
    borsh.u32("positions_count"),
    borsh.i64("last_margin_check"),
    borsh.bool("under_liquidation"),
    borsh.bool("kyc_passed"),
    borsh.u64("last_im_micro"),
    types.VerifiedTier.layout("tier"),
    borsh.i64("tier_locked_until"),
    borsh.u64("tier_lockup_collateral"),
    borsh.u64("withdraw_24h_total_micro"),
    borsh.i64("last_withdraw_window_start_ts"),
    borsh.u64("total_pm_locked_micro"),
    borsh.u8("whitelist_count"),
    borsh.array(borsh.u8(), 7, "_whitelist_padding"),
    borsh.array(borsh.publicKey(), 32, "whitelist"),
  ])

  constructor(fields: ClearingMemberAccountFields) {
    this.authority = fields.authority
    this.bump = fields.bump
    this.registered_at = fields.registered_at
    this.collateral = fields.collateral
    this.if_contribution = fields.if_contribution
    this.net_notional_long = fields.net_notional_long
    this.net_notional_short = fields.net_notional_short
    this.positions_count = fields.positions_count
    this.last_margin_check = fields.last_margin_check
    this.under_liquidation = fields.under_liquidation
    this.kyc_passed = fields.kyc_passed
    this.last_im_micro = fields.last_im_micro
    this.tier = fields.tier
    this.tier_locked_until = fields.tier_locked_until
    this.tier_lockup_collateral = fields.tier_lockup_collateral
    this.withdraw_24h_total_micro = fields.withdraw_24h_total_micro
    this.last_withdraw_window_start_ts = fields.last_withdraw_window_start_ts
    this.total_pm_locked_micro = fields.total_pm_locked_micro
    this.whitelist_count = fields.whitelist_count
    this._whitelist_padding = fields._whitelist_padding
    this.whitelist = fields.whitelist
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ClearingMemberAccount | null> {
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
  ): Promise<Array<ClearingMemberAccount | null>> {
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

  static decode(data: Buffer): ClearingMemberAccount {
    if (!data.slice(0, 8).equals(ClearingMemberAccount.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ClearingMemberAccount.layout.decode(data.slice(8))

    return new ClearingMemberAccount({
      authority: dec.authority,
      bump: dec.bump,
      registered_at: dec.registered_at,
      collateral: dec.collateral,
      if_contribution: dec.if_contribution,
      net_notional_long: dec.net_notional_long,
      net_notional_short: dec.net_notional_short,
      positions_count: dec.positions_count,
      last_margin_check: dec.last_margin_check,
      under_liquidation: dec.under_liquidation,
      kyc_passed: dec.kyc_passed,
      last_im_micro: dec.last_im_micro,
      tier: types.VerifiedTier.fromDecoded(dec.tier),
      tier_locked_until: dec.tier_locked_until,
      tier_lockup_collateral: dec.tier_lockup_collateral,
      withdraw_24h_total_micro: dec.withdraw_24h_total_micro,
      last_withdraw_window_start_ts: dec.last_withdraw_window_start_ts,
      total_pm_locked_micro: dec.total_pm_locked_micro,
      whitelist_count: dec.whitelist_count,
      _whitelist_padding: dec._whitelist_padding,
      whitelist: dec.whitelist,
    })
  }

  toJSON(): ClearingMemberAccountJSON {
    return {
      authority: this.authority.toString(),
      bump: this.bump,
      registered_at: this.registered_at.toString(),
      collateral: this.collateral.toString(),
      if_contribution: this.if_contribution.toString(),
      net_notional_long: this.net_notional_long.toString(),
      net_notional_short: this.net_notional_short.toString(),
      positions_count: this.positions_count,
      last_margin_check: this.last_margin_check.toString(),
      under_liquidation: this.under_liquidation,
      kyc_passed: this.kyc_passed,
      last_im_micro: this.last_im_micro.toString(),
      tier: this.tier.toJSON(),
      tier_locked_until: this.tier_locked_until.toString(),
      tier_lockup_collateral: this.tier_lockup_collateral.toString(),
      withdraw_24h_total_micro: this.withdraw_24h_total_micro.toString(),
      last_withdraw_window_start_ts:
        this.last_withdraw_window_start_ts.toString(),
      total_pm_locked_micro: this.total_pm_locked_micro.toString(),
      whitelist_count: this.whitelist_count,
      _whitelist_padding: this._whitelist_padding,
      whitelist: this.whitelist.map((item) => item.toString()),
    }
  }

  static fromJSON(obj: ClearingMemberAccountJSON): ClearingMemberAccount {
    return new ClearingMemberAccount({
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      registered_at: new BN(obj.registered_at),
      collateral: new BN(obj.collateral),
      if_contribution: new BN(obj.if_contribution),
      net_notional_long: new BN(obj.net_notional_long),
      net_notional_short: new BN(obj.net_notional_short),
      positions_count: obj.positions_count,
      last_margin_check: new BN(obj.last_margin_check),
      under_liquidation: obj.under_liquidation,
      kyc_passed: obj.kyc_passed,
      last_im_micro: new BN(obj.last_im_micro),
      tier: types.VerifiedTier.fromJSON(obj.tier),
      tier_locked_until: new BN(obj.tier_locked_until),
      tier_lockup_collateral: new BN(obj.tier_lockup_collateral),
      withdraw_24h_total_micro: new BN(obj.withdraw_24h_total_micro),
      last_withdraw_window_start_ts: new BN(obj.last_withdraw_window_start_ts),
      total_pm_locked_micro: new BN(obj.total_pm_locked_micro),
      whitelist_count: obj.whitelist_count,
      _whitelist_padding: obj._whitelist_padding,
      whitelist: obj.whitelist.map((item) => new PublicKey(item)),
    })
  }
}
