import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PoVSStateFields {
  asset: number
  padding_0: Array<number>
  last_update_slot: BN
  sigma_t_micro: BN
  sigma_inf_micro: BN
  theta_d_micro: BN
  vrp_rel_micro: BN
  iv_micro: BN
  p_max_micro: BN
  xi_micro: BN
  beta_micro: BN
  var_99_micro: BN
  es_999_micro: BN
  regime_indicator_micro: BN
  returns_buf: Array<number>
  returns_idx: number
  returns_count: number
  padding_1: Array<number>
  iv_history: Array<types.IvHistoryEntryFields>
  iv_idx: number
  bump: number
  padding_2: Array<number>
  sigma_inf_window: number
  confidence_bps: number
  padding_3: Array<number>
}

export interface PoVSStateJSON {
  asset: number
  padding_0: Array<number>
  last_update_slot: string
  sigma_t_micro: string
  sigma_inf_micro: string
  theta_d_micro: string
  vrp_rel_micro: string
  iv_micro: string
  p_max_micro: string
  xi_micro: string
  beta_micro: string
  var_99_micro: string
  es_999_micro: string
  regime_indicator_micro: string
  returns_buf: Array<number>
  returns_idx: number
  returns_count: number
  padding_1: Array<number>
  iv_history: Array<types.IvHistoryEntryJSON>
  iv_idx: number
  bump: number
  padding_2: Array<number>
  sigma_inf_window: number
  confidence_bps: number
  padding_3: Array<number>
}

export class PoVSState {
  readonly asset: number
  readonly padding_0: Array<number>
  readonly last_update_slot: BN
  readonly sigma_t_micro: BN
  readonly sigma_inf_micro: BN
  readonly theta_d_micro: BN
  readonly vrp_rel_micro: BN
  readonly iv_micro: BN
  readonly p_max_micro: BN
  readonly xi_micro: BN
  readonly beta_micro: BN
  readonly var_99_micro: BN
  readonly es_999_micro: BN
  readonly regime_indicator_micro: BN
  readonly returns_buf: Array<number>
  readonly returns_idx: number
  readonly returns_count: number
  readonly padding_1: Array<number>
  readonly iv_history: Array<types.IvHistoryEntry>
  readonly iv_idx: number
  readonly bump: number
  readonly padding_2: Array<number>
  readonly sigma_inf_window: number
  readonly confidence_bps: number
  readonly padding_3: Array<number>

