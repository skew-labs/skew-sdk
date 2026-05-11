import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface LstVaultFields {
  user: PublicKey
  lst_mint: PublicKey
  lst_qty: BN
  locked_qty: BN
  last_er_update_slot: BN
  bump: number
  tier_locked_qty: BN
}

export interface LstVaultJSON {
  user: string
  lst_mint: string
  lst_qty: string
  locked_qty: string
  last_er_update_slot: string
  bump: number
  tier_locked_qty: string
}

export class LstVault {
  readonly user: PublicKey
  readonly lst_mint: PublicKey
  readonly lst_qty: BN
  readonly locked_qty: BN
  readonly last_er_update_slot: BN
  readonly bump: number
  readonly tier_locked_qty: BN

  static readonly discriminator = Buffer.from([
    182, 228, 179, 101, 201, 139, 29, 84,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("user"),
    borsh.publicKey("lst_mint"),
    borsh.u64("lst_qty"),
    borsh.u64("locked_qty"),
    borsh.u64("last_er_update_slot"),
    borsh.u8("bump"),
    borsh.u64("tier_locked_qty"),
  ])

  constructor(fields: LstVaultFields) {
    this.user = fields.user
    this.lst_mint = fields.lst_mint
    this.lst_qty = fields.lst_qty
    this.locked_qty = fields.locked_qty
    this.last_er_update_slot = fields.last_er_update_slot
    this.bump = fields.bump
    this.tier_locked_qty = fields.tier_locked_qty
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<LstVault | null> {
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
  ): Promise<Array<LstVault | null>> {
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

  static decode(data: Buffer): LstVault {
    if (!data.slice(0, 8).equals(LstVault.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = LstVault.layout.decode(data.slice(8))

    return new LstVault({
      user: dec.user,
      lst_mint: dec.lst_mint,
      lst_qty: dec.lst_qty,
      locked_qty: dec.locked_qty,
      last_er_update_slot: dec.last_er_update_slot,
      bump: dec.bump,
      tier_locked_qty: dec.tier_locked_qty,
    })
  }

  toJSON(): LstVaultJSON {
    return {
      user: this.user.toString(),
      lst_mint: this.lst_mint.toString(),
      lst_qty: this.lst_qty.toString(),
      locked_qty: this.locked_qty.toString(),
      last_er_update_slot: this.last_er_update_slot.toString(),
      bump: this.bump,
      tier_locked_qty: this.tier_locked_qty.toString(),
    }
  }

  static fromJSON(obj: LstVaultJSON): LstVault {
    return new LstVault({
      user: new PublicKey(obj.user),
      lst_mint: new PublicKey(obj.lst_mint),
      lst_qty: new BN(obj.lst_qty),
      locked_qty: new BN(obj.locked_qty),
      last_er_update_slot: new BN(obj.last_er_update_slot),
      bump: obj.bump,
      tier_locked_qty: new BN(obj.tier_locked_qty),
    })
  }
}
