import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface TierDowngradedFields {
  cm: PublicKey
  authority: PublicKey
  from_tier: number
  to_tier: number
  new_lockup_collateral: BN
  released_collateral: BN
  downgraded_at: BN
}

export interface TierDowngradedJSON {
  cm: string
  authority: string
  from_tier: number
  to_tier: number
  new_lockup_collateral: string
  released_collateral: string
  downgraded_at: string
}

export class TierDowngraded {
  readonly cm: PublicKey
  readonly authority: PublicKey
  readonly from_tier: number
  readonly to_tier: number
  readonly new_lockup_collateral: BN
  readonly released_collateral: BN
  readonly downgraded_at: BN

  constructor(fields: TierDowngradedFields) {
    this.cm = fields.cm
    this.authority = fields.authority
    this.from_tier = fields.from_tier
    this.to_tier = fields.to_tier
    this.new_lockup_collateral = fields.new_lockup_collateral
    this.released_collateral = fields.released_collateral
    this.downgraded_at = fields.downgraded_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("cm"),
        borsh.publicKey("authority"),
        borsh.u8("from_tier"),
        borsh.u8("to_tier"),
        borsh.u64("new_lockup_collateral"),
        borsh.u64("released_collateral"),
        borsh.i64("downgraded_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new TierDowngraded({
      cm: obj.cm,
      authority: obj.authority,
      from_tier: obj.from_tier,
      to_tier: obj.to_tier,
      new_lockup_collateral: obj.new_lockup_collateral,
      released_collateral: obj.released_collateral,
      downgraded_at: obj.downgraded_at,
    })
  }

  static toEncodable(fields: TierDowngradedFields) {
    return {
      cm: fields.cm,
      authority: fields.authority,
      from_tier: fields.from_tier,
      to_tier: fields.to_tier,
      new_lockup_collateral: fields.new_lockup_collateral,
      released_collateral: fields.released_collateral,
      downgraded_at: fields.downgraded_at,
    }
  }

  toJSON(): TierDowngradedJSON {
    return {
      cm: this.cm.toString(),
      authority: this.authority.toString(),
      from_tier: this.from_tier,
      to_tier: this.to_tier,
      new_lockup_collateral: this.new_lockup_collateral.toString(),
      released_collateral: this.released_collateral.toString(),
      downgraded_at: this.downgraded_at.toString(),
    }
  }

  static fromJSON(obj: TierDowngradedJSON): TierDowngraded {
    return new TierDowngraded({
      cm: new PublicKey(obj.cm),
      authority: new PublicKey(obj.authority),
      from_tier: obj.from_tier,
      to_tier: obj.to_tier,
      new_lockup_collateral: new BN(obj.new_lockup_collateral),
      released_collateral: new BN(obj.released_collateral),
      downgraded_at: new BN(obj.downgraded_at),
    })
  }

  toEncodable() {
    return TierDowngraded.toEncodable(this)
  }
}
