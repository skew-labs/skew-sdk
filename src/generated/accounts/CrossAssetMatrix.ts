import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CrossAssetMatrixFields {
  last_fit_slot: BN
  icc_rho_p5_micro: Array<number>
  stress_rho_micro: Array<number>
  last_pearson_slot: BN
  last_stress_slot: BN
  bump: number
  padding_0: Array<number>
}

export interface CrossAssetMatrixJSON {
  last_fit_slot: string
  icc_rho_p5_micro: Array<number>
  stress_rho_micro: Array<number>
  last_pearson_slot: string
  last_stress_slot: string
  bump: number
  padding_0: Array<number>
}

export class CrossAssetMatrix {
  readonly last_fit_slot: BN
  readonly icc_rho_p5_micro: Array<number>
  readonly stress_rho_micro: Array<number>
  readonly last_pearson_slot: BN
  readonly last_stress_slot: BN
  readonly bump: number
  readonly padding_0: Array<number>

  static readonly discriminator = Buffer.from([
    17, 56, 96, 160, 80, 61, 246, 149,
  ])

  static readonly layout = borsh.struct([
    borsh.u64("last_fit_slot"),
    borsh.array(borsh.u32(), 10, "icc_rho_p5_micro"),
    borsh.array(borsh.u32(), 10, "stress_rho_micro"),
    borsh.u64("last_pearson_slot"),
    borsh.u64("last_stress_slot"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_0"),
  ])

  constructor(fields: CrossAssetMatrixFields) {
    this.last_fit_slot = fields.last_fit_slot
    this.icc_rho_p5_micro = fields.icc_rho_p5_micro
    this.stress_rho_micro = fields.stress_rho_micro
    this.last_pearson_slot = fields.last_pearson_slot
    this.last_stress_slot = fields.last_stress_slot
    this.bump = fields.bump
    this.padding_0 = fields.padding_0
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<CrossAssetMatrix | null> {
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
  ): Promise<Array<CrossAssetMatrix | null>> {
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

  static decode(data: Buffer): CrossAssetMatrix {
    if (!data.slice(0, 8).equals(CrossAssetMatrix.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = CrossAssetMatrix.layout.decode(data.slice(8))

    return new CrossAssetMatrix({
      last_fit_slot: dec.last_fit_slot,
      icc_rho_p5_micro: dec.icc_rho_p5_micro,
      stress_rho_micro: dec.stress_rho_micro,
      last_pearson_slot: dec.last_pearson_slot,
      last_stress_slot: dec.last_stress_slot,
      bump: dec.bump,
      padding_0: dec.padding_0,
    })
  }

  toJSON(): CrossAssetMatrixJSON {
    return {
      last_fit_slot: this.last_fit_slot.toString(),
      icc_rho_p5_micro: this.icc_rho_p5_micro,
      stress_rho_micro: this.stress_rho_micro,
      last_pearson_slot: this.last_pearson_slot.toString(),
      last_stress_slot: this.last_stress_slot.toString(),
      bump: this.bump,
      padding_0: this.padding_0,
    }
  }

  static fromJSON(obj: CrossAssetMatrixJSON): CrossAssetMatrix {
    return new CrossAssetMatrix({
      last_fit_slot: new BN(obj.last_fit_slot),
      icc_rho_p5_micro: obj.icc_rho_p5_micro,
      stress_rho_micro: obj.stress_rho_micro,
      last_pearson_slot: new BN(obj.last_pearson_slot),
      last_stress_slot: new BN(obj.last_stress_slot),
      bump: obj.bump,
      padding_0: obj.padding_0,
    })
  }
}
