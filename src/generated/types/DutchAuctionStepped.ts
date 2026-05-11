import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface DutchAuctionSteppedFields {
  defaulting_cm: PublicKey
  current_bonus_bps: number
  liq_start_ts: BN
  observed_at: BN
}

export interface DutchAuctionSteppedJSON {
  defaulting_cm: string
  current_bonus_bps: number
  liq_start_ts: string
  observed_at: string
}

export class DutchAuctionStepped {
  readonly defaulting_cm: PublicKey
  readonly current_bonus_bps: number
  readonly liq_start_ts: BN
  readonly observed_at: BN

  constructor(fields: DutchAuctionSteppedFields) {
    this.defaulting_cm = fields.defaulting_cm
    this.current_bonus_bps = fields.current_bonus_bps
    this.liq_start_ts = fields.liq_start_ts
    this.observed_at = fields.observed_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("defaulting_cm"),
        borsh.u16("current_bonus_bps"),
        borsh.i64("liq_start_ts"),
        borsh.i64("observed_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new DutchAuctionStepped({
      defaulting_cm: obj.defaulting_cm,
      current_bonus_bps: obj.current_bonus_bps,
      liq_start_ts: obj.liq_start_ts,
      observed_at: obj.observed_at,
    })
  }

  static toEncodable(fields: DutchAuctionSteppedFields) {
    return {
      defaulting_cm: fields.defaulting_cm,
      current_bonus_bps: fields.current_bonus_bps,
      liq_start_ts: fields.liq_start_ts,
      observed_at: fields.observed_at,
    }
  }

  toJSON(): DutchAuctionSteppedJSON {
    return {
      defaulting_cm: this.defaulting_cm.toString(),
      current_bonus_bps: this.current_bonus_bps,
      liq_start_ts: this.liq_start_ts.toString(),
      observed_at: this.observed_at.toString(),
    }
  }

  static fromJSON(obj: DutchAuctionSteppedJSON): DutchAuctionStepped {
    return new DutchAuctionStepped({
      defaulting_cm: new PublicKey(obj.defaulting_cm),
      current_bonus_bps: obj.current_bonus_bps,
      liq_start_ts: new BN(obj.liq_start_ts),
      observed_at: new BN(obj.observed_at),
    })
  }

  toEncodable() {
    return DutchAuctionStepped.toEncodable(this)
  }
}
