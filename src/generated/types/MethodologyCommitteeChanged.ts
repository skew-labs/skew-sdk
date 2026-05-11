import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MethodologyCommitteeChangedFields {
  committee: PublicKey
  proposal: PublicKey
  op: number
  target: PublicKey
  member_count: number
  independent_count: number
  executed_at_slot: BN
}

export interface MethodologyCommitteeChangedJSON {
  committee: string
  proposal: string
  op: number
  target: string
  member_count: number
  independent_count: number
  executed_at_slot: string
}

export class MethodologyCommitteeChanged {
  readonly committee: PublicKey
  readonly proposal: PublicKey
  readonly op: number
  readonly target: PublicKey
  readonly member_count: number
  readonly independent_count: number
  readonly executed_at_slot: BN

  constructor(fields: MethodologyCommitteeChangedFields) {
    this.committee = fields.committee
    this.proposal = fields.proposal
    this.op = fields.op
    this.target = fields.target
    this.member_count = fields.member_count
    this.independent_count = fields.independent_count
    this.executed_at_slot = fields.executed_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("committee"),
        borsh.publicKey("proposal"),
        borsh.u8("op"),
        borsh.publicKey("target"),
        borsh.u8("member_count"),
        borsh.u8("independent_count"),
        borsh.u64("executed_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MethodologyCommitteeChanged({
      committee: obj.committee,
      proposal: obj.proposal,
      op: obj.op,
      target: obj.target,
      member_count: obj.member_count,
      independent_count: obj.independent_count,
      executed_at_slot: obj.executed_at_slot,
    })
  }

  static toEncodable(fields: MethodologyCommitteeChangedFields) {
    return {
      committee: fields.committee,
      proposal: fields.proposal,
      op: fields.op,
      target: fields.target,
      member_count: fields.member_count,
      independent_count: fields.independent_count,
      executed_at_slot: fields.executed_at_slot,
    }
  }

  toJSON(): MethodologyCommitteeChangedJSON {
    return {
      committee: this.committee.toString(),
      proposal: this.proposal.toString(),
      op: this.op,
      target: this.target.toString(),
      member_count: this.member_count,
      independent_count: this.independent_count,
      executed_at_slot: this.executed_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: MethodologyCommitteeChangedJSON
  ): MethodologyCommitteeChanged {
    return new MethodologyCommitteeChanged({
      committee: new PublicKey(obj.committee),
      proposal: new PublicKey(obj.proposal),
      op: obj.op,
      target: new PublicKey(obj.target),
      member_count: obj.member_count,
      independent_count: obj.independent_count,
      executed_at_slot: new BN(obj.executed_at_slot),
    })
  }

  toEncodable() {
    return MethodologyCommitteeChanged.toEncodable(this)
  }
}