  static readonly discriminator = Buffer.from([
    149, 244, 246, 77, 17, 244, 185, 13,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("asset"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("sigma_t_micro"),
    borsh.u64("sigma_inf_micro"),
    borsh.u64("theta_d_micro"),
    borsh.i64("vrp_rel_micro"),
    borsh.u64("iv_micro"),
    borsh.u64("p_max_micro"),
    borsh.i64("xi_micro"),
    borsh.u64("beta_micro"),
    borsh.u64("var_99_micro"),
    borsh.u64("es_999_micro"),
    borsh.u64("regime_indicator_micro"),
    borsh.array(borsh.i32(), 720, "returns_buf"),
    borsh.u16("returns_idx"),
    borsh.u16("returns_count"),
    borsh.array(borsh.u8(), 4, "padding_1"),
    borsh.array(types.IvHistoryEntry.layout(), 90, "iv_history"),
    borsh.u8("iv_idx"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding_2"),
    borsh.u32("sigma_inf_window"),
    borsh.u16("confidence_bps"),
    borsh.array(borsh.u8(), 2, "padding_3"),
  ])

  constructor(fields: PoVSStateFields) {
    this.asset = fields.asset
    this.padding_0 = fields.padding_0
    this.last_update_slot = fields.last_update_slot
    this.sigma_t_micro = fields.sigma_t_micro
    this.sigma_inf_micro = fields.sigma_inf_micro
    this.theta_d_micro = fields.theta_d_micro
    this.vrp_rel_micro = fields.vrp_rel_micro
    this.iv_micro = fields.iv_micro
    this.p_max_micro = fields.p_max_micro
    this.xi_micro = fields.xi_micro
    this.beta_micro = fields.beta_micro
    this.var_99_micro = fields.var_99_micro
    this.es_999_micro = fields.es_999_micro
    this.regime_indicator_micro = fields.regime_indicator_micro
    this.returns_buf = fields.returns_buf
    this.returns_idx = fields.returns_idx
    this.returns_count = fields.returns_count
    this.padding_1 = fields.padding_1
    this.iv_history = fields.iv_history.map(
      (item) => new types.IvHistoryEntry({ ...item })
    )
    this.iv_idx = fields.iv_idx
    this.bump = fields.bump
    this.padding_2 = fields.padding_2
    this.sigma_inf_window = fields.sigma_inf_window
    this.confidence_bps = fields.confidence_bps
    this.padding_3 = fields.padding_3
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PoVSState | null> {
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
  ): Promise<Array<PoVSState | null>> {
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

  static decode(data: Buffer): PoVSState {
    if (!data.slice(0, 8).equals(PoVSState.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PoVSState.layout.decode(data.slice(8))

    return new PoVSState({
      asset: dec.asset,
      padding_0: dec.padding_0,
      last_update_slot: dec.last_update_slot,
      sigma_t_micro: dec.sigma_t_micro,
      sigma_inf_micro: dec.sigma_inf_micro,
      theta_d_micro: dec.theta_d_micro,
      vrp_rel_micro: dec.vrp_rel_micro,
      iv_micro: dec.iv_micro,
      p_max_micro: dec.p_max_micro,
      xi_micro: dec.xi_micro,
      beta_micro: dec.beta_micro,
      var_99_micro: dec.var_99_micro,
      es_999_micro: dec.es_999_micro,
      regime_indicator_micro: dec.regime_indicator_micro,
      returns_buf: dec.returns_buf,
      returns_idx: dec.returns_idx,
      returns_count: dec.returns_count,
      padding_1: dec.padding_1,
      iv_history: dec.iv_history.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.IvHistoryEntry.fromDecoded(item)
      ),
      iv_idx: dec.iv_idx,
      bump: dec.bump,
      padding_2: dec.padding_2,
      sigma_inf_window: dec.sigma_inf_window,
      confidence_bps: dec.confidence_bps,
      padding_3: dec.padding_3,
    })
  }

  toJSON(): PoVSStateJSON {
    return {
      asset: this.asset,
      padding_0: this.padding_0,
      last_update_slot: this.last_update_slot.toString(),
      sigma_t_micro: this.sigma_t_micro.toString(),
      sigma_inf_micro: this.sigma_inf_micro.toString(),
      theta_d_micro: this.theta_d_micro.toString(),
      vrp_rel_micro: this.vrp_rel_micro.toString(),
      iv_micro: this.iv_micro.toString(),
      p_max_micro: this.p_max_micro.toString(),
      xi_micro: this.xi_micro.toString(),
      beta_micro: this.beta_micro.toString(),
      var_99_micro: this.var_99_micro.toString(),
      es_999_micro: this.es_999_micro.toString(),
      regime_indicator_micro: this.regime_indicator_micro.toString(),
      returns_buf: this.returns_buf,
      returns_idx: this.returns_idx,
      returns_count: this.returns_count,
      padding_1: this.padding_1,
      iv_history: this.iv_history.map((item) => item.toJSON()),
      iv_idx: this.iv_idx,
      bump: this.bump,
      padding_2: this.padding_2,
      sigma_inf_window: this.sigma_inf_window,
      confidence_bps: this.confidence_bps,
      padding_3: this.padding_3,
    }
  }

  static fromJSON(obj: PoVSStateJSON): PoVSState {
    return new PoVSState({
      asset: obj.asset,
      padding_0: obj.padding_0,
      last_update_slot: new BN(obj.last_update_slot),
      sigma_t_micro: new BN(obj.sigma_t_micro),
      sigma_inf_micro: new BN(obj.sigma_inf_micro),
      theta_d_micro: new BN(obj.theta_d_micro),
      vrp_rel_micro: new BN(obj.vrp_rel_micro),
      iv_micro: new BN(obj.iv_micro),
      p_max_micro: new BN(obj.p_max_micro),
      xi_micro: new BN(obj.xi_micro),
      beta_micro: new BN(obj.beta_micro),
      var_99_micro: new BN(obj.var_99_micro),
      es_999_micro: new BN(obj.es_999_micro),
      regime_indicator_micro: new BN(obj.regime_indicator_micro),
      returns_buf: obj.returns_buf,
      returns_idx: obj.returns_idx,
      returns_count: obj.returns_count,
      padding_1: obj.padding_1,
      iv_history: obj.iv_history.map((item) =>
        types.IvHistoryEntry.fromJSON(item)
      ),
      iv_idx: obj.iv_idx,
      bump: obj.bump,
      padding_2: obj.padding_2,
      sigma_inf_window: obj.sigma_inf_window,
      confidence_bps: obj.confidence_bps,
      padding_3: obj.padding_3,
    })
  }
}
