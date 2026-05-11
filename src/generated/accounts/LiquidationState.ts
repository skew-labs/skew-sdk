import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface LiquidationStateFields {
  option: PublicKey
  defaulting_cm: PublicKey
  bump: number
  liq_start_ts: BN
  total_closed_bps: number
  finalized: boolean
}

export interface LiquidationStateJSON {
  option: string
  defaulting_cm: string
  bump: number
  liq_start_ts: string
  total_closed_bps: number
  finalized: boolean
}

export class LiquidationState {
  readonly option: PublicKey
  readonly defaulting_cm: PublicKey
  readonly bump: number
  readonly liq_start_ts: BN
  readonly total_closed_bps: number
  readonly finalized: boolean

  static readonly discriminator = Buffer.from([
    51, 3, 38, 175, 93, 144, 255, 172,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("option"),
    borsh.publicKey("defaulting_cm"),
    borsh.u8("bump"),
    borsh.i64("liq_start_ts"),
    borsh.u16("total_closed_bps"),
    borsh.bool("finalized"),
  ])

  constructor(fields: LiquidationStateFields) {
    this.option = fields.option
    this.defaulting_cm = fields.defaulting_cm
    this.bump = fields.bump
    this.liq_start_ts = fields.liq_start_ts
    this.total_closed_bps = fields.total_closed_bps
    this.finalized = fields.finalized
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<LiquidationState | null> {
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
  ): Promise<Array<LiquidationState | null>> {
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

  static decode(data: Buffer): LiquidationState {
    if (!data.slice(0, 8).equals(LiquidationState.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = LiquidationState.layout.decode(data.slice(8))

    return new LiquidationState({
      option: dec.option,
      defaulting_cm: dec.defaulting_cm,
      bump: dec.bump,
      liq_start_ts: dec.liq_start_ts,
      total_closed_bps: dec.total_closed_bps,
      finalized: dec.finalized,
    })
  }

  toJSON(): LiquidationStateJSON {
    return {
      option: this.option.toString(),
      defaulting_cm: this.defaulting_cm.toString(),
      bump: this.bump,
      liq_start_ts: this.liq_start_ts.toString(),
      total_closed_bps: this.total_closed_bps,
      finalized: this.finalized,
    }
  }

  static fromJSON(obj: LiquidationStateJSON): LiquidationState {
    return new LiquidationState({
      option: new PublicKey(obj.option),
      defaulting_cm: new PublicKey(obj.defaulting_cm),
      bump: obj.bump,
      liq_start_ts: new BN(obj.liq_start_ts),
      total_closed_bps: obj.total_closed_bps,
      finalized: obj.finalized,
    })
  }
}
