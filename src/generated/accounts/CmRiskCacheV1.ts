import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CmRiskCacheV1Fields {
  cm: PublicKey
  authority: PublicKey
  registry_hash: Array<number>
  registry_count: number
  dirty: number
  dirty_reason: number
  bump: number
  model_version: number
  l_a_applied_bps: number
  c_p_applied_bps: number
  stress_active: number
  padding0: number
  risk_epoch: BN
  snapshot_slot: BN
  snapshot_ts: BN
  cached_im_micro: BN
  cached_mm_micro: BN
  free_collateral_micro: BN
  base_im_micro: BN
  scan_risk_micro: BN
  boundary_micro: BN
  tail_addon_micro: BN
  icc_credit_micro: BN
  wrong_way_addon_micro: BN
  yield_rho_addon_micro: BN
  standard_im_micro: BN
  tier_candidate_micro: BN
  m_signed: number
  v0_signed: number
  delta_dollar_per_asset: Array<number>
  gamma_dollar_per_asset: Array<number>
  vega_dollar_per_asset: Array<number>
  theta_day_per_asset: Array<number>
  g_p_sq_per_asset: Array<number>
  volga_dollar_per_asset: Array<number>
  vanna_dollar_per_asset: Array<number>
  short_vega_per_asset: Array<number>
  notional_per_asset: Array<number>
  short_notional_per_asset: Array<number>
  short_vega_total: number
  gross_vega_total: number
  max_strike_vega: number
  povs_xi: Array<BN>
  povs_var_99: Array<BN>
  povs_es_999: Array<BN>
  povs_found_mask: number
  hamilton_pi_stress: Array<BN>
  hamilton_found_mask: number
  reserved: Array<number>
}

export interface CmRiskCacheV1JSON {
  cm: string
  authority: string
  registry_hash: Array<number>
  registry_count: number
  dirty: number
  dirty_reason: number
  bump: number
  model_version: number
  l_a_applied_bps: number
  c_p_applied_bps: number
  stress_active: number
  padding0: number
  risk_epoch: string
  snapshot_slot: string
  snapshot_ts: string
  cached_im_micro: string
  cached_mm_micro: string
  free_collateral_micro: string
  base_im_micro: string
  scan_risk_micro: string
  boundary_micro: string
  tail_addon_micro: string
  icc_credit_micro: string
  wrong_way_addon_micro: string
  yield_rho_addon_micro: string
  standard_im_micro: string
  tier_candidate_micro: string
  m_signed: number
  v0_signed: number
  delta_dollar_per_asset: Array<number>
  gamma_dollar_per_asset: Array<number>
  vega_dollar_per_asset: Array<number>
  theta_day_per_asset: Array<number>
  g_p_sq_per_asset: Array<number>
  volga_dollar_per_asset: Array<number>
  vanna_dollar_per_asset: Array<number>
  short_vega_per_asset: Array<number>
  notional_per_asset: Array<number>
  short_notional_per_asset: Array<number>
  short_vega_total: number
  gross_vega_total: number
  max_strike_vega: number
  povs_xi: Array<string>
  povs_var_99: Array<string>
  povs_es_999: Array<string>
  povs_found_mask: number
  hamilton_pi_stress: Array<string>
  hamilton_found_mask: number
  reserved: Array<number>
}

