import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MethodologyCommitteeInitializedFields {
  committee: PublicKey
  member_count: number
  independent_count: number
  initialised_at_slot: BN
}

export interface MethodologyCommitteeInitializedJSON {
  committee: string
  member_count: number
  independent_count: number
  initialised_at_slot: string
}

export class MethodologyCommitteeInitialized {
  readonly committee: PublicKey
  readonly member_count: number
  readonly independent_count: number
  readonly initialised_at_slot: BN

  constructor(fields: MethodologyCommitteeInitializedFields) {
    this.committee = fields.committee
    this.member_count = fields.member_count
    this.independent_count = fields.independent_count
    this.initialised_at_slot = fields.initialised_at_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("committee"),
        borsh.u8("member_count"),
        borsh.u8("independent_count"),
        borsh.u64("initialised_at_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MethodologyCommitteeInitialized({
      committee: obj.committee,
      member_count: obj.member_count,
      independent_count: obj.independent_count,
      initialised_at_slot: obj.initialised_at_slot,
    })
  }

  static toEncodable(fields: MethodologyCommitteeInitializedFields) {
    return {
      committee: fields.committee,
      member_count: fields.member_count,
      independent_count: fields.independent_count,
      initialised_at_slot: fields.initialised_at_slot,
    }
  }

  toJSON(): MethodologyCommitteeInitializedJSON {
    return {
      committee: this.committee.toString(),
      member_count: this.member_count,
      independent_count: this.independent_count,
      initialised_at_slot: this.initialised_at_slot.toString(),
    }
  }

  static fromJSON(
    obj: MethodologyCommitteeInitializedJSON
  ): MethodologyCommitteeInitialized {
    return new MethodologyCommitteeInitialized({
      committee: new PublicKey(obj.committee),
      member_count: obj.member_count,
      independent_count: obj.independent_count,
      initialised_at_slot: new BN(obj.initialised_at_slot),
    })
  }

  toEncodable() {
    return MethodologyCommitteeInitialized.toEncodable(this)
  }
}
