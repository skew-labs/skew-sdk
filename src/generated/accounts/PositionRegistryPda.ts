import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PositionRegistryPdaFields {
  cm: PublicKey
  authority: PublicKey
  bump: number
  count: number
  padding: Array<number>
  positions: Array<PublicKey>
}

export interface PositionRegistryPdaJSON {
  cm: string
  authority: string
  bump: number
  count: number
  padding: Array<number>
  positions: Array<string>
}

export class PositionRegistryPda {
  readonly cm: PublicKey
  readonly authority: PublicKey
  readonly bump: number
  readonly count: number
  readonly padding: Array<number>
  readonly positions: Array<PublicKey>

  static readonly discriminator = Buffer.from([
    106, 147, 122, 203, 115, 180, 187, 242,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("cm"),
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.u8("count"),
    borsh.array(borsh.u8(), 6, "padding"),
    borsh.array(borsh.publicKey(), 32, "positions"),
  ])

  constructor(fields: PositionRegistryPdaFields) {
    this.cm = fields.cm
    this.authority = fields.authority
    this.bump = fields.bump
    this.count = fields.count
    this.padding = fields.padding
    this.positions = fields.positions
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<PositionRegistryPda | null> {
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
  ): Promise<Array<PositionRegistryPda | null>> {
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

  static decode(data: Buffer): PositionRegistryPda {
    if (!data.slice(0, 8).equals(PositionRegistryPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = PositionRegistryPda.layout.decode(data.slice(8))

    return new PositionRegistryPda({
      cm: dec.cm,
      authority: dec.authority,
      bump: dec.bump,
      count: dec.count,
      padding: dec.padding,
      positions: dec.positions,
    })
  }

  toJSON(): PositionRegistryPdaJSON {
    return {
      cm: this.cm.toString(),
      authority: this.authority.toString(),
      bump: this.bump,
      count: this.count,
      padding: this.padding,
      positions: this.positions.map((item) => item.toString()),
    }
  }

  static fromJSON(obj: PositionRegistryPdaJSON): PositionRegistryPda {
    return new PositionRegistryPda({
      cm: new PublicKey(obj.cm),
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      count: obj.count,
      padding: obj.padding,
      positions: obj.positions.map((item) => new PublicKey(item)),
    })
  }
}
