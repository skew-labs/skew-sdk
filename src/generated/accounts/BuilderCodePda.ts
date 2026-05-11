import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface BuilderCodePdaFields {
  builder: PublicKey
  bump: number
  registered_at: BN
  deposit_locked: BN
  volume_30d_routed_micro: BN
  last_volume_update_ts: BN
  fees_accrued_micro: BN
  label: Array<number>
}

export interface BuilderCodePdaJSON {
  builder: string
  bump: number
  registered_at: string
  deposit_locked: string
  volume_30d_routed_micro: string
  last_volume_update_ts: string
  fees_accrued_micro: string
  label: Array<number>
}

export class BuilderCodePda {
  readonly builder: PublicKey
  readonly bump: number
  readonly registered_at: BN
  readonly deposit_locked: BN
  readonly volume_30d_routed_micro: BN
  readonly last_volume_update_ts: BN
  readonly fees_accrued_micro: BN
  readonly label: Array<number>

  static readonly discriminator = Buffer.from([
    29, 146, 194, 24, 63, 34, 34, 195,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("builder"),
    borsh.u8("bump"),
    borsh.i64("registered_at"),
    borsh.u64("deposit_locked"),
    borsh.u64("volume_30d_routed_micro"),
    borsh.i64("last_volume_update_ts"),
    borsh.u64("fees_accrued_micro"),
    borsh.array(borsh.u8(), 32, "label"),
  ])

  constructor(fields: BuilderCodePdaFields) {
    this.builder = fields.builder
    this.bump = fields.bump
    this.registered_at = fields.registered_at
    this.deposit_locked = fields.deposit_locked
    this.volume_30d_routed_micro = fields.volume_30d_routed_micro
    this.last_volume_update_ts = fields.last_volume_update_ts
    this.fees_accrued_micro = fields.fees_accrued_micro
    this.label = fields.label
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<BuilderCodePda | null> {
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
  ): Promise<Array<BuilderCodePda | null>> {
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

  static decode(data: Buffer): BuilderCodePda {
    if (!data.slice(0, 8).equals(BuilderCodePda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = BuilderCodePda.layout.decode(data.slice(8))

    return new BuilderCodePda({
      builder: dec.builder,
      bump: dec.bump,
      registered_at: dec.registered_at,
      deposit_locked: dec.deposit_locked,
      volume_30d_routed_micro: dec.volume_30d_routed_micro,
      last_volume_update_ts: dec.last_volume_update_ts,
      fees_accrued_micro: dec.fees_accrued_micro,
      label: dec.label,
    })
  }

  toJSON(): BuilderCodePdaJSON {
    return {
      builder: this.builder.toString(),
      bump: this.bump,
      registered_at: this.registered_at.toString(),
      deposit_locked: this.deposit_locked.toString(),
      volume_30d_routed_micro: this.volume_30d_routed_micro.toString(),
      last_volume_update_ts: this.last_volume_update_ts.toString(),
      fees_accrued_micro: this.fees_accrued_micro.toString(),
      label: this.label,
    }
  }

  static fromJSON(obj: BuilderCodePdaJSON): BuilderCodePda {
    return new BuilderCodePda({
      builder: new PublicKey(obj.builder),
      bump: obj.bump,
      registered_at: new BN(obj.registered_at),
      deposit_locked: new BN(obj.deposit_locked),
      volume_30d_routed_micro: new BN(obj.volume_30d_routed_micro),
      last_volume_update_ts: new BN(obj.last_volume_update_ts),
      fees_accrued_micro: new BN(obj.fees_accrued_micro),
      label: obj.label,
    })
  }
}
