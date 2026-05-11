import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface HamiltonStateFields {
  asset: number
  bump: number
  padding_0: Array<number>
  last_update_slot: BN
  pi_calm_micro: BN
  pi_stress_micro: BN
  mu_calm_micro: BN
  mu_stress_micro: BN
  sigma_calm_micro: BN
  sigma_stress_micro: BN
  p01_micro: BN
  p10_micro: BN
  consecutive_stress_days: number
  consecutive_calm_days: number
}

export interface HamiltonStateJSON {
  asset: number
  bump: number
  padding_0: Array<number>
  last_update_slot: string
  pi_calm_micro: string
  pi_stress_micro: string
  mu_calm_micro: string
  mu_stress_micro: string
  sigma_calm_micro: string
  sigma_stress_micro: string
  p01_micro: string
  p10_micro: string
  consecutive_stress_days: number
  consecutive_calm_days: number
}

export class HamiltonState {
  readonly asset: number
  readonly bump: number
  readonly padding_0: Array<number>
  readonly last_update_slot: BN
  readonly pi_calm_micro: BN
  readonly pi_stress_micro: BN
  readonly mu_calm_micro: BN
  readonly mu_stress_micro: BN
  readonly sigma_calm_micro: BN
  readonly sigma_stress_micro: BN
  readonly p01_micro: BN
  readonly p10_micro: BN
  readonly consecutive_stress_days: number
  readonly consecutive_calm_days: number

  static readonly discriminator = Buffer.from([
    169, 66, 20, 93, 141, 5, 48, 238,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("pi_calm_micro"),
    borsh.u64("pi_stress_micro"),
    borsh.i64("mu_calm_micro"),
    borsh.i64("mu_stress_micro"),
    borsh.u64("sigma_calm_micro"),
    borsh.u64("sigma_stress_micro"),
    borsh.u64("p01_micro"),
    borsh.u64("p10_micro"),
    borsh.u32("consecutive_stress_days"),
    borsh.u32("consecutive_calm_days"),
  ])

  constructor(fields: HamiltonStateFields) {
    this.asset = fields.asset
    this.bump = fields.bump
    this.padding_0 = fields.padding_0
    this.last_update_slot = fields.last_update_slot
    this.pi_calm_micro = fields.pi_calm_micro
    this.pi_stress_micro = fields.pi_stress_micro
    this.mu_calm_micro = fields.mu_calm_micro
    this.mu_stress_micro = fields.mu_stress_micro
    this.sigma_calm_micro = fields.sigma_calm_micro
    this.sigma_stress_micro = fields.sigma_stress_micro
    this.p01_micro = fields.p01_micro
    this.p10_micro = fields.p10_micro
    this.consecutive_stress_days = fields.consecutive_stress_days
    this.consecutive_calm_days = fields.consecutive_calm_days
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<HamiltonState | null> {
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
  ): Promise<Array<HamiltonState | null>> {
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

  static decode(data: Buffer): HamiltonState {
    if (!data.slice(0, 8).equals(HamiltonState.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = HamiltonState.layout.decode(data.slice(8))

    return new HamiltonState({
      asset: dec.asset,
      bump: dec.bump,
      padding_0: dec.padding_0,
      last_update_slot: dec.last_update_slot,
      pi_calm_micro: dec.pi_calm_micro,
      pi_stress_micro: dec.pi_stress_micro,
      mu_calm_micro: dec.mu_calm_micro,
      mu_stress_micro: dec.mu_stress_micro,
      sigma_calm_micro: dec.sigma_calm_micro,
      sigma_stress_micro: dec.sigma_stress_micro,
      p01_micro: dec.p01_micro,
      p10_micro: dec.p10_micro,
      consecutive_stress_days: dec.consecutive_stress_days,
      consecutive_calm_days: dec.consecutive_calm_days,
    })
  }

  toJSON(): HamiltonStateJSON {
    return {
      asset: this.asset,
      bump: this.bump,
      padding_0: this.padding_0,
      last_update_slot: this.last_update_slot.toString(),
      pi_calm_micro: this.pi_calm_micro.toString(),
      pi_stress_micro: this.pi_stress_micro.toString(),
      mu_calm_micro: this.mu_calm_micro.toString(),
      mu_stress_micro: this.mu_stress_micro.toString(),
      sigma_calm_micro: this.sigma_calm_micro.toString(),
      sigma_stress_micro: this.sigma_stress_micro.toString(),
      p01_micro: this.p01_micro.toString(),
      p10_micro: this.p10_micro.toString(),
      consecutive_stress_days: this.consecutive_stress_days,
      consecutive_calm_days: this.consecutive_calm_days,
    }
  }

  static fromJSON(obj: HamiltonStateJSON): HamiltonState {
    return new HamiltonState({
      asset: obj.asset,
      bump: obj.bump,
      padding_0: obj.padding_0,
      last_update_slot: new BN(obj.last_update_slot),
      pi_calm_micro: new BN(obj.pi_calm_micro),
      pi_stress_micro: new BN(obj.pi_stress_micro),
      mu_calm_micro: new BN(obj.mu_calm_micro),
      mu_stress_micro: new BN(obj.mu_stress_micro),
      sigma_calm_micro: new BN(obj.sigma_calm_micro),
      sigma_stress_micro: new BN(obj.sigma_stress_micro),
      p01_micro: new BN(obj.p01_micro),
      p10_micro: new BN(obj.p10_micro),
      consecutive_stress_days: obj.consecutive_stress_days,
      consecutive_calm_days: obj.consecutive_calm_days,
    })
  }
}
