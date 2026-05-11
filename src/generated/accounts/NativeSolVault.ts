import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface NativeSolVaultFields {
  user: PublicKey
  sol_qty: BN
  locked_qty: BN
  last_update_slot: BN
  bump: number
}

export interface NativeSolVaultJSON {
  user: string
  sol_qty: string
  locked_qty: string
  last_update_slot: string
  bump: number
}

export class NativeSolVault {
  readonly user: PublicKey
  readonly sol_qty: BN
  readonly locked_qty: BN
  readonly last_update_slot: BN
  readonly bump: number

  static readonly discriminator = Buffer.from([
    117, 146, 121, 164, 23, 219, 228, 240,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("user"),
    borsh.u64("sol_qty"),
    borsh.u64("locked_qty"),
    borsh.u64("last_update_slot"),
    borsh.u8("bump"),
  ])

  constructor(fields: NativeSolVaultFields) {
    this.user = fields.user
    this.sol_qty = fields.sol_qty
    this.locked_qty = fields.locked_qty
    this.last_update_slot = fields.last_update_slot
    this.bump = fields.bump
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<NativeSolVault | null> {
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
  ): Promise<Array<NativeSolVault | null>> {
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

  static decode(data: Buffer): NativeSolVault {
    if (!data.slice(0, 8).equals(NativeSolVault.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = NativeSolVault.layout.decode(data.slice(8))

    return new NativeSolVault({
      user: dec.user,
      sol_qty: dec.sol_qty,
      locked_qty: dec.locked_qty,
      last_update_slot: dec.last_update_slot,
      bump: dec.bump,
    })
  }

  toJSON(): NativeSolVaultJSON {
    return {
      user: this.user.toString(),
      sol_qty: this.sol_qty.toString(),
      locked_qty: this.locked_qty.toString(),
      last_update_slot: this.last_update_slot.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: NativeSolVaultJSON): NativeSolVault {
    return new NativeSolVault({
      user: new PublicKey(obj.user),
      sol_qty: new BN(obj.sol_qty),
      locked_qty: new BN(obj.locked_qty),
      last_update_slot: new BN(obj.last_update_slot),
      bump: obj.bump,
    })
  }
}
