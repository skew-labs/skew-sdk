import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TierUpgradedFields {
  cm: PublicKey
  authority: PublicKey
  from_tier: number
  to_tier: number
  new_lockup_collateral: BN
  tier_locked_until: BN
  upgraded_at: BN
}

export interface TierUpgradedJSON {
  cm: string
  authority: string
  from_tier: number
  to_tier: number
  new_lockup_collateral: string
  tier_locked_until: string
  upgraded_at: string
}

export class TierUpgraded {
  readonly cm: PublicKey
  readonly authority: PublicKey
  readonly from_tier: number
  readonly to_tier: number
  readonly new_lockup_collateral: BN
  readonly tier_locked_until: BN
  readonly upgraded_at: BN

  constructor(fields: TierUpgradedFields) {
    this.cm = fields.cm
    this.authority = fields.authority
    this.from_tier = fields.from_tier
    this.to_tier = fields.to_tier
    this.new_lockup_collateral = fields.new_lockup_collateral
    this.tier_locked_until = fields.tier_locked_until
    this.upgraded_at = fields.upgraded_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("cm"),
        borsh.publicKey("authority"),
        borsh.u8("from_tier"),
        borsh.u8("to_tier"),
        borsh.u64("new_lockup_collateral"),
        borsh.i64("tier_locked_until"),
        borsh.i64("upgraded_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TierUpgraded({
      cm: obj.cm,
      authority: obj.authority,
      from_tier: obj.from_tier,
      to_tier: obj.to_tier,
      new_lockup_collateral: obj.new_lockup_collateral,
      tier_locked_until: obj.tier_locked_until,
      upgraded_at: obj.upgraded_at,
    })
  }

  static toEncodable(fields: TierUpgradedFields) {
    return {
      cm: fields.cm,
      authority: fields.authority,
      from_tier: fields.from_tier,
      to_tier: fields.to_tier,
      new_lockup_collateral: fields.new_lockup_collateral,
      tier_locked_until: fields.tier_locked_until,
      upgraded_at: fields.upgraded_at,
    }
  }

  toJSON(): TierUpgradedJSON {
    return {
      cm: this.cm.toString(),
      authority: this.authority.toString(),
      from_tier: this.from_tier,
      to_tier: this.to_tier,
      new_lockup_collateral: this.new_lockup_collateral.toString(),
      tier_locked_until: this.tier_locked_until.toString(),
      upgraded_at: this.upgraded_at.toString(),
    }
  }

  static fromJSON(obj: TierUpgradedJSON): TierUpgraded {
    return new TierUpgraded({
      cm: new PublicKey(obj.cm),
      authority: new PublicKey(obj.authority),
      from_tier: obj.from_tier,
      to_tier: obj.to_tier,
      new_lockup_collateral: new BN(obj.new_lockup_collateral),
      tier_locked_until: new BN(obj.tier_locked_until),
      upgraded_at: new BN(obj.upgraded_at),
    })
  }

  toEncodable() {
    return TierUpgraded.toEncodable(this)
  }
}
