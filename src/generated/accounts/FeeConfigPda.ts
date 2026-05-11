import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface FeeConfigPdaFields {
  bump: number
  padding_0: Array<number>
  maker_rebate_phase_bps: number
  padding_1: Array<number>
  last_phase_change_ts: BN
}

export interface FeeConfigPdaJSON {
  bump: number
  padding_0: Array<number>
  maker_rebate_phase_bps: number
  padding_1: Array<number>
  last_phase_change_ts: string
}

export class FeeConfigPda {
  readonly bump: number
  readonly padding_0: Array<number>
  readonly maker_rebate_phase_bps: number
  readonly padding_1: Array<number>
  readonly last_phase_change_ts: BN

  static readonly discriminator = Buffer.from([
    241, 139, 111, 30, 22, 79, 75, 130,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u16("maker_rebate_phase_bps"),
    borsh.array(borsh.u8(), 6, "padding_1"),
    borsh.i64("last_phase_change_ts"),
  ])

  constructor(fields: FeeConfigPdaFields) {
    this.bump = fields.bump
    this.padding_0 = fields.padding_0
    this.maker_rebate_phase_bps = fields.maker_rebate_phase_bps
    this.padding_1 = fields.padding_1
    this.last_phase_change_ts = fields.last_phase_change_ts
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<FeeConfigPda | null> {
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
  ): Promise<Array<FeeConfigPda | null>> {
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

  static decode(data: Buffer): FeeConfigPda {
    if (!data.slice(0, 8).equals(FeeConfigPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = FeeConfigPda.layout.decode(data.slice(8))

    return new FeeConfigPda({
      bump: dec.bump,
      padding_0: dec.padding_0,
      maker_rebate_phase_bps: dec.maker_rebate_phase_bps,
      padding_1: dec.padding_1,
      last_phase_change_ts: dec.last_phase_change_ts,
    })
  }

  toJSON(): FeeConfigPdaJSON {
    return {
      bump: this.bump,
      padding_0: this.padding_0,
      maker_rebate_phase_bps: this.maker_rebate_phase_bps,
      padding_1: this.padding_1,
      last_phase_change_ts: this.last_phase_change_ts.toString(),
    }
  }

  static fromJSON(obj: FeeConfigPdaJSON): FeeConfigPda {
    return new FeeConfigPda({
      bump: obj.bump,
      padding_0: obj.padding_0,
      maker_rebate_phase_bps: obj.maker_rebate_phase_bps,
      padding_1: obj.padding_1,
      last_phase_change_ts: new BN(obj.last_phase_change_ts),
    })
  }
}
