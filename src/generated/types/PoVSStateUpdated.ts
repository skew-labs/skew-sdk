import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface PoVSStateUpdatedFields {
  povs_state: PublicKey
  asset: number
  last_update_slot: BN
  sigma_t_micro: BN
  sigma_inf_micro: BN
  theta_d_micro: BN
  vrp_rel_micro: BN
  iv_micro: BN
  xi_micro: BN
  regime_indicator_micro: BN
}

export interface PoVSStateUpdatedJSON {
  povs_state: string
  asset: number
  last_update_slot: string
  sigma_t_micro: string
  sigma_inf_micro: string
  theta_d_micro: string
  vrp_rel_micro: string
  iv_micro: string
  xi_micro: string
  regime_indicator_micro: string
}

export class PoVSStateUpdated {
  readonly povs_state: PublicKey
  readonly asset: number
  readonly last_update_slot: BN
  readonly sigma_t_micro: BN
  readonly sigma_inf_micro: BN
  readonly theta_d_micro: BN
  readonly vrp_rel_micro: BN
  readonly iv_micro: BN
  readonly xi_micro: BN
  readonly regime_indicator_micro: BN

  constructor(fields: PoVSStateUpdatedFields) {
    this.povs_state = fields.povs_state
    this.asset = fields.asset
    this.last_update_slot = fields.last_update_slot
    this.sigma_t_micro = fields.sigma_t_micro
    this.sigma_inf_micro = fields.sigma_inf_micro
    this.theta_d_micro = fields.theta_d_micro
    this.vrp_rel_micro = fields.vrp_rel_micro
    this.iv_micro = fields.iv_micro
    this.xi_micro = fields.xi_micro
    this.regime_indicator_micro = fields.regime_indicator_micro
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("povs_state"),
        borsh.u8("asset"),
        borsh.u64("last_update_slot"),
        borsh.u64("sigma_t_micro"),
        borsh.u64("sigma_inf_micro"),
        borsh.u64("theta_d_micro"),
        borsh.i64("vrp_rel_micro"),
        borsh.u64("iv_micro"),
        borsh.i64("xi_micro"),
        borsh.u64("regime_indicator_micro"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new PoVSStateUpdated({
      povs_state: obj.povs_state,
      asset: obj.asset,
      last_update_slot: obj.last_update_slot,
      sigma_t_micro: obj.sigma_t_micro,
      sigma_inf_micro: obj.sigma_inf_micro,
      theta_d_micro: obj.theta_d_micro,
      vrp_rel_micro: obj.vrp_rel_micro,
      iv_micro: obj.iv_micro,
      xi_micro: obj.xi_micro,
      regime_indicator_micro: obj.regime_indicator_micro,
    })
  }

  static toEncodable(fields: PoVSStateUpdatedFields) {
    return {
      povs_state: fields.povs_state,
      asset: fields.asset,
      last_update_slot: fields.last_update_slot,
      sigma_t_micro: fields.sigma_t_micro,
      sigma_inf_micro: fields.sigma_inf_micro,
      theta_d_micro: fields.theta_d_micro,
      vrp_rel_micro: fields.vrp_rel_micro,
      iv_micro: fields.iv_micro,
      xi_micro: fields.xi_micro,
      regime_indicator_micro: fields.regime_indicator_micro,
    }
  }

  toJSON(): PoVSStateUpdatedJSON {
    return {
      povs_state: this.povs_state.toString(),
      asset: this.asset,
      last_update_slot: this.last_update_slot.toString(),
      sigma_t_micro: this.sigma_t_micro.toString(),
      sigma_inf_micro: this.sigma_inf_micro.toString(),
      theta_d_micro: this.theta_d_micro.toString(),
      vrp_rel_micro: this.vrp_rel_micro.toString(),
      iv_micro: this.iv_micro.toString(),
      xi_micro: this.xi_micro.toString(),
      regime_indicator_micro: this.regime_indicator_micro.toString(),
    }
  }

  static fromJSON(obj: PoVSStateUpdatedJSON): PoVSStateUpdated {
    return new PoVSStateUpdated({
      povs_state: new PublicKey(obj.povs_state),
      asset: obj.asset,
      last_update_slot: new BN(obj.last_update_slot),
      sigma_t_micro: new BN(obj.sigma_t_micro),
      sigma_inf_micro: new BN(obj.sigma_inf_micro),
      theta_d_micro: new BN(obj.theta_d_micro),
      vrp_rel_micro: new BN(obj.vrp_rel_micro),
      iv_micro: new BN(obj.iv_micro),
      xi_micro: new BN(obj.xi_micro),
      regime_indicator_micro: new BN(obj.regime_indicator_micro),
    })
  }

  toEncodable() {
    return PoVSStateUpdated.toEncodable(this)
  }
}
