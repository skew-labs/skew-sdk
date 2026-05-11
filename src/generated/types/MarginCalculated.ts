import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MarginCalculatedFields {
  cm: PublicKey
  owner: PublicKey
  max_loss_usdc: BN
  position_count: number
  calculated_at: BN
  base_im_micro: BN
  scan_risk_micro: BN
  boundary_micro: BN
  l_a_applied_bps: number
  c_p_applied_bps: number
  tail_addon_micro: BN
  icc_credit_micro: BN
  portfolio_delta_dollar_micro: BN
  portfolio_gamma_dollar_micro: BN
  portfolio_vega_dollar_micro: BN
  portfolio_theta_day_micro: BN
}

export interface MarginCalculatedJSON {
  cm: string
  owner: string
  max_loss_usdc: string
  position_count: number
  calculated_at: string
  base_im_micro: string
  scan_risk_micro: string
  boundary_micro: string
  l_a_applied_bps: number
  c_p_applied_bps: number
  tail_addon_micro: string
  icc_credit_micro: string
  portfolio_delta_dollar_micro: string
  portfolio_gamma_dollar_micro: string
  portfolio_vega_dollar_micro: string
  portfolio_theta_day_micro: string
}

export class MarginCalculated {
  readonly cm: PublicKey
  readonly owner: PublicKey
  readonly max_loss_usdc: BN
  readonly position_count: number
  readonly calculated_at: BN
  readonly base_im_micro: BN
  readonly scan_risk_micro: BN
  readonly boundary_micro: BN
  readonly l_a_applied_bps: number
  readonly c_p_applied_bps: number
  readonly tail_addon_micro: BN
  readonly icc_credit_micro: BN
  readonly portfolio_delta_dollar_micro: BN
  readonly portfolio_gamma_dollar_micro: BN
  readonly portfolio_vega_dollar_micro: BN
  readonly portfolio_theta_day_micro: BN

