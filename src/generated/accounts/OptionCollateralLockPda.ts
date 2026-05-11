import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface OptionCollateralLockPdaFields {
  option: PublicKey
  writer: PublicKey
  collateral_kind: number
  vault: PublicKey
  mint: PublicKey
  locked_qty: BN
  released_qty: BN
  locked_value_usd_micro_at_fill: BN
  er_at_fill: BN
  sol_usd_at_fill: BN
  haircut_bps: number
  state: number
  bump: number
  padding: Array<number>
}

export interface OptionCollateralLockPdaJSON {
  option: string
  writer: string
  collateral_kind: number
  vault: string
  mint: string
  locked_qty: string
  released_qty: string
  locked_value_usd_micro_at_fill: string
  er_at_fill: string
  sol_usd_at_fill: string
  haircut_bps: number
  state: number
  bump: number
  padding: Array<number>
}

export class OptionCollateralLockPda {
  readonly option: PublicKey
  readonly writer: PublicKey
  readonly collateral_kind: number
  readonly vault: PublicKey
  readonly mint: PublicKey
  readonly locked_qty: BN
  readonly released_qty: BN
  readonly locked_value_usd_micro_at_fill: BN
  readonly er_at_fill: BN
  readonly sol_usd_at_fill: BN
  readonly haircut_bps: number
  readonly state: number
  readonly bump: number
  readonly padding: Array<number>

  static readonly discriminator = Buffer.from([
    110, 149, 91, 6, 91, 91, 92, 141,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("option"),
    borsh.publicKey("writer"),
    borsh.u8("collateral_kind"),
    borsh.publicKey("vault"),
    borsh.publicKey("mint"),
    borsh.u64("locked_qty"),
    borsh.u64("released_qty"),
    borsh.u64("locked_value_usd_micro_at_fill"),
    borsh.u64("er_at_fill"),
    borsh.u64("sol_usd_at_fill"),
    borsh.u16("haircut_bps"),
    borsh.u8("state"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 6, "padding"),
  ])

  constructor(fields: OptionCollateralLockPdaFields) {
    this.option = fields.option
    this.writer = fields.writer
    this.collateral_kind = fields.collateral_kind
    this.vault = fields.vault
    this.mint = fields.mint
    this.locked_qty = fields.locked_qty
    this.released_qty = fields.released_qty
    this.locked_value_usd_micro_at_fill = fields.locked_value_usd_micro_at_fill
    this.er_at_fill = fields.er_at_fill
    this.sol_usd_at_fill = fields.sol_usd_at_fill
    this.haircut_bps = fields.haircut_bps
    this.state = fields.state
    this.bump = fields.bump
    this.padding = fields.padding
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<OptionCollateralLockPda | null> {
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
  ): Promise<Array<OptionCollateralLockPda | null>> {
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

  static decode(data: Buffer): OptionCollateralLockPda {
    if (!data.slice(0, 8).equals(OptionCollateralLockPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = OptionCollateralLockPda.layout.decode(data.slice(8))

    return new OptionCollateralLockPda({
      option: dec.option,
      writer: dec.writer,
      collateral_kind: dec.collateral_kind,
      vault: dec.vault,
      mint: dec.mint,
      locked_qty: dec.locked_qty,
      released_qty: dec.released_qty,
      locked_value_usd_micro_at_fill: dec.locked_value_usd_micro_at_fill,
      er_at_fill: dec.er_at_fill,
      sol_usd_at_fill: dec.sol_usd_at_fill,
      haircut_bps: dec.haircut_bps,
      state: dec.state,
      bump: dec.bump,
      padding: dec.padding,
    })
  }

  toJSON(): OptionCollateralLockPdaJSON {
    return {
      option: this.option.toString(),
      writer: this.writer.toString(),
      collateral_kind: this.collateral_kind,
      vault: this.vault.toString(),
      mint: this.mint.toString(),
      locked_qty: this.locked_qty.toString(),
      released_qty: this.released_qty.toString(),
      locked_value_usd_micro_at_fill:
        this.locked_value_usd_micro_at_fill.toString(),
      er_at_fill: this.er_at_fill.toString(),
      sol_usd_at_fill: this.sol_usd_at_fill.toString(),
      haircut_bps: this.haircut_bps,
      state: this.state,
      bump: this.bump,
      padding: this.padding,
    }
  }

  static fromJSON(obj: OptionCollateralLockPdaJSON): OptionCollateralLockPda {
    return new OptionCollateralLockPda({
      option: new PublicKey(obj.option),
      writer: new PublicKey(obj.writer),
      collateral_kind: obj.collateral_kind,
      vault: new PublicKey(obj.vault),
      mint: new PublicKey(obj.mint),
      locked_qty: new BN(obj.locked_qty),
      released_qty: new BN(obj.released_qty),
      locked_value_usd_micro_at_fill: new BN(
        obj.locked_value_usd_micro_at_fill
      ),
      er_at_fill: new BN(obj.er_at_fill),
      sol_usd_at_fill: new BN(obj.sol_usd_at_fill),
      haircut_bps: obj.haircut_bps,
      state: obj.state,
      bump: obj.bump,
      padding: obj.padding,
    })
  }
}
