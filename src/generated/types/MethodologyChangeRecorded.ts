import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface MethodologyChangeRecordedFields {
  committee: PublicKey
  decision: PublicKey
  id: BN
  kind: number
  recorded_at_slot: BN
  notice_start_slot: BN
}

export interface MethodologyChangeRecordedJSON {
  committee: string
  decision: string
  id: string
  kind: number
  recorded_at_slot: string
  notice_start_slot: string
}

export class MethodologyChangeRecorded {
  readonly committee: PublicKey
  readonly decision: PublicKey
  readonly id: BN
  readonly kind: number
  readonly recorded_at_slot: BN
  readonly notice_start_slot: BN

  constructor(fields: MethodologyChangeRecordedFields) {
    this.committee = fields.committee
    this.decision = fields.decision
    this.id = fields.id
    this.kind = fields.kind
    this.recorded_at_slot = fields.recorded_at_slot
    this.notice_start_slot = fields.notice_start_slot
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("committee"),
        borsh.publicKey("decision"),
        borsh.u64("id"),
        borsh.u8("kind"),
        borsh.u64("recorded_at_slot"),
        borsh.u64("notice_start_slot"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new MethodologyChangeRecorded({
      committee: obj.committee,
      decision: obj.decision,
      id: obj.id,
      kind: obj.kind,
      recorded_at_slot: obj.recorded_at_slot,
      notice_start_slot: obj.notice_start_slot,
    })
  }

  static toEncodable(fields: MethodologyChangeRecordedFields) {
    return {
      committee: fields.committee,
      decision: fields.decision,
      id: fields.id,
      kind: fields.kind,
      recorded_at_slot: fields.recorded_at_slot,
      notice_start_slot: fields.notice_start_slot,
    }
  }

  toJSON(): MethodologyChangeRecordedJSON {
    return {
      committee: this.committee.toString(),
      decision: this.decision.toString(),
      id: this.id.toString(),
      kind: this.kind,
      recorded_at_slot: this.recorded_at_slot.toString(),
      notice_start_slot: this.notice_start_slot.toString(),
    }
  }

  static fromJSON(
    obj: MethodologyChangeRecordedJSON
  ): MethodologyChangeRecorded {
    return new MethodologyChangeRecorded({
      committee: new PublicKey(obj.committee),
      decision: new PublicKey(obj.decision),
      id: new BN(obj.id),
      kind: obj.kind,
      recorded_at_slot: new BN(obj.recorded_at_slot),
      notice_start_slot: new BN(obj.notice_start_slot),
    })
  }

  toEncodable() {
    return MethodologyChangeRecorded.toEncodable(this)
  }
}
