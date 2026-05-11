import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MethodologyDecisionPdaFields {
  id: BN
  recorded_at_slot: BN
  notice_start_slot: BN
  kind: types.MethodologyChangeKindKind
  padding_0: Array<number>
  note: Array<number>
  bump: number
  padding_1: Array<number>
}

export interface MethodologyDecisionPdaJSON {
  id: string
  recorded_at_slot: string
  notice_start_slot: string
  kind: types.MethodologyChangeKindJSON
  padding_0: Array<number>
  note: Array<number>
  bump: number
  padding_1: Array<number>
}

export class MethodologyDecisionPda {
  readonly id: BN
  readonly recorded_at_slot: BN
  readonly notice_start_slot: BN
  readonly kind: types.MethodologyChangeKindKind
  readonly padding_0: Array<number>
  readonly note: Array<number>
  readonly bump: number
  readonly padding_1: Array<number>

  static readonly discriminator = Buffer.from([
    143, 173, 70, 34, 38, 10, 177, 92,
  ])

  static readonly layout = borsh.struct([
    borsh.u64("id"),
    borsh.u64("recorded_at_slot"),
    borsh.u64("notice_start_slot"),
    types.MethodologyChangeKind.layout("kind"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.array(borsh.u8(), 256, "note"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_1"),
  ])

  constructor(fields: MethodologyDecisionPdaFields) {
    this.id = fields.id
    this.recorded_at_slot = fields.recorded_at_slot
    this.notice_start_slot = fields.notice_start_slot
    this.kind = fields.kind
    this.padding_0 = fields.padding_0
    this.note = fields.note
    this.bump = fields.bump
    this.padding_1 = fields.padding_1
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<MethodologyDecisionPda | null> {
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
  ): Promise<Array<MethodologyDecisionPda | null>> {
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

  static decode(data: Buffer): MethodologyDecisionPda {
    if (!data.slice(0, 8).equals(MethodologyDecisionPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = MethodologyDecisionPda.layout.decode(data.slice(8))

    return new MethodologyDecisionPda({
      id: dec.id,
      recorded_at_slot: dec.recorded_at_slot,
      notice_start_slot: dec.notice_start_slot,
      kind: types.MethodologyChangeKind.fromDecoded(dec.kind),
      padding_0: dec.padding_0,
      note: dec.note,
      bump: dec.bump,
      padding_1: dec.padding_1,
    })
  }

  toJSON(): MethodologyDecisionPdaJSON {
    return {
      id: this.id.toString(),
      recorded_at_slot: this.recorded_at_slot.toString(),
      notice_start_slot: this.notice_start_slot.toString(),
      kind: this.kind.toJSON(),
      padding_0: this.padding_0,
      note: this.note,
      bump: this.bump,
      padding_1: this.padding_1,
    }
  }

  static fromJSON(obj: MethodologyDecisionPdaJSON): MethodologyDecisionPda {
    return new MethodologyDecisionPda({
      id: new BN(obj.id),
      recorded_at_slot: new BN(obj.recorded_at_slot),
      notice_start_slot: new BN(obj.notice_start_slot),
      kind: types.MethodologyChangeKind.fromJSON(obj.kind),
      padding_0: obj.padding_0,
      note: obj.note,
      bump: obj.bump,
      padding_1: obj.padding_1,
    })
  }
}
