import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RegisterComboV2ArgsFields {
  combo_id: BN
  leg_count: number
  legs: Array<types.ComboV2LegFields>
  total_max_premium_micro: BN
  expires_ts: BN
}

export interface RegisterComboV2ArgsJSON {
  combo_id: string
  leg_count: number
  legs: Array<types.ComboV2LegJSON>
  total_max_premium_micro: string
  expires_ts: string
}

export class RegisterComboV2Args {
  readonly combo_id: BN
  readonly leg_count: number
  readonly legs: Array<types.ComboV2Leg>
  readonly total_max_premium_micro: BN
  readonly expires_ts: BN

  constructor(fields: RegisterComboV2ArgsFields) {
    this.combo_id = fields.combo_id
    this.leg_count = fields.leg_count
    this.legs = fields.legs.map((item) => new types.ComboV2Leg({ ...item }))
    this.total_max_premium_micro = fields.total_max_premium_micro
    this.expires_ts = fields.expires_ts
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("combo_id"),
        borsh.u8("leg_count"),
        borsh.vec(types.ComboV2Leg.layout(), "legs"),
        borsh.u64("total_max_premium_micro"),
        borsh.i64("expires_ts"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RegisterComboV2Args({
      combo_id: obj.combo_id,
      leg_count: obj.leg_count,
      legs: obj.legs.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.ComboV2Leg.fromDecoded(item)
      ),
      total_max_premium_micro: obj.total_max_premium_micro,
      expires_ts: obj.expires_ts,
    })
  }

  static toEncodable(fields: RegisterComboV2ArgsFields) {
    return {
      combo_id: fields.combo_id,
      leg_count: fields.leg_count,
      legs: fields.legs.map((item) => types.ComboV2Leg.toEncodable(item)),
      total_max_premium_micro: fields.total_max_premium_micro,
      expires_ts: fields.expires_ts,
    }
  }

  toJSON(): RegisterComboV2ArgsJSON {
    return {
      combo_id: this.combo_id.toString(),
      leg_count: this.leg_count,
      legs: this.legs.map((item) => item.toJSON()),
      total_max_premium_micro: this.total_max_premium_micro.toString(),
      expires_ts: this.expires_ts.toString(),
    }
  }

  static fromJSON(obj: RegisterComboV2ArgsJSON): RegisterComboV2Args {
    return new RegisterComboV2Args({
      combo_id: new BN(obj.combo_id),
      leg_count: obj.leg_count,
      legs: obj.legs.map((item) => types.ComboV2Leg.fromJSON(item)),
      total_max_premium_micro: new BN(obj.total_max_premium_micro),
      expires_ts: new BN(obj.expires_ts),
    })
  }

  toEncodable() {
    return RegisterComboV2Args.toEncodable(this)
  }
}
