import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CollateralPolicyEntryFields {
  mint: PublicKey
  decimals: number
  kind: number
  oracle_feed: PublicKey
  max_depeg_bps: number
  padding: Array<number>
}

export interface CollateralPolicyEntryJSON {
  mint: string
  decimals: number
  kind: number
  oracle_feed: string
  max_depeg_bps: number
  padding: Array<number>
}

export class CollateralPolicyEntry {
  readonly mint: PublicKey
  readonly decimals: number
  readonly kind: number
  readonly oracle_feed: PublicKey
  readonly max_depeg_bps: number
  readonly padding: Array<number>

  constructor(fields: CollateralPolicyEntryFields) {
    this.mint = fields.mint
    this.decimals = fields.decimals
    this.kind = fields.kind
    this.oracle_feed = fields.oracle_feed
    this.max_depeg_bps = fields.max_depeg_bps
    this.padding = fields.padding
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("mint"),
        borsh.u8("decimals"),
        borsh.u8("kind"),
        borsh.publicKey("oracle_feed"),
        borsh.u16("max_depeg_bps"),
        borsh.array(borsh.u8(), 8, "padding"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CollateralPolicyEntry({
      mint: obj.mint,
      decimals: obj.decimals,
      kind: obj.kind,
      oracle_feed: obj.oracle_feed,
      max_depeg_bps: obj.max_depeg_bps,
      padding: obj.padding,
    })
  }

  static toEncodable(fields: CollateralPolicyEntryFields) {
    return {
      mint: fields.mint,
      decimals: fields.decimals,
      kind: fields.kind,
      oracle_feed: fields.oracle_feed,
      max_depeg_bps: fields.max_depeg_bps,
      padding: fields.padding,
    }
  }

  toJSON(): CollateralPolicyEntryJSON {
    return {
      mint: this.mint.toString(),
      decimals: this.decimals,
      kind: this.kind,
      oracle_feed: this.oracle_feed.toString(),
      max_depeg_bps: this.max_depeg_bps,
      padding: this.padding,
    }
  }

  static fromJSON(obj: CollateralPolicyEntryJSON): CollateralPolicyEntry {
    return new CollateralPolicyEntry({
      mint: new PublicKey(obj.mint),
      decimals: obj.decimals,
      kind: obj.kind,
      oracle_feed: new PublicKey(obj.oracle_feed),
      max_depeg_bps: obj.max_depeg_bps,
      padding: obj.padding,
    })
  }

  toEncodable() {
    return CollateralPolicyEntry.toEncodable(this)
  }
}