  constructor(fields: MarginCalculatedFields) {
    this.cm = fields.cm
    this.owner = fields.owner
    this.max_loss_usdc = fields.max_loss_usdc
    this.position_count = fields.position_count
    this.calculated_at = fields.calculated_at
    this.base_im_micro = fields.base_im_micro
    this.scan_risk_micro = fields.scan_risk_micro
    this.boundary_micro = fields.boundary_micro
    this.l_a_applied_bps = fields.l_a_applied_bps
    this.c_p_applied_bps = fields.c_p_applied_bps
    this.tail_addon_micro = fields.tail_addon_micro
    this.icc_credit_micro = fields.icc_credit_micro
    this.portfolio_delta_dollar_micro = fields.portfolio_delta_dollar_micro
    this.portfolio_gamma_dollar_micro = fields.portfolio_gamma_dollar_micro
    this.portfolio_vega_dollar_micro = fields.portfolio_vega_dollar_micro
    this.portfolio_theta_day_micro = fields.portfolio_theta_day_micro
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("cm"),
        borsh.publicKey("owner"),
        borsh.u64("max_loss_usdc"),
        borsh.u8("position_count"),
        borsh.i64("calculated_at"),
        borsh.u64("base_im_micro"),
        borsh.u64("scan_risk_micro"),
        borsh.u64("boundary_micro"),
        borsh.u16("l_a_applied_bps"),
        borsh.u16("c_p_applied_bps"),
        borsh.u64("tail_addon_micro"),
        borsh.u64("icc_credit_micro"),
        borsh.i64("portfolio_delta_dollar_micro"),
        borsh.i64("portfolio_gamma_dollar_micro"),
        borsh.i64("portfolio_vega_dollar_micro"),
        borsh.i64("portfolio_theta_day_micro"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MarginCalculated({
      cm: obj.cm,
      owner: obj.owner,
      max_loss_usdc: obj.max_loss_usdc,
      position_count: obj.position_count,
      calculated_at: obj.calculated_at,
      base_im_micro: obj.base_im_micro,
      scan_risk_micro: obj.scan_risk_micro,
      boundary_micro: obj.boundary_micro,
      l_a_applied_bps: obj.l_a_applied_bps,
      c_p_applied_bps: obj.c_p_applied_bps,
      tail_addon_micro: obj.tail_addon_micro,
      icc_credit_micro: obj.icc_credit_micro,
      portfolio_delta_dollar_micro: obj.portfolio_delta_dollar_micro,
      portfolio_gamma_dollar_micro: obj.portfolio_gamma_dollar_micro,
      portfolio_vega_dollar_micro: obj.portfolio_vega_dollar_micro,
      portfolio_theta_day_micro: obj.portfolio_theta_day_micro,
    })
  }

  static toEncodable(fields: MarginCalculatedFields) {
    return {
      cm: fields.cm,
      owner: fields.owner,
      max_loss_usdc: fields.max_loss_usdc,
      position_count: fields.position_count,
      calculated_at: fields.calculated_at,
      base_im_micro: fields.base_im_micro,
      scan_risk_micro: fields.scan_risk_micro,
      boundary_micro: fields.boundary_micro,
      l_a_applied_bps: fields.l_a_applied_bps,
      c_p_applied_bps: fields.c_p_applied_bps,
      tail_addon_micro: fields.tail_addon_micro,
      icc_credit_micro: fields.icc_credit_micro,
      portfolio_delta_dollar_micro: fields.portfolio_delta_dollar_micro,
      portfolio_gamma_dollar_micro: fields.portfolio_gamma_dollar_micro,
      portfolio_vega_dollar_micro: fields.portfolio_vega_dollar_micro,
      portfolio_theta_day_micro: fields.portfolio_theta_day_micro,
    }
  }

  toJSON(): MarginCalculatedJSON {
    return {
      cm: this.cm.toString(),
      owner: this.owner.toString(),
      max_loss_usdc: this.max_loss_usdc.toString(),
      position_count: this.position_count,
      calculated_at: this.calculated_at.toString(),
      base_im_micro: this.base_im_micro.toString(),
      scan_risk_micro: this.scan_risk_micro.toString(),
      boundary_micro: this.boundary_micro.toString(),
      l_a_applied_bps: this.l_a_applied_bps,
      c_p_applied_bps: this.c_p_applied_bps,
      tail_addon_micro: this.tail_addon_micro.toString(),
      icc_credit_micro: this.icc_credit_micro.toString(),
      portfolio_delta_dollar_micro:
        this.portfolio_delta_dollar_micro.toString(),
      portfolio_gamma_dollar_micro:
        this.portfolio_gamma_dollar_micro.toString(),
      portfolio_vega_dollar_micro: this.portfolio_vega_dollar_micro.toString(),
      portfolio_theta_day_micro: this.portfolio_theta_day_micro.toString(),
    }
  }

  static fromJSON(obj: MarginCalculatedJSON): MarginCalculated {
    return new MarginCalculated({
      cm: new PublicKey(obj.cm),
      owner: new PublicKey(obj.owner),
      max_loss_usdc: new BN(obj.max_loss_usdc),
      position_count: obj.position_count,
      calculated_at: new BN(obj.calculated_at),
      base_im_micro: new BN(obj.base_im_micro),
      scan_risk_micro: new BN(obj.scan_risk_micro),
      boundary_micro: new BN(obj.boundary_micro),
      l_a_applied_bps: obj.l_a_applied_bps,
      c_p_applied_bps: obj.c_p_applied_bps,
      tail_addon_micro: new BN(obj.tail_addon_micro),
      icc_credit_micro: new BN(obj.icc_credit_micro),
      portfolio_delta_dollar_micro: new BN(obj.portfolio_delta_dollar_micro),
      portfolio_gamma_dollar_micro: new BN(obj.portfolio_gamma_dollar_micro),
      portfolio_vega_dollar_micro: new BN(obj.portfolio_vega_dollar_micro),
      portfolio_theta_day_micro: new BN(obj.portfolio_theta_day_micro),
    })
  }

  toEncodable() {
    return MarginCalculated.toEncodable(this)
  }
}
