import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface ComboIntentPdaV2Fields {
  buyer: PublicKey
  combo_id: BN
  status: number
  leg_count: number
  legs_filled: number
  bump: number
  _padding_0: Array<number>
  total_max_premium_micro: BN
  total_realised_premium_micro: BN
  expires_ts: BN
  created_at: BN
  legs: Array<types.ComboV2LegFields>
  _reserved: Array<number>
}

export interface ComboIntentPdaV2JSON {
  buyer: string
  combo_id: string
  status: number
  leg_count: number
  legs_filled: number
  bump: number
  _padding_0: Array<number>
  total_max_premium_micro: string
  total_realised_premium_micro: string
  expires_ts: string
  created_at: string
  legs: Array<types.ComboV2LegJSON>
  _reserved: Array<number>
}

export class ComboIntentPdaV2 {
  readonly buyer: PublicKey
  readonly combo_id: BN
  readonly status: number
  readonly leg_count: number
  readonly legs_filled: number
  readonly bump: number
  readonly _padding_0: Array<number>
  readonly total_max_premium_micro: BN
  readonly total_realised_premium_micro: BN
  readonly expires_ts: BN
  readonly created_at: BN
  readonly legs: Array<types.ComboV2Leg>
  readonly _reserved: Array<number>

  static readonly discriminator = Buffer.from([
    87, 159, 230, 126, 131, 0, 229, 27,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("buyer"),
    borsh.u64("combo_id"),
    borsh.u8("status"),
    borsh.u8("leg_count"),
    borsh.u8("legs_filled"),
    borsh.u8("bump"),
    borsh.array(borsh.u8(), 4, "_padding_0"),
    borsh.u64("total_max_premium_micro"),
    borsh.u64("total_realised_premium_micro"),
    borsh.i64("expires_ts"),
    borsh.i64("created_at"),
    borsh.array(types.ComboV2Leg.layout(), 32, "legs"),
    borsh.array(borsh.u8(), 64, "_reserved"),
  ])

  constructor(fields: ComboIntentPdaV2Fields) {
    this.buyer = fields.buyer
    this.combo_id = fields.combo_id
    this.status = fields.status
    this.leg_count = fields.leg_count
    this.legs_filled = fields.legs_filled
    this.bump = fields.bump
    this._padding_0 = fields._padding_0
    this.total_max_premium_micro = fields.total_max_premium_micro
    this.total_realised_premium_micro = fields.total_realised_premium_micro
    this.expires_ts = fields.expires_ts
    this.created_at = fields.created_at
    this.legs = fields.legs.map((item) => new types.ComboV2Leg({ ...item }))
    this._reserved = fields._reserved
  }

  static async fetch(
    c: Connection,
    address: PublicKey,
    programId: PublicKey = PROGRAM_ID
  ): Promise<ComboIntentPdaV2 | null> {
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
  ): Promise<Array<ComboIntentPdaV2 | null>> {
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

  static decode(data: Buffer): ComboIntentPdaV2 {
    if (!data.slice(0, 8).equals(ComboIntentPdaV2.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = ComboIntentPdaV2.layout.decode(data.slice(8))

    return new ComboIntentPdaV2({
      buyer: dec.buyer,
      combo_id: dec.combo_id,
      status: dec.status,
      leg_count: dec.leg_count,
      legs_filled: dec.legs_filled,
      bump: dec.bump,
      _padding_0: dec._padding_0,
      total_max_premium_micro: dec.total_max_premium_micro,
      total_realised_premium_micro: dec.total_realised_premium_micro,
      expires_ts: dec.expires_ts,
      created_at: dec.created_at,
      legs: dec.legs.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.ComboV2Leg.fromDecoded(item)
      ),
      _reserved: dec._reserved,
    })
  }

  toJSON(): ComboIntentPdaV2JSON {
    return {
      buyer: this.buyer.toString(),
      combo_id: this.combo_id.toString(),
      status: this.status,
      leg_count: this.leg_count,
      legs_filled: this.legs_filled,
      bump: this.bump,
      _padding_0: this._padding_0,
      total_max_premium_micro: this.total_max_premium_micro.toString(),
      total_realised_premium_micro:
        this.total_realised_premium_micro.toString(),
      expires_ts: this.expires_ts.toString(),
      created_at: this.created_at.toString(),
      legs: this.legs.map((item) => item.toJSON()),
      _reserved: this._reserved,
    }
  }

  static fromJSON(obj: ComboIntentPdaV2JSON): ComboIntentPdaV2 {
    return new ComboIntentPdaV2({
      buyer: new PublicKey(obj.buyer),
      combo_id: new BN(obj.combo_id),
      status: obj.status,
      leg_count: obj.leg_count,
      legs_filled: obj.legs_filled,
      bump: obj.bump,
      _padding_0: obj._padding_0,
      total_max_premium_micro: new BN(obj.total_max_premium_micro),
      total_realised_premium_micro: new BN(obj.total_realised_premium_micro),
      expires_ts: new BN(obj.expires_ts),
      created_at: new BN(obj.created_at),
      legs: obj.legs.map((item) => types.ComboV2Leg.fromJSON(item)),
      _reserved: obj._reserved,
    })
  }
}
