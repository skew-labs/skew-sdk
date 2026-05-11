import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface VolumeTrackerPdaFields {
  authority: PublicKey
  bump: number
  volume_30d_micro: BN
  equity_micro: BN
  last_update_ts: BN
  current_vip_tier: number
}

export interface VolumeTrackerPdaJSON {
  authority: string
  bump: number
  volume_30d_micro: string
  equity_micro: string
  last_update_ts: string
  current_vip_tier: number
}

export class VolumeTrackerPda {
  readonly authority: PublicKey
  readonly bump: number
  readonly volume_30d_micro: BN
  readonly equity_micro: BN
  readonly last_update_ts: BN
  readonly current_vip_tier: number

  static readonly discriminator = Buffer.from([
    230, 232, 138, 113, 40, 219, 168, 85,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.u64("volume_30d_micro"),
    borsh.u64("equity_micro"),
    borsh.i64("last_update_ts"),
    borsh.u8("current_vip_tier"),
  ])

  constructor(fields: VolumeTrackerPdaFields) {
    this.authority = fields.authority
    this.bump = fields.bump
    this.volume_30d_micro = fields.volume_30d_micro
    this.equity_micro = fields.equity_micro
    this.last_update_ts = fields.last_update_ts
    this.current_vip_tier = fields.current_vip_tier
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<VolumeTrackerPda | null> {
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
  ): Promise<Array<VolumeTrackerPda | null>> {
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

  static decode(data: Buffer): VolumeTrackerPda {
    if (!data.slice(0, 8).equals(VolumeTrackerPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = VolumeTrackerPda.layout.decode(data.slice(8))

    return new VolumeTrackerPda({
      authority: dec.authority,
      bump: dec.bump,
      volume_30d_micro: dec.volume_30d_micro,
      equity_micro: dec.equity_micro,
      last_update_ts: dec.last_update_ts,
      current_vip_tier: dec.current_vip_tier,
    })
  }

  toJSON(): VolumeTrackerPdaJSON {
    return {
      authority: this.authority.toString(),
      bump: this.bump,
      volume_30d_micro: this.volume_30d_micro.toString(),
      equity_micro: this.equity_micro.toString(),
      last_update_ts: this.last_update_ts.toString(),
      current_vip_tier: this.current_vip_tier,
    }
  }

  static fromJSON(obj: VolumeTrackerPdaJSON): VolumeTrackerPda {
    return new VolumeTrackerPda({
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      volume_30d_micro: new BN(obj.volume_30d_micro),
      equity_micro: new BN(obj.equity_micro),
      last_update_ts: new BN(obj.last_update_ts),
      current_vip_tier: obj.current_vip_tier,
    })
  }
}
