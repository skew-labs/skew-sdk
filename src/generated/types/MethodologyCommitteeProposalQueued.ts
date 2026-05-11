import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MethodologyCommitteeProposalQueuedFields {
  proposal: PublicKey
  committee: PublicKey
  op: number
  target: PublicKey
  independent: boolean
  queued_at_slot: BN
}

export interface MethodologyCommitteeProposalQueuedJSON {
  proposal: string
  committee: string
  op: number
  target: string
  independent: boolean
  queued_at_slot: string
}

export class MethodologyCommitteeProposalQueued {
  readonly proposal: PublicKey
  readonly committee: PublicKey
  readonly op: number
  readonly target: PublicKey
  readonly independent: boolean
  readonly queued_at_slot: BN

  constructor(fields: MethodologyCommitteeProposalQueuedFields) {
    this.proposal = fields.proposal
    this.committee = fields.committee
    this.op = fields.op
    this.target = fields.target
    this.independent = fields.independent
    this.queued_at_slot = fields.queued_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("proposal"),
        borsh.publicKey("committee"),
        borsh.u8("op"),
        borsh.publicKey("target"),
        borsh.bool("independent"),
        borsh.u64("queued_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MethodologyCommitteeProposalQueued({
      proposal: obj.proposal,
      committee: obj.committee,
      op: obj.op,
      target: obj.target,
      independent: obj.independent,
      queued_at_slot: obj.queued_at_slot,
    })
  }

  static toEncodable(fields: MethodologyCommitteeProposalQueuedFields) {
    return {
      proposal: fields.proposal,
      committee: fields.committee,
      op: fields.op,
      target: fields.target,
      independent: fields.independent,
      queued_at_slot: fields.queued_at_slot,
    }
  }

  toJSON(): MethodologyCommitteeProposalQueuedJSON {
    return {
      proposal: this.proposal.toString(),
      committee: this.committee.toString(),
      op: this.op,
      target: this.target.toString(),
      independent: this.independent,
      queued_at_slot: this.queued_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: MethodologyCommitteeProposalQueuedJSON
  ): MethodologyCommitteeProposalQueued {
    return new MethodologyCommitteeProposalQueued({
      proposal: new PublicKey(obj.proposal),
      committee: new PublicKey(obj.committee),
      op: obj.op,
      target: new PublicKey(obj.target),
      independent: obj.independent,
      queued_at_slot: new BN(obj.queued_at_slot),
    })
  }

  toEncodable() {
    return MethodologyCommitteeProposalQueued.toEncodable(this)
  }
}
