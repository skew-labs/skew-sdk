import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GovernanceMultisigFields {
  members: Array<PublicKey>
  threshold: number
  padding_0: Array<number>
  last_rotation_slot: BN
  next_proposal_id: BN
  paused: boolean
  bump: number
  padding_1: Array<number>
}

export interface GovernanceMultisigJSON {
  members: Array<string>
  threshold: number
  padding_0: Array<number>
  last_rotation_slot: string
  next_proposal_id: string
  paused: boolean
  bump: number
  padding_1: Array<number>
}

export class GovernanceMultisig {
  readonly members: Array<PublicKey>
  readonly threshold: number
  readonly padding_0: Array<number>
  readonly last_rotation_slot: BN
  readonly next_proposal_id: BN
  readonly paused: boolean
  readonly bump: number
  readonly padding_1: Array<number>

  static readonly discriminator = Buffer.from([
    55, 102, 234, 175, 98, 155, 147, 224,
  ])

  static readonly layout = borsh.struct([
    borsh.array(borsh.publicKey(), 5, "members"),
    borsh.u8("threshold"),
    borsh.array(borsh.u8(), 7, "padding_0"),
    borsh.u64("last_rotation_slot"),
    borsh.u64("next_proposal_id"),
    borsh.bool("paused"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding_1"),
  ])

  constructor(fields: GovernanceMultisigFields) {
    this.members = fields.members
    this.threshold = fields.threshold
    this.padding_0 = fields.padding_0
    this.last_rotation_slot = fields.last_rotation_slot
    this.next_proposal_id = fields.next_proposal_id
    this.paused = fields.paused
    this.bump = fields.bump
    this.padding_1 = fields.padding_1
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<GovernanceMultisig | null> {
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
  ): Promise<Array<GovernanceMultisig | null>> {
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

  static decode(data: Buffer): GovernanceMultisig {
    if (!data.slice(0, 8).equals(GovernanceMultisig.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = GovernanceMultisig.layout.decode(data.slice(8))

    return new GovernanceMultisig({
      members: dec.members,
      threshold: dec.threshold,
      padding_0: dec.padding_0,
      last_rotation_slot: dec.last_rotation_slot,
      next_proposal_id: dec.next_proposal_id,
      paused: dec.paused,
      bump: dec.bump,
      padding_1: dec.padding_1,
    })
  }

  toJSON(): GovernanceMultisigJSON {
    return {
      members: this.members.map((item) => item.toString()),
      threshold: this.threshold,
      padding_0: this.padding_0,
      last_rotation_slot: this.last_rotation_slot.toString(),
      next_proposal_id: this.next_proposal_id.toString(),
      paused: this.paused,
      bump: this.bump,
      padding_1: this.padding_1,
    }
  }

  static fromJSON(obj: GovernanceMultisigJSON): GovernanceMultisig {
    return new GovernanceMultisig({
      members: obj.members.map((item) => new PublicKey(item)),
      threshold: obj.threshold,
      padding_0: obj.padding_0,
      last_rotation_slot: new BN(obj.last_rotation_slot),
      next_proposal_id: new BN(obj.next_proposal_id),
      paused: obj.paused,
      bump: obj.bump,
      padding_1: obj.padding_1,
    })
  }
}