export class CmRiskCacheV1 {
  readonly cm: PublicKey
  readonly authority: PublicKey
  readonly registry_hash: Array<number>
  readonly registry_count: number
  readonly dirty: number
  readonly dirty_reason: number
  readonly bump: number
  readonly model_version: number
  readonly l_a_applied_bps: number
  readonly c_p_applied_bps: number
  readonly stress_active: number
  readonly padding0: number
  readonly risk_epoch: BN
  readonly snapshot_slot: BN
  readonly snapshot_ts: BN
  readonly cached_im_micro: BN
  readonly cached_mm_micro: BN
  readonly free_collateral_micro: BN
  readonly base_im_micro: BN
  readonly scan_risk_micro: BN
  readonly boundary_micro: BN
  readonly tail_addon_micro: BN
  readonly icc_credit_micro: BN
  readonly wrong_way_addon_micro: BN
  readonly yield_rho_addon_micro: BN
  readonly standard_im_micro: BN
  readonly tier_candidate_micro: BN
  readonly m_signed: number
  readonly v0_signed: number
  readonly delta_dollar_per_asset: Array<number>
  readonly gamma_dollar_per_asset: Array<number>
  readonly vega_dollar_per_asset: Array<number>
  readonly theta_day_per_asset: Array<number>
  readonly g_p_sq_per_asset: Array<number>
  readonly volga_dollar_per_asset: Array<number>
  readonly vanna_dollar_per_asset: Array<number>
  readonly short_vega_per_asset: Array<number>
  readonly notional_per_asset: Array<number>
  readonly short_notional_per_asset: Array<number>
  readonly short_vega_total: number
  readonly gross_vega_total: number
  readonly max_strike_vega: number
  readonly povs_xi: Array<BN>
  readonly povs_var_99: Array<BN>
  readonly povs_es_999: Array<BN>
  readonly povs_found_mask: number
  readonly hamilton_pi_stress: Array<BN>
  readonly hamilton_found_mask: number
  readonly reserved: Array<number>

