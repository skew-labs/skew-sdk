import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MakerRiskConfigUpdatedFields {
  registry: PublicKey
  mm: PublicKey
  quote_off: boolean
  identity_mode: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
  updated_at: BN
}

export interface MakerRiskConfigUpdatedJSON {
  registry: string
  mm: string
  quote_off: boolean
  identity_mode: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
  updated_at: string
}

export class MakerRiskConfigUpdated {
  readonly registry: PublicKey
  readonly mm: PublicKey
  readonly quote_off: boolean
  readonly identity_mode: number
  readonly margin_mode: number
  readonly risk_scope_asset: number
  readonly collateral_scope: number
  readonly updated_at: BN

  constructor(fields: MakerRiskConfigUpdatedFields) {
    this.registry = fields.registry
    this.mm = fields.mm
    this.quote_off = fields.quote_off
    this.identity_mode = fields.identity_mode
    this.margin_mode = fields.margin_mode
    this.risk_scope_asset = fields.risk_scope_asset
    this.collateral_scope = fields.collateral_scope
    this.updated_at = fields.updated_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("registry"),
        borsh.publicKey("mm"),
        borsh.bool("quote_off"),
        borsh.u8("identity_mode"),
        borsh.u8("margin_mode"),
        borsh.u8("risk_scope_asset"),
        borsh.u8("collateral_scope"),
        borsh.i64("updated_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MakerRiskConfigUpdated({
      registry: obj.registry,
      mm: obj.mm,
      quote_off: obj.quote_off,
      identity_mode: obj.identity_mode,
      margin_mode: obj.margin_mode,
      risk_scope_asset: obj.risk_scope_asset,
      collateral_scope: obj.collateral_scope,
      updated_at: obj.updated_at,
    })
  }

  static toEncodable(fields: MakerRiskConfigUpdatedFields) {
    return {
      registry: fields.registry,
      mm: fields.mm,
      quote_off: fields.quote_off,
      identity_mode: fields.identity_mode,
      margin_mode: fields.margin_mode,
      risk_scope_asset: fields.risk_scope_asset,
      collateral_scope: fields.collateral_scope,
      updated_at: fields.updated_at,
    }
  }

  toJSON(): MakerRiskConfigUpdatedJSON {
    return {
      registry: this.registry.toString(),
      mm: this.mm.toString(),
      quote_off: this.quote_off,
      identity_mode: this.identity_mode,
      margin_mode: this.margin_mode,
      risk_scope_asset: this.risk_scope_asset,
      collateral_scope: this.collateral_scope,
      updated_at: this.updated_at.toString(),
    }
  }

  static fromJSON(obj: MakerRiskConfigUpdatedJSON): MakerRiskConfigUpdated {
    return new MakerRiskConfigUpdated({
      registry: new PublicKey(obj.registry),
      mm: new PublicKey(obj.mm),
      quote_off: obj.quote_off,
      identity_mode: obj.identity_mode,
      margin_mode: obj.margin_mode,
      risk_scope_asset: obj.risk_scope_asset,
      collateral_scope: obj.collateral_scope,
      updated_at: new BN(obj.updated_at),
    })
  }

  toEncodable() {
    return MakerRiskConfigUpdated.toEncodable(this)
  }
}
