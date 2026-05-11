import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface IsolatedVaultFields {
  user: PublicKey
  option: PublicKey
  usdc_micro: BN
  locked_micro: BN
  realized_pnl_micro: BN
  bump: number
  _padding: Array<number>
}

export interface IsolatedVaultJSON {
  user: string
  option: string
  usdc_micro: string
  locked_micro: string
  realized_pnl_micro: string
  bump: number
  _padding: Array<number>
}

export class IsolatedVault {
  readonly user: PublicKey
  readonly option: PublicKey
  readonly usdc_micro: BN
  readonly locked_micro: BN
  readonly realized_pnl_micro: BN
  readonly bump: number
  readonly _padding: Array<number>

  static readonly discriminator = Buffer.from([
    151, 84, 249, 205, 196, 167, 216, 176,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("user"),
    borsh.publicKey("option"),
    borsh.u64("usdc_micro"),
    borsh.u64("locked_micro"),
    borsh.i64("realized_pnl_micro"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 7, "_padding"),
  ])

  constructor(fields: IsolatedVaultFields) {
    this.user = fields.user
    this.option = fields.option
    this.usdc_micro = fields.usdc_micro
    this.locked_micro = fields.locked_micro
    this.realized_pnl_micro = fields.realized_pnl_micro
    this.bump = fields.bump
    this._padding = fields._padding
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<IsolatedVault | null> {
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
  ): Promise<Array<IsolatedVault | null>> {
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

  static decode(data: Buffer): IsolatedVault {
    if (!data.slice(0, 8).equals(IsolatedVault.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = IsolatedVault.layout.decode(data.slice(8))

    return new IsolatedVault({
      user: dec.user,
      option: dec.option,
      usdc_micro: dec.usdc_micro,
      locked_micro: dec.locked_micro,
      realized_pnl_micro: dec.realized_pnl_micro,
      bump: dec.bump,
      _padding: dec._padding,
    })
  }

  toJSON(): IsolatedVaultJSON {
    return {
      user: this.user.toString(),
      option: this.option.toString(),
      usdc_micro: this.usdc_micro.toString(),
      locked_micro: this.locked_micro.toString(),
      realized_pnl_micro: this.realized_pnl_micro.toString(),
      bump: this.bump,
      _padding: this._padding,
    }
  }

  static fromJSON(obj: IsolatedVaultJSON): IsolatedVault {
    return new IsolatedVault({
      user: new PublicKey(obj.user),
      option: new PublicKey(obj.option),
      usdc_micro: new BN(obj.usdc_micro),
      locked_micro: new BN(obj.locked_micro),
      realized_pnl_micro: new BN(obj.realized_pnl_micro),
      bump: obj.bump,
      _padding: obj._padding,
    })
  }
}
