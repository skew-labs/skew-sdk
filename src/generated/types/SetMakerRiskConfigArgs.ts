import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SetMakerRiskConfigArgsFields {
  quote_off: boolean
  identity_mode: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
}

export interface SetMakerRiskConfigArgsJSON {
  quote_off: boolean
  identity_mode: number
  margin_mode: number
  risk_scope_asset: number
  collateral_scope: number
}

export class SetMakerRiskConfigArgs {
  readonly quote_off: boolean
  readonly identity_mode: number
  readonly margin_mode: number
  readonly risk_scope_asset: number
  readonly collateral_scope: number

  constructor(fields: SetMakerRiskConfigArgsFields) {
    this.quote_off = fields.quote_off
    this.identity_mode = fields.identity_mode
    this.margin_mode = fields.margin_mode
    this.risk_scope_asset = fields.risk_scope_asset
    this.collateral_scope = fields.collateral_scope
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.bool("quote_off"),
        borsh.u8("identity_mode"),
        borsh.u8("margin_mode"),
        borsh.u8("risk_scope_asset"),
        borsh.u8("collateral_scope"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetMakerRiskConfigArgs({
      quote_off: obj.quote_off,
      identity_mode: obj.identity_mode,
      margin_mode: obj.margin_mode,
      risk_scope_asset: obj.risk_scope_asset,
      collateral_scope: obj.collateral_scope,
    })
  }

  static toEncodable(fields: SetMakerRiskConfigArgsFields) {
    return {
      quote_off: fields.quote_off,
      identity_mode: fields.identity_mode,
      margin_mode: fields.margin_mode,
      risk_scope_asset: fields.risk_scope_asset,
      collateral_scope: fields.collateral_scope,
    }
  }

  toJSON(): SetMakerRiskConfigArgsJSON {
    return {
      quote_off: this.quote_off,
      identity_mode: this.identity_mode,
      margin_mode: this.margin_mode,
      risk_scope_asset: this.risk_scope_asset,
      collateral_scope: this.collateral_scope,
    }
  }

  static fromJSON(obj: SetMakerRiskConfigArgsJSON): SetMakerRiskConfigArgs {
    return new SetMakerRiskConfigArgs({
      quote_off: obj.quote_off,
      identity_mode: obj.identity_mode,
      margin_mode: obj.margin_mode,
      risk_scope_asset: obj.risk_scope_asset,
      collateral_scope: obj.collateral_scope,
    })
  }

  toEncodable() {
    return SetMakerRiskConfigArgs.toEncodable(this)
  }
}
