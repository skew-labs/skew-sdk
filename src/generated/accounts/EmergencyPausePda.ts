import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface EmergencyPausePdaFields {
  active: boolean
  bump: number
  _pad_0: Array<number>
  started_at_slot: BN
  started_by: PublicKey
  _reserved: Array<number>
}

export interface EmergencyPausePdaJSON {
  active: boolean
  bump: number
  _pad_0: Array<number>
  started_at_slot: string
  started_by: string
  _reserved: Array<number>
}

export class EmergencyPausePda {
  readonly active: boolean
  readonly bump: number
  readonly _pad_0: Array<number>
  readonly started_at_slot: BN
  readonly started_by: PublicKey
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    142, 229, 63, 48, 165, 226, 138, 233,
  ])

  static readonly layout = borsh.struct([
    borsh.bool("active"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "_pad_0"),
    borsh.u64("started_at_slot"),
    borsh.publicKey("started_by"),
    borsh.array(borsh.u8(), 32, "_reserved"),
  ])

  constructor(fields: EmergencyPausePdaFields) {
    this.active = fields.active
    this.bump = fields.bump
    this._pad_0 = fields._pad_0
    this.started_at_slot = fields.started_at_slot
    this.started_by = fields.started_by
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<EmergencyPausePda | null> {
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
  ): Promise<Array<EmergencyPausePda | null>> {
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

  static decode(data: Buffer): EmergencyPausePda {
    if (!data.slice(0, 8).equals(EmergencyPausePda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = EmergencyPausePda.layout.decode(data.slice(8))

    return new EmergencyPausePda({
      active: dec.active,
      bump: dec.bump,
      _pad_0: dec._pad_0,
      started_at_slot: dec.started_at_slot,
      started_by: dec.started_by,
      _reserved: dec._reserved,
    })
  }

  toJSON(): EmergencyPausePdaJSON {
    return {
      active: this.active,
      bump: this.bump,
      _pad_0: this._pad_0,
      started_at_slot: this.started_at_slot.toString(),
      started_by: this.started_by.toString(),
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: EmergencyPausePdaJSON): EmergencyPausePda {
    return new EmergencyPausePda({
      active: obj.active,
      bump: obj.bump,
      _pad_0: obj._pad_0,
      started_at_slot: new BN(obj.started_at_slot),
      started_by: new PublicKey(obj.started_by),
      _reserved: obj._reserved,
    })
  }
}
