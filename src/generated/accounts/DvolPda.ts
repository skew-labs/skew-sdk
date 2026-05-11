import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface DvolPdaFields {
  asset: number
  bump: number
  _padding_0: Array<number>
  last_update_slot: BN
  dvol_28d_micro: BN
  dvol_90d_micro: BN
  realized_var_28d_micro: BN
}

export interface DvolPdaJSON {
  asset: number
  bump: number
  _padding_0: Array<number>
  last_update_slot: string
  dvol_28d_micro: string
  dvol_90d_micro: string
  realized_var_28d_micro: string
}

export class DvolPda {
  readonly asset: number
  readonly bump: number
  readonly _padding_0: Array<number>
  readonly last_update_slot: BN
  readonly dvol_28d_micro: BN
  readonly dvol_90d_micro: BN
  readonly realized_var_28d_micro: BN

  static readonly discriminator = Buffer.from([
    232, 75, 152, 143, 101, 75, 38, 142,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("asset"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_padding_0"),
    borsh.u64("last_update_slot"),
    borsh.u64("dvol_28d_micro"),
    borsh.u64("dvol_90d_micro"),
    borsh.u64("realized_var_28d_micro"),
  ])

  constructor(fields: DvolPdaFields) {
    this.asset = fields.asset
    this.bump = fields.bump
    this._padding_0 = fields._padding_0
    this.last_update_slot = fields.last_update_slot
    this.dvol_28d_micro = fields.dvol_28d_micro
    this.dvol_90d_micro = fields.dvol_90d_micro
    this.realized_var_28d_micro = fields.realized_var_28d_micro
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<DvolPda | null> {
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
  ): Promise<Array<DvolPda | null>> {
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

  static decode(data: Buffer): DvolPda {
    if (!data.slice(0, 8).equals(DvolPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = DvolPda.layout.decode(data.slice(8))

    return new DvolPda({
      asset: dec.asset,
      bump: dec.bump,
      _padding_0: dec._padding_0,
      last_update_slot: dec.last_update_slot,
      dvol_28d_micro: dec.dvol_28d_micro,
      dvol_90d_micro: dec.dvol_90d_micro,
      realized_var_28d_micro: dec.realized_var_28d_micro,
    })
  }

  toJSON(): DvolPdaJSON {
    return {
      asset: this.asset,
      bump: this.bump,
      _padding_0: this._padding_0,
      last_update_slot: this.last_update_slot.toString(),
      dvol_28d_micro: this.dvol_28d_micro.toString(),
      dvol_90d_micro: this.dvol_90d_micro.toString(),
      realized_var_28d_micro: this.realized_var_28d_micro.toString(),
    }
  }

  static fromJSON(obj: DvolPdaJSON): DvolPda {
    return new DvolPda({
      asset: obj.asset,
      bump: obj.bump,
      _padding_0: obj._padding_0,
      last_update_slot: new BN(obj.last_update_slot),
      dvol_28d_micro: new BN(obj.dvol_28d_micro),
      dvol_90d_micro: new BN(obj.dvol_90d_micro),
      realized_var_28d_micro: new BN(obj.realized_var_28d_micro),
    })
  }
}
