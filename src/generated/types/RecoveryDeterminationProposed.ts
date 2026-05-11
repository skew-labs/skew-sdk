import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RecoveryDeterminationProposedFields {
  determination: PublicKey
  committee: PublicKey
  id: BN
  trigger_kind: number
  proposal_digest: Array<number>
  proposed_at_slot: BN
}

export interface RecoveryDeterminationProposedJSON {
  determination: string
  committee: string
  id: string
  trigger_kind: number
  proposal_digest: Array<number>
  proposed_at_slot: string
}

export class RecoveryDeterminationProposed {
  readonly determination: PublicKey
  readonly committee: PublicKey
  readonly id: BN
  readonly trigger_kind: number
  readonly proposal_digest: Array<number>
  readonly proposed_at_slot: BN

  constructor(fields: RecoveryDeterminationProposedFields) {
    this.determination = fields.determination
    this.committee = fields.committee
    this.id = fields.id
    this.trigger_kind = fields.trigger_kind
    this.proposal_digest = fields.proposal_digest
    this.proposed_at_slot = fields.proposed_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("determination"),
        borsh.publicKey("committee"),
        borsh.u64("id"),
        borsh.u8("trigger_kind"),
        borsh.array(borsh.u8(), 32, "proposal_digest"),
        borsh.u64("proposed_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RecoveryDeterminationProposed({
      determination: obj.determination,
      committee: obj.committee,
      id: obj.id,
      trigger_kind: obj.trigger_kind,
      proposal_digest: obj.proposal_digest,
      proposed_at_slot: obj.proposed_at_slot,
    })
  }

  static toEncodable(fields: RecoveryDeterminationProposedFields) {
    return {
      determination: fields.determination,
      committee: fields.committee,
      id: fields.id,
      trigger_kind: fields.trigger_kind,
      proposal_digest: fields.proposal_digest,
      proposed_at_slot: fields.proposed_at_slot,
    }
  }

  toJSON(): RecoveryDeterminationProposedJSON {
    return {
      determination: this.determination.toString(),
      committee: this.committee.toString(),
      id: this.id.toString(),
      trigger_kind: this.trigger_kind,
      proposal_digest: this.proposal_digest,
      proposed_at_slot: this.proposed_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: RecoveryDeterminationProposedJSON
  ): RecoveryDeterminationProposed {
    return new RecoveryDeterminationProposed({
      determination: new PublicKey(obj.determination),
      committee: new PublicKey(obj.committee),
      id: new BN(obj.id),
      trigger_kind: obj.trigger_kind,
      proposal_digest: obj.proposal_digest,
      proposed_at_slot: new BN(obj.proposed_at_slot),
    })
  }

  toEncodable() {
    return RecoveryDeterminationProposed.toEncodable(this)
  }
}
