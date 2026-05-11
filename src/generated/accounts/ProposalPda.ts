import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ProposalPdaFields {
  id: BN
  queued_at_slot: BN
  executed_at_slot: BN
  approvals_bitmap: number
  executed: boolean
  padding_0: Array<number>
  action: types.AdminActionKind
  bump: number
  padding_1: Array<number>
}

export interface ProposalPdaJSON {
  id: string
  queued_at_slot: string
  executed_at_slot: string
  approvals_bitmap: number
  executed: boolean
  padding_0: Array<number>
  action: types.AdminActionJSON
  bump: number
  padding_1: Array<number>
}

export class ProposalPda {
  readonly id: BN
  readonly queued_at_slot: BN
  readonly executed_at_slot: BN
  readonly approvals_bitmap: number
  readonly executed: boolean
  readonly padding_0: Array<number>
  readonly action: types.AdminActionKind
  readonly bump: number
  readonly padding_1: Array<number>

  static readonly discriminator = Buffer.from([
    231, 115, 217, 162, 33, 243, 132, 22,
  ])

  static readonly layout = borsh.struct([
    borsh.u64("id"),
    borsh.u64("queued_at_slot"),
    borsh.u64("executed_at_slot"),
    borsh.u8("approvals_bitmap"),
    borsh.bool("executed"),
    borsh.array(borsh.u8(), 6, "padding_0"),
    types.AdminAction.layout("action"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "padding_1"),
  ])

  constructor(fields: ProposalPdaFields) {
    this.id = fields.id
    this.queued_at_slot = fields.queued_at_slot
    this.executed_at_slot = fields.executed_at_slot
    this.approvals_bitmap = fields.approvals_bitmap
    this.executed = fields.executed
    this.padding_0 = fields.padding_0
    this.action = fields.action
    this.bump = fields.bump
    this.padding_1 = fields.padding_1
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ProposalPda | null> {
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
  ): Promise<Array<ProposalPda | null>> {
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

  static decode(data: Buffer): ProposalPda {
    if (!data.slice(0, 8).equals(ProposalPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ProposalPda.layout.decode(data.slice(8))

    return new ProposalPda({
      id: dec.id,
      queued_at_slot: dec.queued_at_slot,
      executed_at_slot: dec.executed_at_slot,
      approvals_bitmap: dec.approvals_bitmap,
      executed: dec.executed,
      padding_0: dec.padding_0,
      action: types.AdminAction.fromDecoded(dec.action),
      bump: dec.bump,
      padding_1: dec.padding_1,
    })
  }

  toJSON(): ProposalPdaJSON {
    return {
      id: this.id.toString(),
      queued_at_slot: this.queued_at_slot.toString(),
      executed_at_slot: this.executed_at_slot.toString(),
      approvals_bitmap: this.approvals_bitmap,
      executed: this.executed,
      padding_0: this.padding_0,
      action: this.action.toJSON(),
      bump: this.bump,
      padding_1: this.padding_1,
    }
  }

  static fromJSON(obj: ProposalPdaJSON): ProposalPda {
    return new ProposalPda({
      id: new BN(obj.id),
      queued_at_slot: new BN(obj.queued_at_slot),
      executed_at_slot: new BN(obj.executed_at_slot),
      approvals_bitmap: obj.approvals_bitmap,
      executed: obj.executed,
      padding_0: obj.padding_0,
      action: types.AdminAction.fromJSON(obj.action),
      bump: obj.bump,
      padding_1: obj.padding_1,
    })
  }
}
