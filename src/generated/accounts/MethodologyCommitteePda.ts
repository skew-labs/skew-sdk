import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MethodologyCommitteePdaFields {
  members: Array<PublicKey>
  independent_flags: Array<boolean>
  member_count: number
  padding_0: Array<number>
  last_meeting_slot: BN
  next_decision_id: BN
  bump: number
  padding_1: Array<number>
  _reserved: Array<number>
}

export interface MethodologyCommitteePdaJSON {
  members: Array<string>
  independent_flags: Array<boolean>
  member_count: number
  padding_0: Array<number>
  last_meeting_slot: string
  next_decision_id: string
  bump: number
  padding_1: Array<number>
  _reserved: Array<number>
}

export class MethodologyCommitteePda {
  readonly members: Array<PublicKey>
  readonly independent_flags: Array<boolean>
  readonly member_count: number
  readonly padding_0: Array<number>
  readonly last_meeting_slot: BN
  readonly next_decision_id: BN
  readonly bump: number
  readonly padding_1: Array<number>
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    151, 5, 85, 192, 68, 123, 98, 57,
  ])

  static readonly layout = borsh.struct([
    borsh.array(borsh.publicKey(), 5, "members"),
    borsh.array(borsh.bool(), 5, "independent_flags"),
    borsh.u8("member_count"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u64("last_meeting_slot"),
    borsh.u64("next_decision_id"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_1"),
    borsh.array(borsh.u8(), 32, "_reserved"),
  ])

  constructor(fields: MethodologyCommitteePdaFields) {
    this.members = fields.members
    this.independent_flags = fields.independent_flags
    this.member_count = fields.member_count
    this.padding_0 = fields.padding_0
    this.last_meeting_slot = fields.last_meeting_slot
    this.next_decision_id = fields.next_decision_id
    this.bump = fields.bump
    this.padding_1 = fields.padding_1
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<MethodologyCommitteePda | null> {
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
  ): Promise<Array<MethodologyCommitteePda | null>> {
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

  static decode(data: Buffer): MethodologyCommitteePda {
    if (!data.slice(0, 8).equals(MethodologyCommitteePda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = MethodologyCommitteePda.layout.decode(data.slice(8))

    return new MethodologyCommitteePda({
      members: dec.members,
      independent_flags: dec.independent_flags,
      member_count: dec.member_count,
      padding_0: dec.padding_0,
      last_meeting_slot: dec.last_meeting_slot,
      next_decision_id: dec.next_decision_id,
      bump: dec.bump,
      padding_1: dec.padding_1,
      _reserved: dec._reserved,
    })
  }

  toJSON(): MethodologyCommitteePdaJSON {
    return {
      members: this.members.map((item) => item.toString()),
      independent_flags: this.independent_flags,
      member_count: this.member_count,
      padding_0: this.padding_0,
      last_meeting_slot: this.last_meeting_slot.toString(),
      next_decision_id: this.next_decision_id.toString(),
      bump: this.bump,
      padding_1: this.padding_1,
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: MethodologyCommitteePdaJSON): MethodologyCommitteePda {
    return new MethodologyCommitteePda({
      members: obj.members.map((item) => new PublicKey(item)),
      independent_flags: obj.independent_flags,
      member_count: obj.member_count,
      padding_0: obj.padding_0,
      last_meeting_slot: new BN(obj.last_meeting_slot),
      next_decision_id: new BN(obj.next_decision_id),
      bump: obj.bump,
      padding_1: obj.padding_1,
      _reserved: obj._reserved,
    })
  }
}
