import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface InsuranceFundFields {
  authority: PublicKey
  bump: number
  initialized_at: BN
  tier3_protocol_sitg: BN
  tier1_mutualized_pool: BN
  tier2_mutualized_pool: BN
  cross_mutualized_pool: BN
  total_cm_contributions: BN
  total_drained: BN
  default_event_count: number
}

export interface InsuranceFundJSON {
  authority: string
  bump: number
  initialized_at: string
  tier3_protocol_sitg: string
  tier1_mutualized_pool: string
  tier2_mutualized_pool: string
  cross_mutualized_pool: string
  total_cm_contributions: string
  total_drained: string
  default_event_count: number
}

export class InsuranceFund {
  readonly authority: PublicKey
  readonly bump: number
  readonly initialized_at: BN
  readonly tier3_protocol_sitg: BN
  readonly tier1_mutualized_pool: BN
  readonly tier2_mutualized_pool: BN
  readonly cross_mutualized_pool: BN
  readonly total_cm_contributions: BN
  readonly total_drained: BN
  readonly default_event_count: number

  static readonly discriminator = Buffer.from([
    43, 134, 170, 87, 102, 16, 142, 147,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.i64("initialized_at"),
    borsh.u64("tier3_protocol_sitg"),
    borsh.u64("tier1_mutualized_pool"),
    borsh.u64("tier2_mutualized_pool"),
    borsh.u64("cross_mutualized_pool"),
    borsh.u64("total_cm_contributions"),
    borsh.u64("total_drained"),
    borsh.u32("default_event_count"),
  ])

  constructor(fields: InsuranceFundFields) {
    this.authority = fields.authority
    this.bump = fields.bump
    this.initialized_at = fields.initialized_at
    this.tier3_protocol_sitg = fields.tier3_protocol_sitg
    this.tier1_mutualized_pool = fields.tier1_mutualized_pool
    this.tier2_mutualized_pool = fields.tier2_mutualized_pool
    this.cross_mutualized_pool = fields.cross_mutualized_pool
    this.total_cm_contributions = fields.total_cm_contributions
    this.total_drained = fields.total_drained
    this.default_event_count = fields.default_event_count
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<InsuranceFund | null> {
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
  ): Promise<Array<InsuranceFund | null>> {
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

  static decode(data: Buffer): InsuranceFund {
    if (!data.slice(0, 8).equals(InsuranceFund.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = InsuranceFund.layout.decode(data.slice(8))

    return new InsuranceFund({
      authority: dec.authority,
      bump: dec.bump,
      initialized_at: dec.initialized_at,
      tier3_protocol_sitg: dec.tier3_protocol_sitg,
      tier1_mutualized_pool: dec.tier1_mutualized_pool,
      tier2_mutualized_pool: dec.tier2_mutualized_pool,
      cross_mutualized_pool: dec.cross_mutualized_pool,
      total_cm_contributions: dec.total_cm_contributions,
      total_drained: dec.total_drained,
      default_event_count: dec.default_event_count,
    })
  }

  toJSON(): InsuranceFundJSON {
    return {
      authority: this.authority.toString(),
      bump: this.bump,
      initialized_at: this.initialized_at.toString(),
      tier3_protocol_sitg: this.tier3_protocol_sitg.toString(),
      tier1_mutualized_pool: this.tier1_mutualized_pool.toString(),
      tier2_mutualized_pool: this.tier2_mutualized_pool.toString(),
      cross_mutualized_pool: this.cross_mutualized_pool.toString(),
      total_cm_contributions: this.total_cm_contributions.toString(),
      total_drained: this.total_drained.toString(),
      default_event_count: this.default_event_count,
    }
  }

  static fromJSON(obj: InsuranceFundJSON): InsuranceFund {
    return new InsuranceFund({
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      initialized_at: new BN(obj.initialized_at),
      tier3_protocol_sitg: new BN(obj.tier3_protocol_sitg),
      tier1_mutualized_pool: new BN(obj.tier1_mutualized_pool),
      tier2_mutualized_pool: new BN(obj.tier2_mutualized_pool),
      cross_mutualized_pool: new BN(obj.cross_mutualized_pool),
      total_cm_contributions: new BN(obj.total_cm_contributions),
      total_drained: new BN(obj.total_drained),
      default_event_count: obj.default_event_count,
    })
  }
}
