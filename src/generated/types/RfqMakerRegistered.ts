import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface RfqMakerRegisteredFields {
  mm: PublicKey
  deposit_lamports: BN
  registered_at: BN
}

export interface RfqMakerRegisteredJSON {
  mm: string
  deposit_lamports: string
  registered_at: string
}

export class RfqMakerRegistered {
  readonly mm: PublicKey
  readonly deposit_lamports: BN
  readonly registered_at: BN

  constructor(fields: RfqMakerRegisteredFields) {
    this.mm = fields.mm
    this.deposit_lamports = fields.deposit_lamports
    this.registered_at = fields.registered_at
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.publicKey("mm"),
        borsh.u64("deposit_lamports"),
        borsh.i64("registered_at"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new RfqMakerRegistered({
      mm: obj.mm,
      deposit_lamports: obj.deposit_lamports,
      registered_at: obj.registered_at,
    })
  }

  static toEncodable(fields: RfqMakerRegisteredFields) {
    return {
      mm: fields.mm,
      deposit_lamports: fields.deposit_lamports,
      registered_at: fields.registered_at,
    }
  }

  toJSON(): RfqMakerRegisteredJSON {
    return {
      mm: this.mm.toString(),
      deposit_lamports: this.deposit_lamports.toString(),
      registered_at: this.registered_at.toString(),
    }
  }

  static fromJSON(obj: RfqMakerRegisteredJSON): RfqMakerRegistered {
    return new RfqMakerRegistered({
      mm: new PublicKey(obj.mm),
      deposit_lamports: new BN(obj.deposit_lamports),
      registered_at: new BN(obj.registered_at),
    })
  }

  toEncodable() {
    return RfqMakerRegistered.toEncodable(this)
  }
}
