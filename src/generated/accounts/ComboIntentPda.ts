import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ComboIntentPdaFields {
  buyer: PublicKey
  combo_id: BN
  n_legs: number
  legs_filled_mask: number
  status: types.ComboStatusKind
  bump: number
  _padding_0: Array<number>
  total_max_premium_micro: BN
  total_premium_paid_micro: BN
  expiry_ts: BN
  created_at: BN
  legs: Array<types.ComboLegSpecFields>
}

export interface ComboIntentPdaJSON {
  buyer: string
  combo_id: string
  n_legs: number
  legs_filled_mask: number
  status: types.ComboStatusJSON
  bump: number
  _padding_0: Array<number>
  total_max_premium_micro: string
  total_premium_paid_micro: string
  expiry_ts: string
  created_at: string
  legs: Array<types.ComboLegSpecJSON>
}

export class ComboIntentPda {
  readonly buyer: PublicKey
  readonly combo_id: BN
  readonly n_legs: number
  readonly legs_filled_mask: number
  readonly status: types.ComboStatusKind
  readonly bump: number
  readonly _padding_0: Array<number>
  readonly total_max_premium_micro: BN
  readonly total_premium_paid_micro: BN
  readonly expiry_ts: BN
  readonly created_at: BN
  readonly legs: Array<types.ComboLegSpec>

  static readonly discriminator = Buffer.from([
    39, 204, 133, 2, 228, 151, 60, 203,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("buyer"),
    borsh.u64("combo_id"),
    borsh.u8("n_legs"),
    borsh.u8("legs_filled_mask"),
    types.ComboStatus.layout("status"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 4, "_padding_0"),
    borsh.u64("total_max_premium_micro"),
    borsh.u64("total_premium_paid_micro"),
    borsh.i64("expiry_ts"),
    borsh.i64("created_at"),
    borsh.array(types.ComboLegSpec.layout(), 4, "legs"),
  ])

  constructor(fields: ComboIntentPdaFields) {
    this.buyer = fields.buyer
    this.combo_id = fields.combo_id
    this.n_legs = fields.n_legs
    this.legs_filled_mask = fields.legs_filled_mask
    this.status = fields.status
    this.bump = fields.bump
    this._padding_0 = fields._padding_0
    this.total_max_premium_micro = fields.total_max_premium_micro
    this.total_premium_paid_micro = fields.total_premium_paid_micro
    this.expiry_ts = fields.expiry_ts
    this.created_at = fields.created_at
    this.legs = fields.legs.map((item) => new types.ComboLegSpec({ ...item }))
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ComboIntentPda | null> {
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
  ): Promise<Array<ComboIntentPda | null>> {
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

  static decode(data: Buffer): ComboIntentPda {
    if (!data.slice(0, 8).equals(ComboIntentPda.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ComboIntentPda.layout.decode(data.slice(8))

    return new ComboIntentPda({
      buyer: dec.buyer,
      combo_id: dec.combo_id,
      n_legs: dec.n_legs,
      legs_filled_mask: dec.legs_filled_mask,
      status: types.ComboStatus.fromDecoded(dec.status),
      bump: dec.bump,
      _padding_0: dec._padding_0,
      total_max_premium_micro: dec.total_max_premium_micro,
      total_premium_paid_micro: dec.total_premium_paid_micro,
      expiry_ts: dec.expiry_ts,
      created_at: dec.created_at,
      legs: dec.legs.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.ComboLegSpec.fromDecoded(item)
      ),
    })
  }

  toJSON(): ComboIntentPdaJSON {
    return {
      buyer: this.buyer.toString(),
      combo_id: this.combo_id.toString(),
      n_legs: this.n_legs,
      legs_filled_mask: this.legs_filled_mask,
      status: this.status.toJSON(),
      bump: this.bump,
      _padding_0: this._padding_0,
      total_max_premium_micro: this.total_max_premium_micro.toString(),
      total_premium_paid_micro: this.total_premium_paid_micro.toString(),
      expiry_ts: this.expiry_ts.toString(),
      created_at: this.created_at.toString(),
      legs: this.legs.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: ComboIntentPdaJSON): ComboIntentPda {
    return new ComboIntentPda({
      buyer: new PublicKey(obj.buyer),
      combo_id: new BN(obj.combo_id),
      n_legs: obj.n_legs,
      legs_filled_mask: obj.legs_filled_mask,
      status: types.ComboStatus.fromJSON(obj.status),
      bump: obj.bump,
      _padding_0: obj._padding_0,
      total_max_premium_micro: new BN(obj.total_max_premium_micro),
      total_premium_paid_micro: new BN(obj.total_premium_paid_micro),
      expiry_ts: new BN(obj.expiry_ts),
      created_at: new BN(obj.created_at),
      legs: obj.legs.map((item) => types.ComboLegSpec.fromJSON(item)),
    })
  }
}