  static readonly discriminator = Buffer.from([
    143, 254, 193, 133, 232, 249, 187, 250,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("cm"),
    borsh.publicKey("authority"),
    borsh.array(borsh.u8(), 32, "registry_hash"),
    borsh.u8("registry_count"),
    borsh.u8("dirty"),
    borsh.u8("dirty_reason"),
    borsh.u8("bump"),
    borsh.u16("model_version"),
    borsh.u16("l_a_applied_bps"),
    borsh.u16("c_p_applied_bps"),
    borsh.u8("stress_active"),
    borsh.u8("padding0"),
    borsh.u64("risk_epoch"),
    borsh.u64("snapshot_slot"),
    borsh.i64("snapshot_ts"),
    borsh.u64("cached_im_micro"),
    borsh.u64("cached_mm_micro"),
    borsh.u64("free_collateral_micro"),
    borsh.u64("base_im_micro"),
    borsh.u64("scan_risk_micro"),
    borsh.u64("boundary_micro"),
    borsh.u64("tail_addon_micro"),
    borsh.u64("icc_credit_micro"),
    borsh.u64("wrong_way_addon_micro"),
    borsh.u64("yield_rho_addon_micro"),
    borsh.u64("standard_im_micro"),
    borsh.u64("tier_candidate_micro"),
    borsh.f64("m_signed"),
    borsh.f64("v0_signed"),
    borsh.array(borsh.f64(), 5, "delta_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "gamma_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "vega_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "theta_day_per_asset"),
    borsh.array(borsh.f64(), 5, "g_p_sq_per_asset"),
    borsh.array(borsh.f64(), 5, "volga_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "vanna_dollar_per_asset"),
    borsh.array(borsh.f64(), 5, "short_vega_per_asset"),
    borsh.array(borsh.f64(), 5, "notional_per_asset"),
    borsh.array(borsh.f64(), 5, "short_notional_per_asset"),
    borsh.f64("short_vega_total"),
    borsh.f64("gross_vega_total"),
    borsh.f64("max_strike_vega"),
    borsh.array(borsh.i64(), 5, "povs_xi"),
    borsh.array(borsh.u64(), 5, "povs_var_99"),
    borsh.array(borsh.u64(), 5, "povs_es_999"),
    borsh.u8("povs_found_mask"),
    borsh.array(borsh.u64(), 5, "hamilton_pi_stress"),
    borsh.u8("hamilton_found_mask"),
    borsh.array(borsh.u8(), 63, "reserved"),
  ])

  constructor(fields: CmRiskCacheV1Fields) {
    this.cm = fields.cm
    this.authority = fields.authority
    this.registry_hash = fields.registry_hash
    this.registry_count = fields.registry_count
    this.dirty = fields.dirty
    this.dirty_reason = fields.dirty_reason
    this.bump = fields.bump
    this.model_version = fields.model_version
    this.l_a_applied_bps = fields.l_a_applied_bps
    this.c_p_applied_bps = fields.c_p_applied_bps
    this.stress_active = fields.stress_active
    this.padding0 = fields.padding0
    this.risk_epoch = fields.risk_epoch
    this.snapshot_slot = fields.snapshot_slot
    this.snapshot_ts = fields.snapshot_ts
    this.cached_im_micro = fields.cached_im_micro
    this.cached_mm_micro = fields.cached_mm_micro
    this.free_collateral_micro = fields.free_collateral_micro
    this.base_im_micro = fields.base_im_micro
    this.scan_risk_micro = fields.scan_risk_micro
    this.boundary_micro = fields.boundary_micro
    this.tail_addon_micro = fields.tail_addon_micro
    this.icc_credit_micro = fields.icc_credit_micro
    this.wrong_way_addon_micro = fields.wrong_way_addon_micro
    this.yield_rho_addon_micro = fields.yield_rho_addon_micro
    this.standard_im_micro = fields.standard_im_micro
    this.tier_candidate_micro = fields.tier_candidate_micro
    this.m_signed = fields.m_signed
    this.v0_signed = fields.v0_signed
    this.delta_dollar_per_asset = fields.delta_dollar_per_asset
    this.gamma_dollar_per_asset = fields.gamma_dollar_per_asset
    this.vega_dollar_per_asset = fields.vega_dollar_per_asset
    this.theta_day_per_asset = fields.theta_day_per_asset
    this.g_p_sq_per_asset = fields.g_p_sq_per_asset
    this.volga_dollar_per_asset = fields.volga_dollar_per_asset
    this.vanna_dollar_per_asset = fields.vanna_dollar_per_asset
    this.short_vega_per_asset = fields.short_vega_per_asset
    this.notional_per_asset = fields.notional_per_asset
    this.short_notional_per_asset = fields.short_notional_per_asset
    this.short_vega_total = fields.short_vega_total
    this.gross_vega_total = fields.gross_vega_total
    this.max_strike_vega = fields.max_strike_vega
    this.povs_xi = fields.povs_xi
    this.povs_var_99 = fields.povs_var_99
    this.povs_es_999 = fields.povs_es_999
    this.povs_found_mask = fields.povs_found_mask
    this.hamilton_pi_stress = fields.hamilton_pi_stress
    this.hamilton_found_mask = fields.hamilton_found_mask
    this.reserved = fields.reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<CmRiskCacheV1 | null> {
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
  ): Promise<Array<CmRiskCacheV1 | null>> {
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

  static decode(data: Buffer): CmRiskCacheV1 {
    if (!data.slice(0, 8).equals(CmRiskCacheV1.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = CmRiskCacheV1.layout.decode(data.slice(8))

    return new CmRiskCacheV1({
      cm: dec.cm,
      authority: dec.authority,
      registry_hash: dec.registry_hash,
      registry_count: dec.registry_count,
      dirty: dec.dirty,
      dirty_reason: dec.dirty_reason,
      bump: dec.bump,
      model_version: dec.model_version,
      l_a_applied_bps: dec.l_a_applied_bps,
      c_p_applied_bps: dec.c_p_applied_bps,
      stress_active: dec.stress_active,
      padding0: dec.padding0,
      risk_epoch: dec.risk_epoch,
      snapshot_slot: dec.snapshot_slot,
      snapshot_ts: dec.snapshot_ts,
      cached_im_micro: dec.cached_im_micro,
      cached_mm_micro: dec.cached_mm_micro,
      free_collateral_micro: dec.free_collateral_micro,
      base_im_micro: dec.base_im_micro,
      scan_risk_micro: dec.scan_risk_micro,
      boundary_micro: dec.boundary_micro,
      tail_addon_micro: dec.tail_addon_micro,
      icc_credit_micro: dec.icc_credit_micro,
      wrong_way_addon_micro: dec.wrong_way_addon_micro,
      yield_rho_addon_micro: dec.yield_rho_addon_micro,
      standard_im_micro: dec.standard_im_micro,
      tier_candidate_micro: dec.tier_candidate_micro,
      m_signed: dec.m_signed,
      v0_signed: dec.v0_signed,
      delta_dollar_per_asset: dec.delta_dollar_per_asset,
      gamma_dollar_per_asset: dec.gamma_dollar_per_asset,
      vega_dollar_per_asset: dec.vega_dollar_per_asset,
      theta_day_per_asset: dec.theta_day_per_asset,
      g_p_sq_per_asset: dec.g_p_sq_per_asset,
      volga_dollar_per_asset: dec.volga_dollar_per_asset,
      vanna_dollar_per_asset: dec.vanna_dollar_per_asset,
      short_vega_per_asset: dec.short_vega_per_asset,
      notional_per_asset: dec.notional_per_asset,
      short_notional_per_asset: dec.short_notional_per_asset,
      short_vega_total: dec.short_vega_total,
      gross_vega_total: dec.gross_vega_total,
      max_strike_vega: dec.max_strike_vega,
      povs_xi: dec.povs_xi,
      povs_var_99: dec.povs_var_99,
      povs_es_999: dec.povs_es_999,
      povs_found_mask: dec.povs_found_mask,
      hamilton_pi_stress: dec.hamilton_pi_stress,
      hamilton_found_mask: dec.hamilton_found_mask,
      reserved: dec.reserved,
    })
  }

  toJSON(): CmRiskCacheV1JSON {
    return {
      cm: this.cm.toString(),
      authority: this.authority.toString(),
      registry_hash: this.registry_hash,
      registry_count: this.registry_count,
      dirty: this.dirty,
      dirty_reason: this.dirty_reason,
      bump: this.bump,
      model_version: this.model_version,
      l_a_applied_bps: this.l_a_applied_bps,
      c_p_applied_bps: this.c_p_applied_bps,
      stress_active: this.stress_active,
      padding0: this.padding0,
      risk_epoch: this.risk_epoch.toString(),
      snapshot_slot: this.snapshot_slot.toString(),
      snapshot_ts: this.snapshot_ts.toString(),
      cached_im_micro: this.cached_im_micro.toString(),
      cached_mm_micro: this.cached_mm_micro.toString(),
      free_collateral_micro: this.free_collateral_micro.toString(),
      base_im_micro: this.base_im_micro.toString(),
      scan_risk_micro: this.scan_risk_micro.toString(),
      boundary_micro: this.boundary_micro.toString(),
      tail_addon_micro: this.tail_addon_micro.toString(),
      icc_credit_micro: this.icc_credit_micro.toString(),
      wrong_way_addon_micro: this.wrong_way_addon_micro.toString(),
      yield_rho_addon_micro: this.yield_rho_addon_micro.toString(),
      standard_im_micro: this.standard_im_micro.toString(),
      tier_candidate_micro: this.tier_candidate_micro.toString(),
      m_signed: this.m_signed,
      v0_signed: this.v0_signed,
      delta_dollar_per_asset: this.delta_dollar_per_asset,
      gamma_dollar_per_asset: this.gamma_dollar_per_asset,
      vega_dollar_per_asset: this.vega_dollar_per_asset,
      theta_day_per_asset: this.theta_day_per_asset,
      g_p_sq_per_asset: this.g_p_sq_per_asset,
      volga_dollar_per_asset: this.volga_dollar_per_asset,
      vanna_dollar_per_asset: this.vanna_dollar_per_asset,
      short_vega_per_asset: this.short_vega_per_asset,
      notional_per_asset: this.notional_per_asset,
      short_notional_per_asset: this.short_notional_per_asset,
      short_vega_total: this.short_vega_total,
      gross_vega_total: this.gross_vega_total,
      max_strike_vega: this.max_strike_vega,
      povs_xi: this.povs_xi.map((item) => item.toString()),
      povs_var_99: this.povs_var_99.map((item) => item.toString()),
      povs_es_999: this.povs_es_999.map((item) => item.toString()),
      povs_found_mask: this.povs_found_mask,
      hamilton_pi_stress: this.hamilton_pi_stress.map((item) =>
        item.toString()
      ),
      hamilton_found_mask: this.hamilton_found_mask,
      reserved: this.reserved,
    }
  }

  static fromJSON(obj: CmRiskCacheV1JSON): CmRiskCacheV1 {
    return new CmRiskCacheV1({
      cm: new PublicKey(obj.cm),
      authority: new PublicKey(obj.authority),
      registry_hash: obj.registry_hash,
      registry_count: obj.registry_count,
      dirty: obj.dirty,
      dirty_reason: obj.dirty_reason,
      bump: obj.bump,
      model_version: obj.model_version,
      l_a_applied_bps: obj.l_a_applied_bps,
      c_p_applied_bps: obj.c_p_applied_bps,
      stress_active: obj.stress_active,
      padding0: obj.padding0,
      risk_epoch: new BN(obj.risk_epoch),
      snapshot_slot: new BN(obj.snapshot_slot),
      snapshot_ts: new BN(obj.snapshot_ts),
      cached_im_micro: new BN(obj.cached_im_micro),
      cached_mm_micro: new BN(obj.cached_mm_micro),
      free_collateral_micro: new BN(obj.free_collateral_micro),
      base_im_micro: new BN(obj.base_im_micro),
      scan_risk_micro: new BN(obj.scan_risk_micro),
      boundary_micro: new BN(obj.boundary_micro),
      tail_addon_micro: new BN(obj.tail_addon_micro),
      icc_credit_micro: new BN(obj.icc_credit_micro),
      wrong_way_addon_micro: new BN(obj.wrong_way_addon_micro),
      yield_rho_addon_micro: new BN(obj.yield_rho_addon_micro),
      standard_im_micro: new BN(obj.standard_im_micro),
      tier_candidate_micro: new BN(obj.tier_candidate_micro),
      m_signed: obj.m_signed,
      v0_signed: obj.v0_signed,
      delta_dollar_per_asset: obj.delta_dollar_per_asset,
      gamma_dollar_per_asset: obj.gamma_dollar_per_asset,
      vega_dollar_per_asset: obj.vega_dollar_per_asset,
      theta_day_per_asset: obj.theta_day_per_asset,
      g_p_sq_per_asset: obj.g_p_sq_per_asset,
      volga_dollar_per_asset: obj.volga_dollar_per_asset,
      vanna_dollar_per_asset: obj.vanna_dollar_per_asset,
      short_vega_per_asset: obj.short_vega_per_asset,
      notional_per_asset: obj.notional_per_asset,
      short_notional_per_asset: obj.short_notional_per_asset,
      short_vega_total: obj.short_vega_total,
      gross_vega_total: obj.gross_vega_total,
      max_strike_vega: obj.max_strike_vega,
      povs_xi: obj.povs_xi.map((item) => new BN(item)),
      povs_var_99: obj.povs_var_99.map((item) => new BN(item)),
      povs_es_999: obj.povs_es_999.map((item) => new BN(item)),
      povs_found_mask: obj.povs_found_mask,
      hamilton_pi_stress: obj.hamilton_pi_stress.map((item) => new BN(item)),
      hamilton_found_mask: obj.hamilton_found_mask,
      reserved: obj.reserved,
    })
  }
}
