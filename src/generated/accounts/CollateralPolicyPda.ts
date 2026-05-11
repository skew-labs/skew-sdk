import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface CollateralPolicyPdaFields {
  bump: number
  entry_count: number
  padding: Array<number>
  entries: Array<types.CollateralPolicyEntryFields>
}

export interface CollateralPolicyPdaJSON {
  bump: number
  entry_count: number
  padding: Array<number>
  entries: Array<types.CollateralPolicyEntryJSON>
}

export class CollateralPolicyPda {
  readonly bump: number
  readonly entry_count: number
  readonly padding: Array<number>
  readonly entries: Array<types.CollateralPolicyEntry>

  static readonly discriminator = Buffer.from([
    51, 144, 214, 139, 2, 151, 155, 50,
  ])

  static readonly layout = borsh.struct([
    borsh.u8("bump"),
    borsh.u8("entry_count"),
    borsh.array(borsh.u8(), 6, "padding"),
    borsh.array(types.CollateralPolicyEntry.layout(), 8, "entries"),
  ])

  constructor(fields: CollateralPolicyPdaFields) {
    this.bump = fields.bump
    this.entry_count = fields.entry_count
    this.padding = fields.padding
    this.entries = fields.entries.map(
      (item) => new types.CollateralPolicyEntry({ ...item })
    )
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<CollateralPolicyPda | null> {
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
  ): Promise<Array<CollateralPolicyPda | null>> {
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

  static decode(data: Buffer): CollateralPolicyPda {
    if (!data.slice(0, 8).equals(CollateralPolicyPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = CollateralPolicyPda.layout.decode(data.slice(8))

    return new CollateralPolicyPda({
      bump: dec.bump,
      entry_count: dec.entry_count,
      padding: dec.padding,
      entries: dec.entries.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.CollateralPolicyEntry.fromDecoded(item)
      ),
    })
  }

  toJSON(): CollateralPolicyPdaJSON {
    return {
      bump: this.bump,
      entry_count: this.entry_count,
      padding: this.padding,
      entries: this.entries.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: CollateralPolicyPdaJSON): CollateralPolicyPda {
    return new CollateralPolicyPda({
      bump: obj.bump,
      entry_count: obj.entry_count,
      padding: obj.padding,
      entries: obj.entries.map((item) =>
        types.CollateralPolicyEntry.fromJSON(item)
      ),
    })
  }
}
