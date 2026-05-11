import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PositionLimitUpdatedFields {
  asset_idx: number
  prev_limit_usd_micro: BN
  new_limit_usd_micro: BN
  updated_at: BN
  updated_by: PublicKey
}

export interface PositionLimitUpdatedJSON {
  asset_idx: number
  prev_limit_usd_micro: string
  new_limit_usd_micro: string
  updated_at: string
  updated_by: string
}

export class PositionLimitUpdated {
  readonly asset_idx: number
  readonly prev_limit_usd_micro: BN
  readonly new_limit_usd_micro: BN
  readonly updated_at: BN
  readonly updated_by: PublicKey

  constructor(fields: PositionLimitUpdatedFields) {
    this.asset_idx = fields.asset_idx
    this.prev_limit_usd_micro = fields.prev_limit_usd_micro
    this.new_limit_usd_micro = fields.new_limit_usd_micro
    this.updated_at = fields.updated_at
    this.updated_by = fields.updated_by
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("asset_idx"),
        borsh.u64("prev_limit_usd_micro"),
        borsh.u64("new_limit_usd_micro"),
        borsh.i64("updated_at"),
        borsh.publicKey("updated_by"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new PositionLimitUpdated({
      asset_idx: obj.asset_idx,
      prev_limit_usd_micro: obj.prev_limit_usd_micro,
      new_limit_usd_micro: obj.new_limit_usd_micro,
      updated_at: obj.updated_at,
      updated_by: obj.updated_by,
    })
  }

  static toEncodable(fields: PositionLimitUpdatedFields) {
    return {
      asset_idx: fields.asset_idx,
      prev_limit_usd_micro: fields.prev_limit_usd_micro,
      new_limit_usd_micro: fields.new_limit_usd_micro,
      updated_at: fields.updated_at,
      updated_by: fields.updated_by,
    }
  }

  toJSON(): PositionLimitUpdatedJSON {
    return {
      asset_idx: this.asset_idx,
      prev_limit_usd_micro: this.prev_limit_usd_micro.toString(),
      new_limit_usd_micro: this.new_limit_usd_micro.toString(),
      updated_at: this.updated_at.toString(),
      updated_by: this.updated_by.toString(),
    }
  }

  static fromJSON(obj: PositionLimitUpdatedJSON): PositionLimitUpdated {
    return new PositionLimitUpdated({
      asset_idx: obj.asset_idx,
      prev_limit_usd_micro: new BN(obj.prev_limit_usd_micro),
      new_limit_usd_micro: new BN(obj.new_limit_usd_micro),
      updated_at: new BN(obj.updated_at),
      updated_by: new PublicKey(obj.updated_by),
    })
  }

  toEncodable() {
    return PositionLimitUpdated.toEncodable(this)
  }
}
