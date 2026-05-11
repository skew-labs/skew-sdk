import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface IvHistoryEntryFields {
  date_unix: BN
  iv_micro: BN
  vrp_rel_micro: BN
}

export interface IvHistoryEntryJSON {
  date_unix: string
  iv_micro: string
  vrp_rel_micro: string
}

export class IvHistoryEntry {
  readonly date_unix: BN
  readonly iv_micro: BN
  readonly vrp_rel_micro: BN

  constructor(fields: IvHistoryEntryFields) {
    this.date_unix = fields.date_unix
    this.iv_micro = fields.iv_micro
    this.vrp_rel_micro = fields.vrp_rel_micro
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.i64("date_unix"),
        borsh.u64("iv_micro"),
        borsh.i64("vrp_rel_micro"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new IvHistoryEntry({
      date_unix: obj.date_unix,
      iv_micro: obj.iv_micro,
      vrp_rel_micro: obj.vrp_rel_micro,
    })
  }

  static toEncodable(fields: IvHistoryEntryFields) {
    return {
      date_unix: fields.date_unix,
      iv_micro: fields.iv_micro,
      vrp_rel_micro: fields.vrp_rel_micro,
    }
  }

  toJSON(): IvHistoryEntryJSON {
    return {
      date_unix: this.date_unix.toString(),
      iv_micro: this.iv_micro.toString(),
      vrp_rel_micro: this.vrp_rel_micro.toString(),
    }
  }

  static fromJSON(obj: IvHistoryEntryJSON): IvHistoryEntry {
    return new IvHistoryEntry({
      date_unix: new BN(obj.date_unix),
      iv_micro: new BN(obj.iv_micro),
      vrp_rel_micro: new BN(obj.vrp_rel_micro),
    })
  }

  toEncodable() {
    return IvHistoryEntry.toEncodable(this)
  }
}
